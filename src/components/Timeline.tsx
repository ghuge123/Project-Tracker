import { useMemo } from "react";
import { useStore } from "../store/useStore";
import { filterTasks } from "../utils/filterTasks";

const DAY_WIDTH = 48;
const ROW_HEIGHT = 44;

export default function Timeline() {
  const { tasks, filters } = useStore();

  const data = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  const now = new Date();
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

      <div className="overflow-hidden border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="relative flex" style={{ width: `${totalWidth}px` }}>
          {Array.from({ length: daysInMonth }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 border-r border-slate-200 text-[10px] font-semibold text-slate-500 h-10 flex items-center justify-center"
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
              linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)
            `,
            backgroundSize: `${DAY_WIDTH}px 100%, 100% ${ROW_HEIGHT}px`,
          }}
        />

        <div
          className="absolute top-0 bottom-0 w-[2px] bg-indigo-500 z-10"
          style={{ left: `${todayPos}px` }}
        >
          <div className="sticky top-0 -ml-1.5 w-3 h-3 rounded-full bg-indigo-600 shadow" />
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

            const left = (taskStart.getDate() - 1) * DAY_WIDTH;

            const duration = Math.max(
              1,
              (taskEnd.getTime() - taskStart.getTime()) / 86400000
            );

            const width = duration * DAY_WIDTH;

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
                  className={`group relative h-8 rounded-lg shadow-md flex items-center px-3 cursor-pointer transition-all duration-200 hover:scale-[1.03]

                    ${
                      t.priority === "critical"
                        ? "bg-gradient-to-r from-red-500 to-red-600"
                        : t.priority === "high"
                        ? "bg-gradient-to-r from-orange-400 to-orange-500"
                        : t.priority === "medium"
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500"
                    }
                  `}
                  style={{
                    left: `${left}px`,
                    width: `${width}px`,
                  }}
                >
  
                  <div className="text-[11px] font-semibold truncate w-full">
  {t.title}
</div>

                 
<div
  className={`opacity-0 group-hover:opacity-100 absolute ${
    i === 0 || i === 1
      ? "top-full mt-2"
      : "bottom-full mb-2"
  } left-1/2 -translate-x-1/2 bg-slate-900 text-white p-2 rounded text-xs shadow-xl transition pointer-events-none z-50 w-max`}
>
  <p className="font-semibold">{t.title}</p>
  <div className="flex justify-between gap-4 text-gray-300 mt-1">
    <span>Priority: {t.priority}</span>
    <span>{duration.toFixed(0)} days</span>
  </div>
</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}