import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Trash2, ShieldAlert, Star } from 'lucide-react';
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
          <h1 className="admin-page-title">Delete Customer Review Confirmation</h1>
          <p className="admin-page-subtitle">
            Permanent testimonial deletion verification
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/reviews" className="btn-admin-secondary">
            <ArrowLeft size={15} />
            <span>Back to Reviews</span>
          </Link>
        </div>
      </div>

      <div className="admin-delete-page-card">
        <div className="admin-delete-card-header">
          <div className="admin-delete-icon-wrap">
            <AlertTriangle size={24} strokeWidth={2} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#991b1b', fontWeight: 700 }}>
              Confirm Review Deletion
            </h2>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#7f1d1d' }}>
              You are about to delete a customer feedback record.
            </p>
          </div>
        </div>

        <div className="admin-delete-card-body">
          <p style={{ fontSize: '0.88rem', color: 'var(--admin-text-main)', marginTop: 0, fontWeight: 500 }}>
            Review the testimonial details before confirming:
          </p>

          <div className="admin-delete-item-preview">
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Reviewer Name:</span>
              <span className="admin-delete-preview-value" style={{ fontWeight: 600 }}>{review.name}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Location:</span>
              <span className="admin-delete-preview-value">{review.location}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Rating:</span>
              <span className="admin-delete-preview-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#eab308' }}>
                <Star size={14} fill="#eab308" />
                <strong style={{ color: '#334155' }}>{review.rate} / 5.0</strong>
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
            <ShieldAlert size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Action Confirmation:</strong> Removing this review will update the live average rating and public feedback feed.
            </div>
          </div>

          <div className="admin-form-footer" style={{ borderTop: 'none', padding: 0, display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <Link to="/admin/reviews" className="btn-admin-secondary">
              Cancel & Keep Record
            </Link>
            <button
              type="button"
              className="btn-admin-danger"
              onClick={handleConfirmDelete}
            >
              <Trash2 size={15} />
              <span>Confirm Permanent Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
