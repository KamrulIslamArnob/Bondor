"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthWidget } from "@/components/landing/AuthWidget";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import Link from "next/link";
import { Anchor } from "lucide-react";

export default function SignupPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (userProfile?.role === "seller") {
        router.push("/seller-dashboard");
      } else {
        router.push("/builder-dashboard");
      }
    }
  }, [user, userProfile, loading, router]);

  if (loading) {
    return <LoadingSpinner message="Verifying session..." />;
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-6 flex flex-col items-center">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Anchor size={18} />
          </div>
          <span className="font-serif text-2xl font-extrabold text-slate-900 tracking-tight">
            Bondor
          </span>
        </Link>

        {/* Dedicated Auth Form Card */}
        <AuthWidget initialMode="signup" />

        <p className="text-xs text-slate-500 text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-sky-600 hover:text-sky-700 underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
