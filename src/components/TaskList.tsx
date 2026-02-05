import React from 'react';
import { Layers } from 'lucide-react';
import { TaskItem } from './TaskItem';
import { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
}

export function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
            <Layers className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-200">
          No tasks found
        </h3>
        <p className="text-slate-500 mt-1 max-w-xs mx-auto">
          You don't have any tasks here yet. Create one above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1 pb-20">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
