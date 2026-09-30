import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useAdminData } from '../../../context/AdminDataContext';

export default function AdminSidebar({ isCollapsed, onToggleCollapse, isMobileOpen, onCloseMobile }) {
  const { user } = useAuth();
  const { products, subProducts, reviews, inquiries } = useAdminData();

  // Navigation Items with Capitalized Menu Names as strictly requested in Requirement #3
  const navMenuItems = [
    {
      label: 'DASHBOARD',
      path: '/admin/dashboard',
      icon: '📊',
      badge: null,
    },
    {
      label: 'PRODUCT',
      path: '/admin/products',
      icon: '📦',
      badge: products.length,
    },
    {
      label: 'SUB-PRODUCT',
      path: '/admin/sub-products',
      icon: '🧪',
      badge: subProducts.length,
    },
    {
      label: 'CUSTOMER REVIEW',
      path: '/admin/reviews',
      icon: '⭐',
      badge: reviews.length,
    },
    {
      label: 'INQUIRY',
      path: '/admin/inquiries',
      icon: '📬',
      badge: inquiries.filter((i) => i.status === 'Pending').length || inquiries.length,
    },
  ];

  return (
    <aside
      className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
      aria-label="Admin Navigation Sidebar"
    >
      {/* Brand Header */}
      <div className="admin-sidebar-brand">
        <Link to="/admin/dashboard" className="admin-sidebar-logo-link" onClick={onCloseMobile}>
          <img
            src="/images/logo/logo-icon.png"
            alt="Redberry Logo"
            className="admin-sidebar-logo-img"
          />
          {!isCollapsed && (
            <div className="admin-sidebar-brand-text">
              <span className="admin-brand-title">REDBERRY</span>
              <span className="admin-brand-badge">SUPERADMIN PANEL</span>
            </div>
          )}
        </Link>
        <button
          type="button"
          className="admin-sidebar-toggle-btn"
          onClick={onToggleCollapse}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? '▶' : '◀'}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="admin-sidebar-nav">
        {!isCollapsed && (
          <div className="admin-nav-category-label">MANAGEMENT MENUS</div>
        )}

        {navMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `admin-nav-item-link ${isActive ? 'active' : ''}`
            }
            onClick={onCloseMobile}
            title={isCollapsed ? item.label : undefined}
          >
            <span className="admin-nav-icon">{item.icon}</span>
            {!isCollapsed && (
              <>
                <span className="admin-nav-label">{item.label}</span>
                {item.badge !== null && (
                  <span className="admin-nav-badge">{item.badge}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* SuperAdmin User Info Card */}
      <div className="admin-sidebar-user-card">
        <div className="admin-sidebar-avatar">{user?.avatar || '🛡️'}</div>
        {!isCollapsed && (
          <div className="admin-sidebar-user-meta">
            <span className="admin-sidebar-user-name" title={user?.name || 'Super Admin'}>
              {user?.name || 'Super Admin'}
            </span>
            <span className="admin-sidebar-user-role">SUPERADMIN</span>
          </div>
        )}
      </div>
    </aside>
  );
}
