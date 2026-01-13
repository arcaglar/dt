/**
 * Application constants
 */

export const ROUTES = {
  HOME: '/',
  EVENT_DETAIL: '/events/:id',
  SEAT_PLAN: '/seat-plan',
  PAYMENT: '/payment',
  SUCCESS: '/success',
}

export const STORAGE_KEYS = {
  BOOKING_STATE: 'tickethub_booking_state',
}

export const API_ENDPOINTS = {
  EVENTS: '/events',
  EVENT_BY_ID: '/events/:id',
  SEAT_PLAN: '/seat-plans/:eventId/:categoryId',
  PAYMENT: '/payment',
}

export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
}

export const LOADING_MESSAGES = {
  EVENTS: 'Loading events...',
  EVENT_DETAIL: 'Loading event details...',
  SEAT_PLAN: 'Loading seat plan...',
  PAYMENT: 'Processing payment...',
}

export const ERROR_MESSAGES = {
  EVENTS_LOAD: 'Failed to load events',
  EVENT_DETAIL_LOAD: 'Failed to load event details',
  SEAT_PLAN_LOAD: 'Failed to load seat plan',
  PAYMENT_FAILED: 'Payment failed',
  MISSING_STATE: 'Missing required information. Please start from the beginning.',
}

