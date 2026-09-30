import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminData } from '../../../context/AdminDataContext';

export default function InquiryDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getInquiryById, deleteInquiry } = useAdminData();

  const inquiry = getInquiryById(id);

  useEffect(() => {
    if (!inquiry) {
      navigate('/admin/inquiries');
    }
  }, [inquiry, navigate]);

  if (!inquiry) return null;

  const handleConfirmDelete = () => {
    deleteInquiry(id);
    navigate('/admin/inquiries');
  };

  return (
    <div className="admin-delete-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">DELETE INQUIRY CONFIRMATION</h1>
          <p className="admin-page-subtitle">
            Page-based verification to delete lead / message record
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/inquiries" className="btn-admin-secondary">
            &larr; BACK TO INQUIRIES
          </Link>
        </div>
      </div>

      <div className="admin-delete-page-card">
        <div className="admin-delete-card-header">
          <div className="admin-delete-icon-wrap">⚠️</div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#991b1b', fontWeight: 800, textTransform: 'uppercase' }}>
              Confirm Inquiry Deletion
            </h2>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#7f1d1d' }}>
              You are about to delete an inquiry and its historical communication logs.
            </p>
          </div>
        </div>

        <div className="admin-delete-card-body">
          <p style={{ fontSize: '0.9rem', color: 'var(--admin-text-main)', marginTop: 0 }}>
            Verify the inquiry details before confirming:
          </p>

          <div className="admin-delete-item-preview">
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Client Name:</span>
              <span className="admin-delete-preview-value">{inquiry.name}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Email / Contact:</span>
              <span className="admin-delete-preview-value">
                {inquiry.email} {inquiry.phone ? `(${inquiry.phone})` : ''}
              </span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Subject:</span>
              <span className="admin-delete-preview-value">{inquiry.subject}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Date Received:</span>
              <span className="admin-delete-preview-value">{inquiry.date}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Status / Priority:</span>
              <span className="admin-delete-preview-value">
                {inquiry.status} &bull; {inquiry.priority}
              </span>
            </div>
          </div>

          <div className="admin-alert-banner error" style={{ margin: '1.25rem 0' }}>
            <span>🚫</span>
            <div>
              <strong>Action Notice:</strong> Deleting this inquiry will remove it from the pipeline permanently.
            </div>
          </div>

          <div className="admin-form-footer" style={{ borderTop: 'none', padding: 0 }}>
            <Link to="/admin/inquiries" className="btn-admin-secondary">
              CANCEL & KEEP INQUIRY
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
