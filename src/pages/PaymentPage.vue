<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        @click="$router.push('/seat-plan')"
        class="mb-6 flex items-center text-gray-600 hover:text-purple-600 transition-colors group"
      >
        <div class="w-10 h-10 rounded-lg bg-white shadow-md flex items-center justify-center mr-3 group-hover:bg-purple-50 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <span class="font-medium">Back to Seat Selection</span>
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <ErrorMessage 
            v-if="errorMessage"
            :title="ERROR_MESSAGES.PAYMENT_FAILED"
            :message="errorMessage"
            :show-retry="false"
            class="mb-6"
          />

          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div class="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Payment Information
            </h2>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="space-y-4">
                <h3 class="font-semibold text-gray-900 text-lg">Customer Information</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <BaseInput
                    v-model="form.customer_name"
                    label="First Name"
                    placeholder="John"
                    required
                    :error="getFieldError('customer_name')"
                    @blur="markFieldTouched('customer_name')"
                  />

                  <BaseInput
                    v-model="form.customer_surname"
                    label="Last Name"
                    placeholder="Doe"
                    required
                    :error="getFieldError('customer_surname')"
                    @blur="markFieldTouched('customer_surname')"
                  />
                </div>

                <BaseInput
                  v-model="form.customer_email"
                  type="email"
                  label="Email Address"
                  placeholder="john.doe@example.com"
                  required
                  :error="getFieldError('customer_email')"
                  @blur="markFieldTouched('customer_email')"
                />
              </div>

              <div class="space-y-4 pt-6 border-t">
                <h3 class="font-semibold text-gray-900 text-lg flex items-center">
                  <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Credit Card Information
                </h3>

                <BaseInput
                  v-model="form.cc_number"
                  label="Card Number"
                  placeholder="1111 1111 1111 1111"
                  maxlength="19"
                  required
                  :error="getFieldError('cc_number')"
                  @blur="markFieldTouched('cc_number')"
                />

                <div class="grid grid-cols-3 gap-4">
                  <BaseInput
                    v-model.number="form.cc_exp_month"
                    type="number"
                    label="Month"
                    placeholder="MM"
                    :min="1"
                    :max="12"
                    required
                    :error="getFieldError('cc_exp_month')"
                    @blur="markFieldTouched('cc_exp_month')"
                  />

                  <BaseInput
                    v-model.number="form.cc_exp_year"
                    type="number"
                    label="Year"
                    placeholder="YY"
                    :min="0"
                    :max="99"
                    required
                    :error="getFieldError('cc_exp_year')"
                    @blur="markFieldTouched('cc_exp_year')"
                  />

                  <BaseInput
                    v-model.number="form.cc_exp_cvv"
                    type="number"
                    label="CVV"
                    placeholder="123"
                    maxlength="4"
                    required
                    :error="getFieldError('cc_exp_cvv')"
                    @blur="markFieldTouched('cc_exp_cvv')"
                  />
                </div>
              </div>

              <div class="pt-6">
                <button
                  type="submit"
                  :disabled="loading"
                  :class="[
                    'w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform',
                    loading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'btn-primary'
                  ]"
                >
                  <span v-if="loading" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </span>
                  <span v-else class="flex items-center justify-center">
                    Complete Purchase
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="lg:col-span-1">
          <OrderSummary
            :event="selectedEvent"
            :category="selectedCategory"
            :seats="selectedSeats"
            :seat-labels="seatLabels"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { usePayment } from '@/composables/usePayment'
import { useSeatPlan } from '@/composables/useSeatPlan'
import { ERROR_MESSAGES } from '@/utils/constants'
import BaseInput from '@/components/BaseInput.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import OrderSummary from '@/components/OrderSummary.vue'

const {
  form,
  loading,
  errorMessage,
  selectedEvent,
  selectedCategory,
  selectedSeats,
  markFieldTouched,
  getFieldError,
  submitPayment,
} = usePayment()

const { getSeatLabel } = useSeatPlan()

const seatLabels = computed(() => {
  return selectedSeats.value.map(seatId => getSeatLabel(seatId))
})

const handleSubmit = async () => {
  await submitPayment()
}

onMounted(() => {
  if (!selectedEvent.value || !selectedCategory.value || selectedSeats.value.length === 0) {
    errorMessage.value = ERROR_MESSAGES.MISSING_STATE
  }
})
</script>
