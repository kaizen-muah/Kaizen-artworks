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
      className="section-padding content-max relative"
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
        <p className="label-caps text-[#E63946] mb-3">Selected Works</p>
        <h2
          className="display-text text-[clamp(2.5rem,6vw,5rem)] text-[#F5F5F0]"
        >
          Gallery
        </h2>
      </motion.div>

      {/* Filter tabs */}
      <div
        className="flex flex-wrap gap-2 mb-12"
        role="group"
        aria-label="Filter gallery by category"
      >
        {CATEGORIES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveCategory(value)}
            aria-pressed={activeCategory === value}
            aria-label={`Filter by ${label}`}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-widest uppercase border transition-all duration-200 ${
              activeCategory === value
                ? 'border-[#E63946] text-[#F5F5F0] bg-[#E63946]/10'
                : 'border-[#2A2A2A] text-[#6B7280] hover:border-[#6B7280] hover:text-[#F5F5F0]'
            }`}
          >
            {label}
            <span
              className={`inline-flex items-center justify-center w-4 h-4 text-[10px] rounded-full ${
                activeCategory === value ? 'bg-[#E63946] text-white' : 'bg-[#2A2A2A] text-[#6B7280]'
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
            className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4"
          >
            {filtered.map((artwork) => (
              <motion.article
                key={artwork.id}
                layout
                variants={slideUpVariants}
                exit={{ opacity: 0, scale: 0.95 }}
                className="gallery-card break-inside-avoid mb-3 md:mb-4 cursor-pointer group relative overflow-hidden bg-[#111111] border border-[#2A2A2A] hover:border-[#E63946]/40 transition-colors duration-300"
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder={artwork.blurDataURL ? "blur" : "empty"}
                    blurDataURL={artwork.blurDataURL}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="label-caps text-[#E63946] text-[10px] mb-1">{artwork.category}</p>
                  <h3 className="text-[#F5F5F0] font-medium text-sm mb-1">{artwork.title}</h3>
                  <p className="text-[#6B7280] text-xs">{artwork.timeTaken}</p>
                  {artwork.price && (
                    <p className="text-[#E63946] text-xs font-medium mt-1">{artwork.price}</p>
                  )}
                  <div className="mt-3 flex items-center gap-1 text-[#F5F5F0] text-xs font-medium">
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
