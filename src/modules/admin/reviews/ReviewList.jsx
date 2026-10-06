import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Star, Filter, RefreshCw } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { getReviewsApi } from '../../../api/reviewApi';

export default function ReviewList() {
  const { reviews: contextReviews } = useAdminData();
  const [apiReviews, setApiReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [rateFilter, setRateFilter] = useState('ALL');

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getReviewsApi();
      if (res && res.success && Array.isArray(res.data)) {
        setApiReviews(res.data);
      } else {
        setApiReviews(contextReviews || []);
      }
    } catch (err) {
      console.warn('Fallback to context reviews:', err);
      setApiReviews(contextReviews || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [contextReviews]);

  const activeReviewsList = apiReviews.length > 0 ? apiReviews : contextReviews;

  const filteredReviews = activeReviewsList.filter((item) => {
    const nameStr = (item.name || '').toLowerCase();
    const addrStr = (item.address || item.location || '').toLowerCase();
    const descStr = (item.description || item.review || item.title || '').toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      nameStr.includes(q) ||
      addrStr.includes(q) ||
      descStr.includes(q);

    const matchesRate =
      rateFilter === 'ALL' || Math.floor(Number(item.rate || 5)) === Number(rateFilter);

    return matchesSearch && matchesRate;
  });

  return (
    <div className="admin-review-list-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">Customer Review Management</h1>
          <p className="admin-page-subtitle">
            Manage customer feedback, ratings, and profile images
          </p>
        </div>
        <div className="admin-page-actions">
          <button 
            type="button" 
            onClick={fetchReviews} 
            className="btn-admin-secondary"
            title="Refresh reviews"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
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
                placeholder="Search reviews by name, address..."
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
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>

          <div className="admin-table-counter">
            Showing <strong>{filteredReviews.length}</strong> of {activeReviewsList.length} reviews
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Name</th>
                <th style={{ width: '20%' }}>Address</th>
                <th style={{ width: '15%' }}>Rating</th>
                <th style={{ width: '25%' }}>Description</th>
                <th style={{ width: '15%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-table-empty">
                    <p className="admin-table-empty-title">No reviews found</p>
                    <p className="admin-table-empty-sub">
                      {loading ? 'Loading reviews from server...' : 'No customer reviews available in database.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredReviews.map((item) => {
                  const reviewId = item._id || item.id;
                  const feedbackText = item.description || item.review || item.title || '';
                  const addressText = item.address || item.location || 'India';
                  
                  return (
                    <tr key={reviewId}>
                      <td>
                        <div className="admin-table-item-cell">
                          <img
                            src={item.image || '/images/reviews/farmer_1.png'}
                            alt={item.name}
                            className="admin-table-thumb"
                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = '/images/reviews/farmer_1.png';
                            }}
                          />
                          <div className="admin-table-item-info">
                            <span className="admin-table-item-name">
                              {item.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem', color: '#52635C' }}>
                          {addressText}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#D97706' }}>
                          <Star size={14} fill="#D97706" />
                          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#52635C' }}>
                            {Number(item.rate || 5).toFixed(1)} / 5.0
                          </span>
                        </div>
                      </td>
                      <td>
                        <div style={{ maxWidth: '360px' }}>
                          <span className="admin-table-item-sub" style={{ display: 'block', color: '#172B24' }}>
                            {feedbackText.length > 90 ? feedbackText.slice(0, 90) + '...' : feedbackText || 'No description provided'}
                          </span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="admin-table-actions">
                          <Link
                            to={`/admin/reviews/edit/${reviewId}`}
                            className="btn-table-action edit"
                            title="Edit review"
                          >
                            <Pencil size={13} strokeWidth={2} />
                            <span>Edit</span>
                          </Link>
                          <Link
                            to={`/admin/reviews/delete/${reviewId}`}
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
