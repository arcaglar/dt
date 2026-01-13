<template>
  <div class="flex justify-center items-center" :class="containerClass">
    <div class="relative">
      <div 
        class="animate-spin rounded-full border-4 border-purple-200"
        :class="sizeClass"
      ></div>
      <div 
        class="animate-spin rounded-full border-4 border-purple-600 border-t-transparent absolute top-0 left-0"
        :class="sizeClass"
      ></div>
    </div>
    <p v-if="message" class="ml-4 text-gray-600 font-medium">{{ message }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  message: {
    type: String,
    default: '',
  },
  containerClass: {
    type: String,
    default: 'py-20',
  },
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  }
  return sizes[props.size]
})
</script>

