"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, User as UserIcon, CheckCircle2, AlertCircle, ArrowRight, Hammer, Store, Anchor, Zap } from "lucide-react";

interface AuthWidgetProps {
  initialMode?: "login" | "signup";
}

export const AuthWidget: React.FC<AuthWidgetProps> = ({ initialMode = "login" }) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("builder");
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  const { login, signup, quickLogin } = useAuth();
  const router = useRouter();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        setMessage({ text: "Creating your account...", isError: false });
        const profile = await signup(name, email, password, role);
        setMessage({ text: "Account authenticated! Redirecting...", isError: false });
        if (profile.role === "seller") {
          router.push("/seller-dashboard");
        } else {
          router.push("/builder-dashboard");
        }
      } else {
        setMessage({ text: "Authenticating session...", isError: false });
        const profile = await login(email, password);
        setMessage({ text: "Access granted! Redirecting...", isError: false });
        if (profile && profile.role === "seller") {
          router.push("/seller-dashboard");
        } else {
          router.push("/builder-dashboard");
        }
      }
    } catch (err: any) {
      console.error(err);
      setMessage({
        text: err?.message || "Authentication error. Please try again.",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSignIn = async (asRole: "builder" | "seller") => {
    setLoading(true);
    try {
      await quickLogin(asRole);
      if (asRole === "seller") {
        router.push("/seller-dashboard");
      } else {
        router.push("/builder-dashboard");
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-card space-y-5 text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-slate-900 text-lg font-serif">
            {mode === "login" ? "Sign In to Bondor" : "Create Maker Account"}
          </h3>
          <p className="text-xs text-slate-500 font-normal">
            Enter the production harbor
          </p>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
          Full Access
        </span>
      </div>

      {/* 1-Click Instant Sign-In Options */}
      <div className="space-y-2 bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl">
        <span className="text-[11px] text-slate-600 font-bold flex items-center gap-1">
          <Zap size={13} className="text-amber-500" />
          <span>Instant 1-Click Sign In:</span>
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickSignIn("builder")}
            className="px-3 py-2 bg-white hover:bg-sky-50 text-slate-800 hover:text-sky-700 border border-slate-200 hover:border-sky-300 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.96]"
          >
            <Hammer size={13} className="text-sky-600" />
            <span>As Builder</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickSignIn("seller")}
            className="px-3 py-2 bg-white hover:bg-sky-50 text-slate-800 hover:text-sky-700 border border-slate-200 hover:border-sky-300 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.96]"
          >
            <Store size={13} className="text-amber-600" />
            <span>As Seller</span>
          </button>
        </div>
      </div>

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-medium">Or continue with email</span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 p-1 bg-slate-100/80 border border-slate-200/80 rounded-full">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setMessage(null);
          }}
          className={`py-1.5 text-xs font-semibold rounded-full transition-[background-color,color,box-shadow] duration-150 cursor-pointer ${
            mode === "login"
              ? "bg-white text-slate-900 shadow-xs font-bold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setMessage(null);
          }}
          className={`py-1.5 text-xs font-semibold rounded-full transition-[background-color,color,box-shadow] duration-150 cursor-pointer ${
            mode === "signup"
              ? "bg-white text-slate-900 shadow-xs font-bold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Register
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleAuthSubmit} className="space-y-3 pt-1">
        {mode === "signup" && (
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Tanvir Ahmed"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all font-medium"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {mode === "signup" && (
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-semibold text-slate-700">Account Type</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole("builder")}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                  role === "builder"
                    ? "border-sky-500 bg-sky-50 text-sky-900 font-bold shadow-xs"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 font-medium"
                }`}
              >
                <Hammer size={16} className={role === "builder" ? "mb-1 text-sky-600" : "mb-1 text-slate-400"} />
                <span className="text-xs">Builder</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("seller")}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                  role === "seller"
                    ? "border-sky-500 bg-sky-50 text-sky-900 font-bold shadow-xs"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 font-medium"
                }`}
              >
                <Store size={16} className={role === "seller" ? "mb-1 text-sky-600" : "mb-1 text-slate-400"} />
                <span className="text-xs">Seller</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("both")}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                  role === "both"
                    ? "border-sky-500 bg-sky-50 text-sky-900 font-bold shadow-xs"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 font-medium"
                }`}
              >
                <Anchor size={16} className={role === "both" ? "mb-1 text-sky-600" : "mb-1 text-slate-400"} />
                <span className="text-xs">Both</span>
              </button>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          fullWidth
          isLoading={loading}
          rightIcon={<ArrowRight size={14} />}
          className="mt-2"
        >
          {mode === "signup" ? "Create Account & Enter" : "Sign In & Enter"}
        </Button>

        {message && (
          <div
            className={`p-2.5 rounded-xl border text-xs font-medium flex items-start gap-2 ${
              message.isError
                ? "bg-rose-50 border-rose-200 text-rose-900"
                : "bg-emerald-50 border-emerald-200 text-emerald-900"
            }`}
          >
            {message.isError ? (
              <AlertCircle size={14} className="shrink-0 mt-0.5 text-rose-600" />
            ) : (
              <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-emerald-600" />
            )}
            <span>{message.text}</span>
          </div>
        )}
      </form>
    </div>
  );
};
