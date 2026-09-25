import { useOnScreen } from '../../../../../hooks/useOnScreen';
import './CompanyStory.css';

export default function CompanyStory({ data }) {
  const { badge, heading, title, body, paragraphs, milestones, image } = data;
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });

  const displayTitle = heading || title;
  const rawParagraphs = body || paragraphs || [];
  const displayParagraphs = Array.isArray(rawParagraphs) ? rawParagraphs : [rawParagraphs];

  return (
    <section
      ref={ref}
      className={`section-padding company-story-section reveal-hidden ${
        isVisible ? 'reveal-visible' : ''
      }`}
      aria-label="Company Story and History"
    >
      <div className="container">
        {/* Main Story Split */}
        <div className="story-grid">
          <div className="story-content">
            <span className="story-badge">{badge || 'About Redberry'}</span>
            <h1 className="story-title">{displayTitle}</h1>
            <div className="story-text-list">
              {displayParagraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>

          <div className="story-image-wrap">
            <img
              src={image}
              alt="Redberry Farmland Operations"
              className="story-image"
            />
          </div>
        </div>

        {/* Milestones Journey */}
        {milestones && milestones.length > 0 && (
          <div className="story-milestones-wrap">
            <h3 className="milestones-title">Key Organizational Milestones</h3>
            <div className="milestones-grid">
              {milestones.map((m, idx) => (
                <div
                  key={m.year}
                  className={`milestone-card reveal-hidden ${
                    isVisible ? `reveal-visible reveal-delay-${idx + 1}` : ''
                  }`}
                >
                  <div className="milestone-year">{m.year}</div>
                  <h4 className="milestone-card-title">{m.title}</h4>
                  <p className="milestone-desc">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
