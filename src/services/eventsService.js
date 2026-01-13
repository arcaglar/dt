/**
 * Events API service
 */
import apiClient from '@/api/client'

/**
 * Normalize API response to handle different response structures
 * @param {Object} response - Axios response
 * @param {string} dataKey - Optional key to extract data from
 * @returns {any} Normalized data
 */
function normalizeResponse(response, dataKey = null) {
  const { data } = response

  if (dataKey && data[dataKey]) {
    return data[dataKey]
  }

  if (Array.isArray(data)) {
    return data
  }

  if (data.data) {
    return data.data
  }

  if (data.event) {
    return data.event
  }

  if (data.events) {
    return data.events
  }

  return data
}

/**
 * Get all events
 * @returns {Promise<Array>} List of events
 */
export async function getAllEvents() {
  const response = await apiClient.get('/events')
  return normalizeResponse(response, 'events')
}

/**
 * Get event by ID
 * @param {number|string} eventId - Event ID
 * @returns {Promise<Object>} Event details
 */
export async function getEventById(eventId) {
  const response = await apiClient.get(`/events/${eventId}`)
  return normalizeResponse(response, 'event')
}

