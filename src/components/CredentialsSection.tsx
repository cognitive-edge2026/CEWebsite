import React from "react";
import {
  ArrowRight,
  Glasses,
  Video,
  Image as ImageIcon,
  FileSpreadsheet,
} from "lucide-react";
import { WEBSITE_CONTENT } from "../data/websiteContent";
import { CredentialOptionId } from "../data/credentialsData";

interface CredentialsSectionProps {
  onOpenCredentialsPage?: (optionId?: CredentialOptionId) => void;
}

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({
  onOpenCredentialsPage,
}) => {
  const { credentials } = WEBSITE_CONTENT;

  const handleOpenPage = (optionId: CredentialOptionId = "video-walkthrough") => {
    if (onOpenCredentialsPage) {
      onOpenCredentialsPage(optionId);
    }
  };

  const categoryCards = [
    {
      id: "vr-walkthrough" as CredentialOptionId,
      label: "VR Walkthrough",
      tag: "Interactive 3D",
      desc: "1:1 scale spatial models for Meta Quest, Apple Vision Pro, and WebXR streaming.",
      icon: Glasses,
    },
    {
      id: "video-walkthrough" as CredentialOptionId,
      label: "Video Walkthrough",
      tag: "Cinematic 4K",
      desc: "Architectural fly-throughs with day-to-night lighting & cinematic soundscapes.",
      icon: Video,
    },
    {
      id: "renders" as CredentialOptionId,
      label: "3D Renders",
      tag: "Ultra 8K",
      desc: "Sub-millimeter accurate photorealistic interior and exterior architectural stills.",
      icon: ImageIcon,
    },
    {
      id: "brochures" as CredentialOptionId,
      label: "Brochures",
      tag: "Print & Digital",
      desc: "Comprehensive marketing brochures, colored 3D floor plans, and finishes spec books.",
      icon: FileSpreadsheet,
    },
  ];

  return (
    <section
      id="credentials"
      className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with the 4 Options */}
        <div
          className="text-center max-w-4xl mx-auto mb-14"
          id="credentials-header-section"
        >
          <h2
            id="credentials-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            {credentials.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            {credentials.description}
          </p>

          {/* 4 Format Selector Cards */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
              {categoryCards.map((cat) => {
                const IconComp = cat.icon;
                return (
                  <button
                    key={cat.id}
                    id={`credentials-header-option-${cat.id}`}
                    onClick={() => handleOpenPage(cat.id)}
                    className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-lg transition-all duration-300 text-left cursor-pointer"
                  >
                    <div>
                      <div className="mb-4">
                        <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-2xs">
                          <IconComp className="w-5 h-5" />
                        </div>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                        {cat.label}
                      </h4>
                      <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400">
                      <span>View Credential</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
