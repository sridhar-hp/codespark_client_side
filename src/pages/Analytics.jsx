import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Briefcase, GraduationCap, MapPin, Link2, Code, Star, Trophy, 
  Target, ChevronDown, ChevronUp, Eye, Search, TrendingUp, Award, 
  PenTool, Download, Share2, Github, ExternalLink, Activity, CheckCircle, 
  Clock, X, Settings, Plus, FileText, Send, Terminal, Database, Cloud, 
  Zap, Shield, Play, ArrowRight, Check, Layout, BarChart, Users, MessageSquare,
  Cpu, Server, Code2, Globe, Laptop
} from 'lucide-react';

// --- MOCK DATA ---
const CAREER_DATA = {
  profile: {
    name: "Developer",
    role: "Full Stack Developer & BCA Student",
    level: "Level 14 - Junior Engineer",
    score: 8450,
    visibility: "High",
    strength: 85,
    goal: "MERN Stack Internship",
    quote: "Building scalable web experiences and mastering data structures."
  },
  skills: [
    { name: 'React', xp: 2400, color: 'text-[#0A66C2]', bg: 'bg-[#0A66C2]' },
    { name: 'Tailwind CSS', xp: 1850, color: 'text-teal-400', bg: 'bg-teal-400' },
    { name: 'MongoDB', xp: 1200, color: 'text-green-500', bg: 'bg-green-500' },
    { name: 'Data Structures', xp: 3100, color: 'text-amber-500', bg: 'bg-amber-500' },
    { name: 'Algorithms', xp: 2800, color: 'text-purple-500', bg: 'bg-purple-500' }
  ],
  experience: [
    {
      id: 1,
      role: "MERN Stack Intern (Applicant)",
      company: "Across The Globe",
      duration: "Present",
      description: "Applying advanced React and MongoDB principles to build highly responsive user interfaces and robust database schemas.",
      type: "Internship"
    },
    {
      id: 2,
      role: "Full Stack Candidate",
      company: "3W Business Private Limited",
      duration: "Recent",
      description: "Engaged in technical evaluations focusing on modern web development practices and full-stack architecture.",
      type: "Recruitment"
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Jamal Mohamed College",
      focus: "Computer Science, Programming Languages, Web Development",
      year: "Expected 2026"
    }
  ],
  projects: [
    {
      id: 1,
      title: "Leave Management System",
      tech: ["React", "Vite", "Tailwind CSS"],
      role: "Frontend Architect",
      xp: 450,
      completion: 100,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
      description: "A comprehensive dashboard featuring sliding panel animations and robust state management for academic leave tracking."
    },
    {
      id: 2,
      title: "AI Agent Deployment",
      tech: ["Python", "Multi-agent Systems", "Kaggle"],
      role: "AI Developer",
      xp: 800,
      completion: 100,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80",
      description: "Deployed custom AI tools and multi-agent systems via Google's Intensive AI course architecture."
    }
  ],
  timeline: [
    { id: 1, type: 'post', title: "Mastering React Sliding Panels", reach: 1205, likes: 84, comments: 12, time: "2h ago" },
    { id: 2, type: 'certificate', title: "Completed: Google AI Agents Intensive", reach: 3400, likes: 210, comments: 45, time: "1d ago" },
    { id: 3, type: 'project', title: "Deployed Leave Management Dashboard v1.0", reach: 890, likes: 56, comments: 8, time: "3d ago" }
  ],
  roadmap: [
    { level: "Student", status: "completed" },
    { level: "Intern", status: "active" },
    { level: "Junior Developer", status: "locked" },
    { level: "Software Engineer", status: "locked" },
    { level: "Senior Developer", status: "locked" }
  ]
};

// --- HELPER COMPONENTS ---

