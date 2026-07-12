"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid email or password.");
      }

      if (data.success) {
        // Safe-keep session inside temporary storage
        sessionStorage.setItem("user_session", JSON.stringify({
          role: data.user.role,
          isVerified: data.user.isVerified,
          name: data.user.name
        }));

        // Dynamically shift screen based on credentials
        if (data.user.role === "DIETITIAN") {
          router.push('/dashboard');
        } else if (data.user.role === "CLIENT") {
          router.push('/workspace');
        }
        router.refresh();
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* 🌟 Unified Sage Canvas Aesthetic Background for full Laptop Viewport */
    <div className="min-h-screen bg-[#f3f6f3] bg-gradient-to-tr from-sage-50/60 via-white to-[#f4f7f4] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* 🍃 Hand-drawn Botanical / Organic Style Abstract SVG Background Shapes */}
      <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] opacity-40 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-sage-200/70">
          <path d="M40,110 Q70,70 120,100 T180,60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M30,140 Q80,110 110,150 T190,110" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" strokeLinecap="round"/>
          <circle cx="140" cy="70" r="15" fill="none" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] opacity-40 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-sage-200/70">
          <path d="M20,90 Q90,50 130,120 T170,160" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M50,50 Q110,90 150,40" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="70" cy="130" r="22" fill="none" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-chocolate-100/60 relative z-10">
        
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          
          {/* 🌟 Interactive Leaf Container with Navigation Comment Hint */}
          <div className="group relative flex flex-col items-center">
            <Link 
              href="/" 
              className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center mb-2 transition-all duration-300 hover:bg-sage-200 hover:scale-105 active:scale-95 border border-sage-200"
            >
              <Leaf className="w-6 h-6 text-sage-600" />
            </Link>
            
            <span className="text-[10px] text-sage-600/80 font-medium tracking-wide opacity-70 group-hover:opacity-100 transition-opacity">
              Click leaf to return Home
            </span>
          </div>

          <h2 className="text-2xl font-bold text-chocolate-900 font-serif mt-4">Welcome Back</h2>
          <p className="text-sm text-chocolate-500 mt-1">Sign in to manage your wellness track</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-chocolate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="doctor@nutrilife.com"
              className="w-full px-4 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm text-chocolate-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-chocolate-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm text-chocolate-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-chocolate-700 hover:bg-chocolate-900 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 mt-4 shadow-sm disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Sign In"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-xs text-center text-chocolate-500 mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-sage-600 font-semibold hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}