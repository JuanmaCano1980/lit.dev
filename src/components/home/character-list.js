/* global console */
import { LitElement, html } from 'lit';
import './character-card.js';
import '../common/character-grid.js';
import '../common/marvel-spinner.js';
import { characters } from '../../services/characters.js';
import { characterListStyle } from './character-list-style';

export class CharacterList extends LitElement {
  static properties = {
    characters: { type: Array },
    loading: { type: Boolean },
    searchTerm: { type: String },
    error: { type: String },
    resetSearchFlag: { type: Boolean },
    customTitle: { type: String },
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
    this._debounceTimeout = null;
    this.addEventListener('go-home', this._handleGoHome.bind(this));
  }

  async _loadCharacters() {
    try {
      this.loading = true;
      this.error = '';

      // Cargar personajes aleatorios desde API
      const data = await characters.initialize();

      // Procesar personajes y agregar estado de favoritos
      const favs = JSON.parse(localStorage.getItem('marvel-favorites') || '[]');
      this.characters = data.characters.map((c) => ({
        ...c,
        favorite: favs.includes(c.id),
      }));
    } catch (err) {
      console.error('❌ Error cargando personajes:', err);
      this.error = 'Error al cargar los personajes. Intenta de nuevo.';
    } finally {
      this.loading = false;
    }
  }

  async _handleSearchChange(e) {
    this.searchTerm = e.target.value;

    // Si la búsqueda está vacía, mostrar todos los personajes
    if (!this.searchTerm.trim()) {
      return;
    }

    // Solo buscar si la cadena tiene 3 caracteres o más, con debounce
    if (this._debounceTimeout) {
      window.clearTimeout(this._debounceTimeout);
    }
    if (this.searchTerm.length >= 3) {
      this._debounceTimeout = window.setTimeout(async () => {
        this.loading = true;
        try {
          const results = await characters.search(this.searchTerm, 20);
          const favs = JSON.parse(
            localStorage.getItem('marvel-favorites') || '[]'
          );
          this.characters = results.map((c) => ({
            ...c,
            favorite: favs.includes(c.id),
          }));
          this.loading = false;
        } catch (err) {
          console.error('Error en búsqueda:', err);
          this.loading = false;
        }
      }, 400);
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

  get filteredCharacters() {
    if (!this.searchTerm) return this.characters;
    return this.characters.filter((character) =>
      character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  _handleGoHome() {
    this.searchTerm = '';
    this.characters = [];
    this._loadCharacters();
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    // Cargar personajes si no se pasan externamente
    if (this.characters.length === 0) {
      this._loadCharacters();
    }
  }

  updated(changedProps) {
    if (changedProps.has('resetSearchFlag')) {
      this.searchTerm = '';
      this.characters = [];
      this._loadCharacters();
    }

    // Si se pasan personajes externos (como en favoritos), detener el loading
    if (changedProps.has('characters') && this.characters.length > 0) {
      this.loading = false;
      this.error = '';
    }
  }

  render() {
    if (this.error) {
      return html`
        <div class="error-container">
          <div class="error-message">${this.error}</div>
          <button @click=${this._loadCharacters} class="retry-button">
            Intentar de nuevo
          </button>
        </div>
      `;
    }

    return html`
      ${this.customTitle
        ? html`<h2 class="custom-title">${this.customTitle}</h2>`
        : ''}
      <div class="search-container">
        <span class="search-icon">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          class="search-input"
          placeholder="SEARCH A CHARACTER..."
          .value=${this.searchTerm}
          @input=${this._handleSearchChange}
          aria-label="Buscar personaje"
        />
      </div>
      <div class="results-header">
        <div class="results-count">
          ${this.filteredCharacters.length} RESULTS
        </div>
      </div>
      <div class="results-content">
        ${this.loading
          ? html`<marvel-spinner></marvel-spinner>`
          : this.filteredCharacters.length === 0
            ? html`<div class="no-results">No se encontraron personajes</div>`
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
}

customElements.define('character-list', CharacterList);
