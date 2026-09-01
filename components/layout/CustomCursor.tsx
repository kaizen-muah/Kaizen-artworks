'use client';

import { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

// Wooden pencil SVG cursor — looks like a real HB pencil
function WoodenPencilSVG({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pencil body (wood-yellow) */}
      <rect x="9" y="2" width="10" height="22" rx="1" fill="#F5C842" />
      {/* Dark stripe (graphite band) */}
      <rect x="9" y="19" width="10" height="2.5" fill="#B8860B" />
      {/* Eraser (pink) */}
      <rect x="9" y="2" width="10" height="4" rx="1" fill="#F4A0A0" />
      {/* Eraser band (silver) */}
      <rect x="9" y="5.5" width="10" height="1.5" fill="#C0C0C0" />
      {/* Sharpened cone tip */}
      <polygon points="9,21.5 19,21.5 14,30" fill="#E8C07A" />
      {/* Graphite tip point */}
      <polygon points="12,27 16,27 14,30" fill="#555555" />
      {/* Left shading on body */}
      <rect x="9" y="7" width="2" height="14.5" fill="#E0B030" opacity="0.5" />
      {/* Right highlight on body */}
      <rect x="17" y="7" width="2" height="14.5" fill="#FFEB6B" opacity="0.4" />
    </svg>
  );
}

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    if (typeof window === 'undefined' || matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-4px',
        translateY: '-28px',
        rotate: -15,
      }}
    >
      <WoodenPencilSVG size={32} />
    </motion.div>
  );
}
