import React from "react";
import {
  ChevronRight,
  Compass,
  CheckCircle2,
  Users2,
  Sparkles,
  Search,
  Eye,
  RefreshCw,
  Send,
  TrendingDown,
  Clock,
  Award,
} from "lucide-react";
import { WEBSITE_CONTENT } from "../data/websiteContent";
import vrForestSpatialImg from "../assets/images/vr_forest_spatial_1789321931674.jpg";

export const AboutSection: React.FC = () => {
  return (
    <div>
      {/* 1. Main About Us Section */}
      <section
        id="about"
        className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Image Showcase (Matching Screenshot 44 - VR Headset In Park with Floating Holographic Luxury Villa) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 group bg-slate-950">
                {/* Visual Representation of VR Headset Spatial Experience */}
                <div className="relative aspect-[3/2] sm:aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={vrForestSpatialImg}
                    alt="Cognitive Edge VR spatial digital twin visualization experience"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />

                  {/* Subtle spatial indicator badge */}
                  <div className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 text-white text-xs font-semibold backdrop-blur-md border border-cyan-400/40 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Spatial Twin Preview</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Content (Verbatim from Screenshot 44) */}
            <div className="lg:col-span-7 flex flex-col">
              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-5"
              >
                {WEBSITE_CONTENT.about.heading}
              </h2>

              <p
                id="about-paragraph-1"
                className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-justify sm:text-left"
              >
                {WEBSITE_CONTENT.about.paragraph1}
              </p>

              <p
                id="about-paragraph-2"
                className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-justify sm:text-left"
              >
                {WEBSITE_CONTENT.about.paragraph2}
              </p>

              {/* Quick links to the sub-sections */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <a
                  href="#approach"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors cursor-pointer shadow-xs"
                >
                  <Compass className="w-4 h-4 text-blue-200" />
                  <span>Our Approach</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#why-it-works"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Why It Works</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#collaboration"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors cursor-pointer shadow-xs"
                >
                  <Users2 className="w-4 h-4 text-amber-300" />
                  <span>How We Collaborate</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Approach Section */}
      <section
        id="approach"
        className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Our Approach
            </h2>
            <p className="mt-2.5 text-slate-600 dark:text-slate-400 text-base">
              A systematic engineering methodology designed to maximize project clarity, minimize construction risks, and deliver measurable ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WEBSITE_CONTENT.approach.map((item, index) => {
              const icons = [Compass, Eye, TrendingDown];
              const Icon = icons[index % icons.length] || Compass;
              const bgPill = [
                "bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-300",
                "bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300",
                "bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300",
              ];
              const pillClass = bgPill[index % bgPill.length] || bgPill[0];

              return (
                <div
                  key={item.title}
                  id={`approach-card-${index + 1}`}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-4">
                      <div className={`inline-flex p-2.5 rounded-xl ${pillClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2.5">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Why It Works Section */}
      <section
        id="why-it-works"
        className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why It Works
            </h2>
            <p className="mt-2.5 text-slate-600 dark:text-slate-400 text-base">
              Clear visual communication transforms complex architectural drawings into tangible experiences everyone can evaluate with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {WEBSITE_CONTENT.whyItWorks.map((item, index) => {
              const icons = [Clock, RefreshCw, TrendingDown, Award];
              const Icon = icons[index % icons.length] || Clock;
              const accentStylesList = [
                { iconColor: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/40" },
                { iconColor: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
                { iconColor: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/40" },
                { iconColor: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/40" },
              ];
              const accentStyles = accentStylesList[index % accentStylesList.length] || accentStylesList[0];

              return (
                <div
                  key={item.title}
                  id={`why-works-card-${index + 1}`}
                  className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col h-full group"
                >
                  <div className={`w-10 h-10 rounded-xl ${accentStyles.bg} flex items-center justify-center mb-4 shrink-0`}>
                    <Icon className={`w-5 h-5 ${accentStyles.iconColor}`} />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-start group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. How We Collaborate Section */}
      <section
        id="collaboration"
        className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How We Collaborate
            </h2>
            <p className="mt-2.5 text-slate-600 dark:text-slate-400 text-base">
              A transparent, 4-phase agile collaboration pipeline ensuring frictionless alignment from blueprint intake to final interactive delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch relative">
            {WEBSITE_CONTENT.collaborationSteps.map((step, index) => {
              const stepIcons = [Search, Eye, RefreshCw, Send];
              const StepIcon = stepIcons[index % stepIcons.length] || Search;

              return (
                <div
                  key={step.title}
                  id={`collaboration-step-${step.step}`}
                  className="relative bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col h-full group"
                >
                  {/* Step Icon */}
                  <div className="mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                      <StepIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {step.step}. {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

