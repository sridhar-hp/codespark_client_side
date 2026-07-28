import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Circle, CheckCircle2, MoreHorizontal, Plus } from 'lucide-react';
import { toggleTaskThunk } from '../../redux/taskThunks';
import { recordDailyProgressThunk } from '../../redux/dailyProgressThunks';
import { fetchUserXPThunk } from '../../redux/xpThunks';
import { updateXPAmount } from '../../redux/xpSlice';

function TaskCard() {
    const dispatch = useDispatch();
    const { tasks: rawTasks } = useSelector((state) => state.tasks);

    const handleToggle = (task) => {
        dispatch(toggleTaskThunk(task._id)).unwrap().then((updatedTask) => {
            const delta = updatedTask.completed ? 1 : -1;
            const xpDelta = updatedTask.completed ? (updatedTask.xpReward || 0) : -(updatedTask.xpReward || 0);

            dispatch(updateXPAmount(xpDelta));
            dispatch(recordDailyProgressThunk({
                date: new Date().toISOString().split('T')[0],
                tasksCompleted: delta,
                xpEarned: xpDelta,
            }));
            dispatch(fetchUserXPThunk());
        }).catch(() => { });
    };

    const tasks = rawTasks.slice(0, 5);

    return (
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl flex flex-col h-full starting:opacity-0 starting:translate-y-4 opacity-100 translate-y-0 transition-all duration-700 delay-150 ease-out hover:border-amber-500/20">
            <div className="flex items-center justify-between p-5 border-b border-[#1F2937]">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <h3 className="text-white font-semibold text-sm">Today's Focus</h3>
                </div>
                <Link to="/tasks" className="text-[#9CA3AF] hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </Link>
            </div>

            <div className="p-2 flex-1 flex flex-col justify-center">
                {tasks.length === 0 ? (
                    <div className="p-6 text-center space-y-3">
                        <p className="text-sm font-semibold text-white">No tasks created yet.</p>
                        <p className="text-xs text-[#9CA3AF]">Complete your first task to start earning XP.</p>
                        <Link
                            to="/tasks"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-lg text-xs font-bold transition-all"
                        >
                            <Plus className="w-3.5 h-3.5" /> Create Task
                        </Link>
                    </div>
                ) : (
                    <ul className="space-y-1">
                        {tasks.map((task) => (
                            <li
                                key={task._id}
                                onClick={() => handleToggle(task)}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1F2937]/50 transition-colors group cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    {task.completed ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    ) : (
                                        <Circle className="w-4 h-4 text-[#4B5563] group-hover:text-amber-500 transition-colors flex-shrink-0" />
                                    )}
                                    <span className={`text-sm font-medium transition-colors ${task.completed ? 'text-[#6B7280] line-through' : 'text-[#D1D5DB] group-hover:text-white'}`}>
                                        {task.title}
                                    </span>
                                </div>
                                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md ${task.priority === 'High' ? 'bg-rose-500/10 text-rose-400' :
                                    task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                                        'bg-[#1F2937] text-[#9CA3AF]'
                                    }`}>
                                    {task.priority || 'Medium'}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
export default TaskCard;