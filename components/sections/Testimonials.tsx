'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';
import { staggerContainerVariants, slideUpVariants } from '@/lib/animations';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill={i < rating ? '#10b981' : 'none'}
          stroke="#10b981"
          strokeWidth="1"
          aria-hidden="true"
        >
          <path d="M6 1l1.3 2.7L10 4.1 8 6.1l.5 3L6 7.6 3.5 9.1l.5-3L2 4.1l2.7-.4L6 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-padding bg-transparent"
      aria-label="Client testimonials"
    >
      <div className="content-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <p className="label-caps text-emerald-600 mb-3">Client Stories</p>
          <h2 className="display-text text-[clamp(2.5rem,6vw,5rem)] text-gray-900">
            Testimonials
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.article
              key={t.id}
              variants={slideUpVariants}
              className="flex flex-col gap-6 p-8 bg-[#FDD7B9] border border-stone-300/80 hover:border-emerald-600/50 shadow-[0_6px_25px_-5px_rgba(0,0,0,0.14)] hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.22)] transition-all duration-300 rounded-xs"
            >
              {/* Quote mark */}
              <span
                className="display-text text-[5rem] text-stone-800/15 leading-none select-none"
                aria-hidden="true"
              >
                &quot;
              </span>

              <StarRating rating={t.rating} />

              <blockquote className="text-stone-800 text-sm leading-relaxed font-light flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <footer className="border-t border-stone-400/30 pt-5 flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full bg-stone-900/10 border border-stone-400/40 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="text-emerald-800 text-xs font-bold">{t.avatarInitials}</span>
                </div>
                <div>
                  <p className="text-stone-900 text-sm font-semibold">{t.clientName}</p>
                  <p className="text-stone-700 text-xs mt-0.5">{t.projectType}</p>
                </div>
              </footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
