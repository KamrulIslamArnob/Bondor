"use client";

import React, { useEffect } from "react";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error caught by boundary:", error);
  }, [error]);

  return (
    <div className="max-w-md mx-auto py-16 text-center space-y-6">
      <div className="bg-white border border-zinc-200/90 rounded-xl p-8 shadow-xs space-y-4">
        <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600">
          <AlertTriangle size={24} />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block">
            System Error
          </span>
          <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed">
            An unexpected client error occurred. Try refreshing the view.
          </p>
        </div>

        <div className="pt-2">
          <Button
            variant="default"
            size="md"
            fullWidth
            onClick={() => reset()}
            leftIcon={<RefreshCw size={14} />}
          >
            Retry Connection
          </Button>
        </div>
      </div>
    </div>
  );
}
