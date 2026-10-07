import { Link } from 'react-router-dom';
import {
  Package,
  FlaskConical,
  Star,
  Mail,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Eye
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useAdminData } from '../../../context/AdminDataContext';
import { DataTable, TableCellPrimary, TableStatusBadge, TableActionButton } from '../../../components/common/DataTable';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { products, subProducts, reviews, inquiries } = useAdminData();

  // Statistics calculation
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status?.toLowerCase() === 'active').length;
  const totalSubProducts = subProducts.length;
  const activeSubProducts = subProducts.filter((s) => s.status?.toLowerCase() === 'active').length;

  const totalReviews = reviews.length;
  const verifiedReviews = reviews.filter((r) => r.verified !== false).length;
  const averageRating = (
    reviews.reduce((acc, r) => acc + (Number(r.rate) || 5), 0) / (reviews.length || 1)
  ).toFixed(1);

  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter((i) => i.status === 'Pending').length;
  const inProgressInquiries = inquiries.filter((i) => i.status === 'In Progress').length;
  const resolvedInquiries = inquiries.filter((i) => i.status === 'Resolved').length;

  // Recent 6 inquiries
  const recentInquiries = inquiries.slice(0, 6);

  const inquiryColumns = [
    {
      key: 'name',
      header: 'Sender / Client',
      width: '30%',
      render: (inq) => (
        <TableCellPrimary
          title={inq.name}
          subtitle={inq.email || inq.phone || 'No contact info'}
        />
      ),
    },
    {
      key: 'subject',
      header: 'Requirement / Message',
      width: '42%',
      render: (inq) => (
        <div style={{ maxWidth: '420px' }}>
          <span style={{ fontWeight: 600, fontSize: '0.84rem', color: '#334155', display: 'block' }}>
            {inq.subject || inq.phone || 'Product Inquiry'}
          </span>
          <span style={{ fontSize: '0.76rem', color: '#64748B', display: 'block', lineHeight: 1.35 }}>
            {inq.message ? (inq.message.length > 70 ? inq.message.slice(0, 70) + '...' : inq.message) : 'No details'}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '16%',
      render: (inq) => <TableStatusBadge status={inq.status || 'Pending'} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '12%',
      align: 'right',
      render: (inq) => (
        <div className="dt-actions-group">
          <TableActionButton
            to={`/admin/inquiries/view/${inq.id || inq._id}`}
            icon={Eye}
            title="Review Inquiry Details"
            variant="view"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="admin-dashboard-page">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">Executive Dashboard</h1>
          <p className="admin-page-subtitle">
            Welcome back, <strong>{user?.name || 'Parth Patel'}</strong> • Real-time overview of agrochemical formulations, dealer leads, and grower reviews
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/products/add" className="btn-admin-primary">
            <Plus size={15} strokeWidth={2.5} />
            <span>Add Product</span>
          </Link>
          <Link to="/admin/sub-products/add" className="btn-admin-secondary">
            <FlaskConical size={15} />
            <span>Add Formulation</span>
          </Link>
        </div>
      </div>

      {/* 4-Card Agro Executive Metrics Grid */}
      <div className="admin-metrics-grid-4">
        {/* Metric 1: Product Categories */}
        <div className="admin-metric-card">
          <div className="admin-metric-card-top">
            <div className="admin-metric-icon-box emerald">
              <Package size={22} />
            </div>
            <span className="admin-metric-badge success">
              <CheckCircle2 size={12} />
              {activeProducts} Active
            </span>
          </div>
          <div className="admin-metric-value-wrap">
            <h3 className="admin-metric-number">{totalProducts}</h3>
            <span className="admin-metric-title">Product Categories</span>
          </div>
          <div className="admin-metric-footer">
            <span className="admin-metric-detail">
              Agriculture, Specialty & Water Treatment
            </span>
            <Link to="/admin/products" className="admin-metric-link" title="Manage Products">
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* Metric 2: Formulations (Sub-Products) */}
        <div className="admin-metric-card">
          <div className="admin-metric-card-top">
            <div className="admin-metric-icon-box blue">
              <FlaskConical size={22} />
            </div>
            <span className="admin-metric-badge info">
              <Layers size={12} />
              {activeSubProducts} Formulations
            </span>
          </div>
          <div className="admin-metric-value-wrap">
            <h3 className="admin-metric-number">{totalSubProducts}</h3>
            <span className="admin-metric-title">Chemical Formulations</span>
          </div>
          <div className="admin-metric-footer">
            <span className="admin-metric-detail">
              Insecticides, Fungicides, Herbicides
            </span>
            <Link to="/admin/sub-products" className="admin-metric-link" title="Manage Sub-Products">
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* Metric 3: Customer & Farmer Reviews */}
        <div className="admin-metric-card">
          <div className="admin-metric-card-top">
            <div className="admin-metric-icon-box amber">
              <Star size={22} fill="#eab308" />
            </div>
            <span className="admin-metric-badge rating">
              ★ {averageRating} / 5.0
            </span>
          </div>
          <div className="admin-metric-value-wrap">
            <h3 className="admin-metric-number">{totalReviews}</h3>
            <span className="admin-metric-title">Grower Reviews</span>
          </div>
          <div className="admin-metric-footer">
            <span className="admin-metric-detail">
              {verifiedReviews} Verified Farmer Testimonials
            </span>
            <Link to="/admin/reviews" className="admin-metric-link" title="Manage Reviews">
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* Metric 4: Commercial & Farmer Inquiries */}
        <div className="admin-metric-card">
          <div className="admin-metric-card-top">
            <div className="admin-metric-icon-box purple">
              <Mail size={22} />
            </div>
            <span className={`admin-metric-badge ${pendingInquiries > 0 ? 'warning' : 'success'}`}>
              <Clock size={12} />
              {pendingInquiries} Pending
            </span>
          </div>
          <div className="admin-metric-value-wrap">
            <h3 className="admin-metric-number">{totalInquiries}</h3>
            <span className="admin-metric-title">Inquiries & Leads</span>
          </div>
          <div className="admin-metric-footer">
            <span className="admin-metric-detail">
              {resolvedInquiries} Resolved • {inProgressInquiries} In Progress
            </span>
            <Link to="/admin/inquiries" className="admin-metric-link" title="Manage Inquiries">
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Full-Width Recent Dealer & Farmer Inquiries using Common DataTable */}
      <div style={{ marginTop: '1.75rem' }}>
        <DataTable
          title="Recent Dealer & Farmer Inquiries"
          totalCount={inquiries.length}
          headerRight={
            <Link to="/admin/inquiries" className="btn-admin-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
              <span>View All Leads</span>
              <ArrowRight size={13} />
            </Link>
          }
          showSearch={false}
          columns={inquiryColumns}
          data={recentInquiries}
          keyField="id"
          emptyTitle="No incoming inquiries recorded"
          emptySubtitle="Customer inquiries from the website will appear here."
        />
      </div>
    </div>
  );
}
