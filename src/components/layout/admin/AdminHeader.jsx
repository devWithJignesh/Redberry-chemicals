import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function AdminHeader({ onOpenMobileSidebar }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Derive capitalized breadcrumb title from path
  const getBreadcrumbTitle = (pathname) => {
    if (pathname.includes('/admin/dashboard')) return 'DASHBOARD';
    if (pathname.includes('/admin/products/add')) return 'PRODUCT / ADD NEW';
    if (pathname.includes('/admin/products/edit')) return 'PRODUCT / EDIT RECORD';
    if (pathname.includes('/admin/products/delete')) return 'PRODUCT / DELETE CONFIRMATION';
    if (pathname.includes('/admin/products')) return 'PRODUCT / LIST';
    
    if (pathname.includes('/admin/sub-products/add')) return 'SUB-PRODUCT / ADD NEW';
    if (pathname.includes('/admin/sub-products/edit')) return 'SUB-PRODUCT / EDIT RECORD';
    if (pathname.includes('/admin/sub-products/delete')) return 'SUB-PRODUCT / DELETE CONFIRMATION';
    if (pathname.includes('/admin/sub-products')) return 'SUB-PRODUCT / LIST';
    
    if (pathname.includes('/admin/reviews/add')) return 'CUSTOMER REVIEW / ADD NEW';
    if (pathname.includes('/admin/reviews/edit')) return 'CUSTOMER REVIEW / EDIT RECORD';
    if (pathname.includes('/admin/reviews/delete')) return 'CUSTOMER REVIEW / DELETE CONFIRMATION';
    if (pathname.includes('/admin/reviews')) return 'CUSTOMER REVIEW / LIST';
    
    if (pathname.includes('/admin/inquiries/add')) return 'INQUIRY / CREATE NEW';
    if (pathname.includes('/admin/inquiries/edit')) return 'INQUIRY / UPDATE STATUS';
    if (pathname.includes('/admin/inquiries/delete')) return 'INQUIRY / DELETE CONFIRMATION';
    if (pathname.includes('/admin/inquiries')) return 'INQUIRY / LIST';

    return 'ADMIN PANEL';
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button
          type="button"
          className="admin-sidebar-toggle-btn mobile-only-btn"
          onClick={onOpenMobileSidebar}
          style={{ display: 'none' }}
          aria-label="Open Mobile Menu"
        >
          <Menu size={16} />
        </button>

        <div className="admin-breadcrumbs">
          <Link to="/admin/dashboard" className="btn-admin-header-link" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}>
            ADMIN
          </Link>
          <span className="admin-breadcrumb-sep">/</span>
          <span className="admin-breadcrumb-item active">{getBreadcrumbTitle(location.pathname)}</span>
        </div>
      </div>

      <div className="admin-header-right">
        {/* SuperAdmin Role Tag */}
        <div className="admin-superadmin-tag">
          <Shield size={14} strokeWidth={2.5} />
          <span>{user?.role || 'SUPERADMIN'}</span>
        </div>

        {/* Secure Logout action button */}
        <button
          type="button"
          className="btn-admin-logout"
          onClick={handleLogout}
          title="Sign out of SuperAdmin session and return to public website"
        >
          <LogOut size={14} />
          <span>LOGOUT</span>
        </button>
      </div>
    </header>
  );
}
