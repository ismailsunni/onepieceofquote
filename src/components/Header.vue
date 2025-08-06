<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 py-4 max-w-4xl">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            One Piece of Quote
          </div>
        </router-link>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <router-link to="/browse" class="nav-link" :class="{ 'nav-link-active': $route.name === 'Browse' }">
            Browse
          </router-link>
          <router-link to="/about" class="nav-link" :class="{ 'nav-link-active': $route.name === 'About' }">
            About
          </router-link>
        </nav>

        <!-- Search and Theme Toggle -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              @keyup.enter="performSearch"
              type="text"
              placeholder="Search quotes..."
              class="w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              @click="performSearch"
              class="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>

          <!-- Mobile Menu Toggle -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <nav v-show="showMobileMenu" class="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col space-y-2">
          <router-link to="/browse" class="nav-link py-2" @click="closeMobileMenu">Browse</router-link>
          <router-link to="/about" class="nav-link py-2" @click="closeMobileMenu">About</router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const showMobileMenu = ref(false)

const isDark = computed(() => {
  return document.documentElement.classList.contains('dark')
})

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search/${encodeURIComponent(searchQuery.value.trim())}`)
    searchQuery.value = ''
    closeMobileMenu()
  }
}

const toggleTheme = () => {
  window.dispatchEvent(new Event('theme-toggle'))
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}
</script>
