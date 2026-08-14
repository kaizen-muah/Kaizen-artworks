'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

const steps = [
  {
    number: '01',
    title: 'Rough Sketch',
    description:
      'Every piece begins with gesture and intent. Loose, fast, exploratory — this is where ideas live before they have form. I send you a rough for directional feedback before investing detail.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10" aria-hidden="true">
        <path d="M8 32c4-8 10-16 20-22M14 18c2-2 4-3 6-2M20 28c-2-4 0-8 4-10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Lineart',
    description:
      'The skeleton becomes a body. Clean, confident linework that defines every edge and contour. Varying line weight gives the illustration depth and energy before a single shade is applied.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10" aria-hidden="true">
        <circle cx="20" cy="16" r="7"/>
        <path d="M10 32c0-5.5 4.5-10 10-10s10 4.5 10 10" strokeLinecap="round"/>
        <line x1="8" y1="38" x2="32" y2="38" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Shading & Colour',
    description:
      'Light chooses what the eye sees first. I work in cel-shading or soft-render depending on the brief, sculpting form through shadow and highlight. This stage transforms drawing into illustration.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10" aria-hidden="true">
        <circle cx="20" cy="20" r="12"/>
        <path d="M20 8v-4M20 36v-4M8 20H4M36 20h-4M11 11L8 8M32 11l3-3M11 29l-3 3M32 29l3 3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Final Render',
    description:
      'Details, atmosphere, and final polish. Background integration, texture overlays, chromatic effects. The piece is reviewed at full resolution before delivery in all requested formats.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10" aria-hidden="true">
        <rect x="6" y="6" width="28" height="28" rx="2"/>
        <path d="M13 20l5 5 9-9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathMobileRef = useRef<SVGPathElement>(null);
  const pencilRef = useRef<HTMLDivElement>(null);
  const pencilMobileRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    // 1. Staggered fade & slide up for the steps cards
    gsap.fromTo(
      '.process-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // 2. Desktop SVG Path drawing animation
    if (pathRef.current && pencilRef.current) {
      const length = pathRef.current.getTotalLength();
      
      // Set up the path stroke dasharray & offset for the "drawing" effect
      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 60%',
          end: 'bottom 50%',
          scrub: 1.2, // Adds that smooth lag catch-up
        },
      });

      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
      }, 0);

      // Animate the pencil position along the desktop SVG path
      tl.to(pencilRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        ease: 'none',
      }, 0);
    }

    // 3. Mobile SVG Path drawing animation
    if (pathMobileRef.current && pencilMobileRef.current) {
      const lengthMobile = pathMobileRef.current.getTotalLength();
      
      gsap.set(pathMobileRef.current, {
        strokeDasharray: lengthMobile,
        strokeDashoffset: lengthMobile,
      });

      const tlMobile = gsap.timeline({
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 75%',
          end: 'bottom 75%',
          scrub: 1.2,
        },
      });

      tlMobile.to(pathMobileRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
      }, 0);

      tlMobile.to(pencilMobileRef.current, {
        motionPath: {
          path: pathMobileRef.current,
          align: pathMobileRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        ease: 'none',
      }, 0);
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="process"
      className="section-padding content-max relative overflow-hidden"
      aria-label="Artistic process"
    >
      {/* Header */}
      <div className="mb-20">
        <p className="label-caps text-[#E63946] mb-3">How it works</p>
        <h2 className="display-text text-[clamp(2.5rem,6vw,5rem)] text-[#F5F5F0]">
          The Process
        </h2>
      </div>

      {/* Drawing Connector Paths - Desktop */}
      <div className="hidden lg:block absolute left-0 right-0 top-[280px] h-[100px] pointer-events-none z-10">
        <svg className="w-full h-full" viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none">
          {/* Background guide path */}
          <path
            d="M 50,50 C 200,90 300,10 500,50 C 700,90 800,10 950,50 C 1050,75 1100,50 1150,50"
            stroke="rgba(42, 42, 42, 0.25)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          {/* Active drawing path */}
          <path
            ref={pathRef}
            d="M 50,50 C 200,90 300,10 500,50 C 700,90 800,10 950,50 C 1050,75 1100,50 1150,50"
            stroke="#E63946"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Floating pencil tip that follows the path */}
        <div
          ref={pencilRef}
          className="absolute w-6 h-6 -ml-3 -mt-3 text-[#E63946]"
          style={{ transformOrigin: 'center' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full rotate-45 transform">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </div>
      </div>

      {/* Drawing Connector Paths - Mobile & Tablet */}
      <div className="block lg:hidden absolute left-12 top-[240px] bottom-[120px] w-[50px] pointer-events-none z-10">
        <svg className="w-full h-full" fill="none" preserveAspectRatio="none">
          {/* Guide path */}
          <path
            d="M 10,10 Q 40,150 10,300 T 10,600 T 10,900 T 10,1200"
            stroke="rgba(42, 42, 42, 0.25)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          {/* Active path */}
          <path
            ref={pathMobileRef}
            d="M 10,10 Q 40,150 10,300 T 10,600 T 10,900 T 10,1200"
            stroke="#E63946"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Pencil tip (mobile) */}
        <div
          ref={pencilMobileRef}
          className="absolute w-6 h-6 -ml-3 -mt-3 text-[#E63946]"
          style={{ transformOrigin: 'center' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full rotate-45 transform">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </div>
      </div>

      {/* Steps Grid */}
      <div
        ref={stepsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2A2A2A] relative z-20"
      >
        {steps.map((step) => (
          <div
            key={step.number}
            className="process-card bg-[#0A0A0A] p-8 flex flex-col gap-6 group hover:bg-[#111111] transition-colors duration-300 relative overflow-hidden"
          >
            {/* Number + icon */}
            <div className="flex items-start justify-between">
              <span
                className="display-text text-[4rem] text-[#1A1A1A] leading-none group-hover:text-[#2A2A2A] transition-colors duration-300 select-none"
              >
                {step.number}
              </span>
              <span className="text-[#E63946] mt-1">{step.icon}</span>
            </div>

            {/* Title */}
            <h3 className="text-[#F5F5F0] font-medium text-lg relative z-10">{step.title}</h3>

            {/* Description */}
            <p className="text-[#6B7280] text-sm leading-relaxed relative z-10">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <p className="mt-12 text-center text-[#6B7280] text-sm">
        Typical turnaround: <span className="text-[#F5F5F0]">3–21 days</span> depending on complexity.
        Rush orders available — just ask.
      </p>
    </section>
  );
}
