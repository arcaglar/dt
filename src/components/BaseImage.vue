<template>
  <div :class="containerClass">
    <img
      v-if="!imageError"
      :src="src"
      :alt="alt"
      :class="imageClass"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    <div v-else :class="placeholderClass">
      <svg 
        class="w-20 h-20 text-gray-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
      </svg>
      <p v-if="showPlaceholderText" class="mt-3 text-sm text-gray-400 font-medium">
        {{ placeholderText }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: 'Image',
  },
  containerClass: {
    type: String,
    default: '',
  },
  imageClass: {
    type: String,
    default: 'w-full h-full object-cover',
  },
  placeholderClass: {
    type: String,
    default: 'w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100',
  },
  showPlaceholderText: {
    type: Boolean,
    default: false,
  },
  placeholderText: {
    type: String,
    default: 'Image not available',
  },
})

const emit = defineEmits(['error', 'load'])

const imageError = ref(false)

const handleImageError = (event) => {
  imageError.value = true
  emit('error', event)
}

const handleImageLoad = (event) => {
  imageError.value = false
  emit('load', event)
}
</script>

