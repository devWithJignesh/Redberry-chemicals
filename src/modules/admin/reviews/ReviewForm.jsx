import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminData } from '../../../context/AdminDataContext';

export default function ReviewForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { getReviewById, addReview, updateReview } = useAdminData();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    role: '',
    cropOrCategory: '',
    rate: 5,
    title: '',
    description: '',
    verified: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const existing = getReviewById(id);
      if (existing) {
        setFormData({
          name: existing.name || '',
          location: existing.location || '',
          role: existing.role || '',
          cropOrCategory: existing.cropOrCategory || '',
          rate: Number(existing.rate) || 5,
          title: existing.title || '',
          description: existing.description || '',
          verified: existing.verified !== undefined ? Boolean(existing.verified) : true,
          image: existing.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        });
      } else {
        navigate('/admin/reviews');
      }
    }
  }, [id, isEditMode, getReviewById, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Customer name is required.';
    if (!formData.location.trim()) errs.location = 'Location (e.g. Anand, Gujarat) is required.';
    if (!formData.title.trim()) errs.title = 'Review title is required.';
    if (!formData.description.trim()) errs.description = 'Review testimonial text is required.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isEditMode) {
      updateReview(id, formData);
    } else {
      addReview(formData);
    }

    navigate('/admin/reviews');
  };

  return (
    <div className="admin-review-form-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">
            {isEditMode ? 'EDIT CUSTOMER REVIEW' : 'ADD CUSTOMER REVIEW'}
          </h1>
          <p className="admin-page-subtitle">
            {isEditMode ? `Update farmer testimonial for (${id})` : 'Publish a new farmer or dealer testimonial'}
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/reviews" className="btn-admin-secondary">
            &larr; BACK TO REVIEWS
          </Link>
        </div>
      </div>

      <div className="admin-form-container">
        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-form-section-title">
            <span>⭐</span> REVIEWER DETAILS & TESTIMONIAL
          </div>

          <div className="admin-form-grid-2">
            {/* Customer Name */}
            <div className="admin-form-group">
              <label htmlFor="rev-name" className="admin-form-label">
                Farmer / Dealer Name <span className="required">*</span>
              </label>
              <input
                id="rev-name"
                name="name"
                type="text"
                className={`admin-form-input ${errors.name ? 'error' : ''}`}
                placeholder="e.g. Rameshbhai Patel"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="admin-form-error-msg">{errors.name}</span>}
            </div>

            {/* Location */}
            <div className="admin-form-group">
              <label htmlFor="rev-loc" className="admin-form-label">
                Location / District <span className="required">*</span>
              </label>
              <input
                id="rev-loc"
                name="location"
                type="text"
                className={`admin-form-input ${errors.location ? 'error' : ''}`}
                placeholder="e.g. Anand, Gujarat"
                value={formData.location}
                onChange={handleChange}
                required
              />
              {errors.location && <span className="admin-form-error-msg">{errors.location}</span>}
            </div>
          </div>

          <div className="admin-form-grid-3">
            {/* Role */}
            <div className="admin-form-group">
              <label htmlFor="rev-role" className="admin-form-label">
                Farmer Role / Trade
              </label>
              <input
                id="rev-role"
                name="role"
                type="text"
                className="admin-form-input"
                placeholder="e.g. Cotton & Tobacco Grower"
                value={formData.role}
                onChange={handleChange}
              />
            </div>

            {/* Crop Category */}
            <div className="admin-form-group">
              <label htmlFor="rev-crop" className="admin-form-label">
                Crop / Product Applied
              </label>
              <input
                id="rev-crop"
                name="cropOrCategory"
                type="text"
                className="admin-form-input"
                placeholder="e.g. Cotton Protection & PGR"
                value={formData.cropOrCategory}
                onChange={handleChange}
              />
            </div>

            {/* Rating */}
            <div className="admin-form-group">
              <label htmlFor="rev-rate" className="admin-form-label">
                Star Rating (1 to 5)
              </label>
              <select
                id="rev-rate"
                name="rate"
                className="admin-form-select"
                value={formData.rate}
                onChange={handleChange}
              >
                <option value={5}>5 Stars - Outstanding (★★★★★)</option>
                <option value={4}>4 Stars - Very Good (★★★★☆)</option>
                <option value={3}>3 Stars - Good (★★★☆☆)</option>
                <option value={2}>2 Stars - Average (★★☆☆☆)</option>
                <option value={1}>1 Star - Poor (★☆☆☆☆)</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div className="admin-form-group">
            <label htmlFor="rev-title" className="admin-form-label">
              Review Title / Headline <span className="required">*</span>
            </label>
            <input
              id="rev-title"
              name="title"
              type="text"
              className={`admin-form-input ${errors.title ? 'error' : ''}`}
              placeholder="e.g. Remarkable boll retention and zero pink bollworm issue"
              value={formData.title}
              onChange={handleChange}
              required
            />
            {errors.title && <span className="admin-form-error-msg">{errors.title}</span>}
          </div>

          {/* Description */}
          <div className="admin-form-group">
            <label htmlFor="rev-desc" className="admin-form-label">
              Testimonial Description <span className="required">*</span>
            </label>
            <textarea
              id="rev-desc"
              name="description"
              rows={4}
              className={`admin-form-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Farmer's firsthand experience using Redberry products..."
              value={formData.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <span className="admin-form-error-msg">{errors.description}</span>
            )}
          </div>

          {/* Verified Checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '1rem 0' }}>
            <input
              id="rev-verified"
              name="verified"
              type="checkbox"
              style={{ width: '18px', height: '18px', accentColor: 'var(--admin-primary)', cursor: 'pointer' }}
              checked={formData.verified}
              onChange={handleChange}
            />
            <label htmlFor="rev-verified" style={{ fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}>
              Mark as CIB Verified Field Customer
            </label>
          </div>

          {/* Actions */}
          <div className="admin-form-footer">
            <Link to="/admin/reviews" className="btn-admin-secondary">
              CANCEL
            </Link>
            <button type="submit" className="btn-admin-primary">
              {isEditMode ? '💾 UPDATE REVIEW' : '✨ PUBLISH REVIEW'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
