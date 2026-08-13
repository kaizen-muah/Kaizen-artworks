'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
            ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#2A2A2A]'
            : 'bg-transparent'
        }`}
      >
        <nav
          className="flex items-center justify-between px-6 md:px-12 h-16 md:h-20 max-w-[1440px] mx-auto"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-light tracking-[0.25em] text-[#F5F5F0] hover:text-[#E63946] transition-colors duration-200"
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
                  className={`label-caps text-xs transition-colors duration-200 pb-0.5 border-b border-transparent ${
                    activeSection === href
                      ? 'text-[#F5F5F0] border-[#E63946]'
                      : 'text-[#6B7280] hover:text-[#F5F5F0]'
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
            className="hidden md:flex items-center gap-2 px-5 py-2 border border-[#E63946] text-[#E63946] text-xs font-medium tracking-widest uppercase hover:bg-[#E63946] hover:text-[#F5F5F0] transition-all duration-200"
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
              className="block w-6 h-px bg-[#F5F5F0] origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-[#F5F5F0]"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[#F5F5F0] origin-center"
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
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map(({ label, href }, i) => (
              <motion.button
                key={href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleNavClick(href)}
                className="text-4xl font-light text-[#F5F5F0] hover:text-[#E63946] transition-colors duration-200"
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
              className="mt-6 px-8 py-3 border border-[#E63946] text-[#E63946] text-sm font-medium tracking-widest uppercase"
            >
              Commission Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
