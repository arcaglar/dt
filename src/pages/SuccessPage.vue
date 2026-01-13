<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl w-full">
      <div class="bg-white rounded-3xl shadow-2xl p-12 text-center transform animate-fade-in">
        <div class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 mb-8 shadow-lg">
          <svg class="h-16 w-16 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 class="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p class="text-xl text-gray-600 mb-8">
          🎉 Your tickets have been booked successfully!
        </p>

        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
          <p class="text-gray-700 mb-2">
            We've sent a confirmation email with your e-tickets to your inbox.
          </p>
          <p class="text-sm text-gray-500">
            Please check your email and show the QR code at the venue entrance.
          </p>
        </div>

        <div class="space-y-4 mb-8">
          <div class="flex items-center justify-center text-sm text-gray-600">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tickets confirmed and reserved
          </div>
          <div class="flex items-center justify-center text-sm text-gray-600">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            E-tickets sent to your email
          </div>
          <div class="flex items-center justify-center text-sm text-gray-600">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            QR code ready for entry
          </div>
        </div>

        <div class="space-y-3">
          <button
            @click="$router.push('/')"
            class="w-full btn-primary py-4"
          >
            <span class="flex items-center justify-center">
              Browse More Events
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200">
          <p class="text-sm text-gray-500">
            Need help? Contact our support team at 
            <a href="mailto:support@tickethub.com" class="text-purple-600 hover:text-purple-700 font-medium">
              support@tickethub.com
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
