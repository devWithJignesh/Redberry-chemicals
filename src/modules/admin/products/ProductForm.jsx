import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  FileText,
  Droplet,
  ListChecks,
  ImagePlus,
  UploadCloud,
  Trash2,
  Star,
  ArrowLeft,
  Check,
  X,
  Plus
} from 'lucide-react';
import { getProductByIdApi, createProductApi, updateProductApi } from '../../../api/productApi';
import { uploadImagesApi } from '../../../api/uploadApi';
import { useToast } from '../../../context/ToastContext';
import RichTextEditor from '../../../components/common/RichTextEditor';
import AdminSelect from '../../../components/common/AdminSelect';

const CATEGORIES = [
  'Insecticides',
  'Fungicides',
  'Herbicides',
  'PGR & Nutrition',
];

const categoryOptions = CATEGORIES.map((cat) => ({
  value: cat,
  label: cat,
}));

const PACKAGING_SIZE_OPTIONS = [
  { value: '100 ml', label: '100 ml' },
  { value: '250 ml', label: '250 ml' },
  { value: '500 ml', label: '500 ml' },
  { value: '1 Litre', label: '1 Litre' },
  { value: '5 Litres', label: '5 Litres' },
  { value: '20 Litres', label: '20 Litres' },
  { value: '200 Litres (Drum)', label: '200 Litres (Drum)' },
  { value: '100 gm', label: '100 gm' },
  { value: '250 gm', label: '250 gm' },
  { value: '500 gm', label: '500 gm' },
  { value: '1 kg', label: '1 kg' },
  { value: '5 kg', label: '5 kg' },
  { value: '10 kg', label: '10 kg' },
  { value: '25 kg (Bag)', label: '25 kg (Bag)' },
];

