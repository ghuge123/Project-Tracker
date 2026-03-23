// src/components/List.tsx
import { useState } from "react";
import { useStore } from "../store/useStore";

const rowHeight = 50;

export default function List() {
  const { tasks } = useStore();
  const [scrollTop, setScrollTop] = useState(0);

  const containerHeight = 400;
  const visibleCount = Math.ceil(containerHeight / rowHeight);
  const start = Math.floor(scrollTop / rowHeight);

  const visible = tasks.slice(start, start + visibleCount + 5);

  return (
    <div
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={(e) =>
        setScrollTop((e.target as any).scrollTop)
      }
      className="border"
    >
      <div style={{ height: tasks.length * rowHeight }}>
        <div
          style={{
            transform: `translateY(${start * rowHeight}px)`,
          }}
        >
          {visible.map((t) => (
            <div
              key={t.id}
              style={{ height: rowHeight }}
              className="border-b flex items-center px-2"
            >
              {t.title} | {t.priority}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}