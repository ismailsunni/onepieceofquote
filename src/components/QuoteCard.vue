<template>
  <div class="quote-card max-w-quote mx-auto">
    <!-- Character Name -->
    <div class="mb-4">
      <router-link
        :to="`/character/${quote.character_slug}`"
        class="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
      >
        {{ quote.character }}
      </router-link>
    </div>

    <!-- Quote Text -->
    <blockquote class="text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed mb-6 font-medium">
      "{{ quote.quote }}"
    </blockquote>

    <!-- Chapter Info -->
    <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">
      Chapter {{ quote.chapter }}
    </div>

    <!-- Description -->
    <p v-if="quote.description" class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
      {{ quote.description }}
    </p>

    <!-- Tags -->
    <div v-if="quote.tags && quote.tags.length > 0" class="flex flex-wrap gap-2 mb-6">
      <router-link
        v-for="tag in quote.tags"
        :key="tag"
        :to="`/tag/${tag}`"
        class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
      >
        #{{ tag }}
      </router-link>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-3">
      <!-- Copy Quote Button -->
      <button
        @click="copyQuote"
        class="btn btn-secondary flex items-center space-x-2"
        :class="{ 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300': copied }"
      >
        <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>{{ copied ? 'Copied!' : 'Copy Quote' }}</span>
      </button>

      <!-- Share Button -->
      <button
        @click="shareQuote"
        class="btn btn-secondary flex items-center space-x-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
        </svg>
        <span>Share</span>
      </button>

      <!-- Copy Link Button -->
      <button
        @click="copyLink"
        class="btn btn-outline flex items-center space-x-2"
        :class="{ 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700': linkCopied }"
      >
        <svg v-if="!linkCopied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>{{ linkCopied ? 'Link Copied!' : 'Copy Link' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getFullUrl } from '@/utils/url.js'

const props = defineProps({
  quote: {
    type: Object,
    required: true
  }
})

const route = useRoute()
const copied = ref(false)
const linkCopied = ref(false)

const copyQuote = async () => {
  const text = `"${props.quote.quote}" - ${props.quote.character}`
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy quote:', err)
  }
}

const copyLink = async () => {
  const url = getFullUrl(`/quote/${props.quote.id}`)
  try {
    await navigator.clipboard.writeText(url)
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

const shareQuote = () => {
  const text = `"${props.quote.quote}" - ${props.quote.character}`
  const url = getFullUrl(`/quote/${props.quote.id}`)

  if (navigator.share) {
    navigator.share({
      title: 'One Piece Quote',
      text: text,
      url: url
    })
  } else {
    // Fallback to Twitter share
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer')
  }
}
</script>
