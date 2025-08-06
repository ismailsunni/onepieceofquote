/**
 * Simple toast notification utility
 */

export function showToast(message, type = 'info', duration = 3000) {
  // Create toast element
  const toast = document.createElement('div')
  toast.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-300 transform translate-x-full ${getToastClasses(type)}`
  toast.textContent = message

  // Add to DOM
  document.body.appendChild(toast)

  // Trigger entrance animation
  setTimeout(() => {
    toast.classList.remove('translate-x-full')
  }, 10)

  // Auto remove
  setTimeout(() => {
    toast.classList.add('translate-x-full')
    setTimeout(() => {
      if (toast.parentNode) {
        document.body.removeChild(toast)
      }
    }, 300)
  }, duration)
}

function getToastClasses(type) {
  switch (type) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'info':
    default:
      return 'bg-blue-500'
  }
}
