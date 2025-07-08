import { LitElement, html } from 'lit';
import '../common/character-card.js';
import '../common/character-grid.js';
import '../common/marvel-spinner.js';
import '../common/search-container.js';
import { characters } from '../../services/characters.js';
import { characterListStyle } from './character-list-style';
import { SEARCH_CONFIG } from '../../constants/app-constants.js';
import { storageManager } from '../../utils/storage-utils.js';

export class CharacterList extends LitElement {
  static properties = {
    characters: { type: Array },
    loading: { type: Boolean },
    searchTerm: { type: String },
    error: { type: String },
    resetSearchFlag: { type: Boolean },
    customTitle: { type: String },
    initialSearchTerm: { type: String },
    isFavoritesMode: { type: Boolean },
  };

  static get styles() {
    return [characterListStyle];
  }

  constructor() {
    super();
    this.characters = [];
    this.loading = true;
    this.searchTerm = '';
    this.error = '';
    this.customTitle = '';
    this.initialSearchTerm = '';
    this._hasLoadedCharacters = false; // Flag to avoid duplicate calls

    // Detect if we are in favorites mode based on the URL
    const urlParams = new URLSearchParams(window.location.search);
    this.isFavoritesMode = urlParams.get('favorites') === 'true';

    this.addEventListener('go-home', this._handleGoHome.bind(this));
  }

  connectedCallback() {
    super.connectedCallback();

    // If we are in favorites mode and there are no characters, load from localStorage
    if (
      this.isFavoritesMode &&
      (!this.characters || this.characters.length === 0)
    ) {
      this._loadFavoritesFromStorage();
    }
    // Load characters if not passed externally and not in favorites mode
    else if (
      (!this.characters || this.characters.length === 0) &&
      !this.isFavoritesMode &&
      !this._hasLoadedCharacters
    ) {
      this._loadCharacters();
    }
  }

  async _loadCharacters() {
    if (this._hasLoadedCharacters) {
      return;
    }

    this._hasLoadedCharacters = true;

    try {
      this.loading = true;
      this.error = '';

      // Load random characters from API
      const data = await characters.initialize();

      // Process characters and add favorite state
      this.characters = storageManager.addFavoriteStateToCharacters(
        data.characters
      );
    } catch (err) {
      console.error('❌ Error loading characters:', err);
      this.error = 'Error loading characters. Please try again.';
      this._hasLoadedCharacters = false; // Reset flag on error
    } finally {
      this.loading = false;
    }
  }

  _handleCharacterClick(character) {
    this.dispatchEvent(
      new CustomEvent('character-selected', {
        detail: character,
      })
    );
  }

  _handleToggleFavorite(e) {
    this.dispatchEvent(
      new CustomEvent('favorite-toggled', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleSearchChange(e) {
    this.searchTerm = e.detail;
    this.dispatchEvent(
      new CustomEvent('search-change', {
        detail: this.searchTerm,
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleSearchPerform(e) {
    this._performSearch(e.detail);
  }

  get filteredCharacters() {
    if (!this.characters) return [];
    if (!this.searchTerm) return this.characters;
    return this.characters.filter((character) =>
      character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  _handleGoHome() {
    this.searchTerm = '';
    this.characters = [];
    this.isFavoritesMode = false;
    this._hasLoadedCharacters = false; // Reset flag when going home
    // Load characters if not in favorites mode
    if (!this.isFavoritesMode) {
      this._loadCharacters();
    }
    this.requestUpdate();
  }

  async _performSearch(searchTerm) {
    this.loading = true;
    try {
      const results = await characters.search(searchTerm, 20);
      this.characters = storageManager.addFavoriteStateToCharacters(results);
      this.loading = false;
    } catch (err) {
      console.error('Error in search:', err);
      this.loading = false;
    }
  }

  updated(changedProps) {
    if (changedProps.has('resetSearchFlag')) {
      this.searchTerm = '';
      this.characters = [];
      // Load characters if not in favorites mode and not already loaded
      if (!this.isFavoritesMode && !this._hasLoadedCharacters) {
        this._loadCharacters();
      }
    }

    // Detect if we are in favorites mode based on the customTitle
    if (changedProps.has('customTitle')) {
      this.isFavoritesMode = this.customTitle === 'Favorites';
      // If we are in favorites mode, stop loading immediately
      if (this.isFavoritesMode) {
        this.loading = false;
        this.error = '';
        // If there are no characters, load from localStorage
        if (!this.characters || this.characters.length === 0) {
          this._loadFavoritesFromStorage();
        }
      }
    }

    // If external characters are passed (like in favorites), stop loading
    if (
      changedProps.has('characters') &&
      this.characters &&
      this.characters.length > 0
    ) {
      this.loading = false;
      this.error = '';
    }

    // If an initial search term is passed, apply it
    if (changedProps.has('initialSearchTerm') && this.initialSearchTerm) {
      this.searchTerm = this.initialSearchTerm;
      // If there are enough characters, perform the search
      if (this.initialSearchTerm.length >= SEARCH_CONFIG.MIN_LENGTH) {
        this._performSearch(this.initialSearchTerm);
      }
    }
  }

  render() {
    if (this.error) {
      return html`
        <div class="error-container">
          <div class="error-message">${this.error}</div>
          <button @click=${this._loadCharacters} class="retry-button">
            Try again
          </button>
        </div>
      `;
    }

    return html`
      <search-container
        .searchTerm=${this.searchTerm}
        .initialSearchTerm=${this.initialSearchTerm}
        @search-change=${this._handleSearchChange}
        @search-perform=${this._handleSearchPerform}
      ></search-container>
      <div class="results-header">
        <div class="results-count">
          ${this.filteredCharacters.length} RESULTS
        </div>
      </div>
      ${this.customTitle
        ? html`<h2 class="custom-title">${this.customTitle}</h2>`
        : ''}
      <div class="results-content">
        ${this.loading
          ? html`<marvel-spinner></marvel-spinner>`
          : this.filteredCharacters.length === 0
            ? html`<div class="no-results">No characters found</div>`
            : html`
                <character-grid
                  .characters=${this.filteredCharacters}
                  @character-click=${(e) =>
                    this._handleCharacterClick(e.detail)}
                  @toggle-favorite=${this._handleToggleFavorite}
                ></character-grid>
              `}
      </div>
    `;
  }

  // Ensure characters is always an array
  set characters(value) {
    this._characters = Array.isArray(value) ? value : [];
  }

  get characters() {
    return this._characters || [];
  }

  _loadFavoritesFromStorage() {
    try {
      const favorites = storageManager.getFavorites();
      this.characters = favorites.map((character) => ({
        ...character,
        favorite: true,
      }));
      this.loading = false;
      this.error = '';
    } catch (err) {
      console.error('❌ Error loading favorites from localStorage:', err);
      this.error = 'Error loading favorites.';
      this.loading = false;
    }
  }
}

customElements.define('character-list', CharacterList);
