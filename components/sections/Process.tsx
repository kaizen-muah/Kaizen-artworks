'use client';

import { motion } from 'framer-motion';
import { staggerContainerVariants, slideUpVariants } from '@/lib/animations';

const steps = [
  {
    number: '01',
    title: 'Rough Sketch',
    description:
      'Every piece begins with gesture and intent. Loose, fast, exploratory — this is where ideas live before they have form. I send you a rough for directional feedback before investing detail.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10" aria-hidden="true">
        <path d="M8 32c4-8 10-16 20-22M14 18c2-2 4-3 6-2M20 28c-2-4 0-8 4-10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Lineart',
    description:
      'The skeleton becomes a body. Clean, confident linework that defines every edge and contour. Varying line weight gives the illustration depth and energy before a single shade is applied.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10" aria-hidden="true">
        <circle cx="20" cy="16" r="7"/>
        <path d="M10 32c0-5.5 4.5-10 10-10s10 4.5 10 10" strokeLinecap="round"/>
        <line x1="8" y1="38" x2="32" y2="38" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Shading & Colour',
    description:
      'Light chooses what the eye sees first. I work in cel-shading or soft-render depending on the brief, sculpting form through shadow and highlight. This stage transforms drawing into illustration.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10" aria-hidden="true">
        <circle cx="20" cy="20" r="12"/>
        <path d="M20 8v-4M20 36v-4M8 20H4M36 20h-4M11 11L8 8M32 11l3-3M11 29l-3 3M32 29l3 3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Final Render',
    description:
      'Details, atmosphere, and final polish. Background integration, texture overlays, chromatic effects. The piece is reviewed at full resolution before delivery in all requested formats.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10" aria-hidden="true">
        <rect x="6" y="6" width="28" height="28" rx="2"/>
        <path d="M13 20l5 5 9-9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="section-padding content-max relative overflow-hidden bg-transparent"
      aria-label="Artistic process"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 text-center"
      >
        <p className="label-caps text-emerald-600 mb-3 font-semibold tracking-wider">How it works</p>
        <h2 className="display-text text-[clamp(2.5rem,6vw,5rem)] text-gray-900">
          The Process
        </h2>
      </motion.div>

      {/* Steps Grid - Enters smoothly on scroll, then stays firmly in place */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 relative z-10"
      >
        {steps.map((step) => (
          <motion.div
            key={step.number}
            variants={slideUpVariants}
            className="process-card bg-[#FDD7B9] p-8 flex flex-col gap-6 group border border-stone-300/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_-4px_rgba(0,0,0,0.2)] hover:border-emerald-600/40 transition-all duration-300 rounded-xs relative overflow-hidden"
          >
            {/* Number + icon */}
            <div className="flex items-start justify-between">
              <span className="display-text text-[3.5rem] text-stone-800/20 group-hover:text-emerald-700/30 transition-colors duration-300 select-none leading-none font-bold">
                {step.number}
              </span>
              <span className="text-emerald-700 mt-1">{step.icon}</span>
            </div>

            {/* Title */}
            <h3 className="text-stone-900 font-semibold text-lg relative z-10">{step.title}</h3>

            {/* Description */}
            <p className="text-stone-800 text-sm leading-relaxed relative z-10">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 text-center text-stone-600 text-sm"
      >
        Typical turnaround: <span className="text-stone-900 font-semibold">3–21 days</span> depending on complexity.
        Rush orders available — just ask.
      </motion.p>
    </section>
  );
}
