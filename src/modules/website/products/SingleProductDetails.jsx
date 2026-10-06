/* ============================================
   SINGLE PRODUCT DETAILS COMPONENT
   FILE: SingleProductDetails.jsx
   Clean, Modern, Dynamic Agriculture UI
   ============================================ */

import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Package,
  CheckCircle2,
  ArrowLeft,
  Send,
  Loader2,
  AlertCircle,
  Droplet,
  Bug,
  Star,
  ChevronRight,
  Layers,
  FlaskConical,
  Leaf,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Check,
  Sparkles
} from 'lucide-react';

import { getProductByIdApi, getProductsApi } from '../../../api/productApi';
import { getSubProductByIdApi, getSubProductsApi } from '../../../api/subProductApi';
import { useAdminData } from '../../../context/AdminDataContext';
import { scrollToTop } from '../../../utils/helpers';
import { PageSpinner } from '../../../components/common/Loader/PageSpinner';
import './SingleProductDetails.css';

export default function SingleProductDetails() {
  const { id } = useParams();
  const { subProducts: contextSubProducts, products: contextProducts } = useAdminData();
  const relatedCarouselRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [parentProduct, setParentProduct] = useState(null);
  const [subProductsList, setSubProductsList] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showFullFeatures, setShowFullFeatures] = useState(false);
  const [imgFading, setImgFading] = useState(false);

  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const scrollRelated = (direction) => {
    if (relatedCarouselRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      relatedCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Automatic smooth slider for related products
  useEffect(() => {
    if (!otherProducts || otherProducts.length <= 1 || isCarouselHovered) return;

    const autoSlideTimer = setInterval(() => {
      if (relatedCarouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = relatedCarouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          relatedCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          relatedCarouselRef.current.scrollBy({ left: 240, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(autoSlideTimer);
  }, [otherProducts, isCarouselHovered]);



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
                category: sp.parentProductName || sp.productId?.name || 'Agro Chemicals',
                dosage: sp.dosage,
                packSizes: Array.isArray(sp.packagingSizes) ? sp.packagingSizes : ['100 ml', '250 ml', '500 ml', '1 Litre'],
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
              category: spContext.parentProductName || spContext.category || 'Agro Chemicals',
              dosage: spContext.dosage,
              packSizes: Array.isArray(spContext.packagingSizes) ? spContext.packagingSizes : ['100 ml', '250 ml', '500 ml', '1 Litre'],
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
          if (Array.isArray(foundProduct.packSizes) && foundProduct.packSizes.length > 0) {
            setSelectedPackage(foundProduct.packSizes[0]);
          } else {
            setSelectedPackage('');
          }

          // Fetch Sub-Products for this product line passing parent product ID
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
          const otherRes = await getProductsApi({ limit: 8 });
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
  }, [id, contextSubProducts, contextProducts]);


  // Extract ONLY real product images from API
  const galleryImages = useMemo(() => {
    if (!product) return [];

    const extracted = [];

    // 1. Check if product.images array exists and has valid elements
    if (Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach((img) => {
        if (typeof img === 'string' && img.trim() && !extracted.includes(img.trim())) {
          extracted.push(img.trim());
        } else if (img && typeof img === 'object' && img.url && !extracted.includes(img.url)) {
          extracted.push(img.url);
        }
      });
    }

    // 2. Check if primary product.image exists
    if (product.image && typeof product.image === 'string' && product.image.trim() && !extracted.includes(product.image.trim())) {
      extracted.unshift(product.image.trim());
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

  // Dynamic Pack Sizes directly from API
  const packSizes = useMemo(() => {
    if (product?.packSizes && Array.isArray(product.packSizes) && product.packSizes.length > 0) {
      return product.packSizes.filter((p) => p && typeof p === 'string' && p.trim());
    }
    return [];
  }, [product]);

  // Dynamic Features List directly from API
  const featuresList = useMemo(() => {
    if (!product?.features) return [];
    if (Array.isArray(product.features) && product.features.length > 0) {
      return product.features.filter((f) => typeof f === 'string' && f.trim());
    }
    if (typeof product.features === 'string' && product.features.trim()) {
      return product.features.split('\n').map((f) => f.trim()).filter(Boolean);
    }
    return [];
  }, [product]);

  // Properly Ordered / Sorted Details Table Data
  const detailsData = useMemo(() => {
    if (!product) return [];
    const items = [];

    // 2. Dosage & Dilution
    if (product.dosage) {
      items.push({
        icon: <Droplet size={17} />,
        label: 'Dosage & Dilution',
        value: product.dosage,
        color: 'blue'
      });
    }

    // 3. Target Pests / Diseases
    if (product.targetPests) {
      items.push({
        icon: <Bug size={17} />,
        label: 'Target Pests / Diseases',
        value: product.targetPests,
        color: 'amber'
      });
    }

    // 4. Chemical Composition
    if (product.chemicalComposition || product.composition) {
      items.push({
        icon: <FlaskConical size={17} />,
        label: 'Composition',
        value: product.chemicalComposition || product.composition,
        color: 'purple'
      });
    }

    // 5. Formulation
    if (product.formulation) {
      items.push({
        icon: <Leaf size={17} />,
        label: 'Formulation',
        value: product.formulation,
        color: 'emerald'
      });
    }

    return items;
  }, [product]);

  if (isLoading) {
    return (
      <PageSpinner
        title="Loading Product Details..."
        subtitle="Fetching specifications and formulation data"
        fullPage={true}
      />
    );
  }

  if (error || !product) {
    return (
      <div className="spd-error-screen">
        <div className="spd-error-card">
          <div className="spd-error-icon-wrap">
            <AlertCircle size={44} />
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
  const isActive = (product.status || '').toLowerCase() === 'active';
  const hasDescription = Boolean(product.description || product.shortDescription);

  return (
    <div className="spd-page">
      {/* ── Main Product Section ── */}
      <section className="spd-main-section">
        <div className="container">
          <div className="spd-product-grid">

            {/* ══════════════════════════════════════
                LEFT COLUMN: PRODUCT IMAGE GALLERY
                ══════════════════════════════════════ */}
            <div className="spd-left-col">

              {/* Product Image Gallery Card */}
              <div className="spd-gallery-card">

                {/* Main Large Image Container */}
                <div className="spd-main-image-wrap">

                  {/* Image Counter Badge Top-Right */}
                  {galleryImages.length > 1 && (
                    <span className="spd-badge-counter">
                      {activeImageIndex + 1} / {galleryImages.length}
                    </span>
                  )}

                  {/* Previous Button Arrow */}
                  {galleryImages.length > 1 && (
                    <button
                      type="button"
                      className="spd-nav-arrow spd-nav-prev"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}

                  {/* Product Main Image */}
                  <div className={`spd-img-container ${imgFading ? 'fading' : ''}`}>
                    {currentImage ? (
                      <img
                        src={currentImage}
                        alt={`${product.name || 'Product'} view ${activeImageIndex + 1}`}
                        className="spd-main-img"
                      />
                    ) : (
                      <div className="spd-no-img-box">
                        <Package size={48} className="spd-no-img-icon" />
                        <span>No image available</span>
                      </div>
                    )}
                  </div>

                  {/* Next Button Arrow */}
                  {galleryImages.length > 1 && (
                    <button
                      type="button"
                      className="spd-nav-arrow spd-nav-next"
                      onClick={handleNextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>

                {/* Horizontal Thumbnails Row (Only if multiple images exist in API) */}
                {galleryImages.length > 1 && (
                  <div className="spd-thumb-row">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`spd-thumb-card ${activeImageIndex === idx ? 'selected' : ''}`}
                        onClick={() => handleImageSelect(idx)}
                        aria-label={`Select product image ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* ══════════════════════════════════════
                RIGHT COLUMN: PRODUCT INFORMATION
                ══════════════════════════════════════ */}
            <div className="spd-right-col">

              {/* Top Meta Badges: Category + Rating */}
              <div className="spd-header-meta">
                {product.category && (
                  <span className="spd-category-badge">
                    <Leaf size={12} />
                    {product.category}
                  </span>
                )}
                {product.rating && (
                  <div className="spd-rating-badge">
                    <Star size={13} className="spd-star-icon" />
                    <span className="spd-rating-score">{product.rating}</span>
                    <span className="spd-rating-text">Top Rated</span>
                  </div>
                )}
              </div>

              {/* Product Title */}
              {product.name && <h1 className="spd-title">{product.name}</h1>}

              {/* Short Subtitle */}
              {product.shortDescription && (
                <p className="spd-subtitle">
                  {product.shortDescription.replace(/<[^>]+>/g, '')}
                </p>
              )}


              {/* ── AVAILABLE PACKAGING ── */}
              {packSizes.length > 0 && (
                <div className="spd-packaging-section">
                  <div className="spd-section-title">
                    <Package size={15} />
                    <span>AVAILABLE PACKAGING</span>
                  </div>
                  <div className="spd-pack-options">
                    {packSizes.map((pack) => {
                      const isSelected = selectedPackage === pack;
                      return (
                        <button
                          key={pack}
                          type="button"
                          className={`spd-pack-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => setSelectedPackage(pack)}
                        >
                          {isSelected && <Check size={14} className="spd-pack-check" />}
                          <span>{pack}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── DESCRIPTION & MODE OF ACTION CARD ── */}
              {hasDescription && (
                <div className="spd-card spd-content-card">
                  <div className="spd-card-title-row">
                    <h3 className="spd-card-heading">Description & Mode of Action</h3>
                  </div>

                  {product.shortDescription && (
                    <div className="spd-desc-intro">
                      <p>{product.shortDescription.replace(/<[^>]+>/g, '')}</p>
                    </div>
                  )}

                  {product.description && (
                    <>
                      <div className={`spd-desc-body ${showFullDesc ? 'expanded' : 'collapsed'}`}>
                        <div
                          className="spd-rich-text"
                          dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                      </div>

                      <button
                        type="button"
                        className="spd-btn-expand"
                        onClick={() => setShowFullDesc(!showFullDesc)}
                      >
                        <span>{showFullDesc ? 'Show Less' : 'Show More'}</span>
                        {showFullDesc ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* ── KEY FEATURES & BENEFITS CARD ── */}
              {featuresList.length > 0 && (
                <div className="spd-card spd-content-card">
                  <div className="spd-card-title-row">
                    <h3 className="spd-card-heading">Key Features & Benefits</h3>
                  </div>

                  <ul className="spd-benefits-list">
                    {(showFullFeatures ? featuresList : featuresList.slice(0, 3)).map((feat, idx) => (
                      <li key={idx} className="spd-benefit-item">
                        <span className="spd-check-wrap">
                          <CheckCircle2 size={16} />
                        </span>
                        <span className="spd-benefit-text">
                          {typeof feat === 'string' ? feat.replace(/<[^>]+>/g, '') : feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {featuresList.length > 3 && (
                    <button
                      type="button"
                      className="spd-btn-expand"
                      onClick={() => setShowFullFeatures(!showFullFeatures)}
                    >
                      <span>{showFullFeatures ? 'Show Less' : 'Show More'}</span>
                      {showFullFeatures ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                  )}
                </div>
              )}

              {/* ── BOTTOM ACTION BUTTONS ── */}
              <div className="spd-actions-row">
                <Link to="/contact" className="spd-btn-inquiry">
                  <Send size={16} />
                  <span>Send Product Inquiry</span>
                </Link>

                <Link to="/products" className="spd-btn-catalog">
                  <Package size={16} />
                  <span>Browse Full Catalog</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── Sub-Products / Related Products Carousel Section (Matching Reference Screenshot) ── */}
      {(subProductsList.length > 0 || otherProducts.length > 0) && (
        <section className="spd-related-section">
          <div className="container">
            <div className="spd-related-header-bar">
              <h2 className="spd-related-main-title">
                {subProductsList.length > 0
                  ? 'Available Sub-Products & Formulations'
                  : 'Customers who viewed this item also viewed'}
              </h2>
            </div>

            <div
              className="spd-related-slider-container"
              onMouseEnter={() => setIsCarouselHovered(true)}
              onMouseLeave={() => setIsCarouselHovered(false)}
            >
              {/* Left Side Arrow Button */}
              <button
                type="button"
                className="spd-side-arrow-btn left"
                onClick={() => scrollRelated('left')}
                aria-label="Previous items"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Slider Track */}
              <div className="spd-related-carousel-track" ref={relatedCarouselRef}>
                {(subProductsList.length > 0 ? subProductsList : otherProducts).map((item) => {
                  const itemId = item._id || item.id;
                  const itemImg = item.image || (Array.isArray(item.images) && item.images[0]) || '/images/products/premium_dummy.jpg';
                  const itemSubtitle = item.dosage
                    ? `Dose: ${item.dosage}`
                    : Array.isArray(item.packagingSizes)
                      ? item.packagingSizes.join(', ')
                      : item.packSizes || '';

                  return (
                    <Link
                      key={itemId}
                      to={`/products/view/${itemId}`}
                      className="spd-related-carousel-card"
                    >
                      <div className="spd-rc-img-wrap">
                        {itemImg ? (
                          <img
                            src={itemImg}
                            alt={item.name}
                            onError={(e) => {
                              e.target.src = '/images/products/premium_dummy.jpg';
                            }}
                          />
                        ) : (
                          <Package size={40} className="spd-rc-placeholder-icon" />
                        )}
                      </div>
                      <div className="spd-rc-info">
                        <h4 className="spd-rc-title">{item.name}</h4>
                        {itemSubtitle && (
                          <span className="spd-rc-sub-spec">{itemSubtitle}</span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Right Side Arrow Button */}
              <button
                type="button"
                className="spd-side-arrow-btn right"
                onClick={() => scrollRelated('right')}
                aria-label="Next items"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
