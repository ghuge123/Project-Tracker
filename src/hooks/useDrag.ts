
import { useState } from "react";
import type { Task } from "../store/useStore";

type UpdateTaskFn = (id: string, updates: Partial<Task>) => void;

export function useDrag(updateTask: UpdateTaskFn) {
  const [dragging, setDragging] = useState<Task | null>(null);

  const onPointerDown = (task: Task, e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(task);

    const move = (ev: PointerEvent) => {
      const el = document.elementFromPoint(ev.clientX, ev.clientY);
      const column = el?.closest("[data-column]");

      if (column) {
        column.classList.add("bg-blue-100");
      }
    };

    const up = (ev: PointerEvent) => {
      const el = document.elementFromPoint(ev.clientX, ev.clientY);
      const column = el?.closest("[data-column]");

      if (column) {
        const newStatus = column.getAttribute("data-column");
        updateTask(task.id, { status: newStatus as Task["status"] });
      }

      setDragging(null);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return { dragging, onPointerDown };
}