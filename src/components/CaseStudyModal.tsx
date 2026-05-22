import { motion } from "motion/react";
import { X, ArrowUpRight, Check, Compass, Cpu, HelpCircle, Layout, Layers, Play } from "lucide-react";
import { EASE_CINEMATIC } from "../utils/animations";
import { premiumSynth } from "../utils/audio";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    category: string;
    year: string;
    imageUrl: string;
    client: string;
    technologies: string[];
  } | null;
  onStartSimilarProject: (projectTitle: string) => void;
}

export default function CaseStudyModal({ isOpen, onClose, project, onStartSimilarProject }: CaseStudyModalProps) {
  if (!isOpen || !project) return null;

  const handleClose = () => {
    premiumSynth.playClick();
    onClose();
  };

  // Custom high-fidelity descriptions for each case study
  const getExtendedDetails = (title: string) => {
    switch (title) {
      case "Intellete":
        return {
          tagline: "Empowering higher education selection across Schengen borders.",
          challenge: "Aggregating academic databases from hundreds of European institutions while designing a friction-free navigation portal for international students.",
          solution: "Implemented a decentralized client caching state architecture with rich Framer Motion map grids and reactive filter indices that load instantly.",
          kpis: [
            { label: "Filter Latency", value: "< 4ms" },
            { label: "Student Onboarded", value: "96%" },
            { label: "Performance Score", value: "100" }
          ],
          galleryImages: [
            "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600",
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600"
          ]
        };
      case "Aether Studio":
        return {
          tagline: "Fluid, high-contrast visual portfolio system for premium designers.",
          challenge: "Fusing luxury typography pairings with heavy visual video asset preloading without incurring layout shifts or blocking thread paints.",
          solution: "Created custom Intersection Observers mapping container heights dynamically to translate raw image transforms to GPU layer animations.",
          kpis: [
            { label: "Viewport Frame Rate", value: "120 FPS" },
            { label: "SEO Score Index", value: "100%" },
            { label: "Conversion Lift", value: "+240%" }
          ],
          galleryImages: [
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600"
          ]
        };
      case "Velora":
        return {
          tagline: "Bespoke high-contrast cinematic fashion ecommerce experience.",
          challenge: "Bridging the tactile elegance of physical haute couture fabrics with immersive e-commerce layouts that load instantly on low-powered mobile devices.",
          solution: "Engineered GSAP scroll triggers and smooth scrub controllers linked with a lightweight Shopify headless layout schema.",
          kpis: [
            { label: "Completion Rate", value: "+150%" },
            { label: "Avg Session Duration", value: "4.8m" },
            { label: "Interactive Speed", value: "0.2s" }
          ],
          galleryImages: [
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600",
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600"
          ]
        };
      case "Nova Labs":
      default:
        return {
          tagline: "A cutting-edge SaaS landing interface translating heavy data mechanics into human visuals.",
          challenge: "Explaining highly complex software automation pipelines in under three seconds to enterprise stakeholders.",
          solution: "Developed interactive browser micro-synthesizers and visual 2D node graphs displaying live pipeline telemetry.",
          kpis: [
            { label: "Enterprise Signups", value: "+310%" },
            { label: "Lead Retention", value: "82%" },
            { label: "First Interactive Paint", value: "0.3s" }
          ],
          galleryImages: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600"
          ]
        };
    }
  };

  const details = getExtendedDetails(project.title);

  return (
    <div id={`modal-${project.id}`} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 overflow-hidden">
      
      {/* Dark overlay backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
      />

      {/* Main Modal container layout */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
        className="relative w-full max-w-5xl h-[85vh] bg-neutral-950 border border-white/10 rounded-lg overflow-y-auto overflow-x-hidden shadow-2xl glass-panel text-white z-10 scrollbar-thin"
      >
        
        {/* Absolute header sticky panel on top of modal */}
        <div className="sticky top-0 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 px-6 md:px-10 py-4 flex justify-between items-center z-30">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-[0.3em] text-violet-400 font-bold">CASE STUDY ARCHIVES</span>
            <span className="text-neutral-600">//</span>
            <span className="text-[10px] font-mono uppercase text-neutral-400">{project.client}</span>
          </div>

          <button 
            onClick={handleClose}
            className="p-1.5 rounded-full border border-white/10 hover:border-violet-500 hover:text-violet-400 bg-neutral-900 transition-all pointer-events-auto"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cinematic Case Study Banner Image */}
        <div className="relative h-64 md:h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40 z-10" />
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute bottom-6 left-6 md:left-10 z-20">
            <span className="text-xs font-mono tracking-widest text-violet-400 block mb-1 uppercase font-semibold">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-syne font-black tracking-tight uppercase leading-none">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Interactive Metrics Bar */}
        <div className="grid grid-cols-3 gap-4 border-b border-white/5 py-8 px-6 md:px-10 bg-white/[0.01]">
          {details.kpis.map((kpi, idx) => (
            <div key={idx} className="flex flex-col gap-1 border-l border-white/10 pl-4">
              <span className="text-2xl md:text-4xl font-display font-light text-white tracking-tight">
                {kpi.value}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
                {kpi.label}
              </span>
            </div>
          ))}
        </div>

        {/* Detailed Description Columns */}
        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Main Case details (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">// 01 / CONCEPT TAGLINE</span>
              <p className="text-xl md:text-2xl font-display font-medium text-white leading-relaxed">
                "{details.tagline}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-red-400 font-mono text-[10px] tracking-widest uppercase">
                  <HelpCircle className="w-4 h-4" /> // The Challenge
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  {details.challenge}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] tracking-widest uppercase">
                  <Check className="w-4 h-4" /> // The Solution
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  {details.solution}
                </p>
              </div>
            </div>

            {/* Fictional/Creative high fidelity galleries */}
            <div className="flex flex-col gap-4 mt-6">
              <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">// 02 / SCHEMATIC VISUALS</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {details.galleryImages.map((imgUrl, i) => (
                  <div key={i} className="aspect-video rounded border border-white/5 overflow-hidden bg-neutral-900">
                    <img 
                      src={imgUrl} 
                      alt="visual wireframe schematic" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Side panel specs (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-8 lg:border-l lg:border-white/5 lg:pl-8">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">// PIPELINE STACK</span>
              <div className="flex flex-col gap-2">
                {project.technologies.map((tech) => (
                  <div key={tech} className="flex items-center gap-2.5 bg-white/[0.01] border border-white/5 hover:border-violet-500/30 px-3 py-2 rounded transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                    <span className="text-xs font-mono text-neutral-300">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick action section inside the case study popup! */}
            <div className="p-6 bg-violet-950/20 border border-violet-500/20 rounded">
              <div className="flex items-center gap-2 text-violet-400 text-[10px] font-mono tracking-[0.2em] mb-2 uppercase">
                <Compass className="w-4 h-4" /> PROJECT BRIDGE
              </div>
              <h4 className="text-sm font-display font-semibold mb-2">Want a similar modern application?</h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                We can tailor-build a high performance experiences suited for your brand. Let's initialize project specs.
              </p>

              <button
                onClick={() => onStartSimilarProject(project.title)}
                className="cursor-pointer w-full bg-white text-black font-mono text-[10px] tracking-widest uppercase py-3 rounded-sm font-semibold flex items-center justify-center gap-2 hover:bg-violet-600 hover:text-white transition-colors duration-300"
              >
                <span>Start Similar Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
