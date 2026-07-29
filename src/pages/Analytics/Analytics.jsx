import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  CheckSquare,
  CheckCircle2,
  Clock,
  Zap,
  Calendar,
  TrendingUp,
  Activity,
  Sparkles,
  Trophy,
  Plus,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { fetchAnalyticsThunk } from '../../redux/analyticsThunks';

export default function Analytics() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalyticsThunk());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchAnalyticsThunk());
  };

  const statCards = [
    {
      title: 'Total Tasks',
      value: data.totalTasks || 0,
      icon: CheckSquare,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      subtitle: 'All created tasks',
    },
    {
      title: 'Completed Tasks',
      value: data.completedTasks || 0,
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      subtitle: 'Finished tasks',
    },
    {
      title: 'Pending Tasks',
      value: data.pendingTasks || 0,
      icon: Clock,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      subtitle: 'Remaining to complete',
    },
    {
      title: 'Completion Rate',
      value: `${data.completionRate || 0}%`,
      icon: Zap,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      subtitle: 'Task efficiency score',
    },
    {
      title: 'Completed Today',
      value: data.tasksCompletedToday || 0,
      icon: Calendar,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      subtitle: "Today's completed count",
    },
    {
      title: 'Completed This Week',
      value: data.tasksCompletedThisWeek || 0,
      icon: TrendingUp,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      subtitle: 'Last 7 days velocity',
    },
    {
      title: 'Completed This Month',
      value: data.tasksCompletedThisMonth || 0,
      icon: Activity,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      subtitle: 'Monthly volume',
    },
    {
      title: 'Total XP',
      value: `${(data.totalXP || 0).toLocaleString()} XP`,
      icon: Sparkles,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      subtitle: 'Earned experience points',
    },
    {
      title: 'Current Level',
      value: `Level ${data.currentLevel || 1}`,
      icon: Trophy,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      subtitle: 'Current level tier',
    },
  ];

  const isEmpty = (data.totalTasks || 0) === 0 && (data.totalXP || 0) === 0;

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto w-full space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1F2937]/60 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#111827] border border-[#1F2937]">
              <BarChart3 className="w-7 h-7 text-amber-500" />
            </span>
            Analytics Dashboard
          </h1>
          <p className="text-sm text-[#9CA3AF] font-medium tracking-wide">
            Real-time performance summary and productivity metrics.
          </p>
        </div>

        <button
          onClick={handleRetry}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Metrics
        </button>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>Failed to load analytics: {typeof error === 'object' ? (error.message || JSON.stringify(error)) : String(error)}</span>
          </div>
          <button
            onClick={handleRetry}
            className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg text-xs font-bold transition-all"
          >
            Retry
          </button>
        </div>
      )}

      {/* LOADING SKELETON */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#111827] border border-[#1F2937] p-6 rounded-2xl animate-pulse space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-24 h-4 bg-[#1F2937] rounded" />
                <div className="w-10 h-10 bg-[#1F2937] rounded-xl" />
              </div>
              <div className="w-32 h-8 bg-[#1F2937] rounded" />
              <div className="w-20 h-3 bg-[#1F2937] rounded" />
            </div>
          ))}
        </div>
      ) : isEmpty ? (
        /* EMPTY STATE */
        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
            <BarChart3 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">No Analytics Data Yet</h3>
            <p className="text-sm text-[#9CA3AF]">
              Start completing tasks to view real-time performance insights and track your level growth.
            </p>
          </div>
          <Link
            to="/tasks"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-[#0B1120] font-bold text-xs rounded-xl shadow-lg hover:brightness-110 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3px]" /> Go to Tasks
          </Link>
        </div>
      ) : (
        /* STATISTIC CARDS GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-[#111827] border border-[#1F2937] p-6 rounded-2xl hover:border-amber-500/20 transition-all duration-300 group shadow-lg flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                    {card.title}
                  </span>
                  <div className={`p-2.5 rounded-xl border ${card.bg} ${card.border} ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-white tracking-tight">
                    {card.value}
                  </div>
                  <div className="text-xs text-[#6B7280] font-medium">
                    {card.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}