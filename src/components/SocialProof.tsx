import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight, Cpu, Star, Sparkles } from "lucide-react";
import { EASE_CINEMATIC } from "../utils/animations";
import { premiumSynth } from "../utils/audio";

export default function SocialProof() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const clientLogos = [
    { name: "KRONOS", sub: "AUTOMOTIVE", symbol: "🜲" },
    { name: "ÆTHER", sub: "COLLECTIVE", symbol: "✦" },
    { name: "CYPHER", sub: "SECURITY", symbol: "⚙" },
    { name: "VOXEL", sub: "LABS SYSTEMS", symbol: "◈" },
    { name: "SONAR", sub: "CO. ACOUSTICS", symbol: "⎊" },
    { name: "OBLIVION", sub: "INTELLIGENCE", symbol: "▲" }
  ];

  const testimonials = [
    {
      quote: "NVRMND operates at the intersection of design, emotion, and technical perfection. They built a custom real-time configurator that increased our consumer engagement by 320% and completely redefined our digital brand standard.",
      author: "Marcus Vance",
      role: "Lead Creative Director",
      company: "KRONOS MOTORWERKS",
      rating: 5,
      spec: "[LATENCY: 14ms // CORE STATE: OPTIMAL]"
    },
    {
      quote: "An absolute mastery of WebAudio API, shaders, and micro-animations. Working with NVRMND feels like collaborating with visionary artists who happen to be world-class, premium engineers.",
      author: "Evelyn Sterling",
      role: "VP of Interactive",
      company: "ÆTHER COLLECTIVE",
      rating: 5,
      spec: "[AUDIO SPECTRA RESOLUTION: HIGH]"
    },
    {
      quote: "We required a frontend agency capable of delivering raw mathematical beauty alongside extreme security constraints. NVRMND delivered Cypher's portal ahead of schedule with flawless fluid responsiveness.",
      author: "Dax Coleman",
      role: "Head of Infrastructure",
      company: "CYPHER SECURITY",
      rating: 5,
      spec: "[PACKET DROP: 0.00% // ENCRYPTION: GCM]"
    },
    {
      quote: "The attention to pixel-density, type-spacing, and tactile audio feedback is remarkable. Our users frequently describe the Metaverse Mesh portal as 'an experience from the next decade'.",
      author: "Sora Takahashi",
      role: "Co-Founder & Chief Architect",
      company: "VOXEL LABS SYSTEMS",
      rating: 5,
      spec: "[RENDER TARGET: CANVAS2D/WEBGL]"
    }
  ];

  const handleNext = () => {
    try {
      premiumSynth.playClick();
    } catch (e) {}
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    try {
      premiumSynth.playClick();
    } catch (e) {}
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeTestimonial];

  return (
    <section 
      id="influence" 
      className="relative bg-[#e9e9e9] py-24 md:py-36 px-6 md:px-12 border-t border-b border-[#111111]/8 overflow-hidden select-none font-display text-[#111111]"
    >
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1f4fff]/4 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Indicator */}
        <div className="flex justify-between items-center text-[10px] font-mono tracking-[0.25em] text-[#666666]/80 uppercase mb-12">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1f4fff] animate-pulse" />
            <span>METRICS & REVERBERATIONS</span>
          </div>
          <div>GLOBAL SYNERGY INDEX</div>
        </div>

        {/* Section Header */}
        <div className="mb-16 pb-8 border-b border-[#111111]/10">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#1f4fff] uppercase block mb-3 font-bold">
            // CLIENT CREDIBILITY INDEX
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans tracking-tight font-black uppercase text-[#111111] leading-none">
            Trusted by Visionaries.
          </h2>
          <p className="max-w-xl text-[#666666] font-sans font-light text-sm md:text-base leading-relaxed mt-4">
            We collaborate exclusively with industry leaders, high-technology cooperatives, and design-driven enterprises to construct premium, next-generation digital portals.
          </p>
        </div>

        {/* Brand Logos Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-[#111111]/8 bg-white/50 rounded-none overflow-hidden mb-24 divide-x divide-y divide-[#111111]/8 border-r border-b">
          {clientLogos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="group relative flex flex-col items-center justify-center py-10 px-6 text-center cursor-crosshair hover:bg-[#1f4fff]/5 transition-all duration-300"
              onClick={() => {
                try {
                  premiumSynth.playChirp();
                } catch (e) {}
              }}
            >
              <div className="text-[12px] font-mono text-[#666666] mb-2 group-hover:text-[#1f4fff] transition-colors duration-300">
                {logo.symbol}
              </div>
              
              <div className="font-display font-black text-lg tracking-[0.25em] text-[#666666]/70 group-hover:text-[#1f4fff] group-hover:tracking-[0.3em] transition-all duration-500 ml-[0.25em]">
                {logo.name}
              </div>
              
              <div className="text-[9px] font-mono tracking-[0.15em] text-neutral-400 group-hover:text-[#111111] transition-colors duration-500 mt-1 uppercase">
                {logo.sub}
              </div>

              {/* Glowing accent border bottom on hover */}
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1f4fff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Double-Split Interactive Testimonial Layout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border border-[#111111]/8 bg-white/50 p-8 sm:p-12 relative overflow-hidden rounded-none shadow-sm">
          
          {/* Left info desk column */}
          <div className="lg:col-span-4 flex flex-col justify-between self-stretch border-b lg:border-b-0 lg:border-r border-[#111111]/8 pb-8 lg:pb-0 lg:pr-12 gap-8">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-none bg-white border border-[#111111]/8 flex items-center justify-center text-[#1f4fff] shadow-sm">
                <Quote className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-display font-medium text-[#111111] uppercase tracking-wider leading-snug">
                TRANSMISSIONS <br />
                <span className="text-[#666666] font-mono text-xs tracking-widest font-normal">// VERIFIED CLIENT COGNIZANCE</span>
              </h3>
            </div>

            {/* Carousel switches */}
            <div className="flex items-center gap-10">
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 border border-[#111111]/8 hover:border-[#1f4fff] bg-white flex items-center justify-center text-[#666666] hover:text-[#1f4fff] transition-all cursor-pointer rounded-none active:scale-95"
                  title="Prev archive"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 border border-[#111111]/8 hover:border-[#1f4fff] bg-white flex items-center justify-center text-[#666666] hover:text-[#1f4fff] transition-all cursor-pointer rounded-none active:scale-95"
                  title="Next archive"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="font-mono text-[#666666] text-[10px] tracking-widest font-medium">
                INDEX: <span className="text-[#1f4fff] font-bold">0{activeTestimonial + 1}</span> / 0{testimonials.length}
              </div>
            </div>
          </div>

          {/* Testimonial Active Slider Area (Right Side) */}
          <div className="lg:col-span-8 relative min-h-[20 0px] flex flex-col justify-between gap-6 pl-0 lg:pl-6 text-[#111111]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
                className="flex flex-col justify-between h-full gap-6"
              >
                {/* 5-Star Indicator Icons */}
                <div className="flex gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#1f4fff] fill-[#1f4fff]" />
                  ))}
                </div>

                {/* Big Immersive Quote Text */}
                <p className="text-base sm:text-lg md:text-xl font-sans font-light text-[#111111] leading-relaxed italic tracking-wide">
                  "{current.quote}"
                </p>

                {/* Metadatas of the client */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#111111]/8 pt-5 mt-2">
                  <div>
                    <h4 className="text-sm font-display font-bold text-[#111111] tracking-wide">
                      {current.author}
                    </h4>
                    <p className="text-[10px] font-mono text-[#666666] uppercase tracking-widest mt-0.5">
                      {current.role}, <span className="text-[#1f4fff] font-bold">{current.company}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[9px] text-[#666666]/80 bg-white border border-[#111111]/8 px-3 py-1.5 rounded-sm">
                    <Cpu className="w-3.5 h-3.5 text-[#1f4fff] animate-pulse" />
                    <span>{current.spec}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
