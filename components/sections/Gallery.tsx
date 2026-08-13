'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Image from 'next/image';
import { artworks } from '@/data/artworks';
import type { ArtworkCategory, Artwork } from '@/types/artwork';
import ArtworkModal from './ArtworkModal';
import { staggerContainerVariants, slideUpVariants } from '@/lib/animations';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

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
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);

  const filtered = activeCategory === 'all'
    ? artworks
    : artworks.filter(a => a.category === activeCategory);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    if (pathRef.current && planeRef.current) {
      const length = pathRef.current.getTotalLength();
      
      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.5,
        },
      });

      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
      }, 0);

      tl.to(planeRef.current, {
        motionPath: {
          path: pathRef.current,
          autoRotate: true,
        },
        ease: 'none',
      }, 0);
    }
  }, { scope: galleryRef });

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
      {/* Paper Airplane Scroll Path */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden opacity-35">
        <svg className="w-full h-full" viewBox="0 0 1200 1000" fill="none" preserveAspectRatio="none">
          {/* Guide path - horizontal swings and loop-da-loop */}
          <path
            d="M 100,80 C 500,40 800,40 1100,120 C 1100,260 800,220 600,270 C 500,290 450,370 550,420 C 650,470 700,390 600,350 C 500,310 300,370 100,470 C 400,620 800,620 1100,570 C 1100,770 800,820 600,870 C 400,920 200,870 100,920"
            stroke="rgba(245, 245, 240, 0.08)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          {/* Active drawing path */}
          <path
            ref={pathRef}
            d="M 100,80 C 500,40 800,40 1100,120 C 1100,260 800,220 600,270 C 500,290 450,370 550,420 C 650,470 700,390 600,350 C 500,310 300,370 100,470 C 400,620 800,620 1100,570 C 1100,770 800,820 600,870 C 400,920 200,870 100,920"
            stroke="#E63946"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* 3D Origami Paper Airplane */}
          <g ref={planeRef} style={{ transformOrigin: '30px 30px' }}>
            {/* Left Main Wing */}
            <polygon points="15,20 60,30 0,10" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="0.5" />
            {/* Right Main Wing */}
            <polygon points="15,40 60,30 0,50" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5" />
            {/* Left Inner Fold (Crease) */}
            <polygon points="5,30 60,30 15,20" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.5" />
            {/* Right Inner Fold (Crease) */}
            <polygon points="5,30 60,30 15,40" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.5" />
            {/* Left Keel Underbody */}
            <polygon points="15,20 60,30 35,30" fill="#94A3B8" />
            {/* Right Keel Underbody */}
            <polygon points="15,40 60,30 35,30" fill="#64748B" />
            {/* Tail Fin */}
            <polygon points="5,30 15,20 15,40" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.5" />
          </g>
        </svg>
      </div>
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
