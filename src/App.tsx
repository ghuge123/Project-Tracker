import { useEffect } from "react";
import { useStore } from "./store/useStore";
import { generateTasks } from "./data/data";
import Filters from "./components/Filters";
import Kanban from "./components/Kanban";
import List from "./components/List";
import Timeline from "./components/Timeline";

export default function App() {
  const { view, setView, setTasks } = useStore();

  useEffect(() => {
    setTasks(generateTasks());
  }, [setTasks]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* Main Container */}
      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <h1 className="text-2xl font-semibold mb-6">
          Project Tracker
        </h1>

        {/* Filters */}
        <Filters />

        {/* View Switch Tabs */}
        <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm w-fit mb-6">
          {["kanban", "list", "timeline"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as typeof view)}
              className={`px-4 py-2 rounded-md text-sm capitalize transition-all duration-200 ${
                view === v
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* View Content */}
        <div className="bg-transparent">
          {view === "kanban" && <Kanban />}
          {view === "list" && <List />}
          {view === "timeline" && <Timeline />}
        </div>

      </div>
    </div>
  );
}