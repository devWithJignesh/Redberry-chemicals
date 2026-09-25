import { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { COMPANY } from '../../../../data/company';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Informative Top Bar */}
      <div className="header-topbar">
        <div className="container topbar-content">
          <div className="topbar-left">
            <span className="topbar-badge">🌿 CIB Certified Formulations</span>
            <a href={`mailto:${COMPANY.email}`} className="topbar-link">
              ✉ {COMPANY.email}
            </a>
          </div>
          <div className="topbar-right">
            <span>Toll Free / Support:</span>
            <a href={COMPANY.phoneHref} className="topbar-link">
              📞 +91 {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar />
    </header>
  );
}
