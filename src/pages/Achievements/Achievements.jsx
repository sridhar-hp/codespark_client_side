import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  Trophy, Star, Zap, Flame, Target, Award, Github, Code2, BookOpen, MessageSquare,
  Briefcase, FileText, Rocket, Search, X, Share2, Download, GitCompare, Focus,
  ChevronRight, ChevronDown, Lock, CheckCircle2, Sparkles, Layers, Users, Cpu,
  Database, Server, Terminal, GraduationCap, TrendingUp, Calendar, Gift, Crown,
  Gem, Shield, Puzzle, Mic, PenSquare, Globe, ArrowUpRight,
} from "lucide-react";

/* =========================================================
   DESIGN TOKENS
   ========================================================= */
const C = {
  bg: "#0B1120",
  card: "#111827",
  surface: "#0F172A",
  border: "#1F2937",
  amber: "#F59E0B",
  orange: "#F97316",
  cyan: "#06B6D4",
  success: "#10B981",
  danger: "#EF4444",
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  textMuted: "#6B7280",
};

const RARITY_COLOR = {
  Legendary: C.amber,
  Epic: C.cyan,
  Rare: C.orange,
  Common: C.textSecondary,
};

/* =========================================================
   MOCK DATA
   ========================================================= */
const PROFILE = {
  name: "Aarav Mehta",
  level: 14,
  rank: "Senior Contributor",
  totalXP: 42850,
  unlocked: 38,
  totalAchievements: 54,
  streak: 23,
  completion: 70,
};

const PASSPORT = {
  number: "CS-2024-08841",
  verified: true,
  rank: "Senior Contributor",
  level: 14,
  memberSince: "Jan 2024",
  stack: ["React", "Node.js", "PostgreSQL"],
  completion: 76,
  status: "Active",
};

const OVERVIEW_STATS = [
  { id: "unlocked", label: "Unlocked", value: 38, icon: CheckCircle2, color: C.success },
  { id: "locked", label: "Locked", value: 16, icon: Lock, color: C.textMuted },
  { id: "legendary", label: "Legendary", value: 4, icon: Crown, color: C.amber },
  { id: "epic", label: "Epic", value: 9, icon: Gem, color: C.cyan },
  { id: "rare", label: "Rare", value: 14, icon: Shield, color: C.orange },
  { id: "xp", label: "XP Earned", value: 42850, icon: Zap, color: C.amber },
];

