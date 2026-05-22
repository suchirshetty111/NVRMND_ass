import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, ArrowDown } from "lucide-react";
import { EASE_CINEMATIC } from "../utils/animations";
import { premiumSynth } from "../utils/audio";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Our Work", id: "work" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    try {
      premiumSynth.playClick();
    } catch (e) {}
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        id="main-navbar"
        initial={{ y: -65, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-[#e9e9e9]/90 backdrop-blur-md py-4 border-b border-[#111111]/8 shadow-sm" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* LEFT SIDE: Minimal brand logo badge / block */}
          <button 
            onClick={() => handleScrollTo("home")}
            className="group flex items-center gap-1 focus:outline-none cursor-pointer text-left focus:ring-0"
          >
            <div className="bg-[#d9ff72] text-[#1f4fff] font-display font-extrabold text-sm md:text-base tracking-[0.25em] px-3.5 py-1.5 border border-[#1f4fff]/25 rounded-none shadow-[2px_2px_0px_rgba(31,79,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300">
              NVRMND
            </div>
            {/* Soft decorative blinking sensor */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#1f4fff] animate-pulse ml-1.5" />
          </button>

          {/* Desktop Right Side Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            
            <ul className="flex items-center gap-6 lg:gap-8 text-[12px] tracking-[0.18em] uppercase font-mono text-[#666666]">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleScrollTo(link.id)}
                    className="cursor-pointer text-[#666666] hover:text-[#111111] font-semibold transition-colors duration-300 relative pb-1 group/item focus:outline-none"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1f4fff] scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Right Side Info badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white border border-[#111111]/8 font-mono text-[9px] tracking-widest text-[#111111]/60 uppercase rounded-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SLOTS OPEN - AUG '26
            </div>

            {/* BLUE MENU BUTTON */}
            <button
              onClick={() => handleScrollTo("contact")}
              className="cursor-pointer relative overflow-hidden text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-white bg-[#1f4fff] px-5 py-2.5 rounded-sm hover:bg-[#111111] transition-colors duration-500 font-semibold shadow-md shadow-[#1f4fff]/10 flex items-center gap-2"
            >
              MENU <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-[#111111]/8 font-mono text-[8px] tracking-wider text-[#111111]/60 uppercase rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SLOTS OPEN
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#111111] hover:text-[#1f4fff] p-2 focus:outline-none transition-colors duration-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
            className="fixed inset-0 z-40 bg-[#e9e9e9] flex flex-col justify-between px-8 py-24 md:hidden border-b border-[#111111]/10"
          >
            {/* Subtle mobile grid accents */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,17,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

            <div className="flex flex-col gap-1 w-full max-w-sm mx-auto mt-12 relative z-10">
              <span className="text-[10px] font-mono text-[#1f4fff] tracking-[0.25em] uppercase mb-4 block">
                MAIN SYTEM INDEX
              </span>
              <ul className="flex flex-col gap-5">
                {navLinks.map((link, i) => (
                  <motion.li
                    initial={{ x: -25, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: EASE_CINEMATIC }}
                    key={link.id}
                  >
                    <button
                      onClick={() => handleScrollTo(link.id)}
                      className="text-3xl text-left font-display font-bold tracking-tight text-[#111111] hover:text-[#1f4fff] transition-colors duration-300 focus:outline-none flex items-center justify-between w-full group"
                    >
                      <span>{link.label}</span>
                      <span className="text-xs font-mono text-[#666666] group-hover:text-[#1f4fff] transition-colors duration-300">
                        {`// 0${i + 1}`}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full max-w-sm mx-auto flex flex-col gap-5 border-t border-[#111111]/8 pt-8 relative z-10"
            >
              <button
                onClick={() => handleScrollTo("contact")}
                className="cursor-pointer w-full flex justify-between items-center text-left py-4 px-6 border border-[#1f4fff]/20 hover:border-[#1f4fff] rounded-sm bg-[#1f4fff] hover:bg-[#111111] text-white font-mono tracking-widest text-[11px] uppercase transition-all shadow-md font-semibold"
              >
                Let's Collaborate <ArrowUpRight className="w-4 h-4 text-[#d9ff72]" />
              </button>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#666666] tracking-wider">
                <span>IMAGINED BY NVRMND</span>
                <span>2026 EDITION</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
