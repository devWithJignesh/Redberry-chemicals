import './GlobalAdminLoader.css';

export default function GlobalAdminLoader({ message = 'Connecting to Redberry Server...' }) {
  return (
    <div className="admin-global-loader-overlay" role="status" aria-label="Loading">
      <div className="admin-global-loader-card">
        <div className="admin-loader-spinner-wrapper">
          <div className="admin-loader-ring"></div>
          <span className="admin-loader-icon">🌱</span>
        </div>
        <div className="admin-loader-text-group">
          <span className="admin-loader-title">Redberry Admin Engine</span>
          <span className="admin-loader-subtitle">{message}</span>
        </div>
      </div>
    </div>
  );
}
