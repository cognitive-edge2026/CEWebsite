import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Glasses,
  Video,
  Image as ImageIcon,
  FileSpreadsheet,
  ArrowLeft,
  Sun,
  Moon,
  ShieldCheck,
  Play,
  ExternalLink,
  FileText,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCw,
  RefreshCw,
} from "lucide-react";
import {
  CREDENTIAL_OPTIONS,
  CredentialOptionId,
  CredentialOption,
  CREDENTIAL_RENDER_GALLERY,
  RenderGalleryItem,
} from "../data/credentialsData";
import { WEBSITE_CONTENT } from "../data/websiteContent";

interface CredentialsPageProps {
  initialOption?: CredentialOptionId;
  onBackToHome: () => void;
  onContactClick: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const CredentialsPage: React.FC<CredentialsPageProps> = ({
  initialOption = "vr-walkthrough",
  onBackToHome,
  onContactClick,
  darkMode,
  onToggleDarkMode,
}) => {
  const [selectedOptionId, setSelectedOptionId] =
    useState<CredentialOptionId>(initialOption);
  const [renderFilter, setRenderFilter] = useState<"all" | "credentials" | "renders">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [brochureRotation, setBrochureRotation] = useState<number>(90);

  // Scroll to top upon mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Sync if initialOption changes
  useEffect(() => {
    if (initialOption) {
      setSelectedOptionId(initialOption);
    }
  }, [initialOption]);

  const currentOption: CredentialOption =
    CREDENTIAL_OPTIONS.find((opt) => opt.id === selectedOptionId) ||
    CREDENTIAL_OPTIONS[0];

  const getOptionIcon = (iconName: string) => {
    switch (iconName) {
      case "Glasses":
        return Glasses;
      case "Video":
        return Video;
      case "Image":
        return ImageIcon;
      case "FileSpreadsheet":
        return FileSpreadsheet;
      default:
        return Glasses;
    }
  };

  const CurrentIcon = getOptionIcon(currentOption.iconName);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            id="credentials-back-home-top-btn"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:inline-block">
              Cognitive Edge LTD
            </span>
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={onContactClick}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <button
            onClick={onBackToHome}
            className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            Our Credentials
          </span>
          <span>/</span>
          <span className="text-blue-600 dark:text-cyan-400 font-bold">
            {currentOption.label}
          </span>
        </nav>

        {/* Page Hero Header */}
        <div className="mb-10 text-center sm:text-left sm:flex sm:items-end sm:justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-cyan-300 border border-blue-200/60 dark:border-blue-900/60 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Verified Deliverables & Work Showcase</span>
            </div>
            <h1
              id="credentials-page-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              Our Credentials
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Explore our architectural portfolio spanning interactive VR walkthroughs, 4K video fly-throughs, photorealistic 8K renders, and commercial marketing brochures.
            </p>
          </div>

          <div className="mt-6 sm:mt-0 shrink-0">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Main Site</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 mb-10 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <CurrentIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Deliverable Category
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  Currently Viewing: {currentOption.label}
                </span>
              </div>
            </div>

            {/* Quick-Select Pill Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {CREDENTIAL_OPTIONS.map((opt) => {
                const Icon = getOptionIcon(opt.iconName);
                const isActive = opt.id === selectedOptionId;
                return (
                  <button
                    key={opt.id}
                    id={`pill-btn-${opt.id}`}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Category Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOption.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="space-y-10"
          >
            {/* Category Media Showcase */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
              {/* SPECIFICALLY FOR VR WALKTHROUGH SUBSECTION: Responsive 16:9 Video Iframe */}
              {currentOption.id === "vr-walkthrough" && (
                <div
                  className="space-y-4"
                  id="vr-walkthrough-video-section"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600 dark:bg-cyan-400"></span>
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        VR Walkthrough Interactive Demonstration
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        Responsive 16:9 Player
                      </span>
                      <a
                        href="https://www.youtube.com/watch?v=yOveJiPjfQ4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        title="Watch on YouTube in new tab"
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Responsive 16:9 Video Iframe Embed */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-950">
                    <iframe
                      id="vr-walkthrough-video-embed"
                      src={currentOption.videoUrl || "https://www.youtube.com/embed/yOveJiPjfQ4"}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title="VR Walkthrough Video Demonstration"
                    />
                  </div>
                </div>
              )}

              {/* For Video Walkthrough subsection */}
              {currentOption.id === "video-walkthrough" && (
                <div
                  className="space-y-8"
                  id="video-walkthrough-video-section"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600 dark:bg-cyan-400"></span>
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        Architectural Fly-Through & Cinematic Reels
                      </h3>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start sm:self-auto">
                      Responsive 16:9 Players
                    </span>
                  </div>

                  {/* Showcase Video 01 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Showcase Video 01
                      </span>
                      <a
                        href="https://youtu.be/IGGbHCslId0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        title="Watch on YouTube in new tab"
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-950">
                      <iframe
                        id="video-walkthrough-video-embed-1"
                        src="https://www.youtube.com/embed/IGGbHCslId0"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        title="Video Walkthrough Demonstration 1"
                      />
                    </div>
                  </div>

                  {/* Showcase Video 02 (Below Current Video) */}
                  <div className="space-y-3 pt-6 border-t border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Showcase Video 02
                      </span>
                      <a
                        href="https://youtu.be/dclbhoDgKdY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        title="Watch on YouTube in new tab"
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-950">
                      <iframe
                        id="video-walkthrough-video-embed-2"
                        src="https://www.youtube.com/embed/dclbhoDgKdY"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        title="Video Walkthrough Demonstration 2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* For 3D Renders: 9-Item Responsive CSS Grid Portfolio */}
              {currentOption.id === "renders" && (
                <div className="space-y-8" id="credentials-3d-renders-showcase">
                  {/* Top Header & Filter Controls */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>Ray-Traced Precision & Physical Materials</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        3D Architectural Renders & Credentials Portfolio
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                        Explore photorealistic exterior elevations, civic & clubhouse amenities, and high-fidelity ray-traced living spaces.
                      </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start md:self-auto">
                      <button
                        type="button"
                        onClick={() => setRenderFilter("all")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          renderFilter === "all"
                            ? "bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        All Works (9)
                      </button>
                      <button
                        type="button"
                        onClick={() => setRenderFilter("credentials")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          renderFilter === "credentials"
                            ? "bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        Credentials & Elevations (6)
                      </button>
                      <button
                        type="button"
                        onClick={() => setRenderFilter("renders")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          renderFilter === "renders"
                            ? "bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        3D Render Suites (3)
                      </button>
                    </div>
                  </div>

                  {/* Featured Primary 3D Architectural Render Showcase */}
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-950" id="credentials-featured-3d-render-primary">
                    <img
                      src="https://lh3.googleusercontent.com/d/1UedSm-xJlTffPnZBI7aart40ioi7mEbW"
                      alt="High-resolution photorealistic 3D architectural render showcase"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full max-w-full h-auto object-cover rounded-2xl"
                    />
                    <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Featured Master Elevation Render</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          Sub-Millimeter Photorealistic Architectural Still
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          Physically based rendering (PBR) with manufacturer calibrated materials, natural sunlight simulations, and high-fidelity global illumination.
                        </p>
                      </div>
                      <a
                        href="https://lh3.googleusercontent.com/d/1UedSm-xJlTffPnZBI7aart40ioi7mEbW"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shrink-0 shadow-xs"
                      >
                        <span>View Master Render</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Clean Responsive CSS Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                    {CREDENTIAL_RENDER_GALLERY.filter((item) => {
                      if (renderFilter === "all") return true;
                      return item.section === renderFilter;
                    }).map((item) => {
                      const itemIndex = CREDENTIAL_RENDER_GALLERY.findIndex((g) => g.id === item.id);
                      return (
                        <div
                          key={item.id}
                          id={`render-portfolio-card-${item.id}`}
                          onClick={() => setLightboxIndex(itemIndex)}
                          className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                        >
                          {/* Card Image with Hover Zoom Effect and Rounded Corners */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                            <img
                              src={item.imageUrl}
                              alt={item.altText}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 opacity-80 group-hover:opacity-50 transition-opacity" />

                            {/* Badges */}
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md shadow-xs border border-white/40 truncate max-w-[65%]">
                                {item.category}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-600/90 text-white backdrop-blur-md shrink-0">
                                {item.badge}
                              </span>
                            </div>

                            {/* Zoom Icon on Hover */}
                            <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                              <Maximize2 className="w-4 h-4" />
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-1">
                                {item.tag}
                              </div>
                              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                                {item.title}
                              </h4>
                              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                                {item.description}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                              <span>Click to enlarge</span>
                              <span className="text-blue-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                View Full Render <ExternalLink className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* For Brochures: Embedded PDF Viewer */}
              {currentOption.id === "brochures" && (
                <div className="space-y-4" id="brochures-pdf-section">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600 dark:bg-cyan-400"></span>
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        Digital Project Brochure & Architectural Specifications
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        {brochureRotation}° Rotated
                      </span>
                      <button
                        type="button"
                        onClick={() => setBrochureRotation((prev) => (prev + 90) % 360)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                        title="Rotate preview 90 degrees"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Rotate 90°</span>
                      </button>
                      {brochureRotation !== 0 && (
                        <button
                          type="button"
                          onClick={() => setBrochureRotation(0)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                          title="Reset rotation to 0°"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>0°</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 100% Width, 750px Height Embedded Iframe Reader */}
                  <div className="w-full h-[750px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex items-center justify-center relative">
                    <iframe
                      id="brochure-pdf-viewer-iframe"
                      src="https://drive.google.com/file/d/1VyImKdDRYw6X-IWGyf745ByxKt5vEoja/preview"
                      style={{
                        transform: `rotate(${brochureRotation}deg)`,
                        width: brochureRotation % 180 !== 0 ? "750px" : "100%",
                        height: brochureRotation % 180 !== 0 ? "100%" : "750px",
                        maxWidth: brochureRotation % 180 !== 0 ? "none" : "100%",
                        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      className="border-0 shadow-lg"
                      title="Digital Project Brochure & Architectural Specifications - The Sixteen"
                      allow="autoplay"
                    />
                  </div>

                  {/* Directly beneath the viewer: Descriptive line and 'Open Brochure in New Tab' button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                      Explore complete floor plans, terrace amenities, and architectural specifications for The Sixteen with rotated layout in a new tab.
                    </p>
                    <a
                      id="btn-open-brochure-new-tab"
                      href={`/brochure-viewer?rotate=${brochureRotation || 90}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shrink-0 cursor-pointer group"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Open Brochure in New Tab (Rotated 90°)</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA Banner */}
        <div className="mt-14 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Ready to create your next digital twin or architectural tour?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              We review your CAD drawings, BIM plans, or sketches under a standard mutual NDA and provide a comprehensive project proposal within 24 business hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onBackToHome}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold tracking-wide transition-colors shadow-sm"
            >
              Send Project Inquiry
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-900 text-slate-300 border-t border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400">
            © {new Date().getFullYear()} {WEBSITE_CONTENT.brand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-slate-400">
            <span>{WEBSITE_CONTENT.brand.phone}</span>
            <span>{WEBSITE_CONTENT.brand.enquiryEmail}</span>
            <span>{WEBSITE_CONTENT.brand.hours}</span>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 bg-slate-900/90">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-600/90 text-white mr-2">
                    {CREDENTIAL_RENDER_GALLERY[lightboxIndex].category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {lightboxIndex + 1} of {CREDENTIAL_RENDER_GALLERY.length}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                    {CREDENTIAL_RENDER_GALLERY[lightboxIndex].title}
                  </h3>
                </div>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Container with Nav Arrows */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] sm:min-h-[480px] max-h-[65vh] overflow-hidden">
                <img
                  src={CREDENTIAL_RENDER_GALLERY[lightboxIndex].imageUrl}
                  alt={CREDENTIAL_RENDER_GALLERY[lightboxIndex].altText}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[65vh] w-auto h-auto object-contain"
                />

                {/* Left/Right Nav Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (lightboxIndex - 1 + CREDENTIAL_RENDER_GALLERY.length) %
                        CREDENTIAL_RENDER_GALLERY.length
                    );
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                  title="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (lightboxIndex + 1) % CREDENTIAL_RENDER_GALLERY.length
                    );
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                  title="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Footer / Description */}
              <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                <p className="text-slate-300 max-w-3xl">
                  {CREDENTIAL_RENDER_GALLERY[lightboxIndex].description}
                </p>
                <a
                  href={CREDENTIAL_RENDER_GALLERY[lightboxIndex].imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors shrink-0"
                >
                  <span>Open Full Resolution</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
