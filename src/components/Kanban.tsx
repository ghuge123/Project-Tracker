import { useStore, type Task, type Status } from "../store/useStore";
import { filterTasks } from "../utils/filterTasks";
import type { PointerEvent } from "react";

const cols: Status[] = ["todo", "inprogress", "inreview", "done"];

export default function Kanban() {
  const { tasks, filters, updateTask } = useStore();
  const data = filterTasks(tasks, filters);

  // ✅ Typed drag handler
  const onPointerDown = (task: Task, e: PointerEvent) => {
    e.preventDefault();

    const up = (ev: PointerEvent) => {
      const el = document.elementFromPoint(ev.clientX, ev.clientY);
      const col = el?.closest("[data-col]")?.getAttribute("data-col") as Status | null;

      if (col && col !== task.status) {
        updateTask(task.id, { status: col });
      }

      window.removeEventListener("pointerup", up as any);
    };

    window.addEventListener("pointerup", up as any);
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {cols.map((c) => {
        const columnTasks = data.filter((t) => t.status === c);

        return (
          <div
            key={c}
            data-col={c}
            className="bg-gray-100 rounded-xl p-3 flex flex-col max-h-[500px]"
          >
            {/* Column Header */}
            <h2 className="font-semibold text-sm mb-3 flex justify-between capitalize">
              {c}
              <span className="text-gray-400 text-xs">
                {columnTasks.length}
              </span>
            </h2>

            {/* Empty State */}
            {columnTasks.length === 0 && (
              <div className="text-gray-400 text-xs text-center py-6">
                No tasks
              </div>
            )}

            {/* Tasks */}
            {columnTasks.map((t) => (
              <div
                key={t.id}
                onPointerDown={(e) => onPointerDown(t, e)}
                className="bg-white rounded-lg p-3 mb-3 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                {/* Title */}
                <div className="font-medium text-sm">{t.title}</div>

                {/* Bottom */}
                <div className="flex justify-between items-center mt-3">
                  
                  {/* Avatar */}
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">
                    {t.assignee}
                  </div>

                  {/* Priority Badge */}
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      t.priority === "critical"
                        ? "bg-red-100 text-red-600"
                        : t.priority === "high"
                        ? "bg-orange-100 text-orange-600"
                        : t.priority === "medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}