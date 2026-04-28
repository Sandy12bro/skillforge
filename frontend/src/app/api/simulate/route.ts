import { NextResponse } from "next/server";

type SimulationTrace = {
  line: number;
  message: string;
  variables: Array<{ name: string; value: string }>;
};

type SimulationResult = {
  finalOutput: string;
  trace: SimulationTrace[];
};

function buildPrompt(code: string, language: string) {
  return `Act as a code execution engine. For the following ${language} code, provide a step-by-step execution trace.
Return ONLY valid JSON with this exact structure:
{
  "finalOutput": "the full console output",
  "trace": [
    {
      "line": number,
      "message": "explanation of what happens on this line",
      "variables": [{ "name": "varName", "value": "varValue" }]
    }
  ]
}
Code:
${code}`;
}

function extractJson(text: string) {
  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1) return cleaned;
  return cleaned.slice(firstBrace, lastBrace + 1);
}

function buildMockTrace(code: string): SimulationResult {
  const isFactorial = code.includes("factorial");
  if (isFactorial) {
    return {
      finalOutput: "120",
      trace: [
        { line: 1, message: "Defining function factorial(n)", variables: [] },
        { line: 6, message: "Initial call: factorial(5)", variables: [{ name: "n", value: "5" }] },
        { line: 2, message: "Check: 5 <= 1 is false", variables: [{ name: "n", value: "5" }] },
        { line: 3, message: "Recursive call: 5 * factorial(4)", variables: [{ name: "n", value: "5" }] },
        { line: 2, message: "Check: 4 <= 1 is false", variables: [{ name: "n", value: "4" }] },
        { line: 3, message: "Recursive call: 4 * factorial(3)", variables: [{ name: "n", value: "4" }] },
        { line: 2, message: "Check: 3 <= 1 is false", variables: [{ name: "n", value: "3" }] },
        { line: 3, message: "Recursive call: 3 * factorial(2)", variables: [{ name: "n", value: "3" }] },
        { line: 2, message: "Check: 2 <= 1 is false", variables: [{ name: "n", value: "2" }] },
        { line: 3, message: "Recursive call: 2 * factorial(1)", variables: [{ name: "n", value: "2" }] },
        { line: 2, message: "Base case: 1 <= 1 is true. Returning 1.", variables: [{ name: "n", value: "1" }] },
        { line: 3, message: "Resolving final result to 120", variables: [{ name: "result", value: "120" }] },
      ],
    };
  }

  const trace = code
    .split("\n")
    .filter((line) => line.trim())
    .map((line, index) => ({
      line: index + 1,
      message: `Executing: ${line.trim().slice(0, 40)}`,
      variables: [{ name: "step", value: `${index + 1}` }],
    }));

  return {
    finalOutput: "Simulation finished (Demo Mode).",
    trace: trace.length ? trace : [{ line: 1, message: "No executable lines found", variables: [] }],
  };
}

export async function POST(req: Request) {
  try {
    const { code, language } = (await req.json()) as { code?: string; language?: string };
    if (!code || !language) {
      return NextResponse.json({ error: "Missing code or language." }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      return NextResponse.json(buildMockTrace(code));
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: buildPrompt(code, language) }] }],
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(buildMockTrace(code));
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return NextResponse.json(buildMockTrace(code));
    }

    const parsed = JSON.parse(extractJson(text)) as SimulationResult;
    if (!parsed.finalOutput || !Array.isArray(parsed.trace)) {
      return NextResponse.json(buildMockTrace(code));
    }

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Simulation failed." }, { status: 500 });
  }
}
