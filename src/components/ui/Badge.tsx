import React from "react";
import { cn } from "@/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "high" | "medium" | "low";
  children: React.ReactNode;
}

export function Badge({ children, variant = "default", className, ...props }: BadgeProps) {
  const variants = {
    default:
      "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    medium:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
