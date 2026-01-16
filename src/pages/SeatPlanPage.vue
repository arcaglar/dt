<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        @click="goBack"
        class="mb-6 flex items-center text-gray-600 hover:text-purple-600 transition-colors group"
      >
        <div class="w-10 h-10 rounded-lg bg-white shadow-md flex items-center justify-center mr-3 group-hover:bg-purple-50 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <span class="font-medium">Back to Event Details</span>
      </button>

      <div v-if="selectedEvent" class="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{{ selectedEvent.title }}</h1>
            <div class="flex flex-wrap gap-2 sm:gap-4 text-sm">
              <span class="flex items-center text-gray-600">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ selectedEvent.venue?.name }}
              </span>
              <span v-if="selectedCategory" class="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full text-purple-700 font-semibold text-xs sm:text-sm">
                {{ selectedCategory.name }} - {{ formatPrice(selectedCategory.price) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <LoadingSpinner v-if="loading" :message="LOADING_MESSAGES.SEAT_PLAN" />

      <ErrorMessage 
        v-else-if="error"
        :title="ERROR_MESSAGES.SEAT_PLAN_LOAD"
        :message="error"
        :show-retry="false"
      />

      <div v-else class="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg gradient-primary flex items-center justify-center mr-2 sm:mr-3">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="text-lg sm:text-2xl">Select Your Seats</span>
          </h2>
          <div v-if="selectedSeats.length > 0" class="px-3 sm:px-4 py-2 bg-purple-100 rounded-lg">
            <span class="text-purple-700 font-semibold text-sm sm:text-base">{{ selectedSeats.length }} seat(s) selected</span>
          </div>
        </div>
        
        <SeatGrid
          :seats="seats"
          :selected-seats="selectedSeats"
          @toggle="toggleSeat"
        />

        <div v-if="selectedSeats.length > 0" class="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100">
          <div class="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-4">
            <div class="flex-1">
              <p class="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Selected Seats ({{ selectedSeats.length }})
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="seatId in selectedSeats"
                  :key="seatId"
                  class="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white text-purple-700 rounded-lg text-xs sm:text-sm font-medium shadow-sm border border-purple-200"
                >
                  {{ getSeatLabel(seatId) }}
                </span>
              </div>
            </div>
            <div class="text-left sm:text-right border-b sm:border-b-0 pb-4 sm:pb-0 border-purple-200">
              <p class="text-sm text-gray-600 mb-1">Total Amount</p>
              <p class="text-2xl sm:text-3xl font-bold text-gradient">
                {{ formattedTotal }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <button
            @click="handleContinueToPayment"
            :disabled="selectedSeats.length === 0"
            :class="[
              'w-full py-4 rounded-xl font-semibold transition-all duration-300 transform',
              selectedSeats.length > 0
                ? 'btn-primary'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            ]"
          >
            <span class="flex items-center justify-center text-lg">
              Continue to Payment
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <p v-if="selectedSeats.length === 0" class="text-sm text-gray-500 text-center mt-3">
            Please select at least one seat to continue
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingGuard } from '@/composables/useBookingGuard'
import { useSeatPlan } from '@/composables/useSeatPlan'
import { formatPrice } from '@/utils/formatters'
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/utils/constants'
import SeatGrid from '@/components/SeatGrid.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const router = useRouter()
const { selectedEvent, selectedCategory, guardSeatPlan } = useBookingGuard()
const {
  seats,
  loading,
  error,
  selectedSeats,
  fetchSeatPlan,
  toggleSeat,
  getSeatLabel,
  formattedTotal,
} = useSeatPlan()

const goBack = () => {
  if (selectedEvent.value) {
    router.push(`/events/${selectedEvent.value.id}`)
  } else {
    router.push('/')
  }
}

const handleContinueToPayment = () => {
  router.push('/payment')
}

const loadSeatPlan = async () => {
  if (!guardSeatPlan()) return
  
  await fetchSeatPlan(selectedEvent.value.id, selectedCategory.value.id)
}

onMounted(() => {
  loadSeatPlan()
})
</script>
