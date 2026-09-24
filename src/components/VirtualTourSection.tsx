import React, { useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js instances ref
  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    mesh: THREE.Mesh | null;
    texture: THREE.Texture | null;
    geometry: THREE.BufferGeometry | null;
    material: THREE.Material | null;
    animationFrameId: number | null;
    lon: number;
    lat: number;
    targetLon: number;
    targetLat: number;
    isUserInteracting: boolean;
    onPointerDownPointerX: number;
    onPointerDownPointerY: number;
    onPointerDownLon: number;
    onPointerDownLat: number;
    touchStartDistance: number;
    touchStartFov: number;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    mesh: null,
    texture: null,
    geometry: null,
    material: null,
    animationFrameId: null,
    lon: 0,
    lat: 0,
    targetLon: 0,
    targetLat: 0,
    isUserInteracting: false,
    onPointerDownPointerX: 0,
    onPointerDownPointerY: 0,
    onPointerDownLon: 0,
    onPointerDownLat: 0,
    touchStartDistance: 0,
    touchStartFov: 75,
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCssFullscreen, setIsCssFullscreen] = useState(false);
  const [isTourLoaded, setIsTourLoaded] = useState(false);
  const [isViewerLoading, setIsViewerLoading] = useState(false);
  const [hasTourError, setHasTourError] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // High-fidelity cloud tour URL for external / direct full-screen walkthrough
  const tourUrl = "https://viz.spaceviz.ai/mhxp-dev/SanjeeviniTheBerriesForBirds.mhx/225/index.html";

  // Optimized, lightweight 2048x1024 360 panorama image (eliminates iOS memory crash)
  const panoramaAsset = "/panoramas/luxury_villa_atrium_2048.jpg";

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

  // Clean disposal of all Three.js resources to prevent memory leaks on mobile
  const cleanupThree = useCallback(() => {
    const state = threeRef.current;
    if (state.animationFrameId !== null) {
      cancelAnimationFrame(state.animationFrameId);
      state.animationFrameId = null;
    }

    if (state.geometry) {
      state.geometry.dispose();
      state.geometry = null;
    }
    if (state.texture) {
      state.texture.dispose();
      state.texture = null;
    }
    if (state.material) {
      if (Array.isArray(state.material)) {
        state.material.forEach((m) => m.dispose());
      } else {
        state.material.dispose();
      }
      state.material = null;
    }
    if (state.mesh && state.scene) {
      state.scene.remove(state.mesh);
      state.mesh = null;
    }
    if (state.renderer) {
      state.renderer.dispose();
      state.renderer.forceContextLoss();
      state.renderer = null;
    }
    state.scene = null;
    state.camera = null;
  }, []);

  // Initialize Three.js WebGL canvas ONLY when user explicitly starts the tour
  const initThreeViewer = useCallback(() => {
    if (!canvasRef.current || !viewerContainerRef.current) return;

    cleanupThree();
    setIsViewerLoading(true);
    setHasTourError(false);

    try {
      const container = viewerContainerRef.current;
      const canvas = canvasRef.current;
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 500;

      // 1. Detect mobile devices / iOS and hard-cap the pixel ratio to prevent GPU memory crash
      const isMobileOrIOS =
        /iPad|iPhone|iPod|Android/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      // 2. Low-memory canvas configuration: low-power, antialias false, failIfMajorPerformanceCaveat true
      const renderer = new THREE.WebGLRenderer({
        canvas,
        powerPreference: "low-power",
        antialias: false,
        failIfMajorPerformanceCaveat: true,
      });

      // Lower Canvas Resolution on iOS: hard-cap pixel ratio at 1.25 on iOS/mobile, max 2 on desktop
      const pixelRatio = isMobileOrIOS
        ? Math.min(window.devicePixelRatio || 1, 1.25)
        : Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);

      // 3. Graceful fallback on WebGL context loss so page does NOT auto-refresh
      const handleContextLost = (e: Event) => {
        e.preventDefault();
        cleanupThree();
        setHasTourError(true);
        setIsViewerLoading(false);
      };
      canvas.addEventListener("webglcontextlost", handleContextLost, false);

      // 4. Scene and Perspective Camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);

      // 5. Inverted Sphere geometry for 360 panorama
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1);

      // 6. Texture Memory Safeguards: generateMipmaps = false, minFilter = THREE.LinearFilter
      const loader = new THREE.TextureLoader();
      loader.crossOrigin = "anonymous";
      loader.load(
        panoramaAsset,
        (texture) => {
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.colorSpace = THREE.SRGBColorSpace;

          const material = new THREE.MeshBasicMaterial({ map: texture });
          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);

          threeRef.current.texture = texture;
          threeRef.current.material = material;
          threeRef.current.mesh = mesh;
          threeRef.current.geometry = geometry;

          setIsViewerLoading(false);
          setHasTourError(false);
        },
        undefined,
        () => {
          // Fallback if local asset fails
          setIsViewerLoading(false);
          setHasTourError(true);
        }
      );

      threeRef.current.renderer = renderer;
      threeRef.current.scene = scene;
      threeRef.current.camera = camera;
      threeRef.current.lon = 0;
      threeRef.current.lat = 0;
      threeRef.current.targetLon = 0;
      threeRef.current.targetLat = 0;

      // 7. Render Loop with smooth damping
      const animate = () => {
        const state = threeRef.current;
        if (!state.renderer || !state.scene || !state.camera) return;

        // Smooth damping interpolation
        state.lon += (state.targetLon - state.lon) * 0.1;
        state.lat += (state.targetLat - state.lat) * 0.1;

        // Clamp latitude to avoid gimbal flip
        state.lat = Math.max(-85, Math.min(85, state.lat));

        const phi = THREE.MathUtils.degToRad(90 - state.lat);
        const theta = THREE.MathUtils.degToRad(state.lon);

        const target = new THREE.Vector3(
          500 * Math.sin(phi) * Math.cos(theta),
          500 * Math.cos(phi),
          500 * Math.sin(phi) * Math.sin(theta)
        );

        state.camera.lookAt(target);
        state.renderer.render(state.scene, state.camera);

        state.animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    } catch {
      cleanupThree();
      setHasTourError(true);
      setIsViewerLoading(false);
    }
  }, [cleanupThree, panoramaAsset]);

  // Re-run viewer initialization when isTourLoaded transitions to true
  useEffect(() => {
    if (isTourLoaded) {
      initThreeViewer();
    } else {
      cleanupThree();
    }

    return () => {
      cleanupThree();
    };
  }, [isTourLoaded, initThreeViewer, cleanupThree]);

  // Resize handler for responsive canvas
  useEffect(() => {
    const handleResize = () => {
      const state = threeRef.current;
      if (!state.renderer || !state.camera || !viewerContainerRef.current) return;

      const width = viewerContainerRef.current.clientWidth;
      const height = viewerContainerRef.current.clientHeight;

      state.camera.aspect = width / height;
      state.camera.updateProjectionMatrix();
      state.renderer.setSize(width, height, false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Controls: Pure touch-drag / mouse-drag panning controls (NO gyroscope orientation events)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isTourLoaded) {
      handleLaunchTour();
      return;
    }

    const state = threeRef.current;
    state.isUserInteracting = true;
    state.onPointerDownPointerX = e.clientX;
    state.onPointerDownPointerY = e.clientY;
    state.onPointerDownLon = state.targetLon;
    state.onPointerDownLat = state.targetLat;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = threeRef.current;
    if (!state.isUserInteracting) return;

    // Standard pointer/touch panning orbit sensitivity
    state.targetLon = (state.onPointerDownPointerX - e.clientX) * 0.15 + state.onPointerDownLon;
    state.targetLat = (e.clientY - state.onPointerDownPointerY) * 0.15 + state.onPointerDownLat;
  };

  const handlePointerUp = () => {
    const state = threeRef.current;
    state.isUserInteracting = false;
  };

  // Scroll wheel to zoom in / out
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const state = threeRef.current;
    if (!state.camera) return;

    const fov = state.camera.fov + e.deltaY * 0.05;
    state.camera.fov = THREE.MathUtils.clamp(fov, 35, 90);
    state.camera.updateProjectionMatrix();
  };

  // Touch gesture handler for 2-finger pinch zoom
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const state = threeRef.current;
    if (e.touches.length === 2 && state.camera) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);

      if (state.touchStartDistance > 0) {
        const factor = state.touchStartDistance / dist;
        const newFov = state.touchStartFov * factor;
        state.camera.fov = THREE.MathUtils.clamp(newFov, 35, 90);
        state.camera.updateProjectionMatrix();
      } else {
        state.touchStartDistance = dist;
        state.touchStartFov = state.camera.fov;
      }
    }
  };

  const handleTouchEnd = () => {
    const state = threeRef.current;
    state.touchStartDistance = 0;
  };

  // User Actions
  const handleLaunchTour = () => {
    setHasTourError(false);
    setIsTourLoaded(true);
  };

  const handleReload = () => {
    setHasTourError(false);
    initThreeViewer();
  };

  const handleCloseTour = () => {
    cleanupThree();
    setIsTourLoaded(false);
    setIsViewerLoading(false);
    setHasTourError(false);
    setIsCssFullscreen(false);
  };

  const handleResetOrientation = () => {
    const state = threeRef.current;
    state.targetLon = 0;
    state.targetLat = 0;
    if (state.camera) {
      state.camera.fov = 75;
      state.camera.updateProjectionMatrix();
    }
  };

  const handleToggleFullscreen = useCallback(() => {
    if (!viewerContainerRef.current) return;
    const el = viewerContainerRef.current as any;

    const isFullscreenApiSupported =
      !!el.requestFullscreen ||
      !!el.webkitRequestFullscreen ||
      !!el.mozRequestFullScreen ||
      !!el.msRequestFullscreen;

    // On iOS Safari / iPhone where div Fullscreen API does not exist, toggle CSS pseudo-fullscreen
    if (!isFullscreenApiSupported || isIOS) {
      setIsCssFullscreen((prev) => !prev);
      setTimeout(() => {
        const state = threeRef.current;
        if (state.renderer && state.camera && viewerContainerRef.current) {
          const w = viewerContainerRef.current.clientWidth;
          const h = viewerContainerRef.current.clientHeight;
          state.camera.aspect = w / h;
          state.camera.updateProjectionMatrix();
          state.renderer.setSize(w, h, false);
        }
      }, 100);
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
            onWheel={handleWheel}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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
                      onClick={() => {
                        handleResetOrientation();
                        handleReload();
                      }}
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
              className="relative flex-1 w-full h-full min-h-[460px] sm:min-h-[560px] bg-slate-950 overflow-hidden select-none cursor-grab active:cursor-grabbing"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "none",
              }}
            >
              {isTourLoaded ? (
                <>
                  {/* Loading indicator */}
                  {isViewerLoading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xs text-white gap-3 p-4 pointer-events-none">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                      <p className="text-xs sm:text-sm text-slate-200 font-medium">
                        Loading 3D Spatial Walkthrough...
                      </p>
                    </div>
                  )}

                  {/* Error recovery card if WebGL context drops: does NOT auto-refresh page */}
                  {hasTourError ? (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                        <RotateCcw className="w-7 h-7" />
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                        Tap to retry loading 360 view
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
                    /* Native Low-Memory Three.js Canvas */
                    <canvas
                      ref={canvasRef}
                      id="tour-webgl-canvas"
                      className="w-full h-full block absolute inset-0 touch-none outline-none"
                      style={{
                        width: "100%",
                        height: "100%",
                        touchAction: "none",
                        display: "block",
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
