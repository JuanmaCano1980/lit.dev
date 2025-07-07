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
    searchTerm: { type: String },
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
    this.searchTerm = '';
    this._loadFavorites();
    this._updateFavoritesCount();
    this._handleQueryParams();
  }

  _loadFavorites() {
    const favs = JSON.parse(localStorage.getItem('marvel-favorites') || '[]');
    // Asegurar que todos los favoritos tengan la propiedad favorite: true
    this.favorites = favs.map((character) => ({
      ...character,
      favorite: true,
    }));
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
    this._updateURL();
  }

  _handleGoHome() {
    this.view = 'list';
    this.selectedCharacter = null;
    this.searchTerm = '';
    this.resetSearchFlag = !this.resetSearchFlag;
    this._clearURL();
    // Limpiar búsqueda y recargar personajes en character-list
    const characterList = this.renderRoot?.querySelector('character-list');
    if (characterList && typeof characterList._handleGoHome === 'function') {
      characterList._handleGoHome();
    }
  }

  _handleShowFavorites() {
    const favs = JSON.parse(localStorage.getItem('marvel-favorites') || '[]');
    // Asegurar que todos los favoritos tengan la propiedad favorite: true
    this.favorites = favs.map((character) => ({
      ...character,
      favorite: true,
    }));
    this.view = 'favorites';
    this._updateURL();
  }

  _handleQueryParams() {
    // eslint-disable-next-line no-undef
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    const favorites = urlParams.get('favorites');

    if (favorites === 'true') {
      this._handleShowFavorites();
    }

    if (search) {
      // Pasar el término de búsqueda al character-list
      this.searchTerm = search;
    }
  }

  _updateURL() {
    // eslint-disable-next-line no-undef
    const url = new URL(window.location);
    // eslint-disable-next-line no-undef
    const params = new URLSearchParams();

    if (this.view === 'favorites') {
      params.set('favorites', 'true');
    }

    if (this.searchTerm) {
      params.set('search', this.searchTerm);
    }

    url.search = params.toString();
    window.history.pushState({}, '', url);
  }

  _clearURL() {
    window.history.pushState({}, '', window.location.pathname);
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

  // Manejar búsqueda desde character-list
  _handleSearchChange(e) {
    this.searchTerm = e.detail;
    this._updateURL();
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

      <main class="main-content${this.view !== 'detail' ? ' home' : ''}">
        ${this.view === 'list'
          ? html`<character-list
              .customTitle=${''}
              .initialSearchTerm=${this.searchTerm}
              @character-selected=${this._handleCharacterSelect}
              @favorites-changed=${this._handleFavoritesChanged}
              @favorite-toggled=${this._handleFavoriteToggled}
              @search-change=${this._handleSearchChange}
              .resetSearchFlag=${this.resetSearchFlag}
            ></character-list>`
          : this.view === 'favorites'
            ? html`
                <character-list
                  .characters=${this.favorites}
                  .customTitle=${'Favorites'}
                  .initialSearchTerm=${this.searchTerm}
                  @character-selected=${this._handleCharacterSelect}
                  @favorites-changed=${this._handleFavoritesChanged}
                  @favorite-toggled=${this._handleFavoriteToggled}
                  @search-change=${this._handleSearchChange}
                ></character-list>
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
