<template>
  <div class="quote-page">
    <!-- Quote Display -->
    <div class="text-center mb-8">
      <QuoteCard v-if="quote" :quote="quote" />

      <!-- Loading State -->
      <div v-else-if="loading" class="quote-card max-w-quote mx-auto">
        <div class="animate-pulse">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/4"></div>
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/6"></div>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-else class="quote-card max-w-quote mx-auto text-center">
        <div class="text-6xl mb-4">🤔</div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Quote Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          The quote you're looking for doesn't exist or may have been removed.
        </p>
        <div class="space-x-4">
          <router-link to="/" class="btn btn-primary">Go Home</router-link>
          <router-link to="/browse" class="btn btn-secondary">Browse All Quotes</router-link>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div v-if="quote" class="flex justify-center items-center space-x-4 mb-12">
      <button
        @click="showPreviousQuote"
        class="btn btn-secondary flex items-center"
        title="Previous quote"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Previous
      </button>

      <button
        @click="showRandomQuote"
        class="btn btn-primary"
        title="Random quote"
      >
        Random
      </button>

      <button
        @click="showNextQuote"
        class="btn btn-secondary flex items-center"
        title="Next quote"
      >
        Next
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- Related Quotes -->
    <div v-if="quote && relatedQuotes.length > 0" class="mt-16">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
        More from {{ quote.character }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="relatedQuote in relatedQuotes"
          :key="relatedQuote.id"
          class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
        >
          <router-link :to="`/quote/${relatedQuote.id}`" class="block">
            <blockquote class="text-gray-800 dark:text-gray-200 mb-3 line-clamp-3">
              "{{ relatedQuote.quote }}"
            </blockquote>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <a
                :href="`https://onepiece.fandom.com/wiki/Chapter_${relatedQuote.chapter}`"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline decoration-dotted underline-offset-2"
                :title="`Read Chapter ${relatedQuote.chapter} on One Piece Fandom Wiki`"
                @click.stop
              >
                Chapter {{ relatedQuote.chapter }}
              </a>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import QuoteCard from '@/components/QuoteCard.vue'
import QuoteService from '@/services/QuoteService.js'
import { getFullUrl } from '@/utils/url.js'

const router = useRouter()
const route = useRoute()
const quote = ref(null)
const loading = ref(true)

const relatedQuotes = computed(() => {
  if (!quote.value) return []

  return QuoteService.getQuotesByCharacter(quote.value.character_slug)
    .filter(q => q.id !== quote.value.id)
    .slice(0, 4)
})

const loadQuote = async (id) => {
  loading.value = true
  quote.value = null

  try {
    const foundQuote = QuoteService.getQuoteById(id)
    if (foundQuote) {
      quote.value = foundQuote
      updatePageMeta(foundQuote)
    }
  } catch (error) {
    console.error('Error loading quote:', error)
  } finally {
    loading.value = false
  }
}

const updatePageMeta = (quoteData) => {
  // Update page title
  document.title = `"${quoteData.quote.substring(0, 50)}..." - ${quoteData.character} | One Piece of Quote`

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', `${quoteData.quote} - ${quoteData.character}`)
  }

  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) {
    ogTitle.setAttribute('content', `${quoteData.character}: "${quoteData.quote.substring(0, 50)}..."`)
  }

  const ogDescription = document.querySelector('meta[property="og:description"]')
  if (ogDescription) {
    ogDescription.setAttribute('content', quoteData.quote)
  }

  // Update canonical URL
  const canonicalLink = document.querySelector('link[rel="canonical"]')
  if (canonicalLink) {
    canonicalLink.setAttribute('href', getFullUrl(`/quote/${quoteData.id}`))
  }
}

const showRandomQuote = () => {
  const randomQuote = QuoteService.getRandomQuote()
  if (randomQuote) {
    router.push(`/quote/${randomQuote.id}`)
  }
}

const showNextQuote = () => {
  if (quote.value) {
    const nextQuote = QuoteService.getNextQuote(quote.value.id)
    if (nextQuote) {
      router.push(`/quote/${nextQuote.id}`)
    }
  }
}

const showPreviousQuote = () => {
  if (quote.value) {
    const prevQuote = QuoteService.getPreviousQuote(quote.value.id)
    if (prevQuote) {
      router.push(`/quote/${prevQuote.id}`)
    }
  }
}

// Watch for route changes
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadQuote(newId)
    }
  },
  { immediate: true }
)

onMounted(() => {
  const quoteId = route.params.id
  if (quoteId) {
    loadQuote(quoteId)
  }
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
