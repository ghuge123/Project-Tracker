import { useMemo } from "react";
import { useStore } from "../store/useStore";
import { filterTasks } from "../utils/filterTasks";

const DAY_WIDTH = 48;
const ROW_HEIGHT = 44;

export default function Timeline() {
  const { tasks, filters, users } = useStore();

  const data = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  const totalWidth = daysInMonth * DAY_WIDTH;

  const todayPos =
    (now.getDate() - 1) * DAY_WIDTH +
    (now.getHours() / 24) * DAY_WIDTH;

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      

      <div className="overflow-hidden border-b border-slate-200 bg-slate-50">
        <div className="relative flex" style={{ width: `${totalWidth}px` }}>
          {Array.from({ length: daysInMonth }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 border-r border-slate-200 text-[10px] font-bold text-slate-400 h-10 flex items-center justify-center"
              style={{ width: DAY_WIDTH }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto relative">
      
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            width: `${totalWidth}px`,
            height: `${Math.max(data.length * ROW_HEIGHT, 500)}px`,
            backgroundImage: `
              linear-gradient(to right, #e2e8f0 1px, transparent 1px),
              linear-gradient(to bottom, #f8fafc 1px, transparent 1px)
            `,
            backgroundSize: `${DAY_WIDTH}px 100%, 100% ${ROW_HEIGHT}px`,
          }}
        />

    
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-indigo-500/40 z-10"
          style={{ left: `${todayPos}px` }}
        >
          <div className="sticky top-0 -ml-1.5 w-3 h-3 rounded-full bg-indigo-600" />
        </div>

    
        <div
          className="relative"
          style={{
            width: `${totalWidth}px`,
            height: `${data.length * ROW_HEIGHT}px`,
          }}
        >
          {data.map((t, i) => {
            const taskStart = t.startDate
              ? new Date(t.startDate)
              : new Date(t.dueDate);

            const taskEnd = new Date(t.dueDate);

            const left =
              (taskStart.getDate() - 1) * DAY_WIDTH;

            const duration = Math.max(
              1,
              (taskEnd.getTime() - taskStart.getTime()) / 86400000
            );

            const width = duration * DAY_WIDTH;

            
            const taskUsers =
              users?.filter((u) => u.taskId === t.id) || [];

            return (
              <div
                key={t.id}
                className="absolute flex items-center"
                style={{
                  top: i * ROW_HEIGHT,
                  height: ROW_HEIGHT,
                  width: `${totalWidth}px`,
                }}
              >
            
                <div
                  className={`relative h-8 rounded-lg shadow-sm flex items-center px-3 text-white text-xs font-medium ${
                    t.priority === "critical"
                      ? "bg-red-500"
                      : t.priority === "high"
                      ? "bg-orange-500"
                      : t.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                  style={{
                    left: `${left}px`,
                    width: `${width}px`,
                  }}
                >
                  {t.title}

            
                  {taskUsers.length > 0 && (
                    <div className="absolute -right-2 -top-2 flex -space-x-2">
                      {taskUsers.map((u) => (
                        <div
                          key={u.id}
                          className={`w-5 h-5 rounded-full border-2 border-white ${u.color}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}