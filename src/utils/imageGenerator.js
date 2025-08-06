/**
 * Generate an image from a quote and copy it to clipboard
 */

export async function generateQuoteImage(quote, permalink = null) {
  // Create a canvas element
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // Set canvas dimensions (Instagram post size)
  const width = 1080
  const height = 1080
  canvas.width = width
  canvas.height = height

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#1e40af') // Blue-700
  gradient.addColorStop(0.5, '#3b82f6') // Blue-500
  gradient.addColorStop(1, '#60a5fa') // Blue-400

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // Add subtle pattern overlay
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
  for (let i = 0; i < width; i += 40) {
    for (let j = 0; j < height; j += 40) {
      if ((i + j) % 80 === 0) {
        ctx.fillRect(i, j, 20, 20)
      }
    }
  }

  // Set text properties
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Draw quote marks
  ctx.font = 'bold 120px serif'
  ctx.fillText('"', width * 0.2, height * 0.25)
  ctx.fillText('"', width * 0.8, height * 0.75)

  // Draw quote text
  const quoteText = quote.quote
  const maxWidth = width * 0.8
  const lineHeight = 80

  // Split text into lines
  ctx.font = 'bold 64px Arial, sans-serif'
  const words = quoteText.split(' ')
  const lines = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word
    const metrics = ctx.measureText(testLine)

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }
  if (currentLine) {
    lines.push(currentLine)
  }

  // Draw quote lines
  const startY = height * 0.4 - (lines.length * lineHeight) / 2
  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * lineHeight)
  })

  // Draw character name
  ctx.font = 'bold 48px Arial, sans-serif'
  ctx.fillStyle = '#fbbf24' // Amber-400
  ctx.fillText(`— ${quote.character}`, width / 2, height * 0.75)

  // Draw chapter info
  ctx.font = '32px Arial, sans-serif'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.fillText(`Chapter ${quote.chapter}`, width / 2, height * 0.82)

  // Draw permalink if provided
  if (permalink) {
    ctx.font = '28px Arial, sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.fillText(permalink, width / 2, height * 0.87)
  }

  // Draw watermark
  ctx.font = '24px Arial, sans-serif'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.fillText('One Piece of Quote', width / 2, height * 0.92)

  return canvas
}

export async function copyQuoteAsImage(quote, permalink = null) {
  try {
    const canvas = await generateQuoteImage(quote, permalink)

    // Convert canvas to blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          reject(new Error('Failed to generate image'))
          return
        }

        try {
          // Copy to clipboard
          const item = new ClipboardItem({ 'image/png': blob })
          await navigator.clipboard.write([item])
          resolve(true)
        } catch (err) {
          // If clipboard API fails, try to download the image
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `one-piece-quote-${quote.id}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
          resolve(false) // Indicate it was downloaded instead of copied
        }
      }, 'image/png')
    })
  } catch (err) {
    console.error('Failed to generate quote image:', err)
    throw err
  }
}

export async function downloadQuoteImage(quote, permalink = null) {
  try {
    const canvas = await generateQuoteImage(quote, permalink)

    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `one-piece-quote-${quote.id}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 'image/png')
  } catch (err) {
    console.error('Failed to download quote image:', err)
    throw err
  }
}
