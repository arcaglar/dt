<template>
  <div class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-lg">
    <div class="flex items-start">
      <svg class="w-6 h-6 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div class="flex-1">
        <p class="font-semibold text-red-800 mb-1">{{ title }}</p>
        <p class="text-red-600 text-sm">{{ message }}</p>
        <button
          v-if="showRetry"
          @click="$emit('retry')"
          class="mt-3 text-sm text-red-700 underline hover:no-underline font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Error',
  },
  message: {
    type: String,
    required: true,
  },
  showRetry: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['retry'])
</script>

