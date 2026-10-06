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
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Award,
  FileText,
  Building2,
  Phone,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useAdminData } from '../../../context/AdminDataContext';

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

  // Recent 4 inquiries
  const recentInquiries = inquiries.slice(0, 4);

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

      {/* Main 2-Column Live Analytics Grid */}
      <div className="admin-dashboard-two-col">
        {/* Left Column: Recent Dealer & Buyer Inquiries */}
        <div className="admin-card-container" style={{ margin: 0 }}>
          <div className="admin-card-header-bar">
            <div>
              <h2 className="admin-widget-title">Recent Dealer & Farmer Inquiries</h2>
              <p className="admin-widget-sub">Latest procurement leads and agronomy support requests</p>
            </div>
            <Link to="/admin/inquiries" className="btn-admin-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
              <span>View All Leads</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '32%' }}>Sender</th>
                  <th style={{ width: '36%' }}>Subject / Requirement</th>
                  <th style={{ width: '18%' }}>Status</th>
                  <th style={{ width: '14%', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#7A8983' }}>
                      No incoming inquiries recorded.
                    </td>
                  </tr>
                ) : (
                  recentInquiries.map((inq) => (
                    <tr key={inq.id}>
                      <td>
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.85rem', color: '#172B24' }}>
                            {inq.name}
                          </strong>
                          <span style={{ fontSize: '0.74rem', color: '#7A8983' }}>
                            {inq.email}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span style={{ fontWeight: 600, fontSize: '0.82rem', color: '#52635C', display: 'block' }}>
                            {inq.subject}
                          </span>
                          <span style={{ fontSize: '0.74rem', color: '#7A8983' }}>
                            {inq.message ? inq.message.slice(0, 48) + '...' : 'No details'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`admin-badge ${inq.status === 'Resolved' ? 'resolved' : inq.status === 'In Progress' ? 'in-progress' : 'pending'}`}>
                          ● {inq.status || 'Pending'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Link
                          to={`/admin/inquiries/edit/${inq.id}`}
                          className="btn-table-action edit"
                          title="Open Inquiry"
                        >
                          <span>Review</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Catalog Categories & Compliance Overview */}
        <div className="admin-dashboard-right-stack">
          {/* Active Product Lines Card */}
          <div className="admin-card-container" style={{ margin: 0 }}>
            <div className="admin-card-header-bar">
              <div>
                <h2 className="admin-widget-title">Agrochemical Catalog Lines</h2>
                <p className="admin-widget-sub">Primary categories and active formulations count</p>
              </div>
              <Link to="/admin/products" className="btn-admin-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
                <span>Manage</span>
              </Link>
            </div>

            <div className="admin-product-category-list">
              {products.map((prod) => (
                <div key={prod.id} className="admin-category-quick-item">
                  <img
                    src={prod.image || '/images/products/premium_dummy.jpg'}
                    alt={prod.name}
                    className="admin-cat-thumb"
                    onError={(e) => {
                      e.target.src = '/images/products/premium_dummy.jpg';
                    }}
                  />
                  <div className="admin-cat-info">
                    <span className="admin-cat-name">{prod.name}</span>
                    <span className="admin-cat-meta">
                      {prod.category} • {prod.features?.length || 0} Features
                    </span>
                  </div>
                  <span className={`admin-badge-status ${prod.status?.toLowerCase() === 'active' ? 'active' : 'inactive'}`}>
                    <span className="status-dot"></span>
                    {prod.status || 'Active'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Quality Assurance Banner */}
          <div className="admin-compliance-card">
            <div className="admin-compliance-header">
              <ShieldCheck size={20} className="text-emerald-400" />
              <span className="admin-compliance-title">Agrochemical Quality Compliance</span>
            </div>
            <p className="admin-compliance-text">
              All listed product formulations strictly comply with Central Insecticides Board & Registration Committee (CIB & RC) and ISO 9001:2015 standards.
            </p>
            <div className="admin-compliance-badges">
              <span className="admin-comp-pill">ISO 9001:2015</span>
              <span className="admin-comp-pill">CIB & RC Certified</span>
              <span className="admin-comp-pill">Lab Verified Purity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module Directory Section */}
      <div className="admin-card-container" style={{ marginTop: '2rem' }}>
        <div className="admin-card-header-bar">
          <div>
            <h2 className="admin-widget-title">Administration Modules Directory</h2>
            <p className="admin-widget-sub">Direct access to manage catalog, formulations, reviews, and inquiries</p>
          </div>
        </div>

        <div className="admin-modules-directory-grid">
          {/* Module 1: Product Categories */}
          <div className="admin-dir-module-card">
            <div className="admin-dir-card-header">
              <div className="admin-dir-icon emerald">
                <Package size={20} />
              </div>
              <span className="admin-badge category">{products.length} Records</span>
            </div>
            <h3 className="admin-dir-title">Products Catalog</h3>
            <p className="admin-dir-desc">
              Manage top-level agricultural product lines, formulations, and publishing status.
            </p>
            <div className="admin-dir-actions">
              <Link to="/admin/products" className="btn-table-action view" style={{ flex: 1 }}>
                View List
              </Link>
              <Link to="/admin/products/add" className="btn-table-action edit" style={{ flex: 1 }}>
                Add New
              </Link>
            </div>
          </div>

          {/* Module 2: Sub-Products */}
          <div className="admin-dir-module-card">
            <div className="admin-dir-card-header">
              <div className="admin-dir-icon blue">
                <FlaskConical size={20} />
              </div>
              <span className="admin-badge category">{subProducts.length} Records</span>
            </div>
            <h3 className="admin-dir-title">Sub-Product Molecules</h3>
            <p className="admin-dir-desc">
              Manage chemical technical molecules, dosage rates, and crop recommendations.
            </p>
            <div className="admin-dir-actions">
              <Link to="/admin/sub-products" className="btn-table-action view" style={{ flex: 1 }}>
                View List
              </Link>
              <Link to="/admin/sub-products/add" className="btn-table-action edit" style={{ flex: 1 }}>
                Add New
              </Link>
            </div>
          </div>

          {/* Module 3: Customer Reviews */}
          <div className="admin-dir-module-card">
            <div className="admin-dir-card-header">
              <div className="admin-dir-icon amber">
                <Star size={20} />
              </div>
              <span className="admin-badge approved">{reviews.length} Reviews</span>
            </div>
            <h3 className="admin-dir-title">Customer Reviews</h3>
            <p className="admin-dir-desc">
              Manage verified grower testimonials, crop feedback, and public ratings.
            </p>
            <div className="admin-dir-actions">
              <Link to="/admin/reviews" className="btn-table-action view" style={{ flex: 1 }}>
                View List
              </Link>
              <Link to="/admin/reviews/add" className="btn-table-action edit" style={{ flex: 1 }}>
                Add Review
              </Link>
            </div>
          </div>

          {/* Module 4: Inquiries */}
          <div className="admin-dir-module-card">
            <div className="admin-dir-card-header">
              <div className="admin-dir-icon purple">
                <Mail size={20} />
              </div>
              <span className="admin-badge pending">{pendingInquiries} Pending</span>
            </div>
            <h3 className="admin-dir-title">Dealer Inquiries</h3>
            <p className="admin-dir-desc">
              Track distributor inquiries, bulk order leads, and agronomy questions.
            </p>
            <div className="admin-dir-actions">
              <Link to="/admin/inquiries" className="btn-table-action view" style={{ flex: 1 }}>
                View Leads
              </Link>
              <Link to="/admin/inquiries/add" className="btn-table-action edit" style={{ flex: 1 }}>
                Create Lead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
