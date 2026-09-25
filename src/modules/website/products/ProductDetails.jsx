import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from './components/ProductCard/ProductCard';
import { PRODUCTS_CATEGORIES_DATA } from './data';
import { scrollToTop } from '../../../utils/helpers';

export default function ProductDetails() {
  const { category: categoryParam } = useParams();

  useEffect(() => {
    scrollToTop();
  }, [categoryParam]);

  // Find matching category or default to first
  const categoryData =
    PRODUCTS_CATEGORIES_DATA.find(
      (cat) => cat.slug.toLowerCase() === categoryParam?.toLowerCase()
    ) || PRODUCTS_CATEGORIES_DATA[0];

  return (
    <div className="product-details-page">
      {/* Category Hero Banner */}
      <section
        className="section-padding-sm"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)',
          color: 'var(--color-text-white)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <Link
              to="/products"
              style={{
                color: '#cbd5e1',
                fontSize: 'var(--font-size-sm)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              ← Back to All Agrochemicals
            </Link>
          </div>
          <div style={{ maxWidth: '800px' }}>
            <span
              className="section-badge section-badge-dark"
              style={{ marginBottom: 'var(--space-3)' }}
            >
              Category Focus
            </span>
            <h1
              className="section-title section-title-dark"
              style={{ marginBottom: 'var(--space-2)' }}
            >
              {categoryData.name} Formulations
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-md)',
                color: 'var(--color-lime)',
                fontWeight: 600,
                marginBottom: 'var(--space-3)',
              }}
            >
              {categoryData.description}
            </p>
            <p
              className="section-description section-description-dark"
              style={{ fontSize: 'var(--font-size-base)', lineHeight: 1.6 }}
            >
              {categoryData.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Category Specific Products List */}
      <section
        className="section-padding"
        style={{ backgroundColor: 'var(--color-bg-main)' }}
      >
        <div className="container">
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <h2
              style={{
                fontSize: 'var(--font-size-xl)',
                color: 'var(--color-text-heading)',
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
          <div
            style={{
              marginTop: 'var(--space-16)',
              padding: 'var(--space-8)',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontSize: 'var(--font-size-lg)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Explore Other Protection Categories
            </h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'var(--space-3)',
                flexWrap: 'wrap',
              }}
            >
              {PRODUCTS_CATEGORIES_DATA.filter(
                (c) => c.slug !== categoryData.slug
              ).map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/products/${cat.slug}`}
                  className="btn btn-secondary"
                >
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
