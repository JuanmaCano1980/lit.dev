import { LitElement, html } from 'lit';
import './marvel-header.js';
import './character-list.js';
import '../character-detail/character-detail.js';
import { marvelAppStyle } from './marvel-app-style';

export class MarvelApp extends LitElement {
  static properties = {
    selectedCharacter: { type: Object },
    view: { type: String },
    favoritesCount: { type: Number },
    favorites: { type: Array },
    resetSearchFlag: { type: Boolean },
    searchTerm: { type: String },
  };

  static get styles() {
    return [marvelAppStyle];
  }

  constructor() {
    super();
    this.selectedCharacter = null;
    this.view = 'list'; // 'list', 'detail' o 'favorites'
    this.favoritesCount = 0;
    this.favorites = [];
    this.resetSearchFlag = false;
    this.searchTerm = '';
    this._loadFavorites();
    this._updateFavoritesCount();
    this._handleQueryParams();
  }

  _loadFavorites() {
    const favs = JSON.parse(localStorage.getItem('marvel-favorites') || '[]');
    // Ensure all favorites have the favorite: true property
    this.favorites = favs.map((character) => ({
      ...character,
      favorite: true,
    }));
  }

  _updateFavoritesCount() {
    const favs = JSON.parse(localStorage.getItem('marvel-favorites') || '[]');
    this.favoritesCount = favs.length;
  }

  _handleFavoriteToggled(e) {
    const { character, isFavorite } = e.detail;
    let favs = JSON.parse(localStorage.getItem('marvel-favorites') || '[]');
    if (isFavorite) {
      // Add only if it doesn't exist
      if (!favs.some((c) => c.id === character.id)) {
        favs.push(character);
      }
    } else {
      favs = favs.filter((c) => c.id !== character.id);
    }
    localStorage.setItem('marvel-favorites', JSON.stringify(favs));
    this._loadFavorites();
    this._updateFavoritesCount();

    // Update selectedCharacter if we're in detail view
    if (this.selectedCharacter && this.selectedCharacter.id === character.id) {
      this.selectedCharacter = {
        ...this.selectedCharacter,
        favorite: isFavorite,
      };
    }

    this.requestUpdate();
  }

  _handleCharacterSelect(e) {
    const character = e.detail;
    // Check if character is in favorites and add favorite property
    const favs = JSON.parse(localStorage.getItem('marvel-favorites') || '[]');
    this.selectedCharacter = {
      ...character,
      favorite: favs.some((c) => c.id === character.id),
    };
    this.view = 'detail';
    this._updateURL();
  }

  _handleBackToList() {
    this.view = 'list';
    this.selectedCharacter = null;
    this._clearURL();
  }

  _handleGoHome() {
    this.view = 'list';
    this.selectedCharacter = null;
    this.searchTerm = '';
    this.resetSearchFlag = !this.resetSearchFlag;
    this._clearURL();
    // Clear search and reload characters in character-list
    const characterList = this.renderRoot?.querySelector('character-list');
    if (characterList && typeof characterList._handleGoHome === 'function') {
      characterList._handleGoHome();
    }
  }

  _handleShowFavorites() {
    const favs = JSON.parse(localStorage.getItem('marvel-favorites') || '[]');
    // Ensure all favorites have the favorite: true property
    this.favorites = favs.map((character) => ({
      ...character,
      favorite: true,
    }));
    this.view = 'favorites';
    this._updateURL();
  }

  _handleQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    const favorites = urlParams.get('favorites');
    const characterId = urlParams.get('id');

    if (favorites === 'true') {
      this._handleShowFavorites();
    }

    if (search) {
      // Pass search term to character-list
      this.searchTerm = search;
    }

