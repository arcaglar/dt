<template>
  <div v-if="event" class="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
    <h3 class="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
    
    <div class="space-y-4">
      <div>
        <p class="text-sm text-gray-500 mb-1">Event</p>
        <p class="font-semibold text-gray-900">{{ event.title }}</p>
      </div>
      
      <div v-if="category">
        <p class="text-sm text-gray-500 mb-1">Category</p>
        <p class="font-semibold text-gray-900">{{ category.name }}</p>
      </div>
      
      <div>
        <p class="text-sm text-gray-500 mb-1">Selected Seats</p>
        <p class="font-semibold text-gray-900">{{ seats.length }} seat(s)</p>
        <div v-if="seatLabels.length > 0" class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="(label, index) in displayedSeats"
            :key="index"
            class="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium"
          >
            {{ label }}
          </span>
          <span
            v-if="seats.length > 6"
            class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium"
          >
            +{{ seats.length - 6 }} more
          </span>
        </div>
      </div>
    </div>

    <div class="mt-6 pt-6 border-t border-gray-200">
      <div class="flex justify-between mb-3">
        <span class="text-gray-600">Subtotal</span>
        <span class="font-semibold">{{ formatPrice(total) }}</span>
      </div>
      <div class="flex justify-between mb-3">
        <span class="text-gray-600">Service Fee</span>
        <span class="font-semibold">$0.00</span>
      </div>
      <div class="flex justify-between text-lg font-bold pt-3 border-t">
        <span>Total</span>
        <span class="text-gradient">{{ formatPrice(total) }}</span>
      </div>
    </div>

    <div class="mt-6 pt-6 border-t space-y-2">
      <div class="flex items-center text-sm text-gray-600">
        <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Secure SSL Payment
      </div>
      <div class="flex items-center text-sm text-gray-600">
        <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Instant E-Ticket Delivery
      </div>
      <div class="flex items-center text-sm text-gray-600">
        <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        100% Money-Back Guarantee
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatPrice } from '@/utils/formatters'

const props = defineProps({
  event: {
    type: Object,
    default: null,
  },
  category: {
    type: Object,
    default: null,
  },
  seats: {
    type: Array,
    default: () => [],
  },
  seatLabels: {
    type: Array,
    default: () => [],
  },
})

const displayedSeats = computed(() => {
  return props.seatLabels.slice(0, 6)
})

const total = computed(() => {
  const count = props.seats.length
  const price = props.category?.price || 0
  return count * price
})
</script>

