<template>
  <button
    type="button"
    @click="handleClick"
    :disabled="seat.isBooked"
    :class="seatClasses"
    class="w-10 h-10 sm:w-12 sm:h-12 rounded-md sm:rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm flex-shrink-0"
  >
    <div class="text-xs">{{ seat.number }}</div>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  seat: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle'])

const handleClick = () => {
  if (!props.seat.isBooked) {
    emit('toggle', props.seat.id)
  }
}

const seatClasses = computed(() => {
  if (props.seat.isBooked) {
    return 'bg-gray-300 text-gray-500 cursor-not-allowed'
  }
  if (props.isSelected) {
    return 'bg-gradient-to-br from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600 focus:ring-green-500 transform scale-110 shadow-lg'
  }
  return 'bg-blue-50 text-blue-700 border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 focus:ring-blue-500 hover:scale-105'
})
</script>
