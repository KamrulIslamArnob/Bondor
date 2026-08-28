import React from "react";
import { cn } from "@/lib/utils";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "gradient" | "neo" }> = ({
  className,
  variant = "default",
  ...props
}) => {
  const variantStyles = {
    default: "bg-white border border-slate-200/80 rounded-2xl text-slate-900 shadow-xs hover:shadow-card hover:border-slate-300 transition-[box-shadow,border-color] duration-200",
    gradient: "bg-theme-gradient border border-sky-300/60 rounded-2xl text-slate-900 shadow-xs",
    neo: "bg-white border border-slate-200 rounded-2xl text-slate-900 shadow-xs",
  }[variant];

  return (
    <div
      className={cn(
        variantStyles,
        className
      )}
      {...props}
    />
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h3
    className={cn("text-base font-bold leading-tight tracking-tight text-slate-900 text-balance", className)}
    {...props}
  />
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p className={cn("text-xs text-slate-500 leading-relaxed text-pretty", className)} {...props} />
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("p-6 pt-0", className)} {...props} />;

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);

export const HeaderCard: React.FC<{
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  variant?: "default" | "gradient";
  className?: string;
}> = ({ title, subtitle, eyebrow, children, variant = "default", className = "" }) => {
  const isGradient = variant === "gradient";
  return (
    <div
      className={cn(
        isGradient
          ? "bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white border border-sky-500 shadow-sm"
          : "bg-white border border-slate-200/80 text-slate-900 shadow-xs",
        "rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4",
        className
      )}
    >
      <div className="space-y-1.5 max-w-2xl">
        {eyebrow && (
          <span className={cn("text-xs font-semibold uppercase tracking-wider block", isGradient ? "text-sky-100" : "text-sky-700")}>
            {eyebrow}
          </span>
        )}
        <h1 className={cn("text-2xl sm:text-3xl font-extrabold tracking-tight text-balance", isGradient ? "text-white" : "text-slate-900")}>
          {title}
        </h1>
        {subtitle && (
          <p className={cn("text-sm leading-relaxed text-pretty", isGradient ? "text-sky-100 font-normal" : "text-slate-600 font-medium")}>
            {subtitle}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </div>
  );
};
