'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<SVGSVGElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pulseAnimRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });

      requestAnimationFrame(animateCursor);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('[role="button"]') ||
        target.closest('[data-clickable]');

      if (isClickable) setIsHovering(true);
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('[role="button"]') ||
        target.closest('[data-clickable]');

      if (isClickable) setIsHovering(false);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    const frameId = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(frameId);
    };
  }, [prefersReducedMotion, isVisible]);

  // Hover animation - Eye awakens with ring
  useEffect(() => {
    if (prefersReducedMotion) return;
    const eye = eyeRef.current;
    if (!eye) return;

    const pupil = eye.querySelector('.eye-pupil');
    const glow = eye.querySelector('.eye-glow');
    const ring = eye.querySelector('.hover-ring');
    const ringPulse = eye.querySelector('.hover-ring-pulse');
    const eyeBody = eye.querySelector('.eye-body');

    if (isHovering) {
      // Kill previous pulse animation
      if (pulseAnimRef.current) {
        pulseAnimRef.current.kill();
      }

      // Eye grows
      gsap.to(eye, {
        scale: 1.4,
        duration: 0.4,
        ease: 'power2.out',
      });

      // Pupil intensifies
      gsap.to(pupil, {
        opacity: 1,
        scale: 1.2,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Glow appears
      gsap.to(glow, {
        opacity: 0.8,
        duration: 0.4,
        ease: 'power2.out',
      });

      // Ring appears
      gsap.to(ring, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });

      // Eye body fills slightly
      gsap.to(eyeBody, {
        fill: 'rgba(201, 163, 13, 0.15)',
        duration: 0.3,
      });

      // Pulse ring animation
      gsap.set(ringPulse, { opacity: 0.6, scale: 1 });
      pulseAnimRef.current = gsap.to(ringPulse, {
        scale: 1.8,
        opacity: 0,
        duration: 1.2,
        repeat: -1,
        ease: 'power2.out',
      });

    } else {
      // Kill pulse animation
      if (pulseAnimRef.current) {
        pulseAnimRef.current.kill();
        pulseAnimRef.current = null;
      }

      gsap.to(eye, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.to(pupil, {
        opacity: 0.7,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(glow, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.to(ring, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in',
      });

      gsap.to(ringPulse, {
        opacity: 0,
        duration: 0.2,
      });

      gsap.to(eyeBody, {
        fill: 'rgba(201, 163, 13, 0)',
        duration: 0.3,
      });
    }

    return () => {
      if (pulseAnimRef.current) {
        pulseAnimRef.current.kill();
      }
    };
  }, [isHovering, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor-eye"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <svg
        ref={eyeRef}
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Pulse ring (animated) */}
        <circle
          className="hover-ring-pulse"
          cx="24"
          cy="20"
          r="18"
          stroke="#C9A30D"
          strokeWidth="1"
          fill="none"
          opacity="0"
        />

        {/* Hover ring */}
        <circle
          className="hover-ring"
          cx="24"
          cy="20"
          r="18"
          stroke="#C9A30D"
          strokeWidth="1.5"
          fill="none"
          opacity="0"
          strokeDasharray="4 4"
        />

        {/* Glow effect */}
        <ellipse
          className="eye-glow"
          cx="24"
          cy="20"
          rx="16"
          ry="12"
          fill="url(#goldGlow)"
          opacity="0"
        />

        {/* Eye body (fills on hover) */}
        <path
          className="eye-body"
          d="M6 20C6 20 12 10 24 10C36 10 42 20 42 20C42 20 36 30 24 30C12 30 6 20 6 20Z"
          fill="rgba(201, 163, 13, 0)"
        />

        {/* Outer eye shape */}
        <path
          d="M6 20C6 20 12 10 24 10C36 10 42 20 42 20C42 20 36 30 24 30C12 30 6 20 6 20Z"
          stroke="#C9A30D"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Inner eye circle */}
        <circle
          cx="24"
          cy="20"
          r="7"
          stroke="#C9A30D"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Pupil */}
        <circle
          className="eye-pupil"
          cx="24"
          cy="20"
          r="3.5"
          fill="#C9A30D"
          opacity="0.7"
        />

        {/* Eyebrow line */}
        <path
          d="M10 12C12 8 18 5 24 5C30 5 36 8 38 12"
          stroke="#C9A30D"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* Tear line */}
        <path
          d="M24 30L21 40"
          stroke="#C9A30D"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Spiral tail */}
        <path
          d="M21 40C21 40 18 42 16 41C14 40 15 38 17 38"
          stroke="#C9A30D"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        <defs>
          <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C9A30D" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C9A30D" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
