import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DemoBadge from "@/components/DemoBadge";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlantRx — AI Diabetes Nutrition Coach",
  description: "AI-powered plant-based nutrition guidance for diabetes management",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={geistSans.variable + " " + geistMono.variable + " antialiased bg-slate-50 min-h-screen"}>
        <DemoBadge />
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      </body>
    </html>
  );
}
