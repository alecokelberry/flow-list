import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button, Input, Select, Card } from './ui';
import { Task } from '@/types';

interface TaskFormProps {
    onAdd: (task: Omit<Task, 'id' | 'completed' | 'isEditing'>) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setIsExpanded(false);
  };

  return (
    <Card className="mb-8 overflow-hidden shadow-lg border-blue-100 dark:border-blue-900/30">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex gap-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Add a new task..."
            className="flex-1 border-0 shadow-none focus:ring-0 px-0 text-lg bg-transparent placeholder-slate-400"
            aria-label="New task title"
          />
          <Button 
            disabled={!title.trim()} 
            className="shrink-0 rounded-full w-10 h-10 p-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 shadow-md"
            aria-label="Add task"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Expandable options area */}
        <div className={`space-y-3 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-60 opacity-100 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700' : 'max-h-0 opacity-0'}`}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none dark:text-slate-200"
              rows={2}
            />
            
            <div className="flex gap-3">
               <div className="relative flex-1">
                 <Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Task['priority'])}
                    className="pl-3 text-sm bg-slate-50 dark:bg-slate-900/50"
                    aria-label="Priority"
                 >
                   <option value="low">Low Priority</option>
                   <option value="medium">Medium Priority</option>
                   <option value="high">High Priority</option>
                 </Select>
               </div>
               
               <div className="relative flex-1">
                 <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="text-sm bg-slate-50 dark:bg-slate-900/50"
                    aria-label="Due date"
                 />
               </div>
            </div>
            
             <div className="flex justify-between items-center pt-1">
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsExpanded(false)}
                    className="text-slate-400 hover:text-slate-600"
                >
                    Cancel
                </Button>
                {/* Submit handled by main form submit via Enter or top button */}
             </div>
        </div>
      </form>
    </Card>
  );
}
