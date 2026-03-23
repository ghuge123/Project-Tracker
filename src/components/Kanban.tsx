import { useStore } from "../store/useStore";
import { useDrag } from "../hooks/useDrag";

const columns: ("todo" | "inprogress" | "inreview" | "done")[] = [
  "todo",
  "inprogress",
  "inreview",
  "done",
];

export default function Kanban() {
  const { tasks, updateTask } = useStore();

  const { dragging, onPointerDown } = useDrag(updateTask);

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map((col) => (
        <div
          key={col}
          data-column={col} // ✅ IMPORTANT (for drop detection)
          className="bg-gray-100 p-2 min-h-[400px] transition"
        >
          <h2 className="font-bold mb-2">{col.toUpperCase()}</h2>

          {tasks.filter((t) => t.status === col).length === 0 && (
            <div className="text-gray-400 text-sm p-2">
              No tasks here
            </div>
          )}

          {tasks
            .filter((t) => t.status === col)
            .map((task) => (
              <div
                key={task.id}
                onPointerDown={(e) => onPointerDown(task, e)} // ✅ custom drag
                className={`bg-white p-3 mb-2 shadow cursor-grab active:cursor-grabbing transition ${
                  dragging?.id === task.id ? "opacity-50" : ""
                }`}
              >
                {/* Title */}
                <div className="font-medium">{task.title}</div>

                {/* Bottom row */}
                <div className="flex justify-between items-center mt-2 text-xs">
                  {/* Avatar */}
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                    {task.assignee}
                  </div>

                  {/* Priority badge */}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      task.priority === "critical"
                        ? "bg-red-500"
                        : task.priority === "high"
                        ? "bg-orange-400"
                        : task.priority === "medium"
                        ? "bg-yellow-400"
                        : "bg-green-400"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}