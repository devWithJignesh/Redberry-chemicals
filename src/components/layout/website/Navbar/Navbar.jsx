import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS } from '../../../../utils/constants';
import './Navbar.css';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo-link" onClick={closeMobileMenu}>
          <img
            src="/images/logo/logo-icon.png"
            alt="Redberry Logo"
            className="brand-logo-img"
          />
          <div className="brand-title-wrap">
            <span className="brand-name">
              Redberry <span>Agri</span>
            </span>
            <span className="brand-subtitle">Sciences Pvt Ltd</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="nav-menu">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `nav-item-link ${isActive ? 'active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Action Button & Mobile Hamburger */}
        <div className="nav-actions">
          <Link to="/contact" className="btn btn-primary">
            Get in Touch
          </Link>
          <button
            type="button"
            className={`mobile-toggle-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      <div
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={closeMobileMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <Link
          to="/contact"
          className="btn btn-primary"
          style={{ width: '100%' }}
          onClick={closeMobileMenu}
        >
          Get in Touch
        </Link>
      </div>
    </nav>
  );
}
