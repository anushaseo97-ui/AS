"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/booking", label: "Booking" },
  { href: "/community", label: "Community" },
  { href: "/workspace", label: "Workspace" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-chocolate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sage-100 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-sage-600" />
          </div>
          <span className="text-xl font-bold font-serif">
            <span className="text-chocolate-900">Nutri</span>
            <span className="text-sage-600">Life</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-sage-600 bg-sage-50"
                    : "text-chocolate-600 hover:text-sage-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link href="/signin" className="hidden sm:block text-sm font-medium text-chocolate-600 hover:text-chocolate-900">
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 bg-chocolate-700 text-white text-sm font-semibold rounded-xl hover:bg-chocolate-900 transition-colors"
          >
            Get Started
          </Link>
          <button className="flex items-center gap-1 w-10 h-10 rounded-full bg-chocolate-100 justify-center hover:bg-chocolate-200 transition-colors">
            <ChevronDown className="w-4 h-4 text-chocolate-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}