import React from "react";
import { Logo } from "./Logo";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Zap,
} from "lucide-react";
import { WEBSITE_CONTENT } from "../data/websiteContent";

interface FooterProps {
  onOpenCredentialsPage?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCredentialsPage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="main-footer"
      className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <a href="#hero" className="mb-4">
              <Logo size="md" showTagline={true} />
            </a>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
              Specializing in creating immersive digital twins and virtual reality experiences that revolutionize how real estate and interior design projects are visualized and executed before construction begins.
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-blue-400">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-orange-400" /> 30% Faster Sales
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-400" /> 25% Cost Savings
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> 45% Faster Approvals
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  About Cognitive Edge
                </a>
              </li>
              <li>
                <a href="#approach" className="hover:text-blue-400 transition-colors">
                  Our Approach
                </a>
              </li>
              <li>
                <a href="#why-it-works" className="hover:text-blue-400 transition-colors">
                  Why It Works
                </a>
              </li>
              <li>
                <a href="#collaboration" className="hover:text-blue-400 transition-colors">
                  How We Collaborate
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="/credentials"
                  onClick={(e) => {
                    if (onOpenCredentialsPage) {
                      e.preventDefault();
                      onOpenCredentialsPage();
                    }
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Our Credentials
                </a>
              </li>
              <li>
                <a href="#why-cognitive-edge" className="hover:text-blue-400 transition-colors">
                  Why Cognitive Edge (Metrics)
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="lg:col-span-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Direct Inquiries
            </h4>
            <div className="space-y-3.5 text-sm">
              <a
                href={`tel:${WEBSITE_CONTENT.brand.phoneRaw}`}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>{WEBSITE_CONTENT.brand.phone}</span>
              </a>

              <a
                href={`mailto:${WEBSITE_CONTENT.brand.salesEmail}`}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="uppercase">{WEBSITE_CONTENT.brand.salesEmail}</span>
              </a>

              <a
                href={`mailto:${WEBSITE_CONTENT.brand.enquiryEmail}`}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="uppercase">{WEBSITE_CONTENT.brand.enquiryEmail}</span>
              </a>

              <div className="flex items-center gap-3 text-slate-400 text-xs pt-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Serving Nationwide USA Real Estate & Construction Markets</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back-to-Top */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{WEBSITE_CONTENT.brand.copyright}</p>
          <div className="flex items-center gap-6">
            <span>Intelligence Beyond Reality</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
