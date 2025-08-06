<template>
  <div class="home-page">
    <!-- Main Quote Display -->
    <div class="text-center mb-8">
      <QuoteCard v-if="currentQuote" :quote="currentQuote" />

      <!-- Loading State -->
      <div v-else class="quote-card max-w-quote mx-auto">
        <div class="animate-pulse">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/4"></div>
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/6"></div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-center items-center space-x-4 mb-12">
      <button
        @click="showPreviousQuote"
        :disabled="!currentQuote"
        class="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        title="Previous quote"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Previous
      </button>

      <button
        @click="showRandomQuote"
        :disabled="!currentQuote"
        class="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        title="Random quote"
      >
        Random
      </button>

      <button
        @click="showNextQuote"
        :disabled="!currentQuote"
        class="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        title="Next quote"
      >
        Next
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- Quick Links -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Browse All -->
      <router-link to="/browse" class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3 mb-3">
          <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7l-7 7-7-7m14 18l-7-7-7 7"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Browse All Quotes</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          Explore all {{ totalQuotes }} quotes from One Piece characters
        </p>
      </router-link>

      <!-- Popular Characters -->
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3 mb-3">
          <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Popular Characters</h3>
        </div>
        <div class="space-y-2">
          <router-link
            v-for="character in popularCharacters.slice(0, 3)"
            :key="character.slug"
            :to="`/character/${character.slug}`"
            class="block text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            {{ character.name }} ({{ character.quote_count }})
          </router-link>
        </div>
      </div>

      <!-- Popular Tags -->
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3 mb-3">
          <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Popular Tags</h3>
        </div>
        <div class="flex flex-wrap gap-2">
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import QuoteCard from '@/components/QuoteCard.vue'
import QuoteService from '@/services/QuoteService.js'

const router = useRouter()
const route = useRoute()
const currentQuote = ref(null)
const popularCharacters = ref([])
const popularTags = ref([])

const totalQuotes = computed(() => QuoteService.getAllQuotes().length)

const loadInitialData = () => {
  // Load popular characters and tags
  popularCharacters.value = QuoteService.getPopularCharacters(5)
  popularTags.value = QuoteService.getPopularTags(8)

  // Show random quote initially
  showRandomQuote()
}

const showRandomQuote = () => {
  const quote = QuoteService.getRandomQuote()
  if (quote) {
    currentQuote.value = quote
    // Update URL without navigation
    router.replace(`/quote/${quote.id}`)
    updatePageMeta(quote)
  }
}

const showNextQuote = () => {
  if (currentQuote.value) {
    const nextQuote = QuoteService.getNextQuote(currentQuote.value.id)
    if (nextQuote) {
      currentQuote.value = nextQuote
      router.replace(`/quote/${nextQuote.id}`)
      updatePageMeta(nextQuote)
    }
  }
}

const showPreviousQuote = () => {
  if (currentQuote.value) {
    const prevQuote = QuoteService.getPreviousQuote(currentQuote.value.id)
    if (prevQuote) {
      currentQuote.value = prevQuote
      router.replace(`/quote/${prevQuote.id}`)
      updatePageMeta(prevQuote)
    }
  }
}

const updatePageMeta = (quote) => {
  // Update page title and meta description
  document.title = `"${quote.quote.substring(0, 50)}..." - ${quote.character} | One Piece of Quote`

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', `${quote.quote} - ${quote.character}`)
  }

  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) {
    ogTitle.setAttribute('content', `${quote.character}: "${quote.quote.substring(0, 50)}..."`)
  }

  const ogDescription = document.querySelector('meta[property="og:description"]')
  if (ogDescription) {
    ogDescription.setAttribute('content', `${quote.quote}`)
  }
}

onMounted(() => {
  loadInitialData()
})
</script>
