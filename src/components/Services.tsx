import { motion } from "motion/react";
import { 
  Code2, 
  Sparkles, 
  Compass, 
  Smartphone, 
  Cpu, 
  Layers,
  ArrowRight,
  ArrowUpRight
} from "lucide-react";
import { EASE_CINEMATIC, containerStagger, fadeUp } from "../utils/animations";
import { premiumSynth } from "../utils/audio";

export default function Services() {
  const servicesList = [
    {
      id: "srv-frontend",
      icon: Code2,
      title: "Frontend Development",
      description: "We code pixel-perfect, lightning-fast client interfaces with exceptional fidelity and clean, modern, semantic standards.",
      tags: ["React 19", "Vite", "TypeScript"],
      details: ["Sub-second rendering benchmarks", "Component-driven design architecture", "Semantic screen readability"],
      glow: "from-[#1f4fff]/20 to-blue-500/0",
    },
    {
      id: "srv-motion",
      icon: Sparkles,
      title: "Motion Design",
      description: "Bespoke micro-interactions, spring physics, and cinematic transitions that make pages feel alive, graceful, and natural.",
      tags: ["Framer Motion", "Physics", "Ease Transitions"],
      details: ["Staggered viewport reveal maps", "Layout-level smooth states", "Satisfying scroll transformations"],
      glow: "from-[#d9ff72]/15 to-[#1f4fff]/0",
    },
    {
      id: "srv-design",
      icon: Compass,
      title: "UI/UX Design",
      description: "Sophisticated digital layouts paired with strict typography alignment, deep negative space, and modern editorial flow.",
      tags: ["Visual Architecture", "Prototyping", "Design Systems"],
      details: ["Custom brand-identity integration", "Interactive high-fidelity paths", "High-contrast accessibility standards"],
      glow: "from-[#1f4fff]/20 to-indigo-500/0",
    },
    {
      id: "srv-interactive",
      icon: Layers,
      title: "Interactive Websites",
      description: "Creating highly memorable visual interfaces with cursor coordinates tracking, audio feeds, and custom user triggers.",
      tags: ["Dynamic Canvas", "Event Tracking", "Immersive Audio"],
      details: ["Interactive pointer coordinate glows", "Touchscreen responsive gestures", "Tactile hover state sequences"],
      glow: "from-[#d9ff72]/20 to-[#1f4fff]/0",
    },
    {
      id: "srv-[#111111]eering",
      icon: Cpu,
      title: "Creative Engineering",
      description: "Pushing web limitations with sophisticated visual algorithms, tailored asset loaders, and advanced browser APIs.",
      tags: ["Bespoke APIs", "Optimization", "Asset Pipeline"],
      details: ["No-flicker pre-render engines", "Hardware-accelerated layout physics", "Minimal modular file bundle metrics"],
      glow: "from-[#1f4fff]/20 to-[#d9ff72]/0",
    },
    {
      id: "srv-responsive",
      icon: Smartphone,
      title: "Responsive Experiences",
      description: "Flawlessly beautiful rendering on ultra-wide monitors, multi-split standard laptops, and compact portrait mobile screens.",
      tags: ["Fluid Grid System", "Tailwind CSS", "Adaptive Density"],
      details: ["Flexible bento proportions", "Strict touch target clearance", "Lightweight network load maps"],
      glow: "from-[#1f4fff]/15 to-teal-500/0",
    },
  ];

  return (
    <section 
      id="services" 
      className="relative bg-[#e9e9e9] py-24 md:py-36 px-6 md:px-12 border-t border-[#111111]/8 overflow-hidden"
    >
      {/* Subtle vertical editorial grids */}
      <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-[#111111]/[0.015] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-[#111111]/[0.015] pointer-events-none" />

      {/* Floating moving ambient glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#1f4fff]/3 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24 pb-8 border-b border-[#111111]/10">
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#1f4fff] uppercase font-bold">
              // CORE CAPABILITIES
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans tracking-tight font-black text-[#111111] uppercase leading-none">
              Services.
            </h2>
          </div>
          
          <div className="max-w-md">
            <p className="text-sm md:text-base text-[#666666] font-sans font-light leading-relaxed">
              We operate exclusively in the zone of high-end frontend craft. Our work blends strict programming architectural standards with bold motion philosophies.
            </p>
          </div>
        </div>

        {/* Services Grid of LUXURY DARK CARDS */}
        <motion.div 
          variants={containerStagger(0.1, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesList.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
                onMouseEnter={() => {
                  try {
                    premiumSynth.playClick();
                  } catch (e) {}
                }}
                className="group relative flex flex-col justify-between p-8 rounded-none bg-[#111111] border border-white/5 hover:border-[#1f4fff]/40 text-white transition-all duration-500 overflow-hidden shadow-xl"
              >
                {/* Radial Glow Overlay (Active on hover) */}
                <div 
                  className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${service.glow} rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                />

                <div className="flex flex-col gap-6 relative z-10">
                  {/* Icon & Counter ID */}
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-[#d9ff72] group-hover:text-white group-hover:border-[#1f4fff]/50 group-hover:bg-[#1f4fff]/50 transition-all duration-500">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-600 group-hover:text-[#d9ff72] transition-colors duration-500 font-bold">
                      // 0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl md:text-2xl font-display font-medium text-white group-hover:text-[#d9ff72] transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-400 font-sans font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bullet Details */}
                  <ul className="flex flex-col gap-2 mt-2 border-t border-white/5 pt-4">
                    {service.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2 text-[11px] text-neutral-500 group-hover:text-neutral-300 transition-colors duration-500">
                        <span className="w-1.5 h-1.5 bg-[#1f4fff] rounded-full" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags block on bottom */}
                <div className="flex flex-wrap gap-2 mt-6 relative z-10">
                  {service.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[9px] font-mono tracking-wider uppercase bg-white/5 border border-white/10 text-neutral-400 px-2 py-0.5 rounded-sm group-hover:border-[#1f4fff]/30 group-hover:text-white transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Beautiful active horizontal line at very bottom */}
                <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#1f4fff] group-hover:w-full transition-all duration-700" />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
