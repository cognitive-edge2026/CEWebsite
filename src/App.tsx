import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { CredentialsSection } from "./components/CredentialsSection";
import { WhyCognitiveEdgeSection } from "./components/WhyCognitiveEdgeSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { CredentialsPage } from "./pages/CredentialsPage";
import { BrochureViewerPage } from "./pages/BrochureViewerPage";
import { CredentialOptionId } from "./data/credentialsData";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
            <h2 className="text-xl font-bold text-red-400 mb-2">Something went wrong</h2>
            <p className="text-sm text-slate-300 mb-6">
              An unexpected error occurred. Please refresh the page to reload Cognitive Edge.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ce_theme");
        if (saved) return saved === "dark";
        if (typeof window.matchMedia === "function") {
          return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
      } catch {
        // Storage access may be restricted in sandboxed iframes
        return false;
      }
    }
    return false;
  });

  const [selectedService, setSelectedService] = useState<string>("Digital Twin Creation");

  // Multi-page routing state for Credentials Page and Brochure Viewer
  const [currentPage, setCurrentPage] = useState<"home" | "credentials" | "brochure-viewer">(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path.includes("brochure") || hash.includes("brochure") || search.includes("brochure")) {
        return "brochure-viewer";
      }
      if (path.includes("credentials") || hash.includes("credentials")) {
        return "credentials";
      }
    }
    return "home";
  });

  const [credentialsOption, setCredentialsOption] =
    useState<CredentialOptionId>("vr-walkthrough");

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path.includes("brochure") || hash.includes("brochure") || search.includes("brochure")) {
        setCurrentPage("brochure-viewer");
      } else if (path.includes("credentials") || hash.includes("credentials")) {
        setCurrentPage("credentials");
        if (e.state && e.state.category) {
          setCredentialsOption(e.state.category);
        }
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateToCredentials = (
    category: CredentialOptionId = "vr-walkthrough"
  ) => {
    setCredentialsOption(category);
    setCurrentPage("credentials");
    try {
      window.history.pushState(
        { page: "credentials", category },
        "",
        "/credentials"
      );
    } catch {
      window.location.hash = "/credentials";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = (sectionId?: string) => {
    setCurrentPage("home");
    try {
      window.history.pushState(
        { page: "home" },
        "",
        sectionId ? `/#${sectionId}` : "/"
      );
    } catch {
      window.location.hash = sectionId ? `#${sectionId}` : "";
    }
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (darkMode) {
        root.classList.add("dark");
        localStorage.setItem("ce_theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("ce_theme", "light");
      }
    } catch {
      // Storage access may be restricted in sandboxed iframes
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  // Render dedicated Brochure Viewer Page (rotated 90° by default)
  if (currentPage === "brochure-viewer") {
    return (
      <ErrorBoundary>
        <BrochureViewerPage
          onBackToHome={() => navigateToCredentials("brochures")}
        />
      </ErrorBoundary>
    );
  }

  // Render dedicated Credentials Page if user requested
  if (currentPage === "credentials") {
    return (
      <ErrorBoundary>
        <CredentialsPage
          initialOption={credentialsOption}
          onBackToHome={() => navigateToHome()}
          onContactClick={() => navigateToHome("contact")}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
        {/* Navigation Header */}
        <Header
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          currentPage={currentPage}
          onNavigate={(page, sectionId, optionId) => {
            if (page === "credentials") {
              navigateToCredentials(optionId);
            } else {
              navigateToHome(sectionId);
            }
          }}
        />

        {/* Main Content Sections */}
        <main className="relative">
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. About Us, Our Approach, Why It Works, How We Collaborate */}
          <AboutSection />

          {/* 3. Our Services */}
          <ServicesSection onSelectService={handleSelectService} />

          {/* 4. Our Credentials Section with Dropdown menu that loads on new page */}
          <CredentialsSection
            onOpenCredentialsPage={(opt) => navigateToCredentials(opt)}
          />

          {/* 5. Why Cognitive Edge (3 Metrics from Flyer + Builder/Customer KPIs) */}
          <WhyCognitiveEdgeSection />

          {/* 6. Contact Us Section (Name, Company, All USA States & Cities Dropdown) */}
          <ContactSection prefilledService={selectedService} />
        </main>

        {/* Footer */}
        <Footer onOpenCredentialsPage={() => navigateToCredentials()} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
