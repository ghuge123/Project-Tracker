import { create } from "zustand";

export type Status = "todo" | "inprogress" | "inreview" | "done";
export type Priority = "critical" | "high" | "medium" | "low";

export type Task = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  assignee: string;
  startDate?: number;
  dueDate: number;
};

export type Filters = {
  status: Status[];
  priority: Priority[];
  assignee: string[];
};

export type UserPresence = {
  id: number;
  color: string;
  taskId: string | null;
};

type Store = {
  tasks: Task[];
  view: "kanban" | "list" | "timeline";
  filters: Filters;

  // ✅ NEW
  users: UserPresence[];

  setTasks: (t: Task[]) => void;
  setView: (v: Store["view"]) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  setFilters: (f: Partial<Filters>) => void;

  // ✅ NEW
  setUsers: (users: UserPresence[]) => void;
};

export const useStore = create<Store>((set) => ({
  tasks: [],
  view: "kanban",

  filters: {
    status: [],
    priority: [],
    assignee: [],
  },

  // ✅ INITIAL USERS (SIMULATION)
  users: [
    { id: 1, color: "bg-red-500", taskId: null },
    { id: 2, color: "bg-green-500", taskId: null },
    { id: 3, color: "bg-blue-500", taskId: null },
  ],

  setTasks: (tasks) => set({ tasks }),
  setView: (view) => set({ view }),

  updateTask: (id, updates) =>
    set((s) => ({
      tasks: s.tasks.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),

  setFilters: (f) =>
    set((s) => ({
      filters: { ...s.filters, ...f },
    })),

  // ✅ SET USERS
  setUsers: (users) => set({ users }),
}));