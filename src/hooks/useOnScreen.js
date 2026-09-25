import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that uses IntersectionObserver to detect when an element enters the viewport.
 * @param {Object} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]}
 */
export const useOnScreen = (options = { threshold: 0.15, rootMargin: '0px' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, we can disconnect if we want a one-way trigger
        observer.unobserve(currentRef);
      }
    }, options);

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
};
