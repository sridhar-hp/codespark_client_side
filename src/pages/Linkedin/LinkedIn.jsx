import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    ResponsiveContainer, Tooltip,
} from "recharts";
import {
    User, Briefcase, GraduationCap, FolderKanban, Award, FileText, Globe, Github,
    Code2, MessageSquare, ChevronDown, ChevronUp, X, Download, Share2, Sparkles,
    Target, TrendingUp, TrendingDown, Users, Eye, Search, ArrowUpRight, ArrowDownRight,
    ExternalLink, Play, Pencil, CheckCircle2, Circle, Lock, Rocket, Layers, Star,
    Zap, Compass, ClipboardList, BarChart3, Plus, RefreshCw, ChevronRight, Building2,
    GitBranch, Mic, PenSquare, Network,
} from "lucide-react";

/* =========================================================
   DESIGN TOKENS
   ========================================================= */
const C = {
    bg: "#0B1120",
    surface: "#111827",
    surface2: "#0F172A",
    border: "#1F2937",

    amber: "#F59E0B",
    amberLight: "#FBBF24",

    cyan: "#06B6D4",

    success: "#10B981",
    warning: "#F97316",
    danger: "#EF4444",

    text: "#F9FAFB",
    textSecondary: "#9CA3AF",
    textMuted: "#6B7280",
};

/* =========================================================
   MOCK DATA
   ========================================================= */
const PROFILE = {
    name: "Aarav Mehta",
    headline: "Full-Stack Developer · Building at the edge of React & Systems Design",
    role: "Software Engineer Intern @ Nimbus Labs",
    quote: "Ship small, learn fast, compound daily.",
    readiness: 82,
    recruiterVisibility: 68,
    profileStrength: 76,
    goal: "Land a Software Engineer II role by Q1 2027",
};

const COMPLETENESS_ITEMS = [
    { id: "photo", label: "Profile Photo", icon: User, pct: 100, status: "Complete", accent: "amber" },
    { id: "headline", label: "Headline", icon: PenSquare, pct: 100, status: "Complete", accent: "amber" },
    { id: "about", label: "About", icon: FileText, pct: 90, status: "Almost There", accent: "amber" },
    { id: "projects", label: "Projects", icon: FolderKanban, pct: 80, status: "Good", accent: "cyan" },
    { id: "experience", label: "Experience", icon: Briefcase, pct: 70, status: "Good", accent: "cyan" },
    { id: "education", label: "Education", icon: GraduationCap, pct: 100, status: "Complete", accent: "success" },
    { id: "skills", label: "Skills", icon: Code2, pct: 85, status: "Good", accent: "cyan" },
    { id: "resume", label: "Resume", icon: FileText, pct: 60, status: "Needs Work", accent: "amber" },
    { id: "certificates", label: "Certificates", icon: Award, pct: 50, status: "Needs Work", accent: "warning" },
    { id: "portfolio", label: "Portfolio", icon: Globe, pct: 65, status: "Good", accent: "cyan" },
    { id: "github", label: "GitHub", icon: Github, pct: 95, status: "Complete", accent: "success" },
    { id: "leetcode", label: "LeetCode", icon: Code2, pct: 75, status: "Good", accent: "cyan" },
    { id: "communication", label: "Communication", icon: MessageSquare, pct: 55, status: "Needs Work", accent: "danger" },
];

const PROFILE_SECTIONS = [
    {
        id: "headline", title: "Headline", icon: PenSquare,
        preview: "Full-Stack Developer · Building at the edge of React & Systems Design",
        detail: "A headline is the first signal a recruiter reads. This one leads with stack specificity and a point of view rather than a generic title.",
    },
    {
        id: "about", title: "About", icon: FileText,
        preview: "Developer focused on performant, well-tested product engineering...",
        detail: "Third-year CS student with 3 shipped production apps, 340+ solved algorithmic problems, and a growing focus on distributed systems. Currently interning on the platform team at Nimbus Labs, working on internal developer tooling.",
    },
    {
        id: "experience", title: "Experience", icon: Briefcase,
        preview: "Software Engineer Intern @ Nimbus Labs — Jun 2026 – Present",
        detail: "Building internal CLI tooling used by 40+ engineers; reduced deploy configuration time by 35%. Previously: Frontend Contractor @ Studio Loop (contract, 2025).",
    },
    {
        id: "education", title: "Education", icon: GraduationCap,
        preview: "B.Tech Computer Science — Class of 2027",
        detail: "Coursework in Distributed Systems, Operating Systems, and Applied Machine Learning. Dean's List, 2025.",
    },
    {
        id: "projects", title: "Projects", icon: FolderKanban,
        preview: "4 featured projects · 3 in production",
        detail: "Includes CODESPARK itself, a real-time collaborative editor, a distributed job queue, and an open-source CLI with 200+ GitHub stars.",
    },
    {
        id: "skills", title: "Skills", icon: Code2,
        preview: "React, TypeScript, Node.js, PostgreSQL, AWS +12 more",
        detail: "Top endorsed: React (advanced), System Design (intermediate), SQL (advanced). Recently added: Rust (learning).",
    },
    {
        id: "resume", title: "Resume", icon: FileText,
        preview: "Last updated 12 days ago · ATS Score 78/100",
        detail: "Resume covers 2 internships and 4 projects. Missing quantified impact metrics in the second bullet of the most recent role.",
    },
    {
        id: "certificates", title: "Certificates", icon: Award,
        preview: "3 certificates · 2 in progress",
        detail: "AWS Cloud Practitioner (2025), Meta Frontend Developer (2025). In progress: Systems Design Specialization.",
    },
];

const FEATURED_PROJECTS = [
    {
        id: "p1", title: "CODESPARK", role: "Founder / Lead Engineer", duration: "8 mo",
        stack: ["React", "Tailwind", "Node.js", "Postgres"], completion: 78, xp: 4200,
        desc: "A developer productivity OS unifying tasks, learning, and career tracking into one workspace.",
    },
    {
        id: "p2", title: "Realtime Canvas", role: "Full-Stack Engineer", duration: "3 mo",
        stack: ["React", "WebSockets", "Redis"], completion: 100, xp: 2600,
        desc: "A collaborative whiteboard supporting 50+ concurrent users with CRDT-based conflict resolution.",
    },
    {
        id: "p3", title: "QueueForge", role: "Backend Engineer", duration: "2 mo",
        stack: ["Go", "RabbitMQ", "Docker"], completion: 100, xp: 1900,
        desc: "A distributed job queue with at-least-once delivery guarantees and horizontal worker scaling.",
    },
    {
        id: "p4", title: "flowcli", role: "Open Source Maintainer", duration: "6 mo",
        stack: ["Rust", "Clap"], completion: 60, xp: 1500,
        desc: "A CLI for scripting dev-environment setup, now with 200+ GitHub stars and 8 external contributors.",
    },
];

