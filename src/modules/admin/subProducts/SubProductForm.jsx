import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  FlaskConical, 
  Package, 
  Tag, 
  Plus, 
  Trash2, 
  Star, 
  UploadCloud, 
  ImagePlus, 
  ArrowLeft, 
  Check, 
  X
} from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import AdminSelect from '../../../components/common/AdminSelect';
import RichTextEditor from '../../../components/common/RichTextEditor';

// Standard packaging sizes for agrochemicals & fertilizers
const PRESET_PACKAGING_SIZES = [
  '50 gm',
  '100 gm',
  '250 gm',
  '500 gm',
  '1 Kg',
  '2 Kg',
  '5 Kg',
  '10 Kg',
  '25 Kg',
  '50 ml',
  '100 ml',
  '250 ml',
  '500 ml',
  '1 Litre',
  '5 Litre',
  '20 Litre',
  '50 Litre Drum',
  '200 Litre Drum',
];

export default function SubProductForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { products, getSubProductById, addSubProduct, updateSubProduct } = useAdminData();

  const [formData, setFormData] = useState({
    name: '',
    parentProductId: products[0]?.id || '',
    parentProductName: products[0]?.name || 'Agro Chemicals',
    targetPests: '',
    recommendedCrops: '',
    dosage: '',
    packagingSizes: ['100 gm', '250 gm', '500 gm', '1 Kg'],
    shortDescription: '',
    description: '',
    status: 'Active',
    images: [],
  });

  const [customSizeInput, setCustomSizeInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const existing = getSubProductById(id);
      if (existing) {
        // Parse packaging sizes
        let parsedSizes = [];
        if (Array.isArray(existing.packagingSizes)) {
          parsedSizes = existing.packagingSizes;
        } else if (typeof existing.packagingSizes === 'string' && existing.packagingSizes) {
          parsedSizes = existing.packagingSizes.split(',').map((s) => s.trim()).filter(Boolean);
        } else if (existing.packSizes) {
          parsedSizes = existing.packSizes.split(',').map((s) => s.trim()).filter(Boolean);
        }

        if (parsedSizes.length === 0) {
          parsedSizes = ['100 gm', '250 gm', '500 gm', '1 Kg'];
        }

        // Collect existing images
        const existingImages = Array.isArray(existing.images) && existing.images.length > 0
          ? existing.images
          : existing.image
          ? [existing.image]
          : ['/images/products/premium_dummy.jpg'];

        setFormData({
          name: existing.name || '',
          parentProductId: existing.parentProductId || products[0]?.id || '',
          parentProductName: existing.parentProductName || products[0]?.name || 'Agro Chemicals',
          targetPests: existing.targetPests || '',
          recommendedCrops: existing.recommendedCrops || '',
          dosage: existing.dosage || '',
          packagingSizes: parsedSizes,
          shortDescription: existing.shortDescription || '',
          description: existing.description || '',
          status: existing.status || 'Active',
          images: existingImages,
        });
      } else {
        navigate('/admin/sub-products');
      }
    }
  }, [id, isEditMode, getSubProductById, navigate, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'parentProductId') {
      const selectedParent = products.find((p) => p.id === value);
      setFormData((prev) => ({
        ...prev,
        parentProductId: value,
        parentProductName: selectedParent ? selectedParent.name : prev.parentProductName,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Packaging size handlers
  const handleSelectSize = (e) => {
    const selected = e.target.value;
    if (!selected) return;
    if (!formData.packagingSizes.includes(selected)) {
      setFormData((prev) => ({
        ...prev,
        packagingSizes: [...prev.packagingSizes, selected],
      }));
    }
    e.target.value = '';
  };

  const handleAddCustomSize = () => {
    const trimmed = customSizeInput.trim();
    if (trimmed && !formData.packagingSizes.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        packagingSizes: [...prev.packagingSizes, trimmed],
      }));
      setCustomSizeInput('');
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      packagingSizes: prev.packagingSizes.filter((s) => s !== sizeToRemove),
    }));
  };

  // Multiple image upload handlers
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
    if (!formData.name.trim()) errs.name = 'Sub-product brand / trade name is required.';
    if (!formData.dosage.trim()) errs.dosage = 'Recommended dosage & application rate is required.';
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
      packSizes: formData.packagingSizes.join(', '),
      packagingSizes: formData.packagingSizes,
    };

    if (isEditMode) {
      updateSubProduct(id, payload);
    } else {
      addSubProduct(payload);
    }

    navigate('/admin/sub-products');
  };

  return (
    <div className="admin-subproduct-form-page">
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">
            {isEditMode ? 'Edit Sub-Product Item' : 'Create New Sub-Product'}
          </h1>
          <p className="admin-page-subtitle">
            {isEditMode
              ? `Update packaging sizes, dosage recommendations, and properties for (${id})`
              : 'Add an agricultural chemical formulation and packaging item to the catalog'}
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/sub-products" className="btn-admin-secondary">
            <ArrowLeft size={15} />
            <span>Back to Sub-Products</span>
          </Link>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="admin-form-container">
        <form onSubmit={handleSubmit} noValidate>
          {/* Section 1: Basic Information */}
          <div className="admin-form-section-title">
            <FlaskConical size={18} className="text-emerald-700" />
            <span>Product Identification & Category</span>
          </div>

          <div className="admin-form-grid-2">
            {/* Brand / Trade Name */}
            <div className="admin-form-group">
              <label htmlFor="sub-name" className="admin-form-label">
                Brand / Trade Name <span className="required">*</span>
              </label>
              <input
                id="sub-name"
                name="name"
                type="text"
                className={`admin-form-input ${errors.name ? 'error' : ''}`}
                placeholder="e.g. AADHIRA WG, BITCOIN SG"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="admin-form-error-msg">{errors.name}</span>}
            </div>

            {/* Parent Product Line */}
            <div className="admin-form-group">
              <label htmlFor="sub-parent" className="admin-form-label">
                Parent Product Line
              </label>
              <AdminSelect
                id="sub-parent"
                name="parentProductId"
                value={formData.parentProductId}
                onChange={(e) => handleChange(e)}
                searchable={true}
                options={products.map((p) => ({
                  value: p.id,
                  label: p.name,
                  badge: p.category,
                }))}
              />
            </div>
          </div>

          {/* Section 2: Field Usage & Packaging */}
          <div className="admin-form-section-title" style={{ marginTop: '2rem' }}>
            <Package size={18} className="text-emerald-700" />
            <span>Field Usage & Packaging Specifications</span>
          </div>

          <div className="admin-form-grid-2">
            {/* Target Pests */}
            <div className="admin-form-group">
              <label htmlFor="sub-pests" className="admin-form-label">
                Target Pests / Diseases
              </label>
              <input
                id="sub-pests"
                name="targetPests"
                type="text"
                className="admin-form-input"
                placeholder="e.g. Bollworm, Aphids, Jassids, Stem Borer"
                value={formData.targetPests}
                onChange={handleChange}
              />
            </div>

            {/* Recommended Crops */}
            <div className="admin-form-group">
              <label htmlFor="sub-crops" className="admin-form-label">
                Recommended Crops
              </label>
              <input
                id="sub-crops"
                name="recommendedCrops"
                type="text"
                className="admin-form-input"
                placeholder="e.g. Cotton, Paddy (Rice), Chilli, Tomato, Groundnut"
                value={formData.recommendedCrops}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-form-grid-2">
            {/* Dosage */}
            <div className="admin-form-group">
              <label htmlFor="sub-dosage" className="admin-form-label">
                Dosage & Dilution Rate <span className="required">*</span>
              </label>
              <input
                id="sub-dosage"
                name="dosage"
                type="text"
                className={`admin-form-input ${errors.dosage ? 'error' : ''}`}
                placeholder="e.g. 80 - 100 gm per acre dissolved in 200 L water"
                value={formData.dosage}
                onChange={handleChange}
                required
              />
              {errors.dosage && <span className="admin-form-error-msg">{errors.dosage}</span>}
            </div>

            {/* Packaging Sizes Dropdown & Chips */}
            <div className="admin-form-group">
              <label className="admin-form-label">
                Available Packaging Sizes (Select Dropdown)
              </label>
              <div className="admin-pack-size-selector-wrap">
                {/* Size Dropdown */}
                <AdminSelect
                  id="packaging-size-preset"
                  name="packagingPreset"
                  value=""
                  placeholder="➕ Select / Add Packaging Size..."
                  onChange={(e, val) => {
                    const selected = val || e.target.value;
                    if (selected && !formData.packagingSizes.includes(selected)) {
                      setFormData((prev) => ({
                        ...prev,
                        packagingSizes: [...prev.packagingSizes, selected],
                      }));
                    }
                  }}
                  searchable={true}
                  options={PRESET_PACKAGING_SIZES.map((size) => ({
                    value: size,
                    label: size,
                    badge: formData.packagingSizes.includes(size) ? 'Added' : 'Add',
                  }))}
                />

                {/* Custom Size Addition */}
                <div className="admin-custom-size-row">
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="Or enter custom size (e.g. 15 Kg Bag)"
                    value={customSizeInput}
                    onChange={(e) => setCustomSizeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomSize();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn-admin-secondary"
                    onClick={handleAddCustomSize}
                    style={{ padding: '0.65rem 1rem', whiteSpace: 'nowrap' }}
                  >
                    <Plus size={14} />
                    <span>Add Size</span>
                  </button>
                </div>
              </div>

              {/* Selected Packaging Badges */}
              <div className="admin-selected-sizes-chips">
                {formData.packagingSizes.length === 0 ? (
                  <span className="admin-no-sizes-msg">No packaging sizes selected. Choose from dropdown above.</span>
                ) : (
                  formData.packagingSizes.map((size) => (
                    <span key={size} className="admin-size-chip">
                      <Tag size={12} />
                      <span>{size}</span>
                      <button
                        type="button"
                        className="btn-remove-chip"
                        onClick={() => handleRemoveSize(size)}
                        title={`Remove ${size}`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div className="admin-form-group">
            <label htmlFor="sub-short-desc" className="admin-form-label">
              Short Description / Summary
            </label>
            <RichTextEditor
              id="sub-short-desc"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Summary of product mode of action and rapid knockdown properties..."
              minHeight="140px"
            />
          </div>

          {/* Detailed Description */}
          <div className="admin-form-group">
            <label htmlFor="sub-desc" className="admin-form-label">
              Detailed Description / Mode of Action
            </label>
            <RichTextEditor
              id="sub-desc"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide comprehensive instructions for farmers, mixing compatibility with other agrochemicals, spray intervals, and harvest interval safety..."
              minHeight="180px"
            />
          </div>

          {/* Section 3: Multiple Image Upload & Gallery Preview */}
          <div className="admin-form-section-title" style={{ marginTop: '2rem' }}>
            <ImagePlus size={18} className="text-emerald-700" />
            <span>Product Gallery & Images Upload</span>
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
                  <strong>Click to upload</strong> or drag and drop sub-product images
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
                  ★ First image is used as the primary formulation cover photo
                </span>
              </div>

              <div className="admin-image-previews-grid">
                {formData.images.map((imgSrc, idx) => (
                  <div key={idx} className={`admin-image-preview-card ${idx === 0 ? 'is-primary' : ''}`}>
                    <div className="admin-preview-img-wrap">
                      <img
                        src={imgSrc}
                        alt={`Sub-Product preview ${idx + 1}`}
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
            <Link to="/admin/sub-products" className="btn-admin-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-admin-primary">
              <Check size={16} strokeWidth={2.5} />
              <span>{isEditMode ? 'Update Sub-Product' : 'Create Sub-Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
