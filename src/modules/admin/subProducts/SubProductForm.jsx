/* ============================================
   SUB-PRODUCT FORM COMPONENT
   FILE: SubProductForm.jsx
   Clean, Modern Sub-Product Management UI
   ============================================ */

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  FlaskConical, 
  Package, 
  Tag, 
  Trash2, 
  Star, 
  UploadCloud, 
  ImagePlus, 
  ArrowLeft, 
  Check, 
  X,
  FileText
} from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { getProductsApi } from '../../../api/productApi';
import { 
  createSubProductApi, 
  updateSubProductApi, 
  getSubProductByIdApi 
} from '../../../api/subProductApi';
import { uploadImagesApi } from '../../../api/uploadApi';
import { useToast } from '../../../context/ToastContext';
import AdminSelect from '../../../components/common/AdminSelect';
import RichTextEditor from '../../../components/common/RichTextEditor';

// Standard packaging sizes options matching ProductForm.jsx
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

export default function SubProductForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { showToast } = useToast();
  const { products: contextProducts, getSubProductById, addSubProduct, updateSubProduct } = useAdminData();

  const [availableProducts, setAvailableProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    parentProductId: '',
    parentProductName: '',
    dosage: '',
    packSizes: ['250 ml', '500 ml', '1 Litre'],
    shortDescription: '',
    description: '',
    status: 'Active',
    images: [],
  });


  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  // Fetch all products from API & Context to populate the product dropdown
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await getProductsApi({ limit: 200 });
        if (res.success && Array.isArray(res.data?.products) && res.data.products.length > 0) {
          setAvailableProducts(res.data.products);
          if (!formData.parentProductId) {
            setFormData((prev) => ({
              ...prev,
              parentProductId: res.data.products[0]._id || res.data.products[0].id,
              parentProductName: res.data.products[0].name,
            }));
          }
        } else if (contextProducts && contextProducts.length > 0) {
          setAvailableProducts(contextProducts);
          if (!formData.parentProductId) {
            setFormData((prev) => ({
              ...prev,
              parentProductId: contextProducts[0].id,
              parentProductName: contextProducts[0].name,
            }));
          }
        }
      } catch (e) {
        if (contextProducts && contextProducts.length > 0) {
          setAvailableProducts(contextProducts);
          if (!formData.parentProductId) {
            setFormData((prev) => ({
              ...prev,
              parentProductId: contextProducts[0].id,
              parentProductName: contextProducts[0].name,
            }));
          }
        }
      }
    };

    fetchAllProducts();
  }, [contextProducts]);

  // Load existing sub-product data in edit mode
  useEffect(() => {
    if (isEditMode) {
      const existing = getSubProductById(id);
      if (existing) {
        // Parse pack sizes
        let parsedSizes = [];
        if (Array.isArray(existing.packSizes)) {
          parsedSizes = existing.packSizes;
        } else if (Array.isArray(existing.packagingSizes)) {
          parsedSizes = existing.packagingSizes;
        } else if (typeof existing.packSizes === 'string' && existing.packSizes) {
          parsedSizes = existing.packSizes.split(',').map((s) => s.trim()).filter(Boolean);
        } else if (typeof existing.packagingSizes === 'string' && existing.packagingSizes) {
          parsedSizes = existing.packagingSizes.split(',').map((s) => s.trim()).filter(Boolean);
        }

        if (parsedSizes.length === 0) {
          parsedSizes = ['250 ml', '500 ml', '1 Litre'];
        }

        // Collect existing images
        const existingImages = Array.isArray(existing.images) && existing.images.length > 0
          ? existing.images
          : existing.image
          ? [existing.image]
          : ['/images/products/premium_dummy.jpg'];

        setFormData({
          name: existing.name || '',
          parentProductId: existing.parentProductId || '',
          parentProductName: existing.parentProductName || '',
          dosage: existing.dosage || '',
          packSizes: parsedSizes,
          shortDescription: (existing.shortDescription || '').replace(/<[^>]+>/g, ''),
          description: existing.description || '',
          status: existing.status || 'Active',
          images: existingImages,
        });
      } else {
        navigate('/admin/sub-products');
      }
    }
  }, [id, isEditMode, getSubProductById, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'parentProductId') {
      const selectedParent = availableProducts.find(
        (p) => (p._id === value || p.id === value)
      );
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

          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Multiple image upload handlers - saves files to backend uploads/sub-products/ folder
  const handleFiles = async (files) => {
    const validFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    setIsUploadingImages(true);
    try {
      // 1. Compress images for fast upload
      const compressionPromises = validFiles.map((file) => compressImage(file, 1000, 1000, 0.8));
      const compressedImages = await Promise.all(compressionPromises);

      // 2. Upload to server project folder (assets/subproduct/)
      const uploadRes = await uploadImagesApi(compressedImages, 'subproduct');
      if (uploadRes && uploadRes.success && Array.isArray(uploadRes.data?.urls) && uploadRes.data.urls.length > 0) {
        const storedUrls = uploadRes.data.urls;
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...storedUrls],
        }));
        showToast(`${storedUrls.length} ${storedUrls.length === 1 ? 'image' : 'images'} stored to assets/subproduct folder!`, 'success');
      } else {
        // Fallback to compressed base64 if server upload fails
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...compressedImages],
        }));
      }

      if (errors.images) {
        setErrors((prev) => ({ ...prev, images: '' }));
      }
    } catch (err) {
      console.error('Error uploading images to server folder:', err);
      showToast('Error uploading images to server folder', 'error');
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

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required.';
    if (!formData.shortDescription.trim()) errs.shortDescription = 'Short summary is required.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Ensure all base64 images (if any) are uploaded to project folder first
      let finalImages = [...formData.images];
      const base64Images = finalImages.filter((img) => typeof img === 'string' && img.startsWith('data:image/'));
      if (base64Images.length > 0) {
        const uploadRes = await uploadImagesApi(base64Images, 'subproduct');
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

      // 2. Primary image URL & images URL array
      const primaryImageUrl = finalImages.length > 0 ? finalImages[0] : '/images/products/premium_dummy.jpg';

      const payload = {
        name: formData.name.trim(),
        productId: formData.parentProductId,
        parentProductId: formData.parentProductId,
        parentProductName: formData.parentProductName,
        dosage: formData.dosage,
        packagingSizes: formData.packSizes,
        packSizes: formData.packSizes.join(', '),
        shortDescription: formData.shortDescription.trim(),
        description: formData.description,
        image: primaryImageUrl,
        images: finalImages.length > 0 ? finalImages : ['/images/products/premium_dummy.jpg'],
        status: formData.status || 'Active',
      };

      if (isEditMode) {
        if (/^[0-9a-fA-F]{24}$/.test(id)) {
          await updateSubProductApi(id, payload);
        }
        await updateSubProduct(id, payload);
        showToast('Sub-Product updated successfully!', 'success');
      } else {
        const res = await createSubProductApi(payload);
        if (res && res.success && res.data) {
          const created = res.data;
          await addSubProduct({
            ...payload,
            id: created._id || created.id,
            _id: created._id || created.id,
            skipApi: true,
          });
        } else {
          await addSubProduct(payload);
        }
        showToast('Sub-Product created successfully with image URLs!', 'success');
      }
      navigate('/admin/sub-products');
    } catch (err) {
      console.error('Error saving subproduct to database:', err);
      showToast('Error saving sub-product to database', 'error');
    } finally {
      setIsSubmitting(false);
    }
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
              ? `Update packaging sizes, specifications, and properties for (${id})`
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
          {/* Section 1: Product Identification & Summary */}
          <div className="admin-form-section-title">
            <FlaskConical size={18} className="text-emerald-700" />
            <span>Product Identification &amp; Selection</span>
          </div>

          <div className="admin-form-grid-2">
            {/* Product Name */}
            <div className="admin-form-group">
              <label htmlFor="sub-name" className="admin-form-label">
                Product Name <span className="required">*</span>
              </label>
              <input
                id="sub-name"
                name="name"
                type="text"
                className={`admin-form-input ${errors.name ? 'error' : ''}`}
                placeholder="e.g. Aadhira WG, Bitcoin SG, Redprid"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="admin-form-error-msg">{errors.name}</span>}
            </div>

            {/* Select Product Dropdown (All Products) */}
            <div className="admin-form-group">
              <label htmlFor="sub-parent" className="admin-form-label">
                Select Product <span className="required">*</span>
              </label>
              <AdminSelect
                id="sub-parent"
                name="parentProductId"
                value={formData.parentProductId}
                onChange={(e) => handleChange(e)}
                searchable={true}
                placeholder="Select product from catalog..."
                options={availableProducts.map((p) => ({
                  value: p._id || p.id,
                  label: p.name,
                  badge: p.category,
                }))}
              />
            </div>
          </div>

          {/* Short Summary * (Single-line / Text Input matching ProductForm) */}
          <div className="admin-form-group">
            <label htmlFor="sub-short-desc" className="admin-form-label">
              Short Summary <span className="required">*</span>
            </label>
            <input
              id="sub-short-desc"
              name="shortDescription"
              type="text"
              className={`admin-form-input ${errors.shortDescription ? 'error' : ''}`}
              placeholder="Brief summary for listings, cards, and catalog search..."
              value={formData.shortDescription}
              onChange={handleChange}
              required
            />
            {errors.shortDescription && (
              <span className="admin-form-error-msg">{errors.shortDescription}</span>
            )}
          </div>

          {/* Section 2: Packaging Sizes & Dosage */}
          <div className="admin-form-section-title" style={{ marginTop: '2rem' }}>
            <Package size={18} className="text-emerald-700" />
            <span>Packaging &amp; Application Details</span>
          </div>

          <div className="admin-form-grid-2">
            {/* Dosage */}
            <div className="admin-form-group">
              <label htmlFor="sub-dosage" className="admin-form-label">
                Dosage &amp; Dilution Rate
              </label>
              <input
                id="sub-dosage"
                name="dosage"
                type="text"
                className="admin-form-input"
                placeholder="e.g. 1.2 ml per litre or 80 - 100 gm per acre"
                value={formData.dosage}
                onChange={handleChange}
              />
            </div>

            {/* Available Packaging Sizes (Select Dropdown - Exactly like Product create page) */}
            <div className="admin-form-group">
              <label className="admin-form-label">
                Available Packaging Sizes (Select Dropdown)
              </label>
              <div className="admin-pack-size-selector-wrap">
                <AdminSelect
                  id="packaging-size-preset"
                  name="packagingPreset"
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
                  searchable={true}
                  options={PACKAGING_SIZE_OPTIONS.filter((opt) => !formData.packSizes.includes(opt.value))}
                  placeholder="Select packaging size to add..."
                />
              </div>

              {/* Selected Pack Sizes Chips */}
              <div
                className="admin-selected-sizes-chips"
                style={{
                  marginTop: '0.75rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: '#F7FAF9',
                  border: '1px solid #DDE5E1',
                  borderRadius: '8px',
                  minHeight: '48px',
                  alignItems: 'center',
                }}
              >
                {formData.packSizes.length === 0 ? (
                  <span className="admin-no-sizes-msg" style={{ fontSize: '0.82rem', color: '#7A8983' }}>
                    No packaging sizes selected. Choose sizes from the dropdown above.
                  </span>
                ) : (
                  formData.packSizes.map((size) => (
                    <span
                      key={size}
                      className="admin-size-chip"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: '#ffffff',
                        color: '#0F6B4F',
                        border: '1px solid #DDF5EA',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        boxShadow: '0 1px 2px rgba(23,43,36,0.05)',
                      }}
                    >
                      <Tag size={13} />
                      <span>{size}</span>
                      <button
                        type="button"
                        className="btn-remove-size"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            packSizes: prev.packSizes.filter((s) => s !== size),
                          }));
                        }}
                        title={`Remove ${size}`}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          padding: 0,
                          marginLeft: '4px',
                          color: '#0F6B4F',
                        }}
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
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
              placeholder="Provide comprehensive instructions for farmers, mixing compatibility with other agrochemicals, spray intervals..."
              minHeight="160px"
            />
          </div>

          {/* Section 3: Multiple Image Upload & Gallery Preview */}
          <div className="admin-form-section-title" style={{ marginTop: '2rem' }}>
            <ImagePlus size={18} style={{ color: '#0F6B4F' }} />
            <span>Product Gallery &amp; Images Upload</span>
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
                <UploadCloud size={28} className={isUploadingImages ? 'animate-bounce' : ''} />
              </div>
              <div className="admin-upload-text">
                {isUploadingImages ? (
                  <>
                    <p className="admin-upload-title" style={{ color: '#0F6B4F' }}>
                      <strong>Uploading images to project folder...</strong>
                    </p>
                    <p className="admin-upload-sub">
                      Saving image files and generating URLs for database...
                    </p>
                  </>
                ) : (
                  <>
                    <p className="admin-upload-title">
                      <strong>Click to upload</strong> or drag and drop sub-product images
                    </p>
                    <p className="admin-upload-sub">
                      Stored on server folder (<code>assets/subproduct/</code>) • Saved as clean URLs in DB
                    </p>
                  </>
                )}
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

          {/* Form Actions */}
          <div className="admin-form-footer">
            <Link to="/admin/sub-products" className="btn-admin-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-admin-primary" disabled={isSubmitting}>
              <Check size={16} strokeWidth={2.5} />
              <span>
                {isSubmitting
                  ? 'Saving to Database...'
                  : isEditMode
                  ? 'Update Sub-Product'
                  : 'Create Sub-Product'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
