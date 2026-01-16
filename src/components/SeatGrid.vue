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

    <div class="space-y-3 max-w-4xl mx-auto">
      <div
        v-for="(row, rowLabel) in groupedSeats"
        :key="rowLabel"
        class="flex items-center gap-2 justify-center"
      >
        <div class="w-12 flex-shrink-0 text-right">
          <span class="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg text-gray-700 font-bold text-sm border-2 border-gray-200">
            {{ rowLabel }}
          </span>
        </div>
        
        <div class="flex gap-2 flex-wrap justify-center">
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
