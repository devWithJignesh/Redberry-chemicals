import { useState, useEffect } from 'react';
import PageHeroBanner from '../../../components/PageHeroBanner/PageHeroBanner';
import ProductGrid from './components/ProductGrid/ProductGrid';
import MediaGallery from '../../../components/common/MediaGallery/MediaGallery';
import { PRODUCTS_CATEGORIES_DATA, PRODUCTS_PAGE_HEADER } from './data';
import { PAGE_VIDEOS } from '../../../data/videos';
import { scrollToTop } from '../../../utils/helpers';

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="products-page">
      {/* Products Video Page Hero */}
      <PageHeroBanner
        badge={PRODUCTS_PAGE_HEADER.badge || "OUR CROP CARE PORTFOLIO"}
        title={PRODUCTS_PAGE_HEADER.title || "Targeted Solutions for Every Crop Stage"}
        subtitle={PRODUCTS_PAGE_HEADER.subtitle || "Browse our comprehensive range of high-performance agrochemicals formulated for Indian soil and climatic conditions."}
        videoSrc={PAGE_VIDEOS.products.heroVideo}
        imageSrc={PAGE_VIDEOS.products.heroPoster}
        breadcrumbs={[{ label: 'Products' }]}
        primaryCta={{ label: 'Become a Distributor', href: '/contact' }}
        secondaryCta={{ label: 'About Redberry', href: '/about' }}
      />

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

      {/* Category Video & Image Gallery */}
      <MediaGallery
        badge="Formulation Demonstrations"
        title="Explore Products in the Field"
        subtitle="Detailed video insights and field application results across our product portfolio."
        items={PAGE_VIDEOS.galleryVideos}
      />
    </div>
  );
}
