import { useState } from 'react';
import { validateContactForm } from '../../../../../utils/validation';
import { INQUIRY_TYPES } from '../../data';
import './ContactForm.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: INQUIRY_TYPES[0],
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for field being typed into
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateContactForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    // Submission success state
    setIsSubmitted(true);
    setErrors({});
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: INQUIRY_TYPES[0],
      message: '',
    });
    setIsSubmitted(false);
  };

  return (
    <div className="contact-form-card">
      <h3 className="contact-form-title">Send Us an Inquiry</h3>
      <p className="contact-form-subtitle">
        Fill in the details below and an agricultural agronomy specialist will respond shortly.
      </p>

      {isSubmitted ? (
        <div className="form-success-banner">
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</div>
          <div className="form-success-title">Message Sent Successfully!</div>
          <p className="form-success-desc">
            Thank you, <strong>{formData.name}</strong>. Our team will contact you at {formData.phone} or {formData.email} within 24 business hours.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-primary"
            style={{ marginTop: '16px' }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form-element" noValidate>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Patel"
                className={`form-input ${errors.name ? 'has-error' : ''}`}
              />
              {errors.name && <span className="form-error-msg">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className={`form-input ${errors.phone ? 'has-error' : ''}`}
              />
              {errors.phone && (
                <span className="form-error-msg">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. yourname@gmail.com"
              className={`form-input ${errors.email ? 'has-error' : ''}`}
            />
            {errors.email && (
              <span className="form-error-msg">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="inquiryType" className="form-label">
              Inquiry Type
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="form-select"
            >
              {INQUIRY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message / Requirements *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your crop type, pest problem, or dealership interest..."
              className={`form-textarea ${errors.message ? 'has-error' : ''}`}
            />
            {errors.message && (
              <span className="form-error-msg">{errors.message}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary form-submit-btn">
            Submit Inquiry Now →
          </button>
        </form>
      )}
    </div>
  );
}
