import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminData } from '../../../context/AdminDataContext';

export default function SubProductForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { getSubProductById, addSubProduct, updateSubProduct } = useAdminData();

  const [formData, setFormData] = useState({
    name: '',
    technicalName: '',
    category: 'Insecticides',
    formulation: 'Water Dispersible Granules (WG)',
    chemicalGroup: 'Neonicotinoid',
    targetPests: '',
    recommendedCrops: '',
    dosage: '',
    packagingSizes: '100 gm, 250 gm, 500 gm, 1 Kg',
    shortDescription: '',
    description: '',
    status: 'Active',
    image: '/images/products/premium_dummy.jpg',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const existing = getSubProductById(id);
      if (existing) {
        setFormData({
          name: existing.name || '',
          technicalName: existing.technicalName || '',
          category: existing.category || 'Insecticides',
          formulation: existing.formulation || '',
          chemicalGroup: existing.chemicalGroup || '',
          targetPests: existing.targetPests || '',
          recommendedCrops: existing.recommendedCrops || '',
          dosage: existing.dosage || '',
          packagingSizes: Array.isArray(existing.packagingSizes)
            ? existing.packagingSizes.join(', ')
            : existing.packagingSizes || '',
          shortDescription: existing.shortDescription || '',
          description: existing.description || '',
          status: existing.status || 'Active',
          image: existing.image || '/images/products/premium_dummy.jpg',
        });
      } else {
        navigate('/admin/sub-products');
      }
    }
  }, [id, isEditMode, getSubProductById, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Sub-product trade name is required.';
    if (!formData.technicalName.trim()) errs.technicalName = 'Active chemical / technical name is required.';
    if (!formData.formulation.trim()) errs.formulation = 'Formulation type is required.';
    if (!formData.dosage.trim()) errs.dosage = 'Recommended dosage is required.';
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
      updateSubProduct(id, formData);
    } else {
      addSubProduct(formData);
    }

    navigate('/admin/sub-products');
  };

  return (
    <div className="admin-subproduct-form-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">
            {isEditMode ? 'EDIT SUB-PRODUCT FORMULATION' : 'CREATE NEW SUB-PRODUCT'}
          </h1>
          <p className="admin-page-subtitle">
            {isEditMode
              ? `Update chemical properties and dosage for (${id})`
              : 'Add an agricultural formulation to the sub-product catalog'}
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/sub-products" className="btn-admin-secondary">
            &larr; BACK TO SUB-PRODUCTS
          </Link>
        </div>
      </div>

      <div className="admin-form-container">
        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-form-section-title">
            <span>🧪</span> TECHNICAL & CHEMICAL SPECIFICATIONS
          </div>

          <div className="admin-form-grid-2">
            {/* Trade Name */}
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

            {/* Technical Name */}
            <div className="admin-form-group">
              <label htmlFor="sub-tech" className="admin-form-label">
                Active Ingredient / Technical Name <span className="required">*</span>
              </label>
              <input
                id="sub-tech"
                name="technicalName"
                type="text"
                className={`admin-form-input ${errors.technicalName ? 'error' : ''}`}
                placeholder="e.g. Thiamethoxam 25% WG, Emamectin Benzoate 5% SG"
                value={formData.technicalName}
                onChange={handleChange}
                required
              />
              {errors.technicalName && (
                <span className="admin-form-error-msg">{errors.technicalName}</span>
              )}
            </div>
          </div>

          <div className="admin-form-grid-3">
            {/* Category */}
            <div className="admin-form-group">
              <label htmlFor="sub-cat" className="admin-form-label">
                Agro Category <span className="required">*</span>
              </label>
              <select
                id="sub-cat"
                name="category"
                className="admin-form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Insecticides">Insecticides</option>
                <option value="Fungicides">Fungicides</option>
                <option value="Herbicides">Herbicides</option>
                <option value="PGR & Nutrition">PGR & Nutrition</option>
              </select>
            </div>

            {/* Formulation */}
            <div className="admin-form-group">
              <label htmlFor="sub-formulation" className="admin-form-label">
                Formulation Type <span className="required">*</span>
              </label>
              <input
                id="sub-formulation"
                name="formulation"
                type="text"
                className={`admin-form-input ${errors.formulation ? 'error' : ''}`}
                placeholder="e.g. Soluble Granules (SG), EC, SL, WG"
                value={formData.formulation}
                onChange={handleChange}
                required
              />
              {errors.formulation && (
                <span className="admin-form-error-msg">{errors.formulation}</span>
              )}
            </div>

            {/* Chemical Group */}
            <div className="admin-form-group">
              <label htmlFor="sub-group" className="admin-form-label">
                Chemical Group
              </label>
              <input
                id="sub-group"
                name="chemicalGroup"
                type="text"
                className="admin-form-input"
                placeholder="e.g. Neonicotinoid, Organophosphate"
                value={formData.chemicalGroup}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-form-section-title" style={{ marginTop: '1.5rem' }}>
            <span>🌱</span> FIELD USAGE & DOSAGE
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
                Dosage & Dilution <span className="required">*</span>
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

            {/* Packaging Sizes */}
            <div className="admin-form-group">
              <label htmlFor="sub-pkg" className="admin-form-label">
                Available Packaging Sizes
              </label>
              <input
                id="sub-pkg"
                name="packagingSizes"
                type="text"
                className="admin-form-input"
                placeholder="e.g. 100 gm, 250 gm, 500 gm, 1 Kg"
                value={formData.packagingSizes}
                onChange={handleChange}
              />
              <span className="admin-form-hint">Separate pack sizes with commas.</span>
            </div>
          </div>

          {/* Short Description */}
          <div className="admin-form-group">
            <label htmlFor="sub-short-desc" className="admin-form-label">
              Short Description
            </label>
            <textarea
              id="sub-short-desc"
              name="shortDescription"
              rows={3}
              className="admin-form-textarea"
              placeholder="Summary of product mode of action and rapid knockdown properties..."
              value={formData.shortDescription}
              onChange={handleChange}
            />
          </div>

          {/* Form Actions */}
          <div className="admin-form-footer">
            <Link to="/admin/sub-products" className="btn-admin-secondary">
              CANCEL
            </Link>
            <button type="submit" className="btn-admin-primary">
              {isEditMode ? '💾 UPDATE SUB-PRODUCT' : '✨ CREATE SUB-PRODUCT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