const ACHIEVEMENTS = [
  {
    id: "a1", title: "First Commit", desc: "Pushed your first commit to a public repository.",
    icon: Github, xp: 100, difficulty: "Common", category: "GitHub", unlocked: true,
    unlockDate: "Jan 12, 2024", progress: 100,
    requirements: ["Push at least 1 commit to a public repo"],
    rewards: ["100 XP", "GitHub badge"],
  },
  {
    id: "a2", title: "Century Solver", desc: "Solved 100 problems on LeetCode across all difficulties.",
    icon: Code2, xp: 400, difficulty: "Rare", category: "LeetCode", unlocked: true,
    unlockDate: "Apr 03, 2024", progress: 100,
    requirements: ["Solve 100 LeetCode problems"],
    rewards: ["400 XP", "Problem Solver badge", "Profile highlight"],
  },
  {
    id: "a3", title: "React Master", desc: "Built and shipped 5 production-grade React applications.",
    icon: Layers, xp: 600, difficulty: "Epic", category: "React", unlocked: true,
    unlockDate: "Jun 21, 2024", progress: 100,
    requirements: ["Ship 5 production React apps", "Each app must be publicly deployed"],
    rewards: ["600 XP", "React Master badge", "Portfolio feature slot"],
  },
  {
    id: "a4", title: "Full-Stack Architect", desc: "Designed and deployed a complete MERN stack application from scratch.",
    icon: Server, xp: 750, difficulty: "Epic", category: "Backend", unlocked: true,
    unlockDate: "Aug 09, 2024", progress: 100,
    requirements: ["Deploy a MongoDB + Express + React + Node app", "Include authentication"],
    rewards: ["750 XP", "Architect badge"],
  },
  {
    id: "a5", title: "500 Commit Club", desc: "Reached 500 lifetime commits across all repositories.",
    icon: Github, xp: 500, difficulty: "Rare", category: "GitHub", unlocked: true,
    unlockDate: "Sep 14, 2024", progress: 100,
    requirements: ["Reach 500 lifetime commits"],
    rewards: ["500 XP", "Consistency badge"],
  },
  {
    id: "a6", title: "Database Whisperer", desc: "Designed a normalized relational schema handling 1M+ rows efficiently.",
    icon: Database, xp: 550, difficulty: "Epic", category: "Database", unlocked: true,
    unlockDate: "Oct 02, 2024", progress: 100,
    requirements: ["Design a schema for 1M+ row dataset", "Pass query performance benchmark"],
    rewards: ["550 XP", "Database badge"],
  },
  {
    id: "a7", title: "Clear Communicator", desc: "Completed 20 structured async updates with high clarity scores.",
    icon: MessageSquare, xp: 300, difficulty: "Rare", category: "Communication", unlocked: true,
    unlockDate: "Oct 28, 2024", progress: 100,
    requirements: ["Post 20 async updates", "Maintain 85+ clarity score"],
    rewards: ["300 XP", "Communicator badge"],
  },
  {
    id: "a8", title: "Resume Ready", desc: "Achieved an ATS resume score above 80.",
    icon: FileText, xp: 250, difficulty: "Common", category: "Career", unlocked: true,
    unlockDate: "Nov 05, 2024", progress: 100,
    requirements: ["Score 80+ on ATS resume check"],
    rewards: ["250 XP", "Career badge"],
  },
  {
    id: "a9", title: "Learning Streak", desc: "Maintained a 30-day continuous learning streak.",
    icon: Flame, xp: 350, difficulty: "Rare", category: "Learning", unlocked: true,
    unlockDate: "Nov 20, 2024", progress: 100,
    requirements: ["30 consecutive days of learning activity"],
    rewards: ["350 XP", "Streak badge"],
  },
  {
    id: "a10", title: "Open Source Contributor", desc: "Merged a pull request into an external open-source repository.",
    icon: Github, xp: 450, difficulty: "Epic", category: "GitHub", unlocked: true,
    unlockDate: "Dec 08, 2024", progress: 100,
    requirements: ["Get 1 PR merged into an external repo"],
    rewards: ["450 XP", "Contributor badge"],
  },
  {
    id: "a11", title: "Algorithm Sprinter", desc: "Solved 10 problems in a single day during a focused sprint.",
    icon: Zap, xp: 200, difficulty: "Common", category: "LeetCode", unlocked: true,
    unlockDate: "Dec 22, 2024", progress: 100,
    requirements: ["Solve 10 problems in one day"],
    rewards: ["200 XP", "Sprinter badge"],
  },
  {
    id: "a12", title: "Interview Ready", desc: "Completed 10 mock technical interviews with strong feedback.",
    icon: Mic, xp: 400, difficulty: "Rare", category: "Career", unlocked: false,
    unlockDate: null, progress: 70,
    requirements: ["Complete 10 mock interviews", "Average score above 7.5/10"],
    rewards: ["400 XP", "Interview Ready badge"],
  },
  {
    id: "a13", title: "System Design Novice", desc: "Completed the foundational system design learning track.",
    icon: Cpu, xp: 500, difficulty: "Epic", category: "Learning", unlocked: false,
    unlockDate: null, progress: 55,
    requirements: ["Finish all 8 modules in System Design Fundamentals"],
    rewards: ["500 XP", "Systems badge"],
  },
  {
    id: "a14", title: "Thousand Problem Solver", desc: "Solved 1,000 problems across all coding platforms.",
    icon: Trophy, xp: 1200, difficulty: "Legendary", category: "LeetCode", unlocked: false,
    unlockDate: null, progress: 34,
    requirements: ["Solve 1,000 total problems"],
    rewards: ["1200 XP", "Legendary badge", "Leaderboard spotlight"],
  },
  {
    id: "a15", title: "Production Guardian", desc: "Shipped 20 production deployments with zero critical incidents.",
    icon: Shield, xp: 800, difficulty: "Legendary", category: "Backend", unlocked: false,
    unlockDate: null, progress: 40,
    requirements: ["20 production deploys", "Zero P0/P1 incidents"],
    rewards: ["800 XP", "Guardian badge"],
  },
  {
    id: "a16", title: "Network Builder", desc: "Grew your professional network to 500+ meaningful connections.",
    icon: Users, xp: 300, difficulty: "Rare", category: "Career", unlocked: false,
    unlockDate: null, progress: 82,
    requirements: ["Reach 500 professional connections"],
    rewards: ["300 XP", "Networker badge"],
  },
];

