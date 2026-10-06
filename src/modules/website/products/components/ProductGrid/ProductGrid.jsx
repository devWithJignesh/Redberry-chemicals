/* ============================================
   PRODUCT GRID COMPONENT
   FILE: ProductGrid.jsx
   Clean, Modern Agriculture Product Catalog
   ============================================ */

import { useState, useEffect, useCallback } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Loader2,
  Package,
  Layers,
  Leaf,
  Bug,
  Droplet,
  FlaskConical,
  Sparkles
} from 'lucide-react';

import ProductCard from '../ProductCard/ProductCard';
import { getProductsApi } from '../../../../../api/productApi';
import { PageSpinner } from '../../../../../components/common/Loader/PageSpinner';
import './ProductGrid.css';

export function ProductGrid({ categories = [], activeFilter, onFilterChange }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 9, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Category Icon helper with Lucide icons
  const renderCategoryIcon = (slug) => {
    switch (slug?.toLowerCase()) {
      case 'all':
        return <Layers size={17} />;
      case 'insecticides':
        return <Bug size={17} />;
      case 'fungicides':
        return <FlaskConical size={17} />;
      case 'herbicides':
        return <Leaf size={17} />;
      case 'pgr-nutrition':
      case 'nutrition':
        return <Droplet size={17} />;
      default:
        return <Package size={17} />;
    }
  };

  // Fetch Products from Backend API with Server-Side Pagination & Searching
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getProductsApi({
        page,
        limit: 9,
        search: searchQuery.trim() || undefined,
        category: activeFilter !== 'all' ? activeFilter : undefined,
      });

      if (res.success && res.data) {
        setProducts(res.data.products || []);
        setPagination(res.data.pagination || { total: 0, page: 1, limit: 9, totalPages: 1 });
      }
    } catch (err) {
      console.error('Error fetching products from API:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchQuery, activeFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle Category Select
  const handleCategorySelect = (slug) => {
    setPage(1);
    onFilterChange(slug);
    if (mobileDrawerOpen) {
      setMobileDrawerOpen(false);
    }
  };

  const handleSearchChange = (e) => {
    setPage(1);
    setSearchQuery(e.target.value);
  };

  const handleResetFilters = () => {
    setPage(1);
    setSearchQuery('');
    onFilterChange('all');
    if (mobileDrawerOpen) {
      setMobileDrawerOpen(false);
    }
  };

  // Active Category metadata
  const activeCategoryObj = categories.find((cat) => cat.slug === activeFilter) || null;
  const hasActiveFilters = activeFilter !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="pg-catalog-layout">
      {/* ── Mobile Search & Filter Trigger Bar ── */}
      <div className="pg-mobile-topbar">
        <div className="pg-mobile-search-box">
          <Search size={16} className="pg-search-icon" />
          <input
            type="text"
            placeholder="Search products or active ingredients..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pg-mobile-search-input"
            aria-label="Search agrochemicals"
          />
          {searchQuery && (
            <button
              type="button"
              className="pg-search-clear-btn"
              onClick={() => { setSearchQuery(''); setPage(1); }}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          type="button"
          className={`pg-mobile-drawer-btn ${hasActiveFilters ? 'has-active' : ''}`}
          onClick={() => setMobileDrawerOpen(true)}
          aria-label="Filter categories"
        >
          <SlidersHorizontal size={16} />
          <span>Filters</span>
          {activeFilter !== 'all' && <span className="pg-mobile-dot" />}
        </button>
      </div>

      {/* ── LEFT COLUMN: Main Catalog Content ── */}
      <main className="pg-main-content">
        {/* Status & Active Chips Header */}
        <div className="pg-status-bar">
          <div className="pg-status-left">
            <h2 className="pg-status-title">
              {activeCategoryObj ? activeCategoryObj.name : 'All Products'}
            </h2>
            <span className="pg-count-badge">
              {pagination.total} {pagination.total === 1 ? 'Product' : 'Products'} Available
            </span>
          </div>

          {hasActiveFilters && (
            <div className="pg-active-chips-wrap">
              {activeFilter !== 'all' && (
                <span className="pg-filter-chip">
                  <span className="pg-chip-icon">{renderCategoryIcon(activeFilter)}</span>
                  <span>{activeCategoryObj?.name || activeFilter}</span>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('all')}
                    aria-label="Remove category filter"
                    className="pg-chip-remove"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {searchQuery.trim() && (
                <span className="pg-filter-chip">
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setPage(1); }}
                    aria-label="Clear search query"
                    className="pg-chip-remove"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                type="button"
                className="pg-btn-clear-all"
                onClick={handleResetFilters}
              >
                <RotateCcw size={12} />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Description Banner */}
        {activeCategoryObj && (activeCategoryObj.description || activeCategoryObj.shortDesc) && (
          <div className="pg-category-banner">
            <div className="pg-cb-icon-wrap">
              {renderCategoryIcon(activeCategoryObj.slug)}
            </div>
            <div className="pg-cb-text">
              <h4>{activeCategoryObj.name} Solutions</h4>
              <p>{activeCategoryObj.description || activeCategoryObj.shortDesc}</p>
            </div>
          </div>
        )}

        {/* Products Grid / Loading / Empty State */}
        {isLoading ? (
          <PageSpinner
            title="Loading Products..."
            subtitle="Fetching catalog formulations and active ingredients"
            fullPage={false}
          />
        ) : products.length > 0 ? (
          <>
            <div className="pg-products-grid">
              {products.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="pg-pagination-bar">
                <button
                  type="button"
                  className="pg-page-nav-btn"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <div className="pg-page-indicator">
                  <span>Page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong></span>
                </div>

                <button
                  type="button"
                  className="pg-page-nav-btn"
                  disabled={page >= pagination.totalPages}
                  onClick={() => {
                    setPage((p) => Math.min(pagination.totalPages, p + 1));
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="pg-empty-state">
            <div className="pg-empty-icon-wrap">
              <Package size={40} />
            </div>
            <h3>No Products Found</h3>
            <p>No agrochemicals matched your current filter or search criteria. Try a different search term or reset filters.</p>
            <button
              type="button"
              className="pg-btn-reset"
              onClick={handleResetFilters}
            >
              <RotateCcw size={15} />
              <span>Reset Filters &amp; View All</span>
            </button>
          </div>
        )}
      </main>

      {/* ── Mobile Drawer Backdrop ── */}
      {mobileDrawerOpen && (
        <div
          className="pg-drawer-backdrop"
          onClick={() => setMobileDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── RIGHT COLUMN: Filter Sidebar ── */}
      <aside className={`pg-sidebar ${mobileDrawerOpen ? 'drawer-open' : ''}`}>
        <div className="pg-sidebar-inner">
          {/* Drawer Mobile Header */}
          <div className="pg-drawer-head">
            <div className="pg-drawer-title">
              <SlidersHorizontal size={17} />
              <span>Filter Catalog</span>
            </div>
            <button
              type="button"
              className="pg-drawer-close"
              onClick={() => setMobileDrawerOpen(false)}
              aria-label="Close drawer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Search Card */}
          <div className="pg-sidebar-card">
            <div className="pg-card-label">
              <span>Quick Search</span>
              {searchQuery && (
                <button
                  type="button"
                  className="pg-btn-clear-txt"
                  onClick={() => { setSearchQuery(''); setPage(1); }}
                >
                  Clear
                </button>
              )}
            </div>
            <div className="pg-search-input-wrap">
              <Search size={16} className="pg-search-icon" />
              <input
                id="desktop-search-input"
                type="text"
                placeholder="Search chemical, active..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pg-search-input"
                aria-label="Search agrochemicals"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="pg-search-clear-btn"
                  onClick={() => { setSearchQuery(''); setPage(1); }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Categories Filter Card */}
          <div className="pg-sidebar-card">
            <div className="pg-card-head-row">
              <h3 className="pg-card-head-title">Categories</h3>
              {activeFilter !== 'all' && (
                <button
                  type="button"
                  className="pg-btn-reset-cat"
                  onClick={() => handleCategorySelect('all')}
                >
                  Reset
                </button>
              )}
            </div>

            <nav className="pg-cat-list" aria-label="Product categories">
              <button
                type="button"
                className={`pg-cat-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleCategorySelect('all')}
              >
                <span className="pg-cat-icon-box">{renderCategoryIcon('all')}</span>
                <span className="pg-cat-name">All Agrochemicals</span>
                <ChevronRight size={14} className="pg-cat-arrow" />
              </button>

              {categories.map((cat) => {
                const isActive = activeFilter === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    className={`pg-cat-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(cat.slug)}
                  >
                    <span className="pg-cat-icon-box">{renderCategoryIcon(cat.slug)}</span>
                    <span className="pg-cat-name">{cat.name}</span>
                    <ChevronRight size={14} className="pg-cat-arrow" />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Trust Guarantee Mini Card */}
          <div className="pg-sidebar-info-card">
            <div className="pg-sic-icon">
              <Sparkles size={18} />
            </div>
            <div className="pg-sic-body">
              <h6>Certified Quality</h6>
              <p>All formulations meet strict regulatory standards for purity and crop safety.</p>
            </div>
          </div>

        </div>
      </aside>
    </div>
  );
}

export default ProductGrid;
