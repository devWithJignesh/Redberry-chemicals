import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Trash2, ShieldAlert } from 'lucide-react';
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
          <h1 className="admin-page-title">Delete Product Confirmation</h1>
          <p className="admin-page-subtitle">
            Permanent catalog deletion verification
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/products" className="btn-admin-secondary">
            <ArrowLeft size={15} />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>

      <div className="admin-delete-page-card">
        {/* Red Warning Banner */}
        <div className="admin-delete-card-header">
          <div className="admin-delete-icon-wrap">
            <AlertTriangle size={24} strokeWidth={2} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#991b1b', fontWeight: 700 }}>
              Confirm Product Deletion
            </h2>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#7f1d1d' }}>
              You are about to permanently delete this product category from the system.
            </p>
          </div>
        </div>

        {/* Details Review */}
        <div className="admin-delete-card-body">
          <p style={{ fontSize: '0.88rem', color: 'var(--admin-text-main)', marginTop: 0, fontWeight: 500 }}>
            Please review the product details below before confirming deletion:
          </p>

          <div className="admin-delete-item-preview">
            <div className="admin-delete-preview-row">
              <span className="admin-delete-preview-label">Product Name:</span>
              <span className="admin-delete-preview-value" style={{ fontWeight: 600 }}>{product.name}</span>
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
            <ShieldAlert size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Irreversible Action:</strong> Once confirmed, this record will be immediately removed from the catalog.
            </div>
          </div>

          <div className="admin-form-footer" style={{ borderTop: 'none', padding: 0, display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <Link to="/admin/products" className="btn-admin-secondary">
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
