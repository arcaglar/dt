<template>
  <router-link
    :to="`/events/${event.id}`"
    class="group bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
  >
    <div class="relative aspect-[16/10] overflow-hidden">
      <BaseImage
        :src="event.image_url || '/placeholder.jpg'"
        :alt="event.title"
        image-class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      
      <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-600">
        Live Event
      </div>
      
    </div>
    
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
        {{ event.title }}
      </h3>
      
      <div class="space-y-2.5 text-sm">
        <div class="flex items-center text-gray-600">
          <div class="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span class="font-medium">{{ event.venue?.name || 'Venue TBA' }}</span>
        </div>
        
        <div class="flex items-center text-gray-600">
          <div class="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center mr-3 group-hover:bg-pink-100 transition-colors">
            <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="font-medium">{{ formatDateShort(event.event_date) }}</span>
        </div>
      </div>
      
      <div class="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span class="text-sm text-gray-500">View Details</span>
        <div class="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center group-hover:bg-purple-700 transition-colors">
          <svg class="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { formatDateShort } from '@/utils/formatters'
import BaseImage from './BaseImage.vue'

defineProps({
  event: {
    type: Object,
    required: true,
  },
})
</script>
