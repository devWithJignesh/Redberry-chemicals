/* ============================================
   SUB-PRODUCT MANAGEMENT LIST COMPONENT
   FILE: src/modules/admin/subProducts/SubProductList.jsx
   Clean, Compact UI with Common DataTable & Tooltip Action Buttons
   ============================================ */

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  FlaskConical,
  X,
  Tag,
  AlertCircle,
  Images
} from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { getSubProductsApi, deleteSubProductApi } from '../../../api/subProductApi';
import { useToast } from '../../../context/ToastContext';
import { DataTable, TableStatusBadge, TableActionButton } from '../../../components/common/DataTable';

export default function SubProductList() {
  const { subProducts, deleteSubProduct: contextDeleteSubProduct } = useAdminData();
  const { showToast } = useToast();

  const [itemsList, setItemsList] = useState(subProducts || []);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
  }, []);

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

  const columns = [
    {
      key: 'name',
      header: 'Sub-Product Item',
      sortable: true,
      width: '28%',
      render: (item) => {
        const imageCount = Array.isArray(item.images) ? item.images.length : 1;
        return (
          <div className="dt-cell-primary-wrap">
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={item.image || '/images/products/premium_dummy.jpg'}
                alt={item.name}
                className="dt-cell-thumb"
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
            <div className="dt-cell-text-stack">
              <span className="dt-cell-main-title">{item.name}</span>
              {item.shortDescription && (
                <span className="dt-cell-sub-text">
                  {item.shortDescription.length > 50 ? item.shortDescription.slice(0, 50) + '...' : item.shortDescription}
                </span>
              )}
            </div>
          </div>
        );
      },
    },
    {
      key: 'parentProductName',
      header: 'Product Line',
      sortable: true,
      width: '20%',
      render: (item) => (
        <span style={{ fontWeight: 500, color: '#334155' }}>
          {item.parentProductName || item.category || 'Agro Chemicals'}
        </span>
      ),
    },
    {
      key: 'dosage',
      header: 'Dosage & Dilution',
      width: '18%',
      render: (item) => (
        <span style={{ fontSize: '0.82rem', color: '#52635C', fontWeight: 600 }}>
          {item.dosage || 'Standard dose'}
        </span>
      ),
    },
    {
      key: 'packagingSizes',
      header: 'Packaging Sizes',
      width: '18%',
      render: (item) => {
        const packArray = Array.isArray(item.packagingSizes) && item.packagingSizes.length > 0
          ? item.packagingSizes
          : (item.packSizes || '').split(',').map((s) => s.trim()).filter(Boolean);
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {packArray.slice(0, 2).map((size, sIdx) => (
              <span key={sIdx} className="subproduct-pack-chip" style={{ fontSize: '0.72rem', padding: '0.15rem 0.4rem' }}>
                {size}
              </span>
            ))}
            {packArray.length > 2 && (
              <span
                className="subproduct-pack-chip more"
                style={{ fontSize: '0.72rem', padding: '0.15rem 0.4rem' }}
                title={packArray.slice(2).join(', ')}
              >
                +{packArray.length - 2}
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: '10%',
      render: (item) => <TableStatusBadge status={item.status || 'Active'} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '10%',
      align: 'right',
      render: (item) => (
        <div className="dt-actions-group">
          <TableActionButton
            icon={Eye}
            title="Quick View Details"
            variant="view"
            onClick={() => setViewingItem(item)}
          />
          <TableActionButton
            to={`/admin/sub-products/edit/${item.id || item._id}`}
            icon={Pencil}
            title="Edit Sub-Product"
            variant="edit"
          />
          <TableActionButton
            icon={Trash2}
            title="Delete Sub-Product"
            variant="delete"
            onClick={() => setDeletingItem(item)}
          />
        </div>
      ),
    },
  ];

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
          <Link to="/admin/sub-products/add" className="btn-admin-primary">
            <Plus size={15} strokeWidth={2.5} />
            <span>Add Sub-Product</span>
          </Link>
        </div>
      </div>

      {/* Common DataTable Component */}
      <DataTable
        title="Formulations"
        totalCount={filteredSubProducts.length}
        searchPlaceholder="Search sub-products by name, dosage, packaging..."
        searchValue={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        columns={columns}
        data={paginatedItems}
        keyField="id"
        isLoading={isLoading}
        loadingMessage="Loading sub-products..."
        emptyTitle="No sub-products found"
        emptySubtitle="Try adjusting your search query."
        pagination={{
          page: currentPage,
          totalPages,
          total: filteredSubProducts.length,
          limit: itemsPerPage,
          onPageChange: setCurrentPage,
          onLimitChange: (lim) => {
            setItemsPerPage(lim);
            setCurrentPage(1);
          },
          limitOptions: [5, 10, 20, 50],
        }}
      />

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
