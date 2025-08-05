import quotesData from '../../data/quotes.json'
import charactersData from '../../data/characters.json'
import tagsData from '../../data/tags.json'

class QuoteService {
  constructor() {
    this.quotes = quotesData
    this.characters = charactersData
    this.tags = tagsData
  }

  // Get all quotes
  getAllQuotes() {
    return this.quotes
  }

  // Get quote by ID
  getQuoteById(id) {
    return this.quotes.find(quote => quote.id === id)
  }

  // Get random quote
  getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * this.quotes.length)
    return this.quotes[randomIndex]
  }

  // Get quotes by character slug
  getQuotesByCharacter(characterSlug) {
    return this.quotes.filter(quote => quote.character_slug === characterSlug)
  }

  // Get quotes by tag
  getQuotesByTag(tag) {
    return this.quotes.filter(quote => quote.tags.includes(tag))
  }

  // Search quotes
  searchQuotes(query) {
    const searchTerm = query.toLowerCase()
    return this.quotes.filter(quote => 
      quote.quote.toLowerCase().includes(searchTerm) ||
      quote.character.toLowerCase().includes(searchTerm) ||
      quote.description.toLowerCase().includes(searchTerm) ||
      quote.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }

  // Get all characters
  getAllCharacters() {
    return this.characters
  }

  // Get character by slug
  getCharacterBySlug(slug) {
    return this.characters.find(character => character.slug === slug)
  }

  // Get all tags
  getAllTags() {
    return this.tags
  }

  // Get tag by name
  getTagByName(name) {
    return this.tags.find(tag => tag.name === name)
  }

  // Get next quote (by array index)
  getNextQuote(currentId) {
    const currentIndex = this.quotes.findIndex(quote => quote.id === currentId)
    if (currentIndex === -1) return null
    
    const nextIndex = (currentIndex + 1) % this.quotes.length
    return this.quotes[nextIndex]
  }

  // Get previous quote (by array index)
  getPreviousQuote(currentId) {
    const currentIndex = this.quotes.findIndex(quote => quote.id === currentId)
    if (currentIndex === -1) return null
    
    const prevIndex = currentIndex === 0 ? this.quotes.length - 1 : currentIndex - 1
    return this.quotes[prevIndex]
  }

  // Paginate quotes
  paginateQuotes(quotes, page = 1, limit = 10) {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    return {
      quotes: quotes.slice(startIndex, endIndex),
      currentPage: page,
      totalPages: Math.ceil(quotes.length / limit),
      totalQuotes: quotes.length,
      hasNext: endIndex < quotes.length,
      hasPrev: page > 1
    }
  }

  // Get recent quotes (by created_at)
  getRecentQuotes(limit = 5) {
    return [...this.quotes]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit)
  }

  // Get popular tags (by quote count)
  getPopularTags(limit = 10) {
    return [...this.tags]
      .sort((a, b) => b.quote_count - a.quote_count)
      .slice(0, limit)
  }

  // Get popular characters (by quote count)
  getPopularCharacters(limit = 10) {
    return [...this.characters]
      .sort((a, b) => b.quote_count - a.quote_count)
      .slice(0, limit)
  }
}

export default new QuoteService()
