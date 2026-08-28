import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "pill"
    | "pill-active"
    | "gradient"
    | "cyan"
    | "emerald"
    | "amber"
    | "purple"
    | "rose"
    | "pixel";
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
  style = {},
  icon,
}) => {
  const variantStyles = {
    default: "bg-slate-900 text-white border border-slate-800 font-medium",
    secondary: "bg-slate-100 text-slate-700 border border-slate-200 font-medium",
    outline: "bg-transparent text-slate-700 border border-slate-200 font-medium",
    pill: "bg-white text-slate-800 border border-slate-200 hover:border-sky-300 rounded-full px-3 py-1 font-semibold shadow-xs",
    "pill-active": "bg-sky-600 text-white border border-sky-600 rounded-full px-3 py-1 font-semibold shadow-xs",
    gradient: "bg-gradient-to-r from-sky-600 to-sky-500 text-white border border-sky-600 font-semibold shadow-xs",
    cyan: "bg-sky-50 text-sky-700 border border-sky-200/80 font-medium",
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-medium",
    amber: "bg-amber-50 text-amber-800 border border-amber-200/80 font-medium",
    purple: "bg-purple-50 text-purple-700 border border-purple-200/80 font-medium",
    rose: "bg-rose-50 text-rose-700 border border-rose-200/80 font-medium",
    pixel: "bg-slate-100 text-slate-800 border border-slate-200 font-mono text-[10px]",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs transition-colors select-none tabular-nums",
        variantStyles,
        className
      )}
      style={style}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
