import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {
    fetchSettingsThunk,
    updateProfileThunk,
    changePasswordThunk,
    updatePreferencesThunk,
    updateThemeThunk,
    updatePrivacyThunk,
    logoutThunk as settingsLogoutThunk,
    logoutAllThunk
} from '../../redux/settingsThunks';
import { clearSettingsStatus } from '../../redux/settingsSlice';
import {
    Settings, Monitor, Layout, Zap, Sun, Moon, Sparkles, Check, ChevronRight,
    Download, Trash2, Github, Linkedin, Calendar, Database, Search, Bell,
    Sliders, Layers, Activity, Lock, Globe, Clock, Command, Play, RotateCcw,
    Code, Hexagon, Terminal, User, BookOpen, AlertCircle, RefreshCw, Palette,
    LogOut, Key, Shield, Camera, Mail, Phone, MapPin, Briefcase, FileText
} from 'lucide-react';

const ACCENT_COLORS = {
    Amber: '#F59E0B',
    Orange: '#F97316',
    Cyan: '#06B6D4',
    Emerald: '#10B981',
    Purple: '#8B5CF6',
    Rose: '#F43F5E'
};

const BORDER_RADII = {
    Rounded: '1rem',
    Medium: '0.5rem',
    Sharp: '0rem'
};

const BORDER_RADII_MINI = {
    Rounded: '0.5rem',
    Medium: '0.25rem',
    Sharp: '0rem'
};

const ANIMATION_SPEEDS = {
    Fast: 0.2,
    Normal: 0.4,
    'Reduced Motion': 0
};

const THEME_PRESETS = [
    {
        id: 'classic',
        name: 'CodeSpark Classic',
        desc: 'The original premium experience.',
        colors: ['#111827', '#F59E0B', '#0B1120'],
        settings: { theme: 'Dark', accent: 'Amber', density: 'Comfortable', sidebar: 'Expanded', borderRadius: 'Medium', animation: 'Normal' }
    },
    {
        id: 'midnight',
        name: 'Midnight Developer',
        desc: 'Deep focus with high contrast.',
        colors: ['#000000', '#8B5CF6', '#111827'],
        settings: { theme: 'Dark', accent: 'Purple', density: 'Compact', sidebar: 'Collapsed', borderRadius: 'Sharp', animation: 'Fast' }
    },
    {
        id: 'arctic',
        name: 'Arctic Cyan',
        desc: 'Cool, precise, and technical.',
        colors: ['#0B1120', '#06B6D4', '#0F172A'],
        settings: { theme: 'Dark', accent: 'Cyan', density: 'Comfortable', sidebar: 'Expanded', borderRadius: 'Medium', animation: 'Normal' }
    },
    {
        id: 'autumn',
        name: 'Autumn Amber',
        desc: 'Warm tones for extended sessions.',
        colors: ['#1c1917', '#F97316', '#292524'],
        settings: { theme: 'Dark', accent: 'Orange', density: 'Comfortable', sidebar: 'Floating', borderRadius: 'Rounded', animation: 'Normal' }
    },
    {
        id: 'forest',
        name: 'Forest Green',
        desc: 'Calm and organic workspace.',
        colors: ['#064e3b', '#10B981', '#065f46'],
        settings: { theme: 'Dark', accent: 'Emerald', density: 'Comfortable', sidebar: 'Expanded', borderRadius: 'Medium', animation: 'Normal' }
    },
    {
        id: 'neon',
        name: 'Neon Focus',
        desc: 'Vibrant and energetic.',
        colors: ['#0f172a', '#F43F5E', '#1e293b'],
        settings: { theme: 'Dark', accent: 'Rose', density: 'Compact', sidebar: 'Collapsed', borderRadius: 'Sharp', animation: 'Fast' }
    }
];

