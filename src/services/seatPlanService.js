/**
 * Seat Plan API service
 */
import apiClient from '@/api/client'

/**
 * Normalize seat plan response
 * @param {Object} response - Axios response
 * @returns {Array} Normalized seat array
 */
function normalizeSeatPlanResponse(response) {
  const { data } = response

  if (Array.isArray(data)) {
    return data
  }

  if (data.seats) {
    return data.seats
  }

  if (data.data) {
    return Array.isArray(data.data) ? data.data : []
  }

  return []
}

/**
 * Get seat plan for event and category
 * @param {number|string} eventId - Event ID
 * @param {number|string} categoryId - Category ID
 * @returns {Promise<Array>} List of seats
 */
export async function getSeatPlan(eventId, categoryId) {
  const response = await apiClient.get(`/seat-plans/${eventId}/${categoryId}`)
  return normalizeSeatPlanResponse(response)
}

