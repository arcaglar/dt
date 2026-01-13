const STORAGE_KEY = 'tickethub_booking_state'

export const localStoragePlugin = (store) => {
  const savedState = localStorage.getItem(STORAGE_KEY)
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState)
      store.replaceState({
        ...store.state,
        ...parsed,
      })
    } catch (error) {
      console.error('Failed to load saved state:', error)
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  store.subscribe((mutation, state) => {
    const stateToSave = {
      selectedEvent: state.selectedEvent,
      selectedCategory: state.selectedCategory,
      seatPlan: state.seatPlan,
      selectedSeats: state.selectedSeats,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
  })
}

export const clearBookingState = () => {
  localStorage.removeItem(STORAGE_KEY)
}

