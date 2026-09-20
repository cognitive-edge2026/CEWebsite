import React, { useRef, useState, useEffect } from "react";
import {
  Compass,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Layers,
  Move,
  Eye,
  Play,
  XCircle,
} from "lucide-react";

export const VirtualTourSection: React.FC = () => {
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerKey, setViewerKey] = useState(0);
  // Default to false for on-demand loading to prevent iOS Safari WebKit memory overflow / crashes
  const [isTourLoaded, setIsTourLoaded] = useState(false);

  const tourUrl = "https://viz.spaceviz.ai/mhxp-dev/SanjeeviniTheBerriesForBirds.mhx/225/index.html";

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isFs);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const handleToggleFullscreen = () => {
    if (!viewerContainerRef.current) return;
    const el = viewerContainerRef.current as any;

    // Check if Fullscreen API is supported on this element/device
    const isFullscreenApiSupported =
      !!el.requestFullscreen ||
      !!el.webkitRequestFullscreen ||
      !!el.mozRequestFullScreen ||
      !!el.msRequestFullscreen;

    if (!isFullscreenApiSupported) {
      // On iOS Safari / iPhone where div Fullscreen API does not exist:
      // Open directly in a new tab for native full-screen experience
      window.open(tourUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const currentFullscreen =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement;

    if (!currentFullscreen) {
      const requestMethod =
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen;
      if (requestMethod) {
        requestMethod.call(el).catch(() => {
          window.open(tourUrl, "_blank", "noopener,noreferrer");
        });
      }
    } else {
      const exitMethod =
        document.exitFullscreen ||
        (document as any).webkitExitFullscreen ||
        (document as any).mozCancelFullScreen ||
        (document as any).msExitFullscreen;
      if (exitMethod) {
        exitMethod.call(document).catch(() => {});
      }
    }
  };

  const handleReload = () => {
    setViewerKey((prev) => prev + 1);
  };

  const handleLaunchTour = () => {
    setIsTourLoaded(true);
  };

  const handleCloseTour = () => {
    setIsTourLoaded(false);
  };

  return (
    <section
      id="virtual-tour"
      className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2
            id="virtual-tour-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            360-degree virtual tour
          </h2>
        </div>

        {/* Interactive Viewer Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-3 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          {/* Viewer Container with dark branding chrome */}
          <div
            ref={viewerContainerRef}
            id="tour-viewer-container"
            className="relative w-full rounded-2xl overflow-hidden bg-black flex flex-col h-[520px] sm:h-[620px] md:h-[720px] lg:h-[780px]"
          >
            {/* Top Branding Bar */}
            <div
              id="header"
              className="w-full px-4 sm:px-6 py-3.5 bg-slate-950/90 backdrop-blur-sm text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 z-10 shrink-0"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm md:text-base font-semibold text-white tracking-wide truncate">
                  Cognitive Edge • Interactive 3D Digital Twin Demo
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {isTourLoaded ? (
                  <>
                    <button
                      type="button"
                      id="tour-reload-btn"
                      onClick={handleReload}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                      title="Reset / Reload View"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>

                    <button
                      type="button"
                      id="tour-close-btn"
                      onClick={handleCloseTour}
                      className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 text-slate-200 hover:text-red-300 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                      title="Close tour to save memory and restore smooth scrolling"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Close</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    id="tour-top-launch-btn"
                    onClick={handleLaunchTour}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Load interactive tour"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Tour</span>
                  </button>
                )}

                {isTourLoaded && (
                  <button
                    type="button"
                    id="tour-fullscreen-btn"
                    onClick={handleToggleFullscreen}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Embedded Viewer or On-Demand Poster */}
            <div className="relative flex-1 w-full h-full bg-slate-950 overflow-hidden">
              {isTourLoaded ? (
                <iframe
                  key={viewerKey}
                  id="viewer-frame"
                  src={tourUrl}
                  allow="fullscreen; vr; xr; webxr; gyroscope; accelerometer"
                  title="Cognitive Edge • Interactive 3D Digital Twin Demo"
                  className="w-full h-full border-0 absolute inset-0"
                  loading="lazy"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-center">
                  {/* High-res architectural backdrop image */}
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
                    alt="Cognitive Edge 3D Villa Digital Twin Walkthrough"
                    className="absolute inset-0 w-full h-full object-cover opacity-35"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70" />

                  {/* Centered Launch Call-to-Action */}
                  <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-600/90 text-white flex items-center justify-center shadow-2xl mb-5 ring-4 ring-blue-500/20">
                      <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-md">
                      Interactive 3D Digital Twin & spatial walkthrough. Explore all rooms, architectural floor nodes, and high-fidelity textures.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        id="tour-launch-main-btn"
                        onClick={handleLaunchTour}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Launch 360° Virtual Tour</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Guide & Interaction Badges */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 px-2">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-blue-500" />
                <span>Click & drag to look around 360°</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-500" />
                <span>Click floor nodes to step between spaces</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-indigo-500" />
                <span>Scroll to zoom in / out</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Full WebXR & VR headset compatible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

