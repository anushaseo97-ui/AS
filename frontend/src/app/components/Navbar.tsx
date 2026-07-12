"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Leaf, ChevronDown, LogOut } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<{ name: string; role: string; isVerified: boolean } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Check login session on mount and when pathname changes
  useEffect(() => {
    const savedSession = sessionStorage.getItem("user_session");
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("user_session");
    setSession(null);
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  // Helper function to dynamically highlight active tabs like a capsule
  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return isActive
      ? "px-3 py-1.5 bg-sage-50 text-sage-800 font-semibold rounded-xl transition-all duration-200"
      : "px-3 py-1.5 text-chocolate-600 hover:text-chocolate-950 font-medium transition-all duration-200";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-chocolate-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 1. Brand Logo (Fixed: Leaf highlighted container + split text colors restored!) */}
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-chocolate-900 group">
          <div className="p-2 bg-sage-50/80 border border-sage-100 rounded-xl flex items-center justify-center transition-colors group-hover:bg-sage-100">
            <Leaf className="w-5 h-5 text-sage-600" />
          </div>
          <span>Nutri<span className="text-sage-600">Life</span></span>
        </Link>

        {/* 2. Dynamic Middle Links with Active State Highlighting */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          
          {/* Dietitian Dashboard (Only shows if logged in as DIETITIAN) */}
          {session?.role === "DIETITIAN" && (
            <Link href="/dashboard" className={getLinkClass("/dashboard")}>
              Dashboard
            </Link>
          )}

          {/* Booking Link */}
          <Link href="/booking" className={getLinkClass("/booking")}>
            Booking
          </Link>

          <Link href="/community" className={getLinkClass("/community")}>
            Community
          </Link>

          {/* Client Workspace (Only shows if logged in as CLIENT) */}
          {session?.role === "CLIENT" && (
            <Link href="/workspace" className={getLinkClass("/workspace")}>
              Workspace
            </Link>
          )}

          {/* Extra placeholder links for logged-out users to maintain layout beauty */}
          {!session && (
            <>
              <Link href="/features" className="px-3 py-1.5 text-chocolate-600 hover:text-chocolate-950 font-medium transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="px-3 py-1.5 text-chocolate-600 hover:text-chocolate-950 font-medium transition-colors">
                Pricing
              </Link>
            </>
          )}
        </div>

        {/* 3. Right Side Actions (Auth Buttons OR User Dropdown) */}
        <div className="flex items-center gap-4 relative">
          {!session ? (
            <>
              {/* Logged Out State */}
              <Link href="/login" className="text-sm font-medium text-chocolate-600 hover:text-chocolate-900">
                Sign In
              </Link>
              <Link href="/signup" className="px-5 py-2.5 bg-chocolate-700 text-white text-sm font-semibold rounded-xl hover:bg-chocolate-900 transition-colors shadow-sm">
                Get Started
              </Link>
            </>
          ) : (
            <>
              {/* Logged In State */}
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-chocolate-50 transition-colors border border-chocolate-100"
              >
                <div className="w-7 h-7 rounded-full bg-sage-100 flex items-center justify-center text-xs font-bold text-sage-700">
                  {session.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-chocolate-800 hidden sm:inline">{session.name}</span>
                <ChevronDown className={`w-4 h-4 text-chocolate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Options */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-chocolate-100 rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="px-4 py-2 text-xs text-chocolate-400 border-b border-chocolate-50">
                    Logged in as <span className="font-semibold capitalize text-chocolate-600">{session.role.toLowerCase()}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </nav>
  );
}