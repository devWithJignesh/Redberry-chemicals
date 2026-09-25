import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../modules/website/home/Home';
import About from '../modules/website/about/About';
import Products from '../modules/website/products/Products';
import ProductDetails from '../modules/website/products/ProductDetails';
import Contact from '../modules/website/contact/Contact';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:category" element={<ProductDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
