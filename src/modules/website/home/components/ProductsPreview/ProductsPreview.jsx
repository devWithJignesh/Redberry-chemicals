import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOnScreen } from '../../../../../hooks/useOnScreen';
import './ProductsPreview.css';

export default function ProductsPreview({ data }) {
  const { badge, title, subtitle, categories } = data;
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCardFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      ref={ref}
      className={`section-padding products-preview-section reveal-hidden ${
        isVisible ? 'reveal-visible' : ''
      }`}
      aria-label="Products Preview"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">{badge}</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-description">{subtitle}</p>
        </div>

        {/* 3D Flip Card Category Grid */}
        <div className="products-preview-grid">
          {categories.map((cat, idx) => {
            const isFlipped = Boolean(flippedCards[cat.id]);

            return (
              <div
                key={cat.id}
                className={`preview-card-wrap ${isFlipped ? 'flipped' : ''} reveal-hidden ${
                  isVisible ? `reveal-visible reveal-delay-${idx + 1}` : ''
                }`}
                onClick={() => toggleCardFlip(cat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCardFlip(cat.id);
                  }
                }}
                aria-label={`Toggle details for ${cat.title}`}
              >
                <div className="preview-card-inner">
                  {/* Front Side */}
                  <div className="preview-card-front">
                    <div className="preview-card-img-wrap">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="preview-card-img"
                      />
                      <span className="preview-card-tag">{cat.tag}</span>
                    </div>
                    <div className="preview-card-body">
                      <div>
                        <h3 className="preview-card-title">{cat.title}</h3>
                        <p className="preview-card-sub">{cat.subtitle}</p>
                      </div>
                      <div className="preview-flip-hint">
                        <span>Tap or hover to flip 🔄</span>
                      </div>
                    </div>
                  </div>

                  {/* Back Side (3D Rotated) */}
                  <div className="preview-card-back">
                    <div>
                      <h3 className="back-title">{cat.title}</h3>
                      <span className="back-badge">{cat.subtitle}</span>
                      <p className="back-desc">{cat.description}</p>
                    </div>
                    <Link
                      to={cat.path}
                      className="btn btn-accent back-action-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Explore {cat.title} →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="products-preview-footer">
          <Link to="/products" className="btn btn-primary">
            View Complete Product Catalog →
          </Link>
        </div>
      </div>
    </section>
  );
}
