import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://d706d748-0586-4c2b-9d30-288f5d3b0630.mock.pstmn.io',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.message)
    return Promise.reject(error)
  }
)

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

