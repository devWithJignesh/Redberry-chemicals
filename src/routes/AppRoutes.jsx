import { Routes, Route, Navigate } from 'react-router-dom';

// Public Website Layout & Pages
import WebsiteLayout from '../components/layout/website/WebsiteLayout';
import Home from '../modules/website/home/Home';
import About from '../modules/website/about/About';
import Products from '../modules/website/products/Products';
import ProductDetails from '../modules/website/products/ProductDetails';
import Contact from '../modules/website/contact/Contact';

// Admin Auth & Protected Route
import AdminLogin from '../modules/admin/login/AdminLogin';
import AdminProtectedRoute from '../components/auth/AdminProtectedRoute';
import AdminLayout from '../components/layout/admin/AdminLayout';

// Admin Dashboard
import AdminDashboard from '../modules/admin/dashboard/AdminDashboard';

// Admin Product CRUD
import ProductList from '../modules/admin/products/ProductList';
import ProductForm from '../modules/admin/products/ProductForm';
import ProductDelete from '../modules/admin/products/ProductDelete';

// Admin Sub-Product CRUD
import SubProductList from '../modules/admin/subProducts/SubProductList';
import SubProductForm from '../modules/admin/subProducts/SubProductForm';
import SubProductDelete from '../modules/admin/subProducts/SubProductDelete';

// Admin Customer Review CRUD
import ReviewList from '../modules/admin/reviews/ReviewList';
import ReviewForm from '../modules/admin/reviews/ReviewForm';
import ReviewDelete from '../modules/admin/reviews/ReviewDelete';

// Admin Inquiry CRUD
import InquiryList from '../modules/admin/inquiries/InquiryList';
import InquiryForm from '../modules/admin/inquiries/InquiryForm';
import InquiryDelete from '../modules/admin/inquiries/InquiryDelete';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Website Routes wrapped in WebsiteLayout */}
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin Login Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/login" element={<AdminLogin />} />

      {/* Protected Admin Routes (SuperAdmin Role Enforced) */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        {/* Default Admin Route -> Dashboard */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />

        {/* 1. PRODUCT CRUD */}
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />
        <Route path="products/delete/:id" element={<ProductDelete />} />

        {/* 2. SUB-PRODUCT CRUD */}
        <Route path="sub-products" element={<SubProductList />} />
        <Route path="sub-products/add" element={<SubProductForm />} />
        <Route path="sub-products/edit/:id" element={<SubProductForm />} />
        <Route path="sub-products/delete/:id" element={<SubProductDelete />} />

        {/* 3. CUSTOMER REVIEW CRUD */}
        <Route path="reviews" element={<ReviewList />} />
        <Route path="reviews/add" element={<ReviewForm />} />
        <Route path="reviews/edit/:id" element={<ReviewForm />} />
        <Route path="reviews/delete/:id" element={<ReviewDelete />} />

        {/* 4. INQUIRY CRUD */}
        <Route path="inquiries" element={<InquiryList />} />
        <Route path="inquiries/add" element={<InquiryForm />} />
        <Route path="inquiries/edit/:id" element={<InquiryForm />} />
        <Route path="inquiries/delete/:id" element={<InquiryDelete />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
