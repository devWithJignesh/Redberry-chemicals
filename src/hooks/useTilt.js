import { useEffect, useRef } from 'react';

/**
 * Custom hook for pure CSS 3D tilt-on-hover effect.
 * @param {Object} options - Configuration for tilt intensity and perspective
 * @returns {React.RefObject} ref to attach to the element
 */
export const useTilt = (options = {}) => {
  const {
    maxTilt = 12,
    perspective = 1000,
    scale = 1.02,
    speed = 400,
  } = options;

  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    el.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      const rotateX = (-yPct * maxTilt).toFixed(2);
      const rotateY = (xPct * maxTilt).toFixed(2);

      el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      el.style.transition = 'transform 100ms ease-out';
    };

    const handleMouseLeave = () => {
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      el.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, perspective, scale, speed]);

  return elementRef;
};
