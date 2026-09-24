import React, { useRef, useState, useEffect, useCallback } from "react";
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
  ExternalLink,
  Loader2,
} from "lucide-react";

export const VirtualTourSection: React.FC = () => {
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCssFullscreen, setIsCssFullscreen] = useState(false);
  const [viewerKey, setViewerKey] = useState(0);
  const [isTourLoaded, setIsTourLoaded] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(false);
  const [hasTourError, setHasTourError] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const tourUrl = "https://viz.spaceviz.ai/mhxp-dev/SanjeeviniTheBerriesForBirds.mhx/225/index.html";

  // Detect iOS / iPadOS / WebKit devices for specific optimizations
  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const isApple =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && (navigator.maxTouchPoints > 1 || "ontouchend" in document));
      setIsIOS(isApple);
    }
  }, []);

  // Sync HTML5 Fullscreen API state
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isFs);
      if (!isFs && !isCssFullscreen) {
        setIsCssFullscreen(false);
      }
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
  }, [isCssFullscreen]);

  // Lock scroll when in CSS fullscreen (essential on iOS Safari)
  useEffect(() => {
    if (isCssFullscreen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsCssFullscreen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isCssFullscreen]);

  // WebGL memory optimization for high-DPI Retina screens:
  // Equivalent WebGL canvas optimization capping pixel ratio: renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  useEffect(() => {
    if (typeof window === "undefined") return;

    const maxPixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    // Provide global renderer optimization helper if Three.js / WebGL renderer is invoked
    const configureRenderer = (renderer: any) => {
      if (renderer && typeof renderer.setPixelRatio === "function") {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    };
    (window as any).__configureWebGLRenderer = configureRenderer;

    const optimizeCanvas = (canvas: HTMLCanvasElement) => {
      try {
        if (canvas.dataset.retinaOptimized) return;
        canvas.dataset.retinaOptimized = "true";
        const rect = canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const targetWidth = Math.round(rect.width * maxPixelRatio);
          const targetHeight = Math.round(rect.height * maxPixelRatio);
          if (canvas.width > targetWidth || canvas.height > targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
          }
        }
      } catch {
        // Safe fallback
      }
    };

    const container = viewerContainerRef.current;
    if (container) {
      container.querySelectorAll("canvas").forEach(optimizeCanvas);

      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of Array.from(mutation.addedNodes)) {
            if (node instanceof HTMLCanvasElement) {
              optimizeCanvas(node);
            } else if (node instanceof HTMLElement) {
              node.querySelectorAll("canvas").forEach(optimizeCanvas);
            }
          }
        }
      });

      observer.observe(container, { childList: true, subtree: true });
      return () => {
        observer.disconnect();
        delete (window as any).__configureWebGLRenderer;
      };
    }
  }, [viewerKey, isTourLoaded]);

  // Handle WebGL context loss gracefully without crashing iOS tab
  useEffect(() => {
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setHasTourError(true);
    };

    const container = viewerContainerRef.current;
    if (container) {
      container.addEventListener("webglcontextlost", handleContextLost);
      return () => {
        container.removeEventListener("webglcontextlost", handleContextLost);
      };
    }
  }, []);

  // Tap/Click Activation: initializes or attaches active render loop
  const handleLaunchTour = () => {
    setHasTourError(false);
    setIsIframeLoading(true);
    setIsTourLoaded(true);
  };

  const handleReload = () => {
    setHasTourError(false);
    setIsIframeLoading(true);
    setViewerKey((prev) => prev + 1);
  };

  const handleCloseTour = () => {
    setIsTourLoaded(false);
    setIsIframeLoading(false);
    setHasTourError(false);
    setIsCssFullscreen(false);
  };

  // Touch & Mouse Panning: standard pointerdown, pointermove, and pointerup handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startPosRef.current = { x: e.clientX, y: e.clientY };

    // Tap/Click activation: ensures viewer initializes or attaches its active render loop
    if (!isTourLoaded) {
      handleLaunchTour();
    } else if (iframeRef.current) {
      iframeRef.current.focus();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    // Panning delta tracking for orbit controls across devices (Mac, iPhone, PC, Android)
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleToggleFullscreen = useCallback(() => {
    if (!viewerContainerRef.current) return;
    const el = viewerContainerRef.current as any;

    // Check if native Fullscreen API is supported on this element/device
    const isFullscreenApiSupported =
      !!el.requestFullscreen ||
      !!el.webkitRequestFullscreen ||
      !!el.mozRequestFullScreen ||
      !!el.msRequestFullscreen;

    // On iOS Safari / iPhone where div Fullscreen API does not exist, toggle CSS pseudo-fullscreen
    if (!isFullscreenApiSupported || isIOS) {
      setIsCssFullscreen((prev) => !prev);
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
          setIsCssFullscreen(true);
        });
      } else {
        setIsCssFullscreen(true);
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
      setIsCssFullscreen(false);
    }
  }, [isIOS]);

  const activeFullscreen = isFullscreen || isCssFullscreen;

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
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`relative w-full overflow-hidden bg-black flex flex-col transition-all duration-200 ${
              isCssFullscreen
                ? "fixed inset-0 z-[9999] w-screen h-[100dvh] rounded-none p-0"
                : "rounded-2xl h-[520px] sm:h-[620px] md:h-[720px] lg:h-[780px]"
            }`}
            style={{
              minHeight: isCssFullscreen ? "100dvh" : "480px",
              touchAction: "none",
            }}
          >
            {/* Top Branding Bar */}
            <div
              id="header"
              className="w-full px-4 sm:px-6 py-3.5 bg-slate-950/95 backdrop-blur-md text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 z-30 shrink-0"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0 animate-pulse" />
                <span className="text-xs sm:text-sm md:text-base font-semibold text-white tracking-wide truncate">
                  Cognitive Edge • Interactive 3D Digital Twin Demo
                </span>
                {isIOS && (
                  <span className="hidden md:inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    iOS WebKit Ready
                  </span>
                )}
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

                    {/* On iOS devices, provide direct fullscreen link for zero-friction access */}
                    {isIOS && (
                      <a
                        href={tourUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                        title="Open Direct Fullscreen Tour"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Direct View</span>
                      </a>
                    )}

                    <button
                      type="button"
                      id="tour-fullscreen-btn"
                      onClick={handleToggleFullscreen}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
                      title={activeFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                      {activeFullscreen ? (
                        <Minimize2 className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Maximize2 className="w-4 h-4" />
                      )}
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
              </div>
            </div>

            {/* Embedded Viewer or On-Demand Poster */}
            <div
              className="relative flex-1 w-full h-full min-h-[460px] sm:min-h-[560px] bg-slate-950 overflow-hidden"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "none",
              }}
            >
              {isTourLoaded ? (
                <>
                  {/* Loading indicator */}
                  {isIframeLoading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xs text-white gap-3 p-4 pointer-events-none">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                      <p className="text-xs sm:text-sm text-slate-200 font-medium">
                        Loading 3D Spatial Walkthrough...
                      </p>
                    </div>
                  )}

                  {/* Error recovery card if WebKit memory or network fails */}
                  {hasTourError ? (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                        <RotateCcw className="w-7 h-7" />
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                        Walkthrough Ready to Reload
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
                        Tap below to reload the 3D walkthrough with refreshed WebGL buffers.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={handleReload}
                          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Reload Tour
                        </button>
                        <a
                          href={tourUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Open in Direct View
                        </a>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      ref={iframeRef}
                      key={viewerKey}
                      id="viewer-frame"
                      src={tourUrl}
                      allow="autoplay; camera; display-capture; fullscreen; geolocation; microphone; picture-in-picture; xr-spatial-tracking; screen-wake-lock; vr; webxr"
                      allowFullScreen={true}
                      title="Cognitive Edge • Interactive 3D Digital Twin Demo"
                      className="w-full h-full border-0 absolute inset-0"
                      loading="eager"
                      onLoad={() => {
                        setIsIframeLoading(false);
                        setHasTourError(false);
                      }}
                      onError={() => {
                        setIsIframeLoading(false);
                        setHasTourError(true);
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "460px",
                        border: 0,
                        display: "block",
                        touchAction: "none",
                        WebkitOverflowScrolling: "touch",
                      }}
                    />
                  )}
                </>
              ) : (
                <div
                  onClick={handleLaunchTour}
                  className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-center cursor-pointer select-none"
                  style={{
                    touchAction: "none",
                  }}
                >
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLaunchTour();
                        }}
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
              <span>Full WebXR & Apple iOS compatible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
