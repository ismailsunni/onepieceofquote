import fs from 'fs'
import QuoteService from '../src/services/QuoteService.js'

const generateSitemap = () => {
  const baseUrl = 'https://ismailsunni.github.io/onepieceofquote'
  const currentDate = new Date().toISOString().split('T')[0]
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/browse</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/search</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

`

  // Add quote pages
  const quotes = QuoteService.getAllQuotes()
  quotes.forEach(quote => {
    sitemap += `  <url>
    <loc>${baseUrl}/quote/${quote.id}</loc>
    <lastmod>${quote.created_at}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`
  })

  // Add character pages
  const characters = QuoteService.getAllCharacters()
  characters.forEach(character => {
    sitemap += `  <url>
    <loc>${baseUrl}/character/${character.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`
  })

  // Add tag pages
  const tags = QuoteService.getAllTags()
  tags.forEach(tag => {
    sitemap += `  <url>
    <loc>${baseUrl}/tag/${tag.name}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
`
  })

  sitemap += '</urlset>'

  // Write sitemap to public directory
  fs.writeFileSync('public/sitemap.xml', sitemap)
  console.log('Sitemap generated successfully!')
}

generateSitemap()