export default function ProductForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Insecticides',
    shortDescription: '',
    description: '',
    features: '',
    dosage: '',
    targetPests: '',
    packSizes: ['250 ml', '500 ml', '1 Litre'],
    status: 'Active',
    images: [],
  });

  const [customSizeInput, setCustomSizeInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const loadProduct = async () => {
        try {
          const res = await getProductByIdApi(id);
          if (res.success && res.data) {
            const existing = res.data;
            const existingImages = Array.isArray(existing.images) && existing.images.length > 0
              ? existing.images
              : existing.image
                ? [existing.image]
                : ['/images/products/premium_dummy.jpg'];

            let formattedFeatures = '';
            if (Array.isArray(existing.features)) {
              formattedFeatures = `<ul>${existing.features.map(f => `<li>${f}</li>`).join('')}</ul>`;
            } else {
              formattedFeatures = existing.features || '';
            }

            setFormData({
              name: existing.name || '',
              category: existing.category || 'Insecticides',
              shortDescription: existing.shortDescription || '',
              description: existing.description || '',
              features: formattedFeatures,
              dosage: existing.dosage || '',
              targetPests: existing.targetPests || '',
              packSizes: Array.isArray(existing.packSizes) && existing.packSizes.length > 0 ? existing.packSizes : ['250 ml', '500 ml', '1 Litre'],
              status: existing.status || 'Active',
              images: existingImages,
            });
          }
        } catch (err) {
          showToast('Product not found in database.', 'error');
          navigate('/admin/products');
        }
      };
      loadProduct();
    }
  }, [id, isEditMode, navigate, showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Helper to compress uploaded images using HTML5 Canvas
  const compressImage = (file, maxWidth = 1000, maxHeight = 1000, quality = 0.75) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert canvas to compressed base64 JPEG
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle multiple file selection - local compression & preview ONLY (NO API call on file select)
  const handleFiles = async (files) => {
    const validFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    setIsUploadingImages(true);
    try {
      const compressionPromises = validFiles.map((file) => compressImage(file, 1000, 1000, 0.8));
      const compressedImages = await Promise.all(compressionPromises);

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...compressedImages],
      }));

      if (errors.images) {
        setErrors((prev) => ({ ...prev, images: '' }));
      }
    } catch (err) {
      showToast('Error reading selected image files.', 'error');
    } finally {
      setIsUploadingImages(false);
    }
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
    showToast('Cover photo updated!', 'success');
  };

  // Add custom pack size
  const handleAddCustomSize = () => {
    const trimmed = customSizeInput.trim();
    if (trimmed && !formData.packSizes.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        packSizes: [...prev.packSizes, trimmed],
      }));
      setCustomSizeInput('');
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required.';
    if (!formData.shortDescription.trim()) errs.shortDescription = 'Short description is required.';
    if (!formData.dosage.trim()) errs.dosage = 'Dosage & Dilution Rate is required.';
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

    let parsedFeatures = [];
    if (typeof formData.features === 'string' && formData.features.trim()) {
      const raw = formData.features;
      if (/<li[\s\S]*?>/i.test(raw)) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = raw;
        const lis = tempDiv.querySelectorAll('li');
        if (lis.length > 0) {
          parsedFeatures = Array.from(lis).map((li) => li.innerHTML.trim()).filter(Boolean);
        } else {
          parsedFeatures = [raw.trim()];
        }
      } else if (/<[a-z][\s\S]*>/i.test(raw)) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = raw;
        const nodes = tempDiv.querySelectorAll('div, p');
        if (nodes.length > 0) {
          parsedFeatures = Array.from(nodes).map((n) => n.innerHTML.trim()).filter(Boolean);
        } else {
          parsedFeatures = [raw.trim()];
        }
      } else {
        parsedFeatures = raw.split('\n').map((s) => s.trim()).filter(Boolean);
      }
    } else if (Array.isArray(formData.features)) {
      parsedFeatures = formData.features;
    }

    setIsSubmitting(true);
    try {
      // Single upload API call when button is clicked (if new base64 images are present)
      let finalImages = [...formData.images];
      const base64Images = finalImages.filter((img) => typeof img === 'string' && img.startsWith('data:image/'));
      if (base64Images.length > 0) {
        const uploadRes = await uploadImagesApi(base64Images, 'product');
        if (uploadRes && uploadRes.success && Array.isArray(uploadRes.data?.urls)) {
          let urlIdx = 0;
          finalImages = finalImages.map((img) => {
            if (typeof img === 'string' && img.startsWith('data:image/')) {
              const assigned = uploadRes.data.urls[urlIdx] || img;
              urlIdx++;
              return assigned;
            }
            return img;
          });
        }
      }

      const primaryImageUrl = finalImages.length > 0 ? finalImages[0] : '/images/products/premium_dummy.jpg';

      const payload = {
        ...formData,
        features: parsedFeatures,
        image: primaryImageUrl,
        images: finalImages.length > 0 ? finalImages : ['/images/products/premium_dummy.jpg'],
      };

      if (isEditMode) {
        await updateProductApi(id, payload);
        showToast('Product updated successfully!', 'success');
      } else {
        await createProductApi(payload);
        showToast('Product created successfully!', 'success');
      }
      navigate('/admin/products');
    } catch (err) {
      showToast(err.message || 'Failed to save product.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-product-form-page admin-form-page-layout">
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

      <form onSubmit={handleSubmit} noValidate>
        {/* Top 2-Column Cards Grid */}
        <div className="admin-form-two-col-cards">
          {/* Card 1: Basic Product Information */}
          <div className="admin-form-card">
            <div className="admin-form-card-header">
              <FileText size={18} className="admin-form-card-icon" />
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
                  placeholder="e.g. Redprid Super"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <span className="admin-form-error-msg">{errors.name}</span>}
              </div>

              {/* Agrochemical Category Custom Dropdown */}
              <div className="admin-form-group">
                <label htmlFor="prod-category" className="admin-form-label">
                  Agrochemical Category <span className="required">*</span>
                </label>
                <AdminSelect
                  id="prod-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={categoryOptions}
                  placeholder="Select category..."
                />
              </div>
            </div>

            {/* Short Summary Textarea with char count */}
            <div className="admin-form-group">
              <label htmlFor="prod-short-desc" className="admin-form-label">
                Short Summary <span className="required">*</span>
              </label>
              <div className="admin-textarea-wrapper">
                <textarea
                  id="prod-short-desc"
                  name="shortDescription"
                  rows={4}
                  maxLength={400}
                  className={`admin-form-textarea ${errors.shortDescription ? 'error' : ''}`}
                  placeholder="Brief summary for listings, cards, and catalog search."
                  value={formData.shortDescription}
                  onChange={handleChange}
                  required
                />
                <span className="admin-char-count-badge">
                  {formData.shortDescription.length}/400 chars
                </span>
              </div>
              {errors.shortDescription && (
                <span className="admin-form-error-msg">{errors.shortDescription}</span>
              )}
            </div>
          </div>

          {/* Card 2: Dosage, Target Pests & Packaging Specifications */}
          <div className="admin-form-card">
            <div className="admin-form-card-header">
              <Droplet size={18} className="admin-form-card-icon" />
              <span>Dosage, Target Pests &amp; Packaging Specifications</span>
            </div>

            {/* Dosage & Dilution Rate */}
            <div className="admin-form-group">
              <label htmlFor="prod-dosage" className="admin-form-label">
                Dosage &amp; Dilution Rate <span className="required">*</span>
              </label>
              <input
                id="prod-dosage"
                name="dosage"
                type="text"
                className={`admin-form-input ${errors.dosage ? 'error' : ''}`}
                placeholder="e.g. 1.5 - 2.0 ml per litre of water (or 250 - 300 ml per acre)"
                value={formData.dosage}
                onChange={handleChange}
                required
              />
              {errors.dosage && <span className="admin-form-error-msg">{errors.dosage}</span>}
            </div>

            {/* Target Pests / Diseases */}
            <div className="admin-form-group">
              <label htmlFor="prod-pests" className="admin-form-label">
                Target Pests / Diseases
              </label>
              <input
                id="prod-pests"
                name="targetPests"
                type="text"
                className="admin-form-input"
                placeholder="e.g. Bollworms, aphids, whiteflies, thrips & mites"
                value={formData.targetPests}
                onChange={handleChange}
              />
            </div>

            {/* Available Packaging Sizes (Select Dropdown & Chips) */}
            <div className="admin-form-group">
              <label className="admin-form-label">
                Available Packaging Sizes (Select Dropdown)
              </label>
              <AdminSelect
                id="pack-size-select"
                name="packSizeSelect"
                value=""
                onChange={(e) => {
                  const selectedVal = e.target.value;
                  if (selectedVal && !formData.packSizes.includes(selectedVal)) {
                    setFormData((prev) => ({
                      ...prev,
                      packSizes: [...prev.packSizes, selectedVal],
                    }));
                  }
                }}
                options={PACKAGING_SIZE_OPTIONS.filter((opt) => !formData.packSizes.includes(opt.value))}
                placeholder="Select packaging size to add..."
              />

              {/* Selected Chips */}
              <div className="admin-pack-chips-wrap">
                {formData.packSizes.map((size) => (
                  <span key={size} className="admin-pack-chip-pill">
                    <span>{size}</span>
                    <button
                      type="button"
                      className="admin-pack-chip-remove"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          packSizes: prev.packSizes.filter((s) => s !== size),
                        }));
                      }}
                      title={`Remove ${size}`}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>

              {/* Custom Pack Size Adder Input */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="Select packaging size to add..."
                  value={customSizeInput}
                  onChange={(e) => setCustomSizeInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomSize();
                    }
                  }}
                  style={{ fontSize: '0.85rem' }}
                />
                {customSizeInput.trim() && (
                  <button
                    type="button"
                    className="btn-admin-secondary"
                    onClick={handleAddCustomSize}
                    style={{ padding: '0.5rem 0.85rem' }}
                  >
                    <Plus size={15} />
                    <span>Add</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Descriptions & Features */}
        <div className="admin-form-card">
          <div className="admin-form-card-header">
            <ListChecks size={18} className="admin-form-card-icon" />
            <span>Descriptions &amp; Features</span>
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
              placeholder="Provide comprehensive details about this agricultural chemical category."
              minHeight="160px"
            />
          </div>

          {/* Key Features & Benefits */}
          <div className="admin-form-group" style={{ marginTop: '1.25rem' }}>
            <label htmlFor="prod-features" className="admin-form-label">
              Key Features &amp; Benefits (One bullet per line)
            </label>
            <RichTextEditor
              id="prod-features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="• Consistent, lab-verified purity&#10;• Bulk drum packaging available"
              minHeight="160px"
            />
          </div>
        </div>

        {/* Card 4: Media Gallery */}
        <div className="admin-form-card">
          <div className="admin-form-card-header">
            <ImagePlus size={18} className="admin-form-card-icon" />
            <span>Media Gallery</span>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            className={`admin-media-dropzone-box ${isDragging ? 'dragging' : ''}`}
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
            <div className="admin-media-dropzone-icon">
              <UploadCloud size={28} className={isUploadingImages ? 'animate-bounce' : ''} />
            </div>
            <p className="admin-media-dropzone-title">
              <strong>Click to upload</strong> or drag and drop multiple images
            </p>
            <p className="admin-media-dropzone-sub">
              Stored on server folder <code>/assets/product/1</code> - Saved as clean URLs in DB
            </p>
          </div>

          {/* Uploaded Images Gallery Grid */}
          {formData.images.length > 0 && (
            <div className="admin-uploaded-gallery-section" style={{ marginTop: '1.5rem' }}>
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
                          <span>Cover Photo</span>
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
        </div>

        {/* Footer Actions Bar */}
        <div className="admin-form-actions-bar">
          <Link to="/admin/products" className="btn-admin-secondary">
            Cancel
          </Link>
          <button type="submit" className="btn-admin-primary" disabled={isSubmitting}>
            <Check size={16} strokeWidth={2.5} />
            <span>{isSubmitting ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

