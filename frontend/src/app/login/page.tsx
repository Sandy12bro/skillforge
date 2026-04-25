"use client";

import { useEffect, useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import ThemeToggle from "../../components/ThemeToggle";

export default function AuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [errorMsg, setErrorMsg] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  const handleGoogleAuth = async () => {
    try {
      setErrorMsg("");
      setIsAuthenticating(true);
      await signInWithPopup(auth, googleProvider);
      router.replace("/dashboard");
    } catch (error: unknown) {
      setErrorMsg((error as Error).message || "Failed to authenticate with Google.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const validateEmail = (candidate: string) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(candidate);
  };

  const validatePassword = (candidate: string) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(candidate);
    const hasLower = /[a-z]/.test(candidate);
    const hasNumber = /[0-9]/.test(candidate);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(candidate);
    return candidate.length >= minLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isLogin) {
      if (!validateEmail(email)) {
        return setErrorMsg("Please enter a valid email address.");
      }
      if (!validatePassword(password)) {
        return setErrorMsg("Password must be 8+ characters, with an uppercase letter, lowercase letter, number, and special character.");
      }
      if (password !== confirmPassword) {
        return setErrorMsg("Passwords do not match.");
      }
    }

    try {
      setIsAuthenticating(true);
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (name && userCredential.user) {
          await updateProfile(userCredential.user, { displayName: name });
        }
      }
      router.replace("/dashboard");
    } catch (error: unknown) {
      setErrorMsg((error as Error).message || "Authentication failed.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (loading || user) {
    return <div className="min-h-screen bg-background flex justify-center items-center font-bold text-foreground uppercase tracking-widest">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className="max-w-md w-full neo-card bg-card border-2 border-brand-yellow shadow-[8px_8px_0px_#FACC15] p-8 flex flex-col items-center hover:translate-x-[2px] transition-transform duration-300">
        <div className="w-16 h-16 neo-card neo-card-yellow flex items-center justify-center font-black text-3xl mb-6 shadow-[4px_4px_0px_#000]">
          CA
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-black text-foreground uppercase tracking-widest drop-shadow-[2px_2px_0px_#EF4444] mb-2 text-center">
          {isLogin ? "Welcome Back" : "Join CodeArena"}
        </h1>
        <p className="text-muted font-bold mb-8 text-center uppercase text-sm tracking-wider">
          {isLogin ? "Resume your grind." : "Level up your tech career today"}
        </p>

        {errorMsg && (
          <div className="w-full bg-brand-red text-white p-3 mb-6 neo-border shadow-[2px_2px_0px_#000] text-sm font-bold tracking-wide">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="w-full space-y-4 mb-6">
          {!isLogin && (
            <input 
              type="text" 
              placeholder="FULL NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-background text-foreground neo-border outline-none focus:border-brand-yellow font-bold placeholder-gray-600 transition-colors"
              required
            />
          )}

          <input 
            type="email" 
            placeholder="EMAIL ADDRESS"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-background text-white neo-border outline-none focus:border-brand-yellow font-bold placeholder-gray-600 transition-colors"
            required
          />

          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-background text-white neo-border outline-none focus:border-brand-yellow font-bold placeholder-gray-600 transition-colors pr-12"
              required
            />
            <button 
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-foreground transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>
          </div>

          {!isLogin && (
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="CONFIRM PASSWORD"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-background text-white neo-border outline-none focus:border-brand-yellow font-bold placeholder-gray-600 transition-colors pr-12"
                required
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={isAuthenticating}
            className="neo-button neo-card-white w-full py-4 text-lg hover:-translate-y-1 block mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAuthenticating ? "AUTHENTICATING..." : (isLogin ? "LOG IN" : "SIGN UP")}
          </button>
        </form>

        <div className="w-full flex items-center gap-4 mb-6">
          <div className="flex-1 h-0.5 bg-[#333]"></div>
          <span className="text-muted font-bold text-sm uppercase tracking-widest">OR</span>
          <div className="flex-1 h-0.5 bg-[#333]"></div>
        </div>

        <button 
          onClick={handleGoogleAuth} 
          type="button"
          disabled={isAuthenticating}
          className="neo-button neo-card-dark w-full py-3 flex items-center justify-center gap-3 text-base hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-80"
        >
          <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full p-1 shadow-[1px_1px_0px_#000]">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          <span className="font-bold tracking-wide">Continue with Google</span>
        </button>

        <div className="mt-8 pt-6 border-t-2 border-[#333] w-full text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#9ca3af]">
            {isLogin ? "New to CodeArena? " : "Already coding? "}
            <button 
              type="button"
              onClick={() => { setIsLogin(!isLogin); setErrorMsg(""); }} 
              className="text-brand-yellow hover:underline ml-1"
            >
              {isLogin ? "Create Account" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
