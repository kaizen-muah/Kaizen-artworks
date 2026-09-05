'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Image from 'next/image';
import { artworks } from '@/data/artworks';
import type { ArtworkCategory, Artwork } from '@/types/artwork';
import ArtworkModal from './ArtworkModal';
import { staggerContainerVariants, slideUpVariants } from '@/lib/animations';

type FilterCategory = 'all' | ArtworkCategory;

const CATEGORIES: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Anime', value: 'anime' },
  { label: 'Sketches', value: 'sketch' },
  { label: 'Character Design', value: 'character' },
  { label: 'Commissions', value: 'commission' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  
  const galleryRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'all'
    ? artworks
    : artworks.filter(a => a.category === activeCategory);

  const handleCardClick = useCallback((artwork: Artwork): void => {
    setSelectedArtwork(artwork);
  }, []);

  const handleModalClose = useCallback((): void => {
    setSelectedArtwork(null);
  }, []);

  const handleModalNav = useCallback((direction: 'prev' | 'next'): void => {
    if (!selectedArtwork) return;
    const idx = filtered.findIndex(a => a.id === selectedArtwork.id);
    const next = direction === 'next'
      ? filtered[(idx + 1) % filtered.length]
      : filtered[(idx - 1 + filtered.length) % filtered.length];
    if (next) setSelectedArtwork(next);
  }, [selectedArtwork, filtered]);

  const getCategoryCount = (cat: FilterCategory): number =>
    cat === 'all' ? artworks.length : artworks.filter(a => a.category === cat).length;

  return (
    <section
      ref={galleryRef}
      id="gallery"
      className="relative bg-transparent max-w-[1720px] w-full mx-auto px-4 sm:px-8 md:px-12 py-16 md:py-24"
      aria-label="Portfolio gallery"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <p className="label-caps text-emerald-600 mb-3">Selected Works</p>
        <h2
          className="display-text text-[clamp(2.5rem,6vw,5rem)] text-gray-900"
        >
          Gallery
        </h2>
      </motion.div>

      {/* Filter tabs */}
      <div
        className="flex flex-wrap gap-2.5 mb-12"
        role="group"
        aria-label="Filter gallery by category"
      >
        {CATEGORIES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveCategory(value)}
            aria-pressed={activeCategory === value}
            aria-label={`Filter by ${label}`}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 border-2 rounded-xs ${
              activeCategory === value
                ? 'border-emerald-700 text-white bg-emerald-700 shadow-md scale-[1.02]'
                : 'border-stone-400/80 text-stone-800 bg-[#FDD7B9]/85 hover:bg-[#FDD7B9] hover:border-emerald-700 hover:text-stone-950 shadow-xs'
            }`}
          >
            {label}
            <span
              className={`inline-flex items-center justify-center min-w-[18px] h-4 px-1 text-[10px] font-bold rounded-full ${
                activeCategory === value ? 'bg-white text-emerald-800' : 'bg-stone-800/20 text-stone-900'
              }`}
            >
              {getCategoryCount(value)}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <LayoutGroup>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5"
          >
            {filtered.map((artwork) => (
              <motion.article
                key={artwork.id}
                layout
                variants={slideUpVariants}
                exit={{ opacity: 0, scale: 0.95 }}
                className="gallery-card break-inside-avoid mb-4 md:mb-5 cursor-pointer group relative overflow-hidden bg-stone-900 border-[3.5px] border-stone-950 rounded-xs shadow-[0_12px_32px_-4px_rgba(0,0,0,0.55),0_4px_14px_-2px_rgba(0,0,0,0.4)] hover:shadow-[0_22px_48px_-6px_rgba(0,0,0,0.75),0_8px_22px_-3px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleCardClick(artwork)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(artwork);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View ${artwork.title}`}
              >
                <div className="gallery-image-wrapper">
                  <Image
                    src={artwork.imageSrc}
                    alt={`${artwork.title} — ${artwork.description.slice(0, 60)}...`}
                    width={artwork.imageWidth || 800}
                    height={artwork.imageHeight || 800}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    placeholder={artwork.blurDataURL ? "blur" : "empty"}
                    blurDataURL={artwork.blurDataURL}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Hover overlay - subtle dark vignette preserving artwork clarity */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="label-caps text-emerald-400 font-semibold text-[10px] mb-1 tracking-wider">{artwork.category}</p>
                  <h3 className="text-white font-medium text-sm mb-1 drop-shadow-sm">{artwork.title}</h3>
                  <p className="text-stone-300 text-xs">{artwork.timeTaken}</p>
                  {artwork.price && (
                    <p className="text-emerald-300 text-xs font-semibold mt-1">{artwork.price}</p>
                  )}
                  <div className="mt-3 flex items-center gap-1.5 text-white text-xs font-semibold">
                    <span>View</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>

      {/* Artwork Modal */}
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
    </section>
  );
}
