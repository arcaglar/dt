/**
 * Seat Plan domain composable
 */
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { getSeatPlan } from '@/services'
import { formatSeatLabel, formatPrice } from '@/utils/formatters'
import { ERROR_MESSAGES } from '@/utils/constants'

/**
 * Composable for seat plan functionality
 * @returns {Object} Seat plan state and methods
 */
export function useSeatPlan() {
  const store = useStore()
  const seats = ref([])
  const loading = ref(false)
  const error = ref(null)

  const selectedSeats = computed(() => store.getters.selectedSeats)
  const selectedCategory = computed(() => store.getters.selectedCategory)

  const fetchSeatPlan = async (eventId, categoryId) => {
    loading.value = true
    error.value = null
    
    try {
      seats.value = await getSeatPlan(eventId, categoryId)
      store.dispatch('setSeatPlan', seats.value)
      return seats.value
    } catch (err) {
      error.value = err.message || ERROR_MESSAGES.SEAT_PLAN_LOAD
      console.error('Error fetching seat plan:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const toggleSeat = (seatId) => {
    store.dispatch('toggleSeat', seatId)
  }

  const getSeatLabel = (seatId) => {
    let seat = seats.value.find((s) => s.id === seatId)
    
    if (!seat) {
      const storedSeatPlan = store.getters.seatPlan
      if (storedSeatPlan && Array.isArray(storedSeatPlan)) {
        seat = storedSeatPlan.find((s) => s.id === seatId)
      }
    }
    
    if (!seat) {
      return String(seatId)
    }
    
    const label = formatSeatLabel(seat)
    return label || String(seatId)
  }

  const calculateTotal = () => {
    const count = selectedSeats.value.length
    const price = selectedCategory.value?.price || 0
    return count * price
  }

  const formattedTotal = computed(() => {
    return formatPrice(calculateTotal())
  })

  return {
    seats,
    loading,
    error,
    selectedSeats,
    fetchSeatPlan,
    toggleSeat,
    getSeatLabel,
    calculateTotal,
    formattedTotal,
  }
}

