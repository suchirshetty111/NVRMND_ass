import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, ArrowRight, Circle, Sparkles, Terminal } from "lucide-react";
import { EASE_CINEMATIC, containerStagger, fadeUp } from "../utils/animations";
import { premiumSynth } from "../utils/audio";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 600], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 450], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const element = heroRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const handleScrollDown = () => {
    try {
      premiumSynth.playSweep();
    } catch (e) {}
    const introSection = document.getElementById("intro");
    if (introSection) {
      introSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-screen bg-[#e9e9e9] text-[#111111] flex flex-col justify-between overflow-hidden px-6 md:px-12 pt-32 pb-12"
    >
      {/* Subtle editorial vertical and horizontal grid lines for premium feel */}
      <div className="absolute inset-0 bg-[#linear-gradient(to_right,rgba(17,17,17,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.015)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none z-[1]" />
      <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-[#111111]/[0.02] pointer-events-none z-[1]" />
      <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-[#111111]/[0.02] pointer-events-none z-[1]" />
      <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-[#111111]/[0.02] pointer-events-none z-[1]" />

      {/* Floating Interactive Blur Gradient pointer tracker */}
      <div 
        className="absolute pointer-events-none rounded-full filter blur-[100px] transition-opacity duration-1000 z-[2] mix-blend-multiply"
        style={{
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(31, 79, 255, 0.05) 0%, rgba(217, 255, 114, 0.03) 60%, rgba(0,0,0,0) 100%)",
          left: `${mousePosition.x - 175}px`,
          top: `${mousePosition.y - 175}px`,
          opacity: isHovered ? 1 : 0.4,
          position: "absolute",
        }}
      />

      {/* BACKGROUND MOTION: Slow Moving Blur Light Blobs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[#1f4fff]/5 filter blur-[95px] pointer-events-none z-[1]"
      />
      
      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 50, -40, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/10 w-[420px] h-[420px] rounded-full bg-[#d9ff72]/8 filter blur-[110px] pointer-events-none z-[1]"
      />

      {/* Real ambient dust noise grain feeling overlay */}
      <div className="absolute inset-0 bg-noise-texture pointer-events-none opacity-[0.02] mix-blend-difference" />

      {/* Main Content Area */}
      <motion.div
        style={{ y: yBg, opacity: opacityText }}
        variants={containerStagger(0.12, 0.15)}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto flex-grow flex flex-col justify-center items-stretch mt-12 mb-16"
      >
        
        {/* Core Split Storytelling Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* LEFT: Massive Editorial Typography block (cols 8) */}
          <div className="lg:col-span-8 flex flex-col justify-end select-none">
            
            {/* Super Head Tagline */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-4 text-[#1f4fff] font-mono text-[10px] sm:text-[11px] font-extrabold tracking-[0.3em] uppercase"
            >
              <Terminal className="w-4 h-4 text-[#1f4fff]" />
              <span>STB. NVRMND WORLDWIDE // EDITION 2026</span>
            </motion.div>

            {/* Title container with very tight letter spacing block */}
            <div className="flex flex-col tracking-[-0.035em] leading-[0.88] text-left">
              <div className="overflow-hidden py-1">
                <motion.span
                  variants={fadeUp}
                  className="block text-4xl sm:text-6xl md:text-8xl font-display font-black text-[#111111]"
                >
                  TURN YOUR
                </motion.span>
              </div>

              <div className="overflow-hidden py-1">
                <motion.div
                  variants={fadeUp}
                  className="flex flex-wrap items-center gap-3 md:gap-5"
                >
                  <span className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-[#111111]">
                    TRAFFIC INTO
                  </span>
                  
                  {/* Outlined framed word "BOOKED" with responsive layout */}
                  <div className="relative inline-block px-4 md:px-6 py-1 mx-1 rounded-sm border-[1.5px] border-[#1f4fff] bg-transparent">
                    <span className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-[#1f4fff] tracking-wide relative z-10">
                      BOOKED
                    </span>
                    {/* Corner accents */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#1f4fff]" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#d9ff72]" />
                  </div>
                </motion.div>
              </div>

              <div className="overflow-hidden py-1">
                <motion.span
                  variants={fadeUp}
                  className="block text-4xl sm:text-6xl md:text-8xl font-display font-black text-[#111111]"
                >
                  DREAM CLIENTS.
                </motion.span>
              </div>
            </div>

          </div>

          {/* RIGHT: Sophisticated Agency Description Paragraph (cols 4) */}
          <div className="lg:col-span-4 flex flex-col items-start gap-8 lg:pl-4 mb-2">
            
            <motion.p
              variants={fadeUp}
              className="text-sm md:text-base text-[#666666] leading-relaxed font-sans font-light"
            >
              We build custom websites for creative founders who have attention but not enough bookings — turning your traffic into a brand experience that educates, qualifies, and converts dream clients.
            </motion.p>

            {/* LET'S BUILD YOURS Creative Trigger Button with Arrow */}
            <motion.div variants={fadeUp} className="w-full sm:w-auto">
              <button
                onClick={() => {
                  try {
                    premiumSynth.playSweep();
                  } catch (e) {}
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="cursor-pointer w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 text-[11px] font-mono font-extrabold tracking-[0.25em] uppercase bg-[#1f4fff] text-white hover:bg-[#111111] hover:text-white border-2 border-transparent px-8 py-4.5 rounded-none transition-all duration-300 shadow-[4px_4px_0px_rgba(17,17,17,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                <span>LET'S BUILD YOURS</span>
                <ArrowRight className="w-4 h-4 text-[#d9ff72]" />
              </button>
            </motion.div>

          </div>

        </div>

      </motion.div>

      {/* BOTTOM CONTENT STATEMENTS BAR */}
      <div className="relative z-10 w-full max-w-7xl mx-auto border-t border-[#111111]/8 pt-6 pb-2 text-[10px] font-mono tracking-widest text-[#666666]/80 flex flex-col sm:flex-row justify-between items-center gap-4 uppercase select-none">
        
        {/* LEFT BRANDING LINKS */}
        <div className="flex items-center gap-2">
          <a 
            href="https://www.instagram.com/suchirshetty_45?igsh=MXcwaGxuaGpjOGdpZQ==" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-[#111111] hover:underline"
          >
            INSTAGRAM
          </a>
          <span className="text-neutral-400">·</span>
          <a 
            href="https://www.linkedin.com/in/shenishetty-suchir-452301349?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-[#111111] hover:underline"
          >
            LINKEDIN
          </a>
        </div>

        {/* CENTER SCROLL DOWN TRIGGER KEY */}
        <button
          onClick={handleScrollDown}
          className="group cursor-pointer flex items-center gap-2.5 text-[#1f4fff] hover:text-[#111111] transition-colors focus:ring-0 focus:outline-none"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-5 rounded-full bg-[#1f4fff]/10 flex items-center justify-center text-[#1f4fff]"
          >
            <ArrowDown className="w-3 h-3 text-[#1f4fff]" />
          </motion.div>
          <span>SCROLL DOWN</span>
        </button>

        {/* RIGHT DIRECT SUPPORT MAILTO COORD */}
        <div className="flex items-center gap-2">
          <Circle className="w-1.5 h-1.5 bg-[#1f4fff] rounded-full inline-block animate-pulse" />
          <a 
            href="mailto:kanza@nvrmndstudio.com" 
            className="text-[#1f4fff] hover:text-[#111111] font-semibold tracking-wider font-mono hover:underline transition-colors"
          >
            KANZA@NVRMNDSTUDIO.COM
          </a>
        </div>

      </div>

    </section>
  );
}
