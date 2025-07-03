import { LitElement, html } from 'lit';
import './character-card.js';
import { mockCharacters } from '../data/mock-data.js';
import { characterListStyle } from './character-list-style';

export class CharacterList extends LitElement {
  static properties = {
    characters: { type: Array },
    loading: { type: Boolean },
    searchTerm: { type: String },
  };

  static get styles() {
    return [characterListStyle];
  }

  constructor() {
    super();
    this.characters = [];
    this.loading = true;
    this.searchTerm = '';
    this._loadMockData();
  }

  async _loadMockData() {
    setTimeout(() => {
      const favs = JSON.parse(localStorage.getItem('marvel-favorites') || '[]');
      this.characters = mockCharacters.map((c) => ({
        ...c,
        favorite: favs.includes(c.id),
      }));
      this.loading = false;
    }, 500);
  }

  _handleSearchChange(e) {
    this.searchTerm = e.target.value;
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
      new CustomEvent('favorites-changed', { bubbles: true, composed: true })
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
      <div class="results-count">${this.filteredCharacters.length} RESULTS</div>
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
