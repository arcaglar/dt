import { ref } from 'vue'

export function useApi(apiCall) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const execute = async (...args) => {
    loading.value = true
    error.value = null
    data.value = null

    try {
      const response = await apiCall(...args)
      data.value = response.data
      return { data: response.data, error: null }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred'
      error.value = errorMessage
      console.error('API Error:', err)
      return { data: null, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    data.value = null
    loading.value = false
    error.value = null
  }

  return {
    data,
    loading,
    error,
    execute,
    reset,
  }
}

