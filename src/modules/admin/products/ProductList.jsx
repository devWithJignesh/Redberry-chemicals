import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Filter } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';

export default function ProductList() {
  const { products } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

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

  return (
    <div className="admin-product-list-page">
      {/* Page Title & Action Bar */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">Product Management</h1>
          <p className="admin-page-subtitle">
            Manage top-level agricultural product categories, formulations, and catalog status
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
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="admin-select-wrap">
              <Filter size={14} className="admin-filter-icon" />
              <select
                className="admin-select-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat === 'ALL' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-table-counter">
            Showing <strong>{filteredProducts.length}</strong> of {products.length} products
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
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    <p className="admin-table-empty-title">No products found</p>
                    <p className="admin-table-empty-sub">
                      Try adjusting your search query or category filter to find what you're looking for.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item) => {
                  const isActive = item.status?.toLowerCase() === 'active';
                  return (
                    <tr key={item.id}>
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
                                ? item.shortDescription.length > 60
                                  ? item.shortDescription.slice(0, 60) + '...'
                                  : item.shortDescription
                                : 'No short description provided'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="admin-badge category">{item.category}</span>
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
                        <span className="admin-table-date">
                          {item.createdAt || '2026-08-15'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="admin-table-actions">
                          <Link
                            to={`/admin/products/edit/${item.id}`}
                            className="btn-table-action edit"
                            title="Edit product details"
                          >
                            <Pencil size={13} strokeWidth={2} />
                            <span>Edit</span>
                          </Link>
                          <Link
                            to={`/admin/products/delete/${item.id}`}
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
      </div>
    </div>
  );
}
