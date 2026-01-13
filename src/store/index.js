import { createStore } from 'vuex'
import { localStoragePlugin, clearBookingState } from './plugins/localStorage'

export default createStore({
  plugins: [localStoragePlugin],
  state() {
    return {
      selectedEvent: null,
      selectedCategory: null,
      seatPlan: null,
      selectedSeats: [],
      paymentForm: {
        customer_name: '',
        customer_surname: '',
        customer_email: '',
        cc_number: '',
        cc_exp_month: '',
        cc_exp_year: '',
        cc_exp_cvv: '',
      },
    }
  },

  mutations: {
    SET_SELECTED_EVENT(state, event) {
      if (state.selectedEvent?.id !== event?.id) {
        state.selectedSeats = []
        state.seatPlan = null
        state.selectedCategory = null
      }
      state.selectedEvent = event
    },

    SET_SELECTED_CATEGORY(state, category) {
      if (state.selectedCategory?.id !== category?.id) {
        state.selectedSeats = []
        state.seatPlan = null
      }
      state.selectedCategory = category
    },

    SET_SEAT_PLAN(state, seatPlan) {
      state.seatPlan = seatPlan
    },

    SET_SELECTED_SEATS(state, seats) {
      state.selectedSeats = seats
    },

    TOGGLE_SEAT(state, seatId) {
      const index = state.selectedSeats.indexOf(seatId)
      if (index > -1) {
        state.selectedSeats.splice(index, 1)
      } else {
        state.selectedSeats.push(seatId)
      }
    },

    UPDATE_PAYMENT_FORM(state, formData) {
      state.paymentForm = { ...state.paymentForm, ...formData }
    },

    RESET_BOOKING_FLOW(state) {
      state.selectedEvent = null
      state.selectedCategory = null
      state.seatPlan = null
      state.selectedSeats = []
      state.paymentForm = {
        customer_name: '',
        customer_surname: '',
        customer_email: '',
        cc_number: '',
        cc_exp_month: '',
        cc_exp_year: '',
        cc_exp_cvv: '',
      }
      clearBookingState()
    },
  },

  actions: {
    selectEvent({ commit }, event) {
      commit('SET_SELECTED_EVENT', event)
    },

    selectCategory({ commit }, category) {
      commit('SET_SELECTED_CATEGORY', category)
    },

    setSeatPlan({ commit }, seatPlan) {
      commit('SET_SEAT_PLAN', seatPlan)
    },

    toggleSeat({ commit }, seatId) {
      commit('TOGGLE_SEAT', seatId)
    },

    updatePaymentForm({ commit }, formData) {
      commit('UPDATE_PAYMENT_FORM', formData)
    },

    resetBookingFlow({ commit }) {
      commit('RESET_BOOKING_FLOW')
    },
  },

  getters: {
    selectedEvent: (state) => state.selectedEvent,
    selectedCategory: (state) => state.selectedCategory,
    seatPlan: (state) => state.seatPlan,
    selectedSeats: (state) => state.selectedSeats,
    paymentForm: (state) => state.paymentForm,
    hasSelectedSeats: (state) => state.selectedSeats.length > 0,
  },
})
