import type { Task, Filters } from "../store/useStore";

export function filterTasks(tasks: Task[], filters: Filters) {
  return tasks.filter((t) => {
    if (filters.status.length && !filters.status.includes(t.status)) return false;
    if (filters.priority.length && !filters.priority.includes(t.priority)) return false;
    if (filters.assignee.length && !filters.assignee.includes(t.assignee)) return false;
    return true;
  });
}