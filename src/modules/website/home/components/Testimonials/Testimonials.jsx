import { useState, useEffect, useCallback } from 'react';
import { useOnScreen } from '../../../../../hooks/useOnScreen';
import './Testimonials.css';

export default function Testimonials({ data }) {
  const { badge, title, subtitle, testimonials } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  const total = testimonials?.length || 0;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay functionality with hover pause
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, total, nextSlide]);

  if (!testimonials || total === 0) return null;

  return (
    <section
      ref={ref}
      className={`section-padding testimonials-section reveal-hidden ${
        isVisible ? 'reveal-visible' : ''
      }`}
      aria-label="Farmer & Dealer Testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">{badge || 'Testimonials'}</span>
          <h2 className="section-title">{title || 'Trusted Across Indian Agriculture'}</h2>
          <p className="section-description">{subtitle}</p>
        </div>

        {/* Carousel Viewport */}
        <div className="testimonials-carousel-wrap">
          <div className="testimonial-slide-track">
            <div
              className="testimonial-slide-container"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((item, idx) => {
                const authorDisplay = item.author || item.name || 'Verified Grower';
                const avatar = item.avatarInitials || (authorDisplay.charAt(0) || 'R');
                const rating = item.rating || 5;

                return (
                  <div key={item.id || idx} className="testimonial-card">
                    <div>
                      <div className="testimonial-rating">
                        {'★'.repeat(rating)}
                      </div>
                      <p className="testimonial-quote">"{item.quote}"</p>
                    </div>
                    <div className="testimonial-author-wrap">
                      <div className="author-avatar-badge">
                        {avatar}
                      </div>
                      <div className="author-info">
                        <span className="author-name">{authorDisplay}</span>
                        {item.location && (
                          <span className="author-meta">{item.location}</span>
                        )}
                        {item.crop && (
                          <span className="author-crop-tag">🌾 {item.crop}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          {total > 1 && (
            <div className="carousel-controls">
              <button
                type="button"
                className="carousel-nav-btn"
                onClick={prevSlide}
                aria-label="Previous Testimonial"
              >
                ←
              </button>
              <div className="carousel-dots">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`carousel-dot ${
                      idx === currentIndex ? 'active' : ''
                    }`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                className="carousel-nav-btn"
                onClick={nextSlide}
                aria-label="Next Testimonial"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
