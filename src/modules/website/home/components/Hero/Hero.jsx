import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero({ data }) {
  const { slides = [], autoplayIntervalMs = 6000 } = data;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const progressRef = useRef(null);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev + 1) % totalSlides);
    setAnimationKey((k) => k + 1);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setAnimationKey((k) => k + 1);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setActiveIndex(index);
    setAnimationKey((k) => k + 1);
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
  const slideNumber = String(activeIndex + 1).padStart(2, '0');
  const totalNumber = String(totalSlides).padStart(2, '0');

  return (
    <section
      className="hero-section"
      aria-label="Full-Page Hero Slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* ─── Background Image Slider with Ken Burns ─── */}
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

      {/* ─── Cinematic Layered Overlays ─── */}
      <div className="hero-overlay" />
      <div className="hero-overlay-left" />
      <div className="hero-vignette" />

      {/* ─── Floating Particles (Subtle Light Specks) ─── */}
      <div className="hero-particles" aria-hidden="true">
        <span className="particle p1" />
        <span className="particle p2" />
        <span className="particle p3" />
        <span className="particle p4" />
        <span className="particle p5" />
        <span className="particle p6" />
      </div>

      {/* ─── Hero Content ─── */}
      <div className="container">
        <div className="hero-content" key={animationKey}>
          {/* Premium Badge */}
          <div className="hero-badge">
            <span className="hero-badge-icon">🌿</span>
            <span className="hero-badge-text">REDBERRY AGRI SCIENCES</span>
          </div>

          {/* Animated Headline */}
          <h1 className="hero-headline">
            {currentSlide.headline.split('\n').map((line, i) => (
              <span key={i} className="hero-headline-line">
                {line}
              </span>
            ))}
          </h1>

          {/* Sub-description */}
          <p className="hero-description">
            {currentSlide.subtext}
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <Link
              to={currentSlide.ctaHref || '/contact'}
              className="hero-cta-primary"
            >
              <span>{currentSlide.ctaLabel || 'Get in Touch'}</span>
              <span className="hero-cta-arrow">→</span>
            </Link>
            <Link to="/contact" className="hero-cta-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Slider Navigation Controls ─── */}
      {totalSlides > 1 && (
        <>
          {/* Previous / Next Glass Buttons */}
          <button
            type="button"
            className="hero-nav-btn hero-nav-prev"
            onClick={prevSlide}
            aria-label="Previous Slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="hero-nav-btn hero-nav-next"
            onClick={nextSlide}
            aria-label="Next Slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>

          {/* Bottom Bar: Slide Counter + Indicators */}
          <div className="hero-bottom-bar">
            {/* Slide Counter */}
            <div className="hero-slide-counter">
              <span className="counter-current">{slideNumber}</span>
              <span className="counter-divider">/</span>
              <span className="counter-total">{totalNumber}</span>
            </div>

            {/* Progress Dot Indicators */}
            <div className="hero-indicators" role="tablist" aria-label="Hero Slide Navigation">
              {slides.map((slide, index) => (
                <button
                  key={slide.id || index}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`hero-indicator ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                >
                  {index === activeIndex && (
                    <span
                      ref={progressRef}
                      className="indicator-progress"
                      style={{ animationDuration: `${autoplayIntervalMs}ms` }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ─── Scroll Cue ─── */}
      <button
        type="button"
        className="hero-scroll-cue"
        onClick={handleScrollDown}
        aria-label="Scroll Down to Explore"
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span className="scroll-label">Scroll</span>
      </button>

      {/* ─── Bottom Gradient Fade ─── */}
      <div className="hero-bottom-fade" />
    </section>
  );
}
