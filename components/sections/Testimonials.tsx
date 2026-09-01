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
      className="section-padding"
      aria-label="Client testimonials"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 50%, #ffffff 100%)' }}
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
              className="flex flex-col gap-6 p-8 bg-white border border-gray-200 hover:border-emerald-500/30 hover:shadow-md transition-all duration-300"
            >
              {/* Quote mark */}
              <span
                className="display-text text-[5rem] text-gray-100 leading-none select-none"
                aria-hidden="true"
              >
                &quot;
              </span>

              <StarRating rating={t.rating} />

              <blockquote className="text-gray-700 text-sm leading-relaxed font-light flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <footer className="border-t border-gray-100 pt-5 flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="text-emerald-600 text-xs font-medium">{t.avatarInitials}</span>
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-medium">{t.clientName}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t.projectType}</p>
                </div>
              </footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