const PROFILE_MATRIX = [
    {
        skill: "Resume", value: 78,
        reason: "Your resume covers 2 internships and 4 projects with clear structure, but the most recent role is missing quantified impact metrics.",
        actions: ["Add measurable outcomes to your 2 most recent bullet points", "Run it through the ATS keyword checker", "Trim the summary to 2 lines"],
    },
    {
        skill: "Projects", value: 82,
        reason: "Four featured projects are live, three fully shipped to production, with strong tech-stack diversity across the frontend and backend.",
        actions: ["Add a live demo link to your remaining unlinked project", "Write a short case study for QueueForge", "Highlight metrics like users or load handled"],
    },
    {
        skill: "Experience", value: 70,
        reason: "One active internship and one prior contract role are logged, but descriptions are brief and lack scope or team context.",
        actions: ["Expand your Nimbus Labs entry with team size and scope", "Add a one-line outcome for each role", "List technologies used per role"],
    },
    {
        skill: "Education", value: 100,
        reason: "Your education section is fully complete with degree, coursework, and honors listed.",
        actions: ["Nothing required — consider adding relevant coursework as skills tags"],
    },
    {
        skill: "GitHub", value: 95,
        reason: "Strong GitHub signal: consistent commit history, 500+ lifetime commits, and an actively maintained open-source CLI.",
        actions: ["Pin your top 4 repositories", "Add a profile README", "Respond to open issues on flowcli"],
    },
    {
        skill: "Portfolio", value: 65,
        reason: "Your portfolio site exists and covers most projects, but two case studies are still using placeholder content.",
        actions: ["Finish the Realtime Canvas case study", "Add architecture diagrams to QueueForge", "Link portfolio directly from your resume header"],
    },
    {
        skill: "Communication", value: 58,
        reason: "This is your lowest-scoring signal — fewer async written updates and mock interview reps than other categories.",
        actions: ["Complete 3 more mock interviews", "Write a weekly build-in-public update", "Practice a 60-second project pitch"],
    },
    {
        skill: "Certificates", value: 50,
        reason: "Two certificates are complete, but the Systems Design specialization is still in progress at 40%.",
        actions: ["Finish the remaining 2 modules of Systems Design", "Add certificate badges to your profile header", "Set a target completion date"],
    },
];

const NETWORK_STATS = [
    { id: "connections", label: "Connections", value: 486, growth: 6.2, icon: Users },
    { id: "followers", label: "Followers", value: 312, growth: 4.1, icon: Star },
    { id: "following", label: "Following", value: 198, growth: 1.4, icon: Compass },
    { id: "recruiterViews", label: "Recruiter Views", value: 34, growth: 18.5, icon: Eye },
    { id: "searchAppearances", label: "Search Appearances", value: 121, growth: 9.7, icon: Search },
    { id: "profileViews", label: "Profile Views", value: 742, growth: -2.1, icon: TrendingUp },
];

const CAREER_ROADMAP = [
    { id: "student", label: "Student", status: "done" },
    { id: "intern", label: "Intern", status: "done" },
    { id: "junior", label: "Junior Developer", status: "current" },
    { id: "swe", label: "Software Engineer", status: "next" },
    { id: "senior", label: "Senior Developer", status: "locked" },
    { id: "lead", label: "Tech Lead", status: "locked" },
    { id: "architect", label: "Architect", status: "locked" },
];

const ROADMAP_DETAILS = {
    student: "Completed core CS coursework and built first production-grade project.",
    intern: "Completed a Software Engineering internship at Nimbus Labs, shipping internal tooling.",
    junior: "Currently operating at Junior Developer level — owning small features end-to-end with light guidance.",
    swe: "Target role. Requires: 2 more shipped features with measurable impact, resume ATS score above 85.",
    senior: "Requires 2+ years experience, system design ownership, and mentoring track record.",
    lead: "Requires cross-team technical leadership and roadmap ownership.",
    architect: "Requires org-wide technical strategy and platform-level architecture ownership.",
};

const ACTIVITY_TIMELINE = [
    { id: "a1", title: "Shipped CODESPARK v2 Analytics", type: "Recent Project", date: "2 days ago", icon: FolderKanban, detail: "Refactored the analytics module with a new pulse-grid visualization and modal system." },
    { id: "a2", title: "Earned AWS Cloud Practitioner", type: "Certificate", date: "1 week ago", icon: Award, detail: "Completed the AWS Cloud Practitioner exam with a score of 891/1000." },
    { id: "a3", title: "Updated portfolio case study", type: "Portfolio Update", date: "2 weeks ago", icon: Globe, detail: "Rewrote the QueueForge case study with architecture diagrams and load-test results." },
    { id: "a4", title: "Crossed 500 commits milestone", type: "GitHub Milestone", date: "3 weeks ago", icon: Github, detail: "Reached 500 lifetime commits across 20 public and private repositories." },
    { id: "a5", title: "Completed Systems Design module 3", type: "Learning Progress", date: "1 month ago", icon: GraduationCap, detail: "Finished the load-balancing and caching module with a 94% quiz score." },
    { id: "a6", title: "Completed mock interview #12", type: "Interview Practice", date: "1 month ago", icon: Mic, detail: "Behavioral + system design mock, scored 8.2/10 on structured feedback." },
];

const RECRUITER_INSIGHTS = [
    { id: "resume", title: "Resume Score", icon: FileText, value: 78, accent: C.amber, recommendation: "Add quantified impact metrics to your two most recent bullet points." },
    { id: "keyword", title: "Keyword Score", icon: Search, value: 71, accent: C.cyan, recommendation: "Include more target-role keywords like 'distributed systems' and 'CI/CD'." },
    { id: "strength", title: "Profile Strength", icon: Zap, value: 76, accent: C.success, recommendation: "Complete your certificates section to unlock full profile strength." },
    { id: "portfolio", title: "Portfolio Quality", icon: Globe, value: 82, accent: C.cyan, recommendation: "Add live demo links to two projects currently missing them." },
    { id: "interview", title: "Interview Readiness", icon: Mic, value: 65, accent: C.warning, recommendation: "Complete 5 more mock interviews to reach the 'ready' threshold." },
    { id: "communication", title: "Communication Score", icon: MessageSquare, value: 58, accent: C.danger, recommendation: "Increase async written updates — this is your lowest-scoring signal." },
    { id: "quality", title: "Project Quality", icon: FolderKanban, value: 88, accent: C.success, recommendation: "Excellent. Consider open-sourcing one more project for added credibility." },
];

