import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Star, 
  ArrowLeft, 
  Check, 
  Upload, 
  Camera, 
  X,
  FileText,
  ListChecks,
  ImagePlus
} from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { getReviewByIdApi } from '../../../api/reviewApi';
import { useToast } from '../../../context/ToastContext';

export default function ReviewForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { getReviewById, addReview, updateReview } = useAdminData();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    rate: 5,
    image: '',
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      const loadReview = async () => {
        setIsLoading(true);
        try {
          const res = await getReviewByIdApi(id);
          if (res && res.success && res.data) {
            const r = res.data;
            setFormData({
              name: r.name || '',
              address: r.address || r.location || '',
              description: r.description || r.review || r.title || '',
              rate: Number(r.rate) || 5,
              image: r.image || '',
            });
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.warn('API fetch review by id failed, falling back to context:', err);
        }

        const existing = getReviewById(id);
        if (existing) {
          setFormData({
            name: existing.name || '',
            address: existing.address || existing.location || '',
            description: existing.description || existing.review || existing.title || '',
            rate: Number(existing.rate) || 5,
            image: existing.image || '',
          });
        } else {
          showToast('Review record not found.', 'error');
          navigate('/admin/reviews');
        }
        setIsLoading(false);
      };

      loadReview();
    }
  }, [id, isEditMode, getReviewById, navigate, showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    if (!formData.name.trim()) errs.name = 'Customer name is required.';
    if (!formData.address.trim()) errs.address = 'Address / Location is required.';
    if (!formData.description.trim()) errs.description = 'Review description is required.';
    if (!formData.rate || formData.rate < 1 || formData.rate > 5) {
      errs.rate = 'Please select a rating between 1 and 5.';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    
    const finalData = {
      name: formData.name.trim(),
      address: formData.address.trim(),
      description: formData.description.trim(),
      rate: Number(formData.rate) || 5,
      image: formData.image || '/images/reviews/farmer_1.png',
    };

    try {
      if (isEditMode) {
        await updateReview(id, finalData);
        showToast('Customer review updated successfully!', 'success');
      } else {
        await addReview(finalData);
        showToast('Customer review added successfully!', 'success');
      }
      navigate('/admin/reviews');
    } catch (err) {
      showToast(err.message || 'Error during review save.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (score) => {
    switch (Math.round(score)) {
      case 5: return '5.0 - Excellent Rating';
      case 4: return '4.0 - Very Good Rating';
      case 3: return '3.0 - Good Rating';
      case 2: return '2.0 - Fair Rating';
      case 1: return '1.0 - Poor Rating';
      default: return `${score} Stars`;
    }
  };

  if (isLoading) {
    return (
      <div className="admin-review-form-page admin-form-page-layout" style={{ padding: '3rem', textAlign: 'center' }}>
        <p style={{ color: '#64748B', fontWeight: 500 }}>Loading customer review details...</p>
      </div>
    );
  }

  return (
    <div className="admin-review-form-page admin-form-page-layout">
      {/* Header Bar */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">
            {isEditMode ? 'Edit Customer Review' : 'Add Customer Review'}
          </h1>
          <p className="admin-page-subtitle">
            {isEditMode
              ? `Modify customer feedback and rating score (${id})`
              : 'Add customer feedback with name, address, testimonial description, rating, and profile photo'}
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/reviews" className="btn-admin-secondary">
            <ArrowLeft size={15} />
            <span>Back to Reviews</span>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Top 2-Column Cards Grid */}
        <div className="admin-form-two-col-cards">
          {/* Card 1: Reviewer Information */}
          <div className="admin-form-card">
            <div className="admin-form-card-header">
              <FileText size={18} className="admin-form-card-icon" />
              <span>Reviewer Information</span>
            </div>

            <div className="admin-form-grid-2">
              {/* Customer Name */}
              <div className="admin-form-group">
                <label htmlFor="rev-name" className="admin-form-label">
                  Customer Name <span className="required">*</span>
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

              {/* Address / Location */}
              <div className="admin-form-group">
                <label htmlFor="rev-address" className="admin-form-label">
                  Address / Location <span className="required">*</span>
                </label>
                <div className="admin-input-icon-wrap">
                  <MapPin size={15} className="admin-field-icon" />
                  <input
                    id="rev-address"
                    name="address"
                    type="text"
                    className={`admin-form-input with-icon ${errors.address ? 'error' : ''}`}
                    placeholder="e.g. Anand, Gujarat"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.address && <span className="admin-form-error-msg">{errors.address}</span>}
              </div>
            </div>
          </div>

          {/* Card 2: Rating & Feedback Score */}
          <div className="admin-form-card">
            <div className="admin-form-card-header">
              <Star size={18} className="admin-form-card-icon" />
              <span>Rating &amp; Feedback Score</span>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">
                Star Rating <span className="required">*</span>
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
                          fill={isFilled ? '#F59E0B' : 'none'}
                          stroke={isFilled ? '#F59E0B' : '#CBD5E1'}
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
          </div>
        </div>

        {/* Card 3: Detailed Testimonial / Description */}
        <div className="admin-form-card">
          <div className="admin-form-card-header">
            <ListChecks size={18} className="admin-form-card-icon" />
            <span>Customer Testimonial &amp; Feedback</span>
          </div>

          <div className="admin-form-group">
            <label htmlFor="rev-desc" className="admin-form-label">
              Detailed Description <span className="required">*</span>
            </label>
            <div className="admin-textarea-wrapper">
              <textarea
                id="rev-desc"
                name="description"
                rows={5}
                maxLength={600}
                className={`admin-form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Provide comprehensive details about this customer's feedback and crop protection results with Redberry agrochemicals..."
                value={formData.description}
                onChange={handleChange}
                required
              />
              <span className="admin-char-count-badge">
                {formData.description.length}/600 chars
              </span>
            </div>
            {errors.description && (
              <span className="admin-form-error-msg">{errors.description}</span>
            )}
          </div>
        </div>

        {/* Card 4: Reviewer Profile Photo */}
        <div className="admin-form-card">
          <div className="admin-form-card-header">
            <ImagePlus size={18} className="admin-form-card-icon" />
            <span>Reviewer Profile Photo</span>
          </div>

          <div className="admin-form-group">
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
                    title="Remove photo"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="admin-avatar-placeholder">
                  <Camera size={24} className="avatar-placeholder-icon" style={{ color: '#94A3B8' }} />
                  <span style={{ fontSize: '0.72rem', color: '#64748B' }}>No photo</span>
                </div>
              )}

              <div className="admin-avatar-upload-controls">
                <label className="btn-admin-secondary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Upload size={14} />
                  <span>{formData.image ? 'Change Photo' : 'Upload Profile Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <p className="admin-form-hint" style={{ margin: 0, marginTop: '0.35rem' }}>
                  Recommended: Square avatar photo (PNG, JPG, WebP). Default avatar will be assigned if empty.
                </p>
              </div>
            </div>
            {errors.image && <span className="admin-form-error-msg">{errors.image}</span>}
          </div>
        </div>

        {/* Form Actions Footer */}
        <div className="admin-form-actions-bar">
          <Link to="/admin/reviews" className="btn-admin-secondary">
            Cancel
          </Link>
          <button
            type="submit"
            className="btn-admin-primary"
            disabled={isSubmitting}
          >
            <Check size={16} strokeWidth={2.5} />
            <span>{isSubmitting ? 'Saving...' : isEditMode ? 'Update Review' : 'Save Review'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

