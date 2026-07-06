import { Info } from 'lucide-react';

function HeatMap() {
    // Deterministic realistic pattern (simulating GitHub contributions)
    const generatePattern = () => {
        return Array.from({ length: 147 }).map((_, i) => {
            const week = Math.floor(i / 7);
            const day = i % 7;
            let level = 0;

            // Simulate clusters of activity
            if (week > 2 && week < 6) level = (day % 2 === 0) ? 2 : 1;
            if (week > 10 && week < 14) level = (day > 1 && day < 6) ? 3 : 0;
            if (week === 18 && day === 3) level = 4; // Spike
            if (i % 13 === 0) level = 2;
            if (i % 7 === 0 || i % 7 === 6) level = (Math.sin(i) > 0.5) ? 1 : 0; // Weekends lighter
            if (week > 15) level = (day % 3 === 0) ? 3 : 1; // High recent activity

            return level;
        });
    };

    const blocks = generatePattern();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

    const getColor = (level) => {
        switch (level) {
            case 1: return 'bg-amber-900/40 border-amber-900/20';
            case 2: return 'bg-amber-700/60 border-amber-700/30';
            case 3: return 'bg-amber-500/80 border-amber-500/40';
            case 4: return 'bg-amber-400 border-amber-400/50 shadow-[0_0_8px_rgba(251,191,36,0.6)]';
            default: return 'bg-[#1F2937]/30 border-[#1F2937]';
        }
    };

    return (
        <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-xl hover:border-amber-500/20 transition-all duration-500 starting:opacity-0 starting:scale-[0.98] opacity-100 scale-100 ease-out">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-sm">Spark Activity</h3>
                <div className="flex items-center gap-2 text-[#9CA3AF] text-xs">
                    <span>842 contributions in the last year</span>
                    <Info className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[#6B7280] text-xs font-medium pl-6">
                    {months.map((m, i) => <span key={i}>{m}</span>)}
                </div>

                <div className="flex gap-2">
                    <div className="flex flex-col justify-between text-[#6B7280] text-xs font-medium py-1">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                    </div>

                    <div className="grid grid-rows-7 grid-flow-col gap-1.5 overflow-x-auto pb-2 flex-1">
                        {blocks.map((level, i) => (
                            <div
                                key={i}
                                className={`w-3 h-3 rounded-[3px] border transition-all duration-300 hover:scale-125 hover:ring-1 hover:ring-amber-400 hover:z-10 cursor-pointer ${getColor(level)}`}
                                title={`Level ${level} activity`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HeatMap;

