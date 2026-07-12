"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Leaf, UserPlus, AlertCircle, Calendar } from "lucide-react";

function SignupFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const isInvited = searchParams.get("invite") === "true";
  const urlDietitianId = searchParams.get("dietitianId") || "";
  const urlEmail = searchParams.get("email") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState(urlEmail);
  const [password, setPassword] = useState("");
  const [secretCode, setSecretCode] = useState("");  
  const [role, setRole] = useState("CLIENT");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (urlEmail) {
      setEmail(urlEmail);
    }
  }, [urlEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (role === "CLIENT" && !isInvited) {
      return; // Button is disabled, but safety return
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          role,
          secretCode: role === "DIETITIAN" ? secretCode : undefined, 
          dietitianId: role === "CLIENT" ? urlDietitianId : undefined 
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-chocolate-100/60 relative z-10">
      
      {/* Logo and Header */}
      <div className="flex flex-col items-center mb-6 text-center">
        <div className="group relative flex flex-col items-center">
          <Link href="/" className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center mb-2 transition-all duration-300 hover:bg-sage-200 hover:scale-105 active:scale-95 border border-sage-200">
            <Leaf className="w-6 h-6 text-sage-600" />
          </Link>
          <span className="text-[10px] text-sage-600/80 font-medium tracking-wide opacity-70 group-hover:opacity-100 transition-opacity">
            Click leaf to return Home
          </span>
        </div>
        <h2 className="text-2xl font-bold text-chocolate-900 font-serif mt-4">Create Account</h2>
        <p className="text-sm text-chocolate-500 mt-1">Join NutriLife today and start your journey</p>
      </div>

      {/* 🌟 IMPROVED: Booking Required Warning Box */}
      {role === "CLIENT" && !isInvited && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl animate-in fade-in zoom-in duration-300">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-800">Booking Required</h4>
              <p className="text-xs text-amber-700 mt-1 mb-3">
                To sign up as a client, you need an active booking. Please book an initial consultation first.
              </p>
              <button 
                onClick={() => router.push('/appointments')} 
                className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg text-xs font-semibold transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book a Session
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl text-center font-medium">
          Account created successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-chocolate-700 mb-1">Full Name</label>
          <input type="text" required placeholder="Anusha Ali" className="w-full px-4 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm text-chocolate-900" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-chocolate-700 mb-1">Email Address</label>
          <input type="email" required disabled={isInvited && !!urlEmail} placeholder="anusha@example.com" className="w-full px-4 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm text-chocolate-900 disabled:bg-chocolate-50/50 disabled:text-chocolate-400" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-chocolate-700 mb-1">Password</label>
          <input type="password" required placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm text-chocolate-900" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-chocolate-700 mb-1">Join As A</label>
          <select className="w-full px-4 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm bg-white text-chocolate-900 font-medium" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="CLIENT">Client (Looking for a Diet Plan)</option>
            <option value="DIETITIAN">Dietitian (Professional Practice)</option>
          </select>
        </div>
        {role === "DIETITIAN" && (
        <div>
        <label className="block text-xs font-semibold text-chocolate-700 mb-1">Admin Secret Code</label>
        <input 
          type="text" 
          required 
          placeholder="Enter your hackathon demo code" 
          className="w-full px-4 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm text-chocolate-900" 
          value={secretCode} 
          onChange={(e) => setSecretCode(e.target.value)} 
        />
      </div>
)}
        <button
          type="submit"
          disabled={loading || success || (role === "CLIENT" && !isInvited)}
          className="w-full py-3 bg-chocolate-700 hover:bg-chocolate-900 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 mt-4 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Get Started"}
          <UserPlus className="w-4 h-4" />
        </button>
      </form>

      <p className="text-xs text-center text-chocolate-500 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-sage-600 font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#f3f6f3] bg-gradient-to-tr from-sage-50/60 via-white to-[#f4f7f4] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] opacity-40 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-sage-200/70">
          <path d="M40,110 Q70,70 120,100 T180,60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      <Suspense fallback={
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-chocolate-100 flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sage-600"></div>
        </div>
      }>
        <SignupFormContent />
      </Suspense>
    </div>
  );
}