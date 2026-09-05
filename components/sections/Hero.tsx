'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { scrollToSection } from '@/lib/utils';

const LETTERS = ['K', 'A', 'I', 'Z', 'E', 'N'];

function JiggleLetter({ letter, index }: { letter: string; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
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
      <motion.span
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={
          hovered
            ? {
                scale: 1.25,
                y: -14,
                rotate: [0, -6, 6, -4, 4, -2, 2, 0],
              }
            : {
                scale: 1,
                y: 0,
                rotate: 0,
              }
        }
        transition={
          hovered
            ? {
                scale: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
                y: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
                rotate: { duration: 0.45, ease: 'easeOut' },
              }
            : {
                scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                rotate: { duration: 0.2 },
              }
        }
        className="pencil-4b pencil-4b-textured select-none cursor-pointer"
        style={{
          display: 'inline-block',
          willChange: 'transform',
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
      {/* SVG filter definition for 4B pencil graphite rough edges & tooth bite */}
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          <filter id="pencil-texture" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.2"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feMerge>
              <feMergeNode in="displaced" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Subtle emerald radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Parallax wrapper */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{ y: progress * -60 }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="label-caps mb-6 text-emerald-700 font-semibold tracking-[0.22em]"
        >
          Anime &amp; Manga Illustration
        </motion.p>

        {/* Per-letter 4B Pencil KAIZEN */}
        <h1
          className="display-text text-[clamp(3.5rem,14vw,13.5rem)] leading-none tracking-[-0.02em] mb-2 flex flex-nowrap"
          aria-label="KAIZEN"
          data-cursor="white"
        >
          {LETTERS.map((letter, i) => (
            <JiggleLetter key={letter + i} letter={letter} index={i} />
          ))}
        </h1>

        {/* Emerald accent line with subtle hand-drawn sketch feel */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-[2px] bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 rounded-full mb-8 shadow-sm"
          style={{ width: 'clamp(120px, 20vw, 300px)', transformOrigin: 'left' }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-stone-700 text-base md:text-lg font-light max-w-md leading-relaxed mb-12"
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
            data-cursor="white"
            className="px-8 py-4 bg-emerald-600 text-white text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:bg-emerald-700"
          >
            View Gallery
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 border-2 border-emerald-700 text-emerald-800 bg-white/50 backdrop-blur-xs text-xs font-semibold tracking-widest uppercase hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300 shadow-xs"
          >
            Commission Me
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative corner text */}
      <div className="absolute top-24 right-8 md:right-16 hidden md:block">
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="label-caps text-[10px] text-gray-300 [writing-mode:vertical-rl]"
        >
          Portfolio 2024
        </motion.p>
      </div>
    </section>
  );
}
