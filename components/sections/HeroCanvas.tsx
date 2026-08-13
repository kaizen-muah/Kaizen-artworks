'use client';

import { useRef, useEffect } from 'react';

/**
 * Lightweight 5-point perspective (fisheye) background using Canvas 2D.
 * Renders a radial grid projected as if viewed from inside a sphere.
 * Uses requestAnimationFrame + mouse tracking via CSS vars for zero-lag rendering.
 */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = e.clientY / window.innerHeight;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    resize();

    // 5-point perspective: draw concentric ellipses + radial lines warped by mouse
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation - this is what makes it lag-free
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Vanishing point follows mouse gently
      const vpX = width * (0.3 + mouseX * 0.4);
      const vpY = height * (0.3 + mouseY * 0.4);

      ctx.strokeStyle = 'rgba(245, 245, 240, 0.07)';
      ctx.lineWidth = 0.8;

      // Draw radial lines from vanishing point (like 5-pt perspective lines)
      const numLines = 28;
      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        const endX = vpX + Math.cos(angle) * Math.max(width, height) * 1.5;
        const endY = vpY + Math.sin(angle) * Math.max(width, height) * 1.5;

        ctx.beginPath();
        ctx.moveTo(vpX, vpY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Draw concentric ellipses warped by mouse position (fisheye curvature)
      const numRings = 10;
      for (let r = 1; r <= numRings; r++) {
        const progress = r / numRings;
        // Barrel distortion: rings get more stretched near edges
        const radiusX = width * 0.06 * r * (1 + progress * 0.6);
        const radiusY = height * 0.07 * r * (1 + progress * 0.4);

        // Shift ellipse center slightly based on mouse (parallax layers)
        const shiftX = (mouseX - 0.5) * 60 * (1 - progress);
        const shiftY = (mouseY - 0.5) * 40 * (1 - progress);

        ctx.beginPath();
        ctx.ellipse(
          vpX + shiftX,
          vpY + shiftY,
          radiusX,
          radiusY,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
