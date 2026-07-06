import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  Search,
  Sparkles,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Check,
  Circle,
  Flame
} from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Daily Streak Achieved!',
    description: 'You hit a 7-day coding streak. Keep it up!',
    time: '2 hours ago',
    unread: true,
    icon: <Flame size={16} className="text-orange-500" /> // Will map to a span/icon
  },
  {
    id: 2,
    title: 'New LeetCode Challenge',
    description: 'The weekly dynamic programming challenge is live.',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: 3,
    title: 'GitHub Sync Complete',
    description: '12 new commits have been synced to your profile.',
    time: '1 day ago',
    unread: false,
  }
];

function Navbar({ onMenuClick, pageTitle = "Dashboard" }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  
  const searchInputRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();

  // Extract a readable title from the route if pageTitle isn't explicitly passed
  const currentPath = location.pathname === '/' ? 'Dashboard' : 
                      location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.slice(2);
  const displayTitle = pageTitle !== "Dashboard" ? pageTitle : currentPath;

  useEffect(() => {
    // Ctrl+K to focus search
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    // Close dropdowns when clicking outside
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = (e) => {
    e.stopPropagation();
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
<header
  className="
    sticky
    top-4
    mx-4
    mb-4
    h-16
    rounded-3xl
    border
    border-[#1F2937]
    bg-[#111827]/90
    backdrop-blur-xl
    shadow-lg
    flex
    items-center
    justify-between
    px-6
    z-40
  "
>     
      {/* --- LEFT SECTION: Mobile Menu & Breadcrumb --- */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          aria-label="Open Mobile Menu"
        >
          <Menu size={20} />
        </button>

        <nav className="hidden sm:flex items-center gap-2 text-sm font-medium">
          <Link to="/" className="text-[#9CA3AF] hover:text-white transition-colors">
            CODESPARK
          </Link>
          <ChevronRight size={14} className="text-[#4B5563]" />
          <span className="text-white">{displayTitle}</span>
        </nav>
      </div>

      {/* --- CENTER SECTION: Global Search --- */}
      <div className="flex-1 max-w-lg px-4 hidden md:block">
        <div 
          className={`relative flex items-center w-full h-10 rounded-xl border bg-[#111827] overflow-hidden transition-all duration-200 ${
            isSearchFocused 
              ? 'border-amber-500 ring-1 ring-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
              : 'border-[#1F2937] hover:border-[#374151]'
          }`}
        >
          <div className="pl-3 text-[#9CA3AF]">
            <Search size={18} className={isSearchFocused ? 'text-amber-500' : ''} />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search anything..."
            className="w-full bg-transparent border-none text-sm text-white px-3 py-2 focus:outline-none placeholder:text-[#4B5563]"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <div className="pr-3 hidden lg:flex items-center">
            <kbd className="inline-flex items-center justify-center h-6 px-2 text-[10px] font-mono font-medium text-[#9CA3AF] bg-[#1F2937] rounded-md border border-[#374151]">
              Ctrl+K
            </kbd>
          </div>
        </div>
      </div>

      {/* --- RIGHT SECTION: XP, Notifications, Profile --- */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        {/* XP Badge (Hidden on very small screens) */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-500 cursor-default select-none hover:border-amber-500/40 transition-colors">
          <Sparkles size={16} className="text-amber-400" />
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Level 4</span>
            <span className="text-xs font-bold">1,240 XP</span>
          </div>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileOpen(false);
            }}
            className={`relative p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
              isNotifOpen ? 'bg-[#1F2937] text-white' : 'text-[#9CA3AF] hover:bg-[#1F2937] hover:text-white'
            }`}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 border-2 border-[#0B1120]"></span>
              </span>
            )}
          </button>

          {/* Notification Menu Panel */}
          <div 
            className={`absolute right-0 mt-2 w-80 sm:w-96 bg-[#111827] border border-[#1F2937] rounded-xl shadow-2xl origin-top-right transition-all duration-200 z-50 overflow-hidden ${
              isNotifOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1F2937] bg-[#0B1120]/50">
              <h3 className="font-semibold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-xs font-medium text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <Check size={12} /> Mark all read
                </button>
              )}
            </div>
            
            <div className="max-h-[320px] overflow-y-auto [scrollbar-width:none]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-[#9CA3AF] text-sm">
                  You're all caught up!
                </div>
              ) : (
                notifications.map((notif) => (
                  <Link 
                    key={notif.id}
                    to="/notifications"
                    onClick={() => setIsNotifOpen(false)}
                    className="flex gap-3 px-4 py-3 hover:bg-[#1F2937]/50 transition-colors border-b border-[#1F2937]/50 last:border-0 group"
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {notif.unread ? (
                        <Circle size={10} className="fill-amber-500 text-amber-500" />
                      ) : (
                        <Circle size={10} className="text-[#374151]" />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-medium mb-0.5 ${notif.unread ? 'text-white' : 'text-[#9CA3AF]'}`}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                        {notif.description}
                      </p>
                      <p className="text-[10px] font-medium text-[#4B5563] mt-1.5 uppercase tracking-wider">
                        {notif.time}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
            
            <div className="p-2 border-t border-[#1F2937] bg-[#0B1120]/50">
              <Link 
                to="/notifications" 
                onClick={() => setIsNotifOpen(false)}
                className="block w-full py-2 text-center text-xs font-medium text-[#9CA3AF] hover:text-white rounded-lg hover:bg-[#1F2937] transition-colors"
              >
                View all notifications
              </Link>
            </div>
          </div>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotifOpen(false);
            }}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-transparent hover:border-[#1F2937] hover:bg-[#111827] transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            aria-label="User Menu"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-md">
              <div className="h-full w-full bg-[#0B1120] rounded-full flex items-center justify-center border border-[#0B1120]">
                <span className="text-xs font-bold text-amber-500">AM</span>
              </div>
            </div>
          </button>

          {/* Profile Menu Panel */}
          <div 
            className={`absolute right-0 mt-2 w-56 bg-[#111827] border border-[#1F2937] rounded-xl shadow-2xl origin-top-right transition-all duration-200 z-50 overflow-hidden ${
              isProfileOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'
            }`}
          >
            <div className="px-4 py-3 border-b border-[#1F2937] bg-[#0B1120]/50">
              <p className="text-sm font-semibold text-white truncate">Alex Morgan</p>
              <p className="text-xs text-[#9CA3AF] truncate mt-0.5">alex@codespark.dev</p>
            </div>
            
            <div className="py-1">
              <Link 
                to="/profile" 
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] transition-colors"
              >
                <User size={16} />
                Profile
              </Link>
              <Link 
                to="/settings" 
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] transition-colors"
              >
                <Settings size={16} />
                Settings
              </Link>
            </div>
            
            <div className="py-1 border-t border-[#1F2937]">
              <Link 
                to="/logout" 
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </Link>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
export default Navbar;