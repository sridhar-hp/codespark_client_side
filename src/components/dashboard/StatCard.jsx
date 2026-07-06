import { TrendingUp, TrendingDown } from "lucide-react";

function StatCard({ title, value, icon: Icon, trend, trendUp = true, delay = "0ms" }) {
    // A sleek Vercel/Linear style sparkline placeholder
    const sparkline = trendUp ? (
        <svg className="w-16 h-8 text-emerald-500/20" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M0 30 Q 20 20, 40 25 T 70 10 T 100 5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0 30 Q 20 20, 40 25 T 70 10 T 100 5 L 100 30 L 0 30 Z" fill="currentColor" stroke="none" />
        </svg>
    ) : (
        <svg className="w-16 h-8 text-rose-500/20" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M0 5 Q 20 15, 40 10 T 70 25 T 100 30" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div
            className="relative bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] p-5 rounded-xl transition-all duration-300 hover:border-amber-500/40 hover:bg-[#111827] group starting:opacity-0 starting:scale-95 opacity-100 scale-100 ease-out"
            style={{ transitionDelay: delay }}
        >
            <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity">
                {sparkline}
            </div>

            <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[#0B1120] border border-[#1F2937] text-[#9CA3AF] group-hover:text-amber-500 group-hover:border-amber-500/30 transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
            </div>

            <div>
                <h3 className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider mb-1">{title}</h3>
                <div className="flex items-baseline gap-3">
                    <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
                    {trend && (
                        <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {trend}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default StatCard;