const Card = ({ children, className = "", delay = 0, hover = true }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : {}}
            className={`bg-[#111827] border border-[#1F2937] rounded-xl shadow-xl overflow-hidden relative ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            {children}
        </motion.div>
    );
};

const SectionHeader = ({ title, subtitle, icon: Icon }) => (
    <div className="mb-8 flex items-center space-x-4">
        <div className="p-3 bg-[#0F172A] rounded-lg border border-[#1F2937] text-[#F59E0B]">
            <Icon size={24} />
        </div>
        <div>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] tracking-tight">{title}</h2>
            <p className="text-[#9CA3AF] text-sm mt-1">{subtitle}</p>
        </div>
    </div>
);

const Toggle = ({ enabled, onChange, accentColor }) => (
    <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none`}
        style={{ backgroundColor: enabled ? (accentColor || '#F59E0B') : '#1F2937' }}
    >
        <motion.span
            layout
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
        />
    </button>
);

const Select = ({ value, options, onChange }) => (
    <div className="relative">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none bg-[#0F172A] border border-[#1F2937] text-[#F9FAFB] text-sm rounded-lg focus:ring-[#F59E0B] focus:border-[#F59E0B] block w-full p-2.5 pr-8 transition-colors cursor-pointer"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#9CA3AF]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
    </div>
);

const SettingRow = ({ label, description, control }) => (
    <div className="flex items-center justify-between py-4 border-b border-[#1F2937] last:border-0 group">
        <div className="pr-8">
            <h4 className="text-sm font-medium text-[#F9FAFB] transition-colors group-hover:text-white">{label}</h4>
            {description && <p className="text-xs text-[#9CA3AF] mt-1">{description}</p>}
        </div>
        <div className="flex-shrink-0">
            {control}
        </div>
    </div>
);

const Button = ({ children, variant = 'primary', icon: Icon, onClick, accentColor, className = "", type = "button", disabled = false }) => {
    const baseStyle = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B1120] disabled:opacity-50 disabled:cursor-not-allowed";
    let variantStyle = "";
    let dynamicStyle = {};

    if (variant === 'primary') {
        variantStyle = "text-white shadow-lg";
        dynamicStyle = { backgroundColor: accentColor || '#F59E0B', boxShadow: `0 4px 14px 0 ${accentColor || '#F59E0B'}40` };
    } else if (variant === 'secondary') {
        variantStyle = "bg-[#0F172A] text-[#F9FAFB] border border-[#1F2937] hover:bg-[#1F2937]";
    } else if (variant === 'danger') {
        variantStyle = "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20";
    } else if (variant === 'ghost') {
        variantStyle = "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]";
    }

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`${baseStyle} ${variantStyle} ${className}`}
            style={dynamicStyle}
        >
            {Icon && <Icon className="w-4 h-4 mr-2" />}
            {children}
        </motion.button>
    );
};

