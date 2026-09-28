import React, { useState, useEffect, useRef } from "react";
import { Logo } from "./Logo";
import {
  Sun,
  Moon,
  Menu,
  X,
  Phone,
  ArrowRight,
  ChevronDown,
  Glasses,
  Video,
  Image as ImageIcon,
  FileSpreadsheet,
} from "lucide-react";
import { CredentialOptionId } from "../data/credentialsData";

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  currentPage?: "home" | "credentials" | "brochure-viewer";
  onNavigate?: (
    page: "home" | "credentials" | "brochure-viewer",
    sectionId?: string,
    optionId?: CredentialOptionId
  ) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  currentPage = "home",
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [credentialsDropdownOpen, setCredentialsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const quickNavRef = useRef<HTMLElement>(null);

  // Mobile Header Auto-Scroll state & refs
  const [isInteracting, setIsInteracting] = useState(false);
  const isInteractingRef = useRef(false);
  const scrollDirectionRef = useRef<"forward" | "backward">("forward");
  const isWaitingRef = useRef(false);
  const waitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userTouchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    isInteractingRef.current = isInteracting;
  }, [isInteracting]);

  const handleTouchStart = () => {
    if (userTouchTimeoutRef.current) clearTimeout(userTouchTimeoutRef.current);
    setIsInteracting(true);
  };

  const handleTouchEnd = () => {
    if (userTouchTimeoutRef.current) clearTimeout(userTouchTimeoutRef.current);
    userTouchTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 3500);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Track active section on home page
      if (currentPage === "home") {
        const sectionIds = [
          "contact",
          "why-cognitive-edge",
          "credentials",
          "virtual-tour",
          "services",
          "collaboration",
          "why-it-works",
          "approach",
          "about",
          "hero",
        ];
        const scrollPosition = window.scrollY + 200;
        for (const sId of sectionIds) {
          const el = document.getElementById(sId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCredentialsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. Auto-scroll mobile quick-nav to keep the active section in view as user scrolls the website
  useEffect(() => {
    const container = quickNavRef.current;
    if (!container) return;

    if (activeSection === "hero" && currentPage === "home") {
      container.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      return;
    }

    const activeBtn = container.querySelector<HTMLElement>('[data-active="true"]');
    if (activeBtn) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const currentScrollLeft = container.scrollLeft;
      const targetScrollLeft =
        currentScrollLeft +
        (btnRect.left - containerRect.left) -
        containerRect.width / 2 +
        btnRect.width / 2;

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: "smooth",
      });
    }
  }, [activeSection, currentPage]);

  // 2. Ambient auto-scroll on mobile when at the top so all sections are displayed
  useEffect(() => {
    if (activeSection !== "hero" || isInteracting || currentPage !== "home") {
      return;
    }

    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const step = (now: number) => {
      const delta = now - lastTimestamp;
      lastTimestamp = now;

      const container = quickNavRef.current;
      if (
        container &&
        container.offsetParent !== null &&
        !isInteractingRef.current &&
        !isWaitingRef.current
      ) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 2) {
          const speed = 0.035 * delta;
          if (scrollDirectionRef.current === "forward") {
            if (container.scrollLeft >= maxScroll - 3) {
              isWaitingRef.current = true;
              if (waitTimeoutRef.current) clearTimeout(waitTimeoutRef.current);
              waitTimeoutRef.current = setTimeout(() => {
                scrollDirectionRef.current = "backward";
                isWaitingRef.current = false;
              }, 2000);
            } else {
              container.scrollLeft += speed;
            }
          } else {
            if (container.scrollLeft <= 3) {
              isWaitingRef.current = true;
              if (waitTimeoutRef.current) clearTimeout(waitTimeoutRef.current);
              waitTimeoutRef.current = setTimeout(() => {
                scrollDirectionRef.current = "forward";
                isWaitingRef.current = false;
              }, 2000);
            } else {
              container.scrollLeft -= speed * 1.5;
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (waitTimeoutRef.current) clearTimeout(waitTimeoutRef.current);
    };
  }, [activeSection, isInteracting, currentPage]);

  const credentialSubOptions = [
    {
      id: "vr-walkthrough" as CredentialOptionId,
      label: "VR Walkthrough",
      icon: Glasses,
      tag: "Interactive 3D",
    },
    {
      id: "video-walkthrough" as CredentialOptionId,
      label: "Video Walkthrough",
      icon: Video,
      tag: "Cinematic 4K",
    },
    {
      id: "renders" as CredentialOptionId,
      label: "Renders",
      icon: ImageIcon,
      tag: "Ultra 8K Stills",
    },
    {
      id: "brochures" as CredentialOptionId,
      label: "Brochures",
      icon: FileSpreadsheet,
      tag: "Print & Digital",
    },
  ];

  const navLinks = [
    { label: "About", href: "#about", sectionId: "about" },
    { label: "Our Approach", href: "#approach", sectionId: "approach" },
    { label: "Why It Works", href: "#why-it-works", sectionId: "why-it-works" },
    { label: "Collaboration", href: "#collaboration", sectionId: "collaboration" },
    { label: "Services", href: "#services", sectionId: "services" },
    { label: "360° Virtual Tour", href: "#virtual-tour", sectionId: "virtual-tour" },
    { label: "Our Credentials", href: "/credentials", sectionId: "credentials" },
    { label: "Why Cognitive Edge", href: "#why-cognitive-edge", sectionId: "why-cognitive-edge" },
    { label: "Contact", href: "#contact", sectionId: "contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent,
    link: (typeof navLinks)[0],
    optionId?: CredentialOptionId
  ) => {
    e.preventDefault();

    // Pause ambient auto-scroll when user interacts with nav pills
    setIsInteracting(true);
    if (userTouchTimeoutRef.current) clearTimeout(userTouchTimeoutRef.current);
    userTouchTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 3500);

    // Smoothly center the clicked button in the quick-nav bar
    const container = quickNavRef.current;
    if (container) {
      const targetBtn = container.querySelector<HTMLElement>(`[data-section="${link.sectionId}"]`);
      if (targetBtn) {
        const containerRect = container.getBoundingClientRect();
        const btnRect = targetBtn.getBoundingClientRect();
        const currentScrollLeft = container.scrollLeft;
        const targetScrollLeft =
          currentScrollLeft +
          (btnRect.left - containerRect.left) -
          containerRect.width / 2 +
          btnRect.width / 2;

        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: "smooth",
        });
      }
    }

    if (link.sectionId === "credentials") {
      setCredentialsDropdownOpen(false);
      setMobileMenuOpen(false);
      onNavigate?.("credentials", undefined, optionId || "vr-walkthrough");
    } else if (currentPage !== "home") {
      setMobileMenuOpen(false);
      onNavigate?.("home", link.sectionId);
    } else {
      setMobileMenuOpen(false);
      const el = document.getElementById(link.sectionId);
      if (el) {
        const navOffset = 90;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const handleCredentialOptionSelect = (optionId: CredentialOptionId) => {
    setCredentialsDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate?.("credentials", undefined, optionId);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 py-2"
          : "bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            if (currentPage !== "home") {
              e.preventDefault();
              onNavigate?.("home", "hero");
            }
          }}
          className="flex items-center group transition-transform hover:scale-[1.01]"
          id="header-brand-link"
        >
          <Logo size="sm" showTagline={true} />
        </a>

        {/* Desktop & Laptop Navigation - Active in desktop mode (screens >= 1024px / lg) */}
        <nav className="hidden lg:flex items-center gap-0.5 lg:gap-1.5 xl:gap-2.5 2xl:gap-3" id="desktop-navbar">
          {navLinks.map((link) => {
            const isCredentials = link.sectionId === "credentials";
            const isActive = isCredentials
              ? currentPage === "credentials"
              : currentPage === "home" && activeSection === link.sectionId;

            if (isCredentials) {
              return (
                <div
                  key={link.href}
                  ref={dropdownRef}
                  className="relative group"
                  onMouseEnter={() => setCredentialsDropdownOpen(true)}
                  onMouseLeave={() => setCredentialsDropdownOpen(false)}
                >
                  <button
                    onClick={(e) => handleNavClick(e, link)}
                    id="nav-link-our-credentials"
                    className={`inline-flex items-center gap-0.5 lg:gap-1 text-[13px] xl:text-[14px] font-semibold px-1.5 lg:px-2 xl:px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      isActive || credentialsDropdownOpen
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-700 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-blue-400 dark:hover:bg-slate-800/80"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        credentialsDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* 4 Credentials Options in Header Dropdown */}
                  {credentialsDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 w-64 z-50">
                      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-2 space-y-1">
                        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Deliverable Showcases
                        </div>
                        {credentialSubOptions.map((opt) => {
                          const SubIcon = opt.icon;
                          return (
                            <button
                              key={opt.id}
                              id={`header-dropdown-${opt.id}`}
                              onClick={() => handleCredentialOptionSelect(opt.id)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group/item cursor-pointer"
                            >
                              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform">
                                <SubIcon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[14px] font-bold text-slate-800 dark:text-slate-200 group-hover/item:text-blue-600 dark:group-hover/item:text-cyan-400 transition-colors">
                                  {opt.label}
                                </div>
                                <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                                  {opt.tag}
                                </div>
                              </div>
                            </button>
                          );
                        })}

                        <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/80">
                          <button
                            onClick={(e) => handleNavClick(e, link)}
                            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[14px] font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                          >
                            <span>Explore Full Credentials</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`text-[13px] xl:text-[14px] font-semibold px-1.5 lg:px-2 xl:px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-blue-400 dark:hover:bg-slate-800/80"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle (Light / Dark mode) */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleDarkMode}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 dark:text-slate-300 dark:hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700/90 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Mobile Menu Toggle Button - Strictly hidden in desktop mode */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 cursor-pointer"
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Quick-Nav Bar with Auto-Scroll - Active on mobile and tablet (screens < 1024px) */}
      <div className="relative lg:hidden w-full border-t border-slate-200/60 dark:border-slate-800/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md mt-1">
        {/* Left Edge Fade Hint */}
        <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-r from-white dark:from-slate-900 to-transparent pointer-events-none z-10 opacity-70" />
        {/* Right Edge Fade Hint */}
        <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-6 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none z-10 opacity-70" />

        <nav
          id="mobile-quick-nav-bar"
          ref={quickNavRef}
          aria-label="Quick Navigation"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onPointerDown={handleTouchStart}
          onPointerUp={handleTouchEnd}
          onWheel={handleTouchStart}
          onMouseEnter={handleTouchStart}
          onMouseLeave={handleTouchEnd}
          className="w-full overflow-x-auto no-scrollbar px-3 sm:px-4 py-1.5 flex items-center gap-1.5 sm:gap-2 md:gap-2.5 scroll-smooth select-none"
        >
          {navLinks.map((link) => {
            const isCredentials = link.sectionId === "credentials";
            const isActive = isCredentials
              ? currentPage === "credentials"
              : currentPage === "home" && activeSection === link.sectionId;

            return (
              <button
                key={`quick-${link.href}`}
                data-active={isActive ? "true" : "false"}
                data-section={link.sectionId}
                onClick={(e) => handleNavClick(e, link)}
                className={`px-3 sm:px-3.5 md:px-4 py-1 sm:py-1.5 rounded-full whitespace-nowrap transition-colors shrink-0 text-[13px] sm:text-[14px] font-semibold cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-cyan-400"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isCredentials = link.sectionId === "credentials";
              if (isCredentials) {
                return (
                  <div
                    key={link.href}
                    className="rounded-xl border border-slate-200/70 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 p-1.5 space-y-1"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleNavClick(e, link);
                      }}
                      className="text-sm font-bold px-3 py-2 rounded-lg text-slate-900 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                    </a>

                    {/* 4 Credentials Options in Mobile Drawer */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1 px-1">
                      {credentialSubOptions.map((opt) => {
                        const SubIcon = opt.icon;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleCredentialOptionSelect(opt.id)}
                            className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left text-[14px] font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 hover:border-blue-400 dark:hover:text-cyan-400 transition-colors"
                          >
                            <SubIcon className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                            <span className="truncate">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, link);
                  }}
                  className="text-sm font-medium px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
            <a
              href="#contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (currentPage !== "home") {
                  e.preventDefault();
                  onNavigate?.("home", "contact");
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Our Team</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
