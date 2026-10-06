import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Trash2, ShieldAlert, Star } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { getReviewByIdApi } from '../../../api/reviewApi';

export default function ReviewDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getReviewById, deleteReview } = useAdminData();
  const [review, setReview] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReview = async () => {
      setIsLoading(true);
      try {
        const res = await getReviewByIdApi(id);
        if (res && res.success && res.data) {
          setReview(res.data);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('API error fetching review for delete:', err);
      }

      const existing = getReviewById(id);
      if (existing) {
        setReview(existing);
      } else {
        navigate('/admin/reviews');
      }
      setIsLoading(false);
    };

    loadReview();
  }, [id, getReviewById, navigate]);

  if (isLoading) {
    return (
      <div className="admin-delete-page" style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#52635C' }}>Loading review details...</p>
      </div>
    );
  }

  if (!review) return null;

  const handleConfirmDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteReview(id);
      navigate('/admin/reviews');
    } catch (err) {
      console.warn('Error deleting review:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="admin-delete-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">Delete Customer Review Confirmation</h1>
          <p className="admin-page-subtitle">
            Permanent review deletion verification
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
            <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#DC2626', fontWeight: 700 }}>
              Confirm Review Deletion
            </h2>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#7A8983' }}>
              You are about to delete a customer review record.
            </p>
          </div>
        </div>

        <div className="admin-delete-card-body">
          <p style={{ fontSize: '0.88rem', color: 'var(--admin-text-main)', marginTop: 0, fontWeight: 500 }}>
            Review the customer details before confirming:
          </p>

          <div className="admin-delete-item-preview">
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Name:</span>
              <span className="admin-delete-preview-value" style={{ fontWeight: 600 }}>{review.name}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Address:</span>
              <span className="admin-delete-preview-value">{review.address || review.location}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Rating:</span>
              <span className="admin-delete-preview-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#D97706' }}>
                <Star size={14} fill="#D97706" />
                <strong style={{ color: '#52635C' }}>{review.rate} / 5.0</strong>
              </span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Description:</span>
              <span className="admin-delete-preview-value" style={{ maxWidth: '350px' }}>
                {review.description || review.review || review.title}
              </span>
            </div>
          </div>

          <div className="admin-alert-banner error" style={{ margin: '1.25rem 0' }}>
            <ShieldAlert size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Action Confirmation:</strong> This review will be permanently deleted from the database.
            </div>
          </div>

          <div className="admin-form-footer" style={{ borderTop: 'none', padding: 0, display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <Link to="/admin/reviews" className="btn-admin-secondary">
              Cancel & Keep Record
            </Link>
            <button
              type="button"
              className="btn-admin-danger"
              disabled={isDeleting}
              onClick={handleConfirmDelete}
            >
              <Trash2 size={15} />
              <span>{isDeleting ? 'Deleting...' : 'Confirm Permanent Delete'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
