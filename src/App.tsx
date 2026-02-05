import React, { useState, useMemo } from 'react';
import { Moon, Sun, CheckSquare, Github } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { useTheme } from '@/hooks/useTheme';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { FilterBar } from '@/components/FilterBar';
import { Button } from '@/components/ui';

function App() {
  const { tasks, addTask, toggleComplete, deleteTask, editTask } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const [filter, setFilter] = useState('all');

  // Computed state
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((t) => !t.completed);
      case 'completed':
        return tasks.filter((t) => t.completed);
      case 'high':
        return tasks.filter((t) => t.priority === 'high' && !t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const counts: Record<string, number> = useMemo(() => {
     return {
         all: tasks.length,
         active: tasks.filter(t => !t.completed).length,
         completed: tasks.filter(t => t.completed).length,
         high: tasks.filter(t => t.priority === 'high' && !t.completed).length
     }
  }, [tasks]);

  return (
    <div className="min-h-screen transition-colors duration-200 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-8 sm:mb-12 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-600/20">
                <CheckSquare className="w-6 h-6 text-white" />
             </div>
             <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">FlowList</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Manage your day efficiently</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                <Moon className="w-5 h-5 text-slate-600" />
                )}
            </Button>
            <a 
              href="https://github.com/yourusername/flow-list" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </header>

        <main className="animate-in slide-in-from-bottom-4 duration-500 delay-150">
          <section aria-label="Add new task">
             <TaskForm onAdd={addTask} />
          </section>

          <section aria-label="Task list">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
               <h2 className="text-lg font-semibold flex items-center gap-2">
                  My Tasks
                  <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full text-xs">
                      {tasks.filter(t => !t.completed).length}
                  </span>
               </h2>
               <FilterBar filter={filter} setFilter={setFilter} counts={counts} />
             </div>

             <div className="relative min-h-[300px]">
                <TaskList
                    tasks={filteredTasks}
                    onToggle={toggleComplete}
                    onDelete={deleteTask}
                    onEdit={editTask}
                />
             </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
