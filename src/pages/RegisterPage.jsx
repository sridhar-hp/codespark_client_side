import React, { useState } from 'react';
import {
    FaGithub,
    FaGoogle,
    FaFire,
    FaCode,
    FaBrain,
    FaEye,
    FaEyeSlash,
    FaBolt,
    FaUser,
    FaAt,
    FaLock
} from 'react-icons/fa';

export default function RegisterPage() {
    // Form Field Tracking States
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // UI Display States
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    // Local Input Processing Placeholder
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log('Registration UI execution payload:', formData);
    };

    const handleOAuthSignUp = (provider) => {
        console.log(`OAuth Registration initiated via: ${provider}`);
    };

    // Mock grid preview array data
    const contributionBlocks = Array.from({ length: 28 }, () => Math.floor(Math.random() * 4));

    return (
        <div className="min-h-screen w-full bg-[#0B1120] text-[#F9FAFB] font-sans flex flex-col lg:flex-row overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">

            {/* LEFT SIDE: Brand Identity & Gamification Preview Block (60% Width on Desktop) */}
            <div className="relative w-full lg:w-[60%] flex-col justify-between p-8 md:p-12 lg:p-16 hidden md:flex overflow-hidden border-b lg:border-b-0 lg:border-r border-[#1F2937] select-none">

                {/* Background Decorative Mesh & Matrix Canvas Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
                <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

                {/* Brand System Anchor Header */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <FaBolt className="text-[#0B1120] text-xl" />
                    </div>
                    <span className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-[#9CA3AF]">
                        CODESPARK
                    </span>
                </div>

                {/* Product Positioning Narrative */}
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

                {/* Dashboard Floating System Micro-Components */}
                <div className="relative z-10 grid grid-cols-2 gap-4 max-w-2xl w-full opacity-90">

                    {/* Component: Streak Tracker */}
                    <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-4 rounded-xl transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)] transform hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">Current Streak</span>
                            <FaFire className="text-orange-500 text-lg animate-pulse" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">00</span>
                            <span className="text-xs text-[#9CA3AF] font-medium">Day 1 awaits</span>
                        </div>
                    </div>

                    {/* Component: Gamified Level Progression */}
                    <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-4 rounded-xl transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)] transform hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">XP Engine</span>
                            <FaBrain className="text-amber-500 text-base" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">LVL 1</span>
                            <span className="text-xs text-amber-500/80 font-medium">0 / 100 XP</span>
                        </div>
                    </div>

                    {/* Component: Live Analytics Representation Map */}
                    <div className="col-span-2 bg-[#111827]/80 backdrop-blur-md border border-[#1F2937] p-4 rounded-xl transition-all duration-300 hover:border-amber-500/40 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">Your Future Activity Timeline</span>
                            <div className="flex gap-1 items-center text-xs text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded-full">
                                <FaCode className="text-xs" /> Spark Initialized
                            </div>
                        </div>
                        <div className="flex gap-1.5 overflow-x-auto pb-1">
                            {contributionBlocks.map((lvl, idx) => (
                                <div
                                    key={idx}
                                    className={`h-4 w-4 rounded-sm flex-shrink-0 transition-all duration-500 hover:scale-110 ${idx === 0 ? 'bg-amber-500 animate-pulse' : 'bg-[#1F2937]'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Legal Version Footnote */}
                <div className="relative z-10 text-xs text-[#9CA3AF]/60 pt-8">
                    &copy; 2026 CODESPARK Inc. All rights reserved.
                </div>
            </div>

            {/* RIGHT SIDE: Account Provisioning Form Frame (40% Width on Desktop) */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 lg:p-8 bg-[#0B1120] relative min-h-screen">

                {/* Soft mobile ambient light blur element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none md:hidden" />

                <div className="w-full max-w-md bg-[#111827]/40 backdrop-blur-xl border border-[#1F2937] rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 my-auto">

                    {/* Header Block Descriptor */}
                    <div className="flex flex-col items-center mb-6 md:items-start">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-4 md:hidden">
                            <FaBolt className="text-[#0B1120] text-2xl" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1.5 text-center md:text-left">
                            Create your account
                        </h2>
                        <p className="text-sm text-[#9CA3AF] text-center md:text-left">
                            Start tracking your consistency today.
                        </p>
                    </div>

                    {/* Social Provider Identity Actions */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        <button
                            type="button"
                            onClick={() => handleOAuthSignUp('GitHub')}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#111827] border border-[#1F2937] hover:border-[#9CA3AF]/40 hover:bg-[#1F2937]/50 text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-amber-500/40"
                            aria-label="Sign up using GitHub account credentials"
                        >
                            <FaGithub className="text-lg text-white" />
                            <span>GitHub</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleOAuthSignUp('Google')}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#111827] border border-[#1F2937] hover:border-[#9CA3AF]/40 hover:bg-[#1F2937]/50 text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-amber-500/40"
                            aria-label="Sign up using Google account credentials"
                        >
                            <FaGoogle className="text-base text-white" />
                            <span>Google</span>
                        </button>
                    </div>

                    {/* Section Splitter Line */}
                    <div className="relative flex py-2 items-center mb-5">
                        <div className="flex-grow border-t border-[#1F2937]"></div>
                        <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]/50">Or sign up with email</span>
                        <div className="flex-grow border-t border-[#1F2937]"></div>
                    </div>

                    {/* Functional Component Inputs Form */}
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">

                        {/* Full Name Input Box */}
                        <div>
                            <label htmlFor="fullName" className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1.5">
                                Full Name
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]/50"><FaUser className="text-xs" /></span>
                                <input
                                    id="fullName"
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('fullName')}
                                    onBlur={() => setFocusedField('')}
                                    placeholder="Alex Morgan"
                                    className="w-full pl-10 pr-3.5 py-2 bg-[#0B1120] border border-[#1F2937] rounded-lg text-white text-sm placeholder-[#9CA3AF]/30 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Unique Username Input Box */}
                        <div>
                            <label htmlFor="username" className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1.5">
                                Username
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]/50"><FaAt className="text-xs" /></span>
                                <input
                                    id="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('username')}
                                    onBlur={() => setFocusedField('')}
                                    placeholder="alex_dev"
                                    className="w-full pl-10 pr-3.5 py-2 bg-[#0B1120] border border-[#1F2937] rounded-lg text-white text-sm placeholder-[#9CA3AF]/30 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Email Address Input Box */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1.5">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField('')}
                                placeholder="alex@example.com"
                                className="w-full px-3.5 py-2 bg-[#0B1120] border border-[#1F2937] rounded-lg text-white text-sm placeholder-[#9CA3AF]/30 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
                            />
                        </div>

                        {/* Primary Passkey Input Box */}
                        <div>
                            <label htmlFor="password" className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]/50"><FaLock className="text-xs" /></span>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField('')}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-2 bg-[#0B1120] border border-[#1F2937] rounded-lg text-white text-sm placeholder-[#9CA3AF]/30 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white transition-colors p-1"
                                    aria-label={showPassword ? "Hide password field contents" : "Display password field contents"}
                                >
                                    {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                                </button>
                            </div>
                        </div>

                        {/* Retype / Confirm Passkey Input Box */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1.5">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]/50"><FaLock className="text-xs" /></span>
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('confirmPassword')}
                                    onBlur={() => setFocusedField('')}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-2 bg-[#0B1120] border border-[#1F2937] rounded-lg text-white text-sm placeholder-[#9CA3AF]/30 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white transition-colors p-1"
                                    aria-label={showConfirmPassword ? "Hide validation check password" : "Show validation check password"}
                                >
                                    {showConfirmPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                                </button>
                            </div>

                            {/* Premium Inline Native Validation UI indicator */}
                            {formData.password && formData.confirmPassword && (
                                <div className="mt-2 text-xs flex items-center gap-1.5 transition-all duration-200">
                                    <div className={`h-1.5 w-1.5 rounded-full ${formData.password === formData.confirmPassword ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`} />
                                    <span className={formData.password === formData.confirmPassword ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
                                        {formData.password === formData.confirmPassword ? 'Passwords match correctly' : 'Passwords do not match yet'}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Main CTA Submission Controller Button */}
                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B1120] text-sm font-semibold shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-[0.99] transform transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-500/50 pt-2"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Alternative Auth Inter-Routing Footer */}
                    <div className="mt-6 text-center text-sm text-[#9CA3AF]">
                        <span>Already have an account? </span>
                        <a
                            href="#login"
                            className="font-semibold text-amber-500 hover:text-amber-400 transition-colors inline-flex items-center gap-0.5 group"
                            onClick={(e) => { e.preventDefault(); console.log('Redirecting to legacy login portal component context.'); }}
                        >
                            Sign In
                            <span className="transform group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                        </a>
                    </div>

                </div>
            </div>

        </div>
    );
}