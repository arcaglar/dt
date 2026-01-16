<template>
  <div class="space-y-4 sm:space-y-6">
    <div class="relative py-4 sm:py-6 mb-4 sm:mb-8">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t-2 border-gray-200"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm sm:text-lg font-bold rounded-lg sm:rounded-xl shadow-lg">
          STAGE
        </span>
      </div>
    </div>

    <div class="space-y-2 sm:space-y-3 max-w-4xl mx-auto overflow-x-auto pb-4">
      <div
        v-for="(row, rowLabel) in groupedSeats"
        :key="rowLabel"
        class="flex items-center gap-1.5 sm:gap-2 justify-start sm:justify-center min-w-max sm:min-w-0 px-2 sm:px-0"
      >
        <div class="w-8 sm:w-12 flex-shrink-0 text-right">
          <span class="inline-flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 bg-gray-100 rounded-md sm:rounded-lg text-gray-700 font-bold text-xs sm:text-sm border-2 border-gray-200">
            {{ rowLabel }}
          </span>
        </div>
        
        <div class="flex gap-1.5 sm:gap-2 flex-nowrap sm:flex-wrap justify-start sm:justify-center">
          <SeatItem
            v-for="seat in row"
            :key="seat.id"
            :seat="seat"
            :is-selected="selectedSeats.includes(seat.id)"
            @toggle="toggleSeat"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-3 sm:gap-6 lg:gap-8 pt-4 sm:pt-6 text-xs sm:text-sm">
      <div class="flex items-center gap-1.5 sm:gap-2">
        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 border-2 border-blue-200 rounded-md sm:rounded-lg"></div>
        <span class="text-gray-700 font-medium">Available</span>
      </div>
      <div class="flex items-center gap-1.5 sm:gap-2">
        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-md sm:rounded-lg shadow-md"></div>
        <span class="text-gray-700 font-medium">Selected</span>
      </div>
      <div class="flex items-center gap-1.5 sm:gap-2">
        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-md sm:rounded-lg"></div>
        <span class="text-gray-700 font-medium">Booked</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SeatItem from './SeatItem.vue'

const props = defineProps({
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

const groupedSeats = computed(() => {
  const groups = {}
  
  props.seats.forEach(seat => {
    const rowLabel = seat.row
    if (!groups[rowLabel]) {
      groups[rowLabel] = []
    }
    groups[rowLabel].push(seat)
  })
  
  Object.keys(groups).forEach(rowLabel => {
    groups[rowLabel].sort((a, b) => a.number - b.number)
    groups[rowLabel] = groups[rowLabel].slice(0, 10)
  })
  
  return groups
})

const toggleSeat = (seatId) => {
  emit('toggle', seatId)
}
</script>
