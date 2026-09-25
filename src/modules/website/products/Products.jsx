import { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid/ProductGrid';
import { PRODUCTS_CATEGORIES_DATA, PRODUCTS_PAGE_HEADER } from './data';
import { scrollToTop } from '../../../utils/helpers';

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="products-page">
      {/* Products Page Header */}
      <section className="section-padding-sm" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-badge">{PRODUCTS_PAGE_HEADER.badge}</span>
            <h1 className="section-title">{PRODUCTS_PAGE_HEADER.title}</h1>
            <p className="section-description">{PRODUCTS_PAGE_HEADER.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container">
          <ProductGrid
            categories={PRODUCTS_CATEGORIES_DATA}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </section>
    </div>
  );
}
