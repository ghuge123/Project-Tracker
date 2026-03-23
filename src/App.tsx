import { useEffect } from "react";
import { useStore } from "./store/useStore";
import { generateTasks } from "./data/data";
import Kanban from "./components/Kanban.tsx";
import List from "./components/List.tsx";
import Timeline from "./components/Timeline.tsx";

export default function App() {
  const { view, setView, setTasks } = useStore();

  useEffect(() => {
    setTasks(generateTasks());
  }, []);

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <button onClick={() => setView("kanban")}>Kanban</button>
        <button onClick={() => setView("list")}>List</button>
        <button onClick={() => setView("timeline")}>Timeline</button>
      </div>

      {view === "kanban" && <Kanban />}
      {view === "list" && <List />}
      {view === "timeline" && <Timeline />}
    </div>
  );
}