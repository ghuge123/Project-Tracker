import { useEffect } from "react";
import { useStore, type Status, type Priority } from "../store/useStore";

export default function Filters() {
  const { filters, setFilters } = useStore();

  const update = (key: "status" | "priority", value: string) => {
    const val = value ? [value] : [];
    setFilters({ [key]: val as any });

    const params = new URLSearchParams();
    if (val.length) params.set(key, val.join(","));

    window.history.replaceState({}, "", `?${params.toString()}`);
  };

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const status = p.get("status")?.split(",") as Status[] || [];
    const priority = p.get("priority")?.split(",") as Priority[] || [];

    setFilters({ status, priority });
  }, []);

  return (
    <div className="flex gap-3 mb-6 bg-white p-4 rounded-xl shadow-sm">
      <select
        value={filters.status[0] || ""}
        onChange={(e) => update("status", e.target.value)}
        className="border border-gray-200 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Status</option>
        <option value="todo">Todo</option>
        <option value="inprogress">In Progress</option>
        <option value="inreview">In Review</option>
        <option value="done">Done</option>
      </select>

      <select
        value={filters.priority[0] || ""}
        onChange={(e) => update("priority", e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Priority</option>
        <option value="critical">Critical</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}