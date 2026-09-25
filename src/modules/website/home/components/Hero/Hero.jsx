import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero({ data }) {
  const { slides = [], autoplayIntervalMs = 5000 } = data;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const handleScrollDown = () => {
    const nextSection = document.querySelector('.why-choose-us-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  // Autoplay timer with pause on hover / touch
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoplayIntervalMs);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides, autoplayIntervalMs, nextSlide]);

  if (totalSlides === 0) return null;

  const currentSlide = slides[activeIndex] || slides[0];

  return (
    <section
      className="hero-section"
      aria-label="Full-Page Hero Slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Background Image Slider with Crossfade & Ken Burns Zoom */}
      <div className="hero-slider" aria-hidden="true">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={slide.id || index}
              className={`hero-slide ${isActive ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />
          );
        })}
      </div>

      {/* Dark Nature Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Hero Text Content with Dynamic Animated Typography */}
      <div className="container">
        <div className="hero-content">
          <div className="hero-tag-badge">
            🌿 Redberry Agri Sciences
          </div>

          {/* Keyed container restarts typography animations on slide change */}
          <div key={currentSlide.id || activeIndex}>
            <h1 className="hero-animated-title">
              {currentSlide.headline}
            </h1>

            <p className="hero-animated-subtext">
              {currentSlide.subtext}
            </p>

            <div className="hero-cta-wrap">
              <Link
                to={currentSlide.ctaHref || '/products'}
                className="btn hero-btn-primary"
              >
                {currentSlide.ctaLabel || 'Explore Products'} →
              </Link>
              <Link to="/contact" className="btn hero-btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Previous / Next Arrow Controls */}
      {totalSlides > 1 && (
        <>
          <button
            type="button"
            className="hero-arrow prev"
            onClick={prevSlide}
            aria-label="Previous Slide"
          >
            ‹
          </button>
          <button
            type="button"
            className="hero-arrow next"
            onClick={nextSlide}
            aria-label="Next Slide"
          >
            ›
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {totalSlides > 1 && (
        <div className="hero-dots" role="tablist" aria-label="Hero Slide Navigation">
          {slides.map((slide, index) => (
            <button
              key={slide.id || index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
              className={`hero-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Animated Hero Scroll Down Prompt */}
      <button
        type="button"
        className="hero-scroll-indicator"
        onClick={handleScrollDown}
        aria-label="Scroll Down to Explore"
      >
        <div className="mouse-icon">
          <div className="mouse-wheel" />
        </div>
        <span className="scroll-text">Scroll Down</span>
        <span className="scroll-chevron">▼</span>
      </button>
    </section>
  );
}
