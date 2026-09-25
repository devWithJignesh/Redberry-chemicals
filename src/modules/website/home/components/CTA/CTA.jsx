import { Link } from 'react-router-dom';
import { useOnScreen } from '../../../../../hooks/useOnScreen';
import './CTA.css';

export default function CTA({ data }) {
  const { badge, title, description, primaryCta, secondaryCta } = data;
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`cta-section reveal-hidden ${
        isVisible ? 'reveal-visible' : ''
      }`}
      aria-label="Call to Action"
    >
      <div className="container">
        <div className="cta-content-box">
          <span className="cta-badge">{badge}</span>
          <h2 className="cta-title">{title}</h2>
          <p className="cta-description">{description}</p>
          <div className="cta-actions">
            <Link to={primaryCta.path} className="btn btn-accent">
              {primaryCta.label} →
            </Link>
            <Link to={secondaryCta.path} className="btn btn-outline-white">
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
