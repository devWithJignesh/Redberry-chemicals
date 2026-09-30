export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="admin-footer">
      <div className="admin-footer-left">
        <span>
          &copy; {currentYear} <strong>Redberry Agri Sciences Pvt Ltd</strong>. All rights reserved.
        </span>
      </div>
      <div className="admin-footer-status">
        <span className="admin-status-dot"></span>
        <span>SUPERADMIN SYSTEM ONLINE &bull; SECURE SESSION ACTIVE</span>
      </div>
    </footer>
  );
}
