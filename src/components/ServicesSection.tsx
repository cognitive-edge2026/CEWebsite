import React from "react";
import {
  Layers,
  Glasses,
  Palette,
  Monitor,
  Tablet,
  Eye,
  Building2,
  HardHat,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { WEBSITE_CONTENT } from "../data/websiteContent";

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const serviceIcons: Record<string, React.ElementType> = {
    "digital-twins": Layers,
    "vr-experiences": Glasses,
    "interior-design": Palette,
    "interactive-touch-kiosks": Monitor,
    "tablet-mobile-experience": Tablet,
    "360-virtual-tours": Eye,
    "architectural-visuallization": Building2,
    "construction-design-visuallization": HardHat,
  };

  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Our Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            End-to-end spatial computing, digital twins, and virtual reality workflows designed specifically for modern developers, builders, architects, and interior designers.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {WEBSITE_CONTENT.services.map((service, index) => {
            const Icon = serviceIcons[service.id] || Layers;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="bg-slate-50 dark:bg-slate-950/70 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col h-full group"
              >
                {/* Visual Imagery with High Quality Architectural Representation */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Fallback to local high-res construction visual if an image fails to load
                      (e.target as HTMLImageElement).src = "/construction_bim_vis.jpg";
                    }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Service Badge */}
                  <div className="absolute top-3 right-3 flex items-center justify-end">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-600/90 text-white backdrop-blur-md shrink-0">
                      {service.badge}
                    </span>
                  </div>

                  {/* Icon Emblem */}
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2.5 min-h-[3.5rem] flex items-start group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 text-justify sm:text-left flex-1 min-h-[7.5rem] sm:min-h-[8.5rem] flex items-start">
                      {service.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="space-y-2.5 mb-5 pt-3.5 border-t border-slate-200/70 dark:border-slate-800/80 min-h-[9.5rem] flex flex-col justify-start mt-auto text-[14px]">
                      {service.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-2 text-[14px] text-slate-700 dark:text-slate-300 min-h-[2.6rem]">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-[14px] leading-snug">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between mt-auto">
                    <a
                      href="#contact"
                      onClick={() => onSelectService(service.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