export default function SettingsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, fetchProfile, logout } = useAuth();
    const { profile, settings: serverSettings, githubSettings, saving, error, successMessage } = useSelector((state) => state.settings);

    useEffect(() => {
        dispatch(fetchSettingsThunk());
    }, [dispatch]);

    // Notification Settings State
    const [notifications, setNotifications] = useState({
        taskNotifications: true,
        learningNotifications: true,
        xpNotifications: true,
        achievementNotifications: true,
        githubNotifications: true,
        systemNotifications: true,
    });

    // Privacy Settings State
    const [privacy, setPrivacy] = useState({
        profileVisibility: 'Public',
        showGithubPublicly: true,
        showLearningStats: true,
        showAchievementStats: true,
    });

    // Profile Form State
    const [profileForm, setProfileForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        avatar: user?.avatar || '',
        bio: user?.bio || '',
        location: user?.location || '',
        occupation: user?.occupation || '',
        githubUsername: user?.githubUsername || '',
        linkedinUrl: user?.linkedinUrl || '',
    });

    // Password Form State
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [pwdMsg, setPwdMsg] = useState({ error: '', success: '' });

    // Appearance State
    const [preview, setPreview] = useState({
        theme: 'Dark', accent: 'Amber', density: 'Comfortable', sidebar: 'Expanded', borderRadius: 'Medium', animation: 'Normal',
        language: 'English (US)', timezone: 'UTC-08:00 Pacific Time', dateFormat: 'MM/DD/YYYY', autoSave: true
    });

    useEffect(() => {
        if (serverSettings) {
            setPreview(prev => ({
                ...prev,
                theme: serverSettings.theme || 'Dark',
                accent: serverSettings.accent || 'Amber',
                density: serverSettings.density || 'Comfortable',
                sidebar: serverSettings.sidebar || 'Expanded',
                borderRadius: serverSettings.borderRadius || 'Medium',
                animation: serverSettings.animation || 'Normal',
                language: serverSettings.language || 'English (US)',
                timezone: serverSettings.timezone || 'UTC-08:00 Pacific Time',
                dateFormat: serverSettings.dateFormat || 'MM/DD/YYYY',
                autoSave: serverSettings.autoSave ?? true,
            }));
            if (serverSettings.notificationSettings) {
                setNotifications(serverSettings.notificationSettings);
            }
            if (serverSettings.privacySettings) {
                setPrivacy(serverSettings.privacySettings);
            }
        }
    }, [serverSettings]);

    useEffect(() => {
        if (user) {
            setProfileForm({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                avatar: user.avatar || '',
                bio: user.bio || '',
                location: user.location || '',
                occupation: user.occupation || '',
                githubUsername: user.githubUsername || '',
                linkedinUrl: user.linkedinUrl || '',
            });
        }
    }, [user]);

    const accentHex = ACCENT_COLORS[preview.accent] || '#F59E0B';

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        const res = await dispatch(updateProfileThunk(profileForm));
        if (updateProfileThunk.fulfilled.match(res)) {
            fetchProfile();
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileForm(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        setProfileForm(prev => ({ ...prev, avatar: '' }));
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPwdMsg({ error: '', success: '' });

        if (!passwordForm.currentPassword || !passwordForm.newPassword) {
            setPwdMsg({ error: 'Please enter all password fields.', success: '' });
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPwdMsg({ error: 'New password and confirm password do not match.', success: '' });
            return;
        }

        const res = await dispatch(changePasswordThunk(passwordForm));
        if (changePasswordThunk.fulfilled.match(res)) {
            setPwdMsg({ error: '', success: 'Password changed successfully!' });
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
            setPwdMsg({ error: res.payload || 'Failed to change password.', success: '' });
        }
    };

    const handleNotificationToggle = (key, val) => {
        const updated = { ...notifications, [key]: val };
        setNotifications(updated);
        dispatch(updatePreferencesThunk(updated));
    };

    const handlePrivacyChange = (key, val) => {
        const updated = { ...privacy, [key]: val };
        setPrivacy(updated);
        dispatch(updatePrivacyThunk(updated));
    };

    const handleApplyTheme = () => {
        dispatch(updateThemeThunk(preview));
    };

    const handleLogout = async () => {
        await dispatch(settingsLogoutThunk());
        await logout();
        navigate('/login');
    };

    const handleLogoutAll = async () => {
        await dispatch(logoutAllThunk());
        await logout();
        navigate('/login');
    };

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e) => {
        setMousePosition({
            x: (e.clientX / window.innerWidth - 0.5) * 20,
            y: (e.clientY / window.innerHeight - 0.5) * 20
        });
    };

    const integrations = [
        {
            id: 'github',
            name: 'GitHub',
            icon: Github,
            connected: Boolean(user?.githubUsername),
            lastSync: user?.githubUsername ? 'Connected' : null
        },
        { id: 'leetcode', name: 'LeetCode', icon: Code, connected: Boolean(user?.leetcodeUsername), lastSync: user?.leetcodeUsername ? 'Connected' : null },
        { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, connected: Boolean(user?.linkedinUrl), lastSync: user?.linkedinUrl ? 'Connected' : null },
    ];

    return (
        <div
            className="min-h-screen text-[#F9FAFB] font-sans overflow-hidden selection:bg-[#F59E0B]/30 pb-20"
            onMouseMove={handleMouseMove}
        >
            <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center overflow-hidden">
                <motion.div
                    animate={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
                    transition={{ type: "spring", damping: 50, stiffness: 100 }}
                    className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#F59E0B] opacity-[0.03] rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
                    transition={{ type: "spring", damping: 50, stiffness: 100 }}
                    className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#06B6D4] opacity-[0.02] rounded-full blur-[100px]"
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 space-y-16">
                {/* HERO */}
                <section className="space-y-6">
                    <div className="text-center space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="inline-flex items-center justify-center p-4 bg-[#111827] rounded-2xl border border-[#1F2937] shadow-2xl shadow-black/50 mb-2"
                        >
                            <Command size={32} color={accentHex} />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-[#9CA3AF]"
                        >
                            Settings & Account
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-[#9CA3AF]"
                        >
                            Manage your profile, account security, themes, and preferences.
                        </motion.p>
                    </div>

                    {successMessage && (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-sm flex items-center justify-between">
                            <span className="flex items-center gap-2"><Check size={18} /> {successMessage}</span>
                            <button onClick={() => dispatch(clearSettingsStatus())} className="text-xs underline">Dismiss</button>
                        </div>
                    )}
                </section>

                {/* 1. PROFILE SETTINGS */}
                <section className="space-y-6">
                    <SectionHeader title="Profile Settings" subtitle="Personalize your identity across CodeSpark." icon={User} />
                    <Card className="p-6">
                        <form onSubmit={handleSaveProfile} className="space-y-6">
                            {/* Avatar Section */}
                            <div className="flex items-center gap-6 pb-6 border-b border-[#1F2937]">
                                <div className="relative group">
                                    <div className="w-20 h-20 rounded-2xl bg-[#0F172A] border border-[#1F2937] flex items-center justify-center overflow-hidden text-2xl font-bold text-[#F59E0B]">
                                        {profileForm.avatar ? (
                                            <img src={profileForm.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            (profileForm.name || 'U').substring(0, 2).toUpperCase()
                                        )}
                                    </div>
                                    <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity rounded-2xl text-xs text-white font-medium">
                                        <Camera size={18} />
                                        <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                                    </label>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-white">Profile Photo</h4>
                                    <p className="text-xs text-[#9CA3AF]">JPG, PNG or GIF. Max 2MB.</p>
                                    <div className="flex gap-2">
                                        <label className="cursor-pointer text-xs px-3 py-1.5 rounded-lg bg-[#0F172A] border border-[#1F2937] text-white hover:bg-[#1F2937] transition-colors inline-flex items-center gap-1">
                                            <Camera size={12} /> Upload Photo
                                            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                                        </label>
                                        {profileForm.avatar && (
                                            <button
                                                type="button"
                                                onClick={handleRemoveAvatar}
                                                className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                                            >
                                                Remove Photo
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Form Inputs Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1.5"><User size={14} /> Full Name</label>
                                    <input
                                        type="text"
                                        value={profileForm.name}
                                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                                        className="w-full bg-[#0F172A] border border-[#1F2937] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1.5"><Mail size={14} /> Email Address</label>
                                    <input
                                        type="email"
                                        disabled
                                        value={profileForm.email}
                                        className="w-full bg-[#0F172A]/50 border border-[#1F2937] rounded-lg px-3.5 py-2.5 text-sm text-[#9CA3AF] cursor-not-allowed"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1.5"><Phone size={14} /> Phone Number</label>
                                    <input
                                        type="text"
                                        value={profileForm.phone}
                                        onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                                        className="w-full bg-[#0F172A] border border-[#1F2937] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1.5"><MapPin size={14} /> Location</label>
                                    <input
                                        type="text"
                                        value={profileForm.location}
                                        onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                                        className="w-full bg-[#0F172A] border border-[#1F2937] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                                        placeholder="San Francisco, CA"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1.5"><Briefcase size={14} /> Occupation</label>
                                    <input
                                        type="text"
                                        value={profileForm.occupation}
                                        onChange={e => setProfileForm({ ...profileForm, occupation: e.target.value })}
                                        className="w-full bg-[#0F172A] border border-[#1F2937] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                                        placeholder="Full Stack Developer"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1.5"><Github size={14} /> GitHub Username</label>
                                    <input
                                        type="text"
                                        value={profileForm.githubUsername}
                                        onChange={e => setProfileForm({ ...profileForm, githubUsername: e.target.value })}
                                        className="w-full bg-[#0F172A] border border-[#1F2937] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                                        placeholder="octocat"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1.5"><Linkedin size={14} /> LinkedIn URL</label>
                                    <input
                                        type="text"
                                        value={profileForm.linkedinUrl}
                                        onChange={e => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                                        className="w-full bg-[#0F172A] border border-[#1F2937] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1.5"><FileText size={14} /> Bio / About</label>
                                    <textarea
                                        rows="3"
                                        value={profileForm.bio}
                                        onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                                        className="w-full bg-[#0F172A] border border-[#1F2937] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                                        placeholder="Passionate developer building awesome web apps..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t border-[#1F2937]">
                                <Button type="submit" disabled={saving} accentColor={accentHex} icon={Check}>
                                    {saving ? 'Saving...' : 'Save Profile Changes'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </section>

                {/* 2. ACCOUNT SECURITY & PASSWORD */}
                <section className="space-y-6">
                    <SectionHeader title="Account Security" subtitle="Update your password and security credentials." icon={Shield} />
                    <Card className="p-6">
                        <form onSubmit={handleChangePassword} className="space-y-6">
                            {pwdMsg.error && (
                                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2">
                                    <AlertCircle size={16} /> {pwdMsg.error}
                                </div>
                            )}
                            {pwdMsg.success && (
                                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg text-sm flex items-center gap-2">
                                    <Check size={16} /> {pwdMsg.success}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1.5"><Key size={14} /> Current Password</label>
                                    <input
                                        type="password"
                                        value={passwordForm.currentPassword}
                                        onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                        className="w-full bg-[#0F172A] border border-[#1F2937] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1.5"><Lock size={14} /> New Password</label>
                                    <input
                                        type="password"
                                        value={passwordForm.newPassword}
                                        onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                        className="w-full bg-[#0F172A] border border-[#1F2937] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1.5"><Lock size={14} /> Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={passwordForm.confirmPassword}
                                        onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                        className="w-full bg-[#0F172A] border border-[#1F2937] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t border-[#1F2937]">
                                <Button type="submit" disabled={saving} accentColor={accentHex} icon={Lock}>
                                    {saving ? 'Updating...' : 'Update Password'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </section>

                {/* 3. NOTIFICATION PREFERENCES */}
                <section className="space-y-6">
                    <SectionHeader title="Notification Preferences" subtitle="Control alert preferences for modules." icon={Bell} />
                    <Card className="p-6">
                        <div className="space-y-2">
                            <SettingRow
                                label="Task Notifications"
                                description="Receive alerts on task completions and due dates."
                                control={<Toggle enabled={notifications.taskNotifications} onChange={v => handleNotificationToggle('taskNotifications', v)} accentColor={accentHex} />}
                            />
                            <SettingRow
                                label="Learning Notifications"
                                description="Get reminded of daily study targets and milestone completions."
                                control={<Toggle enabled={notifications.learningNotifications} onChange={v => handleNotificationToggle('learningNotifications', v)} accentColor={accentHex} />}
                            />
                            <SettingRow
                                label="XP & Level Up Notifications"
                                description="Alerts when you gain XP levels or level milestones."
                                control={<Toggle enabled={notifications.xpNotifications} onChange={v => handleNotificationToggle('xpNotifications', v)} accentColor={accentHex} />}
                            />
                            <SettingRow
                                label="Achievement Notifications"
                                description="Alerts when you unlock new badges."
                                control={<Toggle enabled={notifications.achievementNotifications} onChange={v => handleNotificationToggle('achievementNotifications', v)} accentColor={accentHex} />}
                            />
                            <SettingRow
                                label="GitHub Integration Alerts"
                                description="Notifications for GitHub repository sync and commits."
                                control={<Toggle enabled={notifications.githubNotifications} onChange={v => handleNotificationToggle('githubNotifications', v)} accentColor={accentHex} />}
                            />
                            <SettingRow
                                label="System & Maintenance Alerts"
                                description="Important platform updates and security announcements."
                                control={<Toggle enabled={notifications.systemNotifications} onChange={v => handleNotificationToggle('systemNotifications', v)} accentColor={accentHex} />}
                            />
                        </div>
                    </Card>
                </section>

                {/* 4. PRIVACY SETTINGS */}
                <section className="space-y-6">
                    <SectionHeader title="Privacy Settings" subtitle="Manage profile visibility and public data sharing." icon={Globe} />
                    <Card className="p-6">
                        <div className="space-y-2">
                            <SettingRow
                                label="Profile Visibility"
                                description="Public profiles can be viewed by potential recruiters and peers."
                                control={
                                    <Select
                                        value={privacy.profileVisibility}
                                        options={['Public', 'Private']}
                                        onChange={v => handlePrivacyChange('profileVisibility', v)}
                                    />
                                }
                            />
                            <SettingRow
                                label="Show GitHub Data Publicly"
                                description="Display contribution graphs and repos on your public profile."
                                control={<Toggle enabled={privacy.showGithubPublicly} onChange={v => handlePrivacyChange('showGithubPublicly', v)} accentColor={accentHex} />}
                            />
                            <SettingRow
                                label="Show Learning Statistics"
                                description="Display total hours studied and completed courses."
                                control={<Toggle enabled={privacy.showLearningStats} onChange={v => handlePrivacyChange('showLearningStats', v)} accentColor={accentHex} />}
                            />
                            <SettingRow
                                label="Show Achievement Badges"
                                description="Display unlocked badges on public profile."
                                control={<Toggle enabled={privacy.showAchievementStats} onChange={v => handlePrivacyChange('showAchievementStats', v)} accentColor={accentHex} />}
                            />
                        </div>
                    </Card>
                </section>

                {/* 5. APPEARANCE & LIVE STUDIO */}
                <section className="space-y-8">
                    <SectionHeader title="Appearance & Theme Studio" subtitle="Design your developer environment." icon={Layout} />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-5 space-y-6">
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-6 flex items-center"><Sliders size={18} className="mr-2 text-[#9CA3AF]" /> Studio Controls</h3>
                                <div className="space-y-2">
                                    <SettingRow
                                        label="Theme Mode"
                                        control={<Select value={preview.theme} options={['Dark', 'Light', 'System']} onChange={v => setPreview({ ...preview, theme: v })} />}
                                    />
                                    <SettingRow
                                        label="Accent Color"
                                        control={
                                            <div className="flex space-x-2">
                                                {Object.entries(ACCENT_COLORS).map(([name, hex]) => (
                                                    <button
                                                        key={name}
                                                        type="button"
                                                        onClick={() => setPreview({ ...preview, accent: name })}
                                                        className={`w-6 h-6 rounded-full focus:outline-none transition-transform ${preview.accent === name ? 'ring-2 ring-offset-2 ring-offset-[#111827] scale-110' : 'hover:scale-110'}`}
                                                        style={{ backgroundColor: hex }}
                                                        title={name}
                                                    />
                                                ))}
                                            </div>
                                        }
                                    />
                                    <SettingRow
                                        label="Layout Density"
                                        control={<Select value={preview.density} options={['Comfortable', 'Compact']} onChange={v => setPreview({ ...preview, density: v })} />}
                                    />
                                    <SettingRow
                                        label="Sidebar Style"
                                        control={<Select value={preview.sidebar} options={['Expanded', 'Collapsed', 'Floating']} onChange={v => setPreview({ ...preview, sidebar: v })} />}
                                    />
                                    <SettingRow
                                        label="Border Radius"
                                        control={<Select value={preview.borderRadius} options={['Rounded', 'Medium', 'Sharp']} onChange={v => setPreview({ ...preview, borderRadius: v })} />}
                                    />
                                    <SettingRow
                                        label="Animation Speed"
                                        control={<Select value={preview.animation} options={['Fast', 'Normal', 'Reduced Motion']} onChange={v => setPreview({ ...preview, animation: v })} />}
                                    />
                                </div>
                                <div className="pt-4 mt-4 border-t border-[#1F2937] flex justify-end">
                                    <Button onClick={handleApplyTheme} accentColor={accentHex} icon={Check}>
                                        Save Theme Preference
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        <div className="lg:col-span-7">
                            <Card className="h-full flex flex-col overflow-hidden bg-[#0F172A]" hover={false}>
                                <div className="px-4 py-3 border-b border-[#1F2937] flex justify-between items-center bg-[#111827]">
                                    <div className="flex items-center space-x-2">
                                        <Sparkles size={16} className="text-[#F59E0B]" />
                                        <span className="text-xs font-semibold tracking-widest text-[#9CA3AF] uppercase">Live Preview Studio</span>
                                    </div>
                                    <div className="flex space-x-1">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                    </div>
                                </div>
                                <div className="flex-1 p-6 flex items-center justify-center bg-[#0B1120] overflow-hidden relative">
                                    <div className="relative w-full max-w-[450px] aspect-[16/10] bg-[#111827] border border-[#1F2937] shadow-2xl flex overflow-hidden flex-row" style={{ borderRadius: BORDER_RADII[preview.borderRadius] }}>
                                        <div className="border-r border-[#1F2937] bg-[#0F172A] flex flex-col py-4 px-2" style={{ width: preview.sidebar === 'Collapsed' ? '48px' : '100px' }}>
                                            <Command size={18} color={accentHex} />
                                            <div className="mt-4 space-y-2">
                                                <div className="h-6 rounded bg-[#1F2937]" />
                                                <div className="h-6 rounded bg-[#1F2937]/50" />
                                            </div>
                                        </div>
                                        <div className="flex-1 p-4 space-y-3">
                                            <div className="h-4 w-24 bg-[#1F2937] rounded" />
                                            <div className="h-16 bg-[#0F172A] border border-[#1F2937] rounded p-3 flex items-center justify-between">
                                                <div className="h-4 w-20 bg-white/20 rounded" />
                                                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: accentHex }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* 6. DEVELOPER INTEGRATIONS */}
                <section className="space-y-6">
                    <SectionHeader title="Developer Integrations" subtitle="Connect external platforms." icon={Database} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {integrations.map((integration, i) => (
                            <Card key={integration.id} delay={i * 0.1} className="p-5 flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-[#0F172A] border border-[#1F2937] rounded-lg">
                                            <integration.icon size={20} className="text-[#F9FAFB]" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-[#F9FAFB]">{integration.name}</h4>
                                            <div className="flex items-center mt-1">
                                                <span className={`w-2 h-2 rounded-full mr-2 ${integration.connected ? 'bg-green-500' : 'bg-[#9CA3AF]'}`} />
                                                <span className="text-xs text-[#9CA3AF]">{integration.connected ? 'Connected' : 'Not Connected'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-2 pt-4 border-t border-[#1F2937]/50">
                                    <span className="text-xs text-[#9CA3AF]">
                                        {integration.lastSync ? integration.lastSync : '—'}
                                    </span>
                                    {integration.connected ? (
                                        <Button variant="secondary" className="!text-xs !px-3 !py-1.5">Connected</Button>
                                    ) : (
                                        <Button variant="secondary" className="!text-xs !px-3 !py-1.5" onClick={() => navigate('/github')}>Connect</Button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* 7. SESSION MANAGEMENT & LOGOUT */}
                <section className="space-y-6">
                    <SectionHeader title="Session Management & Danger Zone" subtitle="Manage active sessions and logout." icon={LogOut} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 space-y-4">
                            <h3 className="text-sm font-semibold text-[#F9FAFB] flex items-center gap-2"><LogOut size={16} /> Sign Out</h3>
                            <p className="text-xs text-[#9CA3AF]">Sign out from your current browser session safely.</p>
                            <Button variant="secondary" icon={LogOut} onClick={handleLogout}>
                                Logout Current Session
                            </Button>
                        </Card>

                        <Card className="p-6 border-red-900/30 bg-gradient-to-br from-[#111827] to-red-950/10">
                            <div className="flex items-start space-x-3">
                                <AlertCircle size={20} className="text-red-500 mt-1" />
                                <div>
                                    <h3 className="text-sm font-semibold text-red-500">Global Session Control</h3>
                                    <p className="text-xs text-[#9CA3AF] mt-1 mb-4">Revoke all active tokens across all devices and sign out everywhere.</p>
                                    <Button variant="danger" icon={Lock} onClick={handleLogoutAll}>
                                        Logout From All Devices
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="mt-20 pt-8 border-t border-[#1F2937] text-center text-xs text-[#9CA3AF]">
                    CodeSpark Developer Platform v1.0.0 • All Settings Connected to Live Database
                </footer>
            </div>
        </div>
    );
}