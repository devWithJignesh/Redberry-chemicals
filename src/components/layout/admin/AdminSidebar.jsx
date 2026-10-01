import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FlaskConical, 
  Star, 
  Mail, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function AdminSidebar({ isCollapsed, onToggleCollapse, isMobileOpen, onCloseMobile }) {
  const { user } = useAuth();

  const navMenuItems = [
    {
      label: 'DASHBOARD',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'PRODUCT',
      path: '/admin/products',
      icon: Package,
    },
    {
      label: 'SUB-PRODUCT',
      path: '/admin/sub-products',
      icon: FlaskConical,
    },
    {
      label: 'CUSTOMER REVIEW',
      path: '/admin/reviews',
      icon: Star,
    },
    {
      label: 'INQUIRY',
      path: '/admin/inquiries',
      icon: Mail,
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
          <div className="admin-sidebar-logo-box">
            <img
              src="/images/logo/logo-icon.png"
              alt="Redberry Logo"
              className="admin-sidebar-logo-img"
            />
          </div>
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
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="admin-sidebar-nav">
        {!isCollapsed && (
          <div className="admin-nav-category-label">MANAGEMENT MENUS</div>
        )}

        {navMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `admin-nav-item-link ${isActive ? 'active' : ''}`
              }
              onClick={onCloseMobile}
              title={isCollapsed ? item.label : undefined}
            >
              <span className="admin-nav-icon">
                <Icon size={18} strokeWidth={2} />
              </span>
              {!isCollapsed && (
                <span className="admin-nav-label">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* SuperAdmin User Info Card */}
      <div className="admin-sidebar-user-card">
        <div className="admin-sidebar-avatar-wrap">
          <div className="admin-sidebar-avatar">
            <ShieldCheck size={18} color="#ffffff" />
          </div>
          <span className="admin-sidebar-online-dot" />
        </div>
        {!isCollapsed && (
          <div className="admin-sidebar-user-meta">
            <span className="admin-sidebar-user-name">
              {user?.name || 'Parth Patel'}
            </span>
            <span className="admin-sidebar-user-role">
              {user?.role || 'SUPERADMIN'}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
