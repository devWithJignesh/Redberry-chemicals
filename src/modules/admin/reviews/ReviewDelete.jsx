import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminData } from '../../../context/AdminDataContext';

export default function ReviewDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getReviewById, deleteReview } = useAdminData();

  const review = getReviewById(id);

  useEffect(() => {
    if (!review) {
      navigate('/admin/reviews');
    }
  }, [review, navigate]);

  if (!review) return null;

  const handleConfirmDelete = () => {
    deleteReview(id);
    navigate('/admin/reviews');
  };

  return (
    <div className="admin-delete-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">DELETE CUSTOMER REVIEW CONFIRMATION</h1>
          <p className="admin-page-subtitle">
            Page-based verification to delete testimonial record
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/reviews" className="btn-admin-secondary">
            &larr; BACK TO REVIEWS
          </Link>
        </div>
      </div>

      <div className="admin-delete-page-card">
        <div className="admin-delete-card-header">
          <div className="admin-delete-icon-wrap">⚠️</div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#991b1b', fontWeight: 800, textTransform: 'uppercase' }}>
              Confirm Review Deletion
            </h2>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#7f1d1d' }}>
              You are about to delete a farmer/dealer testimonial record.
            </p>
          </div>
        </div>

        <div className="admin-delete-card-body">
          <p style={{ fontSize: '0.9rem', color: 'var(--admin-text-main)', marginTop: 0 }}>
            Review the testimonial details before confirming:
          </p>

          <div className="admin-delete-item-preview">
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Reviewer Name:</span>
              <span className="admin-delete-preview-value">{review.name}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Location:</span>
              <span className="admin-delete-preview-value">{review.location}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Rating:</span>
              <span className="admin-delete-preview-value" style={{ color: '#eab308' }}>
                {'★'.repeat(Math.round(review.rate))} ({review.rate}/5)
              </span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Headline:</span>
              <span className="admin-delete-preview-value" style={{ maxWidth: '350px' }}>
                {review.title}
              </span>
            </div>
          </div>

          <div className="admin-alert-banner error" style={{ margin: '1.25rem 0' }}>
            <span>🚫</span>
            <div>
              <strong>Action Confirmation:</strong> Removing this review will update the live average rating and public feedback feed.
            </div>
          </div>

          <div className="admin-form-footer" style={{ borderTop: 'none', padding: 0 }}>
            <Link to="/admin/reviews" className="btn-admin-secondary">
              CANCEL & KEEP RECORD
            </Link>
            <button
              type="button"
              className="btn-admin-danger"
              onClick={handleConfirmDelete}
            >
              🗑️ CONFIRM PERMANENT DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
