import { useState, useEffect, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const ringPosRef = useRef({ x: -100, y: -100 });
  const ringElRef = useRef(null);
  const mousePosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only activate for non-touch pointer devices
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    let animationFrameId;

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over clickable / interactive elements
      const target = e.target;
      const isInteractive = Boolean(
        target.closest(
          'a, button, input, textarea, select, [role="button"], .why-card, .preview-card-wrap, .product-card, .owner-card, .value-card, .hero-dot, .hero-arrow'
        )
      );
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Smooth trailing animation loop for ring using requestAnimationFrame
    const updateRing = () => {
      const ease = 0.18;
      ringPosRef.current.x += (mousePosRef.current.x - ringPosRef.current.x) * ease;
      ringPosRef.current.y += (mousePosRef.current.y - ringPosRef.current.y) * ease;

      if (ringElRef.current) {
        ringElRef.current.style.left = `${ringPosRef.current.x}px`;
        ringElRef.current.style.top = `${ringPosRef.current.y}px`;
      }

      animationFrameId = requestAnimationFrame(updateRing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animationFrameId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Inner Dot */}
      <div
        className={`custom-cursor-dot ${isHovering ? 'is-hovering' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Smooth Trailing Aura Ring */}
      <div
        ref={ringElRef}
        className={`custom-cursor-ring ${isHovering ? 'is-hovering' : ''} ${
          isClicking ? 'is-clicking' : ''
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
