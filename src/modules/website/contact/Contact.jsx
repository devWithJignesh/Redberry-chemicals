import { useEffect } from 'react';
import PageHeroBanner from '../../../components/PageHeroBanner/PageHeroBanner';
import ContactForm from './components/ContactForm/ContactForm';
import VideoShowcase from '../../../components/common/VideoShowcase/VideoShowcase';
import { COMPANY } from '../../../data/company';
import { CONTACT_PAGE_HEADER, CONTACT_CARDS_DATA } from './data';
import { PAGE_VIDEOS } from '../../../data/videos';
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
      {/* Video Page Hero Header */}
      <PageHeroBanner
        badge={CONTACT_PAGE_HEADER.badge || "GET IN TOUCH"}
        title={CONTACT_PAGE_HEADER.title || "Partner With Redberry Agri Sciences"}
        subtitle={CONTACT_PAGE_HEADER.subtitle || "Have questions about our crop protection products or distribution network? Our technical agronomy team is here to assist."}
        videoSrc={PAGE_VIDEOS.contact.heroVideo}
        imageSrc={PAGE_VIDEOS.contact.heroPoster}
        breadcrumbs={[{ label: 'Contact Us' }]}
        primaryCta={{ label: `Call Hotline (${COMPANY.phone})`, href: COMPANY.phoneHref }}
        secondaryCta={{ label: 'Explore Products', href: '/products' }}
      />

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

      {/* Video Hotline Showcase */}
      <VideoShowcase
        badge="Direct Dealer & Distributor Inquiry"
        title="Join Our 500+ Dealer Network Across India"
        subtitle="Watch how Redberry builds long-term partnerships with agrochemical dealers, providing high-margin formulations, field support, and marketing collateral."
        videoSrc={PAGE_VIDEOS.contact.showcaseVideo}
        posterImage={PAGE_VIDEOS.contact.showcasePoster}
        ctaText="Call Support Now"
        ctaLink={COMPANY.phoneHref}
        contactLink="/products"
      />
    </div>
  );
}
