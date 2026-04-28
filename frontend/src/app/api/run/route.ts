import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code, language } = (await req.json()) as { code?: string; language?: string };
    
    if (!code || !language) {
      return NextResponse.json({ error: "Missing code or language." }, { status: 400 });
    }

    // Call the backend API
    const response = await fetch(`${process.env.BACKEND_URL || 'https://codearena-production-5b50.up.railway.app'}/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        language,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Backend request failed." }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
