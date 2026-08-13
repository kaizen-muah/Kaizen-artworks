'use client';

import { motion } from 'framer-motion';
import { pricingTiers } from '@/data/pricing';
import { staggerContainerVariants, slideUpVariants } from '@/lib/animations';
import { scrollToSection } from '@/lib/utils';

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="section-padding content-max"
      aria-label="Commission pricing"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <p className="label-caps text-[#E63946] mb-3">Investment</p>
        <h2 className="display-text text-[clamp(2.5rem,6vw,5rem)] text-[#F5F5F0]">
          Commission Pricing
        </h2>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {pricingTiers.map((tier) => (
          <motion.article
            key={tier.id}
            variants={slideUpVariants}
            className={`relative flex flex-col p-8 bg-[#111111] border transition-all duration-300 group ${
              tier.popular 
                ? 'border-[#E63946] shadow-[0_0_30px_rgba(230,57,70,0.1)]' 
                : 'border-[#2A2A2A] hover:border-[#E63946]/50'
            }`}
          >
            {tier.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E63946] text-[#F5F5F0] text-[10px] font-medium tracking-widest uppercase px-3 py-1">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-medium text-[#F5F5F0] mb-2">{tier.name}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed min-h-[60px]">{tier.description}</p>
            </div>

            <div className="mb-8">
              <p className="display-text text-4xl text-[#F5F5F0]">{tier.priceRange}</p>
              <p className="text-[#6B7280] text-xs mt-2">Delivery: {tier.deliveryTime}</p>
            </div>

            <ul className="flex flex-col gap-4 mb-10 flex-1">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 ${feature.included ? 'text-[#E63946]' : 'text-[#404040]'}`}>
                    {feature.included ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                  <span className={`text-sm ${feature.included ? 'text-[#D1D5DB]' : 'text-[#6B7280]'}`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollToSection('contact')}
              className={`w-full py-4 text-xs font-medium tracking-widest uppercase transition-colors duration-200 ${
                tier.popular
                  ? 'bg-[#E63946] text-[#F5F5F0] hover:bg-[#C1121F]'
                  : 'border border-[#2A2A2A] text-[#F5F5F0] group-hover:border-[#E63946] group-hover:text-[#E63946]'
              }`}
            >
              {tier.ctaLabel}
            </button>
          </motion.article>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 text-center text-[#6B7280] text-sm"
      >
        Need something custom or commercial? Include details in your inquiry for a tailored quote.
      </motion.p>
    </section>
  );
}
