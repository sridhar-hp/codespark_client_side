import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Github,
    RefreshCw,
    Star,
    GitFork,
    Calendar,
    Users,
    UserCheck,
    BookOpen,
    ExternalLink,
    AlertCircle,
    CheckCircle2,
    Code2,
    Sparkles,
    Edit2,
    Link2,
} from 'lucide-react';
import { fetchGithubProfileThunk, connectGithubThunk } from '../../redux/githubThunks';
import { clearGithubErrors } from '../../redux/githubSlice';

export default function GitHub() {
    const dispatch = useDispatch();
    const { connected, profile, repos, loading, connecting, error, connectError } = useSelector((state) => state.github);

    const [inputUsername, setInputUsername] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(fetchGithubProfileThunk());
    }, [dispatch]);

    const handleConnect = (e) => {
        e.preventDefault();
        if (!inputUsername.trim()) return;
        dispatch(clearGithubErrors());
        dispatch(connectGithubThunk(inputUsername.trim())).unwrap().then(() => {
            setIsEditing(false);
            setInputUsername('');
        }).catch(() => { });
    };

    const handleRefresh = () => {
        dispatch(fetchGithubProfileThunk());
    };

    return (
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto w-full space-y-8 text-white">
            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1F2937]/60 pb-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
                        <span className="p-2 rounded-xl bg-[#111827] border border-[#1F2937]">
                            <Github className="w-7 h-7 text-amber-500" />
                        </span>
                        GitHub Integration
                    </h1>
                    <p className="text-sm text-[#9CA3AF] font-medium tracking-wide">
                        Connect your GitHub profile to showcase real repositories and public activity.
                    </p>
                </div>

                {connected && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center gap-2 px-3.5 py-2 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                        >
                            <Edit2 className="w-3.5 h-3.5" />
                            {isEditing ? 'Cancel Edit' : 'Change Account'}
                        </button>
                        <button
                            onClick={handleRefresh}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                            Sync Profile
                        </button>
                    </div>
                )}
            </div>

            {/* ERROR ALERT */}
            {(error || connectError) && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        <span>{connectError || error}</span>
                    </div>
                    <button
                        onClick={() => dispatch(clearGithubErrors())}
                        className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg text-xs font-bold transition-all"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* CONNECT FORM / NOT CONNECTED STATE */}
            {(!connected || isEditing) ? (
                <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 md:p-12 max-w-xl mx-auto shadow-2xl space-y-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
                        <Github className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white">
                            {connected ? 'Change GitHub Account' : 'Connect Your GitHub Profile'}
                        </h2>
                        <p className="text-xs text-[#9CA3AF] max-w-md mx-auto">
                            Enter your GitHub username to automatically fetch your public profile statistics and top repositories.
                        </p>
                    </div>

                    <form onSubmit={handleConnect} className="space-y-4 max-w-md mx-auto text-left">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                                GitHub Username
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm font-mono">
                                    @
                                </span>
                                <input
                                    type="text"
                                    value={inputUsername}
                                    onChange={(e) => setInputUsername(e.target.value)}
                                    placeholder="e.g. octocat"
                                    className="w-full pl-8 pr-4 py-3 bg-[#0F172A] border border-[#1F2937] rounded-xl text-sm font-medium text-white placeholder:text-[#4B5563] focus:outline-none focus:border-amber-500 transition-colors"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={connecting || !inputUsername.trim()}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-[#0B1120] font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
                        >
                            {connecting ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" /> Connecting...
                                </>
                            ) : (
                                <>
                                    <Link2 className="w-4 h-4" /> Connect GitHub
                                </>
                            )}
                        </button>
                    </form>
                </div>
            ) : loading ? (
                /* LOADING STATE */
                <div className="space-y-6">
                    <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-3xl animate-pulse space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-[#1F2937] rounded-2xl" />
                            <div className="space-y-3 flex-1">
                                <div className="w-48 h-6 bg-[#1F2937] rounded" />
                                <div className="w-32 h-4 bg-[#1F2937] rounded" />
                                <div className="w-64 h-3 bg-[#1F2937] rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : profile ? (
                /* PROFILE & REPOS DISPLAY */
                <div className="space-y-8">
                    {/* PROFILE HEADER CARD */}
                    <div className="relative overflow-hidden bg-[#111827] border border-[#1F2937] rounded-3xl p-6 md:p-8 shadow-xl">
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(120% 100% at 15% 0%, rgba(245,158,11,0.1), transparent 55%)' }} />

                        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                            <img
                                src={profile.avatarUrl}
                                alt={profile.username}
                                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 border-amber-500/30 object-cover shadow-lg"
                            />

                            <div className="space-y-3 flex-1">
                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-2xl md:text-3xl font-extrabold text-white">{profile.name}</h2>
                                        <a
                                            href={profile.htmlUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-bold hover:bg-amber-500/20 transition-all"
                                        >
                                            @{profile.username} <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                    <p className="text-xs text-[#9CA3AF] mt-1 max-w-2xl">{profile.bio}</p>
                                </div>

                                {/* PROFILE STATS BAR */}
                                <div className="flex flex-wrap items-center gap-6 text-xs text-[#9CA3AF] pt-2 border-t border-[#1F2937]">
                                    <span className="flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4 text-amber-500" />
                                        <strong className="text-white font-bold">{profile.publicRepos}</strong> Repositories
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Users className="w-4 h-4 text-emerald-500" />
                                        <strong className="text-white font-bold">{profile.followers}</strong> Followers
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <UserCheck className="w-4 h-4 text-cyan-400" />
                                        <strong className="text-white font-bold">{profile.following}</strong> Following
                                    </span>
                                    <span className="flex items-center gap-1.5 font-mono">
                                        <Calendar className="w-4 h-4 text-[#6B7280]" />
                                        Joined {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* REPOSITORIES SECTION */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-amber-500" /> Recent Repositories
                            </h3>
                            <span className="text-xs text-[#9CA3AF] font-medium">Top 5 updated</span>
                        </div>

                        {repos.length === 0 ? (
                            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 text-center space-y-2">
                                <p className="text-sm font-semibold text-white">No public repositories found.</p>
                                <p className="text-xs text-[#9CA3AF]">Create your first repository on GitHub to feature it here.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {repos.map((repo) => (
                                    <div
                                        key={repo.id}
                                        className="bg-[#111827] border border-[#1F2937] p-5 rounded-2xl hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-4 group shadow-lg"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex items-start justify-between gap-3">
                                                <a
                                                    href={repo.htmlUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-bold text-white text-base hover:text-amber-400 transition-colors flex items-center gap-1.5"
                                                >
                                                    {repo.name} <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                                                </a>
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                                    {repo.language}
                                                </span>
                                            </div>

                                            <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed">
                                                {repo.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-[#6B7280] font-medium pt-3 border-t border-[#1F2937]/60">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1 text-[#9CA3AF]">
                                                    <Star className="w-3.5 h-3.5 text-amber-500" /> {repo.stars}
                                                </span>
                                                <span className="flex items-center gap-1 text-[#9CA3AF]">
                                                    <GitFork className="w-3.5 h-3.5 text-cyan-400" /> {repo.forks}
                                                </span>
                                            </div>
                                            <span className="font-mono text-[10px]">
                                                Updated {new Date(repo.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}