<template>
  <div class="about-page">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        About One Piece of Quote
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
        A collection of inspirational quotes from the One Piece manga and anime series,
        designed to bring the wisdom and spirit of adventure to fans worldwide.
      </p>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- Project Description -->
      <section class="quote-card">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Our Mission
        </h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            One Piece of Quote is dedicated to preserving and sharing the most memorable and
            inspirational quotes from Eiichiro Oda's masterpiece, One Piece. From Luffy's
            unwavering determination to Zoro's unbreakable loyalty, these quotes capture the
            essence of what makes One Piece such a beloved series.
          </p>
          <p>
            Our goal is to provide fans with easy access to these powerful words, whether
            you're looking for motivation, sharing with friends, or simply reminiscing about
            your favorite moments from the series.
          </p>
        </div>
      </section>

      <!-- Features -->
      <section class="quote-card">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Features
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">XKCD-Style Navigation</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Navigate through quotes with Previous, Next, and Random buttons,
              just like your favorite webcomic.
            </p>
          </div>

          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">Powerful Search</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Search across quotes, characters, and tags to find exactly
              what you're looking for.
            </p>
          </div>

          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">Organized by Tags</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Quotes are categorized by themes like "dreams", "friendship",
              and "determination" for easy discovery.
            </p>
          </div>

          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
              </svg>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">Easy Sharing</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Share your favorite quotes on social media or copy them
              for personal use with one click.
            </p>
          </div>
        </div>
      </section>

      <!-- Data Sources -->
      <section class="quote-card">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Data Sources & Methodology
        </h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            All quotes are sourced from the official One Piece manga by Eiichiro Oda,
            published by Shueisha. We also reference the anime adaptation by Toei Animation
            for context and accuracy.
          </p>
          <p>
            Each quote includes:
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>The exact quote text as it appears in the manga</li>
            <li>Chapter number for reference</li>
            <li>Character attribution</li>
            <li>Context and description</li>
            <li>Thematic tags for categorization</li>
          </ul>
          <p>
            We strive for accuracy and respect for the original work. If you notice
            any errors or have suggestions for improvements, please let us know.
          </p>
        </div>
      </section>

      <!-- Technical Information -->
      <section class="quote-card">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Technical Information
        </h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            This website is built with modern web technologies to ensure a fast,
            accessible experience across all devices:
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="font-semibold text-green-600 dark:text-green-400">Vue.js 3</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Frontend Framework</div>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="font-semibold text-blue-600 dark:text-blue-400">Tailwind CSS</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Styling</div>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="font-semibold text-purple-600 dark:text-purple-400">Vite</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Build Tool</div>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="font-semibold text-gray-600 dark:text-gray-400">GitHub Pages</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Hosting</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Submit Quote -->
      <section class="quote-card bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Submit a Quote
        </h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Know a great One Piece quote that's missing from our collection?
            We'd love to hear from you! Community contributions help make this
            resource more comprehensive for all fans.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              :href="SUBMISSION_FORM_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary inline-flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Submit a Quote
            </a>
            <span class="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              All submissions are reviewed before being added to the collection.
            </span>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section class="quote-card">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Contact & Support
        </h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Have questions, suggestions, or found an issue? We'd love to hear from you:
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/ismailsunni/onepieceofquote/issues"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline inline-flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub Issues
            </a>
            <span class="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              Report bugs or request features on our GitHub repository.
            </span>
          </div>
        </div>
      </section>

      <!-- Legal -->
      <section class="quote-card">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Legal & Attribution
        </h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
          <p>
            <strong>Copyright:</strong> One Piece is created by Eiichiro Oda and published by Shueisha.
            All quotes and references are used under fair use for educational and entertainment purposes.
          </p>
          <p>
            <strong>Disclaimer:</strong> This is an unofficial fan site and is not affiliated with
            Eiichiro Oda, Shueisha, or Toei Animation. All rights belong to their respective owners.
          </p>
          <p>
            <strong>License:</strong> The source code for this website is open source and available
            under the MIT License. The quote data is compiled for fair use purposes.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { SUBMISSION_FORM_URL } from '@/utils/constants.js'

onMounted(() => {
  // Update page title
  document.title = 'About - One Piece of Quote'

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Learn about One Piece of Quote, our mission to share inspirational quotes from the One Piece manga and anime series.')
  }
})
</script>
