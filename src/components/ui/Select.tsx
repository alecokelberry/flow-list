import React from "react";
import { cn } from "@/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({ className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "w-full appearance-none px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100",
          className
        )}
        {...props}
      />
      {/* Simple chevron down could go here, but native select is fine for MVP */}
    </div>
  );
}
