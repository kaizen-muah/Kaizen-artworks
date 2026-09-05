'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  // Always trigger landing animation on page load and reload
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1400;
    const steps = 50;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(100 / steps);
      if (current >= 100) {
        setCount(100);
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
        }, 400);
      } else {
        setCount(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0c0c0e] flex flex-col items-center justify-center"
          aria-hidden="true"
        >
          {/* Logo / name */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 text-center"
          >
            <span
              className="text-[48px] leading-none text-[#f5f5f0] select-none"
              style={{ fontFamily: "'Algerian', serif" }}
            >
              K
            </span>
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-sm font-medium tracking-[0.25em] text-stone-400 tabular-nums font-mono"
          >
            {String(count).padStart(3, '0')}
          </motion.div>

          {/* Emerald sweep line matching site theme */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            style={{ width: '100%', transformOrigin: 'left' }}
            transition={{ ease: 'linear', duration: 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
