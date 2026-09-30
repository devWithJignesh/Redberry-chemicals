import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../../../context/AdminDataContext';

export default function ReviewList() {
  const { reviews, deleteReview } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [rateFilter, setRateFilter] = useState('ALL');
  const [inlineDeleteId, setInlineDeleteId] = useState(null);

  const filteredReviews = reviews.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRate =
      rateFilter === 'ALL' || Math.floor(Number(item.rate)) === Number(rateFilter);

    return matchesSearch && matchesRate;
  });

  const handleInlineDeleteConfirm = (id) => {
    deleteReview(id);
    setInlineDeleteId(null);
  };

  return (
    <div className="admin-review-list-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">CUSTOMER REVIEW MANAGEMENT</h1>
          <p className="admin-page-subtitle">
            Manage farmer testimonials, verification status, ratings, and feedback
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/reviews/add" className="btn-admin-primary">
            <span>➕</span> ADD CUSTOMER REVIEW
          </Link>
        </div>
      </div>

      {inlineDeleteId && (
        <div className="admin-inline-delete-box">
          <div className="admin-inline-delete-text">
            <span>⚠️</span>
            <span>
              Are you sure you want to delete review by "
              <strong>{reviews.find((r) => r.id === inlineDeleteId)?.name}</strong>"?
            </span>
          </div>
          <div className="admin-inline-delete-actions">
            <button
              type="button"
              className="btn-admin-danger"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
              onClick={() => handleInlineDeleteConfirm(inlineDeleteId)}
            >
              CONFIRM DELETE
            </button>
            <button
              type="button"
              className="btn-admin-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
              onClick={() => setInlineDeleteId(null)}
            >
              CANCEL
            </button>
          </div>
        </div>
      )}

      <div className="admin-card-container">
        <div className="admin-card-header-bar">
          <div className="admin-table-filters">
            <div className="admin-search-input-wrap">
              <span className="admin-search-icon">🔍</span>
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search reviews by name, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="admin-select-filter"
              value={rateFilter}
              onChange={(e) => setRateFilter(e.target.value)}
            >
              <option value="ALL">ALL RATINGS</option>
              <option value="5">5 STARS (★★★★★)</option>
              <option value="4">4 STARS (★★★★☆)</option>
              <option value="3">3 STARS (★★★☆☆)</option>
            </select>
          </div>

          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--admin-text-muted)' }}>
            SHOWING {filteredReviews.length} OF {reviews.length} REVIEWS
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>FARMER / DEALER</th>
                <th>LOCATION & ROLE</th>
                <th>RATING</th>
                <th>REVIEW HEADLINE</th>
                <th>VERIFIED</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--admin-text-muted)' }}>
                    No customer reviews found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredReviews.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="admin-table-item-cell">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'}
                          alt={item.name}
                          className="admin-table-thumb"
                          style={{ borderRadius: '50%' }}
                        />
                        <div>
                          <span className="admin-table-item-name">{item.name}</span>
                          <span className="admin-table-item-sub">{item.cropOrCategory || 'Agri Grower'}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: 'var(--admin-text-main)' }}>{item.location}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>{item.role}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ color: '#eab308', fontWeight: 800, fontSize: '0.95rem' }}>
                        {'★'.repeat(Math.round(item.rate))}
                        <span style={{ color: '#cbd5e1' }}>{'★'.repeat(5 - Math.round(item.rate))}</span>
                      </span>
                    </td>
                    <td style={{ maxWidth: '240px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.84rem', display: 'block' }}>
                        {item.title}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>
                        {item.description ? item.description.slice(0, 45) + '...' : ''}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${item.verified ? 'active' : 'pending'}`}>
                        {item.verified ? '✓ VERIFIED' : 'PENDING'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <Link
                          to={`/admin/reviews/edit/${item.id}`}
                          className="btn-table-action edit"
                          title="Edit review"
                        >
                          ✏️ EDIT
                        </Link>
                        <Link
                          to={`/admin/reviews/delete/${item.id}`}
                          className="btn-table-action delete"
                          title="Open dedicated delete page"
                        >
                          🗑️ DELETE
                        </Link>
                        <button
                          type="button"
                          className="btn-table-action delete"
                          style={{ background: '#fef2f2' }}
                          onClick={() => setInlineDeleteId(item.id)}
                          title="Inline delete"
                        >
                          ⚡ QUICK
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
