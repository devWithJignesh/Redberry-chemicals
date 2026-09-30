import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminData } from '../../../context/AdminDataContext';

export default function ProductDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, deleteProduct } = useAdminData();

  const product = getProductById(id);

  useEffect(() => {
    if (!product) {
      navigate('/admin/products');
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleConfirmDelete = () => {
    deleteProduct(id);
    navigate('/admin/products');
  };

  return (
    <div className="admin-delete-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">DELETE PRODUCT CONFIRMATION</h1>
          <p className="admin-page-subtitle">
            Page-based verification to ensure safe catalog deletion
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/products" className="btn-admin-secondary">
            &larr; BACK TO PRODUCTS
          </Link>
        </div>
      </div>

      <div className="admin-delete-page-card">
        {/* Red Warning Banner */}
        <div className="admin-delete-card-header">
          <div className="admin-delete-icon-wrap">⚠️</div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#991b1b', fontWeight: 800, textTransform: 'uppercase' }}>
              Confirm Product Deletion
            </h2>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#7f1d1d' }}>
              You are about to permanently delete this product category from the system.
            </p>
          </div>
        </div>

        {/* Details Review */}
        <div className="admin-delete-card-body">
          <p style={{ fontSize: '0.9rem', color: 'var(--admin-text-main)', marginTop: 0 }}>
            Please review the product details below before confirming deletion:
          </p>

          <div className="admin-delete-item-preview">
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Product Name:</span>
              <span className="admin-delete-preview-value">{product.name}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Category:</span>
              <span className="admin-delete-preview-value">{product.category}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Status:</span>
              <span className="admin-delete-preview-value">{product.status || 'Active'}</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Features Count:</span>
              <span className="admin-delete-preview-value">{product.features?.length || 0} items</span>
            </div>
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Short Description:</span>
              <span className="admin-delete-preview-value" style={{ maxWidth: '350px' }}>
                {product.shortDescription || 'N/A'}
              </span>
            </div>
          </div>

          <div className="admin-alert-banner error" style={{ margin: '1.25rem 0' }}>
            <span>🚫</span>
            <div>
              <strong>Irreversible Action:</strong> Once confirmed, this record will be immediately removed from the admin catalog and database.
            </div>
          </div>

          <div className="admin-form-footer" style={{ borderTop: 'none', padding: 0 }}>
            <Link to="/admin/products" className="btn-admin-secondary">
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
