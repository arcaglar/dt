import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useBookingGuard() {
  const store = useStore()
  const router = useRouter()

  const selectedEvent = computed(() => store.getters.selectedEvent)
  const selectedCategory = computed(() => store.getters.selectedCategory)
  const selectedSeats = computed(() => store.getters.selectedSeats)

  const canAccessSeatPlan = computed(() => {
    return selectedEvent.value && selectedCategory.value
  })

  const canAccessPayment = computed(() => {
    return selectedEvent.value && selectedCategory.value && selectedSeats.value.length > 0
  })

  const guardSeatPlan = () => {
    if (!canAccessSeatPlan.value) {
      router.push('/')
      return false
    }
    return true
  }

  const guardPayment = () => {
    if (!canAccessPayment.value) {
      if (!selectedEvent.value) {
        router.push('/')
      } else {
        router.push(`/events/${selectedEvent.value.id}`)
      }
      return false
    }
    return true
  }

  return {
    selectedEvent,
    selectedCategory,
    selectedSeats,
    canAccessSeatPlan,
    canAccessPayment,
    guardSeatPlan,
    guardPayment,
  }
}

