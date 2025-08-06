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

  // Get all characters with calculated quote counts
  getAllCharacters() {
    return this.characters.map(character => ({
      ...character,
      quote_count: this.getQuotesByCharacter(character.slug).length
    }))
  }

  // Get character by slug with calculated quote count
  getCharacterBySlug(slug) {
    const character = this.characters.find(character => character.slug === slug)
    if (!character) return null

    return {
      ...character,
      quote_count: this.getQuotesByCharacter(character.slug).length
    }
  }

  // Get all tags with calculated quote counts
  getAllTags() {
    return this.tags.map(tag => ({
      ...tag,
      quote_count: this.getQuotesByTag(tag.name).length
    }))
  }

  // Get tag by name with calculated quote count
  getTagByName(name) {
    const tag = this.tags.find(tag => tag.name === name)
    if (!tag) return null

    return {
      ...tag,
      quote_count: this.getQuotesByTag(tag.name).length
    }
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

  // Get popular tags (by calculated quote count)
  getPopularTags(limit = 10) {
    return this.getAllTags()
      .sort((a, b) => b.quote_count - a.quote_count)
      .slice(0, limit)
  }

  // Get popular characters (by calculated quote count)
  getPopularCharacters(limit = 10) {
    return this.getAllCharacters()
      .sort((a, b) => b.quote_count - a.quote_count)
      .slice(0, limit)
  }
}

export default new QuoteService()
