import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../../../context/AdminDataContext';

export default function InquiryList() {
  const { inquiries, deleteInquiry, updateInquiry } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [inlineDeleteId, setInlineDeleteId] = useState(null);

  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleQuickStatusChange = (id, newStatus) => {
    updateInquiry(id, { status: newStatus });
  };

  const handleInlineDeleteConfirm = (id) => {
    deleteInquiry(id);
    setInlineDeleteId(null);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Resolved':
        return 'resolved';
      case 'In Progress':
        return 'in-progress';
      case 'Pending':
      default:
        return 'pending';
    }
  };

  return (
    <div className="admin-inquiry-list-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">INQUIRY MANAGEMENT</h1>
          <p className="admin-page-subtitle">
            Manage incoming dealer applications, bulk procurement inquiries, and customer support leads
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/inquiries/add" className="btn-admin-primary">
            <span>➕</span> CREATE MANUAL LEAD
          </Link>
        </div>
      </div>

      {inlineDeleteId && (
        <div className="admin-inline-delete-box">
          <div className="admin-inline-delete-text">
            <span>⚠️</span>
            <span>
              Are you sure you want to delete inquiry from "
              <strong>{inquiries.find((i) => i.id === inlineDeleteId)?.name}</strong>"?
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

      <div className="admin-card-container">
        <div className="admin-card-header-bar">
          <div className="admin-table-filters">
            <div className="admin-search-input-wrap">
              <span className="admin-search-icon">🔍</span>
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search inquiries by name, email, subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="admin-select-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">ALL STATUSES</option>
              <option value="Pending">PENDING (Action Required)</option>
              <option value="In Progress">IN PROGRESS</option>
              <option value="Resolved">RESOLVED / COMPLETED</option>
            </select>
          </div>

          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--admin-text-muted)' }}>
            SHOWING {filteredInquiries.length} OF {inquiries.length} INQUIRIES
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>CLIENT / CONTACT</th>
                <th>SUBJECT & CATEGORY</th>
                <th>DATE RECEIVED</th>
                <th>STATUS</th>
                <th>PRIORITY</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--admin-text-muted)' }}>
                    No inquiries found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div>
                        <span className="admin-table-item-name">{item.name}</span>
                        <span className="admin-table-item-sub">
                          ✉ {item.email} &bull; 📞 {item.phone || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td style={{ maxWidth: '280px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--admin-text-main)', display: 'block' }}>
                        {item.subject}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>
                        {item.message ? item.message.slice(0, 50) + '...' : ''}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--admin-text-muted)' }}>
                      {item.date}
                    </td>
                    <td>
                      <select
                        value={item.status}
                        onChange={(e) => handleQuickStatusChange(item.id, e.target.value)}
                        className={`admin-badge ${getStatusBadgeClass(item.status)}`}
                        style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                        title="Click to quick-update status"
                      >
                        <option value="Pending">● Pending</option>
                        <option value="In Progress">● In Progress</option>
                        <option value="Resolved">● Resolved</option>
                      </select>
                    </td>
                    <td>
                      <span className={`admin-badge ${item.priority === 'High' || item.priority === 'Urgent' ? 'urgent' : 'category'}`}>
                        {item.priority || 'Normal'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <Link
                          to={`/admin/inquiries/edit/${item.id}`}
                          className="btn-table-action edit"
                          title="View / Edit inquiry"
                        >
                          ✏️ EDIT / NOTES
                        </Link>
                        <Link
                          to={`/admin/inquiries/delete/${item.id}`}
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
                          title="Inline delete"
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
