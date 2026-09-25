import { useOnScreen } from '../../../../../hooks/useOnScreen';
import './MissionVision.css';

export default function MissionVision({ data }) {
  const { badge, title, subtitle, cards } = data;
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'target':
        return '🎯';
      case 'eye':
        return '🔭';
      case 'check-badge':
        return '📜';
      default:
        return '🌱';
    }
  };

  return (
    <section
      ref={ref}
      className={`section-padding mission-vision-section reveal-hidden ${
        isVisible ? 'reveal-visible' : ''
      }`}
      aria-label="Mission, Vision & Quality Policy"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge section-badge-dark">{badge}</span>
          <h2 className="section-title section-title-dark">{title}</h2>
          <p className="section-description section-description-dark">{subtitle}</p>
        </div>

        {/* 3 Mission Cards */}
        <div className="mission-grid">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className={`mission-card reveal-hidden ${
                isVisible ? `reveal-visible reveal-delay-${idx + 1}` : ''
              }`}
            >
              <div className="mission-icon-box">{getIcon(card.icon)}</div>
              <h3 className="mission-card-title">{card.title}</h3>
              <p className="mission-card-desc">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
