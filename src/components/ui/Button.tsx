import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "link"
    | "gradient"
    | "pill"
    | "pill-active"
    | "pill-gradient"
    | "pixel"
    | "pixel-cyan"
    | "pixel-emerald";
  size?: "sm" | "md" | "lg" | "icon";
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "secondary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const variantStyles = {
    default:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-xs border border-slate-900/90 active:scale-[0.96]",
    primary:
      "bg-sky-600 text-white hover:bg-sky-500 shadow-xs border border-sky-600 active:scale-[0.96]",
    secondary:
      "bg-white text-slate-800 hover:bg-sky-50/70 border border-slate-200 hover:border-sky-300 shadow-xs active:scale-[0.96]",
    outline:
      "bg-transparent text-slate-700 hover:bg-slate-100/80 border border-slate-200 hover:border-slate-300 active:scale-[0.96]",
    ghost:
      "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 rounded-md active:scale-[0.96]",
    destructive:
      "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 active:scale-[0.96]",
    link:
      "bg-transparent text-sky-600 hover:text-sky-700 hover:underline p-0 h-auto font-medium",
    gradient:
      "bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 text-white hover:brightness-105 border border-sky-600/80 font-semibold shadow-xs hover:shadow-glow active:scale-[0.96]",
    pill:
      "rounded-full bg-white text-slate-800 hover:bg-sky-50/80 border border-slate-200 hover:border-sky-300 font-semibold shadow-xs active:scale-[0.96]",
    "pill-active":
      "rounded-full bg-sky-600 text-white border border-sky-600 font-semibold shadow-xs active:scale-[0.96]",
    "pill-gradient":
      "rounded-full bg-gradient-to-r from-sky-600 to-sky-500 text-white hover:brightness-105 border border-sky-500 font-semibold shadow-xs active:scale-[0.96]",
    pixel:
      "bg-slate-900 text-white hover:bg-slate-800 border border-slate-900 shadow-xs active:scale-[0.96]",
    "pixel-cyan":
      "bg-sky-500 text-white hover:bg-sky-600 border border-sky-500 shadow-xs active:scale-[0.96] font-semibold",
    "pixel-emerald":
      "bg-emerald-600 text-white hover:bg-emerald-500 border border-emerald-600 shadow-xs active:scale-[0.96]",
  }[variant];

  const sizeStyles = {
    sm: "h-8 px-3 text-xs rounded-lg font-medium",
    md: "h-9 px-4 text-sm rounded-lg font-medium",
    lg: "h-11 px-6 text-sm font-semibold rounded-xl",
    icon: "h-9 w-9 p-0 rounded-lg",
  }[size];

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-[transform,background-color,border-color,box-shadow,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer",
        variantStyles,
        sizeStyles,
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg
            className="animate-spin h-3.5 w-3.5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-xs">Processing...</span>
        </span>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
