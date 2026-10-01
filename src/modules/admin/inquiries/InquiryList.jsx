import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Filter } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';

export default function InquiryList() {
  const { inquiries, updateInquiry } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

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

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Resolved':
        return 'active';
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
          <h1 className="admin-page-title">Inquiry Management</h1>
          <p className="admin-page-subtitle">
            Manage incoming dealer applications, bulk procurement inquiries, and customer leads
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/inquiries/add" className="btn-admin-primary">
            <Plus size={16} strokeWidth={2.5} />
            <span>Create Manual Lead</span>
          </Link>
        </div>
      </div>

      <div className="admin-card-container">
        <div className="admin-card-header-bar">
          <div className="admin-table-filters">
            <div className="admin-search-input-wrap">
              <Search size={15} className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search inquiries by name, email, subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="admin-select-wrap">
              <Filter size={14} className="admin-filter-icon" />
              <select
                className="admin-select-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="admin-table-counter">
            Showing <strong>{filteredInquiries.length}</strong> of {inquiries.length} inquiries
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Lead / Sender</th>
                <th style={{ width: '22%' }}>Subject & Message</th>
                <th style={{ width: '15%' }}>Status</th>
                <th style={{ width: '12%' }}>Priority</th>
                <th style={{ width: '12%' }}>Date</th>
                <th style={{ width: '14%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    <p className="admin-table-empty-title">No inquiries found</p>
                    <p className="admin-table-empty-sub">
                      Try adjusting your search query or status filter.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.88rem', color: '#1e293b' }}>
                          {item.name}
                        </strong>
                        <span className="admin-table-item-sub">
                          {item.email} {item.phone ? `• ${item.phone}` : ''}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div style={{ maxWidth: '280px' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.82rem', color: '#334155', display: 'block' }}>
                          {item.subject}
                        </span>
                        <span className="admin-table-item-sub">
                          {item.message ? item.message.slice(0, 50) + '...' : 'No details'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <select
                        value={item.status || 'Pending'}
                        onChange={(e) => handleQuickStatusChange(item.id, e.target.value)}
                        className={`admin-badge ${getStatusBadgeClass(item.status)}`}
                        style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td>
                      <span className={`admin-badge ${item.priority === 'High' || item.priority === 'Urgent' ? 'urgent' : 'category'}`}>
                        {item.priority || 'Normal'}
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
                          to={`/admin/inquiries/edit/${item.id}`}
                          className="btn-table-action edit"
                          title="View / Edit inquiry"
                        >
                          <Pencil size={13} strokeWidth={2} />
                          <span>Edit</span>
                        </Link>
                        <Link
                          to={`/admin/inquiries/delete/${item.id}`}
                          className="btn-table-action delete"
                          title="Delete inquiry"
                        >
                          <Trash2 size={13} strokeWidth={2} />
                          <span>Delete</span>
                        </Link>
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
