import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flame, GitPullRequest, Code, BookOpen, Crown, CheckSquare, CheckCircle2, Clock, Zap } from 'lucide-react';
import { fetchTasksThunk } from '../../redux/taskThunks';
import { fetchTodayProgressThunk } from '../../redux/dailyProgressThunks';
import { fetchUserXPThunk } from '../../redux/xpThunks';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatCard from '../../components/dashboard/StatCard';
import TaskCard from '../../components/dashboard/TaskCard';
import HeatMap from '../../components/dashboard/HeatMap';
import ProgressCard from '../../components/dashboard/ProgressCard';
import Timeline from '../../components/dashboard/Timeline';
import QuoteCard from '../../components/dashboard/QuoteCard';
import AchievementCard from '../../components/dashboard/AchievementCard';

function Dashboard() {
    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.tasks);
    const { todayProgress } = useSelector((state) => state.dailyProgress);
    const { totalXP, level } = useSelector((state) => state.xp);

    useEffect(() => {
        dispatch(fetchTasksThunk());
        dispatch(fetchTodayProgressThunk());
        dispatch(fetchUserXPThunk());
    }, [dispatch]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto w-full">
            <DashboardHeader />

            {/* Section 1: Top Metrics - Live Task Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
                <StatCard title="Total Tasks" value={totalTasks} icon={CheckSquare} trend="+0%" trendUp={true} delay="0ms" />
                <StatCard title="Completed Tasks" value={completedTasks} icon={CheckCircle2} trend="+0%" trendUp={true} delay="100ms" />
                <StatCard title="Pending Tasks" value={pendingTasks} icon={Clock} trend="0" trendUp={false} delay="200ms" />
                <StatCard title="Completion Rate" value={`${completionRate}%`} icon={Zap} trend="+0%" trendUp={true} delay="300ms" />
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
                        <ProgressCard title="XP Progression" value={totalXP} level={level} type="bar" delay="200ms" />
                        <ProgressCard title="Daily Progress" value={todayProgress?.completionPercentage || completionRate} type="circle" delay="300ms" />
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