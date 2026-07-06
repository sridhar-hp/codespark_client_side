import { GitCommit, Code2, BookOpen, Linkedin } from 'lucide-react';

 function Timeline() {
  const activities = [
    { title: "Pushed 4 commits to CODESPARK", time: "2h ago", icon: GitCommit, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "Solved 'Two Sum' on LeetCode", time: "4h ago", icon: Code2, color: "text-amber-400", bg: "bg-amber-400/10" },
    { title: "Completed React Advanced Patterns", time: "6h ago", icon: BookOpen, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { title: "Published weekly update", time: "Yesterday", icon: Linkedin, color: "text-indigo-400", bg: "bg-indigo-400/10" },
  ];

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-xl flex flex-col h-full starting:opacity-0 starting:translate-y-4 opacity-100 translate-y-0 transition-all duration-700 delay-300 ease-out hover:border-amber-500/20">
      <div className="p-5 border-b border-[#1F2937]">
        <h3 className="text-white font-semibold text-sm">Activity Feed</h3>
      </div>
      
      <div className="p-5 flex-1">
        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#1F2937] before:via-[#1F2937] before:to-transparent">
          {activities.map((act, i) => {
            const Icon = act.icon;
            return (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#1F2937] bg-[#0B1120] text-slate-500 group-hover:border-amber-500/50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                  <div className={`p-1.5 rounded-full ${act.bg}`}>
                    <Icon className={`w-4 h-4 ${act.color}`} />
                  </div>
                </div>
                
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-lg border border-[#1F2937] bg-[#111827] hover:bg-[#1F2937]/30 transition-colors shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#9CA3AF] text-xs font-medium">{act.time}</span>
                  </div>
                  <p className="text-sm font-medium text-white">{act.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Timeline;