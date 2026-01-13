import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const eventsAPI = {
  getEvents() {
    return apiClient.get('/events')
  },

  getEventById(eventId) {
    return apiClient.get(`/events/${eventId}`)
  },

  getSeatPlan(eventId, eventCategoryId) {
    return apiClient.get(`/seat-plans/${eventId}/${eventCategoryId}`)
  },

  createPayment(paymentData) {
    return apiClient.post('/payment', paymentData)
  },
}

export default apiClient

