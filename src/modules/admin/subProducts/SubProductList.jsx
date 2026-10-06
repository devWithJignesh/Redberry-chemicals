/* ============================================
   SUB-PRODUCT MANAGEMENT LIST COMPONENT
   FILE: src/modules/admin/subProducts/SubProductList.jsx
   Clean, Compact UI with Horizontal Table Scroller & Small Action Buttons
   ============================================ */

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  FlaskConical,
  ChevronLeft,
  ChevronRight,
  X,
  Tag,
  AlertCircle,
  Images,
  Layers
} from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { getSubProductsApi, deleteSubProductApi } from '../../../api/subProductApi';
import { useToast } from '../../../context/ToastContext';

export default function SubProductList() {
  const { subProducts, deleteSubProduct: contextDeleteSubProduct } = useAdminData();
  const { showToast } = useToast();

  const [itemsList, setItemsList] = useState(subProducts || []);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals state
  const [viewingItem, setViewingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch latest subproducts from backend API
  const fetchFreshSubProducts = async () => {
    setIsLoading(true);
    try {
      const res = await getSubProductsApi();
      if (res.success && Array.isArray(res.data)) {
        const formatted = res.data.map((item) => {
          const rawImages = Array.isArray(item.images) && item.images.length > 0
            ? item.images
            : item.image
              ? [item.image]
              : ['/images/products/premium_dummy.jpg'];

          return {
            id: item._id || item.id,
            _id: item._id || item.id,
            name: item.name || '',
            productId: (typeof item.productId === 'object' ? item.productId?._id : item.productId) || item.parentProductId || '',
            parentProductId: item.parentProductId || (typeof item.productId === 'object' ? item.productId?._id : item.productId) || '',
            parentProductName: item.parentProductName || (typeof item.productId === 'object' ? item.productId?.name : '') || 'Agro Chemicals',
            dosage: item.dosage || '',
            packagingSizes: Array.isArray(item.packagingSizes) ? item.packagingSizes : ['100 ml', '250 ml', '500 ml', '1 Litre'],
            packSizes: Array.isArray(item.packagingSizes) ? item.packagingSizes.join(', ') : (item.packSizes || '100 ml, 250 ml, 500 ml'),
            shortDescription: item.shortDescription || '',
            description: item.description || '',
            image: rawImages[0],
            images: rawImages,
            status: item.status || 'Active',
            createdAt: item.createdAt ? item.createdAt.split('T')[0] : '2026-08-20',
          };
        });
        setItemsList(formatted);
      } else if (subProducts) {
        setItemsList(subProducts);
      }
    } catch (err) {
      if (subProducts) setItemsList(subProducts);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFreshSubProducts();
  }, [subProducts]);

  // Filter items
  const filteredSubProducts = useMemo(() => {
    return itemsList.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        (item.dosage && item.dosage.toLowerCase().includes(q)) ||
        (item.shortDescription && item.shortDescription.toLowerCase().includes(q)) ||
        (item.packSizes && item.packSizes.toLowerCase().includes(q)) ||
        (item.parentProductName && item.parentProductName.toLowerCase().includes(q))
      );
    });
  }, [itemsList, searchQuery]);

  // Pagination slice
  const totalPages = Math.ceil(filteredSubProducts.length / itemsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSubProducts.slice(start, start + itemsPerPage);
  }, [filteredSubProducts, currentPage, itemsPerPage]);

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      const targetId = deletingItem._id || deletingItem.id;
      if (/^[0-9a-fA-F]{24}$/.test(targetId)) {
        await deleteSubProductApi(targetId);
      }
      if (contextDeleteSubProduct) {
        await contextDeleteSubProduct(targetId);
      }
      setItemsList((prev) => prev.filter((p) => p.id !== targetId && p._id !== targetId));
      showToast(`"${deletingItem.name}" deleted successfully!`, 'success');
      setDeletingItem(null);
    } catch (err) {
      showToast('Failed to delete sub-product.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="admin-subproduct-list-page">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">Sub-Product Management</h1>
          <p className="admin-page-subtitle">
            Manage commercial formulations, dosage rates, packaging sizes, and multi-image galleries
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/sub-products/add" className="btn-admin-primary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}>
            <Plus size={15} strokeWidth={2.5} />
            <span>Add Sub-Product</span>
          </Link>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="admin-card-container">
        {/* Filters & Search Header */}
        <div className="admin-card-header-bar">
          <div className="admin-table-filters">
            <div className="admin-search-input-wrap" style={{ minWidth: '280px' }}>
              <Search size={14} className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search sub-products by name, dosage, packaging..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: '#7A8983',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 4px',
                  }}
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          <div className="admin-table-counter">
            Showing <strong>{filteredSubProducts.length}</strong> of {itemsList.length} sub-products
          </div>
        </div>

        {/* Scrollable Table Container with Horizontal Scroller */}
        <div className="admin-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="admin-table subproduct-management-table" style={{ minWidth: '980px' }}>
            <thead>
              <tr>
                <th style={{ width: '28%', minWidth: '240px' }}>Sub-Product Item</th>
                <th style={{ width: '18%', minWidth: '160px' }}>Product Name</th>
                <th style={{ width: '18%', minWidth: '150px' }}>Dosage & Dilution</th>
                <th style={{ width: '18%', minWidth: '160px' }}>Packaging Sizes</th>
                <th style={{ width: '10%', minWidth: '120px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#0F6B4F' }}>
                      <FlaskConical size={18} className="animate-spin" />
                      <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Loading Sub-Products...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    <p className="admin-table-empty-title">No sub-products found</p>
                    <p className="admin-table-empty-sub">
                      Try adjusting your search query.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => {
                  const isActive = item.status?.toLowerCase() === 'active';
                  const packArray = Array.isArray(item.packagingSizes) && item.packagingSizes.length > 0 ? item.packagingSizes : (item.packSizes || '').split(',').map((s) => s.trim()).filter(Boolean);
                  const imageCount = Array.isArray(item.images) ? item.images.length : 1;

                  return (
                    <tr key={item.id || item._id}>
                      {/* Sub-Product Item Cell */}
                      <td>
                        <div className="admin-table-item-cell">
                          <div style={{ position: 'relative', flexShrink: 0 }}>
                            <img
                              src={item.image || '/images/products/premium_dummy.jpg'}
                              alt={item.name}
                              className="admin-table-thumb"
                              style={{ width: '38px', height: '38px', borderRadius: '6px' }}
                              onError={(e) => {
                                e.target.src = '/images/products/premium_dummy.jpg';
                              }}
                            />
                            {imageCount > 1 && (
                              <span className="subproduct-image-count-badge" title={`${imageCount} images`}>
                                <Images size={8} style={{ display: 'inline', marginRight: '2px' }} />
                                {imageCount}
                              </span>
                            )}
                          </div>
                          <div className="admin-table-item-info">
                            <span className="admin-table-item-name" style={{ fontWeight: 600, fontSize: '0.84rem', color: '#172B24' }}>
                              {item.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Parent Product Line */}
                      <td>
                        {item.parentProductName || item.category}
                      </td>

                      {/* Dosage */}
                      <td>
                        <span style={{ fontSize: '0.8rem', color: '#52635C', fontWeight: 600 }}>
                          {item.dosage || 'Standard dose'}
                        </span>
                      </td>

                      {/* Packaging Sizes Chips */}
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                          {packArray.slice(0, 2).map((size, sIdx) => (
                            <span key={sIdx} className="subproduct-pack-chip" style={{ fontSize: '0.72rem', padding: '0.15rem 0.4rem' }}>
                              {size}
                            </span>
                          ))}
                          {packArray.length > 2 && (
                            <span className="subproduct-pack-chip more" style={{ fontSize: '0.72rem', padding: '0.15rem 0.4rem' }} title={packArray.slice(2).join(', ')}>
                              +{packArray.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions: Small, sleek buttons */}
                      <td style={{ textAlign: 'right' }}>
                        <div className="admin-table-actions" style={{ justifyContent: 'flex-end', gap: '0.25rem' }}>
                          {/* Quick View Button */}
                          <button
                            type="button"
                            className="btn-table-action"
                            style={{
                              background: '#F7FAF9',
                              color: '#52635C',
                              border: '1px solid #DDE5E1',
                              padding: '0.25rem 0.45rem',
                              fontSize: '0.74rem',
                              gap: '3px',
                            }}
                            title="View Details"
                            onClick={() => setViewingItem(item)}
                          >
                            <Eye size={12} strokeWidth={2} />
                            <span>View</span>
                          </button>

                          {/* Edit Button */}
                          <Link
                            to={`/admin/sub-products/edit/${item.id || item._id}`}
                            className="btn-table-action edit"
                            style={{ padding: '0.25rem 0.45rem', fontSize: '0.74rem', gap: '3px' }}
                            title="Edit Sub-Product"
                          >
                            <Pencil size={12} strokeWidth={2} />
                            <span>Edit</span>
                          </Link>

                          {/* Delete Button */}
                          <button
                            type="button"
                            className="btn-table-action delete"
                            style={{ padding: '0.25rem 0.45rem', fontSize: '0.74rem', gap: '3px' }}
                            title="Delete Sub-Product"
                            onClick={() => setDeletingItem(item)}
                          >
                            <Trash2 size={12} strokeWidth={2} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filteredSubProducts.length > 0 && (
          <div className="admin-table-pagination" style={{ padding: '0.75rem 1.25rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#7A8983' }}>
              Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
              <strong>{Math.min(currentPage * itemsPerPage, filteredSubProducts.length)}</strong> of{' '}
              <strong>{filteredSubProducts.length}</strong> items
            </span>

            <div className="admin-pagination-pages">
              <button
                type="button"
                className="admin-page-btn"
                style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={13} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  type="button"
                  style={{ minWidth: '28px', height: '28px', fontSize: '0.75rem', padding: '0 0.4rem' }}
                  className={`admin-page-btn ${currentPage === pg ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pg)}
                >
                  {pg}
                </button>
              ))}

              <button
                type="button"
                className="admin-page-btn"
                style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL */}
      {viewingItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 43, 36, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1.5rem',
          }}
          onClick={() => setViewingItem(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(23, 43, 36, 0.25)',
              border: '1px solid #DDE5E1',
              padding: '1.5rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #DDE5E1',
                paddingBottom: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: '#DDF5EA',
                    color: '#0F6B4F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FlaskConical size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#172B24', margin: 0 }}>
                    {viewingItem.name}
                  </h3>
                  <span style={{ fontSize: '0.76rem', color: '#7A8983' }}>
                    Parent Line: {viewingItem.parentProductName || 'Agro Chemicals'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingItem(null)}
                style={{
                  border: 'none',
                  background: '#F7FAF9',
                  color: '#7A8983',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Gallery Previews */}
            {Array.isArray(viewingItem.images) && viewingItem.images.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#52635C', display: 'block', marginBottom: '0.4rem' }}>
                  Images ({viewingItem.images.length})
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
                  {viewingItem.images.map((src, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={src}
                      alt={`${viewingItem.name} ${imgIdx + 1}`}
                      style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '6px',
                        objectFit: 'cover',
                        border: '1px solid #DDE5E1',
                        background: '#F7FAF9',
                        flexShrink: 0,
                      }}
                      onError={(e) => {
                        e.target.src = '/images/products/premium_dummy.jpg';
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: '#F7FAF9', padding: '0.75rem', borderRadius: '8px', border: '1px solid #DDE5E1' }}>
                <span style={{ fontSize: '0.72rem', color: '#7A8983', fontWeight: 600, display: 'block' }}>
                  Dosage Rate
                </span>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#172B24', marginTop: '2px', display: 'block' }}>
                  {viewingItem.dosage || 'Standard dose'}
                </span>
              </div>

              <div style={{ background: '#F7FAF9', padding: '0.75rem', borderRadius: '8px', border: '1px solid #DDE5E1' }}>
                <span style={{ fontSize: '0.72rem', color: '#7A8983', fontWeight: 600, display: 'block' }}>
                  Status
                </span>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: viewingItem.status?.toLowerCase() === 'active' ? '#0F6B4F' : '#D97706', marginTop: '2px', display: 'block' }}>
                  {viewingItem.status || 'Active'}
                </span>
              </div>
            </div>

            {/* Packaging Sizes */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#52635C', display: 'block', marginBottom: '0.3rem' }}>
                Packaging Sizes Available
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {(Array.isArray(viewingItem.packagingSizes) ? viewingItem.packagingSizes : (viewingItem.packSizes || '').split(',')).map((sz, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#FFFFFF',
                      color: '#0F6B4F',
                      border: '1px solid #22A06B',
                      padding: '0.25rem 0.55rem',
                      borderRadius: '5px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Tag size={10} />
                    {sz.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary */}
            {viewingItem.shortDescription && (
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#52635C', display: 'block', marginBottom: '0.25rem' }}>
                  Short Summary
                </label>
                <p style={{ fontSize: '0.82rem', color: '#52635C', lineHeight: 1.45, margin: 0 }}>
                  {viewingItem.shortDescription}
                </p>
              </div>
            )}

            {/* Modal Actions Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid #DDE5E1' }}>
              <button
                type="button"
                className="btn-admin-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                onClick={() => setViewingItem(null)}
              >
                Close
              </button>
              <Link
                to={`/admin/sub-products/edit/${viewingItem.id || viewingItem._id}`}
                className="btn-admin-primary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
              >
                <Pencil size={12} />
                <span>Edit</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 43, 36, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1.5rem',
          }}
          onClick={() => setDeletingItem(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              maxWidth: '440px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(23, 43, 36, 0.25)',
              border: '1px solid #DDE5E1',
              padding: '1.5rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#FEE2E2',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AlertCircle size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#172B24', margin: 0 }}>
                  Delete Sub-Product
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#52635C', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Are you sure you want to delete <strong>"{deletingItem.name}"</strong>? Stored images will also be removed from the server.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn-admin-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                disabled={isDeleting}
                onClick={() => setDeletingItem(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.9rem',
                  background: '#DC2626',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: isDeleting ? 'not-allowed' : 'pointer',
                }}
              >
                <Trash2 size={13} />
                <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