const CAREER_GOALS = [
    { id: "g1", title: "Improve Resume", icon: FileText, xp: 300, progress: 60, status: "In Progress" },
    { id: "g2", title: "Publish Project", icon: Rocket, xp: 450, progress: 100, status: "Complete" },
    { id: "g3", title: "Add Certificate", icon: Award, xp: 250, progress: 30, status: "In Progress" },
    { id: "g4", title: "Complete Portfolio", icon: Globe, xp: 400, progress: 65, status: "In Progress" },
    { id: "g5", title: "Increase Network", icon: Users, xp: 200, progress: 45, status: "In Progress" },
    { id: "g6", title: "Practice Interview", icon: Mic, xp: 350, progress: 20, status: "Not Started" },
];

const CAREER_ANALYTICS = [
    { id: "applications", label: "Applications", value: 24, growth: 12.0 },
    { id: "interviews", label: "Interviews", value: 9, growth: 8.5 },
    { id: "offers", label: "Offers", value: 2, growth: 100 },
    { id: "acceptance", label: "Acceptance Rate", value: "22%", growth: 5.3 },
    { id: "portfolio", label: "Portfolio Growth", value: "+18%", growth: 18 },
    { id: "connection", label: "Connection Growth", value: "+6.2%", growth: 6.2 },
    { id: "skill", label: "Skill Growth", value: "+11.4%", growth: 11.4 },
    { id: "progress", label: "Professional Progress", value: "76%", growth: 4.0 },
];

/* =========================================================
   HOOKS
   ========================================================= */
function useCountUp(target, duration = 1400, start = true) {
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

function SpotlightCard({ children, className = "", style = {} }) {
    const ref = useRef(null);
    const [pos, setPos] = useState({ x: 50, y: 50 });
    const onMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
    };
    return (
        <div
            ref={ref}
            onMouseMove={onMouseMove}
            className={`relative overflow-hidden rounded-[28px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-[#F59E0B]/40 ${className}`}
            style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                borderColor: C.border,
                boxShadow: "0 0 0 0 rgba(0,0,0,0)",
                ...style,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 0 1px rgba(245,158,11,0.28), 0 18px 40px -20px rgba(6,182,212,0.25)`)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 0 rgba(0,0,0,0)")}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(240px circle at ${pos.x}% ${pos.y}%, rgba(245,158,11,0.10), transparent 60%), radial-gradient(420px circle at ${pos.x}% ${pos.y}%, rgba(6,182,212,0.06), transparent 70%)` }}
            />
            <div className="relative">{children}</div>
        </div>
    );
}

function Button({ icon: Icon, children, onClick, tone = "default", size = "md" }) {
    const [ripples, setRipples] = useState([]);
    const styles = {
        default: { border: C.border, color: C.text, bg: "rgba(255,255,255,0.02)" },
        primary: { border: "rgba(245,158,11,0.5)", color: "#0B1120", bg: `linear-gradient(135deg, ${C.amber}, ${C.warning})` },
        amber: { border: "rgba(245,158,11,0.4)", color: C.amber, bg: "rgba(245,158,11,0.06)" },
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
        <button
            onClick={handleClick}
            className={`relative overflow-hidden inline-flex items-center gap-2 rounded-2xl font-medium border transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${pad}`}
            style={{ borderColor: styles.border, color: styles.color, background: styles.bg, "--tw-ring-color": C.amber, "--tw-ring-offset-color": C.bg }}
        >
            {Icon && <Icon size={16} />}
            {children}
            {ripples.map((r) => (
                <span key={r.id} className="absolute rounded-full pointer-events-none"
                    style={{ left: r.x, top: r.y, width: 8, height: 8, background: "rgba(255,255,255,0.35)", transform: "translate(-50%,-50%)", animation: "ripple 600ms ease-out forwards" }} />
            ))}
        </button>
    );
}

function Modal({ open, onClose, title, children }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
            <div className="absolute inset-0" style={{ background: "rgba(3,7,18,0.75)", backdropFilter: "blur(8px)", animation: "fadeIn 200ms ease-out" }} onClick={onClose} />
            <div className="relative w-full max-w-lg rounded-[28px] border p-6 md:p-8"
                style={{
                    background: "linear-gradient(180deg, rgba(17,24,39,0.95), rgba(15,23,42,0.95))",
                    borderColor: C.border, boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    animation: "scaleIn 220ms cubic-bezier(0.16,1,0.3,1)",
                }}>
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold" style={{ color: C.text }}>{title}</h3>
                    <button onClick={onClose} aria-label="Close" className="p-2 rounded-full focus:outline-none focus-visible:ring-2"
                        style={{ color: C.textSecondary, "--tw-ring-color": C.amber }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                        <X size={20} />
                    </button>
                </div>
                <div style={{ color: C.textSecondary }}>{children}</div>
            </div>
        </div>
    );
}

