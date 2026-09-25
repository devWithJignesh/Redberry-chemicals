import { Link } from 'react-router-dom';
import { COMPANY } from '../../../../data/company';
import { NAV_LINKS, PRODUCT_CATEGORIES, SOCIAL_LINKS } from '../../../../utils/constants';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img
                src="/images/logo/logo-icon.png"
                alt="Redberry Logo"
                className="footer-logo-img"
              />
              <div className="footer-brand-title">
                Redberry <span>Agri</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Pioneering high-potency agrochemical formulations, crop nutrition, and sustainable farm protection since {COMPANY.foundedYear}. Rooted in science, growing farmer trust.
            </p>
            <div className="footer-social-links">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label={item.name}
                >
                  {item.name === 'WhatsApp' ? '💬' : item.name === 'LinkedIn' ? '💼' : item.name === 'Facebook' ? '🌐' : '📷'}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Products</h4>
            <ul className="footer-links-list">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/products/${cat.id}`} className="footer-link">
                    → {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details from COMPANY */}
          <div className="footer-contact-col">
            <h4 className="footer-heading">Headquarters</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📍</span>
                <span>{COMPANY.address}</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📞</span>
                <a href={COMPANY.phoneHref} className="footer-contact-link">
                  +91 {COMPANY.phone}
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">✉</span>
                <a href={`mailto:${COMPANY.email}`} className="footer-contact-link">
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {currentYear} {COMPANY.name}. All Rights Reserved.
          </div>
          <div className="footer-bottom-links">
            <span>CIB & RC Regulated</span>
            <span>•</span>
            <span>ISO Quality Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
