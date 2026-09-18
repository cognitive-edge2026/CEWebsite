import React from "react";
import { ArrowRight } from "lucide-react";
import { WEBSITE_CONTENT } from "../data/websiteContent";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[80vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 tech-grid-bg"
    >
      {/* Decorative radial lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-orange-500/10 dark:bg-orange-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="max-w-3xl flex flex-col items-start text-left">
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-blue-700 dark:text-blue-300 font-semibold text-sm border border-blue-200 dark:border-blue-800 shadow-sm transition-all cursor-pointer"
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
        </div>
      </div>
    </section>
  );
};
