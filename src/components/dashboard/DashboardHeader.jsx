import { Plus, Command, Sparkles } from 'lucide-react';

function DashboardHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 starting:opacity-0 starting:-translate-y-4 opacity-100 translate-y-0 transition-all duration-700 ease-out">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-500/90">Overview</span>
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
                <p className="text-[#9CA3AF] mt-1 text-sm">
                    Good Evening, Sridhar 👋 Let's build something amazing today.
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111827] border border-[#1F2937] text-[#9CA3AF] hover:text-white hover:border-[#374151] transition-all text-sm font-medium group">
                    <Command className="w-3.5 h-3.5 group-hover:text-amber-500 transition-colors" />
                    <span>Cmd + K</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#0B1120] transition-all text-sm font-semibold shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                    <Plus className="w-4 h-4" />
                    <span>New Entry</span>
                </button>
            </div>
        </div>
    );
}
export default DashboardHeader;