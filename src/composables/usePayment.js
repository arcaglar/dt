/**
 * Payment domain composable
 */
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { processPayment, buildPaymentPayload } from '@/services'
import { validatePaymentForm } from '@/utils/validators'
import { ERROR_MESSAGES } from '@/utils/constants'

/**
 * Composable for payment functionality
 * @returns {Object} Payment state and methods
 */
export function usePayment() {
  const router = useRouter()
  const store = useStore()
  
  const loading = ref(false)
  const errorMessage = ref('')
  const validationErrors = ref({})
  const touched = reactive({})

  const form = reactive({
    customer_name: '',
    customer_surname: '',
    customer_email: '',
    cc_number: '',
    cc_exp_month: '',
    cc_exp_year: '',
    cc_exp_cvv: '',
  })

  const selectedEvent = computed(() => store.getters.selectedEvent)
  const selectedCategory = computed(() => store.getters.selectedCategory)
  const selectedSeats = computed(() => store.getters.selectedSeats)

  const validateForm = () => {
    const result = validatePaymentForm(form)
    validationErrors.value = result.errors
    return result.isValid
  }

  const markFieldTouched = (fieldName) => {
    touched[fieldName] = true
  }

  const getFieldError = (fieldName) => {
    return touched[fieldName] ? validationErrors.value[fieldName] : ''
  }

  const submitPayment = async () => {
    Object.keys(form).forEach(key => touched[key] = true)
    
    if (!validateForm()) {
      errorMessage.value = 'Please fix the validation errors'
      return false
    }

    loading.value = true
    errorMessage.value = ''

    try {
      const booking = {
        eventId: selectedEvent.value.id,
        categoryId: selectedCategory.value.id,
        seats: selectedSeats.value,
      }

      const payload = buildPaymentPayload(form, booking)
      await processPayment(payload)
      
      store.dispatch('resetBookingFlow')
      router.push('/success')
      return true
    } catch (err) {
      console.error('Payment error:', err)
      
      if (err.response?.data) {
        const errorData = err.response.data
        errorMessage.value = typeof errorData === 'string' 
          ? errorData 
          : errorData.message || ERROR_MESSAGES.PAYMENT_FAILED
      } else {
        errorMessage.value = err.message || ERROR_MESSAGES.PAYMENT_FAILED
      }
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    loading,
    errorMessage,
    validationErrors,
    selectedEvent,
    selectedCategory,
    selectedSeats,
    validateForm,
    markFieldTouched,
    getFieldError,
    submitPayment,
  }
}

