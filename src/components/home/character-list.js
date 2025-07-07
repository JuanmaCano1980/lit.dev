import { LitElement, html } from 'lit';
import '../common/character-card.js';
import '../common/character-grid.js';
import '../common/marvel-spinner.js';
import '../common/search-container.js';
import { characters } from '../../services/characters.js';
import { characterListStyle } from './character-list-style';
import { STORAGE_KEYS, SEARCH_CONFIG } from '../../constants/app-constants.js';

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
    this._hasLoadedCharacters = false; // Bandera para evitar llamadas duplicadas

    // Detectar si estamos en modo favoritos basado en la URL
    const urlParams = new URLSearchParams(window.location.search);
    this.isFavoritesMode = urlParams.get('favorites') === 'true';

    this.addEventListener('go-home', this._handleGoHome.bind(this));
  }

  connectedCallback() {
    super.connectedCallback();

    // Si estamos en modo favoritos y no hay personajes, cargar desde localStorage
    if (
      this.isFavoritesMode &&
      (!this.characters || this.characters.length === 0)
    ) {
      this._loadFavoritesFromStorage();
    }
    // Cargar personajes si no se pasan externamente y no estamos en modo favoritos
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

      // Cargar personajes aleatorios desde API
      const data = await characters.initialize();

      // Procesar personajes y agregar estado de favoritos
      const favs = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]'
      );
      this.characters = data.characters.map((c) => ({
        ...c,
        favorite: favs.some((fav) => fav.id === c.id),
      }));
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
    // Solo cargar personajes si no estamos en modo favoritos
    if (!this.isFavoritesMode) {
      this._loadCharacters();
    }
    this.requestUpdate();
  }

  async _performSearch(searchTerm) {
    this.loading = true;
    try {
      const results = await characters.search(searchTerm, 20);
      const favs = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]'
      );
      this.characters = results.map((c) => ({
        ...c,
        favorite: favs.some((fav) => fav.id === c.id),
      }));
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
      // Solo cargar personajes si no estamos en modo favoritos y no se han cargado ya
      if (!this.isFavoritesMode && !this._hasLoadedCharacters) {
        this._loadCharacters();
      }
    }

    // Detectar si estamos en modo favoritos basado en el customTitle
    if (changedProps.has('customTitle')) {
      this.isFavoritesMode = this.customTitle === 'Favorites';
      // Si estamos en modo favoritos, detener el loading inmediatamente
      if (this.isFavoritesMode) {
        this.loading = false;
        this.error = '';
        // Si no hay personajes, cargar desde localStorage
        if (!this.characters || this.characters.length === 0) {
          this._loadFavoritesFromStorage();
        }
      }
    }

    // Si se pasan personajes externos (como en favoritos), detener el loading
    if (
      changedProps.has('characters') &&
      this.characters &&
      this.characters.length > 0
    ) {
      this.loading = false;
      this.error = '';
    }

    // Si se pasa un término de búsqueda inicial, aplicarlo
    if (changedProps.has('initialSearchTerm') && this.initialSearchTerm) {
      this.searchTerm = this.initialSearchTerm;
      // Si hay suficientes caracteres, realizar la búsqueda
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

  // Asegurar que characters siempre sea un array
  set characters(value) {
    this._characters = Array.isArray(value) ? value : [];
  }

  get characters() {
    return this._characters || [];
  }

  _loadFavoritesFromStorage() {
    try {
      const favs = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]'
      );
      this.characters = favs.map((character) => ({
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
