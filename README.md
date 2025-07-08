# 🦸‍♂️ Marvel Heroes App

A modern, responsive web application for exploring Marvel characters built with **Lit** and **Vite**. This application provides a seamless experience for browsing, searching, and managing favorite Marvel characters with real-time data from the Marvel API.

**🌐 Live Demo: [https://lit-dev.vercel.app/](https://lit-dev.vercel.app/)**

![Marvel Heroes App](https://img.shields.io/badge/Lit-3.3.0-blue) ![Vite](https://img.shields.io/badge/Vite-7.0.0-purple) ![ESLint](https://img.shields.io/badge/ESLint-9.30.1-red) ![Prettier](https://img.shields.io/badge/Prettier-3.6.2-orange)

## ✨ Features

### 🎯 Core Functionality

- **Character Browsing**: Explore Marvel characters with pagination and filtering
- **Real-time Search**: Search characters by name with debounced input
- **Character Details**: View detailed information about each character
- **Comics Integration**: Browse comics featuring selected characters
- **Favorites System**: Add/remove characters to/from favorites with persistent storage
- **URL State Management**: Shareable URLs with search terms and character details
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🚀 Advanced Features

- **Caching System**: Intelligent caching for API responses and favorites
- **Error Handling**: Graceful error handling with retry mechanisms
- **Loading States**: Smooth loading indicators and skeleton screens
- **Image Optimization**: Fallback images and lazy loading
- **Keyboard Navigation**: Full keyboard accessibility support
- **Performance Optimized**: Efficient rendering and minimal bundle size

## 🛠️ Tech Stack

### Frontend Framework

- **[Lit 3.3.0](https://lit.dev/)**: Modern library for building web components
- **[Vite 7.0.0](https://vitejs.dev/)**: Fast build tool and development server

### Development Tools

- **[ESLint 9.30.1](https://eslint.org/)**: Code linting and quality assurance
- **[Prettier 3.6.2](https://prettier.io/)**: Code formatting
- **[Husky 9.1.7](https://typicode.github.io/husky/)**: Git hooks for code quality
- **[Vitest 3.2.4](https://vitest.dev/)**: Unit testing framework

### External Dependencies

- **[CryptoJS 4.2.0](https://cryptojs.gitbook.io/)**: Cryptographic functions for API authentication
- **[Marvel API](https://developer.marvel.com/)**: Official Marvel Comics API

## 🏗️ Architecture

### Component Structure

```
src/components/
├── home/                    # Main application components
│   ├── marvel-app.js       # Root application component
│   ├── marvel-app-controller.js  # Business logic controller
│   ├── marvel-app-views.js       # View rendering logic
│   ├── character-list.js   # Character listing component
│   ├── marvel-header.js    # Application header
│   └── *-style.js          # Component styles
├── common/                  # Reusable components
│   ├── character-card.js   # Individual character card
│   ├── character-grid.js   # Character grid layout
│   ├── favorite-button.js  # Favorite toggle button
│   ├── search-container.js # Search functionality
│   ├── marvel-spinner.js   # Loading spinner
│   └── *-style.js          # Component styles
└── character-detail/        # Character detail components
    ├── character-detail.js # Main detail component
    ├── comics-section.js   # Comics listing
    ├── header-character-detail.js # Detail header
    └── *-style.js          # Component styles
```

### Service Layer

```
src/services/
├── api.js          # Marvel API client with authentication
└── characters.js   # Character data management with caching
```

### Utilities

```
src/utils/
├── storage-utils.js  # LocalStorage management for favorites
├── image-utils.js    # Image handling and optimization
└── css-utils.js      # CSS utility functions
```

## 🎨 Lit Best Practices Implemented

### 1. **Component Architecture**

```javascript
// Clean separation of concerns
export class MarvelApp extends LitElement {
  static properties = {
    selectedCharacter: { type: Object },
    view: { type: String },
    // ... other properties
  };

  static get styles() {
    return [marvelAppStyle];
  }
}
```

### 2. **Controller Pattern**

```javascript
// Business logic separated from UI
export class MarvelAppController {
  constructor() {
    this.state = {
      selectedCharacter: null,
      view: VIEWS.LIST,
      // ... state management
    };
  }
}
```

### 3. **Event-Driven Communication**

```javascript
// Custom events for component communication
this.dispatchEvent(
  new CustomEvent('character-selected', {
    detail: character,
    bubbles: true,
    composed: true,
  })
);
```

### 4. **Reactive Properties**

```javascript
// Automatic updates when properties change
static properties = {
  characters: { type: Array },
  loading: { type: Boolean },
  searchTerm: { type: String },
};
```

### 5. **Template Literals with html**

```javascript
render() {
  return html`
    <div class="character-grid">
      ${this.characters.map(character =>
        html`<character-card .character=${character}></character-card>`
      )}
    </div>
  `;
}
```

### 6. **Lifecycle Management**

```javascript
connectedCallback() {
  super.connectedCallback();
  // Component initialization
}

disconnectedCallback() {
  super.disconnectedCallback();
  // Cleanup
}
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Marvel API Keys** (free at [developer.marvel.com](https://developer.marvel.com/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/lit-marvel.git
   cd lit-marvel
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp env.example .env
   ```

   Edit `.env` with your Marvel API credentials:

   ```env
   VITE_MARVEL_PUBLIC_KEY=your_public_key_here
   VITE_MARVEL_PRIVATE_KEY=your_private_key_here
   VITE_MARVEL_BASE_URL=https://gateway.marvel.com/v1/public
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:run     # Run tests once
```

## 📱 Usage

### Browsing Characters

1. The app loads with a grid of Marvel characters
2. Scroll through the list or use the search functionality
3. Click on any character card to view details

### Searching

1. Use the search bar in the header
2. Type at least 3 characters to trigger search
3. Results update in real-time as you type

### Managing Favorites

1. Click the heart icon on any character card
2. View your favorites by clicking the favorites button in the header
3. Favorites are automatically saved to localStorage

### Character Details

1. Click on any character to view detailed information
2. Browse comics featuring the character
3. Use the back button to return to the list

## 🔧 Configuration

### API Configuration

Edit `src/constants/app-constants.js` to modify:

- API limits and pagination
- Search configuration
- Cache expiration times

### Styling

- Component styles are co-located with components
- Global styles in `src/styles.css`
- CSS custom properties for theming

### Build Configuration

Modify `vite.config.js` for:

- Build optimization
- Code splitting
- Development server settings

## 🧪 Testing

The project includes a comprehensive testing setup with Vitest:

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:run

# Watch mode for development
npm run test:ui
```

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

The build process:

- Minifies and optimizes code
- Splits vendor and application code
- Generates static assets in `dist/` directory

### Deployment

The `dist/` folder contains static files ready for deployment to:

- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Marvel Comics API](https://developer.marvel.com/) for providing character data
- [Lit Team](https://lit.dev/) for the amazing web components library
- [Vite Team](https://vitejs.dev/) for the fast build tool

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the [documentation](https://lit.dev/docs/)
- Review the [Marvel API documentation](https://developer.marvel.com/documentation)

---

**Built with ❤️ using Lit and the Marvel API**
