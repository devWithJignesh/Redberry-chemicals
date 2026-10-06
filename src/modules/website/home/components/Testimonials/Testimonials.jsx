import { useState, useEffect, useCallback } from 'react';
import { useOnScreen } from '../../../../../hooks/useOnScreen';
import { getReviewsApi } from '../../../../../api/reviewApi';
import './Testimonials.css';

export default function Testimonials({ data = {} }) {
  const { badge, title, subtitle } = data;
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviewsApi();
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((r) => ({
            id: r._id || r.id,
            quote: r.description || r.review || r.title || 'Exceptional experience with Redberry products.',
            author: r.name || 'Customer',
            address: r.address || r.location || 'India',
            rating: Number(r.rate) || 5,
            image: r.image || '',
            avatarInitials: (r.name || 'R').charAt(0).toUpperCase(),
          }));
          setTestimonialsList(mapped);
        } else {
          setTestimonialsList([]);
        }
      } catch (err) {
        console.warn('Error fetching testimonials from reviews API:', err);
        setTestimonialsList([]);
      }
    };

    fetchReviews();
  }, []);

  const total = testimonialsList?.length || 0;

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

  if (!testimonialsList || total === 0) return null;

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
          <p className="section-description">{subtitle || 'Real feedback from commercial growers and dealers across India'}</p>
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
              {testimonialsList.map((item, idx) => {
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
                      {item.image ? (
                        <div className="author-avatar-img-wrap">
                          <img
                            src={item.image}
                            alt={authorDisplay}
                            className="author-avatar-img"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              if (e.target.nextSibling) {
                                e.target.nextSibling.style.display = 'flex';
                              }
                            }}
                          />
                          <div className="author-avatar-badge" style={{ display: 'none' }}>
                            {avatar}
                          </div>
                        </div>
                      ) : (
                        <div className="author-avatar-badge">
                          {avatar}
                        </div>
                      )}
                      <div className="author-info">
                        <span className="author-name">{authorDisplay}</span>
                        {(item.address || item.location) && (
                          <span className="author-meta">{item.address || item.location}</span>
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
                {testimonialsList.map((_, idx) => (
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
