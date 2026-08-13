'use client';

import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function CustomCursor() {
  const isDesktop = useMediaQuery('(pointer: fine)');
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  useMousePosition();

  useEffect(() => {
    if (!isDesktop) return;

    let rafId: number;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent): void => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = (): void => {
      dotX = targetX;
      dotY = targetY;
      ringX += (targetX - ringX) * 0.12;
      ringY += (targetY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    const onMouseOver = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, label');
      setIsExpanded(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-colors duration-200 ${
          isExpanded ? 'bg-[#E63946]' : 'bg-[#F5F5F0]'
        }`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-9 h-9 rounded-full border pointer-events-none z-[9998] transition-all duration-300 ${
          isExpanded
            ? 'w-14 h-14 border-[#E63946]/50'
            : 'border-[#F5F5F0]/30'
        }`}
        aria-hidden="true"
      />
    </>
  );
}
