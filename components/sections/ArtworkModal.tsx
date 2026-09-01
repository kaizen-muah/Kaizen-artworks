'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Artwork } from '@/types/artwork';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { modalBackdropVariants, modalContentVariants } from '@/lib/animations';
import { scrollToSection } from '@/lib/utils';

interface ArtworkModalProps {
  artwork: Artwork;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ArtworkModal({ artwork, onClose, onPrev, onNext }: ArtworkModalProps) {
  useLockBodyScroll(true);
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus trap + keyboard navigation
  useEffect(() => {
    firstFocusRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();

      // Focus trap
      if (e.key === 'Tab' && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const handleCommission = useCallback((): void => {
    onClose();
    setTimeout(() => scrollToSection('contact'), 300);
  }, [onClose]);

  const CATEGORY_LABEL: Record<string, string> = {
    anime: 'Anime',
    sketch: 'Sketch',
    character: 'Character Design',
    commission: 'Commission',
  };

  return (
    <motion.div
      key="modal-backdrop"
      variants={modalBackdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        ref={containerRef}
        key={artwork.id}
        variants={modalContentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-white border border-gray-200 max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative flex-shrink-0 md:w-[55%] bg-gray-50 flex items-center justify-center overflow-hidden">
          <Image
            src={artwork.imageSrc}
            alt={`${artwork.title} — ${artwork.description.slice(0, 80)}`}
            width={artwork.imageWidth || 1200}
            height={artwork.imageHeight || 1200}
            sizes="(max-width: 768px) 100vw, 55vw"
            placeholder={artwork.blurDataURL ? "blur" : "empty"}
            blurDataURL={artwork.blurDataURL}
            className="w-full h-auto max-h-[60vh] md:max-h-[90vh] object-contain"
          />
        </div>

        {/* Info panel */}
        <div className="flex flex-col justify-between p-6 md:p-8 md:w-[45%] overflow-y-auto">
          <div>
            {/* Category */}
            <p className="label-caps text-emerald-600 text-[10px] mb-3">
              {CATEGORY_LABEL[artwork.category] ?? artwork.category}
            </p>

            {/* Title */}
            <h2
              id="modal-title"
              className="display-text text-[clamp(1.8rem,3vw,2.8rem)] text-gray-900 mb-4 leading-tight"
            >
              {artwork.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {artwork.description}
            </p>

            {/* Meta */}
            <div className="flex flex-col gap-3 border-t border-gray-100 pt-5">
              <div className="flex justify-between items-center">
                <span className="label-caps text-[10px] text-gray-400">Time</span>
                <span className="text-gray-900 text-sm font-medium">{artwork.timeTaken}</span>
              </div>
              {artwork.price && (
                <div className="flex justify-between items-center">
                  <span className="label-caps text-[10px] text-gray-400">Commission Price</span>
                  <span className="text-emerald-600 text-sm font-medium">{artwork.price}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="label-caps text-[10px] text-gray-400">Date</span>
                <span className="text-gray-500 text-sm">
                  {new Date(artwork.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={handleCommission}
              className="w-full py-3 bg-emerald-600 text-white text-xs font-medium tracking-widest uppercase hover:bg-emerald-700 transition-colors duration-200"
            >
              Commission Similar
            </button>
            <div className="flex gap-2">
              <button
                onClick={onPrev}
                aria-label="Previous artwork"
                className="flex-1 py-3 border border-gray-200 text-gray-600 text-xs font-medium tracking-widest uppercase hover:border-gray-400 hover:text-gray-900 transition-all duration-200"
              >
                ← Prev
              </button>
              <button
                onClick={onNext}
                aria-label="Next artwork"
                className="flex-1 py-3 border border-gray-200 text-gray-600 text-xs font-medium tracking-widest uppercase hover:border-gray-400 hover:text-gray-900 transition-all duration-200"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          ref={firstFocusRef}
          onClick={onClose}
          aria-label="Close artwork modal"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors duration-200 z-10 bg-white/80 rounded-full backdrop-blur-md border border-gray-100"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}
