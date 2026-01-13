<template>
  <div class="space-y-6">
    <div class="relative py-6 mb-8">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t-2 border-gray-200"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-lg font-bold rounded-xl shadow-lg">
          STAGE
        </span>
      </div>
    </div>

    <div class="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
      <SeatItem
        v-for="seat in seats"
        :key="seat.id"
        :seat="seat"
        :is-selected="selectedSeats.includes(seat.id)"
        @toggle="toggleSeat"
      />
    </div>

    <div class="flex justify-center gap-8 pt-6 text-sm">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-100 border-2 border-blue-200 rounded-lg"></div>
        <span class="text-gray-700 font-medium">Available</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg shadow-md"></div>
        <span class="text-gray-700 font-medium">Selected</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-gray-300 rounded-lg"></div>
        <span class="text-gray-700 font-medium">Booked</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import SeatItem from './SeatItem.vue'

defineProps({
  seats: {
    type: Array,
    default: () => [],
  },
  selectedSeats: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['toggle'])

const toggleSeat = (seatId) => {
  emit('toggle', seatId)
}
</script>
