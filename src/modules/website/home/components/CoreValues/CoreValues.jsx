import { useOnScreen } from '../../../../../hooks/useOnScreen';
import './CoreValues.css';

export default function CoreValues({ data }) {
  const { badge, title, subtitle, values = [] } = data;
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'lightbulb':
        return '💡';
      case 'award':
        return '🏆';
      case 'handshake':
        return '🤝';
      case 'eco':
        return '🌿';
      case 'farmer':
        return '🧑‍🌾';
      case 'shield-check':
        return '🛡️';
      case 'users':
        return '👥';
      case 'globe':
        return '🌍';
      case 'trending-up':
        return '📈';
      default:
        return '⭐';
    }
  };

  return (
    <section
      ref={ref}
      className={`section-padding core-values-section reveal-hidden ${
        isVisible ? 'reveal-visible' : ''
      }`}
      aria-label="Redberry Core Values"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge section-badge-dark">{badge}</span>
          <h2 className="section-title section-title-dark">{title}</h2>
          <p className="section-description section-description-dark">{subtitle}</p>
        </div>

        {/* Core Values 3x3 Grid */}
        <div className="values-grid">
          {values.map((val, idx) => (
            <div
              key={val.id || idx}
              className={`value-card reveal-hidden ${
                isVisible ? `reveal-visible reveal-delay-${(idx % 3) + 1}` : ''
              }`}
            >
              <div className="value-icon-box">{getIcon(val.icon)}</div>
              <h3 className="value-title">{val.title}</h3>
              <p className="value-desc">{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
