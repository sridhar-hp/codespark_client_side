import { Trophy } from 'lucide-react';

function AchievementCard({ title, icon: Icon = Trophy, desc, delay = "0ms" }) {
    return (
        <div
            className="group bg-[#111827] border border-[#1F2937] p-4 rounded-xl flex items-center gap-4 hover:border-amber-500/40 hover:bg-[#111827]/80 transition-all cursor-pointer starting:opacity-0 starting:translate-x-4 opacity-100 translate-x-0 duration-700 ease-out"
            style={{ transitionDelay: delay }}
        >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1F2937] to-[#0B1120] border border-[#374151] flex items-center justify-center group-hover:border-amber-500/50 group-hover:shadow-[0_0_10px_rgba(245,158,11,0.2)] transition-all">
                <Icon className="w-4 h-4 text-amber-400" />
            </div>
            <div>
                <h4 className="text-white text-sm font-semibold">{title}</h4>
                <p className="text-[#6B7280] text-xs">{desc}</p>
            </div>
        </div>
    );
}
export default AchievementCard;