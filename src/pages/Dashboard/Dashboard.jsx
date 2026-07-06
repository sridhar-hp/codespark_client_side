import { Flame, GitPullRequest, Code, BookOpen, Crown } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatCard from '../../components/dashboard/StatCard';
import TaskCard from '../../components/dashboard/TaskCard';
import HeatMap from '../../components/dashboard/HeatMap';
import ProgressCard from '../../components/dashboard/ProgressCard';
import Timeline from '../../components/dashboard/Timeline';
import QuoteCard from '../../components/dashboard/QuoteCard';
import AchievementCard from '../../components/dashboard/AchievementCard';

function Dashboard() {
    return (
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto w-full">
            <DashboardHeader />

            {/* Section 1: Top Metrics - Linear style staggered grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
                <StatCard title="Current Streak" value="42 Days" icon={Flame} trend="+5%" trendUp={true} delay="0ms" />
                <StatCard title="Contributions" value="128" icon={GitPullRequest} trend="+12%" trendUp={true} delay="100ms" />
                <StatCard title="Problems Solved" value="154" icon={Code} trend="-2%" trendUp={false} delay="200ms" />
                <StatCard title="Learning Hours" value="312h" icon={BookOpen} trend="+8%" trendUp={true} delay="300ms" />
            </div>

            {/* Main Complex Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

                {/* Left Column (Wider on Desktop) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <HeatMap />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                        <TaskCard />
                        <Timeline />
                    </div>
                </div>

                {/* Right Column (Narrower on Desktop) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <QuoteCard delay="100ms" />

                    <div className="flex flex-col gap-4">
                        <ProgressCard title="XP Progression" type="bar" delay="200ms" />
                        <ProgressCard title="Consistency Score" value={92} type="circle" delay="300ms" />
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                        <h3 className="text-white text-sm font-semibold mb-1">Recent Unlocks</h3>
                        <AchievementCard
                            title="30 Day Streak"
                            desc="Maintained focus for a full month."
                            icon={Flame}
                            delay="400ms"
                        />
                        <AchievementCard
                            title="React Master"
                            desc="Completed 50 hours of React."
                            icon={Crown}
                            delay="500ms"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Dashboard;