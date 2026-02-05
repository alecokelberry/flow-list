import React, { useState } from 'react';
import { format } from 'date-fns';
import { Check, Trash2, Calendar, Edit2, Save } from 'lucide-react';
import { Button, Input, Select, Card, Badge } from './ui';
import { cn } from '@/utils';
import { Task } from '@/types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
}

interface EditFormState {
  title: string;
  description: string;
  priority: Task['priority'];
  dueDate: string;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<EditFormState>({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    dueDate: task.dueDate || '',
  });

  const handleSave = () => {
    if (!editForm.title.trim()) return;
    onEdit(task.id, editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      dueDate: task.dueDate || '',
    });
    setIsEditing(false);
  };

  // Keyboard shortcut for saving/canceling
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        handleSave();
    } else if (e.key === 'Escape') {
        handleCancel();
    }
  };

  if (isEditing) {
    return (
      <Card className="p-4 mb-3 animate-in fade-in zoom-in-95 duration-200">
        <div className="space-y-3" onKeyDown={handleKeyDown}>
          <Input
            value={editForm.title}
            onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Task title"
            className="font-medium"
            autoFocus
            aria-label="Edit task title"
          />
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Description (optional)"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100 placeholder-slate-400 resize-none"
            rows={2}
            aria-label="Edit task description"
          />
          <div className="flex gap-2">
            <Select
              value={editForm.priority}
              onChange={(e) => setEditForm(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
              className="flex-1"
              aria-label="Edit priority"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Select>
            <Input
              type="date"
              value={editForm.dueDate ? editForm.dueDate.split('T')[0] : ''} // simple handling for input type=date
              onChange={(e) => setEditForm(prev => ({ ...prev, dueDate: e.target.value }))}
              className="flex-1"
              aria-label="Edit due date"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={handleCancel} aria-label="Cancel editing">
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} aria-label="Save changes">
              <Save className="w-4 h-4 mr-1.5" />
              Save
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "group p-4 mb-3 transition-all duration-200 hover:shadow-md border-l-4",
      task.completed ? "opacity-60 bg-slate-50 dark:bg-slate-800/50" : "bg-white dark:bg-slate-800",
      task.priority === 'high' ? "border-l-red-500" :
      task.priority === 'medium' ? "border-l-amber-500" :
      "border-l-green-500" // low
    )}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={cn(
            "mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900",
            task.completed
              ? "bg-blue-500 border-blue-500 text-white"
              : "border-slate-300 dark:border-slate-600 hover:border-blue-400"
          )}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed && <Check className="w-3.5 h-3.5" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={cn(
              "text-lg font-medium truncate pr-2 transition-all",
              task.completed ? "text-slate-500 line-through decoration-slate-400" : "text-slate-900 dark:text-slate-100"
            )}>
              {task.title}
            </h3>
            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
               <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                aria-label="Edit task"
                className="text-slate-400 hover:text-blue-600"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(task.id)}
                aria-label="Delete task"
                className="text-slate-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {(task.description || task.dueDate) && (
            <div className="mt-2 text-sm space-y-1">
              {task.description && (
                 <p className="text-slate-600 dark:text-slate-400 break-words line-clamp-2">
                   {task.description}
                 </p>
              )}
              {task.dueDate && (
                <div className="flex items-center text-slate-500 dark:text-slate-500 text-xs mt-2">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {/* Handle potential invalid dates gracefully */}
                  {(() => {
                      try {
                          return format(new Date(task.dueDate), 'MMM d, yyyy');
                      } catch (e) {
                          return task.dueDate;
                      }
                  })()}
                </div>
              )}
            </div>
          )}
          
          <div className="mt-3">
             <Badge variant={task.priority === 'high' ? 'high' : task.priority === 'medium' ? 'medium' : 'low'}>
               {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
             </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
