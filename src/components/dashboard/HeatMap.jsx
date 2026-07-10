import React, { useState, useEffect, useRef } from 'react';
import {
    Flame,
    Sparkles,
    Activity,
    Calendar,
    CheckCircle2,
    Info,
    ChevronRight,
    TrendingUp,
    Award
} from 'lucide-react';

// Generate realistic mock developer activity for a 53-week period
const generateHeatmapData = (endDate) => {
    const data = [];
    const start = new Date(endDate);
    start.setDate(start.getDate() - 371); // 53 weeks * 7 days

    const taskPool = [
        "Refactored navigation context module",
        "Optimized SVG render tree loading",
        "Completed LeetCode binary tree study",
        "Drafted system architecture documentation",
        "Configured Tailwind CSS v4 color presets",
        "Implemented OAuth secure handshake",
        "Merged Pull Request for UI adjustments",
        "Conducted team peer design review",
        "Resolved state hydration warning",
        "Analyzed performance traces on load"
    ];

    // Helper to simulate higher activity mid-week and lower on weekends
    for (let i = 0; i < 371; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(currentDate.getDate() + i);
        const dayOfWeek = currentDate.getDay(); // 0 is Sunday, 1 is Monday...

        // Create organic clusters of intense activity vs rest periods
        const seed = Math.sin(i * 0.05) + Math.cos(i * 0.1) + (dayOfWeek === 0 || dayOfWeek === 6 ? -1.2 : 0.8);
        let level = 0;
        if (seed > 1.8) level = 4;
        else if (seed > 1.0) level = 3;
        else if (seed > 0.2) level = 2;
        else if (seed > -0.5) level = 1;

        // Generate correlated metrics based on intensity level
        const dailyXP = level === 0 ? 0 : level * 250 + Math.floor((i % 7) * 45);
        const sparkScore = level === 0 ? 0 : Math.min(100, level * 22 + Math.floor((i % 5) * 4));

        // Determine completed tasks
        const numTasks = level === 0 ? 0 : Math.min(taskPool.length, level + (i % 2));
        const tasks = [];
        for (let t = 0; t < numTasks; t++) {
            tasks.push(taskPool[(i + t) % taskPool.length]);
        }

        data.push({
            date: currentDate,
            level,
            dailyXP,
            sparkScore,
            tasks
        });
    }
    return data;
};

