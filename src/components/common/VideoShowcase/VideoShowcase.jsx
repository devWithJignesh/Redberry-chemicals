import { Link } from 'react-router-dom';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import './VideoShowcase.css';

export default function VideoShowcase({
  badge = "Field Operations & Science",
  title = "Research-Driven Formulation & Application",
  subtitle = "Watch our scientific agrochemical solutions at work across Indian farmlands and precision trial fields.",
  videoSrc = "/images/hero/mixkit-tractor-in-a-wheat-field-at-sunset-done-in-cgi-34035-hd-ready.mp4",
  posterImage = "/images/hero/slide-1.jpg",
  ctaText = "Explore Our Product Line",
  ctaLink = "/products",
  contactLink = "/contact"
}) {
  return (
    <section className="video-showcase-section">
      <div className="container">
        <div className="video-showcase-card">
          {/* Header */}
          <div className="video-showcase-header text-center">
            {badge && <span className="section-badge">{badge}</span>}
            <h2 className="video-showcase-title">{title}</h2>
            {subtitle && <p className="video-showcase-subtitle">{subtitle}</p>}
          </div>

          {/* Video Player Box */}
          <div className="video-player-wrapper">
            <VideoPlayer
              src={videoSrc}
              poster={posterImage}
              className="video-showcase-player"
            />

            <div className="video-overlay-gradient" />

            {/* Floating Glass Overlay Card */}
            <div className="video-floating-badge">
              <div className="live-indicator">
                <span className="live-pulse"></span>
                <span>REDBERRY FIELD INSIGHTS</span>
              </div>
              <p className="video-floating-text">
                Advanced crop care engineered for maximum bio-efficacy and sustained field protection.
              </p>
            </div>
          </div>

          {/* Action Links Bar */}
          <div className="video-showcase-actions">
            <div className="video-action-info">
              <span className="action-icon">🌱</span>
              <span>Need technical guidance for your crop season?</span>
            </div>
            <div className="video-action-buttons">
              {ctaLink && (
                <Link to={ctaLink} className="btn btn-primary btn-sm">
                  {ctaText} →
                </Link>
              )}
              {contactLink && (
                <Link to={contactLink} className="btn btn-secondary btn-sm">
                  Get Dealer Inquiry 📞
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
