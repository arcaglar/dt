/**
 * Payment API service
 */
import apiClient from '@/api/client'

/**
 * Process payment
 * @param {Object} paymentData - Payment information
 * @returns {Promise<Object>} Payment result
 */
export async function processPayment(paymentData) {
  const response = await apiClient.post('/payment', paymentData)
  return response.data
}

/**
 * Build payment payload from form and booking state
 * @param {Object} form - Payment form data
 * @param {Object} booking - Booking state (event, category, seats)
 * @returns {Object} Payment payload
 */
export function buildPaymentPayload(form, booking) {
  return {
    eventId: booking.eventId,
    eventCategoryId: booking.categoryId,
    seats: booking.seats,
    customer_name: form.customer_name,
    customer_surname: form.customer_surname,
    customer_email: form.customer_email,
    cc_number: form.cc_number,
    cc_exp_month: parseInt(form.cc_exp_month),
    cc_exp_year: parseInt(form.cc_exp_year),
    cc_exp_cvv: parseInt(form.cc_exp_cvv),
  }
}

