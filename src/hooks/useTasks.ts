import { useState, useEffect } from 'react';
import { Task } from '@/types';

/**
 * Custom hook to manage tasks state with localStorage persistence.
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem('flowlist-tasks');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse tasks from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('flowlist-tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage:', e);
    }
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'completed' | 'isEditing'>) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      completed: false,
      isEditing: false,
      ...taskData,
      priority: taskData.priority || 'medium',
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const setEditing = (id: string, isEditing: boolean) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, isEditing } : task))
    );
  };

  return { tasks, addTask, toggleComplete, deleteTask, editTask, setEditing };
}
