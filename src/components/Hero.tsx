import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Box, Zap, Shield, CheckCircle, Eye, Layers } from "lucide-react";
import { WEBSITE_CONTENT } from "../data/websiteContent";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 tech-grid-bg"
    >
      {/* Decorative radial lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-orange-500/10 dark:bg-orange-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Tagline, & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Top Technology Badge */}
            <div
              id="hero-spatial-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs"
            >
              <Box className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Spatial Computing & Digital Twins</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Main Headline */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-5"
            >
              Cognitive Edge{" "}
              <span className="text-blue-600 dark:text-blue-400">LTD</span>
            </h1>

            {/* Tagline from Screenshot 43 */}
            <p
              id="hero-tagline"
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-orange-600 dark:text-orange-400 mb-6 tracking-tight"
            >
              {WEBSITE_CONTENT.brand.tagline}
            </p>

            {/* Descriptive Body */}
            <p
              id="hero-description"
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl"
            >
              Bridging imagination and reality through high-precision digital twins, photorealistic VR walkthroughs, and immersive interior design environments that empower confident decisions before ground is ever broken.
            </p>

            {/* Primary Action Buttons from Screenshot 43 */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="#services"
                id="hero-explore-services-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                id="hero-contact-now-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700/50 shadow-sm transition-all cursor-pointer"
              >
                <span>Contact Now</span>
              </a>
            </div>

            {/* Quick Flyer Highlights Ticker */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 pt-8 border-t border-slate-200 dark:border-slate-800/90 w-full max-w-xl">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-cyan-400">30%</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Faster Sales Cycle</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-orange-500 dark:text-orange-400">25%</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Cost Savings</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">45%</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Faster Approvals</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Holographic 3D Digital Twin Visual Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl p-1 bg-gradient-to-br from-blue-500/20 via-slate-200/40 to-orange-500/20 dark:from-blue-500/30 dark:via-slate-800/50 dark:to-orange-500/30 shadow-2xl backdrop-blur-xs">
              <div className="relative rounded-[14px] overflow-hidden bg-slate-900 border border-slate-700/60 p-5 text-white">
                {/* Hologram Display Screen Mockup */}
                <div className="relative h-72 sm:h-80 w-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col justify-between p-4 border border-blue-500/30 hologram-glow">
                  {/* Top Status Bar */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-mono font-semibold tracking-wider text-blue-300 uppercase">
                        Digital Twin Matrix: Active
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-blue-950/80 px-2.5 py-1 rounded text-[10px] font-mono text-cyan-300 border border-blue-500/30">
                      <Layers className="w-3 h-3" />
                      <span>1:1 Scale CAD VR</span>
                    </div>
                  </div>

                  {/* Visual 3D Hologram City / Structure Representation */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-85">
                    <svg viewBox="0 0 400 300" className="w-full h-full">
                      {/* Grid Floor */}
                      <g stroke="#0077EE" strokeWidth="0.75" strokeOpacity="0.3">
                        <line x1="50" y1="260" x2="350" y2="260" />
                        <line x1="20" y1="280" x2="380" y2="280" />
                        <line x1="200" y1="180" x2="50" y2="290" />
                        <line x1="200" y1="180" x2="350" y2="290" />
                        <line x1="200" y1="180" x2="200" y2="290" />
                        <line x1="200" y1="180" x2="120" y2="290" />
                        <line x1="200" y1="180" x2="280" y2="290" />
                      </g>

                      {/* Holographic Building Wireframe */}
                      {/* Central Tower */}
                      <polygon
                        points="160,120 240,120 240,240 160,240"
                        fill="rgba(0, 102, 204, 0.18)"
                        stroke="#00D4FF"
                        strokeWidth="1.5"
                      />
                      <polygon
                        points="160,120 200,90 280,90 240,120"
                        fill="rgba(0, 150, 255, 0.25)"
                        stroke="#00D4FF"
                        strokeWidth="1.5"
                      />
                      <polygon
                        points="240,120 280,90 280,210 240,240"
                        fill="rgba(0, 80, 180, 0.3)"
                        stroke="#00D4FF"
                        strokeWidth="1.5"
                      />

                      {/* Modern Wing Left */}
                      <polygon
                        points="90,160 160,140 160,240 90,250"
                        fill="rgba(255, 102, 0, 0.15)"
                        stroke="#FF8800"
                        strokeWidth="1.2"
                      />

                      {/* Modern Wing Right */}
                      <polygon
                        points="240,150 310,170 310,245 240,240"
                        fill="rgba(0, 212, 255, 0.15)"
                        stroke="#00D4FF"
                        strokeWidth="1.2"
                      />

                      {/* Floor division laser rings */}
                      <line x1="160" y1="150" x2="240" y2="150" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" />
                      <line x1="160" y1="180" x2="240" y2="180" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" />
                      <line x1="160" y1="210" x2="240" y2="210" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" />

                      {/* Laser Pointer Nodes */}
                      <circle cx="200" cy="90" r="4" fill="#00FFAA" />
                      <circle cx="90" cy="160" r="3" fill="#FF8800" />
                      <circle cx="310" cy="170" r="3" fill="#00D4FF" />
                    </svg>
                  </div>

                  {/* Floating Hologram Data Chips */}
                  <div className="z-10 flex flex-wrap gap-2 pt-16">
                    <div className="bg-slate-900/90 border border-blue-500/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-semibold text-slate-200">Interactive VR Walkthrough</span>
                    </div>

                    <div className="bg-slate-900/90 border border-orange-500/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-md">
                      <Zap className="w-3.5 h-3.5 text-orange-400" />
                      <span className="font-semibold text-slate-200">Zero Build Risk</span>
                    </div>
                  </div>

                  {/* Bottom Metrics Bar */}
                  <div className="z-10 bg-slate-950/80 rounded-lg p-2.5 border border-slate-800 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Try Before You Buy</span>
                    </div>
                    <span className="font-mono text-cyan-400 font-bold">45% Faster Approvals</span>
                  </div>
                </div>

                {/* Sub Caption */}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                    BIM & CAD Blueprints to Immersive 3D
                  </span>
                  <span className="text-orange-400 font-medium">Full Scale VR</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
