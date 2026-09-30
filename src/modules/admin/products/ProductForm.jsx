import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminData } from '../../../context/AdminDataContext';

export default function ProductForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { getProductById, addProduct, updateProduct } = useAdminData();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Industrial',
    shortDescription: '',
    description: '',
    features: '',
    image: '/images/products/premium_dummy.jpg',
    status: 'Active',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const existing = getProductById(id);
      if (existing) {
        setFormData({
          name: existing.name || '',
          category: existing.category || 'Industrial',
          shortDescription: existing.shortDescription || '',
          description: existing.description || '',
          features: Array.isArray(existing.features)
            ? existing.features.join('\n')
            : existing.features || '',
          image: existing.image || '/images/products/premium_dummy.jpg',
          status: existing.status || 'Active',
        });
      } else {
        navigate('/admin/products');
      }
    }
  }, [id, isEditMode, getProductById, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required.';
    if (!formData.category.trim()) errs.category = 'Category is required.';
    if (!formData.shortDescription.trim()) errs.shortDescription = 'Short description is required.';
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
      updateProduct(id, formData);
    } else {
      addProduct(formData);
    }

    navigate('/admin/products');
  };

  return (
    <div className="admin-product-form-page">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">
            {isEditMode ? 'EDIT PRODUCT RECORD' : 'CREATE NEW PRODUCT'}
          </h1>
          <p className="admin-page-subtitle">
            {isEditMode
              ? `Updating existing catalog item (${id})`
              : 'Add a new product category line to the agricultural catalog'}
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/products" className="btn-admin-secondary">
            &larr; BACK TO PRODUCT LIST
          </Link>
        </div>
      </div>

      {/* Form Card Container */}
      <div className="admin-form-container">
        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-form-section-title">
            <span>📦</span> BASIC PRODUCT INFORMATION
          </div>

          <div className="admin-form-grid-2">
            {/* Product Name */}
            <div className="admin-form-group">
              <label htmlFor="prod-name" className="admin-form-label">
                Product Name <span className="required">*</span>
              </label>
              <input
                id="prod-name"
                name="name"
                type="text"
                className={`admin-form-input ${errors.name ? 'error' : ''}`}
                placeholder="e.g. Specialty Bio-Chemicals"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="admin-form-error-msg">{errors.name}</span>}
            </div>

            {/* Category */}
            <div className="admin-form-group">
              <label htmlFor="prod-category" className="admin-form-label">
                Category Line <span className="required">*</span>
              </label>
              <select
                id="prod-category"
                name="category"
                className="admin-form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Industrial">Industrial</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Specialty">Specialty</option>
                <option value="Water Treatment">Water Treatment</option>
                <option value="Bio-Nutrition">Bio-Nutrition</option>
              </select>
            </div>
          </div>

          <div className="admin-form-grid-2">
            {/* Status */}
            <div className="admin-form-group">
              <label htmlFor="prod-status" className="admin-form-label">
                Status <span className="required">*</span>
              </label>
              <select
                id="prod-status"
                name="status"
                className="admin-form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active (Visible)</option>
                <option value="Draft">Draft (Hidden)</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="admin-form-group">
              <label htmlFor="prod-image" className="admin-form-label">
                Product Image Path / URL
              </label>
              <input
                id="prod-image"
                name="image"
                type="text"
                className="admin-form-input"
                placeholder="/images/products/premium_dummy.jpg"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="admin-form-group">
            <label htmlFor="prod-short-desc" className="admin-form-label">
              Short Description / Summary <span className="required">*</span>
            </label>
            <input
              id="prod-short-desc"
              name="shortDescription"
              type="text"
              className={`admin-form-input ${errors.shortDescription ? 'error' : ''}`}
              placeholder="Brief summary for listings and product cards"
              value={formData.shortDescription}
              onChange={handleChange}
              required
            />
            {errors.shortDescription && (
              <span className="admin-form-error-msg">{errors.shortDescription}</span>
            )}
          </div>

          {/* Full Description */}
          <div className="admin-form-group">
            <label htmlFor="prod-desc" className="admin-form-label">
              Detailed Description
            </label>
            <textarea
              id="prod-desc"
              name="description"
              rows={4}
              className="admin-form-textarea"
              placeholder="Provide comprehensive details about this agricultural chemical category..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Features */}
          <div className="admin-form-group">
            <label htmlFor="prod-features" className="admin-form-label">
              Key Features & Benefits (One per line)
            </label>
            <textarea
              id="prod-features"
              name="features"
              rows={4}
              className="admin-form-textarea"
              placeholder="Consistent, lab-verified purity&#10;Bulk & drum quantities available&#10;Safety data sheets provided"
              value={formData.features}
              onChange={handleChange}
            />
            <span className="admin-form-hint">Enter each bullet point feature on a new line.</span>
          </div>

          {/* Form Actions */}
          <div className="admin-form-footer">
            <Link to="/admin/products" className="btn-admin-secondary">
              CANCEL
            </Link>
            <button type="submit" className="btn-admin-primary">
              {isEditMode ? '💾 UPDATE PRODUCT' : '✨ CREATE PRODUCT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
