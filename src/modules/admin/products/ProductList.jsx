import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminData } from '../../../context/AdminDataContext';

export default function ProductList() {
  const { products, deleteProduct } = useAdminData();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [inlineDeleteId, setInlineDeleteId] = useState(null);

  // Extract unique categories
  const categories = ['ALL', ...Array.from(new Set(products.map((p) => p.category)))];

  // Filter products based on search and category
  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.shortDescription && item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleInlineDeleteConfirm = (id) => {
    deleteProduct(id);
    setInlineDeleteId(null);
  };

  return (
    <div className="admin-product-list-page">
      {/* Page Title & Action Bar */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">PRODUCT MANAGEMENT</h1>
          <p className="admin-page-subtitle">
            Manage top-level agricultural product categories, descriptions, and active status
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/products/add" className="btn-admin-primary">
            <span>➕</span> ADD NEW PRODUCT
          </Link>
        </div>
      </div>

      {/* Inline Delete Alert (if active) */}
      {inlineDeleteId && (
        <div className="admin-inline-delete-box">
          <div className="admin-inline-delete-text">
            <span>⚠️</span>
            <span>
              Are you sure you want to delete product "
              <strong>{products.find((p) => p.id === inlineDeleteId)?.name}</strong>"? This action is permanent.
            </span>
          </div>
          <div className="admin-inline-delete-actions">
            <button
              type="button"
              className="btn-admin-danger"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
              onClick={() => handleInlineDeleteConfirm(inlineDeleteId)}
            >
              CONFIRM DELETE
            </button>
            <button
              type="button"
              className="btn-admin-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
              onClick={() => setInlineDeleteId(null)}
            >
              CANCEL
            </button>
          </div>
        </div>
      )}

      {/* Products Data Card */}
      <div className="admin-card-container">
        {/* Table Filters Header */}
        <div className="admin-card-header-bar">
          <div className="admin-table-filters">
            <div className="admin-search-input-wrap">
              <span className="admin-search-icon">🔍</span>
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search products by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="admin-select-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  CATEGORY: {cat.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--admin-text-muted)' }}>
            SHOWING {filteredProducts.length} OF {products.length} PRODUCTS
          </div>
        </div>

        {/* Responsive Table */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>PRODUCT DETAILS</th>
                <th>CATEGORY</th>
                <th>FEATURES COUNT</th>
                <th>STATUS</th>
                <th>CREATED</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--admin-text-muted)' }}>
                    No products found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="admin-table-item-cell">
                        <img
                          src={item.image || '/images/products/premium_dummy.jpg'}
                          alt={item.name}
                          className="admin-table-thumb"
                        />
                        <div>
                          <span className="admin-table-item-name">{item.name}</span>
                          <span className="admin-table-item-sub">
                            {item.shortDescription
                              ? item.shortDescription.slice(0, 55) + '...'
                              : 'No description'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge category">{item.category}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                        {item.features?.length || 0} Features
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${item.status?.toLowerCase() === 'active' ? 'active' : 'pending'}`}>
                        ● {item.status || 'Active'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--admin-text-muted)' }}>
                      {item.createdAt || '2026-08-15'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <Link
                          to={`/admin/products/edit/${item.id}`}
                          className="btn-table-action edit"
                          title="Edit product details"
                        >
                          ✏️ EDIT
                        </Link>
                        <Link
                          to={`/admin/products/delete/${item.id}`}
                          className="btn-table-action delete"
                          title="Open dedicated delete page"
                        >
                          🗑️ DELETE
                        </Link>
                        <button
                          type="button"
                          className="btn-table-action delete"
                          style={{ background: '#fef2f2' }}
                          onClick={() => setInlineDeleteId(item.id)}
                          title="Quick inline delete confirmation"
                        >
                          ⚡ QUICK DELETE
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