const COLLECTIONS = [
  { id: "frontend", label: "Frontend", icon: Layers, unlocked: 8, total: 10, xp: 3200 },
  { id: "backend", label: "Backend", icon: Server, unlocked: 5, total: 8, xp: 2600 },
  { id: "react", label: "React", icon: Cpu, unlocked: 6, total: 7, xp: 2900 },
  { id: "node", label: "Node", icon: Terminal, unlocked: 4, total: 6, xp: 1800 },
  { id: "database", label: "Database", icon: Database, unlocked: 3, total: 5, xp: 1500 },
  { id: "github", label: "GitHub", icon: Github, unlocked: 7, total: 8, xp: 2400 },
  { id: "communication", label: "Communication", icon: MessageSquare, unlocked: 3, total: 6, xp: 1100 },
  { id: "career", label: "Career", icon: Briefcase, unlocked: 4, total: 7, xp: 1650 },
  { id: "learning", label: "Learning", icon: GraduationCap, unlocked: 5, total: 8, xp: 2100 },
  { id: "leetcode", label: "LeetCode", icon: Code2, unlocked: 6, total: 9, xp: 2750 },
  { id: "projects", label: "Projects", icon: Rocket, unlocked: 4, total: 6, xp: 1900 },
];

const CAREER_JOURNEY = [
  { id: "j1", title: "Started Programming", date: "2022", icon: Terminal, desc: "Wrote the first 'Hello World' and never looked back." },
  { id: "j2", title: "Built First Website", date: "2022", icon: Globe, desc: "Shipped a static portfolio site using HTML, CSS, and vanilla JS." },
  { id: "j3", title: "Learned JavaScript", date: "2023", icon: Code2, desc: "Went deep on closures, async patterns, and the event loop." },
  { id: "j4", title: "Mastered React", date: "2023", icon: Layers, desc: "Built 5+ component-driven apps with hooks and state management." },
  { id: "j5", title: "Built MERN Project", date: "2024", icon: Server, desc: "Shipped a full-stack app with MongoDB, Express, React, and Node." },
  { id: "j6", title: "Solved 100 Problems", date: "2024", icon: Trophy, desc: "Crossed the 100-problem mark on LeetCode with consistent practice." },
  { id: "j7", title: "Internship", date: "2024", icon: Briefcase, desc: "Joined Nimbus Labs as a Software Engineer Intern." },
  { id: "j8", title: "Software Engineer", date: "In progress", icon: Rocket, desc: "Targeting full-time SWE offers with a polished portfolio." },
  { id: "j9", title: "Senior Engineer", date: "Future", icon: Star, desc: "Own systems end-to-end and mentor junior engineers." },
  { id: "j10", title: "Architect", date: "Future", icon: Crown, desc: "Shape technical strategy at the organization level." },
];

const XP_DISTRIBUTION = [
  { category: "React", xp: 2900 },
  { category: "GitHub", xp: 2400 },
  { category: "LeetCode", xp: 2750 },
  { category: "Backend", xp: 2600 },
  { category: "Learning", xp: 2100 },
  { category: "Career", xp: 1650 },
  { category: "Projects", xp: 1900 },
  { category: "Comm.", xp: 1100 },
];

const MILESTONES = [
  { id: "m1", title: "React Master", date: "Jun 21, 2024", reward: "Portfolio feature slot", xp: 600, icon: Layers },
  { id: "m2", title: "Full-Stack Architect", date: "Aug 09, 2024", reward: "Architect badge", xp: 750, icon: Server },
  { id: "m3", title: "Open Source Contributor", date: "Dec 08, 2024", reward: "Contributor badge", xp: 450, icon: Github },
  { id: "m4", title: "Database Whisperer", date: "Oct 02, 2024", reward: "Database badge", xp: 550, icon: Database },
];

const UPCOMING = [
  { id: "u1", title: "Interview Ready", progress: 70, difficulty: "Rare", reward: "400 XP + badge", estimate: "~1 week" },
  { id: "u2", title: "Network Builder", progress: 82, difficulty: "Rare", reward: "300 XP + badge", estimate: "~3 days" },
  { id: "u3", title: "System Design Novice", progress: 55, difficulty: "Epic", reward: "500 XP + badge", estimate: "~2 weeks" },
  { id: "u4", title: "Thousand Problem Solver", progress: 34, difficulty: "Legendary", reward: "1200 XP + spotlight", estimate: "~2 months" },
];

const FILTERS = ["All", "Unlocked", "Locked", "Legendary", "Rare", "Projects", "React", "GitHub", "Learning", "Career"];

/* =========================================================
   HOOKS
   ========================================================= */
function useCountUp(target, duration = 1500, start = true) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [target, duration, start]);
  return Math.round(value).toLocaleString();
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold });
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* =========================================================
   SHARED UI PRIMITIVES
   ========================================================= */
