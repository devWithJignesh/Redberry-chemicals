import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Star, Filter } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';

export default function ReviewList() {
  const { reviews } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [rateFilter, setRateFilter] = useState('ALL');

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

  return (
    <div className="admin-review-list-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">Customer Review Management</h1>
          <p className="admin-page-subtitle">
            Manage farmer testimonials, verification status, ratings, and published feedback
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/reviews/add" className="btn-admin-primary">
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Customer Review</span>
          </Link>
        </div>
      </div>

      <div className="admin-card-container">
        <div className="admin-card-header-bar">
          <div className="admin-table-filters">
            <div className="admin-search-input-wrap">
              <Search size={15} className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search reviews by name, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="admin-select-wrap">
              <Filter size={14} className="admin-filter-icon" />
              <select
                className="admin-select-filter"
                value={rateFilter}
                onChange={(e) => setRateFilter(e.target.value)}
              >
                <option value="ALL">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
              </select>
            </div>
          </div>

          <div className="admin-table-counter">
            Showing <strong>{filteredReviews.length}</strong> of {reviews.length} reviews
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Reviewer & Role</th>
                <th style={{ width: '18%' }}>Rating</th>
                <th style={{ width: '26%' }}>Headline & Feedback</th>
                <th style={{ width: '14%' }}>Status</th>
                <th style={{ width: '14%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-table-empty">
                    <p className="admin-table-empty-title">No reviews found</p>
                    <p className="admin-table-empty-sub">
                      Try adjusting your search query or rating filter.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredReviews.map((item) => {
                  const isActive = item.status?.toLowerCase() === 'active';
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="admin-table-item-cell">
                          <img
                            src={item.image || '/images/reviews/farmer_1.png'}
                            alt={item.name}
                            className="admin-table-thumb"
                            style={{ borderRadius: '50%' }}
                            onError={(e) => {
                              e.target.src = '/images/reviews/farmer_1.png';
                            }}
                          />
                          <div className="admin-table-item-info">
                            <span className="admin-table-item-name">{item.name}</span>
                            <span className="admin-table-item-sub">
                              {item.role || 'Farmer'} • {item.location || 'India'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#eab308' }}>
                          <Star size={14} fill="#eab308" />
                          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#334155' }}>
                            {Number(item.rate || 5).toFixed(1)} / 5.0
                          </span>
                        </div>
                      </td>
                      <td>
                        <div style={{ maxWidth: '320px' }}>
                          <strong style={{ display: 'block', fontSize: '0.84rem', color: '#1e293b' }}>
                            {item.title}
                          </strong>
                          <span className="admin-table-item-sub" style={{ marginTop: '0.15rem' }}>
                            {item.review ? item.review.slice(0, 60) + '...' : 'No feedback content'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`admin-badge-status ${isActive ? 'active' : 'inactive'}`}>
                          <span className="status-dot"></span>
                          {item.status || 'Active'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="admin-table-actions">
                          <Link
                            to={`/admin/reviews/edit/${item.id}`}
                            className="btn-table-action edit"
                            title="Edit review"
                          >
                            <Pencil size={13} strokeWidth={2} />
                            <span>Edit</span>
                          </Link>
                          <Link
                            to={`/admin/reviews/delete/${item.id}`}
                            className="btn-table-action delete"
                            title="Delete review"
                          >
                            <Trash2 size={13} strokeWidth={2} />
                            <span>Delete</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
