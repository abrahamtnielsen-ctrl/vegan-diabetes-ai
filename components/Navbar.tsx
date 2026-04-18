"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf,
  BarChart2,
  Camera,
  QrCode,
  Calendar,
  BookOpen,
  Clock
} from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart2 },
  { href: "/meal-log", label: "Meal Log", icon: Camera },
  { href: "/barcode-scan", label: "Barcode Scan", icon: QrCode },
  { href: "/meal-planner", label: "Meal Planner", icon: Calendar },

  // NEW LINK
  { href: "/history", label: "History", icon: Clock },

  { href: "/education", label: "Education", icon: BookOpen },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-green-600 rounded-lg p-1.5">
              <Leaf className="h-5 w-5 text-white" />
            </div>

            <div className="leading-tight">
              <p className="font-bold text-slate-900 text-base tracking-tight">
                Plant<span className="text-green-600">Rx</span>
              </p>
              <p className="text-green-600 text-xs font-medium -mt-0.5">
                AI Nutrition Coach
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors " +
                  (pathname === href
                    ? "bg-green-50 text-green-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")
                }
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}