import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function AdminHeader({ onOpenMobileSidebar }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Derive capitalized breadcrumb title from path
  const getBreadcrumbTitle = (pathname) => {
    if (pathname.includes('/admin/dashboard')) return 'Dashboard';
    if (pathname.includes('/admin/products/add')) return 'Product / Add New';
    if (pathname.includes('/admin/products/edit')) return 'Product / Edit Record';
    if (pathname.includes('/admin/products/delete')) return 'Product / Delete Confirmation';
    if (pathname.includes('/admin/products')) return 'Product / List';
    
    if (pathname.includes('/admin/sub-products/add')) return 'Sub-Product / Add New';
    if (pathname.includes('/admin/sub-products/edit')) return 'Sub-Product / Edit Record';
    if (pathname.includes('/admin/sub-products/delete')) return 'Sub-Product / Delete Confirmation';
    if (pathname.includes('/admin/sub-products')) return 'Sub-Product / List';
    
    if (pathname.includes('/admin/reviews/add')) return 'Customer Review / Add New';
    if (pathname.includes('/admin/reviews/edit')) return 'Customer Review / Edit Record';
    if (pathname.includes('/admin/reviews/delete')) return 'Customer Review / Delete Confirmation';
    if (pathname.includes('/admin/reviews')) return 'Customer Review / List';
    
    if (pathname.includes('/admin/inquiries/add')) return 'Inquiry / Create New';
    if (pathname.includes('/admin/inquiries/edit')) return 'Inquiry / Update Status';
    if (pathname.includes('/admin/inquiries/delete')) return 'Inquiry / Delete Confirmation';
    if (pathname.includes('/admin/inquiries')) return 'Inquiry / List';

    return 'Admin Panel';
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
            Admin
          </Link>
          <span className="admin-breadcrumb-sep">/</span>
          <span className="admin-breadcrumb-item active">{getBreadcrumbTitle(location.pathname)}</span>
        </div>
      </div>

      <div className="admin-header-right">
        {/* SuperAdmin Role Tag */}
        <div className="admin-superadmin-tag">
          <Shield size={14} strokeWidth={2.5} />
          <span>{user?.role || 'Super Admin'}</span>
        </div>

        {/* Secure Logout action button */}
        <button
          type="button"
          className="btn-admin-logout"
          onClick={handleLogout}
          title="Sign out of SuperAdmin session and return to public website"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
