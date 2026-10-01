import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Mail, 
  User, 
  Phone, 
  Tag, 
  AlertCircle, 
  Save, 
  ArrowLeft, 
  FileText,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import AdminSelect from '../../../components/common/AdminSelect';

export default function InquiryForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { getInquiryById, addInquiry, updateInquiry } = useAdminData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'Dealership / Distribution',
    message: '',
    status: 'Pending',
    priority: 'Normal',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const existing = getInquiryById(id);
      if (existing) {
        setFormData({
          name: existing.name || '',
          email: existing.email || '',
          phone: existing.phone || '',
          subject: existing.subject || '',
          category: existing.category || 'Dealership / Distribution',
          message: existing.message || '',
          status: existing.status || 'Pending',
          priority: existing.priority || 'Normal',
          notes: existing.notes || '',
        });
      } else {
        navigate('/admin/inquiries');
      }
    }
  }, [id, isEditMode, getInquiryById, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Contact name is required.';
    if (!formData.email.trim()) errs.email = 'Email address is required.';
    if (!formData.subject.trim()) errs.subject = 'Subject is required.';
    if (!formData.message.trim()) errs.message = 'Inquiry message / requirements are required.';
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
    if (isEditMode) {
      updateInquiry(id, formData);
    } else {
      addInquiry(formData);
    }
    setIsSubmitting(false);

    navigate('/admin/inquiries');
  };

  return (
    <div className="admin-inquiry-form-page">
      {/* Header Bar */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">
            {isEditMode ? 'Manage Inquiry & Status' : 'Create Inquiry Lead'}
          </h1>
          <p className="admin-page-subtitle">
            {isEditMode
              ? `Review customer requirements, follow-up notes, and status for (${id})`
              : 'Log an offline farmer lead or dealer procurement request'}
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/inquiries" className="btn-admin-secondary">
            <ArrowLeft size={15} />
            <span>Back to Inquiries</span>
          </Link>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="admin-form-container">
        <form onSubmit={handleSubmit} noValidate>
          
          {/* Section 1: Contact Details */}
          <div className="admin-form-section">
            <div className="admin-form-section-header">
              <div className="admin-form-section-icon">
                <User size={18} />
              </div>
              <div>
                <h3 className="admin-form-section-title">Contact & Sender Information</h3>
                <p className="admin-form-section-desc">
                  Prospect or dealer contact coordinates
                </p>
              </div>
            </div>

            <div className="admin-form-grid-3">
              {/* Name */}
              <div className="admin-form-group">
                <label htmlFor="inq-name" className="admin-form-label">
                  Client / Dealer Name <span className="required">*</span>
                </label>
                <div className="admin-input-icon-wrap">
                  <User size={15} className="admin-field-icon" />
                  <input
                    id="inq-name"
                    name="name"
                    type="text"
                    className={`admin-form-input with-icon ${errors.name ? 'error' : ''}`}
                    placeholder="e.g. Shailesh Patel"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.name && <span className="admin-form-error-msg">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="admin-form-group">
                <label htmlFor="inq-email" className="admin-form-label">
                  Email Address <span className="required">*</span>
                </label>
                <div className="admin-input-icon-wrap">
                  <Mail size={15} className="admin-field-icon" />
                  <input
                    id="inq-email"
                    name="email"
                    type="email"
                    className={`admin-form-input with-icon ${errors.email ? 'error' : ''}`}
                    placeholder="e.g. shailesh.farm@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.email && <span className="admin-form-error-msg">{errors.email}</span>}
              </div>

              {/* Phone */}
              <div className="admin-form-group">
                <label htmlFor="inq-phone" className="admin-form-label">
                  Phone Number
                </label>
                <div className="admin-input-icon-wrap">
                  <Phone size={15} className="admin-field-icon" />
                  <input
                    id="inq-phone"
                    name="phone"
                    type="text"
                    className="admin-form-input with-icon"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Inquiry Classification & Status */}
          <div className="admin-form-section">
            <div className="admin-form-section-header">
              <div className="admin-form-section-icon">
                <Tag size={18} />
              </div>
              <div>
                <h3 className="admin-form-section-title">Classification & Workflow Status</h3>
                <p className="admin-form-section-desc">
                  Categorize lead and assign resolution state
                </p>
              </div>
            </div>

            <div className="admin-form-grid-3">
              {/* Category */}
              <div className="admin-form-group">
                <label htmlFor="inq-cat" className="admin-form-label">
                  Inquiry Category
                </label>
                <AdminSelect
                  id="inq-cat"
                  name="category"
                  value={formData.category}
                  onChange={(e) => handleChange(e)}
                  options={[
                    { value: 'Dealership / Distribution', label: 'Dealership / Distribution', badge: 'B2B' },
                    { value: 'Bulk Procurement', label: 'Bulk Procurement', badge: 'Commercial' },
                    { value: 'Product Inquiry', label: 'Product Inquiry' },
                    { value: 'Agronomy Advice', label: 'Agronomy Advice' },
                    { value: 'Export / International', label: 'Export / International' },
                  ]}
                />
              </div>

              {/* Status */}
              <div className="admin-form-group">
                <label htmlFor="inq-status" className="admin-form-label">
                  Resolution Status <span className="required">*</span>
                </label>
                <AdminSelect
                  id="inq-status"
                  name="status"
                  value={formData.status}
                  onChange={(e) => handleChange(e)}
                  options={[
                    { value: 'Pending', label: 'Pending', badge: 'Action Needed', sub: 'Awaiting team response' },
                    { value: 'In Progress', label: 'In Progress', badge: 'Ongoing', sub: 'Agronomist/Sales follow-up active' },
                    { value: 'Resolved', label: 'Resolved', badge: 'Completed', sub: 'Lead finalized or closed' },
                  ]}
                />
              </div>

              {/* Priority */}
              <div className="admin-form-group">
                <label htmlFor="inq-priority" className="admin-form-label">
                  Priority Level
                </label>
                <AdminSelect
                  id="inq-priority"
                  name="priority"
                  value={formData.priority}
                  onChange={(e) => handleChange(e)}
                  options={[
                    { value: 'Normal', label: 'Normal Priority' },
                    { value: 'High', label: 'High Priority', badge: 'High' },
                    { value: 'Urgent', label: 'Urgent Attention', badge: 'Urgent' },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Requirements & Internal Notes */}
          <div className="admin-form-section">
            <div className="admin-form-section-header">
              <div className="admin-form-section-icon">
                <FileText size={18} />
              </div>
              <div>
                <h3 className="admin-form-section-title">Requirements & Agronomy Notes</h3>
                <p className="admin-form-section-desc">
                  Customer requirements and internal team updates
                </p>
              </div>
            </div>

            {/* Subject */}
            <div className="admin-form-group">
              <label htmlFor="inq-sub" className="admin-form-label">
                Subject Headline <span className="required">*</span>
              </label>
              <input
                id="inq-sub"
                name="subject"
                type="text"
                className={`admin-form-input ${errors.subject ? 'error' : ''}`}
                placeholder="e.g. Dealership application for Junagadh & Amreli"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              {errors.subject && <span className="admin-form-error-msg">{errors.subject}</span>}
            </div>

            {/* Message */}
            <div className="admin-form-group">
              <label htmlFor="inq-msg" className="admin-form-label">
                Inquiry Message / Requirements <span className="required">*</span>
              </label>
              <textarea
                id="inq-msg"
                name="message"
                rows={4}
                className={`admin-form-textarea ${errors.message ? 'error' : ''}`}
                placeholder="Enter customer's inquiry requirements, crop challenges, order volume..."
                value={formData.message}
                onChange={handleChange}
                required
              />
              {errors.message && <span className="admin-form-error-msg">{errors.message}</span>}
            </div>

            {/* Internal Notes */}
            <div className="admin-form-group">
              <label htmlFor="inq-notes" className="admin-form-label">
                Internal Management Notes / Follow-Up Actions
              </label>
              <textarea
                id="inq-notes"
                name="notes"
                rows={3}
                className="admin-form-textarea"
                placeholder="e.g. Price list sent on WhatsApp, agronomist assigned for farm visit..."
                value={formData.notes}
                onChange={handleChange}
              />
              <span className="admin-form-hint">Internal notes for Redberry sales & agronomy team only.</span>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="admin-form-footer">
            <Link to="/admin/inquiries" className="btn-admin-secondary">
              Cancel
            </Link>
            <button 
              type="submit" 
              className="btn-admin-primary"
              disabled={isSubmitting}
            >
              <Save size={16} />
              <span>{isSubmitting ? 'Saving...' : isEditMode ? 'Update Inquiry' : 'Create Inquiry Lead'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
