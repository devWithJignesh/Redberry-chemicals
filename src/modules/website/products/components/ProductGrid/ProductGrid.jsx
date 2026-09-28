import { useState, useMemo, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ categories, activeFilter, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Close drawer on escape key & manage body scroll lock on mobile
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileDrawerOpen]);

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
          p.description.toLowerCase().includes(q) ||
          (p.targetPests && p.targetPests.some((pest) => pest.toLowerCase().includes(q))) ||
          (p.crops && p.crops.some((crop) => crop.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [allProducts, activeFilter, searchQuery]);

  const handleCategorySelect = (slug) => {
    onFilterChange(slug);
    if (mobileDrawerOpen) {
      setMobileDrawerOpen(false);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    onFilterChange('all');
    if (mobileDrawerOpen) {
      setMobileDrawerOpen(false);
    }
  };

  const hasActiveFilters = activeFilter !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="product-catalog-layout">
      {/* Mobile Top Bar: Quick Search & Filter Drawer Trigger */}
      <div className="mobile-filter-header">
        <div className="mobile-search-wrapper">
          <svg className="sidebar-search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search chemicals, pests, crops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mobile-search-input"
            aria-label="Search agrochemicals"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="button"
          className={`mobile-drawer-toggle-btn ${hasActiveFilters ? 'has-filter' : ''}`}
          onClick={() => setMobileDrawerOpen(true)}
          aria-label="Open filter sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          <span>Categories</span>
          {activeFilter !== 'all' && (
            <span className="mobile-active-dot" />
          )}
        </button>
      </div>

      {/* Main Grid & Products (Left Column on Desktop) */}
      <main className="product-main-content">
        {/* Catalog Control Header: Shows active filter status & total found */}
        <div className="catalog-status-header">
          <div className="catalog-status-left">
            <h2 className="catalog-status-title">
              {activeCategoryObj ? activeCategoryObj.name : 'All Agrochemicals'}
            </h2>
            <span className="catalog-count-pill">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Available
            </span>
          </div>

          {hasActiveFilters && (
            <div className="catalog-active-chips">
              {activeFilter !== 'all' && (
                <span className="filter-active-tag">
                  {getCategoryIcon(activeFilter)} {activeCategoryObj?.name}
                  <button type="button" onClick={() => onFilterChange('all')} aria-label="Remove category filter">✕</button>
                </span>
              )}
              {searchQuery.trim() && (
                <span className="filter-active-tag">
                  &ldquo;{searchQuery}&rdquo;
                  <button type="button" onClick={() => setSearchQuery('')} aria-label="Remove search query">✕</button>
                </span>
              )}
              <button
                type="button"
                className="reset-all-link"
                onClick={handleResetFilters}
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Category Description Banner if a specific category is active */}
        {activeCategoryObj && (
          <div className="category-active-banner">
            <div className="category-banner-header">
              <span className="category-banner-icon">{getCategoryIcon(activeCategoryObj.slug)}</span>
              <div>
                <h3 className="category-banner-title">
                  {activeCategoryObj.name} Formulations
                </h3>
                <p className="category-banner-desc">
                  {activeCategoryObj.description || activeCategoryObj.shortDesc}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-catalog-grid" key={`${activeFilter}-${searchQuery}`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products-found">
            <div className="no-products-icon">🌾</div>
            <h3>No Agrochemicals Matched Your Query</h3>
            <p>Try searching for a different active ingredient, brand name, or reset the category filter.</p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginTop: 'var(--space-4)' }}
              onClick={handleResetFilters}
            >
              Reset Filters &amp; View All
            </button>
          </div>
        )}
      </main>

      {/* Mobile Drawer Backdrop */}
      {mobileDrawerOpen && (
        <div
          className="sidebar-backdrop active"
          onClick={() => setMobileDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Right Sidebar on Desktop / Slide-over Drawer on Mobile */}
      <aside className={`product-sidebar-right ${mobileDrawerOpen ? 'drawer-open' : ''}`}>
        <div className="sidebar-sticky-inner">
          {/* Drawer Mobile Header */}
          <div className="sidebar-drawer-header">
            <div className="drawer-title-group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
              <span>Filter Catalog</span>
            </div>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setMobileDrawerOpen(false)}
              aria-label="Close drawer"
            >
              ✕
            </button>
          </div>

          {/* Search Card Section (Desktop) */}
          <div className="sidebar-card sidebar-search-card">
            <label htmlFor="desktop-search-input" className="sidebar-card-label">
              <span>Quick Search</span>
              {searchQuery && (
                <button
                  type="button"
                  className="sidebar-clear-text-btn"
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              )}
            </label>
            <div className="sidebar-search-box">
              <svg className="sidebar-search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="desktop-search-input"
                type="text"
                placeholder="Search chemical, pest, crop..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sidebar-search-input"
                aria-label="Search agrochemicals"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Categories Navigation Card */}
          <div className="sidebar-card sidebar-categories-card">
            <div className="sidebar-card-header">
              <h3 className="sidebar-card-title">Agrochemical Categories</h3>
              {activeFilter !== 'all' && (
                <button
                  type="button"
                  className="sidebar-reset-btn"
                  onClick={() => handleCategorySelect('all')}
                >
                  Reset
                </button>
              )}
            </div>

            <nav className="sidebar-category-list" aria-label="Agrochemical categories">
              {/* All Agrochemicals Item */}
              <button
                type="button"
                className={`sidebar-cat-item ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleCategorySelect('all')}
              >
                <div className="cat-item-left">
                  <span className="cat-icon">{getCategoryIcon('all')}</span>
                  <span className="cat-name">All Agrochemicals</span>
                </div>
                <div className="cat-item-right">
                  <span className="cat-badge">{allProducts.length}</span>
                  <svg className="cat-chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </button>

              {/* Specific Categories */}
              {categories.map((cat) => {
                const isActive = activeFilter === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    className={`sidebar-cat-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(cat.slug)}
                  >
                    <div className="cat-item-left">
                      <span className="cat-icon">{getCategoryIcon(cat.slug)}</span>
                      <span className="cat-name">{cat.name}</span>
                    </div>
                    <div className="cat-item-right">
                      <span className="cat-badge">{cat.products.length}</span>
                      <svg className="cat-chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Technical Assistance & Inquiry Card */}
          <div className="sidebar-card sidebar-help-card">
            <div className="help-card-badge">B2B &amp; Bulk Supply</div>
            <h4 className="help-card-title">Custom Agro Formulation?</h4>
            <p className="help-card-desc">
              Looking for custom chemical synthesis, batch export, or technical guidance for your crops?
            </p>
            <a href="/contact" className="help-card-btn">
              <span>Request Quote</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Mobile Drawer Bottom Apply Button */}
          <div className="sidebar-drawer-footer">
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={() => setMobileDrawerOpen(false)}
            >
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
