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
        <span>Super Admin System Online &bull; Secure Session Active</span>
      </div>
    </footer>
  );
}
