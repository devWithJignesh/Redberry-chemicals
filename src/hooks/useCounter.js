import { useState, useEffect } from 'react';

/**
 * Custom hook for smooth animated number counting.
 * @param {number} target - The target number to count to.
 * @param {boolean} shouldStart - Boolean flag (e.g. from useOnScreen) to start counting.
 * @param {number} duration - Animation duration in ms.
 * @returns {number} The current counted value.
 */
export const useCounter = (target, shouldStart = true, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart || target <= 0) return;

    let startTime = null;
    let animationFrameId;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * target);

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, shouldStart, duration]);

  return count;
};
