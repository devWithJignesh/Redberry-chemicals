import { useOnScreen } from '../../../../../hooks/useOnScreen';
import './WhyChooseUs.css';

export default function WhyChooseUs({ data }) {
  const { badge, title, subtitle, features } = data;
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'chemistry':
        return '🧪';
      case 'certificate':
        return '🛡️';
      case 'plant':
        return '🌾';
      case 'network':
        return '🚚';
      default:
        return '✨';
    }
  };

  return (
    <section
      ref={ref}
      className={`section-padding why-choose-us-section reveal-hidden ${
        isVisible ? 'reveal-visible' : ''
      }`}
      aria-label="Why Choose Redberry"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">{badge}</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-description">{subtitle}</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="why-cards-grid">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              className={`why-card reveal-hidden ${
                isVisible ? `reveal-visible reveal-delay-${idx + 1}` : ''
              }`}
            >
              <div className="why-card-icon-wrap">
                {getIcon(feature.icon)}
              </div>
              <h3 className="why-card-title">{feature.title}</h3>
              <p className="why-card-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
