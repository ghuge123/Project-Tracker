const users = ["DG", "AK", "RS", "MJ", "KP", "SK"];
const statuses = ["todo", "inprogress", "inreview", "done"] as const;
const priorities = ["critical", "high", "medium", "low"] as const;

export function generateTasks(count = 500) {
  return Array.from({ length: count }).map((_, i) => {
    const start = Date.now() - Math.random() * 10 * 86400000;
    const due = start + Math.random() * 15 * 86400000;

    return {
      id: "task-" + i,
      title: "Task " + i,
      status: statuses[Math.floor(Math.random() * 4)],
      priority: priorities[Math.floor(Math.random() * 4)],
      assignee: users[Math.floor(Math.random() * users.length)],
      startDate: Math.random() > 0.2 ? start : undefined,
      dueDate: due,
    };
  });
}