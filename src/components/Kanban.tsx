import { useStore } from "../store/useStore";

const columns = ["todo", "inprogress", "inreview", "done"];

export default function Kanban() {
  const { tasks, updateTask } = useStore();

  const handleDrop = (e: any, status: string) => {
    const id = e.dataTransfer.getData("id");
    updateTask(id, { status: status as any });
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map((col) => (
        <div
          key={col}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, col)}
          className="bg-gray-100 p-2 min-h-[400px]"
        >
          <h2 className="font-bold mb-2">{col.toUpperCase()}</h2>

          {tasks
            .filter((t) => t.status === col)
            .map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("id", task.id)
                }
                className="bg-white p-2 mb-2 shadow cursor-move"
              >
                <div>{task.title}</div>
                <div className="text-sm text-gray-500">
                  {task.assignee} | {task.priority}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}