"use client";

import Link from "next/link";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Integrations", href: "#" },
    { name: "Changelog", href: "#" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Community", href: "/community" },
    { name: "API Reference", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#" },
    { name: "HIPAA", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-chocolate-900 border-t border-chocolate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-sage-100 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-sage-600" />
              </div>
              <span className="text-xl font-bold font-serif text-white tracking-tight">
                Nutri<span className="text-sage-400">Life</span>
              </span>
            </Link>
            <p className="text-sm text-chocolate-200 leading-relaxed mb-6 max-w-xs">
              Empowering dietitians worldwide with intelligent tools for modern nutrition practice management.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-chocolate-200">
                <Mail className="w-4 h-4 text-sage-400" />
                hello@nutrilife.com
              </div>
              <div className="flex items-center gap-3 text-sm text-chocolate-200">
                <Phone className="w-4 h-4 text-sage-400" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-3 text-sm text-chocolate-200">
                <MapPin className="w-4 h-4 text-sage-400" />
                San Francisco, CA
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-chocolate-200 hover:text-sage-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-chocolate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-chocolate-300">
            &copy; {new Date().getFullYear()} NutriLife. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-chocolate-300 hover:text-sage-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-chocolate-300 hover:text-sage-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-sm text-chocolate-300 hover:text-sage-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}