function SectionHeader({ eyebrow, title, subtitle, right }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        <div className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: C.amber }}>{eyebrow}</div>
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: C.text }}>{title}</h2>
        {subtitle && <p className="mt-1 text-sm" style={{ color: C.textSecondary }}>{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

function Card({ children, className = "", style = {}, hover = true, ...rest }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: "0 20px 45px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.18)" } : {}}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`rounded-[28px] border ${className}`}
      style={{ background: C.card, borderColor: C.border, ...style }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

function RippleButton({ icon: Icon, children, onClick, tone = "default", size = "md" }) {
  const [ripples, setRipples] = useState([]);
  const styles = {
    default: { border: C.border, color: C.text, bg: "rgba(255,255,255,0.02)" },
    primary: { border: "rgba(245,158,11,0.5)", color: "#0B1120", bg: `linear-gradient(135deg, ${C.amber}, ${C.orange})` },
    ghost: { border: C.border, color: C.textSecondary, bg: "transparent" },
  }[tone];
  const pad = size === "sm" ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm";

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
    onClick && onClick();
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className={`relative overflow-hidden inline-flex items-center gap-2 rounded-2xl font-medium border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${pad}`}
      style={{ borderColor: styles.border, color: styles.color, background: styles.bg, "--tw-ring-color": C.amber, "--tw-ring-offset-color": C.bg }}
    >
      {Icon && <Icon size={16} />}
      {children}
      {ripples.map((r) => (
        <span key={r.id} className="absolute rounded-full pointer-events-none"
          style={{ left: r.x, top: r.y, width: 8, height: 8, background: "rgba(255,255,255,0.35)", transform: "translate(-50%,-50%)", animation: "ripple 600ms ease-out forwards" }} />
      ))}
    </motion.button>
  );
}

