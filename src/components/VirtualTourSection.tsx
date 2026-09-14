import React, { useRef, useState, useEffect } from "react";
import {
  Compass,
  Maximize2,
  Minimize2,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Layers,
  Move,
  Eye,
} from "lucide-react";

export const VirtualTourSection: React.FC = () => {
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerKey, setViewerKey] = useState(0);

  const tourUrl = "https://viz.spaceviz.ai/mhxp-dev/SanjeeviniTheBerriesForBirds.mhx/225/index.html";

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleToggleFullscreen = () => {
    if (!viewerContainerRef.current) return;
    if (!document.fullscreenElement) {
      viewerContainerRef.current.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request error:", err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn("Exit fullscreen error:", err);
      });
    }
  };

  const handleReload = () => {
    setViewerKey((prev) => prev + 1);
  };

  return (
    <section
      id="virtual-tour"
      className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Spatial Experience</span>
          </div>
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

                <a
                  id="tour-open-new-tab-btn"
                  href={tourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-900 border border-neutral-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Open tour in new tab"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

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
              </div>
            </div>

            {/* Embedded Iframe */}
            <div className="relative flex-1 w-full h-full bg-black">
              <iframe
                key={viewerKey}
                id="viewer-frame"
                src={tourUrl}
                allow="fullscreen; vr; xr; webxr; gyroscope; accelerometer"
                title="Cognitive Edge • Interactive 3D Digital Twin Demo "
                className="w-full h-full border-0 absolute inset-0"
              />
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
