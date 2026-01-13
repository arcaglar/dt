<template>
  <div id="app">
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center space-x-3 group">
            <div class="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-gradient">TicketHub</div>
              <div class="text-xs text-gray-500">Live Your Dreams</div>
            </div>
          </router-link>
          <div class="flex items-center">
            <router-link
              to="/"
              class="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300"
            >
              Events
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <main class="min-h-screen">
      <router-view />
    </main>

    <footer class="bg-gray-900 text-white mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <span class="text-xl font-bold">TicketHub</span>
          </div>
          <p class="text-gray-400 text-sm">
            &copy; 2026 TicketHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