const Card = ({ children, className = "", noPadding = false }) => (
  <div className={`bg-[#111827]/90 backdrop-blur-xl border border-[#1F2937] rounded-[24px] sm:rounded-[32px] overflow-hidden transition-all duration-300 hover:border-[#F59E0B]/20 hover:shadow-[0_8px_32px_rgba(245,158,11,0.05)] ${noPadding ? '' : 'p-6 sm:p-8'} ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ title, icon: Icon, subtitle }) => (
  <div className="mb-6 sm:mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-[#0F172A] rounded-xl border border-[#1F2937] text-amber-500">
        <Icon size={20} />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-[#F9FAFB] tracking-tight">{title}</h2>
    </div>
    {subtitle && <p className="text-[#9CA3AF] text-sm sm:text-base ml-12">{subtitle}</p>}
  </div>
);

const Button = ({ children, variant = 'primary', className = "", onClick, icon: Icon }) => {
  const baseStyle = "relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 overflow-hidden group active:scale-95";
  const variants = {
    primary: "bg-amber-500 text-[#0B1120] hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]",
    secondary: "bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90 hover:shadow-[0_0_20px_rgba(10,102,194,0.3)]",
    outline: "bg-transparent border border-[#1F2937] text-[#E5E7EB] hover:bg-[#1F2937] hover:border-[#374151]",
    ghost: "bg-transparent text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]/50"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      <span className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-xl blur-sm" />
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon size={18} className={variant === 'primary' ? 'text-[#0B1120]' : ''} />}
        {children}
      </span>
    </button>
  );
};

export default function CareerHub() {
  const [activeModal, setActiveModal] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [mockLoading, setMockLoading] = useState(false);

  // Initial load stagger
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleExpand = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAction = (actionName) => {
    setMockLoading(true);
    setTimeout(() => {
      setMockLoading(false);
      setActiveModal(actionName);
    }, 400);
  };

  const closeModal = () => setActiveModal(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen w-full bg-transparent text-[#F9FAFB] font-sans selection:bg-amber-500/30">
      {/* --- INJECTED GLOBAL STYLES FOR ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 20px rgba(245,158,11,0.2); }
          50% { opacity: 1; box-shadow: 0 0 40px rgba(245,158,11,0.6); }
        }
        @keyframes slide-up-fade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes draw-radar {
          from { stroke-dasharray: 0, 1000; opacity: 0; }
          to { stroke-dasharray: 1000, 1000; opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fill-bar {
          from { width: 0; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-slide-up { animation: slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .animate-radar { animation: draw-radar 2s ease-out forwards; }
        .shimmer-bg {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite linear;
        }
        .glass-modal {
          background: rgba(17, 24, 39, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        /* Custom scrollbar for horizontal lists */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 sm:gap-12">
        
        {/* ========================================================= */}
        {/* SECTION 1: PROFESSIONAL HERO                              */}
        {/* ========================================================= */}
        <section className={`relative rounded-[32px] overflow-hidden bg-[#111827]/50 border border-[#1F2937] p-8 sm:p-12 animate-slide-up`} style={{ animationDelay: '0.1s' }}>
          {/* Animated Ambient Background */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#0A66C2]/10 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[#F59E0B]/10 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Avatar & Status */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-[#0A66C2] rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-glow" />
                <div className="relative w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-amber-500 to-[#0A66C2]">
                  <div className="w-full h-full bg-[#111827] rounded-full flex items-center justify-center overflow-hidden border-4 border-[#0B1120]">
                    <User size={64} className="text-[#9CA3AF]" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#10B981] border-4 border-[#0B1120] w-8 h-8 rounded-full flex items-center justify-center" title="Open to Work">
                  <span className="w-3 h-3 bg-white rounded-full animate-ping" />
                  <span className="absolute w-3 h-3 bg-white rounded-full" />
                </div>
              </div>

              <div className="text-center lg:text-left w-full">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9CA3AF] mb-2 tracking-tight">
                  {CAREER_DATA.profile.name}
                </h1>
                <p className="text-lg text-amber-500 font-medium mb-4 flex items-center justify-center lg:justify-start gap-2">
                  <Terminal size={18} /> {CAREER_DATA.profile.role}
                </p>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm">
                  <span className="px-3 py-1.5 rounded-lg bg-[#1F2937] border border-[#374151] flex items-center gap-2 text-[#D1D5DB]">
                    <Target size={14} className="text-[#0A66C2]" /> {CAREER_DATA.profile.goal}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#1F2937] border border-[#374151] flex items-center gap-2 text-[#D1D5DB]">
                    <Eye size={14} className="text-[#10B981]" /> Recruiter Vis: {CAREER_DATA.profile.visibility}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Metrics & Actions */}
            <div className="lg:col-span-8 flex flex-col space-y-8 w-full">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                <div className="bg-[#0F172A] border border-[#1F2937] rounded-2xl p-5 hover:border-[#0A66C2]/30 transition-colors group">
                  <p className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Trophy size={14} /> Career Level
                  </p>
                  <p className="text-2xl font-bold text-white group-hover:text-[#0A66C2] transition-colors">{CAREER_DATA.profile.level.split('-')[0]}</p>
                </div>
                <div className="bg-[#0F172A] border border-[#1F2937] rounded-2xl p-5 hover:border-amber-500/30 transition-colors group">
                  <p className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Star size={14} /> XP Score
                  </p>
                  <p className="text-2xl font-bold text-white group-hover:text-amber-500 transition-colors">{CAREER_DATA.profile.score}</p>
                </div>
                <div className="col-span-2 bg-[#0F172A] border border-[#1F2937] rounded-2xl p-5 relative overflow-hidden group hover:border-[#10B981]/30 transition-colors">
                  <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex justify-between items-end">
                    <div>
                      <p className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Activity size={14} /> Profile Strength
                      </p>
                      <p className="text-2xl font-bold text-white">{CAREER_DATA.profile.strength}%</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-[#1F2937] border-t-[#10B981] border-r-[#10B981] transform -rotate-45 flex items-center justify-center">
                      <span className="transform rotate-45 text-xs font-bold">Pro</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1F2937]/30 border border-[#374151]/50 rounded-2xl p-5 border-l-4 border-l-amber-500 italic text-[#D1D5DB]">
                "{CAREER_DATA.profile.quote}"
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" icon={PenTool} onClick={() => handleAction('Edit Profile')}>Edit Profile</Button>
                <Button variant="secondary" icon={Share2} onClick={() => handleAction('Share Profile')}>Share Profile</Button>
                <Button variant="outline" icon={Download} onClick={() => handleAction('Download Resume')}>Resume</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* TWO COLUMN LAYOUT                                         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* MAIN CONTENT COLUMN (Left 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8 sm:gap-12">
            
            {/* ========================================================= */}
            {/* SECTION 7: CAREER ROADMAP                                 */}
            {/* ========================================================= */}
            <section className={`animate-slide-up`} style={{ animationDelay: '0.2s' }}>
              <SectionTitle title="Career Roadmap" icon={MapPin} subtitle="Your structural progression in tech" />
              <Card className="overflow-x-auto hide-scrollbar">
                <div className="flex items-center min-w-[600px] justify-between py-6 px-4 relative">
                  {/* Connecting Line */}
                  <div className="absolute top-1/2 left-8 right-8 h-1 bg-[#1F2937] -translate-y-1/2 z-0" />
                  <div className="absolute top-1/2 left-8 h-1 bg-amber-500 -translate-y-1/2 z-0 transition-all duration-1000" style={{ width: '40%', animation: 'fill-bar 1.5s ease-out' }} />
                  
                  {CAREER_DATA.roadmap.map((node, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center bg-[#111827] transition-all duration-300 
                        ${node.status === 'completed' ? 'border-[#10B981] text-[#10B981]' : 
                          node.status === 'active' ? 'border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse-glow' : 
                          'border-[#374151] text-[#6B7280]'}`}>
                        {node.status === 'completed' ? <Check size={20} /> : 
                         node.status === 'active' ? <Target size={20} /> : 
                         <span className="w-2 h-2 rounded-full bg-[#6B7280]" />}
                      </div>
                      <span className={`text-xs font-semibold whitespace-nowrap ${node.status === 'active' ? 'text-amber-500' : 'text-[#9CA3AF]'}`}>
                        {node.level}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* ========================================================= */}
            {/* SECTION 4: FEATURED PROJECTS (Horizontal Carousel)        */}
            {/* ========================================================= */}
            <section className={`animate-slide-up`} style={{ animationDelay: '0.3s' }}>
              <SectionTitle title="Featured Projects" icon={Code2} subtitle="Production-level applications & deployments" />
              <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 snap-x">
                {CAREER_DATA.projects.map(project => (
                  <Card key={project.id} noPadding className="min-w-[320px] sm:min-w-[400px] flex-shrink-0 snap-center group relative h-full flex flex-col">
                    <div className="h-48 overflow-hidden relative border-b border-[#1F2937]">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent z-10" />
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                        {project.tech.map((t, i) => (
                          <span key={i} className="px-2 py-1 bg-[#0F172A]/80 backdrop-blur border border-[#374151] text-[10px] uppercase font-bold tracking-wider rounded-md text-amber-500">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between bg-[#111827]">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">{project.title}</h3>
                          <span className="flex items-center gap-1 text-xs text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-full"><Award size={12}/> {project.xp} XP</span>
                        </div>
                        <p className="text-sm text-[#9CA3AF] mb-4 line-clamp-2">{project.description}</p>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <Button variant="outline" className="flex-1 text-xs py-2" icon={Github} onClick={() => handleAction('GitHub')}>Code</Button>
                        <Button variant="secondary" className="flex-1 text-xs py-2 bg-[#1F2937] text-white hover:bg-[#374151]" icon={ExternalLink} onClick={() => handleAction('Live Demo')}>Demo</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 3: PROFESSIONAL BRAND (Experience & Edu)          */}
            {/* ========================================================= */}
            <section className={`animate-slide-up`} style={{ animationDelay: '0.4s' }}>
              <SectionTitle title="Professional Brand" icon={Briefcase} subtitle="Experience, Education & Certifications" />
              <div className="space-y-4">
                
                {/* Experience Card */}
                <Card className="group cursor-pointer" onClick={() => toggleExpand('exp')}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><Layout size={18} className="text-amber-500"/> Experience</h3>
                    {expandedSections['exp'] ? <ChevronUp size={20} className="text-[#9CA3AF]" /> : <ChevronDown size={20} className="text-[#9CA3AF]" />}
                  </div>
                  
                  <div className={`grid transition-all duration-300 ease-in-out ${expandedSections['exp'] ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden space-y-6">
                      {CAREER_DATA.experience.map(exp => (
                        <div key={exp.id} className="relative pl-6 border-l-2 border-[#1F2937] hover:border-amber-500 transition-colors">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#111827] border-2 border-amber-500" />
                          <h4 className="text-base font-bold text-white">{exp.role}</h4>
                          <p className="text-sm text-[#0A66C2] mb-2 font-medium">{exp.company} • {exp.duration}</p>
                          <p className="text-sm text-[#9CA3AF] leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                      <div className="flex justify-end gap-3 pt-4 border-t border-[#1F2937]">
                        <Button variant="outline" className="text-xs" icon={PenTool} onClick={(e) => { e.stopPropagation(); handleAction('Edit Experience'); }}>Edit</Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Education Card */}
                <Card className="group cursor-pointer" onClick={() => toggleExpand('edu')}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><GraduationCap size={18} className="text-[#0A66C2]"/> Education</h3>
                    {expandedSections['edu'] ? <ChevronUp size={20} className="text-[#9CA3AF]" /> : <ChevronDown size={20} className="text-[#9CA3AF]" />}
                  </div>
                  
                  <div className={`grid transition-all duration-300 ease-in-out ${expandedSections['edu'] ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden space-y-6">
                      {CAREER_DATA.education.map(edu => (
                        <div key={edu.id} className="relative pl-6 border-l-2 border-[#1F2937] hover:border-[#0A66C2] transition-colors">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#111827] border-2 border-[#0A66C2]" />
                          <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                          <p className="text-sm text-amber-500 mb-2 font-medium">{edu.institution} • {edu.year}</p>
                          <p className="text-sm text-[#9CA3AF]">{edu.focus}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 6: POSTING ACTIVITY                               */}
            {/* ========================================================= */}
            <section className={`animate-slide-up`} style={{ animationDelay: '0.5s' }}>
              <SectionTitle title="Activity & Posts" icon={MessageSquare} subtitle="Recent thoughts and updates" />
              <Card>
                <div className="space-y-6">
                  {CAREER_DATA.timeline.map((item, i) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-[#0F172A] border border-[#1F2937] hover:border-[#374151] transition-all group">
                      <div className="mt-1">
                        {item.type === 'post' && <FileText className="text-[#0A66C2]" size={24} />}
                        {item.type === 'certificate' && <Award className="text-amber-500" size={24} />}
                        {item.type === 'project' && <Code className="text-[#10B981]" size={24} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">{item.title}</h4>
                          <span className="text-xs text-[#6B7280] flex items-center gap-1"><Clock size={12}/> {item.time}</span>
                        </div>
                        <div className="flex gap-4 mt-3 pt-3 border-t border-[#1F2937]/50 text-xs text-[#9CA3AF]">
                          <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors"><Eye size={14}/> {item.reach}</span>
                          <span className="flex items-center gap-1.5 hover:text-[#0A66C2] cursor-pointer transition-colors"><Star size={14}/> {item.likes}</span>
                          <span className="flex items-center gap-1.5 hover:text-[#10B981] cursor-pointer transition-colors"><MessageSquare size={14}/> {item.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full text-sm py-3 mt-2" onClick={() => handleAction('View All Activity')}>View All Activity <ArrowRight size={16}/></Button>
                </div>
              </Card>
            </section>

          </div>

          {/* RIGHT SIDEBAR (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-8 sm:gap-12">

            {/* ========================================================= */}
            {/* SECTION 10: SKILL RADAR                                   */}
            {/* ========================================================= */}
            <section className={`animate-slide-up`} style={{ animationDelay: '0.6s' }}>
              <SectionTitle title="Skill Matrix" icon={Zap} />
              <Card className="flex flex-col items-center justify-center p-8 aspect-square relative">
                {/* Custom CSS Radar implementation using concentric circles and absolute positioning */}
                <div className="relative w-full h-full max-w-[240px] max-h-[240px] rounded-full border border-[#1F2937] flex items-center justify-center bg-[#0F172A]/50">
                  <div className="absolute w-[75%] h-[75%] rounded-full border border-[#1F2937]" />
                  <div className="absolute w-[50%] h-[50%] rounded-full border border-[#1F2937]" />
                  <div className="absolute w-[25%] h-[25%] rounded-full border border-[#1F2937]" />
                  
                  {/* Crosshairs */}
                  <div className="absolute w-full h-[1px] bg-[#1F2937] rotate-45" />
                  <div className="absolute w-full h-[1px] bg-[#1F2937] -rotate-45" />
                  <div className="absolute w-[1px] h-full bg-[#1F2937]" />
                  <div className="absolute w-full h-[1px] bg-[#1F2937]" />

                  {/* SVG Polygon for Skill Area */}
                  <svg className="absolute inset-0 w-full h-full animate-radar z-10" viewBox="0 0 100 100">
                    <polygon 
                      points="50,15 85,35 75,85 25,75 15,40" 
                      fill="rgba(245, 158, 11, 0.2)" 
                      stroke="#F59E0B" 
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Nodes */}
                  <div className="absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 group">
                    <div className="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-transform" />
                    <span className="text-[10px] font-bold text-[#D1D5DB] mt-1 bg-[#111827] px-1 rounded">React</span>
                  </div>
                  <div className="absolute top-[35%] right-[10%] translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 group">
                    <div className="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-transform" />
                    <span className="text-[10px] font-bold text-[#D1D5DB] mt-1 bg-[#111827] px-1 rounded">DSA</span>
                  </div>
                  <div className="absolute bottom-[10%] right-[20%] translate-x-1/2 translate-y-1/2 flex flex-col items-center z-20 group">
                    <div className="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-transform" />
                    <span className="text-[10px] font-bold text-[#D1D5DB] mt-1 bg-[#111827] px-1 rounded">MongoDB</span>
                  </div>
                  <div className="absolute bottom-[20%] left-[20%] -translate-x-1/2 translate-y-1/2 flex flex-col items-center z-20 group">
                    <div className="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-transform" />
                    <span className="text-[10px] font-bold text-[#D1D5DB] mt-1 bg-[#111827] px-1 rounded">Tailwind</span>
                  </div>
                  <div className="absolute top-[40%] left-[10%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 group">
                    <div className="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-transform" />
                    <span className="text-[10px] font-bold text-[#D1D5DB] mt-1 bg-[#111827] px-1 rounded">System</span>
                  </div>
                </div>
              </Card>
            </section>

            {/* ========================================================= */}
            {/* SECTION 8: RECRUITER INSIGHTS                             */}
            {/* ========================================================= */}
            <section className={`animate-slide-up`} style={{ animationDelay: '0.7s' }}>
              <SectionTitle title="Recruiter Insights" icon={Search} />
              <Card>
                <div className="space-y-5">
                  {[
                    { label: "Profile Quality", val: 85, color: "bg-[#10B981]" },
                    { label: "Resume Match", val: 70, color: "bg-amber-500" },
                    { label: "Keyword Hit Rate", val: 92, color: "bg-[#0A66C2]" }
                  ].map((insight, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#D1D5DB] font-medium">{insight.label}</span>
                        <span className="text-white font-bold">{insight.val}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#1F2937] rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${insight.color} rounded-full transition-all duration-1000 ease-out group-hover:opacity-80`} 
                          style={{ width: mounted ? `${insight.val}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4 text-xs py-2" onClick={() => handleAction('Analyze Profile')}>Run Analysis</Button>
                </div>
              </Card>
            </section>

            {/* ========================================================= */}
            {/* SECTION 5: NETWORK GROWTH                                 */}
            {/* ========================================================= */}
            <section className={`animate-slide-up`} style={{ animationDelay: '0.8s' }}>
              <SectionTitle title="Network" icon={Users} />
              <div className="grid grid-cols-2 gap-4">
                <Card noPadding className="p-4 bg-[#0F172A] flex flex-col justify-center items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-[#0A66C2]/10 flex items-center justify-center mb-3">
                    <Users size={18} className="text-[#0A66C2]" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">412</h4>
                  <p className="text-xs text-[#9CA3AF] mt-1">Connections</p>
                </Card>
                <Card noPadding className="p-4 bg-[#0F172A] flex flex-col justify-center items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mb-3">
                    <TrendingUp size={18} className="text-amber-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">1.2k</h4>
                  <p className="text-xs text-[#9CA3AF] mt-1">Profile Views</p>
                </Card>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 9: WEEKLY CAREER GOALS                            */}
            {/* ========================================================= */}
            <section className={`animate-slide-up`} style={{ animationDelay: '0.9s' }}>
              <SectionTitle title="Weekly Goals" icon={CheckCircle} />
              <Card>
                <div className="space-y-3">
                  {[
                    { id: 1, text: "Update Resume Highlights", done: true, xp: 50 },
                    { id: 2, text: "Connect with 5 Developers", done: false, xp: 100 },
                    { id: 3, text: "Publish Tech Post", done: false, xp: 150 }
                  ].map(goal => (
                    <div key={goal.id} 
                         className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer hover:bg-[#1F2937]/50
                         ${goal.done ? 'bg-[#1F2937]/30 border-[#374151] opacity-70' : 'bg-[#0F172A] border-[#1F2937] hover:border-amber-500/50'}`}
                         onClick={() => handleAction(`Toggle Goal: ${goal.text}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                          ${goal.done ? 'bg-[#10B981] border-[#10B981] text-[#0B1120]' : 'border-[#6B7280]'}`}>
                          {goal.done && <Check size={12} strokeWidth={4} />}
                        </div>
                        <span className={`text-sm ${goal.done ? 'line-through text-[#9CA3AF]' : 'text-white'}`}>{goal.text}</span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded">+{goal.xp}XP</span>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 12: QUICK ACTIONS (FLOATING DOCK)                 */}
      {/* ========================================================= */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-slide-up" style={{ animationDelay: '1.2s' }}>
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#111827]/80 backdrop-blur-xl border border-[#374151] shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          {[
            { icon: Plus, label: "Add Project", action: "Create Project" },
            { icon: FileText, label: "Update Resume", action: "Upload Resume" },
            { icon: PenTool, label: "New Post", action: "Create Post" },
            { icon: Share2, label: "Share", action: "Share Portfolio" }
          ].map((action, idx) => (
            <button 
              key={idx}
              onClick={() => handleAction(action.action)}
              className="p-3 sm:p-4 rounded-xl text-[#9CA3AF] hover:text-amber-500 hover:bg-[#1F2937] transition-all group relative"
            >
              <action.icon size={20} className="group-active:scale-90 transition-transform" />
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#374151]">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODALS                                                    */}
      {/* ========================================================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-modal animate-slide-up" style={{ animation: 'slide-up-fade 0.2s ease-out forwards' }}>
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
          <Card className="relative z-10 w-full max-w-md shadow-[0_20px_60px_rgba(0,0,0,0.5)] scale-100">
            <button onClick={closeModal} className="absolute top-6 right-6 text-[#9CA3AF] hover:text-white transition-colors bg-[#1F2937] p-1.5 rounded-full">
              <X size={18} />
            </button>
            
            <div className="mb-8">
              <div className="w-12 h-12 rounded-full bg-[#1F2937] flex items-center justify-center text-amber-500 mb-4">
                <Settings size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{activeModal}</h2>
              <p className="text-[#9CA3AF] text-sm">This is a simulated action within the CODESPARK Developer OS. All operations are mocked for this preview.</p>
            </div>
            
            <div className="flex gap-4">
              <Button variant="primary" className="flex-1" onClick={closeModal}>Confirm</Button>
              <Button variant="outline" className="flex-1" onClick={closeModal}>Cancel</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Global Loading Mock Overlay for interactions */}
      {mockLoading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0B1120]/50 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-[#1F2937] border-t-amber-500 rounded-full animate-spin" />
        </div>
      )}

    </div>
  );
}