'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { artworks } from '@/data/artworks';
import type { Artwork } from '@/types/artwork';
import ArtworkModal from '@/components/sections/ArtworkModal';

export default function VerticalPictureRoll() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  // Duplicate artworks to make seamless infinite loop
  const reelArtworks = [...artworks, ...artworks];

  const handleCardClick = useCallback((artwork: Artwork) => {
    setSelectedArtwork(artwork);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedArtwork(null);
  }, []);

  const handleModalNav = useCallback((direction: 'prev' | 'next') => {
    if (!selectedArtwork) return;
    const idx = artworks.findIndex((a) => a.id === selectedArtwork.id);
    const nextIdx =
      direction === 'next'
        ? (idx + 1) % artworks.length
        : (idx - 1 + artworks.length) % artworks.length;
    setSelectedArtwork(artworks[nextIdx]);
  }, [selectedArtwork]);

  return (
    <>
      {/* Container - Pinned to right side of viewport */}
      <aside
        className="fixed right-2 sm:right-3 md:right-5 top-20 sm:top-24 bottom-6 z-30 pointer-events-none flex flex-col items-end justify-center"
        aria-label="Artworks Showcase Reel"
      >
        {isMinimized ? (
          /* Minimized Mobile Floating Toggle Badge */
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsMinimized(false)}
            className="pointer-events-auto flex items-center gap-2 px-3.5 py-2.5 bg-[#0A0A0A]/95 backdrop-blur-md border border-[#E63946]/60 rounded-full text-[#F5F5F0] text-xs font-semibold shadow-[0_0_20px_rgba(230,57,70,0.4)] hover:border-[#E63946] hover:scale-105 transition-all duration-300 group cursor-pointer"
            title="Expand Art Reel"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#E63946] animate-pulse" />
            <span className="text-xs tracking-wider uppercase font-mono">Art Reel</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-[#E63946] group-hover:translate-x-0.5 transition-transform"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
        ) : (
          /* Main Picture Roll Strip */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative h-full w-16 sm:w-20 md:w-28 lg:w-36 bg-[#0A0A0A]/85 hover:bg-[#0A0A0A]/98 backdrop-blur-md border border-[#2A2A2A] hover:border-[#E63946]/50 rounded-2xl flex flex-col items-center overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.9)] transition-all duration-300 group/reel"
          >
            {/* Reel Header / Control Bar */}
            <div className="w-full flex items-center justify-between px-2 sm:px-3 py-2.5 border-b border-[#2A2A2A]/80 bg-[#111111]/95 z-10 text-[10px] sm:text-xs tracking-widest text-[#6B7280] uppercase">
              <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
                <span className="w-2 h-2 rounded-full bg-[#E63946] animate-ping" />
                <span className="hidden sm:inline font-mono font-semibold text-[#F5F5F0]">LIVE REEL</span>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:text-[#E63946] text-[#6B7280] transition-colors rounded hover:bg-[#2A2A2A]/50 cursor-pointer"
                title="Minimize Art Reel"
                aria-label="Minimize Art Reel"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Continuous Vertical Scrolling Gallery Track */}
            <div className="w-full flex-1 overflow-hidden relative py-3">
              {/* Fade gradient masks for top and bottom edge */}
              <div className="absolute top-0 inset-x-0 h-8 md:h-12 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-8 md:h-12 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

              <div className="flex flex-col gap-3 sm:gap-4 items-center animate-vertical-roll px-1.5 sm:px-2">
                {reelArtworks.map((artwork, idx) => (
                  <button
                    key={`${artwork.id}-${idx}`}
                    onClick={() => handleCardClick(artwork)}
                    className="relative group/card flex-shrink-0 w-13 h-13 sm:w-16 sm:h-16 md:w-22 md:h-24 lg:w-28 lg:h-32 rounded-xl overflow-hidden border border-[#2A2A2A] hover:border-[#E63946] focus:border-[#E63946] focus:outline-none transition-all duration-300 shadow-lg hover:scale-105 hover:z-20 cursor-pointer"
                  >
                    <Image
                      src={artwork.imageSrc}
                      alt={artwork.title}
                      fill
                      sizes="(max-width: 640px) 52px, (max-width: 768px) 64px, (max-width: 1024px) 88px, 112px"
                      className="object-cover group-hover/card:scale-110 transition-transform duration-300"
                    />

                    {/* Desktop Hover Tooltip */}
                    <div className="hidden lg:block absolute right-full top-1/2 -translate-y-1/2 mr-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-[#111111] border border-[#E63946]/50 px-3 py-1.5 rounded-lg shadow-2xl text-left">
                      <p className="text-xs font-semibold text-[#F5F5F0] leading-tight">{artwork.title}</p>
                      <p className="text-[10px] text-[#E63946] uppercase font-mono tracking-wider">{artwork.category}</p>
                    </div>

                    {/* Overlay highlight */}
                    <div className="absolute inset-0 bg-[#E63946]/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200" />
                  </button>
                ))}
              </div>
            </div>

            {/* Reel Footer Indicator */}
            <div className="w-full py-2 text-center border-t border-[#2A2A2A]/80 bg-[#111111]/95 z-10">
              <span className="text-[9px] sm:text-[10px] text-[#888888] font-mono font-medium tracking-wider">
                {artworks.length} ARTWORKS
              </span>
            </div>
          </motion.div>
        )}
      </aside>

      {/* Modal View for Artwork from Reel */}
      <AnimatePresence>
        {selectedArtwork && (
          <ArtworkModal
            artwork={selectedArtwork}
            onClose={handleModalClose}
            onPrev={() => handleModalNav('prev')}
            onNext={() => handleModalNav('next')}
          />
        )}
      </AnimatePresence>
    </>
  );
}
