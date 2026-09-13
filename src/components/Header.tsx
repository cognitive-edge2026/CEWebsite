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
  currentPage?: "home" | "credentials";
  onNavigate?: (
    page: "home" | "credentials",
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { label: "Our Credentials", href: "/credentials", sectionId: "credentials" },
    { label: "Why Cognitive Edge", href: "#why-cognitive-edge", sectionId: "why-cognitive-edge" },
    { label: "Contact", href: "#contact", sectionId: "contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent,
    link: (typeof navLinks)[0],
    optionId?: CredentialOptionId
  ) => {
    if (link.sectionId === "credentials") {
      e.preventDefault();
      setCredentialsDropdownOpen(false);
      onNavigate?.("credentials", undefined, optionId || "vr-walkthrough");
    } else if (currentPage === "credentials") {
      e.preventDefault();
      onNavigate?.("home", link.sectionId);
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
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 py-2.5"
          : "bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200/40 dark:border-slate-800/40 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            if (currentPage === "credentials") {
              e.preventDefault();
              onNavigate?.("home", "hero");
            }
          }}
          className="flex items-center group transition-transform hover:scale-[1.01]"
          id="header-brand-link"
        >
          <Logo size="sm" showTagline={true} />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3" id="desktop-navbar">
          {navLinks.map((link) => {
            const isCredentials = link.sectionId === "credentials";
            const isActive = isCredentials && currentPage === "credentials";

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
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      isActive || credentialsDropdownOpen
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 dark:text-slate-200 dark:hover:text-cyan-400 dark:hover:bg-slate-800/80"
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
                    <div className="absolute top-full left-0 pt-2 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-2 space-y-1">
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Deliverable Showcases
                        </div>
                        {credentialSubOptions.map((opt) => {
                          const SubIcon = opt.icon;
                          return (
                            <button
                              key={opt.id}
                              id={`header-dropdown-${opt.id}`}
                              onClick={() => handleCredentialOptionSelect(opt.id)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-blue-50 dark:hover:bg-slate-800/80 transition-colors group/item cursor-pointer"
                            >
                              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform">
                                <SubIcon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover/item:text-blue-600 dark:group-hover/item:text-cyan-400 transition-colors">
                                  {opt.label}
                                </div>
                                <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                  {opt.tag}
                                </div>
                              </div>
                            </button>
                          );
                        })}

                        <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/80">
                          <button
                            onClick={(e) => handleNavClick(e, link)}
                            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-bold text-blue-600 dark:text-cyan-400 hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                          >
                            <span>Explore Full Credentials</span>
                            <ArrowRight className="w-3 h-3" />
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
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 dark:text-slate-200 dark:hover:text-cyan-400 dark:hover:bg-slate-800/80"
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

          {/* Contact Direct CTA Button */}
          <a
            href="#contact"
            id="header-contact-cta"
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>Contact Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 cursor-pointer"
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl"
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
                            className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 hover:border-blue-400 dark:hover:text-cyan-400 transition-colors"
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
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
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
