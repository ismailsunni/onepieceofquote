<template>
  <div class="browse-page">
    <!-- Page Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Browse All Quotes
      </h1>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Explore all {{ totalQuotes }} inspirational quotes from One Piece characters. 
        Use filters to find quotes by character or tag.
      </p>
    </div>

    <!-- Filters -->
    <div class="mb-8 space-y-4">
      <!-- Character Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Character
        </label>
        <select
          v-model="selectedCharacter"
          @change="applyFilters"
          class="w-full md:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Characters</option>
          <option
            v-for="character in characters"
            :key="character.slug"
            :value="character.slug"
          >
            {{ character.name }} ({{ character.quote_count }})
          </option>
        </select>
      </div>

      <!-- Tag Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Tag
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in popularTags"
            :key="tag.name"
            @click="toggleTag(tag.name)"
            :class="[
              'px-3 py-1 rounded-full text-sm transition-colors',
              selectedTags.includes(tag.name)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            ]"
          >
            #{{ tag.name }} ({{ tag.quote_count }})
          </button>
        </div>
      </div>

      <!-- Sort Options -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Sort by
        </label>
        <select
          v-model="sortBy"
          @change="applyFilters"
          class="w-full md:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="created_at_desc">Newest First</option>
          <option value="created_at_asc">Oldest First</option>
          <option value="character">Character Name</option>
          <option value="chapter">Chapter Number</option>
        </select>
      </div>

      <!-- Clear Filters -->
      <div v-if="hasActiveFilters">
        <button
          @click="clearFilters"
          class="btn btn-outline text-sm"
        >
          Clear All Filters
        </button>
      </div>
    </div>

    <!-- Results Info -->
    <div class="mb-6 text-sm text-gray-600 dark:text-gray-400">
      Showing {{ paginatedResult.quotes.length }} of {{ paginatedResult.totalQuotes }} quotes
      <span v-if="paginatedResult.totalPages > 1">
        (Page {{ paginatedResult.currentPage }} of {{ paginatedResult.totalPages }})
      </span>
    </div>

    <!-- Quotes Grid -->
    <div v-if="paginatedResult.quotes.length > 0" class="space-y-6">
      <div
        v-for="quote in paginatedResult.quotes"
        :key="quote.id"
        class="quote-card hover:shadow-lg transition-shadow"
      >
        <QuoteCard :quote="quote" />
      </div>
    </div>

    <!-- No Results -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        No quotes found
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Try adjusting your filters or clearing them to see more results.
      </p>
      <button @click="clearFilters" class="btn btn-primary">
        Clear Filters
      </button>
    </div>

    <!-- Pagination -->
    <div v-if="paginatedResult.totalPages > 1" class="mt-12 flex justify-center">
      <nav class="flex items-center space-x-2">
        <!-- Previous Button -->
        <button
          @click="goToPage(paginatedResult.currentPage - 1)"
          :disabled="!paginatedResult.hasPrev"
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
              page === paginatedResult.currentPage
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <!-- Next Button -->
        <button
          @click="goToPage(paginatedResult.currentPage + 1)"
          :disabled="!paginatedResult.hasNext"
          class="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QuoteCard from '@/components/QuoteCard.vue'
import QuoteService from '@/services/QuoteService.js'

export default {
  name: 'Browse',
  components: {
    QuoteCard
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const allQuotes = ref([])
    const characters = ref([])
    const popularTags = ref([])
    const selectedCharacter = ref('')
    const selectedTags = ref([])
    const sortBy = ref('created_at_desc')
    const currentPage = ref(1)
    const quotesPerPage = 12

    const totalQuotes = computed(() => allQuotes.value.length)

    const hasActiveFilters = computed(() => 
      selectedCharacter.value || selectedTags.value.length > 0 || sortBy.value !== 'created_at_desc'
    )

    const filteredQuotes = computed(() => {
      let quotes = [...allQuotes.value]

      // Filter by character
      if (selectedCharacter.value) {
        quotes = quotes.filter(quote => quote.character_slug === selectedCharacter.value)
      }

      // Filter by tags
      if (selectedTags.value.length > 0) {
        quotes = quotes.filter(quote => 
          selectedTags.value.some(tag => quote.tags.includes(tag))
        )
      }

      // Sort quotes
      switch (sortBy.value) {
        case 'created_at_asc':
          quotes.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          break
        case 'character':
          quotes.sort((a, b) => a.character.localeCompare(b.character))
          break
        case 'chapter':
          quotes.sort((a, b) => a.chapter - b.chapter)
          break
        case 'created_at_desc':
        default:
          quotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          break
      }

      return quotes
    })

    const paginatedResult = computed(() => {
      return QuoteService.paginateQuotes(filteredQuotes.value, currentPage.value, quotesPerPage)
    })

    const visiblePages = computed(() => {
      const total = paginatedResult.value.totalPages
      const current = paginatedResult.value.currentPage
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

    const loadData = () => {
      allQuotes.value = QuoteService.getAllQuotes()
      characters.value = QuoteService.getPopularCharacters()
      popularTags.value = QuoteService.getPopularTags()
    }

    const toggleTag = (tagName) => {
      const index = selectedTags.value.indexOf(tagName)
      if (index === -1) {
        selectedTags.value.push(tagName)
      } else {
        selectedTags.value.splice(index, 1)
      }
      applyFilters()
    }

    const applyFilters = () => {
      currentPage.value = 1
      // Update URL to reflect current filters
      const query = {}
      if (selectedCharacter.value) query.character = selectedCharacter.value
      if (selectedTags.value.length > 0) query.tags = selectedTags.value.join(',')
      if (sortBy.value !== 'created_at_desc') query.sort = sortBy.value
      if (currentPage.value !== 1) query.page = currentPage.value

      router.replace({ query })
    }

    const clearFilters = () => {
      selectedCharacter.value = ''
      selectedTags.value = []
      sortBy.value = 'created_at_desc'
      currentPage.value = 1
      router.replace({ query: {} })
    }

    const goToPage = (page) => {
      if (page >= 1 && page <= paginatedResult.value.totalPages) {
        currentPage.value = page
        
        // Update URL
        const query = { ...route.query }
        if (page === 1) {
          delete query.page
        } else {
          query.page = page
        }
        router.replace({ query })

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    const loadFiltersFromQuery = () => {
      const query = route.query
      
      if (query.character) {
        selectedCharacter.value = query.character
      }
      
      if (query.tags) {
        selectedTags.value = query.tags.split(',')
      }
      
      if (query.sort) {
        sortBy.value = query.sort
      }
      
      if (query.page) {
        currentPage.value = parseInt(query.page) || 1
      }
    }

    onMounted(() => {
      loadData()
      loadFiltersFromQuery()
      
      // Update page title
      document.title = 'Browse All Quotes - One Piece of Quote'
    })

    return {
      allQuotes,
      characters,
      popularTags,
      selectedCharacter,
      selectedTags,
      sortBy,
      currentPage,
      totalQuotes,
      hasActiveFilters,
      filteredQuotes,
      paginatedResult,
      visiblePages,
      toggleTag,
      applyFilters,
      clearFilters,
      goToPage
    }
  }
}
</script>
