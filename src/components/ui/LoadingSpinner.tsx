import React from "react";
import { Loader2 } from "lucide-react";

export const LoadingSpinner: React.FC<{ message?: string }> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-3 min-h-[260px] text-zinc-500">
      <Loader2 className="w-6 h-6 animate-spin text-zinc-800" />
      <p className="text-xs font-medium text-zinc-600 tracking-wide">{message}</p>
    </div>
  );
};
