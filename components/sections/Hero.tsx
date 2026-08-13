'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { scrollToSection } from '@/lib/utils';

const LETTERS = ['K', 'A', 'I', 'Z', 'E', 'N'];

function JiggleLetter({ letter, index }: { letter: string; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    /* Outer span: staggered entrance only — never changes after mount */
    <motion.span
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.5 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ display: 'inline-block' }}
    >
      {/* Inner span: hover jiggle only — completely independent */}
      <motion.span
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={
          hovered
            ? {
                scale: 1.38,
                y: -18,
                rotate: [0, -9, 9, -6, 6, -3, 3, 0],
                color: '#E63946',
              }
            : {
                scale: 1,
                y: 0,
                rotate: 0,
                color: '#F5F5F0',
              }
        }
        transition={
          hovered
            ? {
                scale: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
                y: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
                rotate: { duration: 0.45, ease: 'easeOut' },
                color: { duration: 0.2 },
              }
            : {
                scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                rotate: { duration: 0.2 },
                color: { duration: 0.25 },
              }
        }
        style={{
          display: 'inline-block',
          willChange: 'transform',
          cursor: 'default',
        }}
      >
        {letter}
      </motion.span>
    </motion.span>
  );
}

export default function Hero() {
  const progress = useScrollProgress();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />

      {/* Pure CSS 5-point perspective grid — zero JS, zero CPU */}
      <div className="absolute inset-0 hero-grid pointer-events-none" aria-hidden="true" />

      {/* Red glow orb — CSS animation only */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full hero-orb pointer-events-none" aria-hidden="true" />

      {/* Parallax wrapper on scroll only */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{ y: progress * -60 }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="label-caps mb-6 text-[#E63946]"
        >
          Anime &amp; Manga Illustration
        </motion.p>

        {/* Per-letter KAIZEN */}
        <h1
          className="display-text text-[clamp(3rem,13vw,13rem)] text-[#F5F5F0] leading-none tracking-[-0.03em] mb-2 flex flex-nowrap"
          aria-label="KAIZEN"
        >
          {LETTERS.map((letter, i) => (
            <JiggleLetter key={letter + i} letter={letter} index={i} />
          ))}
        </h1>

        {/* Red accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-[#E63946] mb-8"
          style={{ width: 'clamp(120px, 20vw, 300px)', transformOrigin: 'left' }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#6B7280] text-base md:text-lg font-light max-w-md leading-relaxed mb-12"
        >
          Every line tells a story.<br />Every commission is a collaboration.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button
            onClick={() => scrollToSection('gallery')}
            className="px-8 py-4 bg-[#F5F5F0] text-[#0A0A0A] text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:bg-[#E63946] hover:text-[#F5F5F0]"
          >
            View Gallery
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 border border-[#2A2A2A] text-[#6B7280] text-xs font-medium tracking-widest uppercase hover:border-[#E63946] hover:text-[#E63946] transition-all duration-300"
          >
            Commission Me
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label-caps text-[10px]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[#E63946] to-transparent"
        />
      </motion.div>

      {/* Decorative corner text */}
      <div className="absolute top-24 right-8 md:right-16 hidden md:block">
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="label-caps text-[10px] text-[#2A2A2A] [writing-mode:vertical-rl]"
        >
          Portfolio 2024
        </motion.p>
      </div>
    </section>
  );
}
