import { LitElement, html } from 'lit';
import { searchContainerStyle } from './search-container-style.js';

export class SearchContainer extends LitElement {
  // Configuración de búsqueda
  static MIN_SEARCH_LENGTH = 3;
  static SEARCH_DEBOUNCE_MS = 400;
  static properties = {
    searchTerm: { type: String },
    initialSearchTerm: { type: String },
    placeholder: { type: String },
  };

  static get styles() {
    return [searchContainerStyle];
  }

  constructor() {
    super();
    this.searchTerm = '';
    this.initialSearchTerm = '';
    this.placeholder = 'SEARCH A CHARACTER...';
    this._debounceTimeout = null;
  }

  _handleSearchChange(e) {
    this.searchTerm = e.target.value;

    // Emitir evento de cambio de búsqueda
    this.dispatchEvent(
      new CustomEvent('search-change', {
        detail: this.searchTerm,
        bubbles: true,
        composed: true,
      })
    );

    // Solo buscar si la cadena tiene la longitud mínima, con debounce
    if (this._debounceTimeout) {
      window.clearTimeout(this._debounceTimeout);
    }
    if (this.searchTerm.length >= SearchContainer.MIN_SEARCH_LENGTH) {
      this._debounceTimeout = window.setTimeout(() => {
        this.dispatchEvent(
          new CustomEvent('search-perform', {
            detail: this.searchTerm,
            bubbles: true,
            composed: true,
          })
        );
      }, SearchContainer.SEARCH_DEBOUNCE_MS);
    }
  }

  updated(changedProps) {
    // Si se pasa un término de búsqueda inicial, aplicarlo
    if (changedProps.has('initialSearchTerm') && this.initialSearchTerm) {
      this.searchTerm = this.initialSearchTerm;
    }
  }

  render() {
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
          placeholder=${this.placeholder}
          .value=${this.searchTerm}
          @input=${this._handleSearchChange}
          aria-label="Buscar personaje"
        />
      </div>
    `;
  }
}

customElements.define('search-container', SearchContainer);
