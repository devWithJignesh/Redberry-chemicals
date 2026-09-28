import { Link } from 'react-router-dom';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import './MediaGallery.css';

export default function MediaGallery({
  badge = "Visual Gallery & Field Evidence",
  title = "Our Products & Operations in Action",
  subtitle = "High-impact visual insights into Redberry formulation standards, distribution centers, and field performance.",
  items = []
}) {
  return (
    <section className="media-gallery-section">
      <div className="container">
        <div className="section-header text-center">
          {badge && <span className="section-badge">{badge}</span>}
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-description">{subtitle}</p>}
        </div>

        <div className="media-gallery-grid">
          {items.map((item) => (
            <div key={item.id} className="media-gallery-card">
              <div className="media-card-thumb">
                {item.type === 'video' ? (
                  <VideoPlayer
                    src={item.src}
                    poster={item.poster}
                    className="media-card-video"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="media-card-img"
                    loading="lazy"
                  />
                )}
                {item.tag && <span className="media-card-tag">{item.tag}</span>}
              </div>

              <div className="media-card-body">
                <h3 className="media-card-title">{item.title}</h3>
                <p className="media-card-desc">{item.description}</p>
                {item.link && (
                  <Link to={item.link} className="media-card-link">
                    <span>{item.linkText || 'Explore'}</span>
                    <span className="link-arrow">→</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
