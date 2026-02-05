import React from 'react';
import { cn } from '@/utils';

interface FilterBarProps {
    filter: string;
    setFilter: (filter: string) => void;
    counts: Record<string, number>;
}

export function FilterBar({ filter, setFilter, counts }: FilterBarProps) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'high', label: 'High Priority' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 mb-6 overflow-x-auto bg-slate-100 dark:bg-slate-800/50 rounded-xl no-scrollbar">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => setFilter(f.id)}
          className={cn(
            "flex-1 px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
            filter === f.id
              ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          )}
        >
          {f.label}
          {counts && counts[f.id] !== undefined && (
              <span className={cn(
                  "ml-2 text-xs opacity-70",
                   filter === f.id ? "bg-blue-100 dark:bg-blue-900/50 px-1.5 py-0.5 rounded-full" : ""
              )}>
                  {counts[f.id]}
              </span>
          )}
        </button>
      ))}
    </div>
  );
}
