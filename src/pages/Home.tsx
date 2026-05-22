import { useState, MouseEvent, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lenis from "lenis";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WorkSection from "../components/WorkSection";
import AboutSection from "../components/AboutSection";
import Services from "../components/Services";
import SocialProof from "../components/SocialProof";
import Footer from "../components/Footer";
import CaseStudyModal from "../components/CaseStudyModal";
import IntroLoader from "../components/IntroLoader";
import { EASE_CINEMATIC } from "../utils/animations";
import { premiumSynth } from "../utils/audio";

export default function Home() {
  const [isPreloading, setIsPreloading] = useState(true);
  const [favorited, setFavorited] = useState<Record<string, boolean>>({});
  
  // Interactive Case Studies modal states
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefilledBrief, setPrefilledBrief] = useState("");
  const [prefilledBudget, setPrefilledBudget] = useState("");

  // Smooth kinetic scrolling via Lenis
  useEffect(() => {
    if (isPreloading) return;

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ultra smooth cinematic curves
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.25,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Make smooth-scroll click handler support custom lenis triggers
    const handleAnchorClick = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorNode = target.closest("a");
      if (anchorNode && anchorNode.hash) {
        const targetElement = document.querySelector(anchorNode.hash);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as any, { offset: 0, duration: 1.4 });
        }
      }
    };

    window.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener("click", handleAnchorClick);
    };
  }, [isPreloading]);

  const handleFavoriteToggle = (id: string, e: any) => {
    e.stopPropagation();
    try {
      premiumSynth.playChirp();
    } catch (err) {}
    setFavorited(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleOpenCaseStudy = (work: any) => {
    try {
      premiumSynth.playSweep();
    } catch (err) {}
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const handleStartSimilarProject = (projectTitle: string) => {
    try {
      premiumSynth.playChirp();
    } catch (err) {}
    const customMessage = `Hi NVRMND, I reviewed your premium case study for "${projectTitle}" and am extremely inspired by the design and performance. I would like to design, engineer, and launch a similar top-tier web experience with your studio. Let's discuss details!`;
    let budget = "$50k — $100k";
    if (projectTitle === "Intellete" || projectTitle === "Aether Studio") {
      budget = "$100k+";
    } else if (projectTitle === "Velora" || projectTitle === "Nova Labs") {
      budget = "$50k — $100k";
    } else {
      budget = "$25k — $50k";
    }
    
    setPrefilledBrief(customMessage);
    setPrefilledBudget(budget);
    setIsModalOpen(false);
    
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
      
      const briefTextarea = document.getElementById("brief") as HTMLTextAreaElement;
      if (briefTextarea) {
        briefTextarea.focus();
      }
    }, 450);
  };

  return (
    <div className="bg-[#e9e9e9] min-h-screen text-[#111111]">
      <AnimatePresence mode="wait">
        {isPreloading ? (
          <IntroLoader key="preloader" onComplete={() => setIsPreloading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: EASE_CINEMATIC }}
          >
            <main className="relative bg-[#e9e9e9] selection:bg-[#1f4fff]/20 selection:text-[#111111]">
              
              {/* 1. NAVBAR */}
              <Navbar />
              
              {/* 2. HERO SECTION */}
              <Hero />
              
              {/* 3. ABOUT US STORYTELLING SECTION */}
              <AboutSection />

              {/* 4. FEATURED WORK SECTION */}
              <WorkSection 
                onOpenWork={handleOpenCaseStudy} 
                favorited={favorited} 
                onToggleFavorite={handleFavoriteToggle} 
              />

              {/* 6. SERVICES SECTION */}
              <Services />

              {/* SOCIAL PROOF: Trusted by high-end brands */}
              <SocialProof />

              {/* 7. FOOTER */}
              <Footer initialBriefText={prefilledBrief} initialBudget={prefilledBudget} />

              {/* INTERACTIVE CASE STUDY MODAL */}
              <AnimatePresence>
                {isModalOpen && (
                  <CaseStudyModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    project={selectedWork}
                    onStartSimilarProject={handleStartSimilarProject}
                  />
                )}
              </AnimatePresence>

            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
