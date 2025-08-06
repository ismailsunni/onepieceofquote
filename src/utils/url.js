/**
 * Get the base URL for the application
 * This handles both local development and GitHub Pages deployment
 */
export function getBaseUrl() {
  // In development, use the origin directly
  if (import.meta.env.DEV) {
    return window.location.origin
  }

  // In production, construct the URL with the base path
  const origin = window.location.origin
  const basePath = import.meta.env.BASE_URL || '/'

  // Remove trailing slash from origin and leading slash from basePath, then combine
  return `${origin}${basePath === '/' ? '' : basePath.replace(/\/$/, '')}`
}

/**
 * Get the full URL for a specific route
 * @param {string} path - The route path (should start with /)
 */
export function getFullUrl(path) {
  const baseUrl = getBaseUrl()
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${normalizedPath}`
}
