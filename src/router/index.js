import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import EventsPage from '@/pages/EventsPage.vue'
import EventDetailPage from '@/pages/EventDetailPage.vue'
import SeatPlanPage from '@/pages/SeatPlanPage.vue'
import PaymentPage from '@/pages/PaymentPage.vue'
import SuccessPage from '@/pages/SuccessPage.vue'

const routes = [
  {
    path: '/',
    name: 'Events',
    component: EventsPage,
  },
  {
    path: '/events/:id',
    name: 'EventDetail',
    component: EventDetailPage,
  },
  {
    path: '/seat-plan',
    name: 'SeatPlan',
    component: SeatPlanPage,
    meta: { requiresBooking: true },
  },
  {
    path: '/payment',
    name: 'Payment',
    component: PaymentPage,
    meta: { requiresSeats: true },
  },
  {
    path: '/success',
    name: 'Success',
    component: SuccessPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const selectedEvent = store.getters.selectedEvent
  const selectedCategory = store.getters.selectedCategory
  const selectedSeats = store.getters.selectedSeats

  if (to.meta.requiresBooking) {
    if (!selectedEvent || !selectedCategory) {
      next('/')
      return
    }
  }

  if (to.meta.requiresSeats) {
    if (!selectedEvent || !selectedCategory || selectedSeats.length === 0) {
      if (selectedEvent) {
        next(`/events/${selectedEvent.id}`)
      } else {
        next('/')
      }
      return
    }
  }

  next()
})

export default router
