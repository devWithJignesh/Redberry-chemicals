/* ============================================
   PAGE SPINNER / FULL PAGE LOADER COMPONENT
   FILE: src/components/common/Loader/PageSpinner.jsx
   Clean, Minimalist Loader Animation
   ============================================ */

import { Leaf } from 'lucide-react';
import './PageSpinner.css';

export function PageSpinner({
  fullPage = true,
}) {
  return (
    <div
      className={`page-spinner-overlay ${fullPage ? 'is-full-page' : 'is-inline'}`}
      role="status"
      aria-label="Loading..."
    >
      {/* Glow & Dual Ring Spinner Animation Only */}
      <div className="spinner-animation-box">
        <div className="spinner-glow-ring" />
        <div className="spinner-outer-ring" />
        <div className="spinner-inner-ring" />
        <div className="spinner-center-icon">
          <Leaf size={24} className="spinner-leaf-icon" />
        </div>
      </div>
    </div>
  );
}

export default PageSpinner;
