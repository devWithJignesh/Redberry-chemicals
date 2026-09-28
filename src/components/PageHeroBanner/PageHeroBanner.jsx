import { Link } from 'react-router-dom';
import VideoPlayer from '../common/VideoPlayer/VideoPlayer';
import './PageHeroBanner.css';

export default function PageHeroBanner({
  badge,
  title,
  subtitle,
  videoSrc,
  imageSrc = '/images/hero/slide-1.jpg',
  breadcrumbs = [],
  primaryCta,
  secondaryCta,
}) {
  return (
    <section className="page-hero-banner">
      {/* Background Media: Video (MP4 / YouTube / Vimeo) or Image */}
      <div className="page-hero-bg" aria-hidden="true">
        {videoSrc ? (
          <VideoPlayer
            src={videoSrc}
            poster={imageSrc}
            className="page-hero-video"
          />
        ) : (
          <div
            className="page-hero-image"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        )}
      </div>

      {/* Layered Cinematic Overlays */}
      <div className="page-hero-overlay" />
      <div className="page-hero-vignette" />

      <div className="container relative-z">
        <div className="page-hero-content">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="page-hero-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              {breadcrumbs.map((item, idx) => (
                <span key={idx} className="breadcrumb-item">
                  <span className="breadcrumb-sep">/</span>
                  {item.href ? (
                    <Link to={item.href}>{item.label}</Link>
                  ) : (
                    <span className="breadcrumb-active">{item.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Badge */}
          {badge && (
            <div className="page-hero-badge">
              <span className="hero-badge-dot">●</span>
              <span>{badge}</span>
            </div>
          )}

          {/* Main Title */}
          <h1 className="page-hero-title">{title}</h1>

          {/* Subtitle */}
          {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}

          {/* Optional Action CTA links */}
          {(primaryCta || secondaryCta) && (
            <div className="page-hero-actions">
              {primaryCta && (
                <Link to={primaryCta.href} className="btn-hero-primary">
                  <span>{primaryCta.label}</span>
                  <span className="btn-arrow">→</span>
                </Link>
              )}
              {secondaryCta && (
                <Link to={secondaryCta.href} className="btn-hero-secondary">
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
