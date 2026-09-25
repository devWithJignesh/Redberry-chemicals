import { BrowserRouter } from 'react-router-dom';
import Header from './components/layout/website/Header/Header';
import Footer from './components/layout/website/Footer/Footer';
import CustomCursor from './components/common/CustomCursor/CustomCursor';
import ScrollProgressBar from './components/common/ScrollProgressBar/ScrollProgressBar';
import BackToTop from './components/common/BackToTop/BackToTop';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      {/* Viewport Scroll Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Interactive Trailing Custom Cursor */}
      <CustomCursor />

      <div className="app-container">
        <Header />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>

      {/* Floating Back to Top Button */}
      <BackToTop />
    </BrowserRouter>
  );
}
