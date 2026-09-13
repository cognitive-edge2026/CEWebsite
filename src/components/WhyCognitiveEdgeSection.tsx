import React from "react";
import { motion } from "motion/react";
import {
  Zap,
  TrendingDown,
  CheckCircle2,
  Shield,
  ThumbsUp,
  Home,
  Sparkles,
} from "lucide-react";

export const WhyCognitiveEdgeSection: React.FC = () => {
  return (
    <section
      id="why-cognitive-edge"
      className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-2">
            <Zap className="w-4 h-4 text-orange-500" />
            <span>Transforming Construction & Real Estate</span>
          </div>
          <h2
            id="why-cognitive-edge-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Why Cognitive Edge
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Backed by proven empirical metrics from high-stakes residential and commercial developments. Here is how our spatial computing pipeline transforms bottom-line project economics.
          </p>
        </motion.div>

        {/* 3 Core Metrics Taken Directly From The Flyer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Metric 1: 30% Faster Sales */}
          <motion.div
            id="metric-card-faster-sales"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-blue-100 dark:border-blue-900/60 shadow-md hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-400 flex items-center justify-center shadow-xs">
                  <Zap className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/80 text-blue-700 dark:text-blue-200">
                  Lead-to-Close
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl sm:text-6xl font-black text-blue-600 dark:text-cyan-400 tracking-tight">
                  30%
                </span>
                <span className="text-xl font-bold text-slate-700 dark:text-slate-200">Faster</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Faster Sales Cycles
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Reducing the lead-to-close cycle. Interactive digital models enable buyers to experience and fall in love with spaces months before drywall is installed.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>Metric Source: External Flyer</span>
              <span className="text-blue-600 dark:text-cyan-400 font-bold">Verified KPI</span>
            </div>
          </motion.div>

          {/* Metric 2: 25% Cost Savings */}
          <motion.div
            id="metric-card-cost-savings"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-orange-100 dark:border-orange-900/60 shadow-md hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 dark:bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/80 text-orange-500 dark:text-orange-400 flex items-center justify-center shadow-xs">
                  <TrendingDown className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-900/80 text-orange-700 dark:text-orange-200">
                  Efficiency
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl sm:text-6xl font-black text-orange-500 dark:text-orange-400 tracking-tight">
                  25%
                </span>
                <span className="text-xl font-bold text-slate-700 dark:text-slate-200">Savings</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Cost Savings
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Increasing operational efficiency. Catching layout conflicts and material revisions in the digital twin prototype phase prevents costly on-site change orders.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>Metric Source: External Flyer</span>
              <span className="text-orange-500 dark:text-orange-400 font-bold">Verified KPI</span>
            </div>
          </motion.div>

          {/* Metric 3: 45% Faster Approvals */}
          <motion.div
            id="metric-card-faster-approvals"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-900/60 shadow-md hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/80 text-emerald-700 dark:text-emerald-200">
                  Velocity
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl sm:text-6xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                  45%
                </span>
                <span className="text-xl font-bold text-slate-700 dark:text-slate-200">Faster</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Faster Approvals
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                45% faster approvals that lead directly to earlier delivery of the project. Stakeholders, city boards, and buyers review interactive models without ambiguity.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>Metric Source: External Flyer</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Verified KPI</span>
            </div>
          </motion.div>
        </div>

        {/* Builder KPIs & Customer Metrics Breakdown (From Flyer) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Builder KPIs Box */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-400">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  The Builder KPIs
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Operational velocity & risk reduction
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 flex items-start gap-4">
                <span className="text-lg font-black text-blue-600 dark:text-cyan-400 mt-0.5">30%</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Faster Sales</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Reduces the lead-to-close cycle significantly.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 flex items-start gap-4">
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">45%</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Faster Decision Making Cycles</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Multi-stakeholder consensus reached without protracted revisions.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 flex items-start gap-4">
                <span className="text-lg font-black text-orange-500 dark:text-orange-400 mt-0.5">15%</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Reduction in Revision Time</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Streamlined iteration on live 3D models rather than redrawing blueprints.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 flex items-start gap-4">
                <span className="text-lg font-black text-purple-600 dark:text-purple-400 mt-0.5">25%</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cost Savings & Efficiency</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Directly boosts operational bottom line and eliminates rework waste.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* The Customer Metrics Box */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  The Customer Metrics
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Buyer satisfaction & confidence
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-amber-500 text-sm">⭐⭐⭐⭐⭐</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    “TRY BEFORE YOU BUY”
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Increases customer confidence and customer satisfaction by letting buyers inspect layout, scale, and lighting in full immersion.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Personalize Spaces with High Certainty
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Customization with low risk — buyers select custom flooring, cabinetry, and fixtures with total visual certainty.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Modern Buying Experience
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  A memorable, premium visual journey that sets properties apart from competitors relying on static 2D floor plans.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
