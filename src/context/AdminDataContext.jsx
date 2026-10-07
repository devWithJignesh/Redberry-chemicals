import { createContext, useContext, useState, useEffect } from 'react';
import { CATEGORY_PRODUCTS } from '../data/products';
import { 
  getSubProductsApi, 
  createSubProductApi, 
  updateSubProductApi, 
  deleteSubProductApi 
} from '../api/subProductApi';
import {
  getInquiriesApi,
  createInquiryApi,
  updateInquiryApi,
  deleteInquiryApi,
} from '../api/inquiryApi';
import {
  getReviewsApi,
  createReviewApi,
  updateReviewApi,
  deleteReviewApi,
} from '../api/reviewApi';

const AdminDataContext = createContext(null);

export function AdminDataProvider({ children }) {
  // Clear any existing localStorage data on provider initialization
  useEffect(() => {
    try {
      localStorage.removeItem('redberry_admin_products');
      localStorage.removeItem('redberry_admin_sub_products');
      localStorage.removeItem('redberry_admin_reviews');
      localStorage.removeItem('redberry_admin_inquiries');
      localStorage.removeItem('redberry_admin_auth_user');
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 1. PRODUCTS (In-Memory state only)
  const [products, setProducts] = useState(() => {
    return CATEGORY_PRODUCTS.map((p, idx) => ({
      id: `prod-${idx + 1}`,
      slug: p.slug,
      name: p.name,
      category: p.category,
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      features: Array.isArray(p.features) ? p.features : [],
      image: p.image || '/images/products/premium_dummy.jpg',
      status: 'Active',
      createdAt: '2026-08-15',
    }));
  });

  // 2. SUB-PRODUCTS (Dynamic: loaded from API / CRUD actions)
  const [subProducts, setSubProducts] = useState([]);

  // 3. CUSTOMER REVIEWS (Dynamic: loaded 100% from API / CRUD actions)
  const [reviews, setReviews] = useState([]);

  // 4. INQUIRIES (Dynamic: loaded from API / CRUD actions)
  const [inquiries, setInquiries] = useState([]);

  // Fetch sub-products, inquiries, and reviews from backend API on mount (Single call)
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const [subProdRes, inqRes, revRes] = await Promise.all([
          getSubProductsApi(),
          getInquiriesApi(),
          getReviewsApi(),
        ]);
        if (subProdRes.success && Array.isArray(subProdRes.data) && subProdRes.data.length > 0) {
          setSubProducts(
            subProdRes.data.map((item) => ({
              ...item,
              id: item._id || item.id,
              _id: item._id || item.id,
              productId: item.productId?._id || item.productId,
              parentProductId: item.productId?._id || item.productId || item.parentProductId,
              parentProductName: item.parentProductName || (typeof item.productId === 'object' ? item.productId?.name : 'Agro Chemicals'),
              dosage: item.dosage || '',
              packagingSizes: Array.isArray(item.packagingSizes) ? item.packagingSizes : ['100 ml', '250 ml', '500 ml', '1 Litre'],
              packSizes: Array.isArray(item.packagingSizes) ? item.packagingSizes.join(', ') : (item.packSizes || '100 ml, 250 ml, 500 ml'),
              shortDescription: item.shortDescription || '',
              description: item.description || '',
              image: item.image || (Array.isArray(item.images) && item.images[0]) || '/images/products/premium_dummy.jpg',
              images: Array.isArray(item.images) && item.images.length > 0 ? item.images : [item.image || '/images/products/premium_dummy.jpg'],
              status: item.status || 'Active',
            }))
          );
        }
        if (inqRes.success && Array.isArray(inqRes.data)) {
          setInquiries(
            inqRes.data.map((item) => ({
              ...item,
              id: item._id || item.id,
            }))
          );
        }
        if (revRes.success && Array.isArray(revRes.data) && revRes.data.length > 0) {
          setReviews(
            revRes.data.map((item) => ({
              ...item,
              id: item._id || item.id,
              _id: item._id || item.id,
            }))
          );
        }
      } catch (e) {
        console.warn('API data fetch fallback', e);
      }
    };
    fetchApiData();
  }, []);

  // --- CRUD: PRODUCT ---
  const addProduct = (item) => {
    const newProduct = {
      ...item,
      id: `prod-${Date.now()}`,
      slug: item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      status: item.status || 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      features: Array.isArray(item.features)
        ? item.features
        : (item.features || '').split('\n').filter(Boolean),
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    let updatedItem = null;
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id || item.slug === id) {
          const features = Array.isArray(updatedFields.features)
            ? updatedFields.features
            : typeof updatedFields.features === 'string'
            ? updatedFields.features.split('\n').filter(Boolean)
            : item.features;
          updatedItem = { ...item, ...updatedFields, features };
          return updatedItem;
        }
        return item;
      })
    );
    return updatedItem;
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id && p.slug !== id));
  };

  const getProductById = (id) => {
    return products.find((p) => p.id === id || p.slug === id);
  };

  // --- CRUD: SUB-PRODUCT ---
  const addSubProduct = async (item) => {
    const newSubProduct = {
      ...item,
      id: item.id || `sub-${Date.now()}`,
      slug: item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      status: item.status || 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      packagingSizes: Array.isArray(item.packagingSizes)
        ? item.packagingSizes
        : typeof item.packagingSizes === 'string'
        ? item.packagingSizes.split(',').map((s) => s.trim()).filter(Boolean)
        : ['100 ml', '250 ml', '500 ml'],
    };
    setSubProducts((prev) => [newSubProduct, ...prev]);

    // Backend API Sync only if not already saved to database
    const alreadySaved = item._id || (/^[0-9a-fA-F]{24}$/.test(item.id)) || item.skipApi;
    const apiPayload = {
      name: item.name,
      productId: item.parentProductId || item.productId,
      parentProductName: item.parentProductName,
      dosage: item.dosage,
      packagingSizes: newSubProduct.packagingSizes,
      shortDescription: item.shortDescription,
      description: item.description,
      image: item.image || (Array.isArray(item.images) && item.images[0]),
      images: item.images || [],
      status: item.status || 'Active',
    };
    if (!alreadySaved && apiPayload.productId) {
      try {
        const res = await createSubProductApi(apiPayload);
        if (res.success && res.data) {
          const serverId = res.data._id || res.data.id;
          setSubProducts((prev) =>
            prev.map((sp) => (sp.id === newSubProduct.id ? { ...sp, id: serverId, _id: serverId } : sp))
          );
        }
      } catch (e) {
        console.warn('API sub-product create fallback to context', e);
      }
    }

    return newSubProduct;
  };

  const updateSubProduct = async (id, updatedFields) => {
    let updatedItem = null;
    setSubProducts((prev) =>
      prev.map((item) => {
        if (item.id === id || item.slug === id || item._id === id) {
          const packagingSizes = Array.isArray(updatedFields.packagingSizes)
            ? updatedFields.packagingSizes
            : typeof updatedFields.packagingSizes === 'string'
            ? updatedFields.packagingSizes.split(',').map((s) => s.trim()).filter(Boolean)
            : item.packagingSizes;
          updatedItem = { ...item, ...updatedFields, packagingSizes };
          return updatedItem;
        }
        return item;
      })
    );

    // Backend API Sync if Mongo ID
    if (id && /^[0-9a-fA-F]{24}$/.test(id)) {
      try {
        await updateSubProductApi(id, updatedFields);
      } catch (e) {
        console.warn('API sub-product update fallback', e);
      }
    }

    return updatedItem;
  };

  const deleteSubProduct = async (id) => {
    setSubProducts((prev) => prev.filter((p) => p.id !== id && p.slug !== id && p._id !== id));

    // Backend API Sync if Mongo ID
    if (id && /^[0-9a-fA-F]{24}$/.test(id)) {
      try {
        await deleteSubProductApi(id);
      } catch (e) {
        console.warn('API sub-product delete fallback', e);
      }
    }
  };

  const getSubProductById = (id) => {
    return subProducts.find((p) => p.id === id || p.slug === id || p._id === id);
  };

  // --- CRUD: CUSTOMER REVIEW ---
  const addReview = async (item) => {
    try {
      const res = await createReviewApi(item);
      if (res && res.success && res.data) {
        const serverReview = {
          ...res.data,
          id: res.data._id || res.data.id,
          _id: res.data._id || res.data.id,
        };
        setReviews((prev) => [serverReview, ...prev.filter((r) => (r._id || r.id) !== serverReview.id)]);
        return serverReview;
      }
    } catch (e) {
      console.warn('API review create fallback', e);
    }

    const fallbackReview = {
      ...item,
      id: item.id || item._id || `rev-${Date.now()}`,
      rate: Number(item.rate) || 5,
      image: item.image || '/images/reviews/farmer_1.png',
      createdAt: item.createdAt || new Date().toISOString(),
    };
    setReviews((prev) => [fallbackReview, ...prev]);
    return fallbackReview;
  };

  const updateReview = async (id, updatedFields) => {
    let updatedItem = null;

    if (id && /^[0-9a-fA-F]{24}$/.test(id)) {
      try {
        const res = await updateReviewApi(id, updatedFields);
        if (res && res.success && res.data) {
          const serverData = {
            ...res.data,
            id: res.data._id || res.data.id,
            _id: res.data._id || res.data.id,
          };
          setReviews((prev) =>
            prev.map((item) => ((item.id === id || item._id === id) ? serverData : item))
          );
          return serverData;
        }
      } catch (e) {
        console.warn('API review update fallback', e);
      }
    }

    setReviews((prev) =>
      prev.map((item) => {
        if (item.id === id || item._id === id) {
          updatedItem = {
            ...item,
            ...updatedFields,
            rate: updatedFields.rate !== undefined ? Number(updatedFields.rate) : item.rate,
          };
          return updatedItem;
        }
        return item;
      })
    );

    return updatedItem;
  };

  const deleteReview = async (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id && r._id !== id));

    if (id && /^[0-9a-fA-F]{24}$/.test(id)) {
      try {
        await deleteReviewApi(id);
      } catch (e) {
        console.warn('API review delete fallback', e);
      }
    }
  };

  const getReviewById = (id) => {
    return reviews.find((r) => r.id === id || r._id === id);
  };

  // --- CRUD: INQUIRY ---
  const addInquiry = async (item) => {
    const newInquiry = {
      ...item,
      id: item.id || item._id || `inq-${Date.now()}`,
      status: item.status || 'Pending',
      createdAt: item.createdAt || new Date().toISOString(),
    };
    setInquiries((prev) => [newInquiry, ...prev]);

    try {
      const res = await createInquiryApi(item);
      if (res && res.success && res.data) {
        const serverId = res.data._id || res.data.id;
        setInquiries((prev) =>
          prev.map((i) => (i.id === newInquiry.id ? { ...i, ...res.data, id: serverId, _id: serverId } : i))
        );
      }
    } catch (e) {
      console.warn('API inquiry create fallback', e);
    }

    return newInquiry;
  };

  const updateInquiry = async (id, updatedFields) => {
    let updatedItem = null;
    setInquiries((prev) =>
      prev.map((item) => {
        if (item.id === id || item._id === id) {
          updatedItem = { ...item, ...updatedFields };
          return updatedItem;
        }
        return item;
      })
    );

    if (id && /^[0-9a-fA-F]{24}$/.test(id)) {
      try {
        await updateInquiryApi(id, updatedFields);
      } catch (e) {
        console.warn('API inquiry update fallback', e);
      }
    }

    return updatedItem;
  };

  const deleteInquiry = async (id) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id && i._id !== id));

    if (id && /^[0-9a-fA-F]{24}$/.test(id)) {
      try {
        await deleteInquiryApi(id);
      } catch (e) {
        console.warn('API inquiry delete fallback', e);
      }
    }
  };

  const getInquiryById = (id) => {
    return inquiries.find((i) => i.id === id || i._id === id);
  };

  // Reset to default state
  const resetAllData = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  return (
    <AdminDataContext.Provider
      value={{
        products,
        subProducts,
        reviews,
        inquiries,
        // Product CRUD
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        // SubProduct CRUD
        addSubProduct,
        updateSubProduct,
        deleteSubProduct,
        getSubProductById,
        // Review CRUD
        addReview,
        updateReview,
        deleteReview,
        getReviewById,
        // Inquiry CRUD
        addInquiry,
        updateInquiry,
        deleteInquiry,
        getInquiryById,
        // Utilities
        resetAllData,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}
