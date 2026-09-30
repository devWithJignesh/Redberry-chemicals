import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminData } from '../../../context/AdminDataContext';

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

    if (isEditMode) {
      updateInquiry(id, formData);
    } else {
      addInquiry(formData);
    }

    navigate('/admin/inquiries');
  };

  return (
    <div className="admin-inquiry-form-page">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">
            {isEditMode ? 'MANAGE INQUIRY & STATUS' : 'CREATE INQUIRY LEAD'}
          </h1>
          <p className="admin-page-subtitle">
            {isEditMode
              ? `Review details, internal agronomy notes, and status for (${id})`
              : 'Log an offline farmer lead or dealer procurement request'}
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/inquiries" className="btn-admin-secondary">
            &larr; BACK TO INQUIRIES
          </Link>
        </div>
      </div>

      <div className="admin-form-container">
        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-form-section-title">
            <span>📬</span> INQUIRY CONTACT & COMMUNICATION
          </div>

          <div className="admin-form-grid-3">
            {/* Name */}
            <div className="admin-form-group">
              <label htmlFor="inq-name" className="admin-form-label">
                Client / Dealer Name <span className="required">*</span>
              </label>
              <input
                id="inq-name"
                name="name"
                type="text"
                className={`admin-form-input ${errors.name ? 'error' : ''}`}
                placeholder="e.g. Shailesh Patel"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="admin-form-error-msg">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="admin-form-group">
              <label htmlFor="inq-email" className="admin-form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                id="inq-email"
                name="email"
                type="email"
                className={`admin-form-input ${errors.email ? 'error' : ''}`}
                placeholder="e.g. shailesh.farm@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="admin-form-error-msg">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="admin-form-group">
              <label htmlFor="inq-phone" className="admin-form-label">
                Phone Number
              </label>
              <input
                id="inq-phone"
                name="phone"
                type="text"
                className="admin-form-input"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-form-grid-3">
            {/* Category */}
            <div className="admin-form-group">
              <label htmlFor="inq-cat" className="admin-form-label">
                Inquiry Category
              </label>
              <select
                id="inq-cat"
                name="category"
                className="admin-form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Dealership / Distribution">Dealership / Distribution</option>
                <option value="Bulk Procurement">Bulk Procurement</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Agronomy Advice">Agronomy Advice</option>
                <option value="Export / International">Export / International</option>
              </select>
            </div>

            {/* Status */}
            <div className="admin-form-group">
              <label htmlFor="inq-status" className="admin-form-label">
                Resolution Status <span className="required">*</span>
              </label>
              <select
                id="inq-status"
                name="status"
                className="admin-form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending (Action Required)</option>
                <option value="In Progress">In Progress (Followed Up)</option>
                <option value="Resolved">Resolved (Completed)</option>
              </select>
            </div>

            {/* Priority */}
            <div className="admin-form-group">
              <label htmlFor="inq-priority" className="admin-form-label">
                Priority Level
              </label>
              <select
                id="inq-priority"
                name="priority"
                className="admin-form-select"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
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
              Inquiry Message <span className="required">*</span>
            </label>
            <textarea
              id="inq-msg"
              name="message"
              rows={4}
              className={`admin-form-textarea ${errors.message ? 'error' : ''}`}
              placeholder="Customer's inquiry requirements or message content..."
              value={formData.message}
              onChange={handleChange}
              required
            />
            {errors.message && <span className="admin-form-error-msg">{errors.message}</span>}
          </div>

          {/* Internal Notes */}
          <div className="admin-form-group">
            <label htmlFor="inq-notes" className="admin-form-label">
              Internal Admin Notes / Action Taken
            </label>
            <textarea
              id="inq-notes"
              name="notes"
              rows={3}
              className="admin-form-textarea"
              placeholder="e.g. Quotation sent on WhatsApp, sales rep scheduled field visit on Friday..."
              value={formData.notes}
              onChange={handleChange}
            />
            <span className="admin-form-hint">Internal notes for Redberry management team only.</span>
          </div>

          {/* Form Actions */}
          <div className="admin-form-footer">
            <Link to="/admin/inquiries" className="btn-admin-secondary">
              CANCEL
            </Link>
            <button type="submit" className="btn-admin-primary">
              {isEditMode ? '💾 UPDATE INQUIRY' : '✨ CREATE INQUIRY LEAD'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
