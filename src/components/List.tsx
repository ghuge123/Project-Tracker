import { useState } from "react";
import { useStore } from "../store/useStore";
import { filterTasks } from "../utils/filterTasks";

const h = 50;

export default function List() {
  const { tasks, filters } = useStore();
  const data = filterTasks(tasks, filters);

  const [top, setTop] = useState(0);

  const start = Math.floor(top / h);
  const visible = data.slice(start, start + 15);

  return (
    <div
      className="bg-white rounded-xl shadow overflow-hidden"
      onScroll={(e) => setTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: data.length * h }}>
        <div style={{ transform: `translateY(${start * h}px)` }}>
          {visible.map((t) => (
            <div key={t.id} style={{ height: h }} className="border-b px-2">
              {t.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}