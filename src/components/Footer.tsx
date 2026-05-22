import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, CheckCircle, Mail, Send, Sparkles, Instagram, Linkedin, Globe } from "lucide-react";
import { EASE_CINEMATIC, scaleReveal } from "../utils/animations";
import { premiumSynth } from "../utils/audio";

interface FooterProps {
  initialBriefText?: string;
  initialBudget?: string;
}

export default function Footer({ initialBriefText = "", initialBudget = "" }: FooterProps) {
  const [email, setEmail] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    if (initialBriefText) {
      setProjectBrief(initialBriefText);
    }
  }, [initialBriefText]);

  useEffect(() => {
    if (initialBudget) {
      setSelectedBudget(initialBudget);
    }
  }, [initialBudget]);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Rome",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setLocalTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const budgetOptions = [
    "$10k — $25k",
    "$25k — $50k",
    "$50k — $100k",
    "$100k+",
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      premiumSynth.playSweep();
    } catch (err) {}
    
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setEmail("");
      setProjectBrief("");
      setSelectedBudget("");
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const scrollToTop = () => {
    try {
      premiumSynth.playClick();
    } catch (err) {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      id="contact" 
      className="relative bg-[#e9e9e9] text-[#111111] py-24 md:py-32 px-6 md:px-12 border-t border-[#111111]/8 overflow-hidden font-display"
    >
      {/* Editorial Grid lines decoration */}
      <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-[#111111]/[0.015] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-[#111111]/[0.015] pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#1f4fff]/4 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* UPPER FORM INTAKE SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-24">
          
          {/* Intake Info column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#1f4fff] uppercase font-bold">
              // LET'S COLLABORATE
            </span>
            <div className="h-[2px] w-12 bg-[#1f4fff]"></div>
            
            <h2 className="text-3xl md:text-5xl font-sans tracking-tight font-black text-[#111111] uppercase leading-none">
              Inquire <br />
              Project.
            </h2>
            
            <p className="text-sm md:text-base text-[#666666] font-sans font-light leading-relaxed">
              We partner with forward-thinking creative founders and design leaders to engineer websites that educate, qualify, and convert. Tell us about your goals.
            </p>

            <div className="flex flex-col gap-3 mt-4 text-[10px] font-mono text-[#666666] uppercase tracking-wider">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1f4fff] animate-ping" />
                <span className="text-[#111111] font-bold">MILANO / DESK TIME_B:</span>
                <span className="text-[#1f4fff] font-bold">{localTime} CET</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1f4fff]" />
                <span className="text-[#111111] font-bold">SUPPORT CONSOLE:</span>
                <a href="mailto:kanza@nvrmndstudio.com" className="text-[#1f4fff] hover:underline hover:text-[#111111] transition-all font-semibold">
                  kanza@nvrmndstudio.com
                </a>
              </div>
            </div>
          </div>

          {/* Intake Form column */}
          <div className="lg:col-span-7">
            <div className="bg-white/70 backdrop-blur-md p-8 md:p-10 border border-[#111111]/8 shadow-sm rounded-none relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="flex flex-col gap-6"
                  >
                    {/* Tell us about project text label */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="brief" className="text-[9px] font-mono tracking-widest text-[#666666] uppercase font-bold">
                        // TELL US ABOUT WHAT YOU DESIGN & CONSTRUCT
                      </label>
                      <textarea
                        id="brief"
                        value={projectBrief}
                        required
                        onChange={(e) => setProjectBrief(e.target.value)}
                        placeholder="E.g., We need an immersive WebGL-like experience with smooth storytelling animations..."
                        className="w-full bg-[#e9e9e9]/30 border border-[#111111]/8 rounded-none p-4 text-sm text-[#111111] placeholder-[#666666]/50 focus:outline-none focus:border-[#1f4fff] transition-colors duration-300 resize-none h-28 font-light"
                      />
                    </div>

                    {/* Launch Budget slider target */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[9px] font-mono tracking-widest text-[#666666] uppercase font-bold">
                        // PROJECT BUDGET RANGE
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {budgetOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              try {
                                premiumSynth.playClick();
                              } catch (e) {}
                              setSelectedBudget(option);
                            }}
                            className={`py-2 px-3 text-[10px] font-mono rounded-none border transition-all text-center cursor-pointer ${
                              selectedBudget === option
                                ? "border-[#1f4fff] bg-[#1f4fff] text-white font-bold"
                                : "border-[#111111]/8 bg-white text-[#666666] hover:border-[#111111]/20 hover:text-[#111111]"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Coordinate / Email intake */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-[9px] font-mono tracking-widest text-[#666666] uppercase font-bold">
                        // YOUR COORD / BUSINESS EMAIL
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="founder@visionarybrand.com"
                        className="w-full bg-[#e9e9e9]/30 border border-[#111111]/8 rounded-none px-4 py-3.5 text-sm text-[#111111] placeholder-[#666666]/50 focus:outline-none focus:border-[#1f4fff] transition-colors duration-300 font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="cursor-pointer w-full mt-2 bg-[#1f4fff] text-white font-mono text-[11px] font-semibold tracking-widest uppercase py-4 rounded-none flex items-center justify-center gap-3 border border-transparent hover:bg-[#111111] hover:text-white transition-all duration-300 shadow-[4px_4px_0px_rgba(17,17,17,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                    >
                      <span>{submitting ? "SPECIFICATIONS TRANSMITTING..." : "TRANSMIT SPEC BRIEF"}</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    variants={scaleReveal}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center justify-center text-center py-12 gap-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#1f4fff]/10 border border-[#1f4fff]/30 flex items-center justify-center text-[#1f4fff]">
                      <CheckCircle className="w-8 h-8 rounded-full" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-display font-medium text-[#111111]">
                        SPEC TRANSMITTED
                      </h3>
                      <p className="text-xs text-[#666666] max-w-sm">
                        Brief received at NVRMND central grid. We will evaluate details and establish contact inside 14 standard Earth cycles.
                      </p>
                    </div>

                    <div className="text-[10px] font-mono text-[#1f4fff] bg-white px-4 py-2 rounded-sm border border-[#111111]/8 flex items-center gap-2 mt-2 font-bold">
                      <Sparkles className="w-3.5 h-3.5" /> STATUS: SPEC_DOCUMENT_LIVE
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* ----------------- MINIMAL CINEMATIC FOOTER ROW ----------------- */}
        <div className="border-t border-[#111111]/10 pt-12 flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center text-[10px] font-mono tracking-widest text-[#666666] uppercase select-none">
          
          {/* LEFT: Social links */}
          <div className="lg:col-span-4 flex flex-wrap gap-5 justify-center lg:justify-start items-center">
            <a 
              href="https://www.instagram.com/suchirshetty_45?igsh=MXcwaGxuaGpjOGdpZQ==" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#111111] hover:underline flex items-center gap-1.5 font-bold text-[#1f4fff]"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>INSTAGRAM</span>
            </a>
            <span className="text-neutral-300">·</span>
            <a 
              href="https://www.linkedin.com/in/shenishetty-suchir-452301349?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#111111] hover:underline flex items-center gap-1.5 font-bold text-[#1f4fff]"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LINKEDIN</span>
            </a>
            <span className="text-neutral-300">·</span>
            <a 
              href="https://bsky.app" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#111111] hover:underline flex items-center gap-1.5 font-bold text-[#1f4fff]"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>BLUESKY</span>
            </a>
          </div>

          {/* CENTER: Studio message */}
          <div className="lg:col-span-5 text-center px-4 leading-relaxed font-sans font-light tracking-wide text-[11px] text-[#111111]">
            TURNING HIGH ATTENTION INTO UNFORGETTABLE BRAND EXPERIENCES PAIRING METICULOUS VISUAL STORYTELLING WITH IMMERSIVE FRONTEND ENGINEERING.
          </div>

          {/* RIGHT: Contact email with back to top trigger button */}
          <div className="lg:col-span-3 w-full flex justify-between lg:justify-end items-center gap-6">
            <a 
              href="mailto:kanza@nvrmndstudio.com" 
              className="text-[#1f4fff] hover:text-[#111111] font-bold hover:underline transition-colors tracking-wide text-[11px]"
            >
              KANZA@NVRMNDSTUDIO.COM
            </a>
            
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 hover:text-[#1f4fff] transition-all cursor-pointer p-2 rounded-sm border border-[#111111]/8 hover:border-[#1f4fff] bg-white shadow-sm"
              title="SCROLL TO THE TOP"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
