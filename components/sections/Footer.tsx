'use client';

import { scrollToSection } from '@/lib/utils';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A] pt-16 pb-8" aria-label="Site footer">
      <div className="content-max px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 
              className="text-3xl font-light tracking-[0.25em] text-[#F5F5F0] mb-4"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              KAIZEN
            </h2>
            <p className="text-[#6B7280] text-sm max-w-xs">
              Premium anime and manga character illustrations. Bringing stories to life through digital ink.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label-caps text-[#F5F5F0] mb-6">Navigation</p>
            <ul className="flex flex-col gap-3">
              {['Gallery', 'Process', 'Testimonials', 'Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-[#6B7280] hover:text-[#E63946] text-sm transition-colors duration-200"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="label-caps text-[#F5F5F0] mb-6">Connect</p>
            <ul className="flex flex-col gap-3">
              <li><a href="https://www.instagram.com/kaizen_arts/?hl=en" target="_blank" rel="noopener noreferrer" className="text-[#6B7280] hover:text-[#E63946] text-sm transition-colors duration-200">Instagram</a></li>
              <li><a href="#" className="text-[#6B7280] hover:text-[#E63946] text-sm transition-colors duration-200">Twitter / X</a></li>
              <li><a href="#" className="text-[#6B7280] hover:text-[#E63946] text-sm transition-colors duration-200">ArtStation</a></li>
              <li><a href="mailto:contact@kaizen-art.com" className="text-[#6B7280] hover:text-[#E63946] text-sm transition-colors duration-200">Email Me</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#2A2A2A] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6B7280] text-xs">
            © {year} Kaizen Art. All rights reserved.
          </p>
          
          <button 
            onClick={() => scrollToSection('hero')}
            className="group flex items-center gap-2 text-[#6B7280] hover:text-[#F5F5F0] text-xs transition-colors duration-200"
          >
            Back to top
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 12 12" 
              fill="none" 
              className="group-hover:-translate-y-1 transition-transform duration-200"
            >
              <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
