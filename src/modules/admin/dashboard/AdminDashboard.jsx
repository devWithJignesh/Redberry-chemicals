import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useAdminData } from '../../../context/AdminDataContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { products, subProducts, reviews, inquiries } = useAdminData();

  // Statistics calculation
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === 'Active').length;
  const totalSubProducts = subProducts.length;
  const activeSubProducts = subProducts.filter((s) => s.status === 'Active').length;

  const totalReviews = reviews.length;
  const verifiedReviews = reviews.filter((r) => r.verified).length;
  const averageRating = (
    reviews.reduce((acc, r) => acc + (Number(r.rate) || 5), 0) / (reviews.length || 1)
  ).toFixed(1);

  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter((i) => i.status === 'Pending').length;
  const resolvedInquiries = inquiries.filter((i) => i.status === 'Resolved').length;

  return (
    <div className="admin-dashboard-page">
      {/* Page Header with Capitalized Names */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">SUPERADMIN DASHBOARD</h1>
          <p className="admin-page-subtitle">
            Welcome back, <strong>{user?.name || 'SuperAdmin'}</strong>. Overview of agricultural products, catalog entries, and customer communications.
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/products/add" className="btn-admin-primary">
            <span>➕</span> ADD NEW PRODUCT
          </Link>
          <Link to="/admin/sub-products/add" className="btn-admin-secondary">
            <span>➕</span> ADD SUB-PRODUCT
          </Link>
        </div>
      </div>

      {/* ========================================================
          TWO CARDS ON THE DASHBOARD (STRICT REQUIREMENT #2)
          ======================================================== */}
      <div className="admin-dashboard-two-cards-grid">
        {/* CARD 1: PRODUCTS & SUB-PRODUCTS INVENTORY STATISTICS */}
        <div className="admin-stat-card">
          <div>
            <div className="admin-stat-card-header">
              <div>
                <h2 className="admin-stat-card-title">PRODUCT & CATALOG OVERVIEW</h2>
                <p className="admin-stat-card-subtitle">
                  Category product lines and registered formulation sub-products
                </p>
              </div>
              <div className="admin-stat-card-icon">📦</div>
            </div>

            <div className="admin-stat-metrics-row">
              <div className="admin-metric-box">
                <span className="admin-metric-value">{totalProducts}</span>
                <span className="admin-metric-label">TOTAL PRODUCTS</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--admin-success)', fontWeight: 700, marginTop: '2px' }}>
                  ● {activeProducts} Active Lines
                </span>
              </div>
              <div className="admin-metric-box">
                <span className="admin-metric-value">{totalSubProducts}</span>
                <span className="admin-metric-label">TOTAL SUB-PRODUCTS</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--admin-primary-light)', fontWeight: 700, marginTop: '2px' }}>
                  ● {activeSubProducts} Active Formulations
                </span>
              </div>
            </div>
          </div>

          <div className="admin-stat-card-footer">
            <span className="admin-stat-badge">
              <span>🌿</span> CIB & Agrochemical Catalog Live
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/admin/products" className="btn-table-action view">
                VIEW PRODUCTS →
              </Link>
              <Link to="/admin/sub-products" className="btn-table-action view">
                VIEW SUB-PRODUCTS →
              </Link>
            </div>
          </div>
        </div>

        {/* CARD 2: REVIEWS & INQUIRIES STATISTICS */}
        <div className="admin-stat-card card-alt">
          <div>
            <div className="admin-stat-card-header">
              <div>
                <h2 className="admin-stat-card-title">REVIEWS & INQUIRIES OVERVIEW</h2>
                <p className="admin-stat-card-subtitle">
                  Farmer testimonials, dealer inquiries, and response tracking
                </p>
              </div>
              <div className="admin-stat-card-icon">📬</div>
            </div>

            <div className="admin-stat-metrics-row">
              <div className="admin-metric-box">
                <span className="admin-metric-value">{totalReviews}</span>
                <span className="admin-metric-label">CUSTOMER REVIEWS</span>
                <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 700, marginTop: '2px' }}>
                  ⭐ {averageRating}/5 Avg Rating ({verifiedReviews} Verified)
                </span>
              </div>
              <div className="admin-metric-box">
                <span className="admin-metric-value">{totalInquiries}</span>
                <span className="admin-metric-label">TOTAL INQUIRIES</span>
                <span style={{ fontSize: '0.75rem', color: pendingInquiries > 0 ? 'var(--admin-danger)' : 'var(--admin-success)', fontWeight: 700, marginTop: '2px' }}>
                  ● {pendingInquiries} Pending &bull; {resolvedInquiries} Resolved
                </span>
              </div>
            </div>
          </div>

          <div className="admin-stat-card-footer">
            <span className="admin-stat-badge" style={{ background: 'var(--admin-info-soft)', color: 'var(--admin-info)' }}>
              <span>💬</span> Farmer & Dealer Engagement Active
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/admin/reviews" className="btn-table-action view">
                VIEW REVIEWS →
              </Link>
              <Link to="/admin/inquiries" className="btn-table-action view">
                VIEW INQUIRIES →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK SECTION DIRECTORY */}
      <div className="admin-card-container">
        <div className="admin-card-header-bar">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              ADMINISTRATION SECTIONS
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
              Direct access to CRUD management for all admin modules
            </span>
          </div>
        </div>

        <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {/* Menu 1: PRODUCT */}
          <div style={{ border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1.25rem', background: '#fafbfc' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.3rem' }}>📦</span>
              <span className="admin-badge category">{products.length} Items</span>
            </div>
            <h4 style={{ margin: '0 0 0.4rem', textTransform: 'uppercase', fontSize: '0.95rem', fontWeight: 800 }}>PRODUCT</h4>
            <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
              Manage top-level agricultural product categories and chemical classifications.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/admin/products" className="btn-table-action view" style={{ flex: 1, justifyContent: 'center' }}>
                LIST
              </Link>
              <Link to="/admin/products/add" className="btn-table-action edit" style={{ flex: 1, justifyContent: 'center' }}>
                ADD
              </Link>
            </div>
          </div>

          {/* Menu 2: SUB-PRODUCT */}
          <div style={{ border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1.25rem', background: '#fafbfc' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.3rem' }}>🧪</span>
              <span className="admin-badge category">{subProducts.length} Items</span>
            </div>
            <h4 style={{ margin: '0 0 0.4rem', textTransform: 'uppercase', fontSize: '0.95rem', fontWeight: 800 }}>SUB-PRODUCT</h4>
            <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
              Manage detailed formulation products (Insecticides, Fungicides, Herbicides).
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/admin/sub-products" className="btn-table-action view" style={{ flex: 1, justifyContent: 'center' }}>
                LIST
              </Link>
              <Link to="/admin/sub-products/add" className="btn-table-action edit" style={{ flex: 1, justifyContent: 'center' }}>
                ADD
              </Link>
            </div>
          </div>

          {/* Menu 3: CUSTOMER REVIEW */}
          <div style={{ border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1.25rem', background: '#fafbfc' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.3rem' }}>⭐</span>
              <span className="admin-badge approved">{reviews.length} Reviews</span>
            </div>
            <h4 style={{ margin: '0 0 0.4rem', textTransform: 'uppercase', fontSize: '0.95rem', fontWeight: 800 }}>CUSTOMER REVIEW</h4>
            <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
              Manage verified grower ratings, testimonials, and crop yield reviews.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/admin/reviews" className="btn-table-action view" style={{ flex: 1, justifyContent: 'center' }}>
                LIST
              </Link>
              <Link to="/admin/reviews/add" className="btn-table-action edit" style={{ flex: 1, justifyContent: 'center' }}>
                ADD
              </Link>
            </div>
          </div>

          {/* Menu 4: INQUIRY */}
          <div style={{ border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1.25rem', background: '#fafbfc' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.3rem' }}>📬</span>
              <span className="admin-badge pending">{pendingInquiries} Pending</span>
            </div>
            <h4 style={{ margin: '0 0 0.4rem', textTransform: 'uppercase', fontSize: '0.95rem', fontWeight: 800 }}>INQUIRY</h4>
            <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
              Track dealer requests, bulk procurement inquiries, and grower support messages.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/admin/inquiries" className="btn-table-action view" style={{ flex: 1, justifyContent: 'center' }}>
                LIST
              </Link>
              <Link to="/admin/inquiries/add" className="btn-table-action edit" style={{ flex: 1, justifyContent: 'center' }}>
                CREATE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