    if (characterId) {
      // Handle direct character detail view
      this._handleDirectCharacterDetail(characterId);
    }
  }

  async _handleDirectCharacterDetail(characterId) {
    try {
      // Try to find character in favorites first
      const favs = JSON.parse(localStorage.getItem('marvel-favorites') || '[]');
      const favoriteCharacter = favs.find(
        (c) => c.id.toString() === characterId
      );

      if (favoriteCharacter) {
        this.selectedCharacter = {
          ...favoriteCharacter,
          favorite: true,
        };
        this.view = 'detail';
        return;
      }

      // If not in favorites, fetch from API
      const { api } = await import('../../services/api.js');
      const response = await api.getCharacter(characterId);

      if (response.data.results && response.data.results.length > 0) {
        const character = response.data.results[0];
        // Check if character is in favorites
        const isFavorite = favs.some((c) => c.id === character.id);

        this.selectedCharacter = {
          ...character,
          favorite: isFavorite,
        };
        this.view = 'detail';
      } else {
        // Character not found, redirect to list
        this.view = 'list';
        this._clearURL();
      }
    } catch (error) {
      console.error('Error loading character from URL params:', error);
      // On error, redirect to list
      this.view = 'list';
      this._clearURL();
    }
  }

  _updateURL() {
    const url = new URL(window.location);
    const params = new URLSearchParams();

    if (this.view === 'favorites') {
      params.set('favorites', 'true');
    }

    if (this.searchTerm) {
      params.set('search', this.searchTerm);
    }

    if (this.view === 'detail' && this.selectedCharacter) {
      params.set('id', this.selectedCharacter.id.toString());
    }

    url.search = params.toString();
    window.history.pushState({}, '', url);
  }

  _clearURL() {
    window.history.pushState({}, '', window.location.pathname);
  }

  // Listen for favorites changes
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('storage', this._updateFavoritesCount.bind(this));
    // Listen for favorite-toggled events from anywhere
    this.addEventListener(
      'favorite-toggled',
      this._updateFavoritesCount.bind(this)
    );
  }
  disconnectedCallback() {
    window.removeEventListener(
      'storage',
      this._updateFavoritesCount.bind(this)
    );
    this.removeEventListener(
      'favorite-toggled',
      this._updateFavoritesCount.bind(this)
    );
    super.disconnectedCallback();
  }

  // Receive favorites event from character-list
  _handleFavoritesChanged() {
    this._updateFavoritesCount();
  }

  // Receive favorites event from character-detail
  _handleDetailFavoritesChanged() {
    this._updateFavoritesCount();
  }

  // Handle search from character-list
  _handleSearchChange(e) {
    this.searchTerm = e.detail;
    this._updateURL();
  }

  render() {
    return html`
      <marvel-header
        @back-to-list=${this._handleBackToList}
        @go-home=${this._handleGoHome}
        @show-favorites=${this._handleShowFavorites}
        .favoritesCount=${this.favoritesCount}
        .view=${this.view}
      ></marvel-header>

      <main class="main-content${this.view !== 'detail' ? ' home' : ''}">
        ${this.view === 'list'
          ? html`<character-list
              .customTitle=${''}
              .initialSearchTerm=${this.searchTerm}
              @character-selected=${this._handleCharacterSelect}
              @favorites-changed=${this._handleFavoritesChanged}
              @favorite-toggled=${this._handleFavoriteToggled}
              @search-change=${this._handleSearchChange}
              .resetSearchFlag=${this.resetSearchFlag}
            ></character-list>`
          : this.view === 'favorites'
            ? html`
                <character-list
                  .characters=${this.favorites}
                  .customTitle=${'Favorites'}
                  .initialSearchTerm=${this.searchTerm}
                  @character-selected=${this._handleCharacterSelect}
                  @favorites-changed=${this._handleFavoritesChanged}
                  @favorite-toggled=${this._handleFavoriteToggled}
                  @search-change=${this._handleSearchChange}
                ></character-list>
              `
            : html`<character-detail
                .character=${this.selectedCharacter}
                @back-to-list=${this._handleBackToList}
                @favorites-changed=${this._handleDetailFavoritesChanged}
                @favorite-toggled=${this._handleFavoriteToggled}
              ></character-detail>`}
      </main>
    `;
  }
}

customElements.define('marvel-app', MarvelApp);
