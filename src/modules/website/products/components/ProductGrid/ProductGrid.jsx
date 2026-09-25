import { useState, useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ categories, activeFilter, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten all products across categories with memoization
  const allProducts = useMemo(() => {
    return categories.flatMap((cat) => cat.products);
  }, [categories]);

  // Selected category object
  const activeCategoryObj = useMemo(() => {
    return categories.find((cat) => cat.slug === activeFilter) || null;
  }, [categories, activeFilter]);

  // Filter products by category and search input
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (activeFilter !== 'all') {
      result = result.filter((p) => p.category === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.technicalName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allProducts, activeFilter, searchQuery]);

  return (
    <div className="product-grid-wrapper">
      {/* Filters and Search Bar */}
      <div className="products-filter-bar">
        <div className="category-filter-pills">
          <button
            type="button"
            className={`filter-pill-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            All Agrochemicals ({allProducts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              className={`filter-pill-btn ${
                activeFilter === cat.slug ? 'active' : ''
              }`}
              onClick={() => onFilterChange(cat.slug)}
            >
              {cat.name} ({cat.products.length})
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="products-search-box">
          <span className="search-icon-symbol">🔍</span>
          <input
            type="text"
            placeholder="Search chemical or pest..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="products-search-input"
          />
        </div>
      </div>

      {/* Category Description Banner if a specific category is active */}
      {activeCategoryObj && (
        <div
          style={{
            marginBottom: 'var(--space-8)',
            padding: 'var(--space-4) var(--space-6)',
            backgroundColor: 'var(--color-primary-subtle)',
            borderRadius: 'var(--radius-lg)',
            borderLeft: '4px solid var(--color-primary)',
          }}
        >
          <h3
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--color-primary-dark)',
              marginBottom: '4px',
            }}
          >
            {activeCategoryObj.name}
          </h3>
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-main)',
              lineHeight: 1.5,
            }}
          >
            {activeCategoryObj.description || activeCategoryObj.shortDesc}
          </p>
        </div>
      )}

      {/* Grid of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="products-catalog-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products-found">
          <div className="no-products-icon">🌾</div>
          <h3>No Agrochemicals Matched Your Query</h3>
          <p>Try searching for a different active chemical or reset category filter.</p>
        </div>
      )}
    </div>
  );
}
