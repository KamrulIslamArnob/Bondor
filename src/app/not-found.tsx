import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-16 text-center space-y-6">
      <div className="bg-white border border-zinc-200/90 rounded-xl p-8 shadow-xs space-y-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-600">
          <Compass size={24} />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">
            404 Not Found
          </span>
          <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">
            Page Does Not Exist
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed">
            The link you followed may be broken or the page may have been moved.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button variant="default" size="md" fullWidth leftIcon={<ArrowLeft size={14} />}>
              Return to Harbor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
