"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Leaf, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Demo-safe auth flow for capstone structure
    localStorage.setItem("demoUserEmail", email || "demo@vegandiabetes.ai");
    router.push("/dashboard");
  };

  return (
    <div className="-mx-4 -mt-8 min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 sm:-mx-6 lg:-mx-8">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">
          
          {/* Left panel */}
          <div className="hidden bg-green-900 px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold">PlantRx</p>
                  <p className="text-sm font-medium text-green-300">AI Coach</p>
                </div>
              </Link>

              <div className="mt-12 space-y-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
                    Welcome Back
                  </p>
                  <h1 className="mt-3 text-4xl font-extrabold leading-tight">
                    Your AI-powered plant-based diabetes support platform.
                  </h1>
                </div>

                <p className="max-w-md text-base leading-7 text-green-100">
                  Sign in to access meal analysis, glucose-aware insights, barcode scans,
                  weekly planning, grocery support, and your saved meal history.
                </p>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-green-800 bg-green-950/40 p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-green-700">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Demo-friendly access</p>
                  <p className="mt-1 text-sm leading-6 text-green-200">
                    This capstone version includes a safe demo flow. You can continue into the
                    platform without real backend authentication.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-md">
              <div className="mb-8 lg:hidden">
                <Link href="/" className="inline-flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600">
                    <Leaf className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">PlantRx</p>
                    <p className="text-sm font-medium text-green-600">AI Coach</p>
                  </div>
                </Link>
              </div>

              <div className="mb-8">
                <div className="inline-flex rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className={
                      "rounded-lg px-4 py-2 text-sm font-semibold transition-colors " +
                      (mode === "signin"
                        ? "bg-white text-green-700 shadow-sm"
                        : "text-slate-500 hover:text-slate-700")
                    }
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className={
                      "rounded-lg px-4 py-2 text-sm font-semibold transition-colors " +
                      (mode === "signup"
                        ? "bg-white text-green-700 shadow-sm"
                        : "text-slate-500 hover:text-slate-700")
                    }
                  >
                    Sign Up
                  </button>
                </div>

                <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
                  {mode === "signin" ? "Sign in to continue" : "Create your account"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {mode === "signin"
                    ? "Access your AI health dashboard, meal history, and personalized nutrition tools."
                    : "Start your plant-based diabetes wellness journey with AI-guided support."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100">
                    <Mail className="h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full border-0 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100">
                    <Lock className="h-5 w-5 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full border-0 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-green-700 hover:shadow-md"
                >
                  {mode === "signin" ? "Sign In" : "Create Account"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-4">
                <p className="text-sm font-semibold text-orange-900">Demo Access</p>
                <p className="mt-1 text-sm leading-6 text-orange-700">
                  No real account is required for this capstone demo. You can continue directly into
                  the app to explore all major features.
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-300 bg-white px-6 py-3 text-sm font-bold text-orange-700 transition-all hover:bg-orange-100"
                >
                  Continue as Demo
                  <Sparkles className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-slate-500">
                <Link href="/" className="font-medium text-green-700 hover:text-green-800">
                  ← Back to landing page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}