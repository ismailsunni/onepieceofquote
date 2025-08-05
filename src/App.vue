<template>
  <div id="app" :class="{ 'dark': isDark }">
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main class="container mx-auto px-4 py-8 max-w-4xl">
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup() {
    const isDark = ref(false)

    const initTheme = () => {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        isDark.value = savedTheme === 'dark'
      } else {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
    }

    const toggleTheme = () => {
      isDark.value = !isDark.value
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }

    onMounted(() => {
      initTheme()
      // Listen for theme changes from other components
      window.addEventListener('theme-toggle', toggleTheme)
    })

    return {
      isDark,
      toggleTheme
    }
  }
}
</script>
