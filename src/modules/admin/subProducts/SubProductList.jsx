import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../../../context/AdminDataContext';

export default function SubProductList() {
  const { subProducts, deleteSubProduct } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [chemicalGroupFilter, setChemicalGroupFilter] = useState('ALL');
  const [inlineDeleteId, setInlineDeleteId] = useState(null);

  // Extract unique chemical groups
  const chemicalGroups = [
    'ALL',
    ...Array.from(new Set(subProducts.map((s) => s.chemicalGroup).filter(Boolean))),
  ];

  const filteredSubProducts = subProducts.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.technicalName && item.technicalName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.formulation && item.formulation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.targetPests && item.targetPests.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesGroup =
      chemicalGroupFilter === 'ALL' || item.chemicalGroup === chemicalGroupFilter;

    return matchesSearch && matchesGroup;
  });

  const handleInlineDeleteConfirm = (id) => {
    deleteSubProduct(id);
    setInlineDeleteId(null);
  };

  return (
    <div className="admin-subproduct-list-page">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">SUB-PRODUCT MANAGEMENT</h1>
          <p className="admin-page-subtitle">
            Manage specific agrochemical formulations, active ingredients, dosage rates, and crop recommendations
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/sub-products/add" className="btn-admin-primary">
            <span>➕</span> ADD SUB-PRODUCT
          </Link>
        </div>
      </div>

      {/* Inline Delete Alert */}
      {inlineDeleteId && (
        <div className="admin-inline-delete-box">
          <div className="admin-inline-delete-text">
            <span>⚠️</span>
            <span>
              Are you sure you want to delete formulation "
              <strong>{subProducts.find((s) => s.id === inlineDeleteId)?.name}</strong>"?
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

      {/* Data Card */}
      <div className="admin-card-container">
        {/* Filters */}
        <div className="admin-card-header-bar">
          <div className="admin-table-filters">
            <div className="admin-search-input-wrap">
              <span className="admin-search-icon">🔍</span>
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search sub-products by molecule, pest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="admin-select-filter"
              value={chemicalGroupFilter}
              onChange={(e) => setChemicalGroupFilter(e.target.value)}
            >
              {chemicalGroups.map((grp) => (
                <option key={grp} value={grp}>
                  GROUP: {grp.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--admin-text-muted)' }}>
            SHOWING {filteredSubProducts.length} OF {subProducts.length} SUB-PRODUCTS
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>SUB-PRODUCT NAME</th>
                <th>TECHNICAL FORMULATION</th>
                <th>CHEMICAL GROUP</th>
                <th>RECOMMENDED CROPS</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--admin-text-muted)' }}>
                    No sub-products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredSubProducts.map((item) => (
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
                            {item.formulation || item.category || 'Insecticide'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>
                        {item.technicalName || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <span className="admin-badge category">
                        {item.chemicalGroup || 'Standard Group'}
                      </span>
                    </td>
                    <td style={{ maxWidth: '200px' }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--admin-text-main)' }}>
                        {item.recommendedCrops
                          ? item.recommendedCrops.slice(0, 45) + '...'
                          : 'Cotton, Paddy, Vegetables'}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${item.status?.toLowerCase() === 'active' ? 'active' : 'pending'}`}>
                        ● {item.status || 'Active'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <Link
                          to={`/admin/sub-products/edit/${item.id}`}
                          className="btn-table-action edit"
                          title="Edit formulation details"
                        >
                          ✏️ EDIT
                        </Link>
                        <Link
                          to={`/admin/sub-products/delete/${item.id}`}
                          className="btn-table-action delete"
                          title="Open dedicated delete verification"
                        >
                          🗑️ DELETE
                        </Link>
                        <button
                          type="button"
                          className="btn-table-action delete"
                          style={{ background: '#fef2f2' }}
                          onClick={() => setInlineDeleteId(item.id)}
                          title="Quick inline delete"
                        >
                          ⚡ QUICK
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
