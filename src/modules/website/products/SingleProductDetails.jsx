import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Package, 
  FlaskConical, 
  Layers, 
  Tag, 
  CheckCircle2, 
  ArrowLeft, 
  Send,
  Droplet,
  Bug,
  Sprout
} from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { PRODUCTS_CATEGORIES_DATA } from './data';
import { scrollToTop } from '../../../utils/helpers';
import './SingleProductDetails.css';

export default function SingleProductDetails() {
  const { id } = useParams();
  const { products, subProducts } = useAdminData();
  const [activeTab, setActiveTab] = useState('subproducts'); // 'subproducts' | 'otherproducts'

  useEffect(() => {
    scrollToTop();
  }, [id]);

  // Combine products from admin context and default fallback data
  const allDefaultProducts = PRODUCTS_CATEGORIES_DATA.flatMap((cat) => cat.products);

  const matchedProduct =
    products.find((p) => p.id === id || p.slug === id) ||
    allDefaultProducts.find((p) => p.id === id || p.slug === id) ||
    products[0] ||
    allDefaultProducts[0];

  const categoryName = matchedProduct?.category || 'Agriculture';

  // Filter related sub-products (formulations)
  const relatedSubProducts = subProducts.filter(
    (sp) =>
      sp.parentProductId === matchedProduct?.id ||
      sp.parentProductName?.toLowerCase() === matchedProduct?.name?.toLowerCase() ||
      sp.category?.toLowerCase() === categoryName.toLowerCase()
  );

  // If no matching sub-products in state, provide fallback related subproducts
  const displaySubProducts = relatedSubProducts.length > 0 ? relatedSubProducts : subProducts;

  // Filter other main products
  const otherProducts = products.filter((p) => p.id !== matchedProduct?.id);
  const displayOtherProducts = otherProducts.length > 0 ? otherProducts : allDefaultProducts.filter((p) => p.id !== matchedProduct?.id);

  if (!matchedProduct) {
    return (
      <div className="container section-padding text-center">
        <h2>Product Not Found</h2>
        <Link to="/products" className="btn btn-primary mt-4">Back to All Products</Link>
      </div>
    );
  }

  return (
    <div className="single-product-details-page">
      {/* Main Details Section */}
      <section className="section-padding-sm single-product-main-section">
        <div className="container">
          {/* Back Button in Details Page Body */}
          <div style={{ marginBottom: '1.5rem' }}>
            <Link to="/products" className="single-product-back-btn">
              <ArrowLeft size={16} />
              <span>Back to Catalog</span>
            </Link>
          </div>

          <div className="single-product-main-grid">
            {/* Left Column: Product Image Gallery */}
            <div className="single-product-media-wrap">
              <div className="single-product-image-card">
                <img
                  src={matchedProduct.image || '/images/products/premium_dummy.jpg'}
                  alt={matchedProduct.name}
                  className="single-product-main-img"
                  onError={(e) => {
                    e.target.src = '/images/products/premium_dummy.jpg';
                  }}
                />
                <span className="single-product-badge">
                  {matchedProduct.tag || matchedProduct.category || 'High Performance'}
                </span>
              </div>
            </div>

            {/* Right Column: Product Metadata & Specs */}
            <div className="single-product-info-wrap">
              <div className="single-product-meta-header">
                <span className="single-product-cat-chip">
                  <Package size={14} />
                  {categoryName}
                </span>
                <h1 className="single-product-title">{matchedProduct.name}</h1>
                {matchedProduct.technicalName && (
                  <div className="single-product-technical">
                    <strong>Technical Name:</strong> {matchedProduct.technicalName}
                  </div>
                )}
              </div>

              {/* Short Description */}
              {matchedProduct.shortDescription && (
                <p className="single-product-short-desc">
                  {matchedProduct.shortDescription}
                </p>
              )}

              {/* Detailed Description */}
              {matchedProduct.description && (
                <div className="single-product-desc-box">
                  <h3 className="single-product-section-sub">Detailed Description & Mode of Action</h3>
                  <div
                    className="single-product-html-content"
                    dangerouslySetInnerHTML={{ __html: matchedProduct.description }}
                  />
                </div>
              )}

              {/* Key Features & Benefits */}
              {matchedProduct.features && (
                <div className="single-product-features-box">
                  <h3 className="single-product-section-sub">Key Features & Benefits</h3>
                  {Array.isArray(matchedProduct.features) ? (
                    <ul className="single-product-features-list">
                      {matchedProduct.features.map((feat, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={16} className="text-emerald" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div
                      className="single-product-html-content"
                      dangerouslySetInnerHTML={{ __html: matchedProduct.features }}
                    />
                  )}
                </div>
              )}

              {/* Quick Specs Grid */}
              <div className="single-product-specs-grid">
                {matchedProduct.dosage && (
                  <div className="single-spec-card">
                    <Droplet size={18} className="spec-icon text-blue" />
                    <div>
                      <span className="spec-label">Dosage & Dilution</span>
                      <span className="spec-value">{matchedProduct.dosage}</span>
                    </div>
                  </div>
                )}

                {matchedProduct.targetPests && (
                  <div className="single-spec-card">
                    <Bug size={18} className="spec-icon text-amber" />
                    <div>
                      <span className="spec-label">Target Pests / Diseases</span>
                      <span className="spec-value">
                        {Array.isArray(matchedProduct.targetPests)
                          ? matchedProduct.targetPests.join(', ')
                          : matchedProduct.targetPests}
                      </span>
                    </div>
                  </div>
                )}

                {matchedProduct.targetCrops && (
                  <div className="single-spec-card">
                    <Sprout size={18} className="spec-icon text-emerald" />
                    <div>
                      <span className="spec-label">Recommended Crops</span>
                      <span className="spec-value">
                        {Array.isArray(matchedProduct.targetCrops)
                          ? matchedProduct.targetCrops.join(', ')
                          : matchedProduct.targetCrops}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Packaging Sizes */}
              {matchedProduct.packSizes && matchedProduct.packSizes.length > 0 && (
                <div className="single-product-pack-box">
                  <span className="pack-title">Available Packaging Sizes:</span>
                  <div className="single-product-pack-pills">
                    {matchedProduct.packSizes.map((size) => (
                      <span key={size} className="single-pack-pill">
                        <Tag size={12} />
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="single-product-actions">
                <Link to="/contact" className="btn btn-primary single-cta-btn">
                  <Send size={16} />
                  <span>Send Product Inquiry</span>
                </Link>
                <Link to="/contact" className="btn btn-secondary single-cta-btn">
                  <span>Become a Distributor</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Card Base Toggle Section: Sub-Products vs Other Products */}
      <section className="section-padding single-product-showcase-section">
        <div className="container">
          <div className="showcase-header">
            <h2 className="showcase-title">Explore Related Formulations & Products</h2>
            <p className="showcase-subtitle">
              Switch between related Sub-Product formulations or explore other product lines in our card grid catalog.
            </p>

            {/* Toggle Button Bar */}
            <div className="showcase-toggle-bar">
              <button
                type="button"
                className={`showcase-toggle-btn ${activeTab === 'subproducts' ? 'active' : ''}`}
                onClick={() => setActiveTab('subproducts')}
              >
                <FlaskConical size={16} />
                <span>Show Sub-Products / Formulations ({displaySubProducts.length})</span>
              </button>
              <button
                type="button"
                className={`showcase-toggle-btn ${activeTab === 'otherproducts' ? 'active' : ''}`}
                onClick={() => setActiveTab('otherproducts')}
              >
                <Package size={16} />
                <span>Show Other Products ({displayOtherProducts.length})</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Sub-Products Cards Grid */}
          {activeTab === 'subproducts' && (
            <div className="showcase-cards-grid">
              {displaySubProducts.map((subItem) => (
                <div key={subItem.id} className="subproduct-card">
                  <div className="subproduct-card-media">
                    <img
                      src={subItem.image || '/images/products/premium_dummy.jpg'}
                      alt={subItem.name}
                      className="subproduct-card-img"
                      onError={(e) => {
                        e.target.src = '/images/products/premium_dummy.jpg';
                      }}
                    />
                    <span className="subproduct-tag">Sub-Product Formulation</span>
                  </div>

                  <div className="subproduct-card-body">
                    <div className="subproduct-parent-chip">
                      <Layers size={12} />
                      <span>{subItem.parentProductName || subItem.category || 'Agro Formulation'}</span>
                    </div>

                    <h3 className="subproduct-title">{subItem.name}</h3>

                    {subItem.dosage && (
                      <div className="subproduct-spec-row">
                        <strong>Dosage:</strong> <span>{subItem.dosage}</span>
                      </div>
                    )}

                    {subItem.targetPests && (
                      <div className="subproduct-spec-row">
                        <strong>Target Pests:</strong> <span>{subItem.targetPests}</span>
                      </div>
                    )}

                    {subItem.recommendedCrops && (
                      <div className="subproduct-spec-row">
                        <strong>Crops:</strong> <span>{subItem.recommendedCrops}</span>
                      </div>
                    )}

                    {/* Packaging Chips */}
                    {subItem.packagingSizes && subItem.packagingSizes.length > 0 && (
                      <div className="subproduct-pack-pills">
                        {subItem.packagingSizes.slice(0, 4).map((size) => (
                          <span key={size} className="sub-pack-pill">{size}</span>
                        ))}
                      </div>
                    )}

                    <div className="subproduct-footer">
                      <Link to="/contact" className="btn btn-secondary btn-sm full-w">
                        Inquire About {subItem.name} →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Other Products Cards Grid */}
          {activeTab === 'otherproducts' && (
            <div className="showcase-cards-grid">
              {displayOtherProducts.map((prod) => (
                <div key={prod.id} className="otherproduct-card">
                  <div className="otherproduct-card-media">
                    <img
                      src={prod.image || '/images/products/premium_dummy.jpg'}
                      alt={prod.name}
                      className="otherproduct-card-img"
                      onError={(e) => {
                        e.target.src = '/images/products/premium_dummy.jpg';
                      }}
                    />
                    <span className="otherproduct-category-chip">{prod.category || 'Agriculture'}</span>
                  </div>

                  <div className="otherproduct-card-body">
                    <h3 className="otherproduct-title">{prod.name}</h3>
                    {prod.technicalName && (
                      <span className="otherproduct-tech">{prod.technicalName}</span>
                    )}

                    <p className="otherproduct-desc">
                      {prod.shortDescription || prod.description?.substring(0, 100) + '...'}
                    </p>

                    <div className="otherproduct-footer">
                      <Link to={`/products/view/${prod.id}`} className="btn btn-primary btn-sm full-w">
                        View Product Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
