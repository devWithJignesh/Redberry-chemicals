import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminDataProvider } from './context/AdminDataContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminDataProvider>
          <AppRoutes />
        </AdminDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
