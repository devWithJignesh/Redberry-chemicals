import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminData } from '../../../context/AdminDataContext';

export default function SubProductDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSubProductById, deleteSubProduct } = useAdminData();

  const subProduct = getSubProductById(id);

  useEffect(() => {
    if (!subProduct) {
      navigate('/admin/sub-products');
    }
  }, [subProduct, navigate]);

  if (!subProduct) return null;

  const handleConfirmDelete = () => {
    deleteSubProduct(id);
    navigate('/admin/sub-products');
  };

  return (
    <div className="admin-delete-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">DELETE SUB-PRODUCT CONFIRMATION</h1>
          <p className="admin-page-subtitle">
            Page-based confirmation for formulation removal
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/sub-products" className="btn-admin-secondary">
            &larr; BACK TO SUB-PRODUCTS
          </Link>
        </div>
      </div>

      <div className="admin-delete-page-card">
        <div className="admin-delete-card-header">
          <div className="admin-delete-icon-wrap">⚠️</div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#991b1b', fontWeight: 800, textTransform: 'uppercase' }}>
              Confirm Sub-Product Deletion
            </h2>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#7f1d1d' }}>
              You are about to delete an active agrochemical formulation.
            </p>
          </div>
        </div>

        <div className="admin-delete-card-body">
          <p style={{ fontSize: '0.9rem', color: 'var(--admin-text-main)', marginTop: 0 }}>
            Please verify the sub-product formulation specifications before deleting:
          </p>

          <div className="admin-delete-item-preview">
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Trade Name:</span>
              <span className="admin-delete-preview-value">{subProduct.name}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Technical Name:</span>
              <span className="admin-delete-preview-value" style={{ color: 'var(--admin-primary)' }}>
                {subProduct.technicalName}
              </span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Formulation Type:</span>
              <span className="admin-delete-preview-value">{subProduct.formulation}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Chemical Group:</span>
              <span className="admin-delete-preview-value">{subProduct.chemicalGroup || 'N/A'}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Target Pests:</span>
              <span className="admin-delete-preview-value" style={{ maxWidth: '350px' }}>
                {subProduct.targetPests || 'N/A'}
              </span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Standard Dosage:</span>
              <span className="admin-delete-preview-value">{subProduct.dosage || 'N/A'}</span>
            </div>
          </div>

          <div className="admin-alert-banner error" style={{ margin: '1.25rem 0' }}>
            <span>🚫</span>
            <div>
              <strong>Action Confirmation:</strong> This formulation will be removed from the active catalog immediately.
            </div>
          </div>

          <div className="admin-form-footer" style={{ borderTop: 'none', padding: 0 }}>
            <Link to="/admin/sub-products" className="btn-admin-secondary">
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
