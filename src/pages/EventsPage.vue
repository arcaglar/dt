<template>
  <div class="min-h-screen bg-gray-50">
    <div class="gradient-primary py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
          Discover Amazing Events
        </h1>
        <p class="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Book tickets for concerts, festivals, sports events and more.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <LoadingSpinner v-if="loading" :message="LOADING_MESSAGES.EVENTS" />

      <ErrorMessage 
        v-else-if="error"
        :title="ERROR_MESSAGES.EVENTS_LOAD"
        :message="error"
        @retry="fetchEvents"
      />

      <div v-else-if="events.length > 0">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Upcoming Events</h2>
          <p class="text-gray-600 mt-1">{{ events.length }} events available</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <EventCard
            v-for="event in events"
            :key="event.id"
            :event="event"
          />
        </div>
      </div>

      <EmptyState 
        v-else
        title="No events available"
        message="Check back soon for exciting new events!"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useEvents } from '@/composables/useEvents'
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/utils/constants'
import EventCard from '@/components/EventCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import EmptyState from '@/components/EmptyState.vue'

const { events, loading, error, fetchEvents } = useEvents()

onMounted(() => {
  fetchEvents()
})
</script>
