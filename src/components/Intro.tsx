import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowUpRight, Layers, HelpCircle, Sparkles, Circle, ZoomIn, ArrowRight } from "lucide-react";
import { EASE_CINEMATIC, fadeUp, containerStagger } from "../utils/animations";
import { premiumSynth } from "../utils/audio";

export default function Intro() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax Scrolling effects with Framer Motion hooks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const ghostTextX = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      alt: "Flowing abstract crimson liquid simulation",
      title: "ÆTHER LIQUID ENGINE",
      category: "CREATIVE RENDERING",
      ratio: "FLUID DYNAMICS // SUB-LATENCY",
      desc: "An organic real-time particle fluid system constructed using shader matrices that translates user touch into physical liquid ripple dynamics."
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1600584969723-9665def4be5b?auto=format&fit=crop&w=1200&q=80",
      alt: "Brutalist abstract modern architectural structure",
      title: "BRUTALIST MONOLITH",
      category: "SPATIAL ARCHITECTURE",
      ratio: "RAY-TRACED SHADOWS // 1:1",
      desc: "A massive multi-level virtual architecture that acts as NVRMND's central community space, reflecting shadows in real-time."
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      alt: "Sleek hardware motherboard and silicon circuits",
      title: "CYPHER LOGIC CORE",
      category: "HARDWARE SYSTEMS",
      ratio: "14MS RESPONSIVENESS // BUS V4",
      desc: "An immersive hardware-grade user interface proxy that directly communicates with state engines to produce low-latency interactions."
    }
  ];

  const handleImageClick = (idx: number) => {
    try {
      premiumSynth.playSweep();
    } catch (e) {}
    setSelectedImage(idx);
  };

  const handleCloseLightbox = () => {
    try {
      premiumSynth.playClick();
    } catch (e) {}
    setSelectedImage(null);
  };

  return (
    <section 
      id="intro" 
      ref={sectionRef}
      className="relative bg-[#e9e9e9] py-24 md:py-36 px-6 md:px-12 border-t border-[#111111]/8 overflow-hidden"
    >
      {/* Subtle vertical editorial grid lines */}
      <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-[#111111]/[0.015] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-[#111111]/[0.015] pointer-events-none" />

      {/* Floating moving ambient glow blurs */}
      <motion.div 
        style={{ y: bgGlowY }}
        className="absolute top-1/6 left-1/3 w-[380px] h-[380px] rounded-full bg-[#1f4fff]/5 filter blur-[100px] pointer-events-none"
      />
      
      {/* GHOST GIGANTIC TEXT LAYER - For premium immersive parallax styling */}
      <div className="absolute top-1/4 left-0 w-full overflow-hidden select-none pointer-events-none z-0 opacity-[0.03] py-2">
        <motion.div 
          style={{ x: ghostTextX }}
          className="text-[12rem] whitespace-nowrap font-display font-extrabold tracking-tight text-[#111111]"
        >
          STUDIO STORYTELLING LABS
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* UPPER LEFT: Premium Small Blue Editorial Badge */}
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-[#1f4fff] text-white text-[10px] font-mono font-extrabold tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm shadow-sm inline-block">
            NVRMND
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#666666]/80 uppercase">
            // INTRO REVELATION
          </span>
        </div>

        {/* Dynamic Storytelling Layout (Split Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
          
          {/* LEFT SIDE: Heading with Opacity & word stagger elements */}
          <div className="lg:col-span-8">
            <motion.div 
              style={{ y: textY }}
              className="flex flex-col gap-6"
            >
              {/* LARGE CINEMATIC TYPOGRAPHY */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans tracking-tight font-black text-[#111111] leading-[1.05]">
                {/* Word by word horizontal mask reveal structure */}
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
                    className="inline-block"
                  >
                    We don’t just build websites.
                  </motion.span>
                </span>
                
                <span className="block overflow-hidden pb-1 text-[#1f4fff]">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.15, ease: EASE_CINEMATIC }}
                    className="inline-block"
                  >
                    We create digital experiences
                  </motion.span>
                </span>

                <span className="block overflow-hidden pb-1 italic font-serif">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3, ease: EASE_CINEMATIC }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#111111] to-[#1f4fff]/80"
                  >
                    that feel unforgettable.
                  </motion.span>
                </span>
              </h2>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Sub-statements with luxury spacing */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Paragraph 1 */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_CINEMATIC }}
              className="text-base md:text-lg text-[#111111] leading-relaxed font-sans font-normal"
            >
              NVRMND is a creative frontend studio focused on immersive storytelling, cinematic motion, and premium digital experiences that turn attention into authority.
            </motion.p>

            {/* Paragraph 2 - Cinematic emphasis words */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE_CINEMATIC }}
              className="text-sm md:text-base text-[#666666] leading-relaxed font-sans font-light"
            >
              <strong className="text-[#111111] font-semibold">Every interaction</strong> should feel intentional. <strong className="text-[#111111] font-semibold">Every scroll</strong> should feel smooth. Every visitor should remember your brand long after they leave.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-2"
            >
              <button 
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="cursor-pointer inline-flex items-center gap-2 group text-[#1f4fff] font-mono text-[11px] tracking-widest font-extrabold uppercase hover:text-[#111111] transition-colors duration-300"
              >
                <span>Read Capability Deck</span>
                <ArrowRight className="w-4 h-4 text-[#1f4fff] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>

          </div>

        </div>

        {/* PORTFOLIO PREVIEW SUBSECTION */}
        <div className="mt-24 select-none">
          <div className="flex justify-between items-center text-[10px] font-mono tracking-[0.25em] text-[#666666] uppercase mb-8 pb-3 border-b border-[#111111]/8">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1f4fff] animate-pulse" />
              0X09 // IMAGES OF INTENSITY
            </span>
            <span>PREMIUM PORTALS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: EASE_CINEMATIC }}
                onMouseEnter={() => {
                  setHoveredImage(i);
                  try {
                    premiumSynth.playClick();
                  } catch (e) {}
                }}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => handleImageClick(i)}
                className="group relative cursor-pointer overflow-hidden rounded-sm border border-[#111111]/8 bg-white/40 aspect-[4/3] flex flex-col justify-end p-6 hover:shadow-lg transition-all duration-500"
              >
                {/* Media Image */}
                <img
                  src={img.src}
                  alt={img.alt}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-1000 ease-out z-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent z-[1]" />

                {/* Lightbox Trigger icon */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 z-10 w-9 h-9 rounded-full bg-white border border-[#111111]/10 flex items-center justify-center text-[#111111] shadow-md shadow-black/5">
                  <ZoomIn className="w-4 h-4 text-[#1f4fff]" />
                </div>

                {/* Content Details */}
                <div className="relative z-10 flex flex-col gap-1 inline-block">
                  <span className="text-[9px] font-mono tracking-widest text-[#1f4fff] uppercase font-bold">
                    {img.category}
                  </span>
                  <h3 className="text-xl font-display font-bold text-[#111111] tracking-wide">
                    {img.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#666666] mt-1 uppercase">
                    <Layers className="w-3.5 h-3.5 text-[#1f4fff]" />
                    <span>{img.ratio}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* IMMERSIVE CINEMATIC LIGHTBOX */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 md:p-12 backdrop-blur-md"
            onClick={handleCloseLightbox}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative max-w-5xl w-full bg-[#e9e9e9] text-[#111111] border border-[#111111]/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 pointer-events-auto shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lg:col-span-7 bg-[#111111] aspect-[4/3] lg:aspect-auto flex items-center justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#111111]/10">
                <img 
                  src={images[selectedImage].src} 
                  alt={images[selectedImage].alt} 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between gap-8 h-full">
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono tracking-widest text-[#1f4fff] uppercase bg-white border border-[#1f4fff]/25 px-2.5 py-1 rounded-sm font-semibold">
                      {images[selectedImage].category}
                    </span>
                    <button 
                      onClick={handleCloseLightbox}
                      className="text-xs font-mono text-[#666666] hover:text-[#111111] font-bold transition-colors cursor-pointer uppercase tracking-widest"
                    >
                      [ CLOSE // X ]
                    </button>
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-medium text-[#111111] tracking-wide">
                      {images[selectedImage].title}
                    </h2>
                    <p className="font-mono text-[9px] text-[#666666] uppercase tracking-widest mt-1.5 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-[#1f4fff]" />
                      <span>{images[selectedImage].ratio}</span>
                    </p>
                  </div>

                  <p className="text-sm md:text-base text-[#666666] leading-relaxed font-sans font-light">
                    {images[selectedImage].desc}
                  </p>
                </div>

                <div className="border-t border-[#111111]/8 pt-6 flex flex-col gap-4">
                  <button
                    onClick={() => {
                      handleCloseLightbox();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 bg-[#1f4fff] text-white font-semibold font-mono text-[11px] tracking-widest uppercase rounded-sm hover:bg-[#111111] transition-colors duration-300 shadow-md shadow-[#1f4fff]/10"
                  >
                    <span>Request Collaboration</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#d9ff72]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
