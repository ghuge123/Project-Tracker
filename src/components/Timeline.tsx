import { useStore } from "../store/useStore";
import { filterTasks } from "../utils/filterTasks";
import { useMemo } from "react";

const DAY_WIDTH = 40; // px per day
const ROW_HEIGHT = 40; // px per task row

export default function Timeline() {
  const { tasks, filters } = useStore();
  const data = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  // Establish the start of the current month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  
  // Calculate Today's position
  const todayPos = ((now.getTime() - startOfMonth) / 86400000) * DAY_WIDTH;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500 border-red-600';
      case 'High': return 'bg-orange-500 border-orange-600';
      case 'Medium': return 'bg-blue-500 border-blue-600';
      default: return 'bg-slate-500 border-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-200px)]">
      {/* Header / Legend Area */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-semibold text-slate-800">Project Timeline</h3>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Medium</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto relative p-4">
        {/* The Grid & Tasks Container */}
        <div 
          className="relative min-h-full"
          style={{ 
            width: `${31 * DAY_WIDTH}px`, // Fixed width for a month
            backgroundImage: `linear-gradient(to right, #f1f5f9 1px, transparent 1px)`,
            backgroundSize: `${DAY_WIDTH}px 100%`
          }}
        >
          {/* Today Marker */}
          <div 
            className="absolute top-0 bottom-0 w-px bg-red-400 z-10 pointer-events-none"
            style={{ left: todayPos }}
          >
            <span className="absolute -top-2 -left-10 text-[10px] font-bold text-red-500 uppercase tracking-tighter">
              Today
            </span>
          </div>

          {/* Render Task Bars */}
          {data.map((t, i) => {
            const taskStart = t.startDate ? new Date(t.startDate).getTime() : new Date(t.dueDate).getTime();
            const taskEnd = new Date(t.dueDate).getTime();
            
            const left = ((taskStart - startOfMonth) / 86400000) * DAY_WIDTH;
            // Ensure width is at least 12px for visibility
            const width = Math.max(12, ((taskEnd - taskStart) / 86400000) * DAY_WIDTH);

            return (
              <div
                key={t.id}
                className={`absolute ${getPriorityColor(t.priority)} border-b-2 h-7 rounded-md text-white shadow-sm transition-all hover:brightness-110 flex items-center px-2 group cursor-pointer`}
                style={{ 
                  left: `${left}px`, 
                  width: `${width}px`, 
                  top: `${i * ROW_HEIGHT + 20}px` 
                }}
              >
                {/* Task Label - Shows inside if wide enough, otherwise outside */}
                <span className={`whitespace-nowrap text-[11px] font-medium truncate ${width < 100 ? 'absolute left-full ml-2 text-slate-600' : ''}`}>
                  {t.title}
                </span>

                {/* Tooltip on hover */}
                <div className="invisible group-hover:visible absolute -top-10 left-0 bg-slate-800 text-white p-2 rounded text-[10px] z-20 w-32 shadow-xl pointer-events-none">
                  {t.title} <br />
                  Due: {new Date(t.dueDate).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}