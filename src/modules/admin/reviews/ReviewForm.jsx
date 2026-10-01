import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Sprout, 
  Star, 
  ShieldCheck, 
  ArrowLeft, 
  Save, 
  Upload, 
  Camera, 
  X,
  FileText
} from 'lucide-react';
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
    image: '',
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          image: existing.image || '',
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

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, image: 'Please select a valid image file (PNG, JPG, WebP).' }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData((prev) => ({
          ...prev,
          image: uploadEvent.target.result,
        }));
        if (errors.image) {
          setErrors((prev) => ({ ...prev, image: '' }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: '',
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Customer/Farmer name is required.';
    if (!formData.location.trim()) errs.location = 'Location (e.g. Anand, Gujarat) is required.';
    if (!formData.title.trim()) errs.title = 'Review headline is required.';
    if (!formData.description.trim()) errs.description = 'Testimonial description is required.';
    if (!formData.rate || formData.rate < 1 || formData.rate > 5) {
      errs.rate = 'Please select a star rating between 1 and 5.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Default avatar if none uploaded
    const finalData = {
      ...formData,
      image: formData.image || '/images/reviews/farmer_1.png',
      rate: Number(formData.rate) || 5,
    };

    if (isEditMode) {
      updateReview(id, finalData);
    } else {
      addReview(finalData);
    }

    setIsSubmitting(false);
    navigate('/admin/reviews');
  };

  const getRatingLabel = (score) => {
    switch (Math.round(score)) {
      case 5: return '5.0 - Outstanding Experience';
      case 4: return '4.0 - Very Good';
      case 3: return '3.0 - Good / Average';
      case 2: return '2.0 - Fair';
      case 1: return '1.0 - Poor';
      default: return `${score} Stars`;
    }
  };

  return (
    <div className="admin-review-form-page">
      {/* Header Bar */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">
            {isEditMode ? 'Edit Customer Review' : 'Add Customer Review'}
          </h1>
          <p className="admin-page-subtitle">
            {isEditMode
              ? `Modify testimonial feedback and rating for record (${id})`
              : 'Create and publish a verified farmer or agro-dealer testimonial'}
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/reviews" className="btn-admin-secondary">
            <ArrowLeft size={15} />
            <span>Back to Reviews</span>
          </Link>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="admin-form-container">
        <form onSubmit={handleSubmit} noValidate>
          
          {/* Section 1: Customer Profile */}
          <div className="admin-form-section">
            <div className="admin-form-section-header">
              <div className="admin-form-section-icon">
                <User size={18} />
              </div>
              <div>
                <h3 className="admin-form-section-title">Reviewer Information</h3>
                <p className="admin-form-section-desc">
                  Farmer or agricultural dealer identity details
                </p>
              </div>
            </div>

            <div className="admin-form-grid-2">
              {/* Customer Name */}
              <div className="admin-form-group">
                <label htmlFor="rev-name" className="admin-form-label">
                  Farmer / Dealer Name <span className="required">*</span>
                </label>
                <div className="admin-input-icon-wrap">
                  <User size={15} className="admin-field-icon" />
                  <input
                    id="rev-name"
                    name="name"
                    type="text"
                    className={`admin-form-input with-icon ${errors.name ? 'error' : ''}`}
                    placeholder="e.g. Rameshbhai Patel"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.name && <span className="admin-form-error-msg">{errors.name}</span>}
              </div>

              {/* Location */}
              <div className="admin-form-group">
                <label htmlFor="rev-loc" className="admin-form-label">
                  Location / Region <span className="required">*</span>
                </label>
                <div className="admin-input-icon-wrap">
                  <MapPin size={15} className="admin-field-icon" />
                  <input
                    id="rev-loc"
                    name="location"
                    type="text"
                    className={`admin-form-input with-icon ${errors.location ? 'error' : ''}`}
                    placeholder="e.g. Anand, Gujarat"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.location && <span className="admin-form-error-msg">{errors.location}</span>}
              </div>
            </div>

            <div className="admin-form-grid-2">
              {/* Role / Profession */}
              <div className="admin-form-group">
                <label htmlFor="rev-role" className="admin-form-label">
                  Farmer Role / Crop Scale
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

              {/* Crop / Product Category */}
              <div className="admin-form-group">
                <label htmlFor="rev-crop" className="admin-form-label">
                  Crop / Chemical Product Applied
                </label>
                <div className="admin-input-icon-wrap">
                  <Sprout size={15} className="admin-field-icon" />
                  <input
                    id="rev-crop"
                    name="cropOrCategory"
                    type="text"
                    className="admin-form-input with-icon"
                    placeholder="e.g. Cotton Protection & PGR"
                    value={formData.cropOrCategory}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Rating & Feedback */}
          <div className="admin-form-section">
            <div className="admin-form-section-header">
              <div className="admin-form-section-icon">
                <FileText size={18} />
              </div>
              <div>
                <h3 className="admin-form-section-title">Rating & Testimonial</h3>
                <p className="admin-form-section-desc">
                  Star score and detailed performance review
                </p>
              </div>
            </div>

            {/* Interactive Star Rating Selector */}
            <div className="admin-form-group">
              <label className="admin-form-label">
                Performance Rating <span className="required">*</span>
              </label>
              <div className="admin-star-rating-box">
                <div className="admin-star-buttons-row">
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isFilled = (hoverRating || formData.rate) >= starValue;
                    return (
                      <button
                        key={starValue}
                        type="button"
                        className={`admin-star-btn ${isFilled ? 'active' : ''}`}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, rate: starValue }));
                          if (errors.rate) setErrors((prev) => ({ ...prev, rate: '' }));
                        }}
                        title={`Rate ${starValue} Stars`}
                      >
                        <Star
                          size={24}
                          className="admin-star-svg"
                          fill={isFilled ? '#eab308' : 'none'}
                          stroke={isFilled ? '#eab308' : '#cbd5e1'}
                          strokeWidth={1.8}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="admin-rating-badge">
                  <span className="admin-rating-score">{hoverRating || formData.rate}.0 / 5.0</span>
                  <span className="admin-rating-text">{getRatingLabel(hoverRating || formData.rate)}</span>
                </div>
              </div>
              {errors.rate && <span className="admin-form-error-msg">{errors.rate}</span>}
            </div>

            {/* Review Headline */}
            <div className="admin-form-group">
              <label htmlFor="rev-title" className="admin-form-label">
                Review Headline / Summary <span className="required">*</span>
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

            {/* Testimonial Message */}
            <div className="admin-form-group">
              <label htmlFor="rev-desc" className="admin-form-label">
                Testimonial Description <span className="required">*</span>
              </label>
              <textarea
                id="rev-desc"
                name="description"
                rows={5}
                className={`admin-form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Enter the farmer's firsthand feedback regarding product efficacy, crop yield improvement, dosage instructions, and overall satisfaction..."
                value={formData.description}
                onChange={handleChange}
                required
              />
              {errors.description && (
                <span className="admin-form-error-msg">{errors.description}</span>
              )}
            </div>
          </div>

          {/* Section 3: Reviewer Photo */}
          <div className="admin-form-section">
            <div className="admin-form-section-header">
              <div className="admin-form-section-icon">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h3 className="admin-form-section-title">Profile Photo</h3>
                <p className="admin-form-section-desc">
                  Optional customer avatar photo
                </p>
              </div>
            </div>

            {/* Optional Customer Photo Upload */}
            <div className="admin-form-group" style={{ marginTop: '1.25rem' }}>
              <label className="admin-form-label">Reviewer Photo (Optional)</label>
              
              <div className="admin-avatar-upload-wrap">
                {formData.image ? (
                  <div className="admin-avatar-preview-box">
                    <img
                      src={formData.image}
                      alt="Reviewer Preview"
                      className="admin-avatar-preview-img"
                      onError={(e) => {
                        e.target.src = '/images/reviews/farmer_1.png';
                      }}
                    />
                    <button
                      type="button"
                      className="btn-remove-avatar"
                      onClick={handleRemoveImage}
                      title="Remove custom photo"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="admin-avatar-placeholder">
                    <Camera size={24} className="avatar-placeholder-icon" />
                    <span>No photo uploaded</span>
                  </div>
                )}

                <div className="admin-avatar-upload-controls">
                  <label className="btn-admin-secondary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Upload size={14} />
                    <span>{formData.image ? 'Change Photo' : 'Upload Customer Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <p className="admin-form-hint" style={{ margin: 0 }}>
                    Recommended: 1:1 square photo (PNG, JPG, WebP up to 3MB). If left empty, default farmer avatar will be displayed.
                  </p>
                </div>
              </div>
              {errors.image && <span className="admin-form-error-msg">{errors.image}</span>}
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="admin-form-footer">
            <Link to="/admin/reviews" className="btn-admin-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-admin-primary"
              disabled={isSubmitting}
            >
              <Save size={16} />
              <span>{isSubmitting ? 'Saving...' : isEditMode ? 'Update Review' : 'Publish Review'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
