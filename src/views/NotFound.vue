<template>
  <div class="not-found-page">
    <div class="text-center py-16">
      <!-- 404 Graphic -->
      <div class="text-8xl mb-8">🏴‍☠️</div>

      <!-- Error Message -->
      <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        404
      </h1>
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
        Page Not Found
      </h2>

      <!-- Description -->
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
        Looks like you've sailed into uncharted waters! The page you're looking for
        seems to have gotten lost in the Grand Line. But don't worry, every great
        pirate knows that getting lost is just another adventure.
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <router-link to="/" class="btn btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Return Home
        </router-link>

        <router-link to="/browse" class="btn btn-secondary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7l-7 7-7-7m14 18l-7-7-7 7"></path>
          </svg>
          Browse Quotes
        </router-link>

        <button @click="getRandomQuote" class="btn btn-outline">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2m-15.356 0H4v5.582m0 0a8.003 8.003 0 0015.356-2M19.418 15H20v-5.582"></path>
          </svg>
          Random Quote
        </button>
      </div>

      <!-- Helpful Links -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Popular Destinations
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <!-- Popular Characters -->
          <div class="text-center">
            <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-3">Popular Characters</h4>
            <div class="space-y-2">
              <router-link
                v-for="character in popularCharacters.slice(0, 3)"
                :key="character.slug"
                :to="`/character/${character.slug}`"
                class="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                {{ character.name }}
              </router-link>
            </div>
          </div>

          <!-- Popular Tags -->
          <div class="text-center">
            <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-3">Popular Tags</h4>
            <div class="flex flex-wrap justify-center gap-2">
              <router-link
                v-for="tag in popularTags.slice(0, 4)"
                :key="tag.name"
                :to="`/tag/${tag.name}`"
                class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              >
                #{{ tag.name }}
              </router-link>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="text-center">
            <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-3">Quick Actions</h4>
            <div class="space-y-2">
              <router-link to="/search" class="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Search Quotes
              </router-link>
              <router-link to="/about" class="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                About This Site
              </router-link>
              <a href="https://forms.google.com/submit-quote" target="_blank" rel="noopener noreferrer" class="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Submit a Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- One Piece Quote -->
      <div v-if="inspirationalQuote" class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Here's a quote to get you back on track:
        </h3>
        <div class="max-w-2xl mx-auto p-6 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
          <blockquote class="text-lg text-gray-800 dark:text-gray-200 mb-3 italic">
            "{{ inspirationalQuote.quote }}"
          </blockquote>
          <div class="text-blue-600 dark:text-blue-400 font-medium">
            — {{ inspirationalQuote.character }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import QuoteService from '@/services/QuoteService.js'

export default {
  name: 'NotFound',
  setup() {
    const router = useRouter()
    const popularCharacters = ref([])
    const popularTags = ref([])
    const inspirationalQuote = ref(null)

    const loadData = () => {
      popularCharacters.value = QuoteService.getPopularCharacters(5)
      popularTags.value = QuoteService.getPopularTags(6)
      inspirationalQuote.value = QuoteService.getRandomQuote()
    }

    const getRandomQuote = () => {
      const randomQuote = QuoteService.getRandomQuote()
      if (randomQuote) {
        router.push(`/quote/${randomQuote.id}`)
      }
    }

    onMounted(() => {
      loadData()

      // Update page title
      document.title = 'Page Not Found - One Piece of Quote'

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Oops! The page you\'re looking for doesn\'t exist. Navigate back to discover inspirational One Piece quotes.')
      }
    })

    return {
      popularCharacters,
      popularTags,
      inspirationalQuote,
      getRandomQuote
    }
  }
}
</script>
