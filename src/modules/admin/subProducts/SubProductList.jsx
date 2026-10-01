import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Filter } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';

export default function SubProductList() {
  const { subProducts, products } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [parentFilter, setParentFilter] = useState('ALL');

  // Extract unique parent product categories/names
  const parentCategories = [
    'ALL',
    ...Array.from(new Set(subProducts.map((s) => s.parentProductName || s.category).filter(Boolean))),
  ];

  const filteredSubProducts = subProducts.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.dosage && item.dosage.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.targetPests && item.targetPests.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.recommendedCrops && item.recommendedCrops.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.packSizes && item.packSizes.toLowerCase().includes(searchQuery.toLowerCase()));

    const parentName = item.parentProductName || item.category;
    const matchesParent = parentFilter === 'ALL' || parentName === parentFilter;

    return matchesSearch && matchesParent;
  });

  return (
    <div className="admin-subproduct-list-page">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">Sub-Product Management</h1>
          <p className="admin-page-subtitle">
            Manage commercial formulations, dosage rates, packaging sizes, and crop recommendations
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/sub-products/add" className="btn-admin-primary">
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Sub-Product</span>
          </Link>
        </div>
      </div>

      {/* Data Card */}
      <div className="admin-card-container">
        {/* Filters */}
        <div className="admin-card-header-bar">
          <div className="admin-table-filters">
            <div className="admin-search-input-wrap">
              <Search size={15} className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search sub-products by name, dosage, packaging..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="admin-select-wrap">
              <Filter size={14} className="admin-filter-icon" />
              <select
                className="admin-select-filter"
                value={parentFilter}
                onChange={(e) => setParentFilter(e.target.value)}
              >
                {parentCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat === 'ALL' ? 'All Product Lines' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-table-counter">
            Showing <strong>{filteredSubProducts.length}</strong> of {subProducts.length} sub-products
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '32%' }}>Sub-Product Item</th>
                <th style={{ width: '18%' }}>Parent Product Line</th>
                <th style={{ width: '18%' }}>Dosage & Application</th>
                <th style={{ width: '16%' }}>Packaging Sizes</th>
                <th style={{ width: '8%' }}>Status</th>
                <th style={{ width: '8%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    <p className="admin-table-empty-title">No sub-products found</p>
                    <p className="admin-table-empty-sub">
                      Try adjusting your search query or category filter.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredSubProducts.map((item) => {
                  const isActive = item.status?.toLowerCase() === 'active';
                  const packagingStr = Array.isArray(item.packagingSizes)
                    ? item.packagingSizes.join(', ')
                    : item.packSizes || item.packagingSizes || '100 gm, 250 gm, 500 gm, 1 Kg';

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
                                ? item.shortDescription.length > 55
                                  ? item.shortDescription.slice(0, 55) + '...'
                                  : item.shortDescription
                                : item.targetPests
                                ? `Target: ${item.targetPests.slice(0, 45)}...`
                                : 'Standard formulation packaging'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="admin-badge category">
                          {item.parentProductName || item.category || 'Agro Chemicals'}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 600 }}>
                          {item.dosage || 'Standard dose per acre'}
                        </span>
                      </td>
                      <td>
                        <span className="admin-table-feature-pill" title={packagingStr}>
                          {packagingStr.length > 25 ? packagingStr.slice(0, 25) + '...' : packagingStr}
                        </span>
                      </td>
                      <td>
                        <span className={`admin-badge-status ${isActive ? 'active' : 'inactive'}`}>
                          <span className="status-dot"></span>
                          {item.status || 'Active'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="admin-table-actions">
                          <Link
                            to={`/admin/sub-products/edit/${item.id}`}
                            className="btn-table-action edit"
                            title="Edit sub-product"
                          >
                            <Pencil size={13} strokeWidth={2} />
                            <span>Edit</span>
                          </Link>
                          <Link
                            to={`/admin/sub-products/delete/${item.id}`}
                            className="btn-table-action delete"
                            title="Delete sub-product"
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
