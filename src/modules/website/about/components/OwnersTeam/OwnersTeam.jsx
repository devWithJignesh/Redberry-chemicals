import { useTilt } from '../../../../../hooks/useTilt';
import { useOnScreen } from '../../../../../hooks/useOnScreen';
import './OwnersTeam.css';

function OwnerCard({ owner, index, isVisible }) {
  const tiltRef = useTilt({ maxTilt: 12, perspective: 1000, scale: 1.02 });

  return (
    <div
      className={`owner-card-wrap reveal-hidden ${
        isVisible ? `reveal-visible reveal-delay-${index + 1}` : ''
      }`}
    >
      <div
        ref={tiltRef}
        className="owner-card"
      >
        <div className="owner-image-container">
          <img
            src={owner.image}
            alt={owner.name}
            className="owner-photo"
          />
          <span className="owner-badge-position">{owner.position}</span>
        </div>

        <div className="owner-card-content">
          <div>
            <h3 className="owner-name">{owner.name}</h3>
            <p className="owner-bio">{owner.bio}</p>
          </div>

          <div className="owner-details-list">
            <div className="owner-detail-item">
              <span className="owner-detail-icon">📞</span>
              <a href={owner.phoneHref} className="owner-phone-link">
                {owner.phone}
              </a>
            </div>
            <div className="owner-detail-item">
              <span className="owner-detail-icon">📍</span>
              <span>{owner.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OwnersTeam({ headerData, owners }) {
  const { badge, title, subtitle } = headerData;
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className={`section-padding owners-team-section reveal-hidden ${
        isVisible ? 'reveal-visible' : ''
      }`}
      aria-label="Our Leadership Team"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">{badge}</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-description">{subtitle}</p>
        </div>

        {/* 3-Card 3D Tilt Grid */}
        <div className="owners-grid">
          {owners.map((owner, idx) => (
            <OwnerCard
              key={owner.name}
              owner={owner}
              index={idx}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
