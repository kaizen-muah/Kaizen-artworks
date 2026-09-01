'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHoveredRed, setIsHoveredRed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Direct 1:1 motion values for instant tracking with zero delay
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    if (typeof window === 'undefined' || matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isWhiteTarget = !!target.closest(
        '[data-cursor="white"], .cursor-white-hover, h1, button, a, [role="button"]'
      );

      const isRedBackgroundOrLetter =
        isWhiteTarget ||
        target.tagName === 'SPAN' ||
        target.innerText === 'KAIZEN' ||
        target.innerText?.includes('VIEW GALLERY');

      setIsHoveredRed(isRedBackgroundOrLetter);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-2px',
        translateY: '-22px',
      }}
    >
      <motion.div
        animate={{
          scale: isClicked ? 0.85 : isHoveredRed ? 1.3 : 1,
          rotate: isHoveredRed ? 12 : 0,
        }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
        className="relative flex items-center justify-center"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isHoveredRed ? '#FFFFFF' : '#E63946'}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-150 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>

        {isHoveredRed && (
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 0.4 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="absolute inset-0 rounded-full bg-white blur-md -z-10"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
