import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProductsApi } from '../../../api/productApi';
import { useToast } from '../../../context/ToastContext';
import AdminSelect from '../../../components/common/AdminSelect';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 5, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const categories = ['ALL', 'Insecticides', 'Fungicides', 'Herbicides', 'PGR & Nutrition', 'Biostimulants', 'Agriculture', 'Fertilizers'];

  const categoryFilterOptions = categories.map((cat) => ({
    value: cat,
    label: cat === 'ALL' ? 'All Categories' : cat,
  }));

  // Fetch Products from Backend API with Server-Side Pagination
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getProductsApi({
        page,
        limit,
        search: searchQuery.trim() || undefined,
        category: categoryFilter !== 'ALL' ? categoryFilter : undefined,
      });

      if (res.success && res.data) {
        setProducts(res.data.products || []);
        setPagination(res.data.pagination || { total: 0, page: 1, limit, totalPages: 1 });
      }
    } catch (err) {
      showToast(err.message || 'Failed to load products from backend API', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, searchQuery, categoryFilter, showToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to page 1 on search
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setPage(1); // Reset to page 1 on category filter
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1); // Reset to page 1 on limit change
  };

  const startRecord = (pagination.page - 1) * pagination.limit + (products.length > 0 ? 1 : 0);
  const endRecord = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <div className="admin-product-list-page">
      {/* Page Title & Action Bar */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">Product Management</h1>
          <p className="admin-page-subtitle">
            Manage top-level agricultural product formulations, categories, and catalog status
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/products/add" className="btn-admin-primary">
            <Plus size={16} strokeWidth={2.5} />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Products Data Card */}
      <div className="admin-card-container">
        {/* Table Filters Header */}
        <div className="admin-card-header-bar">
          <div className="admin-table-filters">
            <div className="admin-search-input-wrap">
              <Search size={15} className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search products by name, category..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <div style={{ minWidth: '200px' }}>
              <AdminSelect
                id="category-filter"
                name="categoryFilter"
                value={categoryFilter}
                onChange={handleCategoryChange}
                options={categoryFilterOptions}
                prefixIcon={<Filter size={14} style={{ color: '#7A8983' }} />}
                placeholder="Filter by category..."
              />
            </div>
          </div>

          <div className="admin-table-counter">
            Showing <strong>{startRecord}-{endRecord}</strong> of {pagination.total} products
          </div>
        </div>

        {/* Responsive Table */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '38%' }}>Product Details</th>
                <th style={{ width: '16%' }}>Category</th>
                <th style={{ width: '14%' }}>Features</th>
                <th style={{ width: '12%' }}>Status</th>
                <th style={{ width: '10%' }}>Created</th>
                <th style={{ width: '10%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    <p className="admin-table-empty-title">Loading Products from Backend API...</p>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    <p className="admin-table-empty-title">No products found</p>
                    <p className="admin-table-empty-sub">
                      Try adjusting your search query or category filter to find what you're looking for.
                    </p>
                  </td>
                </tr>
              ) : (
                products.map((item) => {
                  const isActive = item.status?.toLowerCase() === 'active';
                  const prodId = item._id || item.id;
                  const createdDate = item.createdAt
                    ? new Date(item.createdAt).toISOString().split('T')[0]
                    : '2026-08-15';

                  return (
                    <tr key={prodId}>
                      <td>
                        <div className="admin-table-item-cell">
                          <img
                            src={item.image || '/images/products/premium_dummy.jpg'}
                            alt={item.name}
                            className="admin-table-thumb"
                            onError={(e) => {
                              e.target.src = '/images/products/premium_dummy.jpg';
                            }}
                          />
                          <div className="admin-table-item-info">
                            <span className="admin-table-item-name">{item.name}</span>
                            <span className="admin-table-item-sub">
                              {item.shortDescription
                                ? (item.shortDescription.length > 60
                                  ? item.shortDescription.slice(0, 60) + '...'
                                  : item.shortDescription)
                                : 'No short description provided'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="admin-badge category">{item.category || 'Insecticides'}</span>
                      </td>
                      <td>
                        <span className="admin-table-feature-pill">
                          {item.features?.length || 0} Features
                        </span>
                      </td>
                      <td>
                        <span className={`admin-badge-status ${isActive ? 'active' : 'inactive'}`}>
                          <span className="status-dot"></span>
                          {item.status || 'Active'}
                        </span>
                      </td>
                      <td>
                        <span className="admin-table-date">{createdDate}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="admin-table-actions">
                          <Link
                            to={`/admin/products/edit/${prodId}`}
                            className="btn-table-action edit"
                            title="Edit product details"
                          >
                            <Pencil size={13} strokeWidth={2} />
                            <span>Edit</span>
                          </Link>
                          <Link
                            to={`/admin/products/delete/${prodId}`}
                            className="btn-table-action delete"
                            title="Delete product"
                          >
                            <Trash2 size={13} strokeWidth={2} />
                            <span>Delete</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Server-Side Pagination Controls Footer */}
        {pagination.totalPages > 1 && (
          <div className="admin-table-pagination-footer" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            borderTop: '1px solid #DDE5E1',
            background: '#ffffff',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#7A8983' }}>
              <span>Rows per page:</span>
              <select
                value={limit}
                onChange={handleLimitChange}
                style={{
                  padding: '0.35rem 0.6rem',
                  borderRadius: '6px',
                  border: '1px solid #DDE5E1',
                  background: '#F7FAF9',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  color: '#172B24',
                  cursor: 'pointer'
                }}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn-admin-secondary"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                style={{ opacity: page <= 1 ? 0.4 : 1, cursor: page <= 1 ? 'not-allowed' : 'pointer', padding: '0.4rem 0.8rem' }}
              >
                <ChevronLeft size={15} />
                <span>Previous</span>
              </button>

              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#172B24', padding: '0 0.5rem' }}>
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <button
                type="button"
                className="btn-admin-secondary"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                style={{ opacity: page >= pagination.totalPages ? 0.4 : 1, cursor: page >= pagination.totalPages ? 'not-allowed' : 'pointer', padding: '0.4rem 0.8rem' }}
              >
                <span>Next</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
