import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminDataProvider } from './context/AdminDataContext';
import { ToastProvider } from './context/ToastContext';
import { LoadingProvider } from './context/LoadingContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <ToastProvider>
          <AuthProvider>
            <AdminDataProvider>
              <AppRoutes />
            </AdminDataProvider>
          </AuthProvider>
        </ToastProvider>
      </LoadingProvider>
    </BrowserRouter>
  );
}
