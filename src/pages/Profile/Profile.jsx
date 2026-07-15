import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Github,
  MapPin,
  Calendar,
  Flame,
  Trophy,
  Zap,
  Star,
  Code2,
  Database,
  Cpu,
  MessageSquare,
  Server,
  Palette,
  Brain,
  GitBranch,
  GitCommit,
  Layers,
  Target,
  Rocket,
  Share2,
  Download,
  Link2,
  Globe2,
  CheckCircle2,
  Award,
  ExternalLink,
  ChevronRight,
  Clock,
  GraduationCap,
  Briefcase,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Constants & Design Tokens                                          */
/* ------------------------------------------------------------------ */

const COLORS = {
  bg: "#0B1120",
  card: "#111827",
  surface: "#0F172A",
  border: "#1F2937",
  textPrimary: "#F9FAFB",
  textSecondary: "#9CA3AF",
  amber: "#F59E0B",
  orange: "#F97316",
  cyan: "#06B6D4",
  green: "#22C55E",
  red: "#EF4444",
};

/* ------------------------------------------------------------------ */
/* Reusable primitives                                                */
/* ------------------------------------------------------------------ */

function Card({ children, className = "", glow = false, ...props }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`relative rounded-2xl border overflow-hidden ${className}`}
      style={{
        backgroundColor: COLORS.card,
        borderColor: COLORS.border,
        boxShadow: glow
          ? "0 0 0 1px rgba(245,158,11,0.08), 0 20px 40px -20px rgba(0,0,0,0.6)"
          : "0 10px 30px -20px rgba(0,0,0,0.6)",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, icon: Icon }) {
  return (
    <div className="flex items-end justify-between mb-6 px-1">
      <div>
        {eyebrow && (
          <p
            className="text-xs font-medium tracking-[0.2em] uppercase mb-2"
            style={{ color: COLORS.amber }}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2.5"
          style={{ color: COLORS.textPrimary }}
        >
          {Icon && <Icon size={22} style={{ color: COLORS.amber }} aria-hidden="true" />}
          {title}
        </h2>
      </div>
    </div>
  );
}

/** Animated numeric counter, respects reduced-motion */
function Counter({ value, duration = 1.4, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    let raf;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Animated horizontal progress bar */
function ProgressBar({ value, color = COLORS.amber, height = 8, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className="w-full rounded-full overflow-hidden"
      style={{ backgroundColor: COLORS.surface, height }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: inView ? `${value}%` : 0 }}
        transition={{
          duration: reduceMotion ? 0 : 1.1,
          delay: reduceMotion ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${color}, ${COLORS.orange})`,
        }}
      />
    </div>
  );
}

/** Circular progress ring for Developer Identity Score */
function ScoreRing({ score = 94, size = 200, stroke = 14 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={COLORS.surface}
          strokeWidth={stroke}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.amber} />
            <stop offset="100%" stopColor={COLORS.orange} />
          </linearGradient>
        </defs>
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: inView ? offset : circumference }}
          transition={{ duration: reduceMotion ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-4xl font-bold tabular-nums"
          style={{ color: COLORS.textPrimary }}
        >
          <Counter value={score} suffix="%" duration={1.6} />
        </span>
        <span
          className="text-xs font-medium tracking-wide mt-1"
          style={{ color: COLORS.amber }}
        >
          Excellent
        </span>
      </div>
    </div>
  );
}

function Pill({ children, tone = "amber" }) {
  const toneColor = tone === "green" ? COLORS.green : tone === "cyan" ? COLORS.cyan : COLORS.amber;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: `${toneColor}1A`,
        color: toneColor,
        border: `1px solid ${toneColor}33`,
      }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const snapshot = [
  { icon: MapPin, label: "Location", value: "Bengaluru, India" },
  { icon: GraduationCap, label: "Education", value: "B.Tech, Computer Science" },
  { icon: Briefcase, label: "Current Status", value: "Actively Learning" },
  { icon: Code2, label: "Primary Stack", value: "React · Node.js" },
  { icon: Rocket, label: "Current Project", value: "CodeSpark AI Core" },
  { icon: CheckCircle2, label: "Open To Internship", value: "Yes" },
  { icon: Clock, label: "Years Learning", value: "3 Years" },
  { icon: Sparkles, label: "Favorite Technology", value: "TypeScript" },
];

const skills = [
  { name: "Frontend", level: "Advanced", progress: 88, years: 3, icon: Code2 },
  { name: "Backend", level: "Intermediate", progress: 68, years: 2, icon: Server },
  { name: "Database", level: "Intermediate", progress: 62, years: 2, icon: Database },
  { name: "Problem Solving", level: "Advanced", progress: 82, years: 3, icon: Cpu },
  { name: "AI", level: "Growing", progress: 54, years: 1, icon: Brain },
  { name: "Communication", level: "Advanced", progress: 79, years: 3, icon: MessageSquare },
  { name: "DevOps", level: "Beginner", progress: 38, years: 1, icon: GitBranch },
  { name: "UI Design", level: "Intermediate", progress: 71, years: 2, icon: Palette },
];

const journey = [
  { icon: Code2, label: "Current Technology", value: "React + Tailwind" },
  { icon: Rocket, label: "Current Project", value: "CodeSpark AI Core" },
  { icon: Target, label: "Learning Goal", value: "Master Next.js" },
  { icon: Flame, label: "Weekly Goal", value: "5 Focused Sessions" },
  { icon: Star, label: "Current Mission", value: "Ship AI Productivity Tools" },
  { icon: Briefcase, label: "Internship Status", value: "Open & Available" },
];

const timeline = [
  { title: "Started Programming", date: "2021", desc: "Wrote the first line of code and got hooked." },
  { title: "Learned HTML", date: "2021", desc: "Built the first static web pages." },
  { title: "Learned CSS", date: "2021", desc: "Discovered layout, design and responsiveness." },
  { title: "Learned JavaScript", date: "2022", desc: "Moved from static pages to real logic." },
  { title: "Learned React", date: "2022", desc: "Started building component-driven interfaces." },
  { title: "Built LMS", date: "2023", desc: "Shipped a full learning management platform." },
  { title: "Built Staff Management System", date: "2023", desc: "Delivered an internal ops tool for a small team." },
  { title: "Started CodeSpark", date: "2024", desc: "Began building an AI developer productivity OS." },
  { title: "Internship", date: "2025", desc: "Applying skills in a real engineering team.", upcoming: true },
  { title: "Senior AI Engineer", date: "Future", desc: "The long-term destination of this journey.", upcoming: true },
];

const githubStats = [
  { icon: GitBranch, label: "Current Repository", value: "codespark-core" },
  { icon: Layers, label: "Total Projects", value: "24" },
  { icon: Flame, label: "Longest Streak", value: "63 days" },
  { icon: Zap, label: "Current Streak", value: "18 days" },
  { icon: Code2, label: "Primary Languages", value: "JS · Python" },
  { icon: GitCommit, label: "Total Commits", value: "1,842" },
  { icon: Trophy, label: "Contribution Score", value: "912" },
  { icon: CheckCircle2, label: "GitHub Connected", value: "Yes" },
];

const goals = [
  { title: "Finish Backend Track", progress: 72, eta: "Aug 2026", priority: "High", status: "In Progress" },
  { title: "Learn Next.js", progress: 45, eta: "Sep 2026", priority: "High", status: "In Progress" },
  { title: "Solve 200 LeetCode Problems", progress: 58, eta: "Oct 2026", priority: "Medium", status: "In Progress" },
  { title: "Complete AI Course", progress: 90, eta: "Jul 2026", priority: "High", status: "Almost Done" },
  { title: "Build Portfolio", progress: 30, eta: "Nov 2026", priority: "Medium", status: "Started" },
];

const certificates = [
  { org: "Microsoft", title: "Azure Fundamentals", date: "Jan 2025", color: COLORS.cyan },
  { org: "Coursera", title: "Machine Learning Specialization", date: "Mar 2025", color: COLORS.amber },
  { org: "GitHub", title: "GitHub Actions Certified", date: "May 2025", color: COLORS.textPrimary },
  { org: "Google", title: "UX Design Certificate", date: "Aug 2025", color: COLORS.orange },
  { org: "Udemy", title: "Advanced React Patterns", date: "Nov 2025", color: COLORS.cyan },
];

const quickActions = [
  { icon: Share2, label: "Share Profile" },
  { icon: Download, label: "Download Resume" },
  { icon: Layers, label: "Export Portfolio" },
  { icon: Link2, label: "Copy Portfolio Link" },
  { icon: Globe2, label: "Generate Public Profile" },
];

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function IdentityCard() {
  return (
    <Card glow className="p-6 md:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 15% 10%, rgba(245,158,11,0.10), transparent 45%), radial-gradient(circle at 85% 90%, rgba(6,182,212,0.08), transparent 45%)",
        }}
        aria-hidden="true"
      />
      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
        <motion.div
          whileHover={{ rotate: 3, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 250, damping: 15 }}
          className="relative shrink-0"
        >
          <div
            className="w-28 h-28 md:w-32 md:h-32 rounded-2xl flex items-center justify-center text-4xl font-bold"
            style={{
              background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.orange})`,
              color: "#0B1120",
            }}
          >
            AK
          </div>
          <div
            className="absolute -bottom-2 -right-2 rounded-full px-2.5 py-1 text-[11px] font-semibold flex items-center gap-1"
            style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.amber }}
          >
            <Trophy size={12} aria-hidden="true" /> Lvl 12
          </div>
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1.5">
            <h1
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ color: COLORS.textPrimary }}
            >
              Aarav Kapoor
            </h1>
            <Pill tone="amber">
              <Star size={12} aria-hidden="true" /> Rank #142
            </Pill>
          </div>
          <p className="text-base mb-5" style={{ color: COLORS.textSecondary }}>
            Aspiring Full-Stack &amp; AI Engineer
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <Stat icon={Zap} label="XP" value={12480} suffix=" XP" color={COLORS.amber} />
            <Stat icon={Flame} label="Current Streak" value={18} suffix=" days" color={COLORS.orange} />
            <Stat icon={Trophy} label="Current Rank" value={142} prefix="#" color={COLORS.cyan} />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: COLORS.textSecondary }}>
                Location
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: COLORS.textPrimary }}>
                <MapPin size={14} style={{ color: COLORS.amber }} aria-hidden="true" /> Bengaluru, India
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: COLORS.textSecondary }}>
                Joined Since
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: COLORS.textPrimary }}>
                <Calendar size={14} style={{ color: COLORS.amber }} aria-hidden="true" /> March 2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Stat({ icon: Icon, label, value, suffix = "", prefix = "", color }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium" style={{ color: COLORS.textSecondary }}>
        {label}
      </span>
      <span className="flex items-center gap-1.5 text-lg font-bold tabular-nums" style={{ color }}>
        <Icon size={16} aria-hidden="true" />
        {prefix}
        <Counter value={value} />
        {suffix}
      </span>
    </div>
  );
}

