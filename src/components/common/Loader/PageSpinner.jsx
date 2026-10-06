/* ============================================
   PAGE SPINNER / FULL PAGE LOADER COMPONENT
   FILE: src/components/common/Loader/PageSpinner.jsx
   Clean, Modern, Universal Full-Page Spinner
   ============================================ */

import { Leaf } from 'lucide-react';
import './PageSpinner.css';

export function PageSpinner({
  title = 'Loading...',
  subtitle = 'Fetching specifications and formulation details...',
  fullPage = true,
}) {
  return (
    <div
      className={`page-spinner-overlay ${fullPage ? 'is-full-page' : 'is-inline'}`}
      role="status"
      aria-label="Loading page content"
    >
      <div className="page-spinner-card">
        {/* Glow & Dual Ring Spinner */}
        <div className="spinner-animation-box">
          <div className="spinner-glow-ring" />
          <div className="spinner-outer-ring" />
          <div className="spinner-inner-ring" />
          <div className="spinner-center-icon">
            <Leaf size={22} className="spinner-leaf-icon" />
          </div>
        </div>

        {/* Text Content */}
        <div className="spinner-text-box">
          <h3 className="spinner-heading">{title}</h3>
          {subtitle && <p className="spinner-subtext">{subtitle}</p>}
        </div>

        {/* Animated Progress Bar Indicator */}
        <div className="spinner-progress-track">
          <div className="spinner-progress-bar" />
        </div>
      </div>
    </div>
  );
}

export default PageSpinner;
