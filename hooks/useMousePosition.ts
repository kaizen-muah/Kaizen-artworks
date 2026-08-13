'use client';

import { useEffect, useRef } from 'react';

export function useMousePosition() {
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent): void => {
      position.current = { x: e.clientX, y: e.clientY };
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return position;
}
