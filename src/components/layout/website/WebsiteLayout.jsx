import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import CustomCursor from '../../common/CustomCursor/CustomCursor';
import ScrollProgressBar from '../../common/ScrollProgressBar/ScrollProgressBar';
import BackToTop from '../../common/BackToTop/BackToTop';

export default function WebsiteLayout() {
  return (
    <div className="app-container">
      {/* Viewport Scroll Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Interactive Trailing Custom Cursor */}
      <CustomCursor />

      {/* Public Header with Login Button */}
      <Header />

      {/* Public Main Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Public Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
