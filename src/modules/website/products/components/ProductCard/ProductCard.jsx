/* ============================================
   PRODUCT CARD COMPONENT
   FILE: ProductCard.jsx
   Clean, Minimalist, Modern Card UI
   ============================================ */

import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import './ProductCard.css';

export function ProductCard({ product }) {
  const {
    id,
    _id,
    name,
    image,
    category,
    dosage,
    packSizes,
    shortDescription,
    description,
    price,
  } = product;

  const productId = _id || id || 'default';
  const productUrl = `/products/view/${productId}`;
  const summaryText = (shortDescription || description || '').replace(/<[^>]+>/g, '');

  // Right-side value in header row (price, dosage, or category)
  const headerRightValue = price ? `$${price}` : (dosage ? `Dosage: ${dosage}` : (category || ''));

  return (
    <div className="pc-card">
      {/* Top Media Container */}
      <Link to={productUrl} className="pc-media-box" title={`View details for ${name || 'Product'}`}>
        <div className="pc-image-inner">
          {image ? (
            <img
              src={image}
              alt={name || 'Product'}
              className="pc-img"
              onError={(e) => {
                e.target.src = '/images/products/premium_dummy.jpg';
              }}
            />
          ) : (
            <div className="pc-no-img">
              <Package size={36} />
              <span>No image</span>
            </div>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="pc-body">
        {/* Title & Price/Spec Header Row */}
        <div className="pc-header-row">
          <h3 className="pc-title">
            <Link to={productUrl} className="pc-title-link">
              {name || 'Product Name'}
            </Link>
          </h3>
          {headerRightValue && (
            <span className="pc-price-tag">
              {headerRightValue}
            </span>
          )}
        </div>

        {/* Short Description */}
        {summaryText && (
          <p className="pc-desc">
            {summaryText.length > 95 ? summaryText.substring(0, 95) + '...' : summaryText}
          </p>
        )}

        {/* Bottom Action Button (Pill shaped) */}
        <div className="pc-footer">
          <Link to={productUrl} className="pc-btn-pill">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
