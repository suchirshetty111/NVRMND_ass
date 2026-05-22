import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { 
  ArrowUpRight, 
  Heart, 
  Layers, 
  Calendar, 
  Compass, 
  RefreshCw, 
  Sparkles, 
  Cpu, 
  Terminal, 
  Eye, 
  Star 
} from "lucide-react";
import { EASE_CINEMATIC } from "../utils/animations";
import { premiumSynth } from "../utils/audio";

interface WorkScrollTargetProps {
  imageUrl: string;
  title: string;
  accent: string;
  onOpen: () => void;
  onToggleFavorite: (e: any) => void;
  isFavorited: boolean;
  aspectRatio?: string;
}

// Encapsulated 120FPS micro-interactive image frame component
function InteractiveShowcaseFrame({
  imageUrl,
  title,
  accent,
  onOpen,
  onToggleFavorite,
  isFavorited,
  aspectRatio = "aspect-[16/10]"
}: WorkScrollTargetProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse absolute positions mapped to motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Elastic physics-based springs to create a custom latency slide effect
  const springX = useSpring(mouseX, { stiffness: 140, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 28 });

  // Scroll Parallax mapping for graphic transformations
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const glowTranslateY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Assign values relative to center coordinates or absolute offsets
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // Gracefully drift coordinates back toward the center of the viewport
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
      className={`relative w-full overflow-hidden rounded-sm bg-[#111111] border border-white/5 hover:border-white/15 cursor-pointer shadow-2xl transition-all duration-700 ${aspectRatio} group`}
    >
      {/* Background image container under subtle parallax shift */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] select-none pointer-events-none"
      >
        <img
          src={imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
      </motion.div>

      {/* Layered luxury shadow scrim block */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/30 to-black/35 opacity-90 z-10 transition-opacity duration-500 group-hover:opacity-80" />

      {/* Cursor-following radial light sheath */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full pointer-events-none blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-700 z-15"
        style={{
          background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`,
          left: springX,
          top: springY,
          y: glowTranslateY
        }}
      />

      {/* Studio aesthetic structural design markers */}
      <div className="absolute top-5 left-5 w-4 h-[1px] bg-white/30 transition-all duration-500 group-hover:w-10 group-hover:bg-[#1f4fff] z-20" />
      <div className="absolute top-5 left-5 w-[1px] h-4 bg-white/30 transition-all duration-500 group-hover:h-10 group-hover:bg-[#1f4fff] z-20" />
      
      <div className="absolute bottom-5 right-5 w-4 h-[1px] bg-white/30 transition-all duration-500 group-hover:w-10 group-hover:bg-[#1f4fff] z-20" />
      <div className="absolute bottom-5 right-5 w-[1px] h-4 bg-white/30 transition-all duration-500 group-hover:h-10 group-hover:bg-[#1f4fff] z-20" />

      {/* Central hover visual lens indicators */}
      <div className="absolute inset-0 flex items-center justify-center z-25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-white text-[#1f4fff] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-500">
          <Eye className="w-6 h-6" />
        </div>
      </div>

      {/* Corner metric diagnostics lines */}
      <div className="absolute bottom-5 left-5 z-20 hidden sm:flex items-center gap-2 text-[8px] font-mono tracking-widest text-white/50 uppercase select-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        <span>SYS_COORD // LATENCY OPTIMAL</span>
      </div>

      {/* Interactive heart node bookmark */}
      <div className="absolute top-5 right-5 z-25" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onToggleFavorite}
          className="w-10 h-10 rounded-full bg-white/95 border border-[#111111]/5 flex items-center justify-center text-[#666666] hover:text-rose-500 transition-colors cursor-pointer select-none"
          title="Toggle Selection Bookmark"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>
      </div>
    </div>
  );
}

interface WorkSectionProps {
  onOpenWork: (work: any) => void;
  favorited: Record<string, boolean>;
  onToggleFavorite: (id: string, e: any) => void;
}

export default function WorkSection({ onOpenWork, favorited, onToggleFavorite }: WorkSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const portfolioWorks = [
    {
      id: "work-intellete",
      title: "Intellete",
      category: "Education Platform",
      client: "Schengen Education Alliance",
      year: "2026",
      description: "An immersive student platform helping users navigate higher education opportunities across Europe.",
      technologies: ["React", "Motion Design", "CMS"],
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200",
      accent: "#1f4fff",
      layoutType: "left-text", // Text left, image right
      tabTags: ["all", "engineering", "design"],
      kpi: "SUB-SECOND RESIDENCE QUERY",
      stat: "96% ACQUISITION RATE",
      longPitch: "Integrating heavy localized academic indexes into an instantly responsive map interface, enabling seamless cross-border discoveries."
    },
    {
      id: "work-aether",
      title: "Aether Studio",
      category: "Creative Agency",
      client: "Aether Collective",
      year: "2025",
      description: "A cinematic digital portfolio experience crafted for a luxury creative design studio.",
      technologies: ["Next.js", "Framer Motion", "Tailwind"],
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
      accent: "#b5cc3c",
      layoutType: "right-text", // Image left, text right
      tabTags: ["all", "interactive", "design"],
      kpi: "GPU HARDWARE PAINT INDEX",
      stat: "120 FPS RENDERS",
      longPitch: "Bespoke scroll transformations mapping viewport heights to translation parameters, ensuring lag-free high-density asset rendering."
    },
    {
      id: "work-velora",
      title: "Velora",
      category: "Fashion Brand",
      client: "Velora Haute Couture",
      year: "2026",
      description: "A premium ecommerce storytelling experience blending motion, luxury aesthetics, and immersive product presentation.",
      technologies: ["React", "GSAP", "Shopify"],
      imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200",
      accent: "#ea580c",
      layoutType: "centered-banner", // Center colossal widescreen aspect ratio banner
      tabTags: ["all", "interactive", "design"],
      kpi: "COMMERCE CONVERSION UPLIFT",
      stat: "+150% CHECKOUT SESSIONS",
      longPitch: "Bridging the tactile physical textures of luxury fabrics with digital visual dynamics through smooth scroll scrubs."
    },
    {
      id: "work-nova",
      title: "Nova Labs",
      category: "Technology Startup",
      client: "Nova Labs Corp",
      year: "2025",
      description: "A futuristic SaaS landing experience focused on interaction, conversion, and modern UI storytelling.",
      technologies: ["React", "TypeScript", "Motion UI"],
      imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200",
      accent: "#a855f7",
      layoutType: "split-editorial", // Custom dashboard grid panel layout
      tabTags: ["all", "interactive", "engineering"],
      kpi: "CONCURRENT TELEMETRY THREADS",
      stat: "0.3s SEC DEPLOY PING",
      longPitch: "Simplifying enterprise cloud-infrastructure telemetry down to custom, interactive 2D node constellation modules."
    }
  ];

  // Filters mapping directly to tags
  const filteredWorks = activeTab === "all"
    ? portfolioWorks
    : portfolioWorks.filter(w => w.tabTags.includes(activeTab));

  return (
    <section 
      id="work" 
      className="relative bg-[#e9e9e9] py-24 md:py-36 px-6 md:px-12 border-t border-[#111111]/8 overflow-hidden select-none"
    >
      {/* Background grid alignment lines */}
      <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-[#111111]/[0.015] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-[#111111]/[0.015] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-[#111111]/[0.015] pointer-events-none" />

      {/* Atmospheric ambient soft floaters */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#1f4fff]/3 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-[450px] h-[450px] bg-indigo-500/[0.02] rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* UPPER BLUE LABEL INDICATOR HEADER */}
        <div className="flex flex-col gap-4 mb-20 md:mb-28">
          <div className="flex items-center gap-3">
            <div className="bg-[#1f4fff] text-white text-[10px] font-mono font-extrabold tracking-[0.25em] px-4 py-1.5 rounded-sm uppercase inline-block shadow-sm">
              OUR WORK
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#666666]/70 uppercase">
              // STUDIO PORTFOLIO
            </span>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start lg:items-end justify-between border-b border-[#111111]/8 pb-10">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans tracking-tight font-black uppercase text-[#111111] leading-[0.95]">
                Selected Digital <br />
                Experiences <br />
                <span className="text-stroke text-transparent tracking-wide">Crafted By NVRMND</span>
              </h2>
            </div>
            
            <div className="lg:col-span-5 flex flex-col gap-6 items-start">
              <p className="text-sm md:text-base text-[#666666] font-sans font-light leading-relaxed">
                We partner with ambitious founders and modern brands to create immersive digital experiences that blend storytelling, motion, and premium frontend engineering.
              </p>

              {/* Dynamic Interactive Filter Tabs */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "All Portfolio", value: "all" },
                  { label: "Interactive Core", value: "interactive" },
                  { label: "Creative Code", value: "engineering" },
                  { label: "UI / UX Systems", value: "design" }
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => {
                      setActiveTab(tab.value);
                      try {
                        premiumSynth.playClick();
                      } catch (e) {}
                    }}
                    className={`px-3 py-1.5 text-[9px] tracking-wider uppercase font-mono rounded-sm border transition-all duration-300 cursor-pointer ${
                      activeTab === tab.value
                        ? "border-[#1f4fff] bg-[#1f4fff] text-white font-semibold"
                        : "border-[#111111]/8 bg-white/40 text-[#666666] hover:border-black/20 hover:text-black"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* INFINITE RUNNING TEXT MARQUEE FOR PREMIUM CRAFT */}
        <div className="w-full overflow-hidden bg-white/40 backdrop-blur-md py-4 border-b border-t border-[#111111]/8 font-mono text-[9px] tracking-[0.25em] text-[#111111]/50 uppercase select-none mb-24 rounded-sm">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex gap-16 whitespace-nowrap"
          >
            <span>✦ IMMERSIVE RENDERING • PHYSIC INTERACTION • SYSTEM DEPTH • AW0RD CRAFT • ✦ IMMERSIVE RENDERING • PHYSIC INTERACTION • SYSTEM DEPTH • AW0RD CRAFT</span>
            <span>✦ IMMERSIVE RENDERING • PHYSIC INTERACTION • SYSTEM DEPTH • AW0RD CRAFT • ✦ IMMERSIVE RENDERING • PHYSIC INTERACTION • SYSTEM DEPTH • AW0RD CRAFT</span>
          </motion.div>
        </div>

        {/* ASYMMETRICAL PORTFOLIO PROJECTS MATRIX CONTAINER */}
        <div className="flex flex-col gap-32 md:gap-48">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((project, index) => {
              const isFavorited = !!favorited[project.id];
              const layout = project.layoutType;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.0, ease: EASE_CINEMATIC }}
                  className="w-full"
                >
                  
                  {/* ALTERNATING CASE 1: TEXT LEFT, IMAGE RIGHT (Intellete) */}
                  {layout === "left-text" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                      
                      {/* Left: Project metrics & description details */}
                      <div className="lg:col-span-5 flex flex-col items-start gap-6">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] font-mono text-[#1f4fff] tracking-widest uppercase font-bold">
                            // SELECTED EXPERIENCE 01
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1f4fff] animate-ping" />
                        </div>

                        <div className="flex flex-col gap-2">
                          <h3 className="text-3xl sm:text-5xl font-sans tracking-tight font-black uppercase text-[#111111]">
                            {project.title}
                          </h3>
                          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                            Category: <span className="text-[#1f4fff] font-bold">{project.category}</span> — Year // {project.year}
                          </p>
                        </div>

                        <p className="text-sm sm:text-base text-[#666666] leading-relaxed font-sans font-light">
                          {project.description}
                        </p>

                        <div className="w-full p-6 bg-white/70 backdrop-blur-sm border border-[#111111]/8 rounded-none">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-[9px] font-mono text-[#666666] block uppercase tracking-wider mb-1">
                                // PERFORMANCE STAT
                              </span>
                              <span className="text-sm font-sans font-extrabold text-[#111111] uppercase tracking-wide">
                                {project.stat}
                              </span>
                            </div>
                            <div>
                              <span className="text-[9px] font-mono text-[#666666] block uppercase tracking-wider mb-1">
                                // CORE BENCHMARK
                              </span>
                              <span className="text-[10px] font-mono text-[#1f4fff] uppercase font-bold tracking-tight">
                                {project.kpi}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map(tech => (
                            <span
                              key={tech}
                              className="text-[9px] font-mono text-[#111111] bg-white border border-[#111111]/8 px-3 py-1 rounded-sm uppercase tracking-wide"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => onOpenWork(project)}
                          className="cursor-pointer inline-flex items-center gap-2.5 group text-[#1f4fff] hover:text-black font-mono font-extrabold text-[10px] tracking-[0.2em] uppercase transition-colors pt-2"
                        >
                          <span>Explore Case Study</span>
                          <ArrowUpRight className="w-4 h-4 text-[#1f4fff] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                      </div>

                      {/* Right: Immersive graphic block */}
                      <div className="lg:col-span-7">
                        <InteractiveShowcaseFrame
                          imageUrl={project.imageUrl}
                          title={project.title}
                          accent={project.accent}
                          onOpen={() => onOpenWork(project)}
                          onToggleFavorite={(e) => onToggleFavorite(project.id, e)}
                          isFavorited={isFavorited}
                        />
                      </div>
                    </div>
                  )}

                  {/* ALTERNATING CASE 2: IMAGE LEFT, TEXT RIGHT (Aether Studio) */}
                  {layout === "right-text" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                      
                      {/* Left: Immersive graphic block */}
                      <div className="lg:col-span-7 order-2 lg:order-1">
                        <InteractiveShowcaseFrame
                          imageUrl={project.imageUrl}
                          title={project.title}
                          accent={project.accent}
                          onOpen={() => onOpenWork(project)}
                          onToggleFavorite={(e) => onToggleFavorite(project.id, e)}
                          isFavorited={isFavorited}
                        />
                      </div>

                      {/* Right: Project metrics & description details */}
                      <div className="lg:col-span-5 flex flex-col items-start gap-6 order-1 lg:order-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] font-mono text-[#b5cc3c] tracking-widest uppercase font-bold">
                            // LUXURY PORTFOLIO 02
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#b5cc3c] animate-pulse" />
                        </div>

                        <div className="flex flex-col gap-2">
                          <h3 className="text-3xl sm:text-5xl font-sans tracking-tight font-black uppercase text-[#111111]">
                            {project.title}
                          </h3>
                          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                            Category: <span className="text-[#1f4fff] font-bold">{project.category}</span> — Year // {project.year}
                          </p>
                        </div>

                        <p className="text-sm sm:text-base text-[#666666] leading-relaxed font-sans font-light">
                          {project.description}
                        </p>

                        <div className="w-full p-6 bg-white/70 backdrop-blur-sm border border-[#111111]/8 rounded-none">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-[9px] font-mono text-[#666666] block uppercase tracking-wider mb-1">
                                // SCREEN RESOLUTION
                              </span>
                              <span className="text-sm font-sans font-extrabold text-[#111111] uppercase tracking-wide">
                                {project.stat}
                              </span>
                            </div>
                            <div>
                              <span className="text-[9px] font-mono text-[#666666] block uppercase tracking-wider mb-1">
                                // PERFORMANCE DEPTH
                              </span>
                              <span className="text-[10px] font-mono text-[#1f4fff] uppercase font-bold tracking-tight">
                                {project.kpi}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map(tech => (
                            <span
                              key={tech}
                              className="text-[9px] font-mono text-[#111111] bg-white border border-[#111111]/8 px-3 py-1 rounded-sm uppercase tracking-wide"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => onOpenWork(project)}
                          className="cursor-pointer inline-flex items-center gap-2.5 group text-[#1f4fff] hover:text-black font-mono font-extrabold text-[10px] tracking-[0.2em] uppercase transition-colors pt-2"
                        >
                          <span>Explore Case Study</span>
                          <ArrowUpRight className="w-4 h-4 text-[#1f4fff] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ALTERNATING CASE 3: CENTERED WIDESCREEN BANNER STYLE (Velora) */}
                  {layout === "centered-banner" && (
                    <div className="flex flex-col gap-8 md:gap-12">
                      <div className="flex items-center gap-2.5 self-center">
                        <span className="text-[10px] font-mono text-[#ea580c] tracking-widest uppercase font-bold">
                          // THEATRICAL WIDESCREEN EXPERIENCE 03
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-[#ea580c] animate-spin-slow" />
                      </div>

                      {/* Giant full-width widescreen image */}
                      <InteractiveShowcaseFrame
                        imageUrl={project.imageUrl}
                        title={project.title}
                        accent={project.accent}
                        onOpen={() => onOpenWork(project)}
                        onToggleFavorite={(e) => onToggleFavorite(project.id, e)}
                        isFavorited={isFavorited}
                        aspectRatio="aspect-[21/9] sm:aspect-[24/10] md:aspect-[21/9]"
                      />

                      {/* Centered structured metrics and pitch */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto w-full items-start">
                        <div className="lg:col-span-4 flex flex-col gap-1 text-center lg:text-left">
                          <h3 className="text-3xl sm:text-5xl font-sans tracking-tight font-black uppercase text-[#111111]">
                            {project.title}
                          </h3>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                            {project.category} // {project.year}
                          </span>
                        </div>

                        <div className="lg:col-span-5 flex flex-col gap-3">
                          <p className="text-sm sm:text-base text-[#666666] leading-relaxed font-sans font-light text-center lg:text-left">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                            {project.technologies.map(tech => (
                              <span 
                                key={tech}
                                className="text-[8px] font-mono uppercase bg-white border border-[#111111]/8 px-2.5 py-0.5 rounded-sm select-none"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="lg:col-span-3 flex flex-col gap-3 items-center lg:items-end">
                          <div className="text-center lg:text-right border-l-2 lg:border-l-0 lg:border-r-2 border-[#1f4fff] pl-4 lg:pl-0 lg:pr-4">
                            <span className="text-[11px] font-sans font-black text-[#111111] uppercase tracking-wide block">
                              {project.stat}
                            </span>
                            <span className="text-[8px] font-mono text-[#666666] uppercase block tracking-wider">
                              {project.kpi}
                            </span>
                          </div>

                          <button
                            onClick={() => onOpenWork(project)}
                            className="cursor-pointer inline-flex items-center gap-2 group text-[#1f4fff] hover:text-black font-mono font-bold text-[9px] tracking-widest uppercase transition-colors"
                          >
                            <span>Explore Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#1f4fff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ALTERNATING CASE 4: SPLIT EDITORIAL LAYOUT (Nova Labs) */}
                  {layout === "split-editorial" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
                      
                      {/* Left Panel: Whiteboard system metrics */}
                      <div className="lg:col-span-6 p-8 bg-white/70 backdrop-blur-md border border-[#111111]/8 flex flex-col justify-between rounded-sm relative overflow-hidden">
                        
                        <div className="flex flex-col gap-6 relative z-10">
                          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#a855f7] uppercase font-bold">
                            <div className="flex items-center gap-1.5">
                              <Cpu className="w-4 h-4 text-[#a855f7] animate-pulse" />
                              <span>SYSTEM TELEMETRY 04</span>
                            </div>
                            <span>METRICS INDEX</span>
                          </div>

                          <div className="w-full h-[1px] bg-[#111111]/8" />

                          <div className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                              // PROJECT CONTEXT
                            </span>
                            <h3 className="text-3xl sm:text-4xl font-sans font-black uppercase text-[#111111] tracking-tight">
                              {project.title}
                            </h3>
                            <p className="text-xs uppercase font-mono tracking-wider text-[#111111]/60">
                              CLIENT: <span className="text-[#1f4fff] font-bold">{project.client}</span> // {project.category}
                            </p>
                          </div>

                          <p className="text-sm text-[#666666] leading-relaxed font-sans font-light">
                            {project.longPitch}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {project.technologies.map(tech => (
                              <span 
                                key={tech}
                                className="text-[9px] font-mono bg-white border border-[#111111]/8 text-neutral-600 px-2.5 py-1 rounded-sm uppercase font-semibold"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-8 relative z-10">
                          <div className="w-full h-[1px] bg-[#111111]/8" />
                          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#666666] uppercase">
                            <div>{project.kpi}</div>
                            <div className="text-[#1f4fff] font-bold">{project.stat}</div>
                          </div>

                          <button
                            onClick={() => onOpenWork(project)}
                            className="cursor-pointer w-full bg-black text-white hover:bg-[#1f4fff] font-mono text-[10px] tracking-widest uppercase py-3.5 hover:-translate-y-0.5 transition-all text-center rounded-sm font-semibold shadow-sm"
                          >
                            OPEN SYSTEM DIAGNOSTICS
                          </button>
                        </div>
                      </div>

                      {/* Right Panel: Immersive graphic block */}
                      <div className="lg:col-span-6 flex flex-col justify-center">
                        <InteractiveShowcaseFrame
                          imageUrl={project.imageUrl}
                          title={project.title}
                          accent={project.accent}
                          onOpen={() => onOpenWork(project)}
                          onToggleFavorite={(e) => onToggleFavorite(project.id, e)}
                          isFavorited={isFavorited}
                        />
                      </div>
                    </div>
                  )}

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* BOTTOM METRIC ARCHIVES RE-ENGAGE BUTTON */}
        <div className="flex justify-center items-center mt-28">
          <button 
            onClick={() => {
              const contactRef = document.getElementById("contact");
              if (contactRef) contactRef.scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer flex items-center gap-3 border border-[#111111]/10 bg-white/45 hover:bg-white hover:border-[#1f4fff] text-[#111111] font-mono text-[9px] tracking-[0.2em] uppercase px-10 py-5 rounded-sm transition-all duration-500 shadow-sm"
          >
            <RefreshCw className="w-4 h-4 animate-spin-slow text-[#1f4fff]" />
            <span>Request Full Portfolio Archives</span>
          </button>
        </div>

      </div>
    </section>
  );
}
