import { LitElement, html } from 'lit';
import './marvel-header.js';
import './character-list.js';
import '../character-detail/character-detail.js';
import { marvelAppStyle } from './marvel-app-style';

export class MarvelApp extends LitElement {
  static properties = {
    selectedCharacter: { type: Object },
    view: { type: String },
    favoritesCount: { type: Number },
    favorites: { type: Array },
    resetSearchFlag: { type: Boolean },
  };

  static get styles() {
    return [marvelAppStyle];
  }

  constructor() {
    super();
    this.selectedCharacter = null;
    this.view = 'list'; // 'list', 'detail' o 'favorites'
    this.favoritesCount = 0;
    this.favorites = [];
    this.resetSearchFlag = false;
    this._loadFavorites();
    this._updateFavoritesCount();
  }

  _loadFavorites() {
    this.favorites = JSON.parse(
      localStorage.getItem('marvel-favorites') || '[]'
    );
  }

  _updateFavoritesCount() {
    const favs = JSON.parse(localStorage.getItem('marvel-favorites') || '[]');
    this.favoritesCount = favs.length;
  }

  _handleFavoriteToggled(e) {
    const { character, isFavorite } = e.detail;
    let favs = JSON.parse(localStorage.getItem('marvel-favorites') || '[]');
    if (isFavorite) {
      // Añadir solo si no existe
      if (!favs.some((c) => c.id === character.id)) {
        favs.push(character);
      }
    } else {
      favs = favs.filter((c) => c.id !== character.id);
    }
    localStorage.setItem('marvel-favorites', JSON.stringify(favs));
    this._loadFavorites();
    this._updateFavoritesCount();
    this.requestUpdate();
  }

  _handleCharacterSelect(e) {
    this.selectedCharacter = e.detail;
    this.view = 'detail';
  }

  _handleBackToList() {
    this.view = 'list';
    this.selectedCharacter = null;
  }

  _handleGoHome() {
    this.view = 'list';
    this.selectedCharacter = null;
    this.resetSearchFlag = !this.resetSearchFlag;
    // Limpiar búsqueda y recargar personajes en character-list
    const characterList = this.renderRoot?.querySelector('character-list');
    if (characterList && typeof characterList._handleGoHome === 'function') {
      characterList._handleGoHome();
    }
  }

  _handleShowFavorites() {
    this.favorites = JSON.parse(
      localStorage.getItem('marvel-favorites') || '[]'
    );
    this.view = 'favorites';
  }

  // Escuchar cambios en favoritos
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('storage', this._updateFavoritesCount.bind(this));
    // Escuchar eventos de favorite-toggled desde cualquier lugar
    this.addEventListener(
      'favorite-toggled',
      this._updateFavoritesCount.bind(this)
    );
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

  // Recibir evento de favoritos desde character-list
  _handleFavoritesChanged() {
    this._updateFavoritesCount();
  }

  // Recibir evento de favoritos desde character-detail
  _handleDetailFavoritesChanged() {
    this._updateFavoritesCount();
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

      <main class="main-content${this.view === 'list' ? ' home' : ''}">
        ${this.view === 'list'
          ? html`<character-list
              @character-selected=${this._handleCharacterSelect}
              @favorites-changed=${this._handleFavoritesChanged}
              @favorite-toggled=${this._handleFavoriteToggled}
              .resetSearchFlag=${this.resetSearchFlag}
            ></character-list>`
          : this.view === 'favorites'
            ? html`
                <div class="favorites-list-container">
                  <h2>Favoritos</h2>
                  ${this.favorites.length === 0
                    ? html`<div>No tienes personajes favoritos.</div>`
                    : html`
                        <character-grid
                          .characters=${this.favorites}
                          @character-click=${(e) =>
                            (this.selectedCharacter = e.detail)}
                          @toggle-favorite=${this._handleFavoriteToggled}
                        ></character-grid>
                      `}
                  <button @click=${this._handleBackToList}>Volver</button>
                </div>
              `
            : html`<character-detail
                .character=${this.selectedCharacter}
                @back-to-list=${this._handleBackToList}
                @favorites-changed=${this._handleDetailFavoritesChanged}
                @favorite-toggled=${this._handleFavoriteToggled}
              ></character-detail>`}
      </main>
    `;
  }
}

customElements.define('marvel-app', MarvelApp);
