<template>
  <div class="character-page">
    <!-- Character Header -->
    <div class="text-center mb-12" v-if="character">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {{ character.name }}
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-2">
        {{ character.description }}
      </p>
      <p class="text-gray-500 dark:text-gray-500">
        {{ quotes.length }} quote{{ quotes.length === 1 ? '' : 's' }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="text-center mb-12">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3 mx-auto"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/2 mx-auto"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto"></div>
      </div>
    </div>

    <!-- Character Not Found -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">🤷‍♂️</div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Character Not Found</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        The character you're looking for doesn't exist or may have been removed.
      </p>
      <div class="space-x-4">
        <router-link to="/" class="btn btn-primary">Go Home</router-link>
        <router-link to="/browse" class="btn btn-secondary">Browse All Quotes</router-link>
      </div>
    </div>

    <!-- Quotes List -->
    <div v-if="quotes.length > 0" class="space-y-6">
      <div
        v-for="quote in paginatedQuotes.quotes"
        :key="quote.id"
        class="quote-card hover:shadow-lg transition-shadow"
      >
        <QuoteCard :quote="quote" />
      </div>
    </div>

    <!-- No Quotes -->
    <div v-else-if="character && !loading" class="text-center py-12">
      <div class="text-6xl mb-4">📝</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        No quotes available
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        We don't have any quotes from {{ character.name }} yet.
      </p>
      <router-link to="/browse" class="btn btn-primary">
        Browse Other Characters
      </router-link>
    </div>

    <!-- Pagination -->
    <div v-if="paginatedQuotes.totalPages > 1" class="mt-12 flex justify-center">
      <nav class="flex items-center space-x-2">
        <!-- Previous Button -->
        <button
          @click="goToPage(paginatedQuotes.currentPage - 1)"
          :disabled="!paginatedQuotes.hasPrev"
          class="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Previous
        </button>

        <!-- Page Numbers -->
        <div class="flex items-center space-x-1">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-2 rounded text-sm',
              page === paginatedQuotes.currentPage
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <!-- Next Button -->
        <button
          @click="goToPage(paginatedQuotes.currentPage + 1)"
          :disabled="!paginatedQuotes.hasNext"
          class="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </nav>
    </div>

    <!-- Other Characters -->
    <div v-if="character" class="mt-16">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Other Characters
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <router-link
          v-for="otherChar in otherCharacters"
          :key="otherChar.slug"
          :to="`/character/${otherChar.slug}`"
          class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 text-center"
        >
          <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {{ otherChar.name }}
          </h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ otherChar.quote_count }} quote{{ otherChar.quote_count === 1 ? '' : 's' }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QuoteCard from '@/components/QuoteCard.vue'
import QuoteService from '@/services/QuoteService.js'

const route = useRoute()
const router = useRouter()

const character = ref(null)
const quotes = ref([])
const loading = ref(true)
const currentPage = ref(1)
const quotesPerPage = 10

const paginatedQuotes = computed(() => {
  return QuoteService.paginateQuotes(quotes.value, currentPage.value, quotesPerPage)
})

const visiblePages = computed(() => {
  const total = paginatedQuotes.value.totalPages
  const current = paginatedQuotes.value.currentPage
  const pages = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)

    if (current > 4) {
      pages.push('...')
    }

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 3) {
      pages.push('...')
    }

    pages.push(total)
  }

  return pages.filter(page => page !== '...' || pages.indexOf(page) === pages.lastIndexOf(page))
})

const otherCharacters = computed(() => {
  if (!character.value) return []

  return QuoteService.getPopularCharacters()
    .filter(char => char.slug !== character.value.slug)
    .slice(0, 8)
})

const loadCharacterData = async (slug) => {
  loading.value = true
  character.value = null
  quotes.value = []
  currentPage.value = 1

  try {
    const charData = QuoteService.getCharacterBySlug(slug)
    if (charData) {
      character.value = charData
      quotes.value = QuoteService.getQuotesByCharacter(slug)
      updatePageMeta(charData, quotes.value.length)
    }
  } catch (error) {
    console.error('Error loading character data:', error)
  } finally {
    loading.value = false
  }
}

const updatePageMeta = (characterData, quoteCount) => {
  document.title = `${characterData.name} Quotes - One Piece of Quote`

  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', `${quoteCount} inspirational quotes from ${characterData.name}, ${characterData.description}. Discover wisdom from One Piece.`)
  }

  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) {
    ogTitle.setAttribute('content', `${characterData.name} Quotes - One Piece of Quote`)
  }

  const ogDescription = document.querySelector('meta[property="og:description"]')
  if (ogDescription) {
    ogDescription.setAttribute('content', `${quoteCount} inspirational quotes from ${characterData.name}, ${characterData.description}.`)
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= paginatedQuotes.value.totalPages) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Watch for route changes
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) {
      loadCharacterData(newSlug)
    }
  },
  { immediate: true }
)

onMounted(() => {
  const slug = route.params.slug
  if (slug) {
    loadCharacterData(slug)
  }
})
</script>
