import { createContext, useContext, useState, useEffect } from 'react';
import { CATEGORY_PRODUCTS } from '../data/products';
import { INSECTICIDES } from '../data/insecticides';
import { CUSTOMER_REVIEWS } from '../data/reviews';

const AdminDataContext = createContext(null);

const STORAGE_KEYS = {
  PRODUCTS: 'redberry_admin_products',
  SUB_PRODUCTS: 'redberry_admin_sub_products',
  REVIEWS: 'redberry_admin_reviews',
  INQUIRIES: 'redberry_admin_inquiries',
};

const INITIAL_INQUIRIES = [
  {
    id: 'inq-101',
    name: 'Shailesh Patel',
    email: 'shailesh.farm@gmail.com',
    phone: '9876543210',
    subject: 'Distributor Inquiry for Saurashtra Region',
    category: 'Dealership / Distribution',
    message: 'We operate 3 agro-input retail outlets in Rajkot & Junagadh. Interested in stocking Redberry Aadhira, Bitcoin, and Chlocyp 505 for the upcoming cotton and groundnut season. Please share dealership price sheet and credit terms.',
    status: 'Pending',
    priority: 'High',
    date: '2026-09-28',
    notes: 'Awaiting phone follow-up by regional sales manager.',
  },
  {
    id: 'inq-102',
    name: 'Dr. Arvind Sharma',
    email: 'arvind.horticulture@yahoo.com',
    phone: '9822334455',
    subject: 'Bulk Order of Water-Soluble Fertilizers',
    category: 'Bulk Procurement',
    message: 'Requesting quotation for 2 metric tons of specialty water-treatment and NPK foliar grades for our greenhouse research park near Vadodara.',
    status: 'In Progress',
    priority: 'Urgent',
    date: '2026-09-27',
    notes: 'Quotation draft prepared by agronomy team.',
  },
  {
    id: 'inq-103',
    name: 'Manish Verma',
    email: 'manish.agri@outlook.com',
    phone: '9711223344',
    subject: 'Technical query regarding Emamectin Benzoate 5% SG',
    category: 'Product Inquiry',
    message: 'Need dosage recommendation for Diamondback Moth on late-stage cabbage and cauliflower crops in cooler weather conditions.',
    status: 'Resolved',
    priority: 'Normal',
    date: '2026-09-25',
    notes: 'Technical advisory sent via email and WhatsApp.',
  },
  {
    id: 'inq-104',
    name: 'Gaurav Kothari',
    email: 'gkothari.agro@gmail.com',
    phone: '9426001122',
    subject: 'Sub-dealership inquiry in Anand & Kheda',
    category: 'Dealership / Distribution',
    message: 'We are an established agro-store near Anand grid. We have direct farmer reach of 1,200+ tobacco and vegetable growers. Please contact us.',
    status: 'Pending',
    priority: 'High',
    date: '2026-09-29',
    notes: '',
  },
];

export function AdminDataProvider({ children }) {
  // 1. PRODUCTS
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default seed
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

  // 2. SUB-PRODUCTS
  const [subProducts, setSubProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUB_PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default seed
    return INSECTICIDES.map((item, idx) => ({
      id: `sub-${idx + 1}`,
      slug: item.slug,
      name: item.name,
      category: item.category || 'Insecticides',
      technicalName: item.technicalName || '',
      formulation: item.formulation || '',
      chemicalGroup: item.chemicalGroup || '',
      shortDescription: item.shortDescription || '',
      description: item.description || '',
      targetPests: item.targetPests || '',
      recommendedCrops: item.recommendedCrops || '',
      dosage: item.dosage || '',
      packagingSizes: Array.isArray(item.packagingSizes) ? item.packagingSizes : ['100 ml', '250 ml', '500 ml', '1 Litre'],
      image: item.image || '/images/products/premium_dummy.jpg',
      status: 'Active',
      createdAt: '2026-08-20',
    }));
  });

  // 3. CUSTOMER REVIEWS
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return CUSTOMER_REVIEWS.map((rev) => ({
      ...rev,
      status: 'Approved',
    }));
  });

  // 4. INQUIRIES
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_INQUIRIES;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUB_PRODUCTS, JSON.stringify(subProducts));
    } catch (e) {
      console.error(e);
    }
  }, [subProducts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

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
  const addSubProduct = (item) => {
    const newSubProduct = {
      ...item,
      id: `sub-${Date.now()}`,
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
    return newSubProduct;
  };

  const updateSubProduct = (id, updatedFields) => {
    let updatedItem = null;
    setSubProducts((prev) =>
      prev.map((item) => {
        if (item.id === id || item.slug === id) {
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
    return updatedItem;
  };

  const deleteSubProduct = (id) => {
    setSubProducts((prev) => prev.filter((p) => p.id !== id && p.slug !== id));
  };

  const getSubProductById = (id) => {
    return subProducts.find((p) => p.id === id || p.slug === id);
  };

  // --- CRUD: CUSTOMER REVIEW ---
  const addReview = (item) => {
    const newReview = {
      ...item,
      id: `rev-${Date.now()}`,
      date: item.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      rate: Number(item.rate) || 5,
      verified: item.verified !== undefined ? Boolean(item.verified) : true,
      status: item.status || 'Approved',
      image: item.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    };
    setReviews((prev) => [newReview, ...prev]);
    return newReview;
  };

  const updateReview = (id, updatedFields) => {
    let updatedItem = null;
    setReviews((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          updatedItem = {
            ...item,
            ...updatedFields,
            rate: updatedFields.rate !== undefined ? Number(updatedFields.rate) : item.rate,
            verified: updatedFields.verified !== undefined ? Boolean(updatedFields.verified) : item.verified,
          };
          return updatedItem;
        }
        return item;
      })
    );
    return updatedItem;
  };

  const deleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const getReviewById = (id) => {
    return reviews.find((r) => r.id === id);
  };

  // --- CRUD: INQUIRY ---
  const addInquiry = (item) => {
    const newInquiry = {
      ...item,
      id: `inq-${Date.now()}`,
      date: item.date || new Date().toISOString().split('T')[0],
      status: item.status || 'Pending',
      priority: item.priority || 'Normal',
      notes: item.notes || '',
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateInquiry = (id, updatedFields) => {
    let updatedItem = null;
    setInquiries((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          updatedItem = { ...item, ...updatedFields };
          return updatedItem;
        }
        return item;
      })
    );
    return updatedItem;
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  const getInquiryById = (id) => {
    return inquiries.find((i) => i.id === id);
  };

  // Reset to default seed
  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.SUB_PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
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
