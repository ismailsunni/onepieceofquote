# One Piece of Quote

A Vue.js website for inspirational quotes from the One Piece manga/anime series, featuring an XKCD-style interface for browsing, sharing, and discovering quotes.

## 🏴‍☠️ Features

- **XKCD-Style Navigation**: Navigate through quotes with Previous, Next, and Random buttons
- **Powerful Search**: Search across quotes, characters, and tags
- **Character & Tag Filtering**: Browse quotes by specific characters or themes
- **Dark/Light Mode**: Toggle between dark and light themes
- **Mobile-Friendly**: Responsive design that works on all devices
- **Social Sharing**: Share quotes on social media or copy to clipboard
- **Permalink Support**: Each quote has a unique URL for easy sharing

## 🚀 Technology Stack

- **Frontend**: Vue.js 3 with Composition API
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: Vue Router 4
- **Data**: Static JSON files
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/ismailsunni/onepieceofquote.git
cd onepieceofquote
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Project Structure

```
├── src/
│   ├── components/          # Reusable Vue components
│   ├── views/              # Page components
│   ├── router/             # Vue Router configuration
│   ├── services/           # Data services
│   └── style.css           # Global styles
├── data/                   # JSON data files
│   ├── quotes.json         # All quotes
│   ├── characters.json     # Character information
│   └── tags.json          # Tag information
├── public/                 # Static assets
└── .github/workflows/      # GitHub Actions
```

### Adding New Quotes

1. Edit `data/quotes.json` and add your quote following the schema:
```json
{
  "id": "unique_quote_id",
  "character": "Character Name",
  "character_slug": "character-name",
  "quote": "The actual quote text",
  "chapter": 123,
  "description": "Context and notes about the quote",
  "tags": ["tag1", "tag2"],
  "created_at": "2024-01-01"
}
```

2. Update `data/characters.json` and `data/tags.json` if needed
3. Test locally and submit a pull request

## 🌟 Quote Schema

Each quote follows this structure:

- `id`: Unique identifier (string)
- `character`: Character name (string)
- `character_slug`: URL-friendly character name (string)
- `quote`: The actual quote text (string)
- `chapter`: Chapter number where the quote appears (number)
- `description`: Context about the quote (string)
- `tags`: Array of theme tags (array of strings)
- `created_at`: Date added to collection (string, YYYY-MM-DD)

## 🎨 Design System

The site uses a clean, minimalist design inspired by XKCD:

- **Colors**: Primary blue (#3B82F6) with gray-based neutral palette
- **Typography**: Inter font family for readability
- **Layout**: Centered content with maximum width for optimal reading
- **Components**: Consistent button styles, cards, and navigation elements

## 📱 Responsive Design

- **Mobile**: < 768px - Single column layout, optimized touch targets
- **Tablet**: 768px - 1024px - Two column layout where appropriate
- **Desktop**: > 1024px - Full layout with sidebar elements

## 🚀 Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

### Environment Variables

For production deployment, set:
- `NODE_ENV=production`
- `BASE_URL` (if deploying to a subdirectory)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all quotes are accurate and properly attributed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Legal

**Copyright Notice**: One Piece is created by Eiichiro Oda and published by Shueisha. All quotes and references are used under fair use for educational and entertainment purposes.

**Disclaimer**: This is an unofficial fan site and is not affiliated with Eiichiro Oda, Shueisha, or Toei Animation. All rights belong to their respective owners.

## 🙏 Acknowledgments

- **Eiichiro Oda** for creating the amazing One Piece series
- **XKCD** for design inspiration
- **Vue.js** and **Tailwind CSS** communities for excellent tools
- All the fans who contribute quotes and feedback

## 📊 Performance

The site is optimized for performance:
- First Contentful Paint: < 2 seconds
- Lighthouse Score: > 90 across all metrics
- Minimal JavaScript bundle size
- Optimized images and assets

## 🔧 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

Made with ❤️ for One Piece fans worldwide
