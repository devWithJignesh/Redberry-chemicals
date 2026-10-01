import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const {
    id,
    slug,
    name,
    technicalName,
    category,
    tag,
    image,
    description,
    shortDescription,
  } = product;

  const productUrl = `/products/view/${id || slug || 'redprid-super'}`;
  const summaryText = shortDescription || description || '';

  return (
    <div className="product-card">
      <Link to={productUrl} className="product-card-media" title={`View details for ${name}`}>
        <img src={image} alt={name} className="product-card-img" />
        {tag && <span className="product-tag-badge">{tag}</span>}
        <span className="product-category-chip">{category}</span>
      </Link>

      <div className="product-card-body">
        <div>
          <h3 className="product-title">
            <Link to={productUrl} style={{ color: 'inherit', textDecoration: 'none' }}>
              {name}
            </Link>
          </h3>
          {technicalName && <span className="product-technical">{technicalName}</span>}
          <p className="product-desc">
            {summaryText.length > 95 ? summaryText.substring(0, 95) + '...' : summaryText}
          </p>
        </div>

        <div className="product-card-footer" style={{ marginTop: 'auto' }}>
          <Link
            to={productUrl}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
