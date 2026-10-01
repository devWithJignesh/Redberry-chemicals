import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Package, 
  ListChecks, 
  UploadCloud, 
  ImagePlus, 
  Trash2, 
  Star, 
  ArrowLeft, 
  Check 
} from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import RichTextEditor from '../../../components/common/RichTextEditor';

export default function ProductForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { getProductById, addProduct, updateProduct } = useAdminData();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Agriculture',
    shortDescription: '',
    description: '',
    features: '',
    status: 'Active',
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const existing = getProductById(id);
      if (existing) {
        // Collect existing images
        const existingImages = Array.isArray(existing.images) && existing.images.length > 0
          ? existing.images
          : existing.image
          ? [existing.image]
          : ['/images/products/premium_dummy.jpg'];

        setFormData({
          name: existing.name || '',
          category: existing.category || 'Agriculture',
          shortDescription: existing.shortDescription || '',
          description: existing.description || '',
          features: Array.isArray(existing.features)
            ? existing.features.join('\n')
            : existing.features || '',
          status: existing.status || 'Active',
          images: existingImages,
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

  // Handle multiple file upload
  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    const readers = validFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((newImages) => {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
      if (errors.images) {
        setErrors((prev) => ({ ...prev, images: '' }));
      }
    });
  };

  const handleFileInputChange = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSetPrimaryImage = (indexToPrimary) => {
    setFormData((prev) => {
      const selected = prev.images[indexToPrimary];
      const others = prev.images.filter((_, idx) => idx !== indexToPrimary);
      return {
        ...prev,
        images: [selected, ...others],
      };
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required.';
    if (!formData.shortDescription.trim()) errs.shortDescription = 'Short description is required.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const payload = {
      ...formData,
      image: formData.images.length > 0 ? formData.images[0] : '/images/products/premium_dummy.jpg',
      images: formData.images.length > 0 ? formData.images : ['/images/products/premium_dummy.jpg'],
    };

    if (isEditMode) {
      updateProduct(id, payload);
    } else {
      addProduct(payload);
    }

    navigate('/admin/products');
  };

  return (
    <div className="admin-product-form-page">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">
            {isEditMode ? 'Edit Product Record' : 'Create New Product'}
          </h1>
          <p className="admin-page-subtitle">
            {isEditMode
              ? `Updating catalog specification and formulation details (${id})`
              : 'Add a top-level agricultural product category to the master catalog'}
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/products" className="btn-admin-secondary">
            <ArrowLeft size={15} />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="admin-form-container">
        <form onSubmit={handleSubmit} noValidate>
          {/* Section 1: Basic Information */}
          <div className="admin-form-section-title">
            <Package size={18} className="text-emerald-700" />
            <span>Basic Product Information</span>
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
                placeholder="e.g. Agro Chemicals & Crop Nutrition"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="admin-form-error-msg">{errors.name}</span>}
            </div>

            {/* Short Description */}
            <div className="admin-form-group">
              <label htmlFor="prod-short-desc" className="admin-form-label">
                Short Summary <span className="required">*</span>
              </label>
              <input
                id="prod-short-desc"
                name="shortDescription"
                type="text"
                className={`admin-form-input ${errors.shortDescription ? 'error' : ''}`}
                placeholder="Brief summary for listings, cards and catalog search"
                value={formData.shortDescription}
                onChange={handleChange}
                required
              />
              {errors.shortDescription && (
                <span className="admin-form-error-msg">{errors.shortDescription}</span>
              )}
            </div>
          </div>

          {/* Detailed Description */}
          <div className="admin-form-group">
            <label htmlFor="prod-desc" className="admin-form-label">
              Detailed Description
            </label>
            <RichTextEditor
              id="prod-desc"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide comprehensive details about this agricultural chemical category, industry certifications, active compounds, and farmer applications..."
              minHeight="180px"
            />
          </div>

          {/* Section 2: Features & Benefits */}
          <div className="admin-form-section-title" style={{ marginTop: '2rem' }}>
            <ListChecks size={18} className="text-emerald-700" />
            <span>Key Features & Specifications</span>
          </div>

          <div className="admin-form-group">
            <label htmlFor="prod-features" className="admin-form-label">
              Key Features & Benefits (One bullet per line)
            </label>
            <RichTextEditor
              id="prod-features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="• Consistent, lab-verified purity&#10;• Bulk and custom industrial drum packaging available&#10;• Comprehensive safety data sheets (MSDS) provided&#10;• Approved for multi-crop pest management"
              minHeight="180px"
            />
            <span className="admin-form-hint">
              Each bullet point or line formatted above will be rendered in the product features section.
            </span>
          </div>

          {/* Section 3: Multiple Image Upload & Gallery Preview */}
          <div className="admin-form-section-title" style={{ marginTop: '2rem' }}>
            <ImagePlus size={18} className="text-emerald-700" />
            <span>Product Gallery & Multiple Image Upload</span>
          </div>

          {/* Upload Dropzone */}
          <div
            className={`admin-image-upload-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
            <div className="admin-upload-zone-content">
              <div className="admin-upload-icon-circle">
                <UploadCloud size={28} />
              </div>
              <div className="admin-upload-text">
                <p className="admin-upload-title">
                  <strong>Click to upload</strong> or drag and drop multiple images
                </p>
                <p className="admin-upload-sub">
                  Supported formats: PNG, JPG, JPEG, WEBP • Max size: 5MB per image
                </p>
              </div>
            </div>
          </div>

          {/* Uploaded Images Gallery Grid */}
          {formData.images.length > 0 && (
            <div className="admin-uploaded-gallery-section">
              <div className="admin-gallery-header">
                <span className="admin-gallery-count">
                  <strong>{formData.images.length}</strong> {formData.images.length === 1 ? 'image' : 'images'} uploaded
                </span>
                <span className="admin-gallery-note">
                  ★ First image is used as the primary catalog cover photo
                </span>
              </div>

              <div className="admin-image-previews-grid">
                {formData.images.map((imgSrc, idx) => (
                  <div key={idx} className={`admin-image-preview-card ${idx === 0 ? 'is-primary' : ''}`}>
                    <div className="admin-preview-img-wrap">
                      <img
                        src={imgSrc}
                        alt={`Product preview ${idx + 1}`}
                        className="admin-preview-img"
                        onError={(e) => {
                          e.target.src = '/images/products/premium_dummy.jpg';
                        }}
                      />
                      {idx === 0 && (
                        <div className="admin-cover-badge">
                          <Star size={12} fill="#ffffff" />
                          <span>COVER PHOTO</span>
                        </div>
                      )}
                    </div>

                    <div className="admin-preview-card-footer">
                      <span className="admin-preview-index">#{idx + 1}</span>
                      <div className="admin-preview-actions">
                        {idx !== 0 && (
                          <button
                            type="button"
                            className="btn-set-cover"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetPrimaryImage(idx);
                            }}
                            title="Set as Primary Cover Image"
                          >
                            Set as Cover
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn-delete-preview"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(idx);
                          }}
                          title="Remove this image"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="admin-form-footer">
            <Link to="/admin/products" className="btn-admin-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-admin-primary">
              <Check size={16} strokeWidth={2.5} />
              <span>{isEditMode ? 'Update Product' : 'Create Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
