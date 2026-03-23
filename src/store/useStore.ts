// src/store/useStore.ts
import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  status: "todo" | "inprogress" | "inreview" | "done";
  priority: "critical" | "high" | "medium" | "low";
  assignee: string;
  startDate?: number;
  dueDate: number;
};

type Store = {
  tasks: Task[];
  view: "kanban" | "list" | "timeline";
  setView: (v: Store["view"]) => void;
  setTasks: (tasks: Task[]) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
};

export const useStore = create<Store>((set) => ({
  tasks: [],
  view: "kanban",

  setView: (view) => set({ view }),
  setTasks: (tasks) => set({ tasks }),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),
}));