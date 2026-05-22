import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, CornerDownLeft, Circle, Sparkles, Terminal } from "lucide-react";
import { EASE_CINEMATIC } from "../utils/animations";
import { premiumSynth } from "../utils/audio";
import AnimatedText from "./AnimatedText";

interface IntroLoaderProps {
  onComplete: () => void;
  key?: string;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [phase, setPhase] = useState<"blackIn" | "sequence1" | "sequence2" | "sequence3" | "completed">("blackIn");
  const [hasClickedSkip, setHasClickedSkip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // -----------------------------------------------------------------
    // TIMELINE CONFIGURATION
    // Phase durations carefully chosen for an optimal editorial rhythm
    // -----------------------------------------------------------------
    
    // Step 0 -> Step 1: Black overlay fades away, NVRMND logo reveals
    const timer1 = setTimeout(() => {
      setPhase("sequence1");
      try {
        premiumSynth.playSweep();
      } catch (e) {
        // Safe check for browser audio restriction
      }
    }, 800);

    // Step 1 -> Step 2: NVRMND fades out, CREATIVE DIGITAL EXPERIENCES appears
    const timer2 = setTimeout(() => {
      setPhase("sequence2");
    }, 3200);

    // Step 2 -> Step 3: Transition to final statement (TURN YOUR TRAFFIC...)
    const timer3 = setTimeout(() => {
      setPhase("sequence3");
    }, 5800);

    // Step 3 -> Autoplay complete: Smooth transition into raw homepage
    const timer4 = setTimeout(() => {
      if (!hasClickedSkip) {
        handleTriggerComplete();
      }
    }, 10200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [hasClickedSkip]);

  const handleTriggerComplete = () => {
    setHasClickedSkip(true);
    setPhase("completed");
    try {
      premiumSynth.playSweep();
    } catch (e) {}
    
    // Smooth delay before unmounting the preloader overlay
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <motion.div
      ref={containerRef}
      id="intro-loader"
      initial={{ opacity: 1 }}
      animate={phase === "completed" ? {
        opacity: 0,
        y: -100,
        filter: "blur(15px)",
        transition: { duration: 1.0, ease: EASE_CINEMATIC }
      } : { opacity: 1 }}
      className="fixed inset-0 z-[9999] bg-[#e9e9e9] text-[#111111] overflow-hidden select-none font-display flex flex-col justify-between p-6 sm:p-10 md:p-14"
    >
      {/* ----------------- SUBTLE NOISE GRAIN TEXTURE REVEAL ----------------- */}
      <div className="absolute inset-0 bg-noise-texture pointer-events-none opacity-[0.035] mix-blend-multiply z-2" />

      {/* ----------------- EDITORIAL SUBTLE GRID OVERLAYS ----------------- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,17,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.025)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none z-[1] [mask-image:radial-gradient(circle_at_center,white_80%,transparent_100%)]" />

      {/* ----------------- MULTI-DIRECTIONAL ROTATING AMBIENT GLOW BLOBS ----------------- */}
      <motion.div
        animate={{
          x: [0, 80, -50, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/6 left-1/12 w-[350px] h-[350px] rounded-full bg-[#1f4fff]/7 filter blur-[100px] pointer-events-none z-[1]"
      />

      <motion.div
        animate={{
          x: [0, -70, 60, 0],
          y: [0, 50, -60, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/6 right-1/12 w-[400px] h-[400px] rounded-full bg-[#d9ff72]/8 filter blur-[110px] pointer-events-none z-[1]"
      />

      {/* ----------------- INITIAL BLACK SCREEN FADE-IN LAYER ----------------- */}
      {phase === "blackIn" && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
          className="absolute inset-0 bg-black z-50 pointer-events-none"
        />
      )}

      {/* ----------------- MINIMALIST LUXURY CORNER HEADERS ----------------- */}
      <div className="relative z-10 w-full flex justify-between items-start text-[10px] font-mono tracking-[0.25em] text-[#111111]/50 uppercase">
        <div className="flex items-center gap-2.5">
          <motion.span 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-1.5 h-1.5 border border-[#111111]/40 rounded-sm inline-block"
          />
          <span className="font-semibold text-[#111111]/70">NVRMND CONCEPT CORE®</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span>STB: LIGHT_THEME_STUDIO_REEL</span>
          <span>// 2026 EDITION</span>
        </div>
      </div>

      {/* ----------------- MAIN CINEMATIC PRESENTATION ENGINE ----------------- */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full max-w-6xl mx-auto h-full min-h-[350px]">
        
        <AnimatePresence mode="wait">
          
          {/* SEQUENCE 1: "NVRMND" Brand Logo Reveal */}
          {phase === "sequence1" && (
            <motion.div
              key="seq1"
              initial={{ opacity: 0, filter: "blur(20px)", scale: 0.92 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(15px)", scale: 1.05 }}
              transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
              className="flex flex-col items-center gap-4 text-center select-none"
            >
              <div className="flex items-center gap-4 font-display font-extrabold tracking-[0.4em] leading-[0.95] text-4xl sm:text-6xl md:text-8xl text-[#111111]">
                <span>NVRMND</span>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-[10px] sm:text-[11px] uppercase font-mono tracking-[0.35em] text-[#1f4fff]"
              >
                // IMMERSIVE DESIGN AGENCY //
              </motion.div>
            </motion.div>
          )}

          {/* SEQUENCE 2: "CREATIVE" "DIGITAL" "EXPERIENCES" */}
          {phase === "sequence2" && (
            <motion.div
              key="seq2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center max-w-4xl"
            >
              <div className="flex flex-col gap-1 md:gap-3">
                <div className="overflow-hidden h-[50px] sm:h-[80px] md:h-[110px]">
                  <motion.h1
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: EASE_CINEMATIC }}
                    className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold tracking-tighter text-[#111111] leading-none uppercase"
                  >
                    CREATIVE
                  </motion.h1>
                </div>
                <div className="overflow-hidden h-[50px] sm:h-[80px] md:h-[110px]">
                  <motion.h1
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.25, ease: EASE_CINEMATIC }}
                    className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold tracking-tighter text-[#111111] leading-none uppercase"
                  >
                    DIGITAL
                  </motion.h1>
                </div>
                <div className="overflow-hidden h-[50px] sm:h-[80px] md:h-[110px]">
                  <motion.h1
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.4, ease: EASE_CINEMATIC }}
                    className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold tracking-tighter text-[#1f4fff] leading-none uppercase"
                  >
                    EXPERIENCES
                  </motion.h1>
                </div>
              </div>
            </motion.div>
          )}

          {/* SEQUENCE 3: "TURN YOUR TRAFFIC INTO BOOKED DREAM CLIENTS" */}
          {phase === "sequence3" && (
            <motion.div
              key="seq3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center text-center w-full max-w-5xl"
            >
              {/* Detailed Agency Metrics Accent */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#1f4fff] uppercase mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>NVRMND MISSION CORE</span>
              </motion.div>

              {/* Tightly and beautifully configured editorial lines */}
              <div className="flex flex-col gap-1 sm:gap-2 select-none tracking-tight leading-[0.95]">
                <div className="overflow-hidden h-[40px] sm:h-[65px] md:h-[90px]">
                  <motion.span
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: EASE_CINEMATIC }}
                    className="block text-3xl sm:text-5xl md:text-7xl font-display font-bold text-[#111111]"
                  >
                    TURN YOUR TRAFFIC
                  </motion.span>
                </div>

                <div className="overflow-hidden h-[55px] sm:h-[80px] md:h-[110px] flex justify-center items-center">
                  <motion.div
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: EASE_CINEMATIC }}
                    className="flex justify-center items-center gap-4 py-1"
                  >
                    <span className="text-3xl sm:text-5xl md:text-7xl font-display font-bold text-[#111111]">
                      INTO
                    </span>
                    
                    {/* Glowing blue outlined rectangular box for "BOOKED" */}
                    <div className="relative inline-block px-4 sm:px-6 py-1 sm:py-2 mx-1 rounded-sm bg-transparent">
                      <span className="text-3xl sm:text-5xl md:text-7xl font-display font-black text-[#1f4fff] tracking-wide relative z-20">
                        BOOKED
                      </span>

                      {/* Frame container bounding line border */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.rect
                          x="0.5"
                          y="0.5"
                          width="99"
                          height="99"
                          rx="4"
                          fill="none"
                          stroke="#1f4fff"
                          strokeWidth="2.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, delay: 1.0, ease: "easeInOut" }}
                        />
                      </svg>

                      {/* Accent flashing green circle locator */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.2, duration: 0.5 }}
                        className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#d9ff72] border-2 border-[#111111] rounded-full z-20"
                        title="CONSOLIDATED TARGET"
                      >
                        <span className="absolute inset-0 rounded-full bg-[#d9ff72] animate-ping opacity-75" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                <div className="overflow-hidden h-[40px] sm:h-[65px] md:h-[90px]">
                  <motion.span
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: EASE_CINEMATIC }}
                    className="block text-3xl sm:text-5xl md:text-7xl font-display font-bold text-[#111111]"
                  >
                    DREAM CLIENTS
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* ----------------- MINIMAL SCI-FI COORDINATE ACCENTS ----------------- */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-500 font-mono text-[9px] tracking-widest uppercase border-t border-[#111111]/8 pt-5">
        <div className="flex items-center gap-4">
          <span className="text-[#111111]/70 font-semibold">[COORD: 45.46° N, 9.19° E]</span>
          <span className="hidden sm:inline text-neutral-300">|</span>
          <span className="hidden sm:inline">STATE: HIGH_STABILITY</span>
        </div>

        {/* Bouncing Scroll / Skip Indicator */}
        <AnimatePresence>
          {(phase === "sequence3" || phase === "sequence2") && (
            <motion.button
              onClick={handleTriggerComplete}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
              className="cursor-pointer group flex items-center gap-3 text-[#1f4fff] hover:text-[#111111] transition-colors focus:outline-none focus:ring-0 active:scale-95"
            >
              <span className="text-[10px] tracking-[0.35em] font-extrabold uppercase">SCROLL DOWN</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-7 h-7 rounded-full bg-[#1f4fff]/10 flex items-center justify-center text-[#1f4fff] group-hover:bg-[#1f4fff] group-hover:text-white transition-all"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          <Circle className="w-2 h-2 text-[#1f4fff] fill-[#1f4fff]" />
          <span>Framer Live Motion Layer</span>
        </div>
      </div>
    </motion.div>
  );
}
