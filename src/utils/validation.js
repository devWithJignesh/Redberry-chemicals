/* ============================================
   UTILS: Client-side Form Validation
   FILE: src/utils/validation.js
   ============================================ */

export const validateContactForm = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name || !formData.name.trim()) {
    errors.name = 'Full name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  const phoneRegex = /^[0-9+\s-]{10,15}$/;
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!phoneRegex.test(formData.phone.trim().replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  // Message validation
  if (!formData.message || !formData.message.trim()) {
    errors.message = 'Message cannot be empty';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
