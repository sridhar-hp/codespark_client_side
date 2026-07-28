
import { useSelector } from 'react-redux';
import { Target, Zap } from 'lucide-react';

export default function ProgressCard({ title, value, level: propLevel, type, delay = "0ms" }) {
    const { level: reduxLevel } = useSelector((state) => state.xp);
    const level = propLevel || reduxLevel || 1;
    const totalXP = value || 0;
    const currentLevelProgressXP = totalXP % 100;
    const xpToNextLevel = 100 - currentLevelProgressXP;

    return (
        <div
            className="bg-[#111827] border border-[#1F2937] p-5 rounded-xl hover:border-amber-500/20 transition-all starting:opacity-0 starting:-translate-x-4 opacity-100 translate-x-0 ease-out"
            style={{ transitionDelay: delay }}
        >
            <div className="flex items-center gap-2 mb-5">
                {type === 'bar' ? <Zap className="w-4 h-4 text-amber-500" /> : <Target className="w-4 h-4 text-amber-500" />}
                <h3 className="text-white text-sm font-semibold">{title}</h3>
            </div>

            {type === 'bar' ? (
                <div className="space-y-3">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold">Level {level}</span>
                        <span className="text-[#9CA3AF]"><span className="text-white font-bold text-sm">{totalXP}</span> XP</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#0B1120] rounded-full overflow-hidden border border-[#1F2937] shadow-inner">
                        <div
                            className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 relative transition-all duration-700"
                            style={{ width: `${Math.min(100, Math.max(5, currentLevelProgressXP))}%` }}
                        >
                            <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/20 blur-[2px]" />
                        </div>
                    </div>
                    <p className="text-[#6B7280] text-xs font-medium">{xpToNextLevel} XP to Level {level + 1}</p>
                </div>
            ) : (
                <div className="flex items-center gap-6">
                    <div className="relative w-20 h-20 flex-shrink-0">
                        {/* Vercel-style SVG Donut Chart */}
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" className="stroke-[#1F2937]" strokeWidth="8" fill="none" />
                            <circle
                                cx="50" cy="50" r="40"
                                className="stroke-amber-500 transition-all duration-1000 ease-out"
                                strokeWidth="8" fill="none"
                                strokeDasharray="251.2"
                                strokeDashoffset={251.2 - (251.2 * value) / 100}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-white">{value}<span className="text-xs text-[#9CA3AF]">%</span></span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-white font-medium mb-1">Weekly Goal: {value}%</p>
                        <p className="text-xs text-[#9CA3AF] leading-relaxed">You're on track to beat last week's consistency score.</p>
                    </div>
                </div>
            )}
        </div>
    );
}