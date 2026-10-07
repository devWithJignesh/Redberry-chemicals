/* ============================================
   INQUIRY LIST COMPONENT
   FILE: src/modules/admin/inquiries/InquiryList.jsx
   Clean list page with Common DataTable & Tooltip Action Buttons
   ============================================ */

import { useState, useEffect, useMemo } from 'react';
import { 
  Trash2, 
  Eye, 
  Filter, 
  Phone, 
  RefreshCw 
} from 'lucide-react';
import { getInquiriesApi, deleteInquiryApi } from '../../../api/inquiryApi';
import { useToast } from '../../../context/ToastContext';
import AdminSelect from '../../../components/common/AdminSelect';
import { DataTable, TableCellPrimary, TableStatusBadge, TableActionButton } from '../../../components/common/DataTable';

export default function InquiryList() {
  const { showToast } = useToast();
  const [inquiriesList, setInquiriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

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

  const filteredInquiries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return inquiriesList.filter((item) => {
      const matchesSearch =
        (item.name && item.name.toLowerCase().includes(query)) ||
        (item.phone && item.phone.toLowerCase().includes(query)) ||
        (item.email && item.email.toLowerCase().includes(query));

      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [inquiriesList, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredInquiries.length / limit) || 1;
  const paginatedInquiries = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredInquiries.slice(start, start + limit);
  }, [filteredInquiries, page, limit]);

  const statusOptions = [
    { value: 'ALL', label: 'All Statuses' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Resolved', label: 'Resolved' },
  ];

  const columns = [
    {
      key: 'name',
      header: 'Client / Sender',
      sortable: true,
      width: '32%',
      render: (row) => (
        <TableCellPrimary
          title={row.name}
          subtitle={row.email || 'No email provided'}
        />
      ),
    },
    {
      key: 'phone',
      header: 'Phone Number',
      sortable: true,
      width: '22%',
      render: (row) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#334155', fontWeight: 500, fontSize: '0.84rem' }}>
          <Phone size={13} style={{ color: '#0F6B4F' }} />
          {row.phone}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date Issued',
      sortable: true,
      width: '18%',
      render: (row) => (
        <span className="admin-table-date">
          {row.createdAt}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: '16%',
      render: (row) => <TableStatusBadge status={row.status || 'Pending'} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '12%',
      align: 'right',
      render: (row) => {
        const inqId = row._id || row.id;
        return (
          <div className="dt-actions-group">
            <TableActionButton
              to={`/admin/inquiries/view/${inqId}`}
              icon={Eye}
              title="View Inquiry Details"
              variant="view"
            />
            <TableActionButton
              icon={Trash2}
              title="Delete Inquiry"
              variant="delete"
              onClick={() => handleDelete(inqId)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="admin-inquiry-list-page">
      {/* Page Header */}
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
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Common DataTable Component */}
      <DataTable
        title="Inquiries"
        totalCount={filteredInquiries.length}
        searchPlaceholder="Search client or number..."
        searchValue={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setPage(1);
        }}
        headerRight={
          <div style={{ minWidth: '170px' }}>
            <AdminSelect
              id="status-filter"
              name="statusFilter"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              options={statusOptions}
              prefixIcon={<Filter size={14} style={{ color: '#7A8983' }} />}
              placeholder="Filter status..."
            />
          </div>
        }
        columns={columns}
        data={paginatedInquiries}
        keyField="_id"
        isLoading={loading}
        loadingMessage="Loading inquiries from database..."
        emptyTitle="No inquiries found"
        emptySubtitle="When visitors submit the contact or inquiry form, they will appear here."
        pagination={{
          page,
          totalPages,
          total: filteredInquiries.length,
          limit,
          onPageChange: setPage,
          onLimitChange: (lim) => {
            setLimit(lim);
            setPage(1);
          },
          limitOptions: [5, 10, 20, 50],
        }}
      />
    </div>
  );
}
