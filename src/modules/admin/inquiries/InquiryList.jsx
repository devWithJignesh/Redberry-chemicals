/* ============================================
   INQUIRY LIST COMPONENT
   FILE: InquiryList.jsx
   Clean list page with Name, Phone, Date, and Actions
   (Status is managed on the View page)
   ============================================ */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Trash2, 
  Eye, 
  Filter, 
  Phone, 
  RefreshCw, 
  Calendar 
} from 'lucide-react';
import { getInquiriesApi, deleteInquiryApi } from '../../../api/inquiryApi';
import { useToast } from '../../../context/ToastContext';

export default function InquiryList() {
  const { showToast } = useToast();
  const [inquiriesList, setInquiriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await getInquiriesApi();
      if (res.success && Array.isArray(res.data)) {
        setInquiriesList(
          res.data.map((item) => ({
            id: item._id || item.id,
            _id: item._id || item.id,
            name: item.name,
            email: item.email,
            phone: item.phone || '-',
            message: item.message || '',
            status: item.status || 'Pending',
            createdAt: item.createdAt ? item.createdAt.split('T')[0] : 'Today',
          }))
        );
      } else {
        setInquiriesList([]);
      }
    } catch (err) {
      console.error('Error loading inquiries:', err);
      setInquiriesList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    const prevList = [...inquiriesList];
    setInquiriesList((prev) => prev.filter((i) => i.id !== id && i._id !== id));
    try {
      const res = await deleteInquiryApi(id);
      if (res.success) {
        showToast('Inquiry deleted successfully!', 'success');
      } else {
        showToast(res.message || 'Inquiry deleted from list', 'success');
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
      showToast('Inquiry deleted from view', 'success');
    }
  };

  const filteredInquiries = inquiriesList.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.phone && item.phone.toLowerCase().includes(query));

    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-inquiry-list-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">Inquiry Management</h1>
          <p className="admin-page-subtitle">
            Customer inquiries submitted through the website
          </p>
        </div>
        <div className="admin-page-actions">
          <button 
            type="button" 
            onClick={fetchInquiries} 
            className="btn-admin-secondary"
            title="Refresh Inquiries"
          >
            <RefreshCw size={15} />
            <span>Refresh</span>
          </button>
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
                placeholder="Search by name or phone..."
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
            Showing <strong>{filteredInquiries.length}</strong> of {inquiriesList.length} inquiries
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Name</th>
                <th style={{ width: '30%' }}>Phone</th>
                <th style={{ width: '18%' }}>Date</th>
                <th style={{ width: '12%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="admin-table-empty">
                    <p className="admin-table-empty-sub">Loading inquiries from database...</p>
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="admin-table-empty">
                    <p className="admin-table-empty-title">No inquiries found</p>
                    <p className="admin-table-empty-sub">
                      When visitors submit the "Send Us an Inquiry" form, they will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((item) => (
                  <tr key={item.id || item._id}>
                    {/* Name */}
                    <td>
                      <strong style={{ fontSize: '0.9rem', color: '#172B24' }}>
                        {item.name}
                      </strong>
                    </td>

                    {/* Phone */}
                    <td>
                      <span className="admin-table-item-sub" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#52635C', fontWeight: 500, fontSize: '0.86rem' }}>
                        <Phone size={13} style={{ color: '#0F6B4F' }} /> {item.phone}
                      </span>
                    </td>

                    {/* Date */}
                    <td>
                      <span className="admin-table-date" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} /> {item.createdAt}
                      </span>
                    </td>

                    {/* Actions: View Button & Delete */}
                    <td style={{ textAlign: 'right' }}>
                      <div className="admin-table-actions" style={{ justifyContent: 'flex-end', gap: '6px' }}>
                        <Link
                          to={`/admin/inquiries/view/${item.id || item._id}`}
                          className="btn-table-action view"
                          title="View all details"
                        >
                          <Eye size={13} strokeWidth={2} />
                          <span>View</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id || item._id)}
                          className="btn-table-action delete"
                          title="Delete inquiry"
                        >
                          <Trash2 size={13} strokeWidth={2} />
                          <span>Delete</span>
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
