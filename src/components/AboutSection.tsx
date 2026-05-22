import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { 
  Sparkles, 
  ArrowDownRight, 
  Cpu, 
  Activity, 
  Zap, 
  Layers, 
  Eye, 
  Terminal, 
  Compass, 
  Maximize2 
} from "lucide-react";
import { premiumSynth } from "../utils/audio";

// Beautiful glowing particle in light theme
interface FloatingParticle {
  id: number;
  left: number;
  top: number;
  size: number;
  factor: number;
  duration: number;
  color: string;
}

// Separate component for particle elements to isolate scroll/mouse useTransform hooks and protect the Rules of Hooks
interface ParticleElementProps {
  particle: FloatingParticle;
  springMouseX: any;
  springMouseY: any;
  key?: any;
}

function ParticleElement({ particle, springMouseX, springMouseY }: ParticleElementProps) {
  const parallaxX = useTransform(springMouseX, [-1, 1], [-40 * particle.factor, 40 * particle.factor]);
  const parallaxY = useTransform(springMouseY, [-1, 1], [-40 * particle.factor, 40 * particle.factor]);

  return (
    <motion.div
      style={{
        left: `${particle.left}%`,
        top: `${particle.top}%`,
        width: particle.size,
        height: particle.size,
        x: parallaxX,
        y: parallaxY,
        willChange: "transform, opacity"
      }}
      animate={{
        y: [0, -50, 0],
        opacity: [0.12, 0.4, 0.12]
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute rounded-full ${particle.color} blur-[2px] pointer-events-none transform-gpu`}
    />
  );
}

// ----------------------------------------------------
// THE CINEMATIC WORD-BY-WORD REVEAL STYLES
// ----------------------------------------------------
interface RevealWordProps {
  word: string;
  index: number;
  total: number;
  progress: any;
  activeRange: [number, number, number, number];
  highlight: boolean;
  danger: boolean;
  key?: any;
}

function RevealWord({ word, index, total, progress, activeRange, highlight, danger }: RevealWordProps) {
  const [startIn, fullyIn, startOut, fullyOut] = activeRange;
  
  // Calculate specific entry timelines for staggered word entrance
  const entryDuration = fullyIn - startIn;
  const wordStep = entryDuration / total;
  const wordStart = startIn + index * wordStep * 0.7; // slight overlap for rhythm
  const wordEnd = Math.min(fullyIn, wordStart + wordStep * 1.4);

  // Smooth scroll translations for opacity and coordinate shifts
  const opacity = useTransform(
    progress,
    [startIn, wordStart, wordEnd, startOut, fullyOut],
    [0, 0.10, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [startIn, wordStart, wordEnd, startOut, fullyOut],
    [45, 20, 0, 0, -45]
  );

  const blurValue = useTransform(
    progress,
    [startIn, wordStart, wordEnd, startOut, fullyOut],
    ["7px", "4px", "0px", "0px", "7px"]
  );

  const scaleValue = useTransform(
    progress,
    [startIn, wordStart, wordEnd, startOut, fullyOut],
    [0.95, 0.98, 1, 1, 1.05]
  );

  // Decide colors and luxury styles based on highlighted / danger traits
  let textStyle = "text-zinc-800 font-extrabold";
  if (danger) {
    textStyle = "text-red-600 font-extrabold tracking-tight";
  } else if (highlight) {
    textStyle = "text-[#1f4fff] font-extrabold";
  }

  return (
    <motion.span
      style={{
        opacity,
        y,
        filter: useTransform(blurValue, (v) => `blur(${v})`),
        scale: scaleValue,
        display: "inline-block",
        willChange: "transform, opacity, filter"
      }}
      className={`mr-[0.3em] relative transform-gpu select-text cursor-default leading-tight backface-hidden ${textStyle}`}
    >
      {word}
      {highlight && (
        <motion.span
          className="absolute inset-x-0 bottom-1 h-[4px] bg-gradient-to-r from-[#1f4fff] via-emerald-400 to-[#1f4fff] origin-left rounded-full transform-gpu"
          style={{
            scaleX: useTransform(progress, [wordStart, wordEnd], [0, 1]),
            transformOrigin: "left",
            willChange: "transform"
          }}
        />
      )}
      {danger && (
        <motion.span
          className="absolute inset-x-0 -bottom-1 h-[2px] bg-red-500/30 blur-[1px] origin-center transform-gpu"
          style={{
            scaleX: useTransform(progress, [wordStart, wordEnd], [0, 1.1]),
            willChange: "transform"
          }}
        />
      )}
    </motion.span>
  );
}

// Handles drawing full sentences bound to scrolling ranges
interface CinematicStoryLineProps {
  text: string;
  progress: any;
  activeRange: [number, number, number, number];
  highlight?: boolean;
  danger?: boolean;
  key?: any;
}

function CinematicStoryLine({ text, progress, activeRange, highlight = false, danger = false }: CinematicStoryLineProps) {
  const words = text.split(" ");
  
  // Entire container is absolute to stack sentences in the physical center of viewport
  const containerOpacity = useTransform(progress, activeRange, [0, 1, 1, 0]);
  const pointerEvents = useTransform(containerOpacity, (v) => v > 0.1 ? "auto" : "none");

  // Smooth letter-spacing
  const letterSpacing = useTransform(progress, activeRange, ["0.02em", "0em", "0em", "-0.01em"]);

  return (
    <motion.div
      style={{
         opacity: containerOpacity,
         pointerEvents,
         letterSpacing
      }}
      className="absolute inset-0 flex flex-wrap items-center justify-center text-center px-6 md:px-12 select-none z-10"
    >
      <div className="max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black uppercase tracking-tight leading-none text-center flex flex-wrap justify-center">
        {words.map((word, idx) => (
          <RevealWord
            key={idx}
            word={word}
            index={idx}
            total={words.length}
            progress={progress}
            activeRange={activeRange}
            highlight={highlight}
            danger={danger}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// THE 3D GLASSMORPHISM CARD COMPONENT
// ----------------------------------------------------
interface GlassCardProps {
  index: number;
  mouseX: any;
  mouseY: any;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  status: string;
  desc: string;
}

function FloatingGlassCard({ index, mouseX, mouseY, title, subtitle, icon, status, desc }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Micro scale and perspective tilts matching top Awwwards design mechanics
  const rotateX = useTransform(mouseY, [-1, 1], [12, -12]);
  const rotateY = useTransform(mouseX, [-1, 1], [-12, 12]);
  
  const translateX = useTransform(mouseX, [-1, 1], [-15 * index, 15 * index]);
  const translateY = useTransform(mouseY, [-1, 1], [-15 * index, 15 * index]);

  const handleCardHover = () => {
    try {
      premiumSynth.playClick();
    } catch (err) {}
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={handleCardHover}
      style={{
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
        willChange: "transform"
      }}
      className="relative rounded-2xl bg-white/40 border border-white/60 p-8 shadow-[0_24px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(31,79,255,0.08)] backdrop-blur-xl flex flex-col justify-between group overflow-hidden transition-all duration-500 hover:border-white/90 hover:bg-white/60 transform-gpu"
    >
      {/* Glossy light-beam sweep overlay reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#ffffff]/50 to-transparent pointer-events-none z-0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-[1800ms] ease-out" />

      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col gap-5 relative z-10 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1f4fff] animate-ping" />
            <span className="text-[8px] font-mono text-zinc-500 font-extrabold uppercase tracking-[0.2em]">
              {status} // DECK_X{index}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center border border-white/80 group-hover:bg-[#1f4fff] group-hover:border-[#1f4fff] transition-colors duration-300">
            <div className="group-hover:text-white text-zinc-700 transition-colors duration-300">
              {icon}
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-zinc-200" />

        <div className="flex flex-col gap-1 pt-1.5">
          <span className="text-[8px] font-mono text-[#1f4fff] uppercase tracking-widest font-black block">
            {subtitle}
          </span>
          <h4 className="text-xl font-sans font-black uppercase text-zinc-900 tracking-tight leading-none leading-relaxed">
            {title}
          </h4>
        </div>

        <p className="text-zinc-600 text-xs font-light lowercase leading-relaxed">
          {desc}
        </p>
      </div>

      <div style={{ transform: "translateZ(45px)" }} className="flex flex-col gap-3 relative z-10 mt-auto">
        <div className="h-[1px] bg-zinc-100" />
        <div className="flex justify-between items-center text-[8px] font-mono uppercase text-zinc-400">
          <span>PIXEL PERFECT COMPILER</span>
          <span className="text-[#1f4fff] font-bold">NVRMND ENGINE v5.0</span>
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// MAIN ABOUT SECTION COMPONENT
// ----------------------------------------------------
export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  // Smooth scroll tracking parameters via Framer Motion useScroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth dampening to prevent stutters on high refresh rate monitors
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 28,
    damping: 24,
    mass: 0.8,
    restDelta: 0.0001
  });

  // Interactive mouse variables for spatial coordinates calculations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springMouseX = useSpring(mouseX, { stiffness: 25, damping: 22 });
  const springMouseY = useSpring(mouseY, { stiffness: 25, damping: 22 });

  // Generate atmospheric pastel colored dust elements
  useEffect(() => {
    const palette = ["bg-[#1f4fff]/20", "bg-emerald-500/20", "bg-indigo-500/20", "bg-sky-500/15"];
    const list: FloatingParticle[] = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      factor: Math.random() * 0.5 + 0.15,
      duration: Math.random() * 8 + 4,
      color: palette[i % palette.length]
    }));
    setParticles(list);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xVal = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const yVal = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Soundscape Intersection triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            try {
              premiumSynth.playSweep();
            } catch (err) {}
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Multi-stage Story text sentences coordinates and ranges mapping
  const timeline = [
    {
      text: "Most websites just sit there.",
      range: [0.03, 0.09, 0.15, 0.20] as [number, number, number, number],
      highlight: false,
      danger: false
    },
    {
      text: "But yours is about to be the talk of the town.",
      range: [0.18, 0.24, 0.30, 0.35] as [number, number, number, number],
      highlight: true,
      danger: false
    },
    {
      text: "Right now, your website might be the thing holding you back.",
      range: [0.33, 0.39, 0.45, 0.50] as [number, number, number, number],
      highlight: false,
      danger: false
    },
    {
      text: "It doesn't position you as the premium choice.",
      range: [0.48, 0.54, 0.60, 0.65] as [number, number, number, number],
      highlight: false,
      danger: false
    },
    {
      text: "And every dream client who lands on it...",
      range: [0.63, 0.69, 0.75, 0.80] as [number, number, number, number],
      highlight: false,
      danger: false
    },
    {
      text: "just walks away.",
      range: [0.78, 0.84, 0.94, 0.98] as [number, number, number, number],
      highlight: false,
      danger: true
    }
  ];

  // Camera-like subtle section background and frame scaling during progression
  const scaleCamera = useTransform(smoothProgress, [0, 0.5, 0.98], [0.98, 1.02, 0.98]);
  const sectionOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.85, 1, 1, 0.85]);

  // Orbiting glow colors drifting across light environment
  const orbX1 = useTransform(springMouseX, [-1, 1], [-80, 80]);
  const orbY1 = useTransform(springMouseY, [-1, 1], [-80, 80]);

  const orbX2 = useTransform(springMouseX, [-1, 1], [70, -70]);
  const orbY2 = useTransform(springMouseY, [-1, 1], [70, -70]);

  const orbScale = useTransform(smoothProgress, [0, 0.5, 1], [0.93, 1.08, 0.93]);

  // Final Showcase presentation container reveal state (starts fading in around progress 0.85)
  const finalStageOpacity = useTransform(smoothProgress, [0.83, 0.89, 0.98, 1], [0, 1, 1, 0]);
  const finalStageY = useTransform(smoothProgress, [0.83, 0.89], [90, 0]);
  const finalStageScale = useTransform(smoothProgress, [0.83, 0.89], [0.94, 1]);

  return (
    <section
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: sectionOpacity }}
      className="relative min-h-[480vh] bg-[#e9e9e9] text-zinc-900 border-t border-b border-zinc-300/40 overflow-visible select-none"
    >
      {/* STICKY HORIZON VIEWPORT */}
      <motion.div 
        style={{ scale: scaleCamera, willChange: "transform" }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center z-10 transform-gpu"
      >
        {/* LIGHT THEMATIC GRID LAYER */}
        <div 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }}
          className="absolute inset-0 pointer-events-none z-0 opacity-70"
        />

        {/* FINE HORIZONTAL GRIDS (Parallax effect) */}
        <motion.div
          style={{
            y: useTransform(smoothProgress, [0, 1], [-120, 120])
          }}
          className="absolute inset-x-0 h-full pointer-events-none z-0 border-t border-b border-zinc-400/[0.07] flex flex-col justify-between"
        >
          <div className="w-full h-[1px] bg-zinc-400/[0.08]" />
          <div className="w-full h-[1px] bg-zinc-400/[0.08]" />
          <div className="w-full h-[1px] bg-zinc-400/[0.08]" />
        </motion.div>

        {/* GRAIN LAYER */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none z-0" />

        {/* CURSOR SPOTLIGHT TRACKER */}
        <motion.div
          style={{
            x: useTransform(springMouseX, [-1, 1], [-150, 150]),
            y: useTransform(springMouseY, [-1, 1], [-150, 150]),
            background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 60%)"
          }}
          className="absolute w-[450px] h-[450px] rounded-full pointer-events-none blur-xl z-0 mix-blend-screen opacity-65"
        />

        {/* BLUE GLOW HALO */}
        <motion.div
          style={{
            x: orbX1,
            y: orbY1,
            scale: orbScale,
            background: "radial-gradient(circle, rgba(31,79,255,0.08) 0%, transparent 65%)"
          }}
          className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none blur-[110px] z-0"
        />

        {/* GREEN GLOW HALO */}
        <motion.div
          style={{
            x: orbX2,
            y: orbY2,
            scale: orbScale,
            background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 65%)"
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none blur-[100px] z-0"
        />

        {/* ATMOSPHERIC COMPLEMENTARY PARTICLES */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {particles.map((particle) => (
            <ParticleElement
              key={particle.id}
              particle={particle}
              springMouseX={springMouseX}
              springMouseY={springMouseY}
            />
          ))}
        </div>

        {/* PHYSICAL PROGRESS SWEEP (GLOSSY LIGHT SHEER) */}
        <motion.div
          style={{
            y: useTransform(smoothProgress, [0, 1], ["-40%", "140%"])
          }}
          className="absolute left-0 right-0 h-48 bg-gradient-to-b from-transparent via-white/40 to-transparent blur-3xl pointer-events-none z-1"
        />

        {/* EDITORIAL HEADER HUD */}
        <div className="absolute top-10 left-6 sm:left-12 right-6 sm:right-12 flex justify-between items-center text-zinc-400 font-mono text-[9px] tracking-[0.25em] z-20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1f4fff]" />
            <span className="text-zinc-600 font-bold uppercase">// STORYTELLING PROGRESSION</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-zinc-500">
            <span>STABLE FPS CHOREOGRAPHY CODE</span>
            <span>COORDINATION INDEX: 0x582A</span>
          </div>
        </div>

        {/* PROGRESS HUD BAR */}
        <div className="absolute bottom-10 left-6 sm:left-12 right-6 sm:right-12 flex justify-between items-end z-20">
          <div className="flex flex-col gap-1.5">
            <span className="text-[8px] font-mono text-[#1f4fff] font-black uppercase tracking-[0.2em]">// ATMOSPHERE LEVEL_5</span>
            <div className="w-[120px] h-[3px] bg-zinc-300/60 rounded-full overflow-hidden">
              <motion.div 
                style={{
                  scaleX: smoothProgress,
                  transformOrigin: "left"
                }}
                className="h-full w-full bg-[#1f4fff]"
              />
            </div>
          </div>
          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
            AWARDS-GRADE FRONTEND SHIFT
          </span>
        </div>

        {/* ----------------------------------------------------
            TYPOGRAPHY PRESENTATION PIPELINE 
           ---------------------------------------------------- */}
        <div className="relative w-full h-[60vh] flex items-center justify-center">
          {timeline.map((item, idx) => (
            <CinematicStoryLine
              key={idx}
              text={item.text}
              progress={smoothProgress}
              activeRange={item.range}
              highlight={item.highlight}
              danger={item.danger}
            />
          ))}
        </div>

        {/* ----------------------------------------------------
            STAGE 5: FINAL SHOWCASE (PROGRESSIVE FADE-IN)
           ---------------------------------------------------- */}
        <motion.div
          style={{
            opacity: finalStageOpacity,
            y: finalStageY,
            scale: finalStageScale,
            transformStyle: "preserve-3d"
          }}
          className="absolute inset-0 flex flex-col justify-center items-center z-20 px-6 max-w-7xl mx-auto w-full"
        >
          {/* Main message header block */}
          <div className="text-center max-w-3xl mb-16 px-4">
            <motion.p className="text-[#1f4fff] font-mono text-xs font-black tracking-[0.25em] uppercase mb-4 inline-block">
              ✦ // INTRODUCING THE SOLUTION
            </motion.p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black uppercase tracking-tight text-zinc-950 mb-6 leading-none">
              RESTORING MAJESTY TO YOUR WORK
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base md:text-lg leading-relaxed font-light lowercase">
              NVRMND creates immersive digital experiences where motion, storytelling, and interaction come together to build unforgettable brands.
            </p>
          </div>

          {/* Three Stunning 3D Glassmorphism Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
            <FloatingGlassCard
              index={1}
              mouseX={springMouseX}
              mouseY={springMouseY}
              title="Interactive Motion"
              subtitle="The Cinematic Philosophy"
              icon={<Zap className="w-5 h-5 text-[#1f4fff]" />}
              status="ACTIVE"
              desc="We abandon static editorial templates. Interfaces evolve, sliding gracefully through dynamic coordinate planes."
            />

            <FloatingGlassCard
              index={2}
              mouseX={springMouseY} // inverse axes for parallax contrast
              mouseY={springMouseX}
              title="Spring Damper Physics"
              subtitle="The Smooth Integration"
              icon={<Layers className="w-5 h-5 text-emerald-500" />}
              status="CALIBRATED"
              desc="Micro-interactions are governed by accurate physical equations, eliminating digital stutter and frame jitter."
            />

            <FloatingGlassCard
              index={3}
              mouseX={springMouseX}
              mouseY={springMouseY}
              title="Creative Engineering"
              subtitle="The Global Standard"
              icon={<Cpu className="w-5 h-5 text-indigo-500" />}
              status="GLOBAL"
              desc="Engineered directly inside React and Framer Motion to produce Awwwards-level performance and elegant memory cycles."
            />
          </div>

          {/* Luxury Transition CTA block */}
          <div className="mt-16 flex flex-col items-center">
            <button
              onClick={() => {
                const workSec = document.getElementById("work");
                if (workSec) {
                  workSec.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="cursor-pointer group flex items-center gap-4 bg-zinc-950 text-white font-mono text-[10px] tracking-[0.25em] uppercase font-black px-8 py-4 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:bg-[#1f4fff] hover:shadow-[0_25px_45px_rgba(31,79,255,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>DISCOVER PREMIUM WORK</span>
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/20 transition-all group-hover:bg-white group-hover:scale-110">
                <ArrowDownRight className="w-3.5 h-3.5 text-white group-hover:text-[#1f4fff] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
