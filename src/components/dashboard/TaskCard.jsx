import { Circle, CheckCircle2, MoreHorizontal } from 'lucide-react';

function TaskCard() {
  const tasks = [
    { name: "Complete React Context module", status: "done", priority: "High" },
    { name: "Push CODESPARK dashboard UI", status: "todo", priority: "High" },
    { name: "Solve Daily LeetCode (Hard)", status: "todo", priority: "Medium" },
    { name: "Publish LinkedIn update", status: "todo", priority: "Low" }
  ];

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-xl flex flex-col h-full starting:opacity-0 starting:translate-y-4 opacity-100 translate-y-0 transition-all duration-700 delay-150 ease-out hover:border-amber-500/20">
      <div className="flex items-center justify-between p-5 border-b border-[#1F2937]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <h3 className="text-white font-semibold text-sm">Today's Focus</h3>
        </div>
        <button className="text-[#9CA3AF] hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-2 flex-1">
        <ul className="space-y-1">
          {tasks.map((task, i) => (
            <li 
              key={i} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1F2937]/50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {task.status === "done" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Circle className="w-4 h-4 text-[#4B5563] group-hover:text-amber-500 transition-colors" />
                )}
                <span className={`text-sm font-medium transition-colors ${task.status === "done" ? 'text-[#6B7280] line-through' : 'text-[#D1D5DB] group-hover:text-white'}`}>
                  {task.name}
                </span>
              </div>
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md ${
                task.priority === 'High' ? 'bg-rose-500/10 text-rose-400' : 
                task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 
                'bg-[#1F2937] text-[#9CA3AF]'
              }`}>
                {task.priority}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default TaskCard;