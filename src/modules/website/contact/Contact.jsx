import { useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import { COMPANY } from '../../../data/company';
import { CONTACT_PAGE_HEADER, CONTACT_CARDS_DATA } from './data';
import { scrollToTop } from '../../../utils/helpers';
import './Contact.css';

export default function Contact() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const getCardIcon = (iconName) => {
    switch (iconName) {
      case 'location':
        return '📍';
      case 'phone':
        return '📞';
      case 'email':
        return '✉️';
      default:
        return '💬';
    }
  };

  // Encoded address for Google Maps embed
  const encodedAddress = encodeURIComponent(
    "Aviskar Complex, Near Grid, Anand, Gujarat 388001"
  );
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="contact-page">
      {/* Page Header */}
      <section
        className="section-padding-sm"
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-badge">{CONTACT_PAGE_HEADER.badge}</span>
            <h1 className="section-title">{CONTACT_PAGE_HEADER.title}</h1>
            <p className="section-description">{CONTACT_PAGE_HEADER.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Main Contact Split & Cards */}
      <section
        className="section-padding"
        style={{ backgroundColor: 'var(--color-bg-main)' }}
      >
        <div className="container">
          {/* Quick Contact Cards */}
          <div className="contact-cards-grid">
            {CONTACT_CARDS_DATA.map((card) => (
              <div key={card.id} className="contact-card-item">
                <div>
                  <div className="contact-card-icon-wrap">
                    {getCardIcon(card.icon)}
                  </div>
                  <h3 className="contact-card-title">
                    {card.title}
                  </h3>
                  <p className="contact-card-desc">
                    {card.description}
                  </p>
                  {card.subtext && (
                    <span className="contact-card-subtext">
                      {card.subtext}
                    </span>
                  )}
                </div>

                <div className="contact-card-action">
                  <a
                    href={card.actionHref}
                    target={card.id === 'headquarters' ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                  >
                    {card.actionLabel} →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Form and Map Grid */}
          <div className="contact-main-grid">
            {/* Left: Contact Form */}
            <ContactForm />

            {/* Right: Embedded Google Map and Direct Phone Action */}
            <div className="contact-side-panel">
              <div className="contact-map-card">
                <div className="contact-map-header">
                  <h3 className="contact-map-title">
                    Locate Our Corporate Office
                  </h3>
                  <p className="contact-map-address">
                    {COMPANY.address}
                  </p>
                </div>
                <iframe
                  title="Redberry Corporate Location"
                  src={mapEmbedUrl}
                  className="contact-map-iframe"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Call Hotline Banner */}
              <div className="contact-hotline-banner">
                <div>
                  <h4 className="contact-hotline-title">
                    Need Immediate Agronomy Advice?
                  </h4>
                  <p className="contact-hotline-text">
                    Speak directly with our technical lead at {COMPANY.phone}
                  </p>
                </div>
                <a href={COMPANY.phoneHref} className="btn btn-accent">
                  Call Now 📞
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

