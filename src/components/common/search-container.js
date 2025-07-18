import { LitElement, html } from 'lit';
import { searchContainerStyle } from './search-container-style.js';
import { SEARCH_CONFIG } from '../../constants/app-constants.js';

// Global function declarations for browser APIs
const { clearTimeout, setTimeout } = globalThis;

export class SearchContainer extends LitElement {
  // Search configuration
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
    this.placeholder = 'Search for a character...';
    this.debounceTimer = null;
  }

  _handleSearchChange(e) {
    const value = e.target.value;
    this.searchTerm = value;

    // Emit search-change event immediately for URL updates
    this.dispatchEvent(
      new CustomEvent('search-change', {
        detail: this.searchTerm,
        bubbles: true,
        composed: true,
      })
    );

    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set new timer for debounced search
    this.debounceTimer = setTimeout(() => {
      if (this.searchTerm.length >= SEARCH_CONFIG.MIN_LENGTH) {
        this._performSearch();
      }
    }, SEARCH_CONFIG.DEBOUNCE_MS);
  }

  _performSearch() {
    this.dispatchEvent(
      new CustomEvent('search-perform', {
        detail: this.searchTerm,
        bubbles: true,
        composed: true,
      })
    );
  }

  updated(changedProps) {
    // If an initial search term is passed, apply it
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
          aria-label="Search character"
        />
      </div>
    `;
  }
}

customElements.define('search-container', SearchContainer);