function Snapshot() {
  return (
    <section aria-labelledby="snapshot-heading">
      <SectionHeading eyebrow="Overview" title="Developer Snapshot" icon={Layers} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {snapshot.map((item, i) => (
          <Card key={item.label} className="p-4">
            <item.icon size={18} style={{ color: COLORS.amber }} className="mb-3" aria-hidden="true" />
            <p className="text-xs mb-1" style={{ color: COLORS.textSecondary }}>
              {item.label}
            </p>
            <p className="text-sm font-semibold" style={{ color: COLORS.textPrimary }}>
              {item.value}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Mission() {
  return (
    <Card className="p-8 md:p-12 text-center" glow>
      <p
        className="text-xs font-medium tracking-[0.2em] uppercase mb-4"
        style={{ color: COLORS.amber }}
      >
        Mission
      </p>
      <p
        className="text-2xl md:text-3xl font-semibold leading-snug max-w-3xl mx-auto"
        style={{ color: COLORS.textPrimary }}
      >
        My mission is to build AI-powered software that helps developers become
        more <span style={{ color: COLORS.amber }}>productive</span>,{" "}
        <span style={{ color: COLORS.orange }}>consistent</span> and{" "}
        <span style={{ color: COLORS.cyan }}>confident</span>.
      </p>
    </Card>
  );
}

function IdentityScore() {
  const factors = [
    { label: "GitHub Connected", done: true },
    { label: "LinkedIn Connected", done: true },
    { label: "Skills Added", done: true },
    { label: "Goals Added", done: true },
    { label: "Certificates Uploaded", done: true },
    { label: "Developer Journey", done: false },
  ];
  return (
    <section aria-labelledby="score-heading">
      <SectionHeading eyebrow="Signature" title="Developer Identity Score" icon={Star} />
      <Card glow className="p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <ScoreRing score={94} />
          <div className="flex-1 w-full">
            <h3 className="text-lg font-semibold mb-1" style={{ color: COLORS.textPrimary }}>
              Your identity is nearly complete
            </h3>
            <p className="text-sm mb-6" style={{ color: COLORS.textSecondary }}>
              A strong Developer Identity Score improves your visibility to teams
              scouting through CodeSpark.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {factors.map((f) => (
                <div key={f.label} className="flex items-center gap-2.5">
                  <CheckCircle2
                    size={16}
                    style={{ color: f.done ? COLORS.green : COLORS.border }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-sm"
                    style={{ color: f.done ? COLORS.textPrimary : COLORS.textSecondary }}
                  >
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

function SkillMatrix() {
  return (
    <section aria-labelledby="skills-heading">
      <SectionHeading eyebrow="Capability" title="Skill Matrix" icon={Cpu} />
      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((skill, i) => (
          <Card key={skill.name} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <skill.icon size={17} style={{ color: COLORS.amber }} aria-hidden="true" />
                <span className="text-sm font-semibold" style={{ color: COLORS.textPrimary }}>
                  {skill.name}
                </span>
              </div>
              <span className="text-xs font-medium" style={{ color: COLORS.textSecondary }}>
                {skill.level} · {skill.years}y
              </span>
            </div>
            <ProgressBar value={skill.progress} delay={i * 0.05} />
            <p className="text-right text-xs mt-1.5 tabular-nums" style={{ color: COLORS.amber }}>
              {skill.progress}%
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function CurrentJourney() {
  return (
    <section aria-labelledby="journey-heading">
      <SectionHeading eyebrow="Right Now" title="Current Journey" icon={Rocket} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {journey.map((item) => (
          <Card key={item.label} className="p-5 flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: COLORS.surface }}
            >
              <item.icon size={16} style={{ color: COLORS.amber }} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: COLORS.textSecondary }}>
                {item.label}
              </p>
              <p className="text-sm font-semibold" style={{ color: COLORS.textPrimary }}>
                {item.value}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView || reduceMotion ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.06 }}
      className="relative pl-10 pb-8 last:pb-0"
    >
      <span
        className="absolute left-0 top-1 w-4 h-4 rounded-full border-2"
        style={{
          backgroundColor: item.upcoming ? COLORS.surface : COLORS.amber,
          borderColor: item.upcoming ? COLORS.amber : COLORS.orange,
        }}
        aria-hidden="true"
      />
      <div className="flex items-baseline gap-2 flex-wrap">
        <h3 className="text-sm font-semibold" style={{ color: COLORS.textPrimary }}>
          {item.title}
        </h3>
        <span className="text-xs" style={{ color: COLORS.amber }}>
          {item.date}
        </span>
      </div>
      <p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>
        {item.desc}
      </p>
    </motion.li>
  );
}

function Timeline() {
  return (
    <section aria-labelledby="timeline-heading">
      <SectionHeading eyebrow="History" title="Developer Timeline" icon={Clock} />
      <Card className="p-6 md:p-8">
        <ol
          className="relative border-l ml-1"
          style={{ borderColor: COLORS.border }}
        >
          {timeline.map((item, i) => (
            <TimelineItem key={item.title} item={item} index={i} />
          ))}
        </ol>
      </Card>
    </section>
  );
}

function GithubCoding() {
  return (
    <section aria-labelledby="github-heading">
      <SectionHeading eyebrow="Activity" title="GitHub & Coding" icon={Github} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {githubStats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <stat.icon size={17} style={{ color: COLORS.cyan }} className="mb-3" aria-hidden="true" />
            <p className="text-xs mb-1" style={{ color: COLORS.textSecondary }}>
              {stat.label}
            </p>
            <p className="text-sm font-semibold" style={{ color: COLORS.textPrimary }}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function priorityColor(priority) {
  if (priority === "High") return COLORS.orange;
  if (priority === "Medium") return COLORS.amber;
  return COLORS.cyan;
}

function CurrentGoals() {
  return (
    <section aria-labelledby="goals-heading">
      <SectionHeading eyebrow="Ambitions" title="Current Goals" icon={Target} />
      <div className="grid md:grid-cols-2 gap-4">
        {goals.map((goal, i) => (
          <Card key={goal.title} className="p-5">
            <div className="flex items-start justify-between mb-3 gap-2">
              <h3 className="text-sm font-semibold" style={{ color: COLORS.textPrimary }}>
                {goal.title}
              </h3>
              <Pill tone={goal.priority === "High" ? "amber" : "cyan"}>{goal.priority}</Pill>
            </div>
            <ProgressBar value={goal.progress} color={priorityColor(goal.priority)} delay={i * 0.05} />
            <div className="flex items-center justify-between mt-3 text-xs">
              <span style={{ color: COLORS.textSecondary }}>ETA {goal.eta}</span>
              <span style={{ color: COLORS.green }}>{goal.status}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function CertificateCard({ cert }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl border p-5 cursor-pointer"
      style={{ backgroundColor: COLORS.card, borderColor: COLORS.border }}
      onClick={() => setExpanded((v) => !v)}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setExpanded((v) => !v)}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${cert.color}1A` }}
        >
          <Award size={18} style={{ color: cert.color }} aria-hidden="true" />
        </div>
        <span className="text-xs" style={{ color: COLORS.textSecondary }}>
          {cert.date}
        </span>
      </div>
      <p className="text-xs mb-1 font-medium" style={{ color: cert.color }}>
        {cert.org}
      </p>
      <h3 className="text-sm font-semibold mb-4" style={{ color: COLORS.textPrimary }}>
        {cert.title}
      </h3>
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="flex gap-3 pt-2 border-t" style={{ borderColor: COLORS.border }}>
          <button
            className="flex-1 mt-3 text-xs font-medium py-2 rounded-lg flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2"
            style={{ backgroundColor: COLORS.surface, color: COLORS.textPrimary }}
          >
            <ExternalLink size={13} aria-hidden="true" /> View Certificate
          </button>
          <button
            className="flex-1 mt-3 text-xs font-medium py-2 rounded-lg flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2"
            style={{ backgroundColor: COLORS.surface, color: COLORS.textPrimary }}
          >
            <Download size={13} aria-hidden="true" /> Download
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Certificates() {
  return (
    <section aria-labelledby="certs-heading">
      <SectionHeading eyebrow="Credentials" title="Certificates" icon={Award} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((cert) => (
          <CertificateCard key={cert.title} cert={cert} />
        ))}
      </div>
    </section>
  );
}

function QuickActions() {
  return (
    <section aria-labelledby="actions-heading">
      <SectionHeading eyebrow="Shortcuts" title="Quick Actions" icon={Zap} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {quickActions.map((action) => (
          <motion.button
            key={action.label}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="relative rounded-2xl border p-5 flex flex-col items-center gap-3 text-center overflow-hidden focus:outline-none focus-visible:ring-2"
            style={{ backgroundColor: COLORS.card, borderColor: COLORS.border }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.orange})` }}
            >
              <action.icon size={17} color="#0B1120" aria-hidden="true" />
            </div>
            <span className="text-xs font-medium" style={{ color: COLORS.textPrimary }}>
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

export default function Profile() {
  return (
    <div
      className="min-h-screen w-full relative"
      style={{ color: COLORS.textPrimary }}
    >
      {/* Ambient background */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(circle at 10% 0%, rgba(245,158,11,0.06), transparent 40%), radial-gradient(circle at 90% 20%, rgba(6,182,212,0.05), transparent 40%), radial-gradient(circle at 50% 100%, rgba(249,115,22,0.05), transparent 40%)",
        }}
        aria-hidden="true"
      />

      <main className="relative max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16 flex flex-col gap-14">
        <IdentityCard />
        <Snapshot />
        <Mission />
        <IdentityScore />
        <SkillMatrix />
        <CurrentJourney />
        <Timeline />
        <GithubCoding />
        <CurrentGoals />
        <Certificates />
        <QuickActions />
      </main>
    </div>
  );
}