function Toast({ message, show }) {
    if (!show) return null;
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-5 py-3 rounded-2xl border text-sm font-medium"
            style={{ background: "rgba(17,24,39,0.95)", borderColor: C.border, color: C.text, animation: "toastIn 250ms ease-out", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
            {message}
        </div>
    );
}

function ProgressBar({ value, color = C.amber, height = 6 }) {
    return (
        <div className="rounded-full overflow-hidden" style={{ background: C.border, height }}>
            <div className="h-full rounded-full" style={{ width: `${value}%`, background: color, transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)" }} />
        </div>
    );
}

/* =========================================================
   SECTION 1 — CAREER HERO
   ========================================================= */
function CareerHero({ notify, openModal }) {
    const readiness = useCountUp(PROFILE.readiness, 1600);
    const visibility = useCountUp(PROFILE.recruiterVisibility, 1600);
    const strength = useCountUp(PROFILE.profileStrength, 1600);
    const floatIcons = [Briefcase, Github, Code2, Award, Globe, GraduationCap];

    return (
        <section className="relative overflow-hidden rounded-[32px] border" style={{ borderColor: C.border }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(120% 100% at 85% 0%, rgba(245,158,11,0.16), transparent 55%), radial-gradient(90% 80% at 5% 20%, rgba(6,182,212,0.10), transparent 50%), ${C.surface}` }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,17,32,0) 0%, rgba(11,17,32,0.5) 100%)" }} />
            {floatIcons.map((Icon, i) => (
                <div key={i} className="absolute pointer-events-none opacity-20"
                    style={{ left: `${8 + i * 16}%`, top: `${10 + (i % 3) * 22}%`, animation: `floatIcon ${7 + i}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
                    <Icon size={22} style={{ color: i % 2 === 0 ? C.amber : C.cyan }} />
                </div>
            ))}

            <div className="relative p-6 md:p-12">
                <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-start mb-10">
                    <div className="relative shrink-0 mx-auto lg:mx-0">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-[28px] flex items-center justify-center text-3xl font-bold"
                            style={{ background: `linear-gradient(135deg, ${C.amber}, ${C.warning})`, color: "#0B1120", boxShadow: "0 12px 40px rgba(245,158,11,0.35)" }}>
                            AM
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center border-4"
                            style={{ background: C.success, borderColor: C.surface }}>
                            <CheckCircle2 size={14} color="#fff" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: C.amber }}>
                            <Sparkles size={14} /> Career Intelligence
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: C.text }}>{PROFILE.name}</h1>
                        <p className="text-sm md:text-base mb-1 max-w-xl" style={{ color: C.textSecondary }}>{PROFILE.headline}</p>
                        <p className="text-xs mb-4" style={{ color: C.textMuted }}>{PROFILE.role}</p>
                        <p className="text-sm italic mb-6" style={{ color: C.amber }}>"{PROFILE.quote}"</p>

                        <div className="flex flex-wrap gap-3">
                            <Button icon={Pencil} tone="primary" onClick={() => openModal("editProfile")}>Edit Profile</Button>
                            <Button icon={Download} onClick={() => notify("Resume downloaded")}>Download Resume</Button>
                            <Button icon={Share2} onClick={() => openModal("sharePortfolio")}>Share Portfolio</Button>
                            <Button icon={BarChart3} tone="amber" onClick={() => openModal("careerInsights")}>Career Insights</Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Career Readiness", value: readiness, suffix: "%", icon: Target, color: C.amber },
                        { label: "Recruiter Visibility", value: visibility, suffix: "%", icon: Eye, color: C.cyan },
                        { label: "Profile Strength", value: strength, suffix: "%", icon: Zap, color: C.success },
                        { label: "Current Goal", value: null, icon: Compass, color: C.amber, text: PROFILE.goal },
                    ].map((s) => (
                        <div key={s.label} className="rounded-2xl p-4 border" style={{ borderColor: C.border, background: "rgba(255,255,255,0.02)" }}>
                            <s.icon size={16} style={{ color: s.color }} className="mb-2" />
                            {s.value !== null ? (
                                <div className="text-xl font-bold" style={{ color: C.text }}>{s.value}{s.suffix}</div>
                            ) : (
                                <div className="text-xs font-semibold leading-snug" style={{ color: C.text }}>{s.text}</div>
                            )}
                            <div className="text-[11px] mt-0.5" style={{ color: C.textMuted }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* =========================================================
   SECTION 2 — PROFILE COMPLETENESS
   ========================================================= */
function CompletenessRow({ item, openModal }) {
    const [expanded, setExpanded] = useState(false);
    const Icon = item.icon;
    const statusColor = item.pct >= 90 ? C.success : item.pct >= 65 ? C.amber : C.danger;
    const accentMap = { amber: C.amber, cyan: C.cyan, success: C.success, warning: C.warning, danger: C.danger };
    const barColor = accentMap[item.accent] || C.amber;
    return (
        <div className="border-b last:border-b-0" style={{ borderColor: C.border }}>
            <div className="flex items-center gap-4 py-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${barColor}1A` }}>
                    <Icon size={17} style={{ color: barColor }} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium" style={{ color: C.text }}>{item.label}</span>
                        <span className="text-xs font-semibold shrink-0 ml-2" style={{ color: statusColor }}>{item.pct}%</span>
                    </div>
                    <ProgressBar value={item.pct} color={barColor} height={5} />
                </div>
                <span className="hidden sm:block text-xs px-2.5 py-1 rounded-full shrink-0" style={{ background: `${statusColor}1A`, color: statusColor }}>
                    {item.status}
                </span>
                <button onClick={() => setExpanded((e) => !e)} className="p-2 rounded-lg shrink-0 focus:outline-none focus-visible:ring-2"
                    style={{ color: C.textMuted, "--tw-ring-color": C.amber }} aria-label="Toggle details">
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            </div>
            <div className="grid overflow-hidden transition-all duration-300" style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}>
                <div className="min-h-0 overflow-hidden pb-4 flex items-center justify-between text-xs" style={{ color: C.textSecondary }}>
                    <span>Improving this section increases overall recruiter visibility.</span>
                    <button onClick={() => openModal("editProfile")} className="font-semibold flex items-center gap-1 focus:outline-none" style={{ color: C.amber }}>
                        Edit <Pencil size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function ProfileCompleteness({ openModal }) {
    const overall = Math.round(COMPLETENESS_ITEMS.reduce((s, i) => s + i.pct, 0) / COMPLETENESS_ITEMS.length);
    return (
        <section>
            <SectionHeader eyebrow="Section 02" title="Profile Completeness" subtitle="Thirteen signals recruiters and systems use to evaluate your profile."
                right={<div className="text-right"><div className="text-2xl font-bold" style={{ color: C.amber }}>{overall}%</div><div className="text-[11px]" style={{ color: C.textMuted }}>Overall</div></div>} />
            <SpotlightCard className="px-6 md:px-8">
                {COMPLETENESS_ITEMS.map((item) => <CompletenessRow key={item.id} item={item} openModal={openModal} />)}
            </SpotlightCard>
        </section>
    );
}

/* =========================================================
   SECTION 3 — PROFESSIONAL PROFILE
   ========================================================= */
function ProfileSectionCard({ data, openModal }) {
    const [expanded, setExpanded] = useState(false);
    const Icon = data.icon;
    return (
        <SpotlightCard className="p-6">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,158,11,0.1)" }}>
                    <Icon size={18} style={{ color: C.amber }} />
                </div>
                <div className="font-semibold" style={{ color: C.text }}>{data.title}</div>
            </div>
            <p className="text-sm mb-4" style={{ color: C.textSecondary }}>{data.preview}</p>

            <div className="grid overflow-hidden transition-all duration-300" style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}>
                <p className="min-h-0 overflow-hidden text-xs pb-4" style={{ color: C.textMuted }}>{data.detail}</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold">
                <button onClick={() => setExpanded((e) => !e)} className="flex items-center gap-1 focus:outline-none" style={{ color: C.amber }}>
                    {expanded ? "Collapse" : "View More"} {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
                <span style={{ color: C.border }}>·</span>
                <button onClick={() => openModal("preview", data)} className="focus:outline-none" style={{ color: C.textSecondary }}>Preview</button>
                <span style={{ color: C.border }}>·</span>
                <button onClick={() => openModal("editProfile")} className="focus:outline-none" style={{ color: C.textSecondary }}>Edit</button>
            </div>
        </SpotlightCard>
    );
}

function ProfessionalProfile({ openModal }) {
    return (
        <section>
            <SectionHeader eyebrow="Section 03" title="Professional Profile" subtitle="The building blocks recruiters read first." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {PROFILE_SECTIONS.map((s) => <ProfileSectionCard key={s.id} data={s} openModal={openModal} />)}
            </div>
        </section>
    );
}

/* =========================================================
   SECTION 4 — FEATURED PROJECTS
   ========================================================= */
function ProjectCard({ data, notify, openModal }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <SpotlightCard className="p-6 min-w-[300px] max-w-[340px] shrink-0">
            <div className="h-28 rounded-2xl mb-4 flex items-center justify-center" style={{ background: `linear-gradient(135deg, rgba(6,182,212,0.16), rgba(245,158,11,0.10))` }}>
                <Layers size={28} style={{ color: C.amber }} />
            </div>
            <div className="flex items-center justify-between mb-1">
                <div className="font-semibold" style={{ color: C.text }}>{data.title}</div>
                <span className="text-xs" style={{ color: C.amber }}>+{data.xp} XP</span>
            </div>
            <div className="text-xs mb-3" style={{ color: C.textMuted }}>{data.role} · {data.duration}</div>
            <p className="text-sm mb-3" style={{ color: C.textSecondary }}>{data.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
                {data.stack.map((s) => (
                    <span key={s} className="text-[11px] px-2 py-1 rounded-full border" style={{ borderColor: C.border, color: C.textSecondary }}>{s}</span>
                ))}
            </div>

            <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1" style={{ color: C.textMuted }}>
                    <span>Completion</span><span>{data.completion}%</span>
                </div>
                <ProgressBar value={data.completion} color={data.completion === 100 ? C.success : C.amber} />
            </div>

            <div className="grid overflow-hidden transition-all duration-300 mb-3" style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}>
                <div className="min-h-0 overflow-hidden text-xs space-y-1.5" style={{ color: C.textSecondary }}>
                    <div>Role: <span style={{ color: C.text }}>{data.role}</span></div>
                    <div>Duration: <span style={{ color: C.text }}>{data.duration}</span></div>
                    <div>XP Earned: <span style={{ color: C.text }}>{data.xp}</span></div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button onClick={() => notify(`Opening ${data.title} on GitHub`)} className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl border focus:outline-none focus-visible:ring-2"
                    style={{ borderColor: C.border, color: C.text, "--tw-ring-color": C.amber }}>
                    <Github size={13} /> GitHub
                </button>
                <button onClick={() => notify(`Opening ${data.title} live demo`)} className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl border focus:outline-none focus-visible:ring-2"
                    style={{ borderColor: C.border, color: C.text, "--tw-ring-color": C.amber }}>
                    <ExternalLink size={13} /> Live Demo
                </button>
                <button onClick={() => setExpanded((e) => !e)} className="ml-auto text-xs font-semibold flex items-center gap-1 focus:outline-none" style={{ color: C.amber }}>
                    {expanded ? "Collapse" : "View Details"} {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
            </div>
        </SpotlightCard>
    );
}

function FeaturedProjects({ notify, openModal }) {
    return (
        <section>
            <SectionHeader eyebrow="Section 04" title="Featured Projects" subtitle="A curated showcase, scrollable and recruiter-ready." />
            <div className="flex gap-5 overflow-x-auto pb-3 -mx-1 px-1">
                {FEATURED_PROJECTS.map((p) => <ProjectCard key={p.id} data={p} notify={notify} openModal={openModal} />)}
            </div>
        </section>
    );
}

/* =========================================================
   SECTION 5 — SKILL MATRIX
   ========================================================= */
function ProfileMatrixDot(props) {
    const { cx, cy, payload, activeSkill, onSelect } = props;
    if (cx == null || cy == null) return null;
    const isActive = payload.skill === activeSkill;
    return (
        <g
            style={{ cursor: "pointer" }}
            onClick={() => onSelect(payload.skill)}
            tabIndex={0}
            role="button"
            aria-label={`${payload.skill}: ${payload.value} out of 100`}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(payload.skill); } }}
        >
            {/* larger invisible hit area for easier clicking/tapping */}
            <circle cx={cx} cy={cy} r={14} fill="transparent" />
            <circle
                cx={cx} cy={cy} r={isActive ? 7 : 5}
                fill={isActive ? C.amber : C.cyan}
                stroke={C.bg} strokeWidth={2}
                style={{ transition: "r 200ms ease, fill 200ms ease" }}
            />
            {isActive && <circle cx={cx} cy={cy} r={12} fill="none" stroke={C.amber} strokeWidth={1.5} opacity={0.5} />}
        </g>
    );
}

