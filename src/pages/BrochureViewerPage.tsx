import React, { useState, useEffect, useRef } from "react";
import {
  RotateCw,
  RotateCcw,
  Maximize2,
  Minimize2,
  ExternalLink,
  ArrowLeft,
  FileText,
  RefreshCw,
  Sparkles,
} from "lucide-react";

interface BrochureViewerPageProps {
  onBackToHome?: () => void;
  pdfUrl?: string;
  rawGoogleDriveUrl?: string;
}

export const BrochureViewerPage: React.FC<BrochureViewerPageProps> = ({
  onBackToHome,
  pdfUrl = "https://drive.google.com/file/d/1VyImKdDRYw6X-IWGyf745ByxKt5vEoja/preview",
  rawGoogleDriveUrl = "https://drive.google.com/file/d/1VyImKdDRYw6X-IWGyf745ByxKt5vEoja/view?usp=sharing",
}) => {
  // Read initial rotation from URL query string if provided, default to 90 degrees
  const [rotation, setRotation] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const rotateParam = params.get("rotate");
        if (rotateParam !== null) {
          const parsed = parseInt(rotateParam, 10);
          if (!isNaN(parsed)) return parsed % 360;
        }
      } catch (_) {}
    }
    return 90; // Default to 90 degrees rotation when opened in new tab as requested
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight - 64 : 800,
  });

  // Track container size using ResizeObserver
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({
          width: Math.max(320, rect.width),
          height: Math.max(400, rect.height),
        });
      } else if (typeof window !== "undefined") {
        setContainerSize({
          width: window.innerWidth,
          height: window.innerHeight - 64,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleRotateClockwise = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleRotateCounterClockwise = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  };

  const handleResetRotation = () => {
    setRotation(0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const isRotated90or270 = rotation === 90 || rotation === 270;

  // Calculate dimensions for rotated iframe:
  // When rotated 90 or 270 degrees, the iframe width becomes optical height, and iframe height becomes optical width.
  // To avoid overflow, iframe width should equal container height, and iframe height should equal container width.
  const iframeStyle: React.CSSProperties = isRotated90or270
    ? {
        width: `${containerSize.height}px`,
        height: `${containerSize.width}px`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center",
        maxWidth: "none",
        maxHeight: "none",
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }
    : {
        width: "100%",
        height: "100%",
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center",
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      };

  return (
    <div
      id="brochure-viewer-page"
      className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden select-none font-sans"
    >
      {/* Top Header Controls Bar */}
      <header className="h-16 px-4 sm:px-6 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0 z-30 shadow-md">
        {/* Left: Brand & Back */}
        <div className="flex items-center gap-3 min-w-0">
          {onBackToHome ? (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Return to website"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Site</span>
            </button>
          ) : (
            <a
              href="/#credentials"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Return to website"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Site</span>
            </a>
          )}

          <div className="flex items-center gap-2 truncate">
            <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h1 className="text-sm sm:text-base font-bold text-white truncate">
                Digital Project Brochure & Architectural Specifications
              </h1>
              <p className="text-[11px] text-slate-400 hidden md:block truncate">
                The Sixteen — Photorealistic Deliverables & Material Specs
              </p>
            </div>
          </div>
        </div>

        {/* Center/Right: Rotation Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Active Rotation Indicator */}
          <span
            id="viewer-rotation-indicator"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20"
            title="Current PDF Rotation"
          >
            <Sparkles className="w-3 h-3" />
            <span>{rotation}° Rotated</span>
          </span>

          {/* Rotate 90° Clockwise Button */}
          <button
            id="btn-viewer-rotate-cw"
            type="button"
            onClick={handleRotateClockwise}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all cursor-pointer"
            title="Rotate 90 degrees clockwise"
          >
            <RotateCw className="w-4 h-4" />
            <span className="hidden sm:inline">Rotate 90°</span>
          </button>

          {/* Rotate Counter-Clockwise Button */}
          <button
            id="btn-viewer-rotate-ccw"
            type="button"
            onClick={handleRotateCounterClockwise}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Rotate 90 degrees counter-clockwise"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Reset Rotation to 0° */}
          {rotation !== 0 && (
            <button
              id="btn-viewer-reset-rotation"
              type="button"
              onClick={handleResetRotation}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Reset rotation to 0°"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">0°</span>
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Open Raw in Google Drive */}
          <a
            id="btn-viewer-google-drive-link"
            href={rawGoogleDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Open original file directly in Google Drive"
          >
            <span className="hidden lg:inline">Google Drive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Viewport Container */}
      <main
        ref={containerRef}
        className="flex-1 w-full relative overflow-hidden bg-slate-950 flex items-center justify-center"
      >
        <iframe
          id="brochure-newtab-viewer-iframe"
          src={pdfUrl}
          style={iframeStyle}
          className="border-0 shadow-2xl bg-white"
          title="Digital Project Brochure & Architectural Specifications - The Sixteen (Rotated 90°)"
          allow="autoplay"
        />
      </main>
    </div>
  );
};
