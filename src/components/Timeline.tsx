// src/components/Timeline.tsx
import { useStore } from "../store/useStore";

export default function Timeline() {
  const { tasks } = useStore();
  const start = new Date().setDate(1);

  return (
    <div className="overflow-x-auto border p-4">
      <div className="relative w-[2000px] h-[400px]">
        {tasks.map((t, i) => {
          const left = ((t.startDate || t.dueDate) - start) / 86400000 * 40;
          const width =
            ((t.dueDate - (t.startDate || t.dueDate)) /
              86400000) *
              40 || 10;

          return (
            <div
              key={t.id}
              className="absolute bg-blue-500 h-6 text-xs text-white px-1"
              style={{ left, width, top: i * 30 }}
            >
              {t.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}