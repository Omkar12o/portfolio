"use client";

import ScrollyVideo from "@/components/ScrollyVideo";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { 
  CheckCircle2, 
  Search, 
  Database, 
  FileText, 
  Code, 
  TestTube,
  TerminalSquare,
  Network
} from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  
  // ScrollyVideo container needs to be taller for a longer animation duration
  // We'll use 600vh to slow down the 75 frames and make sure the overlays have time to display.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Hero overlays during the scroll
  // Phase 1 (0% -> 30%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  
  // Phase 2 (30% -> 70%)
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65, 0.8], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65, 0.8], [50, 0, 0, -50]);

  const skills = [
    { name: "Manual Testing", icon: <CheckCircle2 className="w-6 h-6 text-blue-400" /> },
    { name: "Functional Testing", icon: <TestTube className="w-6 h-6 text-green-400" /> },
    { name: "Regression Testing", icon: <Network className="w-6 h-6 text-purple-400" /> },
    { name: "Smoke Testing", icon: <TestTube className="w-6 h-6 text-orange-400" /> },
    { name: "Black Box Testing", icon: <Search className="w-6 h-6 text-gray-400" /> },
    { name: "Test Case Design", icon: <FileText className="w-6 h-6 text-yellow-400" /> },
    { name: "SDLC & STLC", icon: <CheckCircle2 className="w-6 h-6 text-indigo-400" /> },
    { name: "MySQL (Joins)", icon: <Database className="w-6 h-6 text-cyan-400" /> },
    { name: "Python / Java", icon: <Code className="w-6 h-6 text-rose-400" /> },
    { name: "Defect Reporting", icon: <TerminalSquare className="w-6 h-6 text-red-500" /> },
  ];

  return (
    <main className="bg-[#050505] text-white selection:bg-neutral-800 font-sans">
      {/* 1. SCROLLYTELLING ANIMATION PHASE */}
      <section ref={containerRef} className="relative h-[600vh]">
        <ScrollyVideo scrollYProgress={scrollYProgress}>
          {/* Overlays inside the Sticky ScrollyVideo */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center px-4">
            
            {/* First Hero Overlay */}
            <motion.div
              style={{ opacity: opacity1, y: y1 }}
              className="absolute flex flex-col items-center justify-center pointer-events-none"
            >
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-center drop-shadow-2xl">
                Omkar Mohite<span className="text-blue-500">.</span>
              </h1>
              <h2 className="text-xl md:text-3xl font-semibold tracking-tight text-neutral-300 mt-4 text-center">
                Software Quality Assurance Engineer
              </h2>
            </motion.div>

            {/* Second Narrative Overlay - QA role focus */}
            <motion.div
              style={{ opacity: opacity2, y: y2 }}
              className="absolute flex flex-col items-center justify-center pointer-events-none"
            >
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center drop-shadow-2xl max-w-4xl leading-tight">
                Delivering flawless
                <br /> digital experiences.
              </h2>
            </motion.div>
          </div>

          {/* Scroll Down Indicator */}
          <motion.div 
            style={{ opacity: opacity1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
          >
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                <div className="absolute top-0 w-full h-1/2 bg-white animate-bounce" />
            </div>
          </motion.div>
        </ScrollyVideo>
      </section>

      {/* 2. CONTENT SECTIONS PHASE */}
      {/* Appear naturally when 600vh finishes and ScrollyVideo scrolls away */}
      <section className="relative z-20 bg-[#050505] min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-32 space-y-40">
          
          {/* ABOUT ME SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h3 className="text-sm font-bold tracking-[0.2em] text-blue-500 uppercase mb-4">01. About Me</h3>
              <h4 className="text-3xl md:text-5xl font-bold mb-6">Quality is not an act, it is a habit.</h4>
            </div>
            <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
              <p className="text-lg text-neutral-300 leading-relaxed hover:text-white transition-colors">
                Detail-oriented QA Engineer with hands-on experience in Manual Testing, SDLC, and STLC. Skilled in designing test cases, executing functional and regression testing, and identifying defects. Passionate about delivering high-quality software that exceeds user expectations.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Analytical Thinking", "Attention to Detail", "Fast Learner", "Good Communication", "Team Player"].map(strength => (
                  <span key={strength} className="px-4 py-1.5 text-xs font-bold text-blue-200 bg-blue-900/40 rounded-full border border-blue-800/50">
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* SKILLS SECTION */}
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-sm font-bold tracking-[0.2em] text-blue-500 uppercase mb-12 text-center md:text-left">02. Core Arsenal</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group flex flex-col items-center justify-center p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800/60 hover:border-neutral-700 transition-colors"
                >
                  <div className="mb-4 p-4 rounded-full bg-neutral-800/80 group-hover:bg-neutral-800 transition-colors">
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium text-neutral-300 text-center">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* PROJECTS SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
             <h3 className="text-sm font-bold tracking-[0.2em] text-blue-500 uppercase mb-8">03. Impact & Experience</h3>
             <div className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8 md:p-12 hover:bg-neutral-900/50 transition-colors duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                  <div>
                    <h4 className="text-2xl md:text-4xl font-bold">E-Commerce Web Application Testing</h4>
                    <p className="text-neutral-400 mt-3 text-lg">Comprehensive manual testing spanning multiple core web modules.</p>
                  </div>
                  <span className="px-5 py-2.5 rounded-xl bg-neutral-800 text-sm font-bold tracking-widest text-neutral-300">2024</span>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  <div className="p-6 rounded-2xl border border-neutral-800/50 bg-black/40">
                    <p className="text-4xl font-black text-white mb-2">40+</p>
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Test Cases Crafted</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-neutral-800/50 bg-black/40">
                    <p className="text-4xl font-black text-rose-500 mb-2">20+</p>
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Bugs Identified</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-neutral-800/50 bg-black/40">
                    <p className="text-4xl font-black text-green-500 mb-2">4</p>
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Modules Tested</p>
                  </div>
                </div>

                <ul className="space-y-5 text-neutral-300">
                  <li className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-lg">Tested Login, Search, Cart, and Checkout modules for complete functional integrity.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-lg">Executed rigorous regression and smoke testing pre-deployment.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-lg">Compiled proper documentation and lifecycle tracking for all reported defects.</span>
                  </li>
                </ul>
             </div>
          </motion.div>
          
          {/* CONTACT SECTION */}
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true, margin: "-100px" }}
             className="text-center pb-32"
          >
            <h3 className="text-4xl md:text-6xl font-black mb-6">Let's build reliable software together.</h3>
            <p className="text-neutral-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Currently open to new opportunities as a Software Quality Assurance Engineer. Let's discuss how my testing strategies can benefit your team.
            </p>
            <button className="px-10 py-5 bg-white text-black text-lg font-bold rounded-full hover:bg-neutral-200 transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-1">
              Contact Me
            </button>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
