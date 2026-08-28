"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, User as UserIcon, CheckCircle2, AlertCircle, ArrowRight, Hammer, Store, Anchor, Info } from "lucide-react";

interface AuthWidgetProps {
  initialMode?: "login" | "signup";
  initialRole?: UserRole;
}

// Demo credentials — real Firebase accounts. If not exists, will be auto-created on first click.
const DEMO_ACCOUNTS = {
  builder: { email: "builder.demo@bondor.io", password: "DemoBuilder123!", name: "Demo Builder", role: "builder" as UserRole },
  seller: { email: "seller.demo@bondor.io", password: "DemoSeller123!", name: "Demo Seller", role: "seller" as UserRole },
} as const;

export const AuthWidget: React.FC<AuthWidgetProps> = ({ initialMode = "login", initialRole = "builder" }) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>(initialRole);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<"builder" | "seller" | null>(null);

  const { login, signup } = useAuth();
  const router = useRouter();

  const emailError = useMemo(() => {
    if (!email) return null;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email";
    return null;
  }, [email]);

  const passwordError = useMemo(() => {
    if (!password) return null;
    if (password.length < 6) return "At least 6 characters";
    return null;
  }, [password]);

  const nameError = useMemo(() => {
    if (mode !== "signup" || !name) return null;
    if (name.trim().length < 2) return "At least 2 characters";
    return null;
  }, [name, mode]);

  const isFormValid = useMemo(() => {
    if (mode === "signup") {
      return !emailError && !passwordError && !nameError && email.trim() && password && name.trim();
    }
    return !emailError && !passwordError && email.trim() && password;
  }, [mode, emailError, passwordError, nameError, email, password, name]);

  const redirectByRole = (profileRole: UserRole) => {
    if (profileRole === "seller") router.push("/seller-dashboard");
    else router.push("/builder-dashboard");
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setMessage({ text: "Please fix the highlighted fields.", isError: true });
      return;
    }
    setMessage(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        const profile = await signup(name.trim(), email.trim(), password, role);
        setMessage({ text: "Account created. Redirecting…", isError: false });
        redirectByRole(profile.role);
      } else {
        const profile = await login(email.trim(), password);
        setMessage({ text: "Welcome back. Redirecting…", isError: false });
        redirectByRole(profile.role);
      }
    } catch (err: any) {
      setMessage({
        text: err?.message || "Authentication failed. Please try again.",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoRole: "builder" | "seller") => {
    const demo = DEMO_ACCOUNTS[demoRole];
    setDemoLoading(demoRole);
    setMessage(null);
    try {
      try {
        const profile = await login(demo.email, demo.password);
        setMessage({ text: `Demo ${demoRole} signed in. Redirecting…`, isError: false });
        redirectByRole(profile.role);
        return;
      } catch (loginErr: any) {
        const msg = loginErr?.message || "";
        // Only auto-create if user not found / invalid credential
        const shouldCreate = msg.includes("No account") || msg.includes("Incorrect") || msg.includes("not found");
        if (!shouldCreate) throw loginErr;
        // Try signup as fallback
        const profile = await signup(demo.name, demo.email, demo.password, demo.role);
        setMessage({ text: `Demo ${demoRole} account created. Redirecting…`, isError: false });
        redirectByRole(profile.role);
      }
    } catch (err: any) {
      setMessage({
        text: err?.message || `Demo ${demoRole} login failed. Please create an account manually.`,
        isError: true,
      });
    } finally {
      setDemoLoading(null);
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
            Secure Firebase authentication
          </p>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
          Encrypted
        </span>
      </div>

      {/* Demo Access — real Firebase accounts, not local mock */}
      <div className="space-y-2 bg-sky-50/70 border border-sky-200/60 p-3.5 rounded-2xl">
        <span className="text-[11px] text-sky-800 font-bold flex items-center gap-1">
          <Info size={13} className="text-sky-600" />
          <span>Try demo account (real Firebase):</span>
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin("builder")}
            disabled={!!demoLoading || loading}
            className="px-3 py-2 bg-white hover:bg-sky-50 text-slate-800 hover:text-sky-700 border border-slate-200 hover:border-sky-300 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Hammer size={13} className="text-sky-600" />
            <span>{demoLoading === "builder" ? "Signing in…" : "Demo Builder"}</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin("seller")}
            disabled={!!demoLoading || loading}
            className="px-3 py-2 bg-white hover:bg-amber-50 text-slate-800 hover:text-amber-700 border border-slate-200 hover:border-amber-300 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Store size={13} className="text-amber-600" />
            <span>{demoLoading === "seller" ? "Signing in…" : "Demo Seller"}</span>
          </button>
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed">Creates real Firebase user on first click. No bypass.</p>
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
      <form onSubmit={handleAuthSubmit} className="space-y-3 pt-1" noValidate>
        {mode === "signup" && (
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Tanvir Ahmed"
                className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50/70 border rounded-xl text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:border-transparent transition-all font-medium ${nameError ? "border-rose-300 focus:ring-rose-500 bg-rose-50/30" : "border-slate-200 focus:ring-sky-500"}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                aria-invalid={!!nameError}
              />
            </div>
            {nameError && <p className="text-[11px] text-rose-600 font-medium">{nameError}</p>}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              placeholder="you@example.com"
              className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50/70 border rounded-xl text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:border-transparent transition-all font-medium ${emailError ? "border-rose-300 focus:ring-rose-500 bg-rose-50/30" : "border-slate-200 focus:ring-sky-500"}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-invalid={!!emailError}
            />
          </div>
          {emailError && <p className="text-[11px] text-rose-600 font-medium">{emailError}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50/70 border rounded-xl text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:border-transparent transition-all font-medium ${passwordError ? "border-rose-300 focus:ring-rose-500 bg-rose-50/30" : "border-slate-200 focus:ring-sky-500"}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              aria-invalid={!!passwordError}
              minLength={6}
            />
          </div>
          {passwordError ? <p className="text-[11px] text-rose-600 font-medium">{passwordError}</p> : <p className="text-[10px] text-slate-400">Minimum 6 characters</p>}
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
          disabled={!isFormValid || loading || !!demoLoading}
          rightIcon={<ArrowRight size={14} />}
          className="mt-2"
        >
          {mode === "signup" ? "Create Account & Enter" : "Sign In & Enter"}
        </Button>

        {message && (
          <div
            role="alert"
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