function ProgressBar({ value, color = C.amber, height = 6 }) {
  return (
    <div className="rounded-full overflow-hidden" style={{ background: C.border, height }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function DifficultyBadge({ level }) {
  const color = RARITY_COLOR[level] || C.textSecondary;
  return (
    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: `${color}1A`, color }}>{level}</span>
  );
}

function Toast({ message, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 10, x: "-50%" }}
          className="fixed bottom-6 left-1/2 z-[200] px-5 py-3 rounded-2xl border text-sm font-medium"
          style={{ background: "rgba(17,24,39,0.95)", borderColor: C.border, color: C.text, boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
   SECTION 1 — HERO
   ========================================================= */
function Hero() {
  const xp = useCountUp(PROFILE.totalXP, 1700);
  const unlocked = useCountUp(PROFILE.unlocked, 1300);
  const streak = useCountUp(PROFILE.streak, 1100);
  const completion = useCountUp(PROFILE.completion, 1300);

  return (
    <section className="relative overflow-hidden rounded-[32px] border" style={{ borderColor: C.border }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(120% 100% at 15% 0%, rgba(245,158,11,0.14), transparent 55%), radial-gradient(100% 90% at 90% 10%, rgba(6,182,212,0.08), transparent 50%), ${C.card}` }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,17,32,0) 0%, rgba(11,17,32,0.5) 100%)" }} />

      <div className="relative p-6 md:p-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: C.amber }}>
          <Sparkles size={14} /> Engineering Journey
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }}
          className="text-3xl md:text-5xl font-bold leading-tight mb-3" style={{ color: C.text }}>
          Engineering Achievements
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
          className="text-sm md:text-base mb-8 max-w-xl" style={{ color: C.textSecondary }}>
          A record of what you've shipped, solved, and learned — turned into a durable, recruiter-ready proof of work.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { label: "Level", value: PROFILE.level, icon: Star, color: C.amber },
            { label: "Rank", value: PROFILE.rank, icon: Crown, color: C.orange, isText: true },
            { label: "Total XP", value: xp, icon: Zap, color: C.amber },
            { label: "Unlocked", value: `${unlocked}/${PROFILE.totalAchievements}`, icon: Trophy, color: C.cyan },
            { label: "Streak", value: `${streak}d`, icon: Flame, color: C.orange },
            { label: "Completion", value: `${completion}%`, icon: Target, color: C.success },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 + i * 0.05 }}
              className="rounded-2xl p-4 border" style={{ borderColor: C.border, background: "rgba(255,255,255,0.02)" }}>
              <s.icon size={16} style={{ color: s.color }} className="mb-2" />
              <div className={`font-bold ${s.isText ? "text-sm" : "text-xl"}`} style={{ color: C.text }}>{s.value}</div>
              <div className="text-[11px] mt-0.5" style={{ color: C.textMuted }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 2 — DEVELOPER PASSPORT
   ========================================================= */
function DeveloperPassport() {
  const initials = PROFILE.name.split(" ").map((n) => n[0]).join("");
  return (
    <section>
      <SectionHeader eyebrow="Section 02" title="Developer Passport" subtitle="A verified digital identity card for your engineering profile." />
      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[28px] border p-6 md:p-8"
        style={{ background: `linear-gradient(135deg, ${C.card}, ${C.surface})`, borderColor: C.border }}
      >
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-[0.06]" style={{ background: `radial-gradient(circle, ${C.amber}, transparent 70%)` }} />
        <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0"
            style={{ background: `linear-gradient(135deg, ${C.amber}, ${C.orange})`, color: "#0B1120" }}>
            {initials}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold" style={{ color: C.text }}>{PROFILE.name}</span>
              {PASSPORT.verified && (
                <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${C.success}1A`, color: C.success }}>
                  <CheckCircle2 size={11} /> Verified
                </span>
              )}
            </div>
            <div className="text-xs mb-4 font-mono tracking-wide" style={{ color: C.textMuted }}>{PASSPORT.number}</div>
            <div className="flex flex-wrap gap-1.5">
              {PASSPORT.stack.map((s) => (
                <span key={s} className="text-[11px] px-2 py-1 rounded-full border" style={{ borderColor: C.border, color: C.textSecondary }}>{s}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 text-sm">
            {[
              { label: "Rank", value: PASSPORT.rank },
              { label: "Level", value: PASSPORT.level },
              { label: "Member Since", value: PASSPORT.memberSince },
              { label: "Status", value: PASSPORT.status },
            ].map((f) => (
              <div key={f.label}>
                <div className="text-[11px]" style={{ color: C.textMuted }}>{f.label}</div>
                <div className="font-semibold" style={{ color: C.text }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-6 pt-6 border-t" style={{ borderColor: C.border }}>
          <div className="flex items-center justify-between text-xs mb-1.5" style={{ color: C.textMuted }}>
            <span>Profile Completion</span><span>{PASSPORT.completion}%</span>
          </div>
          <ProgressBar value={PASSPORT.completion} color={C.amber} />
        </div>
      </motion.div>
    </section>
  );
}

/* =========================================================
   SECTION 3 — ACHIEVEMENT OVERVIEW
   ========================================================= */
function OverviewCard({ data, inView }) {
  const value = useCountUp(data.value, 1400, inView);
  const Icon = data.icon;
  return (
    <Card className="p-5 text-center">
      <Icon size={20} style={{ color: data.color }} className="mx-auto mb-2" />
      <div className="text-xl font-bold" style={{ color: C.text }}>{value}</div>
      <div className="text-[11px] mt-1" style={{ color: C.textMuted }}>{data.label}</div>
    </Card>
  );
}

function AchievementOverview() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref}>
      <SectionHeader eyebrow="Section 03" title="Achievement Overview" subtitle="Your full progress footprint at a glance." />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {OVERVIEW_STATS.map((s) => <OverviewCard key={s.id} data={s} inView={inView} />)}
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 4 — ACHIEVEMENT GALLERY (+ Search + Filters, Sections 12/13)
   ========================================================= */
function AchievementCard({ data, onOpen }) {
  const Icon = data.icon;
  const rarityColor = RARITY_COLOR[data.difficulty] || C.textSecondary;
  return (
    <motion.button
      layout
      onClick={() => onOpen(data)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="text-left rounded-[28px] border p-5 relative overflow-hidden focus:outline-none focus-visible:ring-2"
      style={{
        background: C.card, borderColor: C.border, "--tw-ring-color": C.amber,
        opacity: data.unlocked ? 1 : 0.72,
      }}
    >
      {!data.unlocked && (
        <div className="absolute top-4 right-4"><Lock size={14} style={{ color: C.textMuted }} /></div>
      )}
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: data.unlocked ? `${C.amber}1A` : "rgba(255,255,255,0.03)" }}>
        <Icon size={20} style={{ color: data.unlocked ? C.amber : C.textMuted }} />
      </div>
      <div className="font-semibold mb-1" style={{ color: C.text }}>{data.title}</div>
      <p className="text-xs mb-4 line-clamp-2" style={{ color: C.textSecondary }}>{data.desc}</p>

      <div className="flex items-center gap-2 mb-3">
        <DifficultyBadge level={data.difficulty} />
        <span className="text-[11px] px-2 py-1 rounded-full border" style={{ borderColor: C.border, color: C.textMuted }}>{data.category}</span>
      </div>

      {!data.unlocked && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-[11px] mb-1" style={{ color: C.textMuted }}>
            <span>Progress</span><span>{data.progress}%</span>
          </div>
          <ProgressBar value={data.progress} color={C.cyan} height={4} />
        </div>
      )}

      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold" style={{ color: C.amber }}>+{data.xp} XP</span>
        <span style={{ color: C.textMuted }}>{data.unlocked ? data.unlockDate : "In progress"}</span>
      </div>
    </motion.button>
  );
}

function AchievementGallery() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalData, setModalData] = useState(null);

  const filtered = useMemo(() => {
    return ACHIEVEMENTS.filter((a) => {
      const matchesQuery = (a.title + a.desc + a.category).toLowerCase().includes(query.toLowerCase());
      if (!matchesQuery) return false;
      if (filter === "All") return true;
      if (filter === "Unlocked") return a.unlocked;
      if (filter === "Locked") return !a.unlocked;
      if (filter === "Legendary" || filter === "Rare") return a.difficulty === filter;
      return a.category === filter;
    });
  }, [query, filter]);

  return (
    <>
      <section>
        <SectionHeader eyebrow="Section 04 · 12 · 13" title="Achievement Gallery" subtitle="Search and filter every achievement, unlocked or not." />

        {/* Section 12 — Search */}
        <div className="relative mb-5 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: C.textMuted }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search achievements..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border text-sm focus:outline-none focus-visible:ring-2"
            style={{ background: C.surface, borderColor: C.border, color: C.text, "--tw-ring-color": C.amber }}
          />
        </div>

        {/* Section 13 — Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors focus:outline-none focus-visible:ring-2"
              style={{
                borderColor: filter === f ? C.amber : C.border,
                color: filter === f ? "#0B1120" : C.textSecondary,
                background: filter === f ? C.amber : "transparent",
                "--tw-ring-color": C.amber,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((a) => <AchievementCard key={a.id} data={a} onOpen={setModalData} />)}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-sm" style={{ color: C.textMuted }}>No achievements match your search.</div>
        )}
      </section>

      <AchievementModal data={modalData} onClose={() => setModalData(null)} />
    </>
  );
}

/* =========================================================
   SECTION 5 — ACHIEVEMENT DETAIL MODAL
   ========================================================= */
function AchievementModal({ data, onClose }) {
  useEffect(() => {
    if (!data) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [data, onClose]);

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog" aria-modal="true" aria-label={data.title}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: "rgba(3,7,18,0.75)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-[28px] border p-6 md:p-8 max-h-[85vh] overflow-y-auto"
            style={{ background: `linear-gradient(180deg, ${C.card}, ${C.surface})`, borderColor: C.border, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${C.amber}1A` }}>
                  <data.icon size={22} style={{ color: C.amber }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: C.text }}>{data.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <DifficultyBadge level={data.difficulty} />
                    <span className="text-[11px]" style={{ color: C.textMuted }}>{data.category}</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} aria-label="Close" className="p-2 rounded-full focus:outline-none focus-visible:ring-2"
                style={{ color: C.textSecondary, "--tw-ring-color": C.amber }}>
                <X size={20} />
              </button>
            </div>

            <p className="text-sm mb-5" style={{ color: C.textSecondary }}>{data.desc}</p>

            <div className="mb-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide mb-2" style={{ color: C.textMuted }}>Requirements</div>
              <ul className="space-y-1.5">
                {data.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.textSecondary }}>
                    <ChevronRight size={13} className="mt-0.5 shrink-0" style={{ color: C.amber }} /> {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide mb-2" style={{ color: C.textMuted }}>Rewards</div>
              <div className="flex flex-wrap gap-1.5">
                {data.rewards.map((r) => (
                  <span key={r} className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${C.success}1A`, color: C.success }}>{r}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl p-3 border" style={{ borderColor: C.border }}>
                <div className="text-[11px]" style={{ color: C.textMuted }}>XP</div>
                <div className="font-bold" style={{ color: C.amber }}>+{data.xp}</div>
              </div>
              <div className="rounded-xl p-3 border" style={{ borderColor: C.border }}>
                <div className="text-[11px]" style={{ color: C.textMuted }}>Unlock Date</div>
                <div className="font-bold text-sm" style={{ color: C.text }}>{data.unlocked ? data.unlockDate : "Not yet unlocked"}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <RippleButton icon={Share2} tone="primary">Share</RippleButton>
              <RippleButton icon={X} onClick={onClose}>Close</RippleButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
   SECTION 6 — ACHIEVEMENT COLLECTIONS
   ========================================================= */
function CollectionCard({ data }) {
  const pct = Math.round((data.unlocked / data.total) * 100);
  const Icon = data.icon;
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${C.cyan}1A` }}>
          <Icon size={18} style={{ color: C.cyan }} />
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: C.text }}>{data.label}</div>
          <div className="text-[11px]" style={{ color: C.textMuted }}>{data.unlocked}/{data.total} unlocked</div>
        </div>
      </div>
      <ProgressBar value={pct} color={pct === 100 ? C.success : C.amber} />
      <div className="flex items-center justify-between mt-3 text-xs">
        <span style={{ color: C.textMuted }}>{pct}% complete</span>
        <span className="font-semibold" style={{ color: C.amber }}>{data.xp.toLocaleString()} XP</span>
      </div>
    </Card>
  );
}

function AchievementCollections() {
  return (
    <section>
      <SectionHeader eyebrow="Section 06" title="Achievement Collections" subtitle="Grouped progress across every discipline you're building." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {COLLECTIONS.map((c) => <CollectionCard key={c.id} data={c} />)}
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 7 — CAREER JOURNEY
   ========================================================= */
function JourneyCard({ item, index }) {
  const [ref, inView] = useInView(0.4);
  const Icon = item.icon;
  const isFuture = item.date === "Future" || item.date === "In progress";
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center shrink-0">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center border-2"
          style={{ borderColor: isFuture ? C.border : C.amber, background: isFuture ? "transparent" : `${C.amber}1A` }}>
          <Icon size={18} style={{ color: isFuture ? C.textMuted : C.amber }} />
        </div>
        <div className="w-px flex-1 mt-1" style={{ background: C.border }} />
      </div>
      <div className="pb-8 flex-1">
        <div className="text-[11px] mb-1" style={{ color: C.textMuted }}>{item.date}</div>
        <div className="font-semibold mb-1" style={{ color: C.text }}>{item.title}</div>
        <p className="text-sm" style={{ color: C.textSecondary }}>{item.desc}</p>
      </div>
    </motion.div>
  );
}

function CareerJourney() {
  return (
    <section>
      <SectionHeader eyebrow="Section 07" title="Career Journey" subtitle="From first commit to future architect — the whole arc." />
      <Card hover={false} className="p-6 md:p-10">
        {CAREER_JOURNEY.map((item, i) => <JourneyCard key={item.id} item={item} index={i} />)}
      </Card>
    </section>
  );
}

/* =========================================================
   SECTION 8 — XP DISTRIBUTION
   ========================================================= */
function XPDistribution() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref}>
      <SectionHeader eyebrow="Section 08" title="XP Distribution" subtitle="Where your experience points are concentrated." />
      <Card hover={false} className="p-6 md:p-8">
        <div className="h-72">
          {inView && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={XP_DISTRIBUTION} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                <XAxis dataKey="category" stroke={C.textMuted} fontSize={12} tickLine={false} axisLine={{ stroke: C.border }} />
                <YAxis stroke={C.textMuted} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="xp" radius={[8, 8, 0, 0]} animationDuration={1200}>
                  {XP_DISTRIBUTION.map((_, i) => (
                    <Cell key={i} fill={i % 2 === 0 ? C.amber : C.cyan} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </section>
  );
}

function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border px-3 py-2 text-xs" style={{ background: "rgba(17,24,39,0.95)", borderColor: C.border, color: C.text }}>
      {label}: {payload[0].value.toLocaleString()} XP
    </div>
  );
}

/* =========================================================
   SECTION 9 — MILESTONE SHOWCASE
   ========================================================= */
function MilestoneCard({ data }) {
  const Icon = data.icon;
  return (
    <Card className="p-6">
      <div className="h-32 rounded-2xl mb-4 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, rgba(245,158,11,0.16), rgba(6,182,212,0.10))` }}>
        <Icon size={30} style={{ color: C.amber }} />
      </div>
      <div className="font-semibold mb-1" style={{ color: C.text }}>{data.title}</div>
      <div className="text-xs mb-3" style={{ color: C.textMuted }}>{data.date}</div>
      <div className="flex items-center gap-2 mb-3">
        <Gift size={13} style={{ color: C.success }} />
        <span className="text-xs" style={{ color: C.textSecondary }}>{data.reward}</span>
      </div>
      <span className="text-xs font-semibold" style={{ color: C.amber }}>+{data.xp} XP</span>
    </Card>
  );
}

function MilestoneShowcase() {
  return (
    <section>
      <SectionHeader eyebrow="Section 09" title="Milestone Showcase" subtitle="The highest-impact moments in your journey so far." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {MILESTONES.map((m) => <MilestoneCard key={m.id} data={m} />)}
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 10 — UPCOMING ACHIEVEMENTS
   ========================================================= */
function UpcomingCard({ data }) {
  const rarityColor = RARITY_COLOR[data.difficulty] || C.textSecondary;
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-sm" style={{ color: C.text }}>{data.title}</div>
        <DifficultyBadge level={data.difficulty} />
      </div>
      <div className="flex items-center justify-between text-xs mb-1" style={{ color: C.textMuted }}>
        <span>Progress</span><span>{data.progress}%</span>
      </div>
      <ProgressBar value={data.progress} color={rarityColor} height={5} />
      <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
        <div>
          <div style={{ color: C.textMuted }}>Reward</div>
          <div className="font-semibold" style={{ color: C.text }}>{data.reward}</div>
        </div>
        <div>
          <div style={{ color: C.textMuted }}>Est. Completion</div>
          <div className="font-semibold" style={{ color: C.text }}>{data.estimate}</div>
        </div>
      </div>
    </Card>
  );
}

function UpcomingAchievements() {
  return (
    <section>
      <SectionHeader eyebrow="Section 10" title="Upcoming Achievements" subtitle="Recommended next targets, based on your current trajectory." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {UPCOMING.map((u) => <UpcomingCard key={u.id} data={u} />)}
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 11 — ACHIEVEMENT STATISTICS
   ========================================================= */
function StatCounterCard({ s, inView }) {
  const value = useCountUp(s.value, 1500, inView);
  return (
    <Card className="p-6 text-center">
      <s.icon size={22} style={{ color: C.amber }} className="mx-auto mb-3" />
      <div className="text-2xl font-bold" style={{ color: C.text }}>{value}</div>
      <div className="text-xs mt-1" style={{ color: C.textMuted }}>{s.label}</div>
    </Card>
  );
}

function AchievementStatistics() {
  const [ref, inView] = useInView();
  const stats = [
    { label: "Total Achievements", value: PROFILE.totalAchievements, icon: Trophy },
    { label: "Achievements Unlocked", value: PROFILE.unlocked, icon: CheckCircle2 },
    { label: "Total XP Earned", value: PROFILE.totalXP, icon: Zap },
    { label: "Days Active Streak", value: PROFILE.streak, icon: Flame },
  ];
  return (
    <section ref={ref}>
      <SectionHeader eyebrow="Section 11" title="Achievement Statistics" subtitle="The numbers behind the badges." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => <StatCounterCard key={s.label} s={s} inView={inView} />)}
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 14 — FLOATING DOCK
   ========================================================= */
function FloatingDock({ notify }) {
  const actions = [
    { label: "Share", icon: Share2, action: () => notify("Achievements shared") },
    { label: "Export", icon: Download, action: () => notify("Achievements exported as PDF") },
    { label: "Compare", icon: GitCompare, action: () => notify("Opening comparison view") },
    { label: "Focus", icon: Focus, action: () => notify("Focus mode enabled") },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 p-1.5 rounded-2xl border"
      style={{ background: "rgba(17,24,39,0.9)", borderColor: C.border, backdropFilter: "blur(10px)", boxShadow: "0 12px 32px rgba(0,0,0,0.4)" }}
    >
      {actions.map((a) => (
        <motion.button
          key={a.label}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={a.action}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-[11px] font-medium focus:outline-none focus-visible:ring-2"
          style={{ color: C.textSecondary, "--tw-ring-color": C.amber }}
        >
          <a.icon size={16} style={{ color: C.amber }} />
          {a.label}
        </motion.button>
      ))}
    </motion.div>
  );
}

/* =========================================================
   ROOT COMPONENT
   ========================================================= */
export default function Achievements() {
  const [toast, setToast] = useState({ show: false, message: "" });
  const notify = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2400);
  }, []);

  return (
    <div className="min-h-screen w-full pb-28" style={{ color: C.text }}>
      <style>{`
        @keyframes ripple { from { width:8px; height:8px; opacity:.5 } to { width:220px; height:220px; opacity:0; transform:translate(-50%,-50%) } }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-16">
        <Hero />
        <DeveloperPassport />
        <AchievementOverview />
        <AchievementGallery />
        <AchievementCollections />
        <CareerJourney />
        <XPDistribution />
        <MilestoneShowcase />
        <UpcomingAchievements />
        <AchievementStatistics />
      </main>

      <FloatingDock notify={notify} />
      <Toast show={toast.show} message={toast.message} />
    </div>
  );
}