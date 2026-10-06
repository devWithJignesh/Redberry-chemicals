import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Trash2, ShieldAlert } from 'lucide-react';
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

  const packagingDisplay = Array.isArray(subProduct.packagingSizes)
    ? subProduct.packagingSizes.join(', ')
    : subProduct.packSizes || subProduct.packagingSizes || 'Standard packaging';

  return (
    <div className="admin-delete-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">Delete Sub-Product Confirmation</h1>
          <p className="admin-page-subtitle">
            Permanent formulation removal verification
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/sub-products" className="btn-admin-secondary">
            <ArrowLeft size={15} />
            <span>Back to Sub-Products</span>
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
              Confirm Sub-Product Deletion
            </h2>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#7f1d1d' }}>
              You are about to delete an active commercial formulation.
            </p>
          </div>
        </div>

        <div className="admin-delete-card-body">
          <p style={{ fontSize: '0.88rem', color: 'var(--admin-text-main)', marginTop: 0, fontWeight: 500 }}>
            Please verify the sub-product specifications before confirming deletion:
          </p>

          <div className="admin-delete-item-preview">
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Brand / Trade Name:</span>
              <span className="admin-delete-preview-value" style={{ fontWeight: 600 }}>{subProduct.name}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Parent Product:</span>
              <span className="admin-delete-preview-value" style={{ color: 'var(--admin-primary)', fontWeight: 600 }}>
                {subProduct.parentProductName || subProduct.category || 'Agro Chemicals'}
              </span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Dosage & Dilution:</span>
              <span className="admin-delete-preview-value">{subProduct.dosage || 'N/A'}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Packaging Sizes:</span>
              <span className="admin-delete-preview-value">{packagingDisplay}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Short Summary:</span>
              <span className="admin-delete-preview-value" style={{ maxWidth: '350px' }}>
                {subProduct.shortDescription || 'Commercial formulation'}
              </span>
            </div>
          </div>

          <div className="admin-alert-banner error" style={{ margin: '1.25rem 0' }}>
            <ShieldAlert size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Action Confirmation:</strong> This sub-product will be removed from the catalog immediately.
            </div>
          </div>

          <div className="admin-form-footer" style={{ borderTop: 'none', padding: 0, display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <Link to="/admin/sub-products" className="btn-admin-secondary">
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
