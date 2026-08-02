import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecentActivitiesThunk } from '../../redux/activityThunks';
import {
    GitCommit,
    Code2,
    BookOpen,
    Linkedin,
    CheckSquare,
    CheckCircle2,
    Sparkles,
    Trophy,
    Bell,
    Clock,
    Zap
} from 'lucide-react';

const ICON_MAP = {
    CheckSquare,
    CheckCircle2,
    BookOpen,
    Clock,
    GitCommit,
    GitPullRequest: GitCommit,
    Github: GitCommit,
    Code2,
    Linkedin,
    Sparkles,
    Trophy,
    Bell,
    Zap,
};

function formatRelativeTime(dateStr) {
    if (!dateStr) return 'Recently';
    const date = new Date(dateStr);
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
}

function Timeline() {
    const dispatch = useDispatch();
    const { recent = [] } = useSelector((state) => state.activity);

    useEffect(() => {
        dispatch(fetchRecentActivitiesThunk(5));
    }, [dispatch]);

    const displayActivities = recent.length > 0
        ? recent.map(act => ({
            title: act.title,
            time: formatRelativeTime(act.createdAt),
            icon: ICON_MAP[act.icon] || Zap,
            color: act.color === 'amber' ? 'text-amber-400' : act.color === 'emerald' ? 'text-emerald-400' : act.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400',
            bg: act.color === 'amber' ? 'bg-amber-400/10' : act.color === 'emerald' ? 'bg-emerald-400/10' : act.color === 'cyan' ? 'bg-cyan-400/10' : 'bg-amber-400/10'
        }))
        : [
            { title: "Started CodeSpark Journey", time: "Just now", icon: Zap, color: "text-amber-400", bg: "bg-amber-400/10" },
        ];

    return (
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl flex flex-col h-full starting:opacity-0 starting:translate-y-4 opacity-100 translate-y-0 transition-all duration-700 delay-300 ease-out hover:border-amber-500/20">
            <div className="p-5 border-b border-[#1F2937]">
                <h3 className="text-white font-semibold text-sm">Activity Feed</h3>
            </div>

            <div className="p-5 flex-1">
                <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#1F2937] before:via-[#1F2937] before:to-transparent">
                    {displayActivities.map((act, i) => {
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