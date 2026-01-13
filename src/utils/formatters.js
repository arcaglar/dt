/**
 * Date and time formatting utilities
 */

/**
 * Format a date string to readable format
 * @param {string} dateString - ISO date string
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export function formatDate(dateString, options = {}) {
  if (!dateString) return 'Date TBA'
  
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options })
}

/**
 * Format date for short display (e.g., event cards)
 * @param {string} dateString - ISO date string
 * @returns {string} Short formatted date
 */
export function formatDateShort(dateString) {
  if (!dateString) return 'Date TBA'
  
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Format time from date string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted time
 */
export function formatTime(dateString) {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format price as currency
 * @param {number} price - Price amount
 * @param {string} currency - Currency code
 * @returns {string} Formatted price
 */
export function formatPrice(price, currency = 'USD') {
  if (price === null || price === undefined) return ''
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price)
}

/**
 * Format seat label
 * @param {Object} seat - Seat object with row and number
 * @returns {string} Formatted seat label (e.g., "A1")
 */
export function formatSeatLabel(seat) {
  if (!seat) return ''
  return `${seat.row}${seat.number}`
}

