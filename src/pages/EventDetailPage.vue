<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        @click="$router.push('/')"
        class="mb-6 flex items-center text-gray-600 hover:text-purple-600 transition-colors group"
      >
        <div class="w-10 h-10 rounded-lg bg-white shadow-md flex items-center justify-center mr-3 group-hover:bg-purple-50 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <span class="font-medium">Back to Events</span>
      </button>

      <LoadingSpinner v-if="loading" :message="LOADING_MESSAGES.EVENT_DETAIL" />

      <ErrorMessage 
        v-else-if="error"
        :title="ERROR_MESSAGES.EVENT_DETAIL_LOAD"
        :message="error"
        :show-retry="false"
      />

      <div v-else-if="event" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="relative aspect-video overflow-hidden">
              <BaseImage
                :src="event.image_url || '/placeholder.jpg'"
                :alt="event.title"
                image-class="w-full h-full object-cover"
              />
              <div class="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-semibold text-purple-600 shadow-lg">
                Live Event
              </div>
            </div>

            <div class="p-8">
              <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ event.title }}</h1>
              <p class="text-gray-600 leading-relaxed text-lg">{{ event.description }}</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div class="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Event Details
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Date</p>
                  <p class="text-gray-600">{{ formatDate(event.event_date) }}</p>
                  <p class="text-sm text-purple-600 font-medium mt-1">{{ formatTime(event.event_date) }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ event.venue?.name || 'Venue TBA' }}</p>
                  <p class="text-gray-600 text-sm">{{ event.venue?.address || 'Address not available' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Select Your Category</h3>
            
            <CategorySelect
              v-model="selectedCategoryId"
              :categories="event.event_categories || []"
              label="Ticket Category"
              placeholder="Choose a ticket category"
            />

            <div v-if="selectedCategoryId" class="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <p class="text-sm text-gray-600 mb-2">Selected Category</p>
              <p class="text-lg font-bold text-gray-900">{{ selectedCategoryName }}</p>
              <p class="text-2xl font-bold text-gradient mt-1">{{ selectedCategoryPrice }}</p>
            </div>

            <div class="mt-6">
              <button
                @click="handleSelectSeats"
                :disabled="!selectedCategoryId"
                :class="[
                  'w-full py-4 rounded-xl font-semibold transition-all duration-300 transform',
                  selectedCategoryId
                    ? 'btn-primary'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                ]"
              >
                <span class="flex items-center justify-center">
                  Select Seats
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <p v-if="!selectedCategoryId" class="text-sm text-gray-500 text-center mt-3">
                Please select a category to continue
              </p>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-100">
              <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>🎫 Secure Booking</span>
                <span>✓</span>
              </div>
              <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>💳 Safe Payment</span>
                <span>✓</span>
              </div>
              <div class="flex items-center justify-between text-sm text-gray-600">
                <span>📧 Instant Confirmation</span>
                <span>✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useEventDetail } from '@/composables/useEvents'
import { formatDate, formatTime, formatPrice } from '@/utils/formatters'
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/utils/constants'
import BaseImage from '@/components/BaseImage.vue'
import CategorySelect from '@/components/CategorySelect.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

const selectedCategoryId = ref('')
const { event, loading, error, fetchEvent } = useEventDetail()

const selectedCategoryName = computed(() => {
  if (!event.value || !selectedCategoryId.value) return ''
  const category = event.value.event_categories?.find(
    (cat) => cat.id === parseInt(selectedCategoryId.value)
  )
  return category?.name || ''
})

const selectedCategoryPrice = computed(() => {
  if (!event.value || !selectedCategoryId.value) return ''
  const category = event.value.event_categories?.find(
    (cat) => cat.id === parseInt(selectedCategoryId.value)
  )
  return category ? formatPrice(category.price) : ''
})

const handleSelectSeats = () => {
  if (!selectedCategoryId.value || !event.value) return
  
  const category = event.value.event_categories?.find(
    (cat) => cat.id === parseInt(selectedCategoryId.value)
  )
  
  if (category) {
    store.dispatch('selectCategory', category)
    router.push('/seat-plan')
  }
}

const loadEventDetail = async () => {
  store.commit('SET_SELECTED_SEATS', [])
  store.commit('SET_SEAT_PLAN', null)
  selectedCategoryId.value = ''
  
  const eventData = await fetchEvent(route.params.id)
  if (eventData) {
    store.dispatch('selectEvent', eventData)
  }
}

onMounted(() => {
  loadEventDetail()
})
</script>