function ProfileMatrix() {
    const [ref, inView] = useInView();
    const [activeSkill, setActiveSkill] = useState(null);

    const overall = Math.round(PROFILE_MATRIX.reduce((sum, d) => sum + d.value, 0) / PROFILE_MATRIX.length);
    const sorted = [...PROFILE_MATRIX].sort((a, b) => b.value - a.value);
    const strongest = sorted[0];
    const weakest = sorted[sorted.length - 1];
    const active = PROFILE_MATRIX.find((d) => d.skill === activeSkill);

    const handleSelect = useCallback((skill) => {
        setActiveSkill((cur) => (cur === skill ? null : skill));
    }, []);

    return (
        <section ref={ref}>
            <SectionHeader eyebrow="Section 05" title="Profile Matrix" subtitle="How complete and compelling your professional profile is, section by section." />
            <SpotlightCard className="p-6 md:p-8">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
                    <div>
                        <div className="h-96">
                            {inView && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={PROFILE_MATRIX} outerRadius="75%">
                                        <PolarGrid stroke={C.border} />
                                        <PolarAngleAxis dataKey="skill" stroke={C.textSecondary} fontSize={12} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={C.border} tick={false} axisLine={false} />
                                        <Radar
                                            dataKey="value" stroke={C.cyan} fill={C.cyan} fillOpacity={0.22} strokeWidth={2}
                                            animationDuration={1400} isAnimationActive
                                            dot={(dotProps) => <ProfileMatrixDot key={dotProps.payload.skill} {...dotProps} activeSkill={activeSkill} onSelect={handleSelect} />}
                                            activeDot={false}
                                        />
                                        <Tooltip content={<ProfileMatrixTooltip />} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                        <p className="text-center text-xs mt-1" style={{ color: C.textMuted }}>Click any point on the chart to see the score breakdown.</p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="rounded-2xl p-5 border" style={{ borderColor: C.border }}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: C.textMuted }}>Profile Strength</span>
                                <Zap size={16} style={{ color: C.amber }} />
                            </div>
                            <div className="text-3xl font-bold mb-2" style={{ color: C.text }}>{overall}%</div>
                            <ProgressBar value={overall} color={C.amber} />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-2xl p-4 border" style={{ borderColor: C.border }}>
                                <div className="flex items-center gap-1.5 text-xs font-semibold mb-1.5" style={{ color: C.success }}>
                                    <ArrowUpRight size={13} /> Strongest
                                </div>
                                <div className="text-sm font-semibold" style={{ color: C.text }}>{strongest.skill}</div>
                                <div className="text-xs" style={{ color: C.textMuted }}>{strongest.value}/100</div>
                            </div>
                            <div className="rounded-2xl p-4 border" style={{ borderColor: C.border }}>
                                <div className="flex items-center gap-1.5 text-xs font-semibold mb-1.5" style={{ color: C.danger }}>
                                    <ArrowDownRight size={13} /> Weakest
                                </div>
                                <div className="text-sm font-semibold" style={{ color: C.text }}>{weakest.skill}</div>
                                <div className="text-xs" style={{ color: C.textMuted }}>{weakest.value}/100</div>
                            </div>
                        </div>

                        <div className="grid overflow-hidden transition-all duration-300" style={{ gridTemplateRows: active ? "1fr" : "0fr" }}>
                            <div className="min-h-0 overflow-hidden">
                                {active && (
                                    <div className="rounded-2xl p-5 border" style={{ borderColor: C.cyan + "55", background: "rgba(14,165,233,0.06)", animation: "fadeIn 250ms ease-out" }}>
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <div className="text-sm font-semibold" style={{ color: C.text }}>{active.skill}</div>
                                                <div className="text-xs" style={{ color: C.cyan }}>{active.value}/100</div>
                                            </div>
                                            <button onClick={() => setActiveSkill(null)} aria-label="Close detail" className="p-1.5 rounded-lg focus:outline-none focus-visible:ring-2"
                                                style={{ color: C.textMuted, "--tw-ring-color": C.cyan }}>
                                                <X size={15} />
                                            </button>
                                        </div>
                                        <p className="text-xs mb-3" style={{ color: C.textSecondary }}>{active.reason}</p>
                                        <div className="text-[11px] font-semibold uppercase tracking-wide mb-2" style={{ color: C.textMuted }}>Ways to improve</div>
                                        <ul className="space-y-1.5">
                                            {active.actions.map((a, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: C.textSecondary }}>
                                                    <ChevronRight size={12} className="mt-0.5 shrink-0" style={{ color: C.amber }} /> {a}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {!active && (
                            <div className="rounded-2xl p-5 border border-dashed text-xs" style={{ borderColor: C.border, color: C.textMuted }}>
                                Select a category on the radar to see why it's scored the way it is and what to do next.
                            </div>
                        )}
                    </div>
                </div>
            </SpotlightCard>
        </section>
    );
}

function ProfileMatrixTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
        <div className="rounded-xl border px-3 py-2 text-xs" style={{ background: "rgba(17,24,39,0.95)", borderColor: C.border, color: C.text }}>
            {d.skill}: {d.value}/100
        </div>
    );
}

