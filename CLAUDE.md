# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint with auto-fix
- `npm run generate:sitemap` - Generate sitemap.xml

## Architecture Overview

This is a Vue.js 3 Single Page Application (SPA) for browsing One Piece quotes with an XKCD-style interface. The app uses:

- **Frontend**: Vue 3 with Composition API, Vue Router 4
- **Styling**: Tailwind CSS with dark/light theme support
- **Build**: Vite with modern ES modules
- **Data**: Static JSON files (no backend API)
- **Deployment**: GitHub Pages with automatic deployment

### Core Architecture Patterns

**Data Layer**: 
- All data is stored in static JSON files in `/data/` directory
- `QuoteService.js` acts as a centralized data access layer with methods for querying quotes, characters, and tags
- Data enrichment happens in the service layer (e.g., adding character names to quotes)
- Quote counts are calculated dynamically rather than stored

**Component Structure**:
- Route-based architecture with views in `/src/views/`
- Reusable components in `/src/components/`
- Single App.vue manages global theme state and layout

**Routing**:
- Hash-free routing with Vue Router 4
- Dynamic routes for quotes (`/quote/:id`), characters (`/character/:slug`), and tags (`/tag/:tag`)
- Meta titles are set per route for SEO
- 404 handling with lazy-loaded NotFound component

**Theme System**:
- Dark/light mode implemented with Tailwind CSS classes
- Theme state managed in App.vue with localStorage persistence
- Respects system preference as default
- Uses CSS transitions for smooth theme switching

## Data Schema

### Quotes (`data/quotes.json`)
```json
{
  "id": "unique_quote_id",
  "character_slug": "character-name",
  "quote": "The actual quote text",
  "chapter": 123,
  "description": "Context about the quote",
  "tags": ["tag1", "tag2"],
  "created_at": "2024-01-01"
}
```

### Characters (`data/characters.json`)
```json
{
  "name": "Character Name",
  "slug": "character-name",
  "description": "Character description"
}
```

### Tags (`data/tags.json`)
```json
{
  "name": "tag-name",
  "description": "Tag description"
}
```

## Key Service Methods

The `QuoteService` class provides these essential methods:
- `getAllQuotes()` - Returns all quotes with character names
- `getQuoteById(id)` - Get specific quote by ID
- `getRandomQuote()` - Get random quote (used for XKCD-style navigation)
- `searchQuotes(query)` - Full-text search across quotes, characters, descriptions, and tags
- `getQuotesByCharacter(slug)` / `getQuotesByTag(tag)` - Filtered quote retrieval
- `getNextQuote(id)` / `getPreviousQuote(id)` - Sequential navigation
- Pagination and popularity methods for browse/list views

## Navigation Patterns

The app follows XKCD's navigation pattern:
- Previous/Next buttons for sequential browsing
- Random button for discovery
- Permalink support for sharing specific quotes
- Search functionality across all content

## Adding New Content

**To add quotes**: Edit `data/quotes.json` following the schema, ensure character exists in `characters.json` and tags exist in `tags.json`

**To add features**: Follow Vue 3 Composition API patterns, use existing QuoteService methods, maintain responsive design with Tailwind utilities

## Build and Deployment

- Built files go to `/dist/` directory
- GitHub Actions automatically deploys to GitHub Pages on main branch pushes
- Base URL configuration handled via Vite environment variables
- All assets are bundled and optimized by Vite