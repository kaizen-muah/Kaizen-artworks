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
            className="pointer-events-auto flex items-center gap-2 px-3 py-2 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#E63946]/50 rounded-full text-[#F5F5F0] text-xs font-medium shadow-[0_0_15px_rgba(230,57,70,0.3)] hover:border-[#E63946] transition-all duration-300 group"
            title="Expand Art Reel"
          >
            <span className="w-2 h-2 rounded-full bg-[#E63946] animate-pulse" />
            <span className="text-[11px] tracking-wider uppercase font-mono">Art Reel</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
            className="pointer-events-auto relative h-full w-12 sm:w-14 md:w-20 lg:w-24 bg-[#0A0A0A]/75 hover:bg-[#0A0A0A]/95 backdrop-blur-md border border-[#2A2A2A] hover:border-[#E63946]/40 rounded-2xl flex flex-col items-center overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-300 group/reel"
          >
            {/* Reel Header / Control Bar */}
            <div className="w-full flex items-center justify-between px-1.5 py-2 border-b border-[#2A2A2A]/80 bg-[#111111]/90 z-10 text-[9px] sm:text-[10px] tracking-widest text-[#6B7280] uppercase">
              <div className="flex items-center gap-1 mx-auto sm:mx-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] animate-ping" />
                <span className="hidden sm:inline font-mono font-medium text-[#F5F5F0]">LIVE REEL</span>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:text-[#E63946] text-[#6B7280] transition-colors rounded"
                title="Minimize Art Reel"
                aria-label="Minimize Art Reel"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Continuous Vertical Scrolling Gallery Track */}
            <div className="w-full flex-1 overflow-hidden relative py-2">
              {/* Fade gradient masks for top and bottom edge */}
              <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-[#0A0A0A]/90 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-[#0A0A0A]/90 to-transparent z-10 pointer-events-none" />

              <div className="flex flex-col gap-2.5 sm:gap-3 items-center animate-vertical-roll px-1">
                {reelArtworks.map((artwork, idx) => (
                  <button
                    key={`${artwork.id}-${idx}`}
                    onClick={() => handleCardClick(artwork)}
                    className="relative group/card flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 md:w-16 md:h-16 rounded-lg overflow-hidden border border-[#2A2A2A] hover:border-[#E63946] focus:border-[#E63946] focus:outline-none transition-all duration-300 shadow-md hover:scale-105 hover:z-20 cursor-pointer"
                  >
                    <Image
                      src={artwork.imageSrc}
                      alt={artwork.title}
                      fill
                      sizes="(max-width: 640px) 36px, (max-width: 768px) 44px, 64px"
                      className="object-cover group-hover/card:scale-110 transition-transform duration-300"
                    />

                    {/* Desktop Hover Tooltip */}
                    <div className="hidden lg:block absolute right-full top-1/2 -translate-y-1/2 mr-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-[#111111] border border-[#E63946]/40 px-2.5 py-1 rounded-md shadow-xl text-left">
                      <p className="text-[11px] font-medium text-[#F5F5F0] leading-tight">{artwork.title}</p>
                      <p className="text-[9px] text-[#E63946] uppercase font-mono tracking-wider">{artwork.category}</p>
                    </div>

                    {/* Subtle Overlay highlight */}
                    <div className="absolute inset-0 bg-[#E63946]/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200" />
                  </button>
                ))}
              </div>
            </div>

            {/* Reel Footer Indicator */}
            <div className="w-full py-1.5 text-center border-t border-[#2A2A2A]/80 bg-[#111111]/90 z-10">
              <span className="text-[8px] sm:text-[9px] text-[#6B7280] font-mono tracking-tighter">
                {artworks.length} WORKS
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
