"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Calendar, UtensilsCrossed, MessageSquare, Settings, Leaf } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  { href: "/dashboard/appointments", label: "Appointments", icon: Calendar },
  { href: "/dashboard/meal-plans", label: "Meal Plans", icon: UtensilsCrossed },
  { href: "/dashboard/community", label: "Community", icon: MessageSquare },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-chocolate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-chocolate-100 flex flex-col">
        <Link
          href="/"
          className="px-6 py-5 border-b border-chocolate-100 flex items-center gap-2 hover:bg-chocolate-50 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-sage-100 flex items-center justify-center">
            <Leaf className="w-4.5 h-4.5 text-sage-600" />
          </div>
          <span className="text-xl font-bold font-serif">
            <span className="text-chocolate-900">Nutri</span>
            <span className="text-sage-600">Life</span>
          </span>
        </Link>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sage-100 text-sage-600"
                    : "text-chocolate-600 hover:bg-sage-50 hover:text-sage-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-chocolate-100">
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              pathname.startsWith("/dashboard/settings")
                ? "bg-sage-100 text-sage-600"
                : "text-chocolate-600 hover:bg-sage-50 hover:text-sage-600"
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Page content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}