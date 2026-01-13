/**
 * Form validation utilities
 */

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} Is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate required field
 * @param {any} value - Field value
 * @returns {boolean} Is valid
 */
export function isRequired(value) {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined && value !== ''
}

/**
 * Validate credit card number (basic length check)
 * @param {string} cardNumber - Card number
 * @returns {boolean} Is valid
 */
export function isValidCardNumber(cardNumber) {
  const cleaned = cardNumber.replace(/\s/g, '')
  return cleaned.length >= 13 && cleaned.length <= 19 && /^\d+$/.test(cleaned)
}

/**
 * Validate expiry month
 * @param {number} month - Month (1-12)
 * @returns {boolean} Is valid
 */
export function isValidMonth(month) {
  const num = parseInt(month)
  return !isNaN(num) && num >= 1 && num <= 12
}

/**
 * Validate expiry year (2-digit)
 * @param {number} year - Year (00-99)
 * @returns {boolean} Is valid
 */
export function isValidYear(year) {
  const num = parseInt(year)
  return !isNaN(num) && num >= 0 && num <= 99
}

/**
 * Validate CVV
 * @param {number} cvv - CVV code
 * @returns {boolean} Is valid
 */
export function isValidCVV(cvv) {
  const str = String(cvv)
  return str.length >= 3 && str.length <= 4 && /^\d+$/.test(str)
}

/**
 * Validate payment form
 * @param {Object} form - Payment form data
 * @returns {Object} Validation result with errors
 */
export function validatePaymentForm(form) {
  const errors = {}

  if (!isRequired(form.customer_name)) {
    errors.customer_name = 'First name is required'
  }

  if (!isRequired(form.customer_surname)) {
    errors.customer_surname = 'Last name is required'
  }

  if (!isRequired(form.customer_email)) {
    errors.customer_email = 'Email is required'
  } else if (!isValidEmail(form.customer_email)) {
    errors.customer_email = 'Invalid email format'
  }

  if (!isRequired(form.cc_number)) {
    errors.cc_number = 'Card number is required'
  } else if (!isValidCardNumber(form.cc_number)) {
    errors.cc_number = 'Invalid card number'
  }

  if (!isRequired(form.cc_exp_month)) {
    errors.cc_exp_month = 'Month is required'
  } else if (!isValidMonth(form.cc_exp_month)) {
    errors.cc_exp_month = 'Invalid month (1-12)'
  }

  if (!isRequired(form.cc_exp_year)) {
    errors.cc_exp_year = 'Year is required'
  } else if (!isValidYear(form.cc_exp_year)) {
    errors.cc_exp_year = 'Invalid year'
  }

  if (!isRequired(form.cc_exp_cvv)) {
    errors.cc_exp_cvv = 'CVV is required'
  } else if (!isValidCVV(form.cc_exp_cvv)) {
    errors.cc_exp_cvv = 'Invalid CVV (3-4 digits)'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

