import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from './components/ProductCard/ProductCard';
import { PRODUCTS_CATEGORIES_DATA } from './data';
import { scrollToTop } from '../../../utils/helpers';
import './ProductDetails.css';

export default function ProductDetails() {
  const { category: categoryParam } = useParams();

  useEffect(() => {
    scrollToTop();
  }, [categoryParam]);

  const getCategoryIcon = (slug) => {
    switch (slug) {
      case 'all':
        return '🌾';
      case 'insecticides':
        return '🐛';
      case 'fungicides':
        return '🍄';
      case 'herbicides':
        return '🌿';
      case 'pgr-nutrition':
        return '🧪';
      default:
        return '🌱';
    }
  };

  // Find matching category or default to first
  const categoryData =
    PRODUCTS_CATEGORIES_DATA.find(
      (cat) => cat.slug.toLowerCase() === categoryParam?.toLowerCase()
    ) || PRODUCTS_CATEGORIES_DATA[0];

  return (
    <div className="product-details-page">
      {/* Category Hero Banner */}
      <section className="section-padding-sm category-hero-section">
        <div className="container">
          <Link to="/products" className="category-back-link">
            ← Back to All Agrochemicals
          </Link>
          <div className="category-hero-content">
            <span className="section-badge section-badge-dark" style={{ marginBottom: 'var(--space-3)' }}>
              Category Focus
            </span>
            <h1 className="category-hero-title">
              {categoryData.name} Formulations
            </h1>
            <p className="category-hero-subtitle">
              {categoryData.description}
            </p>
            <p className="category-hero-overview">
              {categoryData.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation Tabs Bar */}
      <section className="category-nav-tabs-section">
        <div className="container">
          <div className="category-tabs-bar" role="tablist" aria-label="Switch Product Categories">
            <Link
              to="/products"
              className="category-tab-link"
            >
              <span className="category-tab-icon">{getCategoryIcon('all')}</span>
              <span className="category-tab-text">All Categories</span>
            </Link>
            {PRODUCTS_CATEGORIES_DATA.map((cat) => {
              const isActive = cat.slug === categoryData.slug;
              return (
                <Link
                  key={cat.slug}
                  to={`/products/${cat.slug}`}
                  className={`category-tab-link ${isActive ? 'active' : ''}`}
                >
                  <span className="category-tab-icon">{getCategoryIcon(cat.slug)}</span>
                  <span className="category-tab-text">{cat.name}</span>
                  <span className="category-tab-badge">{cat.products.length}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Specific Products List */}
      <section
        className="section-padding"
        style={{ backgroundColor: 'var(--color-bg-main)', paddingTop: 'var(--space-8)' }}
      >
        <div className="container">
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <h2
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
                color: 'var(--color-text-heading)',
                fontWeight: 700,
              }}
            >
              Available {categoryData.name} ({categoryData.products.length} Products)
            </h2>
          </div>

          <div className="products-catalog-grid">
            {categoryData.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Other Categories Switcher */}
          <div className="category-switcher-card">
            <h3 className="category-switcher-title">
              Explore Other Protection Categories
            </h3>
            <div className="category-switcher-grid">
              {PRODUCTS_CATEGORIES_DATA.filter(
                (c) => c.slug !== categoryData.slug
              ).map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/products/${cat.slug}`}
                  className="btn btn-secondary category-switcher-btn"
                >
                  <span style={{ marginRight: '6px' }}>{getCategoryIcon(cat.slug)}</span>
                  {cat.name} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
