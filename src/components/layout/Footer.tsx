import React from "react";
import { Anchor } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-zinc-800 bg-zinc-950 py-8 text-xs text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#62B6FC] text-zinc-950 flex items-center justify-center font-bold">
            <Anchor size={13} />
          </div>
          <span className="font-bold text-white">Bondor</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-300">The Platform for Micro-Makers &amp; Verified Sellers</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <span>© {new Date().getFullYear()} Bondor. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
