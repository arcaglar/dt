/**
 * Events domain composable
 */
import { ref } from 'vue'
import { getAllEvents, getEventById } from '@/services'
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/utils/constants'

/**
 * Composable for fetching all events
 * @returns {Object} Events state and methods
 */
export function useEvents() {
  const events = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchEvents = async () => {
    loading.value = true
    error.value = null
    
    try {
      events.value = await getAllEvents()
    } catch (err) {
      error.value = err.message || ERROR_MESSAGES.EVENTS_LOAD
      console.error('Error fetching events:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    events,
    loading,
    error,
    fetchEvents,
  }
}

/**
 * Composable for fetching single event
 * @returns {Object} Event state and methods
 */
export function useEventDetail() {
  const event = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchEvent = async (eventId) => {
    loading.value = true
    error.value = null
    
    try {
      event.value = await getEventById(eventId)
      return event.value
    } catch (err) {
      error.value = err.message || ERROR_MESSAGES.EVENT_DETAIL_LOAD
      console.error('Error fetching event detail:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    event,
    loading,
    error,
    fetchEvent,
  }
}

