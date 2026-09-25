import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const {
    name,
    technicalName,
    category,
    tag,
    image,
    description,
    targetCrops,
    dosage,
    packSizes,
  } = product;

  return (
    <div className="product-card">
      <div className="product-card-media">
        <img src={image} alt={name} className="product-card-img" />
        {tag && <span className="product-tag-badge">{tag}</span>}
        <span className="product-category-chip">{category}</span>
      </div>

      <div className="product-card-body">
        <div>
          <h3 className="product-title">{name}</h3>
          <span className="product-technical">{technicalName}</span>
          <p className="product-desc">{description}</p>

          <div className="product-meta-specs">
            <div className="product-spec-row">
              <span className="product-spec-label">Dosage:</span>
              <span className="product-spec-val">{dosage}</span>
            </div>
            {targetCrops && targetCrops.length > 0 && (
              <div className="product-spec-row">
                <span className="product-spec-label">Crops:</span>
                <span className="product-spec-val">
                  {targetCrops.slice(0, 4).join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="product-card-footer">
          <div className="product-pack-pills">
            {packSizes?.slice(0, 3).map((size) => (
              <span key={size} className="pack-pill">
                {size}
              </span>
            ))}
          </div>
          <Link
            to={`/products/${category}`}
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
          >
            Category →
          </Link>
        </div>
      </div>
    </div>
  );
}