/* =========================================================
   SECTION 6 — NETWORK INSIGHTS
   ========================================================= */
function NetworkStat({ data, openModal, inView }) {
    const value = useCountUp(data.value, 1400, inView);
    const Icon = data.icon;
    const up = data.growth >= 0;
    return (
        <SpotlightCard className="p-5">
            <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(6,182,212,0.1)" }}>
                    <Icon size={16} style={{ color: C.cyan }} />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-semibold" style={{ color: up ? C.success : C.danger }}>
                    {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{Math.abs(data.growth)}%
                </span>
            </div>
            <div className="text-xl font-bold" style={{ color: C.text }}>{value}</div>
            <div className="text-[11px] mt-1 mb-3" style={{ color: C.textMuted }}>{data.label}</div>
            <button onClick={() => openModal("networkDetail", data)} className="text-xs font-semibold focus:outline-none" style={{ color: C.amber }}>View Details</button>
        </SpotlightCard>
    );
}

function NetworkInsights({ openModal }) {
    const [ref, inView] = useInView();
    return (
        <section ref={ref}>
            <SectionHeader eyebrow="Section 06" title="Network Insights" subtitle="How visible and connected your profile is right now." />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {NETWORK_STATS.map((s) => <NetworkStat key={s.id} data={s} openModal={openModal} inView={inView} />)}
            </div>
        </section>
    );
}

/* =========================================================
   SECTION 7 — CAREER ROADMAP
   ========================================================= */
function CareerRoadmap() {
    const [openId, setOpenId] = useState(null);
    const [ref, inView] = useInView();

    const styleFor = (status) => {
        if (status === "done") return { ring: C.success, fill: C.success, icon: CheckCircle2, opacity: 1 };
        if (status === "current") return { ring: C.amber, fill: C.amber, icon: Circle, opacity: 1 };
        if (status === "next") return { ring: C.cyan, fill: "transparent", icon: Circle, opacity: 1 };
        return { ring: C.border, fill: "transparent", icon: Lock, opacity: 0.5 };
    };

    return (
        <section ref={ref}>
            <SectionHeader eyebrow="Section 07" title="Career Roadmap" subtitle="The path from student to architect, mapped." />
            <SpotlightCard className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start gap-0 md:gap-2">
                    {CAREER_ROADMAP.map((m, i) => {
                        const s = styleFor(m.status);
                        const Icon = s.icon;
                        const isOpen = openId === m.id;
                        return (
                            <React.Fragment key={m.id}>
                                <div className="flex md:flex-col items-center md:items-center gap-3 md:gap-2 md:flex-1 md:text-center">
                                    <button
                                        onClick={() => setOpenId(isOpen ? null : m.id)}
                                        className="relative w-12 h-12 rounded-2xl flex items-center justify-center border-2 shrink-0 focus:outline-none focus-visible:ring-2"
                                        style={{
                                            borderColor: s.ring, background: m.status === "current" ? "rgba(245,158,11,0.12)" : C.surface,
                                            opacity: s.opacity, "--tw-ring-color": s.ring,
                                            animation: m.status === "current" && inView ? "pulseNode 2s ease-in-out infinite" : "none",
                                        }}
                                    >
                                        <Icon size={18} style={{ color: s.ring }} />
                                    </button>
                                    <div className="md:mt-1">
                                        <div className="text-sm font-semibold" style={{ color: m.status === "locked" ? C.textMuted : C.text }}>{m.label}</div>
                                        <div className="text-[11px] capitalize" style={{ color: s.ring }}>{m.status === "next" ? "up next" : m.status}</div>
                                    </div>
                                </div>
                                {i < CAREER_ROADMAP.length - 1 && (
                                    <div className="hidden md:block flex-1 h-0.5 mt-6 rounded-full" style={{ background: m.status === "done" ? C.success : C.border }} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                <div className="mt-8 grid gap-3">
                    {CAREER_ROADMAP.filter((m) => openId === m.id).map((m) => (
                        <div key={m.id} className="rounded-2xl p-4 border text-sm" style={{ borderColor: C.border, color: C.textSecondary, animation: "fadeIn 250ms ease-out" }}>
                            {ROADMAP_DETAILS[m.id]}
                        </div>
                    ))}
                </div>
            </SpotlightCard>
        </section>
    );
}

/* =========================================================
   SECTION 8 — PROFESSIONAL ACTIVITY
   ========================================================= */
function ActivityItem({ item, index, inView }) {
    const [expanded, setExpanded] = useState(false);
    const Icon = item.icon;
    return (
        <div
            className="flex gap-4 relative pb-8 last:pb-0"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(10px)", transition: `all 400ms ease-out ${index * 90}ms` }}
        >
            <div className="flex flex-col items-center shrink-0">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center border" style={{ borderColor: C.border, background: C.surface }}>
                    <Icon size={15} style={{ color: C.amber }} />
                </div>
                <div className="w-px flex-1 mt-1" style={{ background: C.border }} />
            </div>
            <div className="flex-1 min-w-0">
                <button onClick={() => setExpanded((e) => !e)} className="w-full text-left focus:outline-none">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold" style={{ color: C.text }}>{item.title}</span>
                        {expanded ? <ChevronUp size={14} style={{ color: C.amber }} /> : <ChevronDown size={14} style={{ color: C.textMuted }} />}
                    </div>
                    <div className="text-xs mt-1" style={{ color: C.textMuted }}>{item.type} · {item.date}</div>
                </button>
                <div className="grid overflow-hidden transition-all duration-300" style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}>
                    <p className="min-h-0 overflow-hidden text-sm pt-2" style={{ color: C.textSecondary }}>{item.detail}</p>
                </div>
            </div>
        </div>
    );
}

function ProfessionalActivity() {
    const [ref, inView] = useInView();
    return (
        <section ref={ref}>
            <SectionHeader eyebrow="Section 08" title="Professional Activity" subtitle="A running record of everything moving your career forward." />
            <SpotlightCard className="p-6 md:p-8">
                {ACTIVITY_TIMELINE.map((item, i) => <ActivityItem key={item.id} item={item} index={i} inView={inView} />)}
            </SpotlightCard>
        </section>
    );
}

/* =========================================================
   SECTION 9 — RECRUITER INSIGHTS
   ========================================================= */
function RecruiterCard({ data }) {
    const [expanded, setExpanded] = useState(false);
    const Icon = data.icon;
    return (
        <SpotlightCard className="p-5">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${data.accent}1A` }}>
                    <Icon size={18} style={{ color: data.accent }} />
                </div>
                <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: C.text }}>{data.title}</div>
                    <div className="text-xs" style={{ color: C.textMuted }}>{data.value}/100</div>
                </div>
            </div>
            <ProgressBar value={data.value} color={data.accent} />
            <button onClick={() => setExpanded((e) => !e)} className="mt-3 text-xs font-semibold flex items-center gap-1 focus:outline-none" style={{ color: data.accent }}>
                {expanded ? "Collapse" : "View Details"} {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            <div className="grid overflow-hidden transition-all duration-300" style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}>
                <p className="min-h-0 overflow-hidden text-xs pt-3" style={{ color: C.textSecondary }}>{data.recommendation}</p>
            </div>
        </SpotlightCard>
    );
}

function RecruiterInsights() {
    return (
        <section>
            <SectionHeader eyebrow="Section 09" title="Recruiter Insights" subtitle="How your profile reads to the people making hiring decisions." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {RECRUITER_INSIGHTS.map((r) => <RecruiterCard key={r.id} data={r} />)}
            </div>
        </section>
    );
}

/* =========================================================
   SECTION 10 — CAREER GOALS
   ========================================================= */
function GoalCard({ data, notify }) {
    const [progress, setProgress] = useState(data.progress);
    const isComplete = progress >= 100;
    const Icon = data.icon;

    const advance = () => {
        if (isComplete) return;
        setProgress((p) => Math.min(100, p + 20));
        notify(`${data.title} progress updated`);
    };

    return (
        <SpotlightCard className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(245,158,11,0.1)" }}>
                    <Icon size={20} style={{ color: C.amber }} />
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: isComplete ? `${C.success}1A` : `${C.amber}1A`, color: isComplete ? C.success : C.amber }}>
                    {isComplete ? "Complete" : data.status}
                </span>
            </div>
            <div className="font-semibold mb-1" style={{ color: C.text }}>{data.title}</div>
            <div className="text-xs mb-3" style={{ color: C.textMuted }}>+{data.xp} XP on completion</div>
            <div className="flex items-center justify-between text-xs mb-1" style={{ color: C.textMuted }}>
                <span>Progress</span><span>{progress}%</span>
            </div>
            <ProgressBar value={progress} color={isComplete ? C.success : C.amber} />
            <button
                onClick={advance}
                disabled={isComplete}
                className="w-full mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 disabled:opacity-50"
                style={{ borderColor: C.border, color: isComplete ? C.success : C.amber, "--tw-ring-color": C.amber }}
            >
                {isComplete ? <><CheckCircle2 size={14} /> Completed</> : <><Play size={14} /> {progress > 0 ? "Continue" : "Start"}</>}
            </button>
        </SpotlightCard>
    );
}

function CareerGoals({ notify }) {
    return (
        <section>
            <SectionHeader eyebrow="Section 10" title="Career Goals" subtitle="Small, trackable moves that compound into a stronger profile." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {CAREER_GOALS.map((g) => <GoalCard key={g.id} data={g} notify={notify} />)}
            </div>
        </section>
    );
}

/* =========================================================
   SECTION 11 — CAREER ANALYTICS
   ========================================================= */
function AnalyticsStat({ data, inView }) {
    const numeric = typeof data.value === "number" ? data.value : null;
    const counted = useCountUp(numeric ?? 0, 1200, inView && numeric !== null);
    const display = numeric !== null ? counted : data.value;
    return (
        <div className="rounded-2xl p-4 border" style={{ borderColor: C.border }}>
            <div className="text-2xl font-bold" style={{ color: C.text }}>{display}</div>
            <div className="text-[11px] mt-1 mb-2" style={{ color: C.textMuted }}>{data.label}</div>
            <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: C.success }}>
                <ArrowUpRight size={12} /> {data.growth}%
            </div>
        </div>
    );
}

function CareerAnalytics() {
    const [ref, inView] = useInView();
    return (
        <section ref={ref}>
            <SectionHeader eyebrow="Section 11" title="Career Analytics" subtitle="The application funnel and growth signals behind your search." />
            <SpotlightCard className="p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {CAREER_ANALYTICS.map((a) => <AnalyticsStat key={a.id} data={a} inView={inView} />)}
                </div>
            </SpotlightCard>
        </section>
    );
}

/* =========================================================
   SECTION 12 — QUICK ACTIONS
   ========================================================= */
function QuickActions({ notify, openModal }) {
    const [open, setOpen] = useState(false);
    const actions = [
        { label: "Update Resume", icon: FileText, action: () => openModal("editProfile") },
        { label: "Edit Skills", icon: Code2, action: () => openModal("editProfile") },
        { label: "Add Project", icon: Plus, action: () => notify("New project draft created") },
        { label: "Share Portfolio", icon: Share2, action: () => openModal("sharePortfolio") },
        { label: "Generate Resume", icon: RefreshCw, action: () => notify("Resume generated from latest profile data") },
        { label: "Create Portfolio", icon: Globe, action: () => notify("Portfolio site scaffold created") },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
            <div className="flex flex-col items-end gap-2 transition-all duration-300"
                style={{ opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(12px)", pointerEvents: open ? "auto" : "none" }}>
                {actions.map((a) => (
                    <button key={a.label} onClick={a.action}
                        className="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-2xl border text-sm font-medium shadow-lg hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2"
                        style={{ background: "rgba(17,24,39,0.95)", borderColor: C.border, color: C.text, "--tw-ring-color": C.amber }}>
                        {a.label} <a.icon size={16} style={{ color: C.amber }} />
                    </button>
                ))}
            </div>
            <button onClick={() => setOpen((o) => !o)} aria-label="Quick career actions"
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2"
                style={{ background: `linear-gradient(135deg, ${C.amber}, ${C.warning})`, "--tw-ring-color": C.amber }}>
                <div style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 250ms ease" }}>
                    <Sparkles size={22} color="#0B1120" />
                </div>
            </button>
        </div>
    );
}

/* =========================================================
   MODAL CONTENT ROUTER
   ========================================================= */
function ModalContent({ id, payload }) {
    switch (id) {
        case "editProfile":
            return (
                <div className="space-y-3 text-sm">
                    <p>This is a mock editing surface — in the connected phase, changes here sync back to your live profile.</p>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl p-3 border" style={{ borderColor: C.border }}>
                            <div className="text-xs" style={{ color: C.textMuted }}>Headline</div>
                            <div className="font-semibold text-xs mt-1" style={{ color: C.text }}>{PROFILE.headline}</div>
                        </div>
                        <div className="rounded-xl p-3 border" style={{ borderColor: C.border }}>
                            <div className="text-xs" style={{ color: C.textMuted }}>Current Role</div>
                            <div className="font-semibold text-xs mt-1" style={{ color: C.text }}>{PROFILE.role}</div>
                        </div>
                    </div>
                </div>
            );
        case "sharePortfolio":
            return <p className="text-sm">A shareable, read-only portfolio link has been generated. Anyone with the link can view your projects, skills, and resume summary.</p>;
        case "careerInsights":
            return (
                <div className="space-y-2 text-sm">
                    <p>Your career readiness score blends profile completeness, project quality, and interview practice.</p>
                    <p>Biggest lever right now: <span style={{ color: C.text }} className="font-semibold">completing your certificates section</span>.</p>
                </div>
            );
        case "preview":
            return (
                <div className="space-y-2 text-sm">
                    <p className="font-semibold" style={{ color: C.text }}>{payload?.title}</p>
                    <p>{payload?.detail}</p>
                </div>
            );
        case "networkDetail":
            return (
                <div className="space-y-2 text-sm">
                    <p className="font-semibold" style={{ color: C.text }}>{payload?.label}</p>
                    <p>Current value: <span style={{ color: C.text }}>{payload?.value}</span>, {payload?.growth >= 0 ? "up" : "down"} {Math.abs(payload?.growth ?? 0)}% over the last 30 days.</p>
                </div>
            );
        default:
            return null;
    }
}

const MODAL_TITLES = {
    editProfile: "Edit Profile",
    sharePortfolio: "Share Portfolio",
    careerInsights: "Career Insights",
    preview: "Preview",
    networkDetail: "Network Detail",
};

/* =========================================================
   ROOT COMPONENT
   ========================================================= */
export default function CareerHubPage() {
    const [modal, setModal] = useState(null);
    const [modalPayload, setModalPayload] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "" });

    const openModal = useCallback((id, payload = null) => { setModal(id); setModalPayload(payload); }, []);
    const closeModal = useCallback(() => { setModal(null); setModalPayload(null); }, []);
    const notify = useCallback((message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: "" }), 2400);
    }, []);

    return (
        <div className="min-h-screen w-full" style={{ background: C.bg, color: C.text }}>
            <style>{`
        @keyframes floatIcon { 0%,100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-12px) rotate(4deg) } }
        @keyframes ripple { from { width:8px; height:8px; opacity:.5 } to { width:220px; height:220px; opacity:0; transform:translate(-50%,-50%) } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes scaleIn { from { opacity:0; transform:scale(.94) translateY(8px) } to { opacity:1; transform:scale(1) translateY(0) } }
        @keyframes toastIn { from { opacity:0; transform:translate(-50%,12px) } to { opacity:1; transform:translate(-50%,0) } }
        @keyframes pulseNode { 0%,100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.45) } 50% { box-shadow: 0 0 0 8px rgba(245,158,11,0) } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-16">
                <CareerHero notify={notify} openModal={openModal} />
                <ProfileCompleteness openModal={openModal} />
                <ProfessionalProfile openModal={openModal} />
                <FeaturedProjects notify={notify} openModal={openModal} />
                <ProfileMatrix />
                <NetworkInsights openModal={openModal} />
                <CareerRoadmap />
                <ProfessionalActivity />
                <RecruiterInsights />
                <CareerGoals notify={notify} />
                <CareerAnalytics />
            </main>

            <QuickActions notify={notify} openModal={openModal} />

            <Modal open={!!modal} onClose={closeModal} title={MODAL_TITLES[modal] || ""}>
                <ModalContent id={modal} payload={modalPayload} />
            </Modal>

            <Toast show={toast.show} message={toast.message} />
        </div>
    );
}