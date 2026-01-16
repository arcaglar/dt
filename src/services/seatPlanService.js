/**
 * Seat Plan API service
 */
import apiClient from '@/api/client'

/**
 * Normalize a single seat object
 * @param {Object} seat - Raw seat object
 * @returns {Object} Normalized seat object
 */
function normalizeSeat(seat) {
  const extractNumber = (obj) => {
    const possibleKeys = ['seat', 'number', 'seat_number', 'seatNumber', 'num', 'seat_num', 'seatNum']
    for (const key of possibleKeys) {
      if (obj[key] !== undefined && obj[key] !== null) {
        return obj[key]
      }
    }
    return ''
  }
  
  const extractRow = (obj) => {
    const possibleKeys = ['row', 'row_name', 'rowName', 'row_label', 'rowLabel']
    for (const key of possibleKeys) {
      if (obj[key] !== undefined && obj[key] !== null) {
        return obj[key]
      }
    }
    return ''
  }
  
  return {
    id: seat.id,
    row: extractRow(seat),
    number: extractNumber(seat),
    isBooked: seat.isBooked || seat.is_booked || seat.booked || false,
  }
}

/**
 * Normalize seat plan response
 * @param {Object} response - Axios response
 * @returns {Array} Normalized seat array
 */
function normalizeSeatPlanResponse(response) {
  const { data } = response

  let seats = []

  if (Array.isArray(data)) {
    seats = data
  } else if (data.seats) {
    seats = data.seats
  } else if (data.data) {
    seats = Array.isArray(data.data) ? data.data : []
  }

  return seats.map(normalizeSeat)
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

