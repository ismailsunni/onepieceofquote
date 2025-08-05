<template>
  <div class="search-page">
    <!-- Page Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Search Results
        <span v-if="searchQuery" class="text-blue-600 dark:text-blue-400">
          for "{{ searchQuery }}"
        </span>
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        <span v-if="searchResults.length > 0">
          Found {{ searchResults.length }} quote{{ searchResults.length === 1 ? '' : 's' }}
        </span>
        <span v-else>
          No quotes found for your search
        </span>
      </p>
    </div>

    <!-- Search Bar -->
    <div class="max-w-2xl mx-auto mb-8">
      <div class="relative">
        <input
          v-model="currentSearchQuery"
          @keyup.enter="performSearch"
          @input="handleSearchInput"
          type="text"
          placeholder="Search quotes, characters, tags..."
          class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
        <button
          @click="performSearch"
          class="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Search Suggestions -->
    <div v-if="showSuggestions && suggestions.length > 0" class="max-w-2xl mx-auto mb-8">
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <div class="p-4">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Suggestions</h3>
          <div class="space-y-2">
            <button
              v-for="suggestion in suggestions.slice(0, 5)"
              :key="suggestion.text"
              @click="selectSuggestion(suggestion.text)"
              class="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              {{ suggestion.text }}
              <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">
                ({{ suggestion.type }})
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchResults.length > 0" class="space-y-6">
      <div
        v-for="quote in paginatedResults.quotes"
        :key="quote.id"
        class="quote-card hover:shadow-lg transition-shadow"
      >
        <QuoteCard :quote="quote" />
      </div>
    </div>

    <!-- No Results -->
    <div v-else-if="searchQuery && !loading" class="text-center py-12">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        No quotes found
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Try searching for character names, themes, or specific words from quotes.
      </p>
      <div class="space-x-4">
        <button @click="clearSearch" class="btn btn-primary">
          Clear Search
        </button>
        <router-link to="/browse" class="btn btn-secondary">
          Browse All Quotes
        </router-link>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <div v-for="i in 3" :key="i" class="quote-card animate-pulse">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/4"></div>
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/6"></div>
      </div>
    </div>

    <!-- Empty State (no search performed) -->
    <div v-if="!searchQuery && !loading" class="text-center py-12">
      <div class="text-6xl mb-4">💭</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Start Your Search
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Search through {{ totalQuotes }} quotes to find inspiration from One Piece characters.
      </p>
      <div class="max-w-md mx-auto space-y-3">
        <div class="text-sm text-gray-600 dark:text-gray-400 text-left">
          <p class="font-medium mb-2">Try searching for:</p>
          <ul class="space-y-1">
            <li>• Character names: "Luffy", "Zoro", "Nami"</li>
            <li>• Themes: "dreams", "friendship", "freedom"</li>
            <li>• Specific words: "pirate king", "nakama"</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="paginatedResults.totalPages > 1" class="mt-12 flex justify-center">
      <nav class="flex items-center space-x-2">
        <!-- Previous Button -->
        <button
          @click="goToPage(paginatedResults.currentPage - 1)"
          :disabled="!paginatedResults.hasPrev"
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
              page === paginatedResults.currentPage
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <!-- Next Button -->
        <button
          @click="goToPage(paginatedResults.currentPage + 1)"
          :disabled="!paginatedResults.hasNext"
          class="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </nav>
    </div>

    <!-- Recent Searches -->
    <div v-if="recentSearches.length > 0" class="mt-16">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Searches</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="search in recentSearches"
          :key="search"
          @click="selectSuggestion(search)"
          class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {{ search }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QuoteCard from '@/components/QuoteCard.vue'
import QuoteService from '@/services/QuoteService.js'

export default {
  name: 'Search',
  components: {
    QuoteCard
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const searchQuery = ref('')
    const currentSearchQuery = ref('')
    const searchResults = ref([])
    const loading = ref(false)
    const currentPage = ref(1)
    const quotesPerPage = 12
    const showSuggestions = ref(false)
    const recentSearches = ref([])

    const totalQuotes = computed(() => QuoteService.getAllQuotes().length)

    const suggestions = computed(() => {
      if (!currentSearchQuery.value || currentSearchQuery.value.length < 2) {
        return []
      }

      const query = currentSearchQuery.value.toLowerCase()
      const suggestions = []

      // Character suggestions
      QuoteService.getAllCharacters().forEach(character => {
        if (character.name.toLowerCase().includes(query)) {
          suggestions.push({
            text: character.name,
            type: 'character'
          })
        }
      })

      // Tag suggestions
      QuoteService.getAllTags().forEach(tag => {
        if (tag.name.toLowerCase().includes(query)) {
          suggestions.push({
            text: tag.name,
            type: 'tag'
          })
        }
      })

      return suggestions.slice(0, 5)
    })

    const paginatedResults = computed(() => {
      return QuoteService.paginateQuotes(searchResults.value, currentPage.value, quotesPerPage)
    })

    const visiblePages = computed(() => {
      const total = paginatedResults.value.totalPages
      const current = paginatedResults.value.currentPage
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

    const loadRecentSearches = () => {
      const saved = localStorage.getItem('recentSearches')
      if (saved) {
        recentSearches.value = JSON.parse(saved).slice(0, 5)
      }
    }

    const saveToRecentSearches = (query) => {
      if (!query.trim()) return

      const searches = recentSearches.value.filter(s => s !== query)
      searches.unshift(query)
      recentSearches.value = searches.slice(0, 5)

      localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
    }

    const performSearch = async () => {
      const query = currentSearchQuery.value.trim()
      if (!query) return

      loading.value = true
      showSuggestions.value = false

      try {
        searchQuery.value = query
        searchResults.value = QuoteService.searchQuotes(query)
        currentPage.value = 1

        // Update URL
        router.replace(`/search/${encodeURIComponent(query)}`)

        // Save to recent searches
        saveToRecentSearches(query)

        // Update page meta
        updatePageMeta(query, searchResults.value.length)

      } catch (error) {
        console.error('Search error:', error)
      } finally {
        loading.value = false
      }
    }

    const handleSearchInput = () => {
      showSuggestions.value = currentSearchQuery.value.length >= 2
    }

    const selectSuggestion = (suggestion) => {
      currentSearchQuery.value = suggestion
      showSuggestions.value = false
      nextTick(() => {
        performSearch()
      })
    }

    const clearSearch = () => {
      searchQuery.value = ''
      currentSearchQuery.value = ''
      searchResults.value = []
      showSuggestions.value = false
      router.replace('/search')
    }

    const goToPage = (page) => {
      if (page >= 1 && page <= paginatedResults.value.totalPages) {
        currentPage.value = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    const updatePageMeta = (query, resultCount) => {
      document.title = `Search "${query}" - One Piece of Quote`

      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', `Found ${resultCount} One Piece quotes matching "${query}". Search through inspirational quotes from your favorite characters.`)
      }
    }

    // Watch for route changes
    watch(
      () => route.params.query,
      (newQuery) => {
        if (newQuery && newQuery !== searchQuery.value) {
          currentSearchQuery.value = decodeURIComponent(newQuery)
          performSearch()
        } else if (!newQuery) {
          clearSearch()
        }
      },
      { immediate: true }
    )

    // Hide suggestions when clicking outside
    const hideSuggestions = () => {
      showSuggestions.value = false
    }

    onMounted(() => {
      loadRecentSearches()
      document.addEventListener('click', hideSuggestions)

      // Load initial search if provided in URL
      const queryParam = route.params.query
      if (queryParam) {
        currentSearchQuery.value = decodeURIComponent(queryParam)
        performSearch()
      } else {
        document.title = 'Search Quotes - One Piece of Quote'
      }
    })

    return {
      searchQuery,
      currentSearchQuery,
      searchResults,
      loading,
      currentPage,
      totalQuotes,
      suggestions,
      showSuggestions,
      recentSearches,
      paginatedResults,
      visiblePages,
      performSearch,
      handleSearchInput,
      selectSuggestion,
      clearSearch,
      goToPage
    }
  }
}
</script>
