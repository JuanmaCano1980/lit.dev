import { LitElement, html } from 'lit';
import './marvel-header.js';
import './character-list.js';
import '../character-detail/character-detail.js';
import '../common/marvel-spinner.js';
import { marvelAppStyle } from './marvel-app-style';
import {
  VIEWS,
  STORAGE_KEYS,
  URL_PARAMS,
} from '../../constants/app-constants.js';

export class MarvelApp extends LitElement {
  static properties = {
    selectedCharacter: { type: Object },
    view: { type: String },
    favoritesCount: { type: Number },
    favorites: { type: Array },
    resetSearchFlag: { type: Boolean },
    searchTerm: { type: String },
    isLoading: { type: Boolean },
  };

  static get styles() {
    return [marvelAppStyle];
  }

  constructor() {
    super();
    this.selectedCharacter = null;
    this.view = VIEWS.LIST;
    this.favoritesCount = 0;
    this.favorites = [];
    this.resetSearchFlag = false;
    this.searchTerm = '';
    this.isLoading = true;
    this._loadFavorites();
    this._updateFavoritesCount();
  }

  _loadFavorites() {
    const favs = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]'
    );
    // Ensure all favorites have the favorite: true property
    this.favorites = favs.map((character) => ({
      ...character,
      favorite: true,
    }));
  }

  _updateFavoritesCount() {
    const favs = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]'
    );
    this.favoritesCount = favs.length;
  }

  _handleFavoriteToggled(e) {
    const { character, isFavorite } = e.detail;
    let favs = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');
    if (isFavorite) {
      // Add only if it doesn't exist
      if (!favs.some((c) => c.id === character.id)) {
        favs.push(character);
      }
    } else {
      favs = favs.filter((c) => c.id !== character.id);
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
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
    const favs = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]'
    );
    this.selectedCharacter = {
      ...character,
      favorite: favs.some((c) => c.id === character.id),
    };
    this.view = VIEWS.DETAIL;
    this._updateURL();
  }

  _handleBackToList() {
    this.view = VIEWS.LIST;
    this.selectedCharacter = null;
    this._clearURL();
  }

  _handleGoHome() {
    this.view = VIEWS.LIST;
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
    const favs = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]'
    );
    // Ensure all favorites have the favorite: true property
    this.favorites = favs.map((character) => ({
      ...character,
      favorite: true,
    }));
    this.view = VIEWS.FAVORITES;
    this._updateURL();
  }

  async _handleQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get(URL_PARAMS.SEARCH);
    const favorites = urlParams.get(URL_PARAMS.FAVORITES);
    const characterId = urlParams.get(URL_PARAMS.CHARACTER_ID);

    if (favorites === 'true') {
      this._handleShowFavorites();
    }

    if (search) {
      // Pass search term to character-list
      this.searchTerm = search;
    }

    if (characterId) {
      // Handle direct character detail view
      await this._handleDirectCharacterDetail(characterId);
    }
  }

  async _handleDirectCharacterDetail(characterId) {
    try {
      // Try to find character in favorites first
      const favs = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]'
      );
      const favoriteCharacter = favs.find(
        (c) => c.id.toString() === characterId
      );

      if (favoriteCharacter) {
        this.selectedCharacter = {
          ...favoriteCharacter,
          favorite: true,
        };
        this.view = VIEWS.DETAIL;
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
        this.view = VIEWS.DETAIL;
      } else {
        // Character not found, redirect to list
        this.view = VIEWS.LIST;
        this._clearURL();
      }
    } catch (error) {
      console.error('Error loading character from URL params:', error);
      // On error, redirect to list
      this.view = VIEWS.LIST;
      this._clearURL();
    }
  }

  _updateURL() {
    const url = new URL(window.location);
    const params = new URLSearchParams();

    if (this.view === VIEWS.FAVORITES) {
      params.set(URL_PARAMS.FAVORITES, 'true');
    }

    if (this.searchTerm) {
      params.set(URL_PARAMS.SEARCH, this.searchTerm);
    }

    if (this.view === VIEWS.DETAIL && this.selectedCharacter) {
      params.set(URL_PARAMS.CHARACTER_ID, this.selectedCharacter.id.toString());
    }

    url.search = params.toString();
    window.history.pushState({}, '', url);
  }

  _clearURL() {
    window.history.pushState({}, '', window.location.pathname);
  }

  // Listen for favorites changes
  async connectedCallback() {
    super.connectedCallback();
    window.addEventListener('storage', this._updateFavoritesCount.bind(this));
    // Listen for favorite-toggled events from anywhere
    this.addEventListener(
      'favorite-toggled',
      this._updateFavoritesCount.bind(this)
    );

    // Handle query params after component is fully connected
    await this._handleQueryParams();
    this.isLoading = false;
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

  // Métodos helper para renderizar vistas
  _renderCharacterList(customTitle = '', characters = null) {
    return html`
      <character-list
        .customTitle=${customTitle}
        .characters=${characters}
        .initialSearchTerm=${this.searchTerm}
        @character-selected=${this._handleCharacterSelect}
        @favorites-changed=${this._handleFavoritesChanged}
        @favorite-toggled=${this._handleFavoriteToggled}
        @search-change=${this._handleSearchChange}
        .resetSearchFlag=${this.resetSearchFlag}
      ></character-list>
    `;
  }

  _renderCharacterDetail() {
    return html`
      <character-detail
        .character=${this.selectedCharacter}
        @back-to-list=${this._handleBackToList}
        @favorites-changed=${this._handleDetailFavoritesChanged}
        @favorite-toggled=${this._handleFavoriteToggled}
      ></character-detail>
    `;
  }

  _renderMainContent() {
    if (this.isLoading) {
      return html`<marvel-spinner></marvel-spinner>`;
    }

    switch (this.view) {
      case VIEWS.LIST:
        return this._renderCharacterList();
      case VIEWS.FAVORITES:
        return this._renderCharacterList('Favorites', this.favorites);
      case VIEWS.DETAIL:
        return this._renderCharacterDetail();
      default:
        return this._renderCharacterList();
    }
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

      <main class="main-content${this.view !== VIEWS.DETAIL ? ' home' : ''}">
        ${this._renderMainContent()}
      </main>
    `;
  }
}

customElements.define('marvel-app', MarvelApp);
