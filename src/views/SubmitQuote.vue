<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Submit a Quote
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Have a memorable One Piece quote that's missing from our collection? Help us expand 
        our database by sharing your favorite quotes with the community!
      </p>
    </div>

    <!-- Google Form Embed -->
    <div class="quote-card">
      <div class="flex items-center justify-center mb-6">
        <div class="flex items-center space-x-3 text-blue-600 dark:text-blue-400">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span class="text-xl font-bold">Quote Submission Form</span>
        </div>
      </div>

      <!-- Loading message -->
      <div id="form-loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-3 border-blue-600 dark:border-blue-400"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading submission form...</p>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">This may take a few moments</p>
      </div>

      <!-- Embedded Google Form -->
      <div class="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
        <iframe
          :src="SUBMISSION_FORM_URL.replace('?usp=dialog', '?embedded=true')"
          width="100%"
          height="900"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          class="bg-white dark:bg-gray-50"
          @load="hideLoading"
          title="Quote Submission Form"
          loading="lazy"
        >
          Your browser doesn't support iframes. 
          <a :href="SUBMISSION_FORM_URL" target="_blank" class="text-blue-600 hover:underline">
            Click here to open the form
          </a>
        </iframe>
      </div>
    </div>

    <!-- Instructions -->
    <div class="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
      <div class="flex items-center space-x-2 mb-5">
        <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h2 class="text-xl font-bold text-blue-900 dark:text-blue-100">
          Submission Guidelines
        </h2>
      </div>
      <div class="space-y-3 text-blue-800 dark:text-blue-200">
        <div class="flex items-start space-x-3">
          <svg class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <span>Provide the <strong>exact quote</strong> as it appears in the manga or anime</span>
        </div>
        <div class="flex items-start space-x-3">
          <svg class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <span>Include the <strong>chapter/episode number</strong> for reference (if known)</span>
        </div>
        <div class="flex items-start space-x-3">
          <svg class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <span>Add <strong>context</strong> to help others understand the significance of the quote</span>
        </div>
        <div class="flex items-start space-x-3">
          <svg class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <span>Choose <strong>thematic tags</strong> (e.g., friendship, dreams, determination)</span>
        </div>
        <div class="mt-4 p-3 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
          <div class="flex items-center space-x-2 text-blue-900 dark:text-blue-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="font-medium text-sm">
              All submissions are carefully reviewed before being added to ensure accuracy and quality
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Alternative submission method -->
    <div class="mt-8 text-center">
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <p class="text-gray-700 dark:text-gray-300 mb-4 font-medium">
          Having trouble with the embedded form?
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            :href="SUBMISSION_FORM_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline inline-flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            <span>Open in New Tab</span>
          </a>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            or contact us via
          </span>
          <a
            href="https://github.com/ismailsunni/onepieceofquote/issues"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            GitHub Issues
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { SUBMISSION_FORM_URL } from '@/utils/constants.js'

const isLoading = ref(true)

const hideLoading = () => {
  isLoading.value = false
  const loadingElement = document.getElementById('form-loading')
  if (loadingElement) {
    loadingElement.style.display = 'none'
  }
}

onMounted(() => {
  // Update page title and meta description
  document.title = 'Submit a Quote - One Piece of Quote'
  
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Submit your favorite One Piece quotes to our collection. Help expand our database of inspirational quotes from the manga and anime series.')
  }
  
  // Hide loading after a delay as backup
  setTimeout(() => {
    hideLoading()
  }, 5000)
})
</script>

<style scoped>
/* Responsive iframe styling */
iframe {
  transition: opacity 0.3s ease;
}

@media (max-width: 768px) {
  iframe {
    height: 1000px !important;
  }
}

@media (max-width: 480px) {
  iframe {
    height: 1100px !important;
  }
}

/* Loading spinner enhancement */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