export default function HeatMap() {
    const endDate = new Date(2026, 6, 7); // July 7, 2026
    const [data, setData] = useState([]);
    const [hoveredDay, setHoveredDay] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [isAnimate, setIsAnimate] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        setData(generateHeatmapData(endDate));
        // Trigger staggered entry transitions shortly after mount
        const timer = setTimeout(() => setIsAnimate(true), 150);
        return () => clearTimeout(timer);
    }, []);

    // Format date helper
    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Group the flat 371-day list into 53 columns (weeks) of 7 days (Mon-Sun)
    const columns = [];
    if (data.length > 0) {
        for (let i = 0; i < 53; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                // Adjust indexing so Monday is row 0 and Sunday is row 6
                // Map original Sunday (0) to end index
                week.push(data[i * 7 + j]);
            }
            columns.push(week);
        }
    }

    const monthLabels = [];
    let lastMonth = '';
    columns.forEach((week, index) => {
        const date = week[0]?.date;
        if (date) {
            const currentMonth = date.toLocaleDateString('en-US', { month: 'short' });
            if (currentMonth !== lastMonth) {
                monthLabels.push({ text: currentMonth, colIndex: index });
                lastMonth = currentMonth;
            }
        }
    });

    // Track precise cell hover coords to render single clean boundary-safe tooltip
    const handleCellMouseEnter = (day, event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setHoveredDay(day);
        setTooltipPos({
            x: rect.left - containerRect.left + (rect.width / 2),
            y: rect.top - containerRect.top - 8
        });
    };

    const handleCellMouseLeave = () => {
        setHoveredDay(null);
    };

    // Color mapper based on the CODESPARK Amber theme spectrum
    const getCellClasses = (level) => {
        switch (level) {
            case 1: return 'bg-amber-950/40 border-amber-900/30 hover:border-amber-500/50 hover:bg-amber-900/60';
            case 2: return 'bg-amber-800/40 border-amber-700/40 hover:border-amber-500 hover:bg-amber-800/70';
            case 3: return 'bg-amber-600/70 border-amber-500/40 hover:border-amber-400 hover:bg-amber-600';
            case 4: return 'bg-amber-400 border-amber-300/50 hover:border-white hover:bg-amber-300 shadow-[0_0_6px_rgba(245,158,11,0.3)] hover:shadow-[0_0_12px_rgba(245,158,11,0.6)]';
            default: return 'bg-[#1F2937]/20 border-[#1F2937]/60 hover:bg-[#1F2937]/40 hover:border-[#374151]';
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-6 rounded-2xl flex flex-col gap-6 select-none shadow-2xl overflow-visible transition-all duration-500 hover:border-amber-500/20"
        >
            { }
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F2937]/60 pb-5">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                        <Activity className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-base tracking-tight">Spark Activity</h3>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">Developer footprints and output frequency</p>
                    </div>
                </div>

                {/* Highlight Stats Panels */}
                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Yearly Sparks</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-white font-extrabold text-lg">1,284</span>
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-md font-semibold flex items-center gap-0.5">
                                <TrendingUp className="w-2.5 h-2.5" /> +14%
                            </span>
                        </div>
                    </div>

                    <div className="w-px h-8 bg-[#1F2937]" />

                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Active Streak</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <Flame className="w-5 h-5 text-orange-500 animate-bounce" />
                            <span className="text-white font-extrabold text-lg">42 Days</span>
                        </div>
                    </div>
                </div>
            </div>

            { }
            <div className="relative w-full overflow-x-auto [scrollbar-width:thin] scrollbar-thumb-slate-800 pb-2">
                <div className="min-w-[760px] flex flex-col gap-2 relative">

                    {/* Month labels timeline */}
                    <div className="relative h-6 text-[#6B7280] text-[11px] font-semibold tracking-wider">
                        {monthLabels.map((label, index) => (
                            <span
                                key={index}
                                className="absolute transition-opacity duration-500"
                                style={{
                                    left: `${(label.colIndex * 13.8) + 28}px`,
                                    opacity: isAnimate ? 1 : 0
                                }}
                            >
                                {label.text}
                            </span>
                        ))}
                    </div>

                    {/* Grid Layout Rows + Label Stack */}
                    <div className="flex gap-2.5">
                        {/* Days of Week Y-Axis Indicators */}
                        <div className="flex flex-col justify-between text-[#6B7280] text-[10px] font-bold py-1.5 w-6 select-none uppercase">
                            <span>Mon</span>
                            <span>Wed</span>
                            <span>Fri</span>
                            <span>Sun</span>
                        </div>

                        {/* Staggered Column Assembly */}
                        <div className="flex gap-1.5 flex-1">
                            {columns.map((week, colIdx) => (
                                <div
                                    key={colIdx}
                                    className="flex flex-col gap-1.5 transition-all duration-700 ease-out"
                                    style={{
                                        transform: isAnimate ? 'translateY(0)' : 'translateY(8px)',
                                        opacity: isAnimate ? 1 : 0,
                                        transitionDelay: `${colIdx * 10}ms`
                                    }}
                                >
                                    {week.map((day, rowIdx) => {
                                        if (!day) return <div key={rowIdx} className="w-2.5 h-2.5 rounded-sm bg-transparent" />;
                                        return (
                                            <button
                                                key={rowIdx}
                                                onMouseEnter={(e) => handleCellMouseEnter(day, e)}
                                                onMouseLeave={handleCellMouseLeave}
                                                aria-label={`Contributions on ${formatDate(day.date)}: level ${day.level}`}
                                                className={`w-2.5 h-2.5 rounded-[3px] border transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500 ${getCellClasses(day.level)}`}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                { }
                {hoveredDay && (
                    <div
                        className="absolute z-50 w-64 bg-[#111827] border border-[#1F2937] rounded-xl p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-t-amber-500/40 pointer-events-none transition-all duration-150 flex flex-col gap-2.5 -translate-x-1/2 -translate-y-full"
                        style={{
                            left: `${tooltipPos.x}px`,
                            top: `${tooltipPos.y}px`
                        }}
                    >
                        {/* Tooltip Header Date */}
                        <div className="flex items-center justify-between border-b border-[#1F2937]/50 pb-2">
                            <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] font-medium">
                                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                                <span>{formatDate(hoveredDay.date)}</span>
                            </div>
                            <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                                Level {hoveredDay.level}
                            </span>
                        </div>

                        {/* Core Metrics: Score & Daily XP */}
                        <div className="grid grid-cols-2 gap-2 text-center bg-[#0B1120]/40 p-2 rounded-lg border border-[#1F2937]/30">
                            <div className="flex flex-col">
                                <span className="text-[9px] uppercase tracking-wider font-bold text-[#6B7280]">Daily XP</span>
                                <span className="text-white text-sm font-extrabold mt-0.5">+{hoveredDay.dailyXP}</span>
                            </div>
                            <div className="flex flex-col border-l border-[#1F2937]">
                                <span className="text-[9px] uppercase tracking-wider font-bold text-[#6B7280]">Spark Score</span>
                                <span className="text-amber-400 text-sm font-extrabold mt-0.5">{hoveredDay.sparkScore}%</span>
                            </div>
                        </div>

                        {/* Completed Developer Tasks List */}
                        <div className="flex flex-col gap-1.5">
                            <div className="text-[10px] uppercase tracking-wider font-bold text-[#6B7280]">Tasks Handled</div>
                            {hoveredDay.tasks.length === 0 ? (
                                <div className="text-xs text-[#4B5563] italic">No scheduled sparks logged</div>
                            ) : (
                                <ul className="space-y-1 max-h-[96px] overflow-y-auto">
                                    {hoveredDay.tasks.map((task, idx) => (
                                        <li key={idx} className="flex items-center gap-1.5 text-xs text-[#D1D5DB] font-medium truncate">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                            <span className="truncate">{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>

            { }
            <div className="flex items-center justify-between border-t border-[#1F2937]/60 pt-4 text-xs text-[#6B7280] font-medium">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Learn more about CODESPARK levels</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                </div>

                {/* Legend Scale Panel */}
                <div className="flex items-center gap-2">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-[3px] border border-[#1F2937]/60 bg-[#1F2937]/20" />
                        <div className="w-2.5 h-2.5 rounded-[3px] border border-amber-900/30 bg-amber-950/40" />
                        <div className="w-2.5 h-2.5 rounded-[3px] border border-amber-700/40 bg-amber-800/40" />
                        <div className="w-2.5 h-2.5 rounded-[3px] border border-amber-500/40 bg-amber-600/70" />
                        <div className="w-2.5 h-2.5 rounded-[3px] border border-amber-300/50 bg-amber-400 shadow-[0_0_4px_rgba(245,158,11,0.3)]" />
                    </div>
                    <span>More</span>
                </div>
            </div>
        </div>
    );
}