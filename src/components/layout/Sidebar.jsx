import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Zap,
    ChevronLeft,
    ChevronRight,
    X,
    Menu,
    LayoutDashboard,
    CheckSquare,
    Github,
    Code2,
    BookOpen,
    MessageSquare,
    Linkedin,
    BarChart3,
    Book,
    FileText,
    Trophy,
    Bell,
    Settings,
    User,
    LogOut
} from 'lucide-react';

const MAIN_NAV_ITEMS = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
    { path: '/github', label: 'GitHub', icon: Github },
    { path: '/leetcode', label: 'LeetCode', icon: Code2 },
    { path: '/learning', label: 'Learning', icon: BookOpen },
    { path: '/communication', label: 'Communication', icon: MessageSquare },
    { path: '/linkedin', label: 'LinkedIn', icon: Linkedin },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/journal', label: 'Journal', icon: Book },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/achievements', label: 'Achievements', icon: Trophy },
    { path: '/notifications', label: 'Notifications', icon: Bell },
    { path: '/settings', label: 'Settings', icon: Settings },
];

const BOTTOM_NAV_ITEMS = [
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/logout', label: 'Logout', icon: LogOut, isDanger: true },
];

function Sidebar({
    isCollapsed = false,
    setIsCollapsed,
    isMobileOpen = false,
    setIsMobileOpen
}) {
    const location = useLocation();

    const handleNavClick = () => {
        if (setIsMobileOpen) setIsMobileOpen(false);
    };

    const navLinkClasses = ({ isActive, isDanger }) => {
        const base = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative border-l-2 ";

        if (isActive) {
            return base + "bg-amber-500/10 text-white border-amber-500";
        }

        if (isDanger) {
            return base + "text-[#9CA3AF] border-transparent hover:bg-red-500/10 hover:text-red-500 hover:border-red-500";
        }

        return base + "text-[#9CA3AF] border-transparent hover:bg-[#1F2937] hover:text-white";
    };

    const renderNavLinks = (items) => (
        <ul className="space-y-1">
            {items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                    <li key={item.path} className="relative">
                        <NavLink
                            to={item.path}
                            onClick={handleNavClick}
                            className={({ isActive }) => navLinkClasses({ isActive, isDanger: item.isDanger })}
                        >
                            <Icon
                                size={20}
                                className={`shrink-0 transition-colors ${isActive
                                    ? 'text-amber-500'
                                    : item.isDanger
                                        ? 'text-[#9CA3AF] group-hover:text-red-500'
                                        : 'text-[#9CA3AF] group-hover:text-white'
                                    }`}
                            />

                            <span
                                className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isCollapsed ? 'w-0 opacity-0 md:hidden' : 'w-auto opacity-100'
                                    }`}
                            >
                                {item.label}
                            </span>

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <div className="absolute left-14 hidden md:group-hover:block z-50 pointer-events-none">
                                    <div className="bg-[#1F2937] text-white text-xs px-2.5 py-1.5 rounded-lg border border-[#374151] shadow-xl whitespace-nowrap">
                                        {item.label}
                                    </div>
                                </div>
                            )}
                        </NavLink>
                    </li>
                );
            })}
        </ul>
    );

    return (
        <>
            {/* Mobile Drawer Backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className="
    fixed
    top-4
    left-4
    bottom-4
    w-[270px]
    rounded-3xl
    border border-[#1F2937]
    bg-[#111827]
    overflow-hidden
    flex flex-col
  "
            >
                {/* Top Header Section */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-[#1F2937] shrink-0">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
                            <Zap className="text-[#0B1120] fill-[#0B1120]" size={16} />
                        </div>
                        <span
                            className={`text-lg font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-[#9CA3AF] whitespace-nowrap transition-all duration-300
                ${isCollapsed ? 'opacity-0 w-0 md:hidden' : 'opacity-100 w-auto'}
              `}
                        >
                            CODESPARK
                        </span>
                    </div>

                    {/* Desktop Collapse Toggle */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden md:flex items-center justify-center p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] transition-colors"
                        aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>

                    {/* Mobile Close Toggle */}
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden flex items-center justify-center p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] transition-colors"
                        aria-label="Close Sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Main Navigation Scroll Area */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {renderNavLinks(MAIN_NAV_ITEMS)}
                </nav>

                {/* Bottom Section (Profile & Logout) */}
                <div className="p-3 border-t border-[#1F2937] shrink-0 bg-[#111827]">
                    {renderNavLinks(BOTTOM_NAV_ITEMS)}
                </div>
            </aside>
        </>
    );
}
export default Sidebar;
