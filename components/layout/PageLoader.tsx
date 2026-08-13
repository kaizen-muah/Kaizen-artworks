'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem('kaizen-loader-shown');
    if (hasSeenLoader) {
      setIsVisible(false);
      return;
    }

    // Count 0 → 100
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(100 / steps);
      if (current >= 100) {
        setCount(100);
        clearInterval(timer);
        setTimeout(() => {
          sessionStorage.setItem('kaizen-loader-shown', 'true');
          setIsVisible(false);
        }, 600);
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
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center"
          aria-hidden="true"
        >
          {/* Logo / name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 text-center"
          >
            <span
              className="text-6xl md:text-8xl font-light tracking-[0.3em] text-[#F5F5F0]"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              K
            </span>
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-sm font-medium tracking-[0.2em] text-[#6B7280] tabular-nums"
          >
            {String(count).padStart(3, '0')}
          </motion.div>

          {/* Red sweep line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-[#E63946]"
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
