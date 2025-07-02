import { LitElement, html, css } from 'lit';
import './character-card.js';
import { mockCharacters, searchCharacters } from '../data/mock-data.js';

export class CharacterList extends LitElement {
  static properties = {
    characters: { type: Array },
    loading: { type: Boolean },
    searchTerm: { type: String },
  };

  static styles = css`
    :host {
      display: block;
    }

    .search-container {
      margin-bottom: 2rem;
    }

    .search-input {
      width: 100%;
      max-width: 400px;
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s ease;
    }

    .search-input:focus {
      border-color: #ed1d24;
    }

    .characters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      font-size: 1.1rem;
      color: #6b7280;
    }

    .no-results {
      text-align: center;
      padding: 2rem;
      color: #6b7280;
    }
  `;

  constructor() {
    super();
    this.characters = [];
    this.loading = true;
    this.searchTerm = '';

    // Mock data - esto se reemplazará con datos reales de la API
    this._loadMockData();
  }

  async _loadMockData() {
    // Simular carga de datos
    setTimeout(() => {
      this.characters = mockCharacters;
      this.loading = false;
    }, 1000);
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
        <input
          type="text"
          class="search-input"
          placeholder="Buscar personajes..."
          .value=${this.searchTerm}
          @input=${this._handleSearchChange}
        />
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
                  ></character-card>
                `
              )}
            </div>
          `}
    `;
  }
}

customElements.define('character-list', CharacterList);
