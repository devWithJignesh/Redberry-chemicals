import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, PRODUCT_CATEGORIES } from '../../../../utils/constants';
import { COMPANY } from '../../../../data/company';
import { useAuth } from '../../../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isSuperAdmin } = useAuth();

  const [prevKey, setPrevKey] = useState(location.key);
  if (location.key !== prevKey) {
    setPrevKey(location.key);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = (e) => {
    if (e) e.stopPropagation();
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getNavIcon = (path) => {
    switch (path) {
      case '/':
        return '🌱';
      case '/about':
        return '🏢';
      case '/products':
        return '🌿';
      case '/contact':
        return '📞';
      default:
        return '📄';
    }
  };

  const mobileDrawerContent = (
    <div className={`mobile-nav-portal ${isMobileMenuOpen ? 'open' : ''}`}>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Sidebar Navigation Drawer */}
      <aside
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation Sidebar"
        aria-modal="true"
        role="dialog"
      >
        {/* Drawer Header with Logo & Close Button */}
        <div className="drawer-header">
          <Link to="/" className="drawer-brand" onClick={closeMobileMenu}>
            <img
              src="/images/logo/logo-icon.png"
              alt="Redberry Logo"
              className="drawer-logo-img"
            />
            <div className="drawer-brand-text">
              <span className="drawer-brand-title">Redberry Agri</span>
              <span className="drawer-brand-tag">Sciences Pvt Ltd</span>
            </div>
          </Link>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={closeMobileMenu}
            aria-label="Close navigation sidebar"
          >
            ✕
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="drawer-body">
          <div className="drawer-section-label">Navigation</div>
          
          {/* Main Links */}
          <div className="mobile-nav-links">
            {NAV_LINKS.map((link, index) => (
              <div
                key={link.path}
                className="mobile-nav-item"
                style={{ '--item-delay': `${index * 60 + 50}ms` }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeMobileMenu}
                  end={link.path === '/'}
                >
                  <div className="mobile-nav-left">
                    <span className="mobile-nav-icon">{getNavIcon(link.path)}</span>
                    <span className="mobile-nav-label">{link.label}</span>
                  </div>
                  <span className="mobile-nav-arrow">→</span>
                </NavLink>

                {/* Sub-categories for Products */}
                {link.path === '/products' && (
                  <div className="mobile-subcategories">
                    <span className="mobile-subcategories-title">Quick Categories:</span>
                    <div className="mobile-subcategories-grid">
                      {PRODUCT_CATEGORIES.map((category) => (
                        <Link
                          key={category.id}
                          to={`/products/${category.id}`}
                          className="mobile-subcategory-chip"
                          onClick={closeMobileMenu}
                        >
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Admin Link */}
            <div className="mobile-nav-item" style={{ '--item-delay': '320ms' }}>
              <Link
                to={isAuthenticated && isSuperAdmin ? '/admin/dashboard' : '/admin/login'}
                className="mobile-nav-link"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 81, 50, 0.08) 0%, rgba(234, 179, 8, 0.1) 100%)',
                  border: '1px solid rgba(15, 81, 50, 0.2)',
                }}
                onClick={closeMobileMenu}
              >
                <div className="mobile-nav-left">
                  <span className="mobile-nav-icon">🛡️</span>
                  <span className="mobile-nav-label" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                    {isAuthenticated && isSuperAdmin ? 'SUPERADMIN PANEL' : 'ADMIN LOGIN'}
                  </span>
                </div>
                <span className="mobile-nav-arrow">→</span>
              </Link>
            </div>
          </div>

          {/* Quick Contact Box */}
          <div className="drawer-contact-card">
            <span className="drawer-contact-badge">📞 Farmer & Dealer Support</span>
            <a href={COMPANY.phoneHref} className="drawer-contact-phone">
              +91 {COMPANY.phone}
            </a>
            <span className="drawer-contact-email">✉️ {COMPANY.email}</span>
            <span className="drawer-contact-loc">📍 Anand, Gujarat, India</span>
          </div>
        </div>

        {/* Drawer Bottom CTA */}
        <div className="drawer-footer">
          <Link
            to="/contact"
            className="btn btn-primary drawer-cta-btn"
            onClick={closeMobileMenu}
          >
            Get In Touch 🚀
          </Link>
        </div>
      </aside>
    </div>
  );

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

        {/* Action Button & Header Login Button */}
        <div className="nav-actions">
          <Link to="/contact" className="btn btn-primary">
            Get in Touch
          </Link>

          {/* Header Login / Admin Button positioned at rightmost last */}
          <Link
            to={isAuthenticated && isSuperAdmin ? '/admin/dashboard' : '/admin/login'}
            className="btn-header-login"
            title={isAuthenticated && isSuperAdmin ? 'Access SuperAdmin Panel' : 'Login to Admin Panel'}
          >
            <span className="login-icon">🛡️</span>
            <span>{isAuthenticated && isSuperAdmin ? 'ADMIN PANEL' : 'LOGIN'}</span>
          </Link>

          <button
            type="button"
            className={`mobile-toggle-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
          </button>
        </div>
      </div>

      {/* Render Mobile Sidebar in body via Portal for 100% viewport freedom */}
      {typeof document !== 'undefined' && createPortal(mobileDrawerContent, document.body)}
    </nav>
  );
}
