'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { scrollToSection } from '@/lib/utils';

const navLinks = [
  { label: 'Gallery', href: 'gallery' },
  { label: 'Process', href: 'process' },
  { label: 'Testimonials', href: 'testimonials' },
  { label: 'Pricing', href: 'pricing' },
  { label: 'Contact', href: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = navLinks.map(l => document.getElementById(l.href)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((href: string): void => {
    scrollToSection(href);
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-emerald-700/95 backdrop-blur-md border-b border-emerald-600'
            : 'bg-emerald-600'
        }`}
      >
        {/* Animated Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] md:h-[3px] bg-emerald-800/80 overflow-hidden pointer-events-none">
          <motion.div
            className="h-full bg-gradient-to-r from-white via-emerald-100 to-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{ scaleX, transformOrigin: '0%' }}
          />
        </div>
        <nav
          className="flex items-center justify-between px-6 md:px-12 h-16 md:h-20 max-w-[1440px] mx-auto"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-light tracking-[0.25em] text-white hover:text-emerald-100 transition-colors duration-200"
            style={{ fontFamily: 'var(--font-cormorant)' }}
            aria-label="Kaizen — back to top"
          >
            KAIZEN
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => handleNavClick(href)}
                  className={`text-xs uppercase tracking-[0.18em] transition-all duration-200 pb-1 border-b-2 ${
                    activeSection === href
                      ? 'text-white font-semibold border-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]'
                      : 'text-white/85 font-medium border-transparent hover:text-white hover:border-white/40'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden md:flex items-center gap-2 px-5 py-2 border-2 border-white text-white text-xs font-semibold tracking-widest uppercase hover:bg-white hover:text-emerald-800 transition-all duration-200 shadow-sm"
          >
            Commission Me
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-white origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-white"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-white origin-center"
              transition={{ duration: 0.3 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-emerald-700 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map(({ label, href }, i) => (
              <motion.button
                key={href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleNavClick(href)}
                className="text-4xl font-light text-white hover:text-emerald-100 transition-colors duration-200"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              onClick={() => handleNavClick('contact')}
              className="mt-6 px-8 py-3 border border-white text-white text-sm font-medium tracking-widest uppercase hover:bg-white hover:text-emerald-700 transition-all duration-200"
            >
              Commission Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
