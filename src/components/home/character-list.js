/* global console */
import { LitElement, html } from 'lit';
import './character-card.js';
import { characters } from '../../services/characters.js';
import { characterListStyle } from './character-list-style';

export class CharacterList extends LitElement {
  static properties = {
    characters: { type: Array },
    loading: { type: Boolean },
    searchTerm: { type: String },
    error: { type: String },
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
    this._loadCharacters();
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

      console.log(
        `✅ Cargados ${this.characters.length} personajes aleatorios`
      );
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

    // Búsqueda en tiempo real (opcional)
    if (this.searchTerm.length >= 2) {
      try {
        const results = await characters.search(this.searchTerm, 20);
        const favs = JSON.parse(
          localStorage.getItem('marvel-favorites') || '[]'
        );
        this.characters = results.map((c) => ({
          ...c,
          favorite: favs.includes(c.id),
        }));
      } catch (err) {
        console.error('Error en búsqueda:', err);
      }
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
    const character = e.detail;
    this.characters = this.characters.map((c) =>
      c.id === character.id ? { ...c, favorite: !c.favorite } : c
    );
    // Persistir favoritos
    const favIds = this.characters.filter((c) => c.favorite).map((c) => c.id);
    localStorage.setItem('marvel-favorites', JSON.stringify(favIds));
    // Emitir evento para actualizar el header
    this.dispatchEvent(
      new CustomEvent('favorites-changed', {
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

  render() {
    if (this.loading) {
      return html`<div class="loading">Cargando personajes...</div>`;
    }

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
        <button @click=${this._loadCharacters} class="refresh-button">
          🔄 Cargar más personajes
        </button>
      </div>
      ${this.filteredCharacters.length === 0
        ? html`<div class="no-results">No se encontraron personajes</div>`
        : html`
            <div class="characters-grid">
              ${this.filteredCharacters.map(
                (character) => html`
                  <character-card
                    .character=${character}
                    @character-click=${() =>
                      this._handleCharacterClick(character)}
                    @toggle-favorite=${this._handleToggleFavorite}
                  ></character-card>
                `
              )}
            </div>
          `}
    `;
  }
}

customElements.define('character-list', CharacterList);
