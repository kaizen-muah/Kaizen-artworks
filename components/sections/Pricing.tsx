'use client';

import { motion } from 'framer-motion';
import { pricingTiers } from '@/data/pricing';
import { staggerContainerVariants, slideUpVariants } from '@/lib/animations';
import { scrollToSection } from '@/lib/utils';

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="section-padding content-max bg-white"
      aria-label="Commission pricing"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 text-center"
      >
        <p className="label-caps text-emerald-600 mb-3">Investment</p>
        <h2 className="display-text text-[clamp(2.5rem,6vw,5rem)] text-gray-900">
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
            className={`relative flex flex-col p-8 bg-white border transition-all duration-300 group hover:shadow-lg ${
              tier.popular 
                ? 'border-emerald-500 shadow-emerald-500/10' 
                : 'border-gray-200 hover:border-emerald-300'
            }`}
          >
            {tier.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white text-[10px] font-medium tracking-widest uppercase px-3 py-1">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-2">{tier.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed min-h-[60px]">{tier.description}</p>
            </div>

            <div className="mb-8">
              <p className="display-text text-4xl text-gray-900">{tier.priceRange}</p>
              <p className="text-gray-500 text-xs mt-2">Delivery: {tier.deliveryTime}</p>
            </div>

            <ul className="flex flex-col gap-4 mb-10 flex-1">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 ${feature.included ? 'text-emerald-500' : 'text-gray-300'}`}>
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
                  <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollToSection('contact')}
              className={`w-full py-4 text-xs font-medium tracking-widest uppercase transition-colors duration-200 ${
                tier.popular
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'border border-gray-200 text-gray-900 group-hover:border-emerald-500 group-hover:text-emerald-600'
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
        className="mt-12 text-center text-gray-500 text-sm"
      >
        Need something custom or commercial? Include details in your inquiry for a tailored quote.
      </motion.p>
    </section>
  );
}
