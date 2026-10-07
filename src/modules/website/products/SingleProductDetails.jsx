/* ============================================
   SINGLE PRODUCT DETAILS COMPONENT
   FILE: SingleProductDetails.jsx
   Clean, Modern, Responsive Product Catalog View UI
   (Pure View & Product Inquiry Mode - No E-commerce)
   ============================================ */

import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Package,
  CheckCircle2,
  ArrowLeft,
  Send,
  AlertCircle,
  Droplet,
  Bug,
  Star,
  ChevronRight,
  ChevronLeft,
  Leaf,
  Check,
  Calendar,
  Lock,
  Home,
  X,
  Sparkles,
  FlaskConical,
  Layers,
  Sprout,
  Shield,
  PhoneCall,
  FileText,
  BadgeCheck,
  Award
} from 'lucide-react';

import { getProductByIdApi, getProductsApi } from '../../../api/productApi';
import { getSubProductByIdApi, getSubProductsApi, getSubProductsByProductIdApi } from '../../../api/subProductApi';
import { useAdminData } from '../../../context/AdminDataContext';
import { scrollToTop } from '../../../utils/helpers';
import { PageSpinner } from '../../../components/common/Loader/PageSpinner';
import './SingleProductDetails.css';

export default function SingleProductDetails() {
  const { id } = useParams();
  const { subProducts: contextSubProducts, products: contextProducts } = useAdminData();
  const relatedCarouselRef = useRef(null);

  // States
  const [product, setProduct] = useState(null);
  const [parentProduct, setParentProduct] = useState(null);
  const [subProductsList, setSubProductsList] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'specs' | 'reviews'
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgFading, setImgFading] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Inquiry Modal State
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    message: ''
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Scroll related products carousel
  const scrollRelated = (direction) => {
    if (relatedCarouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      relatedCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Auto scroll carousel when not hovered
  useEffect(() => {
    if (!otherProducts || otherProducts.length <= 1 || isCarouselHovered) return;

    const autoSlideTimer = setInterval(() => {
      if (relatedCarouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = relatedCarouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          relatedCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          relatedCarouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(autoSlideTimer);
  }, [otherProducts, isCarouselHovered]);

  // Fetch product data
  useEffect(() => {
    scrollToTop();

    const fetchProductDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let foundProduct = null;
        let baseProduct = null;

        // 1. Try fetching as Main Product from API if valid ObjectId
        if (id && /^[0-9a-fA-F]{24}$/.test(id)) {
          try {
            const res = await getProductByIdApi(id);
            if (res.success && res.data) {
              foundProduct = res.data;
              baseProduct = res.data;
            }
          } catch (e) {
            // Continue fallback
          }
        }

        // 2. Try fetching as Sub-Product from API if valid ObjectId
        if (!foundProduct && id && /^[0-9a-fA-F]{24}$/.test(id)) {
          try {
            const subRes = await getSubProductByIdApi(id);
            if (subRes.success && subRes.data) {
              const sp = subRes.data;
              foundProduct = {
                _id: sp._id || sp.id,
                id: sp._id || sp.id,
                name: sp.name,
                category: sp.parentProductName || sp.productId?.name || 'Fungicides',
                dosage: sp.dosage,
                targetPests: sp.targetPests,
                formulation: sp.formulation,
                chemicalComposition: sp.chemicalComposition || sp.composition,
                packSizes: Array.isArray(sp.packagingSizes) && sp.packagingSizes.length > 0
                  ? sp.packagingSizes
                  : ['250 ml', '500 ml', '1 Litre', '200 Litres (Drum)'],
                shortDescription: sp.shortDescription,
                description: sp.description,
                images: Array.isArray(sp.images) && sp.images.length > 0 ? sp.images : (sp.image ? [sp.image] : []),
                image: sp.image || (Array.isArray(sp.images) && sp.images[0]) || '/images/products/premium_dummy.jpg',
                status: sp.status || 'Active',
                isSubProduct: true,
                parentProductId: sp.productId?._id || sp.productId || '',
              };
              if (sp.productId && typeof sp.productId === 'object') {
                baseProduct = sp.productId;
              }
            }
          } catch (e) {
            // Continue fallback
          }
        }

        // 3. Fallback: Search in all products from API
        if (!foundProduct) {
          try {
            const res = await getProductsApi({ limit: 100 });
            if (res.success && res.data?.products) {
              const list = res.data.products;
              foundProduct = list.find((p) => p._id === id || p.id === id);
              if (foundProduct) baseProduct = foundProduct;
            }
          } catch (e) { }
        }

        // 4. Fallback: Search in local sub-products context
        if (!foundProduct && contextSubProducts && contextSubProducts.length > 0) {
          const spContext = contextSubProducts.find((s) => s.id === id || s._id === id || s.slug === id);
          if (spContext) {
            foundProduct = {
              _id: spContext.id || spContext._id,
              id: spContext.id || spContext._id,
              name: spContext.name,
              category: spContext.parentProductName || spContext.category || 'Fungicides',
              dosage: spContext.dosage,
              targetPests: spContext.targetPests,
              formulation: spContext.formulation,
              packSizes: Array.isArray(spContext.packagingSizes) && spContext.packagingSizes.length > 0
                ? spContext.packagingSizes
                : ['250 ml', '500 ml', '1 Litre', '200 Litres (Drum)'],
              shortDescription: spContext.shortDescription,
              description: spContext.description,
              images: Array.isArray(spContext.images) && spContext.images.length > 0 ? spContext.images : [spContext.image || '/images/products/premium_dummy.jpg'],
              image: spContext.image,
              status: spContext.status || 'Active',
              isSubProduct: true,
              parentProductId: spContext.parentProductId || spContext.productId,
            };
          }
        }

        // 5. Fallback: Search in local products context
        if (!foundProduct && contextProducts && contextProducts.length > 0) {
          const pContext = contextProducts.find((p) => p.id === id || p.slug === id);
          if (pContext) {
            foundProduct = pContext;
            baseProduct = pContext;
          }
        }

        if (foundProduct) {
          setProduct(foundProduct);
          setActiveImageIndex(0);

          // Default selected package
          const sizes = Array.isArray(foundProduct.packSizes) && foundProduct.packSizes.length > 0
            ? foundProduct.packSizes
            : ['250 ml', '500 ml', '1 Litre', '200 Litres (Drum)'];
          setSelectedPackage(sizes[0]);

          // Fetch Sub-Products / related
          const targetParentId = baseProduct?._id || baseProduct?.id || foundProduct.parentProductId || foundProduct._id || foundProduct.id;
          let relatedSubList = [];

          if (targetParentId) {
            try {
              const subRes = await getSubProductsByProductIdApi(targetParentId);
              if (subRes.success && Array.isArray(subRes.data)) {
                relatedSubList = subRes.data;
              }
            } catch (e) {
              try {
                const fallbackSubRes = await getSubProductsApi({ productId: targetParentId });
                if (fallbackSubRes.success && Array.isArray(fallbackSubRes.data)) {
                  relatedSubList = fallbackSubRes.data;
                }
              } catch (err) { }
            }
          }

          if (relatedSubList.length === 0 && contextSubProducts) {
            relatedSubList = contextSubProducts.filter(
              (s) =>
                s.parentProductId === targetParentId ||
                s.productId === targetParentId ||
                s.parentProductName === (baseProduct?.name || foundProduct?.name)
            );
          }

          setSubProductsList(relatedSubList);
          setParentProduct(baseProduct);
        } else {
          setError('Product not found in catalog.');
        }

        // Fetch other products for related section
        try {
          const otherRes = await getProductsApi({ limit: 10 });
          if (otherRes.success && otherRes.data?.products) {
            const list = otherRes.data.products;
            setOtherProducts(list.filter((p) => p._id !== foundProduct?._id && p.id !== foundProduct?.id));
          }
        } catch (e) { }
      } catch (err) {
        setError(err.message || 'Failed to load product details from backend API');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  // Extract real product images
  const galleryImages = useMemo(() => {
    if (!product) return [];

    const extracted = [];

    if (Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach((img) => {
        if (typeof img === 'string' && img.trim() && !extracted.includes(img.trim())) {
          extracted.push(img.trim());
        } else if (img && typeof img === 'object' && img.url && !extracted.includes(img.url)) {
          extracted.push(img.url);
        }
      });
    }

    if (product.image && typeof product.image === 'string' && product.image.trim() && !extracted.includes(product.image.trim())) {
      extracted.unshift(product.image.trim());
    }

    if (extracted.length === 0) {
      extracted.push('/images/products/premium_dummy.jpg');
    }

    return extracted;
  }, [product]);

  // Image switch handler with subtle fade
  const handleImageSelect = (index) => {
    if (index === activeImageIndex) return;
    setImgFading(true);
    setTimeout(() => {
      setActiveImageIndex(index);
      setImgFading(false);
    }, 150);
  };

  const handlePrevImage = () => {
    if (galleryImages.length <= 1) return;
    const newIdx = (activeImageIndex - 1 + galleryImages.length) % galleryImages.length;
    handleImageSelect(newIdx);
  };

  const handleNextImage = () => {
    if (galleryImages.length <= 1) return;
    const newIdx = (activeImageIndex + 1) % galleryImages.length;
    handleImageSelect(newIdx);
  };

  // Dynamic Pack Sizes
  const packSizes = useMemo(() => {
    if (product?.packSizes && Array.isArray(product.packSizes) && product.packSizes.length > 0) {
      return product.packSizes.filter((p) => p && typeof p === 'string' && p.trim());
    }
    return ['250 ml', '500 ml', '1 Litre', '200 Litres (Drum)'];
  }, [product]);

  // Dynamic Features List
  const featuresList = useMemo(() => {
    if (product?.features) {
      if (Array.isArray(product.features) && product.features.length > 0) {
        return product.features.filter((f) => typeof f === 'string' && f.trim());
      }
      if (typeof product.features === 'string' && product.features.trim()) {
        return product.features.split('\n').map((f) => f.trim()).filter(Boolean);
      }
    }
    return [
      'Effective against a wide range of insects',
      'Long lasting protection',
      'Improves plant health & growth',
      'Suitable for multiple crops',
      'Easy to use & quick absorption'
    ];
  }, [product]);

  // Open modal
  const handleOpenInquiry = () => {
    setInquirySubmitted(false);
    setInquiryModalOpen(true);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  if (isLoading) {
    return <PageSpinner fullPage={true} />;
  }

  if (error || !product) {
    return (
      <div className="spd-error-screen">
        <div className="spd-error-card">
          <div className="spd-error-icon-wrap">
            <AlertCircle size={40} />
          </div>
          <h2>Product Not Found</h2>
          <p>{error || 'The requested product record is missing or deleted.'}</p>
          <Link to="/products" className="spd-btn-back-catalog">
            <ArrowLeft size={16} />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const currentImage = galleryImages[activeImageIndex] || galleryImages[0] || '';
  const categoryName = product.category || 'Fungicides';
  const productName = product.name || 'Flora Guard Insecticide Lavender Pro';
  const shortDesc = product.shortDescription
    ? product.shortDescription.replace(/<[^>]+>/g, '')
    : 'Protect your crops with advanced insect control for healthier plants and better yields.';

  return (
    <div className="spd-page">

      {/* ── 1. Top Breadcrumb Bar ── */}
      <div className="spd-breadcrumb-bar">
        <div className="container">
          <div className="spd-breadcrumb-inner">
            <Link to="/" className="spd-bc-link">
              <Home size={15} />
            </Link>
            <span className="spd-bc-sep">/</span>
            <Link to="/products" className="spd-bc-link">Products</Link>
            <span className="spd-bc-sep">/</span>
            <Link to="/products" className="spd-bc-link">{categoryName}</Link>
            <span className="spd-bc-sep">/</span>
            <span className="spd-bc-current">{productName}</span>
          </div>
        </div>
      </div>

      {/* ── 2. Hero 3-Column Section (Gallery | Info & Inquiries | Features & Suitable) ── */}
      <section className="spd-hero-section">
        <div className="container">
          <div className="spd-hero-grid">

            {/* ── Col 1: Left Gallery Showcase ── */}
            <div className="spd-hero-left-col">
              <div className="spd-gallery-card">
                <div className="spd-main-showcase">
                  {/* Best Seller Badge */}
                  <span className="spd-badge-bestseller">
                    <Star size={12} fill="#ffffff" />
                    Best Seller
                  </span>

                  {/* Counter Badge */}
                  <span className="spd-badge-counter">
                    {activeImageIndex + 1}/{galleryImages.length > 0 ? galleryImages.length : 1}
                  </span>

                  {/* Nav Arrows */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="spd-showcase-nav-btn prev"
                        onClick={handlePrevImage}
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        className="spd-showcase-nav-btn next"
                        onClick={handleNextImage}
                        aria-label="Next image"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}

                  {/* Main Product Image */}
                  <img
                    src={currentImage}
                    alt={productName}
                    className={imgFading ? 'fading' : ''}
                    onError={(e) => {
                      e.target.src = '/images/products/premium_dummy.jpg';
                    }}
                  />
                </div>

                {/* Thumbnails Row */}
                {galleryImages.length > 1 && (
                  <div className="spd-thumbnails-strip">
                    {galleryImages.slice(0, 4).map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`spd-thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                        onClick={() => handleImageSelect(idx)}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          onError={(e) => {
                            e.target.src = '/images/products/premium_dummy.jpg';
                          }}
                        />
                        {idx === 3 && galleryImages.length > 4 && (
                          <div className="spd-thumb-more-overlay">
                            +{galleryImages.length - 3}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Col 2: Center Info, Packaging & Action Inquiry ── */}
            <div className="spd-hero-center-col">
              {/* Category Pill */}
              <span className="spd-category-pill">{categoryName}</span>

              {/* Product Title */}
              <h1 className="spd-product-title">{productName}</h1>

              {/* Rating + Trusted Farmer Badge */}
              <div className="spd-rating-trust-row">
                <div className="spd-stars-wrap">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#F59E0B" stroke="#F59E0B" />
                  ))}
                  <span className="spd-rating-score-text">4.8</span>
                  <span className="spd-rating-count-text">(120 Reviews)</span>
                </div>

                <div className="spd-trust-badge">
                  <BadgeCheck size={14} />
                  <span>Trusted by 5,000+ Farmers</span>
                </div>
              </div>

              {/* Short Summary Description */}
              <p className="spd-short-desc-text">{shortDesc}</p>

              {/* Available Packaging */}
              <div className="spd-pack-block">
                <span className="spd-pack-label">Available Packaging</span>
                <div className="spd-pack-pills-row">
                  {packSizes.map((size) => {
                    const isSelected = selectedPackage === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        className={`spd-pack-pill-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedPackage(size)}
                      >
                        {isSelected && <Check size={13} strokeWidth={3} />}
                        <span>{size}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Inquiry Buttons */}
              <div className="spd-actions-cta-row">
                <button
                  type="button"
                  className="spd-btn-inquiry-primary"
                  onClick={handleOpenInquiry}
                >
                  <Send size={16} />
                  <span>Send Product Inquiry</span>
                </button>

                <Link to="/contact" className="spd-btn-contact-outline">
                  <PhoneCall size={16} />
                  <span>Contact Technical Support</span>
                </Link>
              </div>

              {/* Trust & Quality Assurance Strip */}
              <div className="spd-trust-badges-strip">
                <div className="spd-trust-item">
                  <div className="spd-trust-icon-box">
                    <Award size={16} />
                  </div>
                  <div className="spd-trust-text-stack">
                    <span className="spd-trust-title">CIB Certified</span>
                    <span className="spd-trust-sub">100% Genuine Quality</span>
                  </div>
                </div>

                <div className="spd-trust-item">
                  <div className="spd-trust-icon-box">
                    <Shield size={16} />
                  </div>
                  <div className="spd-trust-text-stack">
                    <span className="spd-trust-title">Govt. Standard</span>
                    <span className="spd-trust-sub">Approved Formulations</span>
                  </div>
                </div>

                <div className="spd-trust-item">
                  <div className="spd-trust-icon-box">
                    <Sprout size={16} />
                  </div>
                  <div className="spd-trust-text-stack">
                    <span className="spd-trust-title">Expert Advice</span>
                    <span className="spd-trust-sub">Free Crop Guidance</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Col 3: Right Features & Crops Card ── */}
            <div className="spd-hero-right-col">
              <h3 className="spd-side-sec-title">
                <Leaf size={18} className="spd-leaf-icon" />
                Key Features & Benefits
              </h3>

              <ul className="spd-features-checklist">
                {featuresList.slice(0, 5).map((feat, idx) => (
                  <li key={idx} className="spd-feature-check-item">
                    <div className="spd-check-icon-circle">
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span>{typeof feat === 'string' ? feat.replace(/<[^>]+>/g, '') : feat}</span>
                  </li>
                ))}
              </ul>

              {/* Suitable For Crops */}
              <div className="spd-suitable-block">
                <h4 className="spd-suitable-title">Suitable For</h4>
                <div className="spd-crops-grid">
                  <div className="spd-crop-item">
                    <div className="spd-crop-icon-box">🥦</div>
                    <span className="spd-crop-name">Vegetables</span>
                  </div>
                  <div className="spd-crop-item">
                    <div className="spd-crop-icon-box">🍎</div>
                    <span className="spd-crop-name">Fruits</span>
                  </div>
                  <div className="spd-crop-item">
                    <div className="spd-crop-icon-box">🌾</div>
                    <span className="spd-crop-name">Cotton</span>
                  </div>
                  <div className="spd-crop-item">
                    <div className="spd-crop-icon-box">🌱</div>
                    <span className="spd-crop-name">Cereals</span>
                  </div>
                </div>
              </div>

              {/* Right Card Highlight Box */}
              <div className="spd-right-highlight-box">
                <Leaf size={22} className="spd-rh-icon" />
                <div>
                  <h5 className="spd-rh-title">Healthier Plants</h5>
                  <p className="spd-rh-sub">Higher Yields</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Middle Tabbed Section ── */}
      <section className="spd-tabbed-section">
        <div className="container">
          <div className="spd-tab-card">

            {/* Tabs Header */}
            <div className="spd-tabs-bar">
              <button
                type="button"
                className={`spd-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <Layers size={16} />
                <span>Product Details</span>
              </button>

              <button
                type="button"
                className={`spd-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                <FlaskConical size={16} />
                <span>Specifications</span>
              </button>

              <button
                type="button"
                className={`spd-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                <Star size={16} />
                <span>Reviews (120)</span>
              </button>
            </div>

            {/* Tab 1: Product Details (3 Column Content Layout) */}
            {activeTab === 'details' && (
              <div className="spd-tab-content-grid">

                {/* Sub-Col 1: About & How to Use */}
                <div className="spd-tab-about-col">
                  <div>
                    <h3 className="spd-tab-sec-heading">
                      <Leaf size={18} color="#0F6B4F" />
                      About This Product
                    </h3>
                    <p className="spd-tab-text">
                      {product.description
                        ? product.description.replace(/<[^>]+>/g, '')
                        : `${productName} is a highly effective crop protection formulation designed to protect your crops from harmful pests. It ensures healthy plant growth, better flowering and higher productivity. With its advanced formula, it provides long-lasting protection and is safe when used as per the directions.`}
                    </p>
                  </div>

                  <div>
                    <h3 className="spd-tab-sec-heading">
                      <Droplet size={18} color="#0F6B4F" />
                      How to Use
                    </h3>
                    <ul className="spd-usage-bullets">
                      <li className="spd-usage-item">Shake well before use</li>
                      <li className="spd-usage-item">Mix the recommended quantity with water</li>
                      <li className="spd-usage-item">Apply as per crop and pest infestation</li>
                      <li className="spd-usage-item">Use during early morning or late evening for best results</li>
                    </ul>
                  </div>
                </div>

                {/* Sub-Col 2: Key Features at a Glance */}
                <div className="spd-tab-specs-col">
                  <h3 className="spd-tab-sec-heading">
                    <Sparkles size={18} color="#0F6B4F" />
                    Key Features at a Glance
                  </h3>

                  <div className="spd-specs-rows-stack">
                    <div className="spd-spec-row-item">
                      <div className="spd-spec-row-icon-box">
                        <Bug size={16} />
                      </div>
                      <div className="spd-spec-row-content">
                        <span className="spd-spec-row-label">Target Pest</span>
                        <span className="spd-spec-row-value">{product.targetPests || 'Sucking & chewing insects'}</span>
                      </div>
                    </div>

                    <div className="spd-spec-row-item">
                      <div className="spd-spec-row-icon-box">
                        <FlaskConical size={16} />
                      </div>
                      <div className="spd-spec-row-content">
                        <span className="spd-spec-row-label">Formulation</span>
                        <span className="spd-spec-row-value">{product.formulation || 'Liquid (Lavender based)'}</span>
                      </div>
                    </div>

                    <div className="spd-spec-row-item">
                      <div className="spd-spec-row-icon-box">
                        <Droplet size={16} />
                      </div>
                      <div className="spd-spec-row-content">
                        <span className="spd-spec-row-label">Dosage</span>
                        <span className="spd-spec-row-value">{product.dosage || 'As per crop recommendation'}</span>
                      </div>
                    </div>

                    <div className="spd-spec-row-item">
                      <div className="spd-spec-row-icon-box">
                        <Calendar size={16} />
                      </div>
                      <div className="spd-spec-row-content">
                        <span className="spd-spec-row-label">Shelf Life</span>
                        <span className="spd-spec-row-value">2 Years</span>
                      </div>
                    </div>

                    <div className="spd-spec-row-item">
                      <div className="spd-spec-row-icon-box">
                        <Lock size={16} />
                      </div>
                      <div className="spd-spec-row-content">
                        <span className="spd-spec-row-label">Storage</span>
                        <span className="spd-spec-row-value">Keep in a cool, dry place</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-Col 3: Marketing Promo Card Banner */}
                <div className="spd-tab-marketing-col">
                  <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
                    alt="Farm Landscape"
                    className="spd-mkt-bg-img"
                  />
                  <div className="spd-mkt-overlay"></div>

                  <div className="spd-mkt-content">
                    <h3 className="spd-mkt-title">
                      Better Protection<br />for a Healthier Tomorrow
                    </h3>
                  </div>

                  <div className="spd-mkt-bottom-bar">
                    <div className="spd-mkt-stat-item">
                      <div className="spd-mkt-stat-icon">
                        <Sprout size={16} />
                      </div>
                      <span className="spd-mkt-stat-label">Healthy Crops</span>
                    </div>

                    <div className="spd-mkt-stat-item">
                      <div className="spd-mkt-stat-icon">
                        <Leaf size={16} />
                      </div>
                      <span className="spd-mkt-stat-label">Better Yield</span>
                    </div>

                    <div className="spd-mkt-stat-item">
                      <div className="spd-mkt-stat-icon">
                        <Shield size={16} />
                      </div>
                      <span className="spd-mkt-stat-label">Sustainable Farming</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Tab 2: Specifications */}
            {activeTab === 'specs' && (
              <div className="spd-specs-tab-view">
                <div className="spd-specs-tab-grid">
                  <div className="spd-spec-card-box">
                    <div className="spd-spec-icon-box"><FlaskConical size={18} /></div>
                    <div>
                      <h4 className="spd-spec-title">Chemical Composition</h4>
                      <p className="spd-spec-val">{product.chemicalComposition || 'Lavender Extract 10% + Bio Actives 90%'}</p>
                    </div>
                  </div>

                  <div className="spd-spec-card-box">
                    <div className="spd-spec-icon-box"><Leaf size={18} /></div>
                    <div>
                      <h4 className="spd-spec-title">Formulation</h4>
                      <p className="spd-spec-val">{product.formulation || 'Soluble Liquid (SL)'}</p>
                    </div>
                  </div>

                  <div className="spd-spec-card-box">
                    <div className="spd-spec-icon-box"><Droplet size={18} /></div>
                    <div>
                      <h4 className="spd-spec-title">Dosage & Dilution</h4>
                      <p className="spd-spec-val">{product.dosage || '2-3 ml per Litre of clean water'}</p>
                    </div>
                  </div>

                  <div className="spd-spec-card-box">
                    <div className="spd-spec-icon-box"><Bug size={18} /></div>
                    <div>
                      <h4 className="spd-spec-title">Target Pests</h4>
                      <p className="spd-spec-val">{product.targetPests || 'Aphids, Thrips, Mites, Whiteflies'}</p>
                    </div>
                  </div>

                  <div className="spd-spec-card-box">
                    <div className="spd-spec-icon-box"><Package size={18} /></div>
                    <div>
                      <h4 className="spd-spec-title">Available Sizes</h4>
                      <p className="spd-spec-val">{packSizes.join(', ')}</p>
                    </div>
                  </div>

                  <div className="spd-spec-card-box">
                    <div className="spd-spec-icon-box"><CheckCircle2 size={18} /></div>
                    <div>
                      <h4 className="spd-spec-title">Safety & Antidote</h4>
                      <p className="spd-spec-val">Non-toxic biological formulation; treat symptomatically.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="spd-reviews-tab-view">
                <div className="spd-reviews-summary-card">
                  <div className="spd-rev-score-col">
                    <span className="spd-big-rating-num">4.8</span>
                    <div className="spd-stars-wrap">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#F59E0B" stroke="#F59E0B" />
                      ))}
                    </div>
                    <span className="spd-rating-count-text">Based on 120 verified reviews</span>
                  </div>

                  <div className="spd-reviews-bars-col">
                    <div className="spd-rev-bar-row">
                      <span>5 Star</span>
                      <div className="spd-rev-progress"><div className="spd-rev-fill" style={{ width: '85%' }}></div></div>
                      <span>85%</span>
                    </div>
                    <div className="spd-rev-bar-row">
                      <span>4 Star</span>
                      <div className="spd-rev-progress"><div className="spd-rev-fill" style={{ width: '12%' }}></div></div>
                      <span>12%</span>
                    </div>
                    <div className="spd-rev-bar-row">
                      <span>3 Star</span>
                      <div className="spd-rev-progress"><div className="spd-rev-fill" style={{ width: '3%' }}></div></div>
                      <span>3%</span>
                    </div>
                  </div>
                </div>

                <div className="spd-reviews-list">
                  <div className="spd-review-item-card">
                    <div className="spd-rev-user-header">
                      <span className="spd-rev-user-name">Rajesh Patel (Gujarat)</span>
                      <span className="spd-rev-date">2 days ago</span>
                    </div>
                    <div className="spd-stars-wrap">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="#F59E0B" stroke="#F59E0B" />
                      ))}
                    </div>
                    <p className="spd-rev-comment">
                      Excellent results on my cotton crops! Pest infestation stopped completely within 48 hours of spraying. Highly recommended.
                    </p>
                  </div>

                  <div className="spd-review-item-card">
                    <div className="spd-rev-user-header">
                      <span className="spd-rev-user-name">Suresh Sharma (Maharashtra)</span>
                      <span className="spd-rev-date">1 week ago</span>
                    </div>
                    <div className="spd-stars-wrap">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="#F59E0B" stroke="#F59E0B" />
                      ))}
                    </div>
                    <p className="spd-rev-comment">
                      High quality formulation and very effective compared to standard market alternatives.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── 4. Bottom Related Products Section ── */}
      <section className="spd-related-section">
        <div className="container">
          <div className="spd-related-header">
            <div>
              <h2 className="spd-related-title">Related Products</h2>
              <p className="spd-related-sub">You may also like</p>
            </div>

            <div className="spd-related-nav-btns">
              <button
                type="button"
                className="spd-related-nav-btn"
                onClick={() => scrollRelated('left')}
                aria-label="Previous products"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="spd-related-nav-btn"
                onClick={() => scrollRelated('right')}
                aria-label="Next products"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            className="spd-related-slider-wrap"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            <div className="spd-related-track" ref={relatedCarouselRef}>
              {(otherProducts.length > 0
                ? otherProducts.slice(0, 4)
                : [
                  {
                    _id: 'rel-1',
                    name: 'Neem Based Insecticide',
                    category: 'Organic',
                    badgeClass: 'organic',
                    rating: 4.8,
                    reviewsCount: 49,
                    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80'
                  },
                  {
                    _id: 'rel-2',
                    name: 'Trichoderma Viride',
                    category: 'Biological',
                    badgeClass: 'biological',
                    rating: 4.7,
                    reviewsCount: 76,
                    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80'
                  },
                  {
                    _id: 'rel-3',
                    name: 'Copper Oxychloride 50% WP',
                    category: 'Fungicide',
                    badgeClass: 'fungicide',
                    rating: 4.5,
                    reviewsCount: 64,
                    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80'
                  },
                  {
                    _id: 'rel-4',
                    name: 'Imidacloprid 17.8% SL',
                    category: 'Insecticide',
                    badgeClass: 'insecticide',
                    rating: 4.6,
                    reviewsCount: 82,
                    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=400&q=80'
                  }
                ]
              ).map((item, idx) => {
                const itemId = item._id || item.id;
                const itemImg = item.image || (Array.isArray(item.images) && item.images[0]) || '/images/products/premium_dummy.jpg';
                const itemCat = item.category || 'Agrochemical';
                const itemBadgeClass = item.badgeClass || (itemCat.toLowerCase().includes('bio') ? 'biological' : itemCat.toLowerCase().includes('org') ? 'organic' : 'fungicide');
                const ratingScore = item.rating || 4.7;
                const revCount = item.reviewsCount || (40 + idx * 15);

                return (
                  <div key={itemId} className="spd-product-card">
                    <span className={`spd-card-cat-badge ${itemBadgeClass}`}>{itemCat}</span>

                    <Link to={`/products/view/${itemId}`} className="spd-card-img-wrap">
                      <img
                        src={itemImg}
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = '/images/products/premium_dummy.jpg';
                        }}
                      />
                    </Link>

                    <Link to={`/products/view/${itemId}`} style={{ textDecoration: 'none' }}>
                      <h4 className="spd-card-prod-name">{item.name}</h4>
                    </Link>

                    <div className="spd-card-rating-row">
                      <div className="spd-card-rating">
                        <Star size={13} fill="#F59E0B" stroke="#F59E0B" />
                        <span>{ratingScore} ({revCount} reviews)</span>
                      </div>
                    </div>

                    <Link
                      to={`/products/view/${itemId}`}
                      className="spd-btn-card-view"
                    >
                      <span>View Product</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Clean Product Inquiry Modal ── */}
      {inquiryModalOpen && (
        <div className="spd-modal-backdrop" onClick={() => setInquiryModalOpen(false)}>
          <div className="spd-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="spd-modal-header">
              <h3 className="spd-modal-title">Inquire About This Product</h3>
              <button
                type="button"
                className="spd-modal-close-btn"
                onClick={() => setInquiryModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="spd-modal-body">
              {inquirySubmitted ? (
                <div className="spd-modal-success">
                  <div className="spd-success-icon-wrap">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3>Inquiry Submitted Successfully!</h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '0.5rem' }}>
                    Thank you, <strong>{inquiryForm.name}</strong>. Our agricultural technical team will connect with you soon regarding <strong>{productName} ({selectedPackage})</strong>.
                  </p>
                  <button
                    type="button"
                    className="spd-form-submit-btn"
                    onClick={() => setInquiryModalOpen(false)}
                    style={{ marginTop: '1.25rem' }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit}>
                  <div style={{ background: '#F8FAF7', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid #EAECE8' }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A' }}>{productName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>
                      Selected Pack Size: <strong>{selectedPackage}</strong>
                    </div>
                  </div>

                  <div className="spd-form-group">
                    <label className="spd-form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Patel"
                      className="spd-form-input"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    />
                  </div>

                  <div className="spd-form-group">
                    <label className="spd-form-label">Contact Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="spd-form-input"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="spd-form-group">
                    <label className="spd-form-label">Location / State</label>
                    <input
                      type="text"
                      placeholder="e.g. Anand, Gujarat"
                      className="spd-form-input"
                      value={inquiryForm.state}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, state: e.target.value })}
                    />
                  </div>

                  <div className="spd-form-group">
                    <label className="spd-form-label">Message / Requirement Details</label>
                    <textarea
                      rows={2}
                      placeholder="Ask about bulk supply, dealership, or technical dosage..."
                      className="spd-form-textarea"
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="spd-form-submit-btn">
                    <Send size={16} />
                    <span>Send Product Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
