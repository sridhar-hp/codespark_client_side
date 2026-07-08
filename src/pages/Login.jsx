import React, { useState } from 'react';

import {
    FaGithub,
    FaGoogle,
    FaFire,
    FaCode,
    FaBrain,
    FaTerminal,
    FaEye,
    FaEyeSlash,
    FaAward,
    FaBolt
} from 'react-icons/fa';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // Placeholder handlers as requested (No auth/backend logic)
    const handleEmailLogin = (e) => {
        e.preventDefault();
        console.log('Email login triggered:', { email, rememberMe });
    };

    const handleOAuthLogin = (provider) => {
        console.log(`${provider} authentication flow initiated.`);
    };

    // Mock contribution grid data for the preview element
    const contributions = Array.from({ length: 28 }, () => Math.floor(Math.random() * 4));

    return (
        <div className="min-h-screen w-full bg-[#0B1120] text-[#F9FAFB] font-sans flex flex-col lg:flex-row overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">

            {/* LEFT SIDE: Brand & Dashboard Preview (60% Desktop, Hidden/Stacked on Mobile) */}
            <div className="relative w-full lg:w-[60%] flex-col justify-between p-8 md:p-12 lg:p-16 hidden md:flex overflow-hidden border-b lg:border-b-0 lg:border-r border-[#1F2937]">

                {/* Background Gradients & Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
                <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

                {/* Brand Header */}
                <div className="relative z-10 flex items-center gap-3 animate-fade-in">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <FaBolt className="text-[#0B1120] text-xl" />
                    </div>
                    <span className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-[#9CA3AF]">
                        CODESPARK
                    </span>
                </div>

                {/* Hero Copy */}
                <div className="relative z-10 my-auto max-w-xl pt-12 pb-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none mb-6">
                        <span className="block text-white">Track.</span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Build.</span>
                        <span className="block text-white">Level Up.</span>
                    </h1>
                    <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed font-medium">
                        CODESPARK helps developers build consistency by tracking GitHub commits, LeetCode practice, learning sessions, productivity streaks, achievements, XP, and daily progress.
                    </p>
                </div>

                {/* Dashboard Floating Preview Area */}
                <div className="relative z-10 grid grid-cols-2 gap-4 max-w-2xl w-full select-none opacity-90">

                    {/* Card 1: Streak */}
                    <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-4 rounded-xl transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)] transform hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">Current Streak</span>
                            <FaFire className="text-orange-500 text-lg animate-bounce" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">42</span>
                            <span className="text-xs text-[#22C55E] font-medium">Days active</span>
                        </div>
                    </div>

                    {/* Card 2: LeetCode Metrics */}
                    <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-4 rounded-xl transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)] transform hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">LeetCode</span>
                            <FaBrain className="text-amber-500 text-base" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">142</span>
                            <span className="text-xs text-[#9CA3AF]">Problems solved</span>
                        </div>
                    </div>

                    {/* Card 3: Contribution Heatmap Preview */}
                    <div className="col-span-2 bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-4 rounded-xl transition-all duration-300 hover:border-amber-500/40 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">Spark Score & Contributions</span>
                            <div className="flex gap-1 items-center text-xs text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded-full">
                                <FaCode className="text-xs" /> 847 XP
                            </div>
                        </div>
                        <div className="flex gap-1.5 overflow-x-auto pb-1">
                            {contributions.map((lvl, idx) => (
                                <div
                                    key={idx}
                                    className={`h-4 w-4 rounded-sm flex-shrink-0 transition-colors duration-500 ${lvl === 0 ? 'bg-[#1F2937]' :
                                            lvl === 1 ? 'bg-amber-900/60' :
                                                lvl === 2 ? 'bg-amber-600/70' : 'bg-amber-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer info inside Left panel */}
                <div className="relative z-10 text-xs text-[#9CA3AF]/60 pt-8">
                    &copy; 2026 CODESPARK Inc. All rights reserved.
                </div>
            </div>

            {/* RIGHT SIDE: Dedicated Auth Panel (40% Desktop, 100% Mobile) */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 lg:p-12 bg-[#0B1120] relative">

                {/* Subtle decorative layout objects for mobile fallback visual depth */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none md:hidden" />

                <div className="w-full max-w-md bg-[#111827]/40 backdrop-blur-xl border border-[#1F2937] rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">

                    {/* Mobile Logo Visibility Header */}
                    <div className="flex flex-col items-center mb-8 md:items-start">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-4 md:hidden">
                            <FaBolt className="text-[#0B1120] text-2xl" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1.5 text-center md:text-left">
                            Welcome Back
                        </h2>
                        <p className="text-sm text-[#9CA3AF] text-center md:text-left">
                            Continue your developer journey.
                        </p>
                    </div>

                    {/* Social Providers Block */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button
                            type="button"
                            onClick={() => handleOAuthLogin('GitHub')}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#111827] border border-[#1F2937] hover:border-[#9CA3AF]/40 hover:bg-[#1F2937]/50 text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-amber-500/40"
                            aria-label="Sign in with GitHub"
                        >
                            <FaGithub className="text-lg text-white" />
                            <span>GitHub</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleOAuthLogin('Google')}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#111827] border border-[#1F2937] hover:border-[#9CA3AF]/40 hover:bg-[#1F2937]/50 text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-amber-500/40"
                            aria-label="Sign in with Google"
                        >
                            <FaGoogle className="text-base text-white" />
                            <span>Google</span>
                        </button>
                    </div>

                    {/* Modern Divider separator line */}
                    <div className="relative flex py-3 items-center mb-6">
                        <div className="flex-grow border-t border-[#1F2937]"></div>
                        <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]/50">Or continue with</span>
                        <div className="flex-grow border-t border-[#1F2937]"></div>
                    </div>

                    {/* Primary Email Auth Form Container */}
                    <form onSubmit={handleEmailLogin} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full px-3.5 py-2.5 bg-[#0B1120] border border-[#1F2937] rounded-lg text-white text-sm placeholder-[#9CA3AF]/40 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="password" className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                                    Password
                                </label>
                                <a
                                    href="#forgot"
                                    className="text-xs font-medium text-amber-500 hover:text-amber-400 transition-colors"
                                    onClick={(e) => { e.preventDefault(); console.log('Forgot password clicked.'); }}
                                >
                                    Forgot password?
                                </a>
                            </div>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-3.5 pr-10 py-2.5 bg-[#0B1120] border border-[#1F2937] rounded-lg text-white text-sm placeholder-[#9CA3AF]/40 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white transition-colors p-1"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                                </button>
                            </div>
                        </div>

                        {/* Utility Selection Actions Row */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="relative flex items-center gap-2.5 cursor-pointer select-none group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="h-4 w-4 bg-[#0B1120] border border-[#1F2937] rounded peer-checked:bg-amber-500 peer-checked:border-amber-500 group-hover:border-amber-500/60 transition-all duration-200 flex items-center justify-center">
                                    <svg className="w-2.5 h-2.5 text-[#0B1120] stroke-[3px] stroke-current fill-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium text-[#9CA3AF] group-hover:text-white transition-colors">
                                    Remember me for 30 days
                                </span>
                            </label>
                        </div>

                        {/* Form Execution Trigger Button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B1120] text-sm font-semibold shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-[0.99] transform transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-500/50 mt-2"
                        >
                            Sign In to Dashboard
                        </button>
                    </form>

                    {/* Action Navigation Footer link */}
                    <div className="mt-8 text-center text-sm text-[#9CA3AF]">
                        <span>Don't have an account? </span>
                        <a
                            href="#signup"
                            className="font-semibold text-amber-500 hover:text-amber-400 transition-colors inline-flex items-center gap-1 group"
                            onClick={(e) => { e.preventDefault(); console.log('Create account redirect triggered.'); }}
                        >
                            Create Account
                            <span className="transform group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                        </a>
                    </div>

                </div>
            </div>

        </div>
    );
}