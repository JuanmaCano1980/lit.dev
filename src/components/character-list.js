import { LitElement, html, css } from 'lit';
import './character-card.js';
import { mockCharacters } from '../data/mock-data.js';

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
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      padding-bottom: 0.25rem;
    }
    .search-bar {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
      border: none;
      background: transparent;
      z-index: 1;
    }
    .search-input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-size: 1.5rem;
      font-family: 'Roboto Condensed', Arial, sans-serif;
      color: #222;
      padding: 0.5rem 0 0.5rem 2.2rem;
      font-weight: 400;
      letter-spacing: 0.02em;
      z-index: 2;
    }
    .search-input::placeholder {
      color: #bdbdbd;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 1.2rem;
      font-family: 'Roboto Condensed', Arial, sans-serif;
      opacity: 1;
    }
    .search-icon {
      position: absolute;
      left: 0.2rem;
      top: 50%;
      transform: translateY(-50%);
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #222;
      opacity: 0.7;
      z-index: 3;
      background: transparent;
      pointer-events: none;
    }
    .search-container::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2.5px;
      background: #111;
      z-index: 1;
    }
    .search-input:focus ~ .search-container::after {
      background: #111;
      height: 3px;
    }
    @media (max-width: 600px) {
      .search-container {
        max-width: 100%;
        padding: 0 0.5rem 0.25rem 0.5rem;
      }
      .search-input {
        font-size: 1.1rem;
        padding-left: 1.7rem;
      }
      .search-icon {
        width: 22px;
        height: 22px;
      }
    }
    .characters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(172.5px, 1fr));
      gap: 1rem;
      justify-items: center;
    }

    @media (min-width: 600px) {
      .characters-grid {
        grid-template-columns: repeat(auto-fit, minmax(172.5px, 1fr));
        max-width: calc(4 * 172.5px + 3 * 16px);
        margin: 0 auto;
      }
    }

    @media (min-width: 1024px) {
      .characters-grid {
        grid-template-columns: repeat(auto-fit, minmax(172.5px, 1fr));
        max-width: calc(7 * 172.5px + 6 * 16px);
      }
    }

    @media (min-width: 1440px) {
      .characters-grid {
        grid-template-columns: repeat(auto-fit, minmax(172.5px, 1fr));
        max-width: calc(10 * 172.5px + 9 * 16px);
      }
    }
    .loading,
    .no-results {
      text-align: center;
      padding: 2rem;
      font-size: 1.1rem;
      color: #6b7280;
    }
    .results-count {
      margin-top: 0.5rem;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      color: #111;
      font-weight: 400;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  `;

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
