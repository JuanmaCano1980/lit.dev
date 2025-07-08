import { LitElement } from 'lit';
import './marvel-header.js';
import './character-list.js';
import '../character-detail/character-detail.js';
import '../common/marvel-spinner.js';
import { marvelAppStyle } from './marvel-app-style';
import { MarvelAppController } from './marvel-app-controller.js';
import { MarvelAppViews } from './marvel-app-views.js';

export class MarvelApp extends LitElement {
  static properties = {
    selectedCharacter: { type: Object },
    view: { type: String },
    favoritesCount: { type: Number },
    favorites: { type: Array },
    resetSearchFlag: { type: Boolean },
    searchTerm: { type: String },
    isLoading: { type: Boolean },
  };

  static get styles() {
    return [marvelAppStyle];
  }

  constructor() {
    super();
    this.controller = new MarvelAppController();
    this._syncState();
  }

  _syncState() {
    const state = this.controller.getState();
    Object.assign(this, state);
  }

  _updateState() {
    const state = this.controller.getState();
    Object.assign(this, state);
    this.requestUpdate();
  }

  // Event handlers
  _handleFavoriteToggled(e) {
    const { character, isFavorite } = e.detail;
    this.controller.handleFavoriteToggled(character, isFavorite);
    this.controller.updateURL();
    this._updateState();
  }

  _handleCharacterSelect(e) {
    this.controller.handleCharacterSelect(e.detail);
    this.controller.updateURL();
    this._updateState();
  }

  _handleBackToList() {
    this.controller.handleBackToList();
    this.controller.clearURL();
    this._updateState();
  }

  _handleGoHome() {
    this.controller.handleGoHome();
    this.controller.clearURL();
    this._updateState();

    // Clear search and reload characters in character-list
    const characterList = this.renderRoot?.querySelector('character-list');
    if (characterList && typeof characterList._handleGoHome === 'function') {
      characterList._handleGoHome();
    }
  }

  _handleShowFavorites() {
    this.controller.handleShowFavorites();
    this.controller.updateURL();
    this._updateState();
  }

  _handleSearchChange(e) {
    this.controller.handleSearchChange(e.detail);
    this.controller.updateURL();
    this._updateState();
  }

  _handleFavoritesChanged() {
    this.controller._updateFavoritesCount();
    this._updateState();
  }

  _handleDetailFavoritesChanged() {
    this.controller._updateFavoritesCount();
    this._updateState();
  }

  // Lifecycle methods
  async connectedCallback() {
    super.connectedCallback();

    window.addEventListener('storage', () => {
      this.controller._updateFavoritesCount();
      this._updateState();
    });

    this.addEventListener('favorite-toggled', () => {
      this.controller._updateFavoritesCount();
      this._updateState();
    });

    await this.controller.handleQueryParams();
    this._updateState();
  }

  disconnectedCallback() {
    window.removeEventListener('storage', this._updateState.bind(this));
    this.removeEventListener('favorite-toggled', this._updateState.bind(this));
    super.disconnectedCallback();
  }

  // Render
  render() {
    const state = this.controller.getState();
    const handlers = {
      characterSelect: this._handleCharacterSelect.bind(this),
      favoritesChanged: this._handleFavoritesChanged.bind(this),
      favoriteToggled: this._handleFavoriteToggled.bind(this),
      searchChange: this._handleSearchChange.bind(this),
      backToList: this._handleBackToList.bind(this),
      goHome: this._handleGoHome.bind(this),
      showFavorites: this._handleShowFavorites.bind(this),
      detailFavoritesChanged: this._handleDetailFavoritesChanged.bind(this),
    };

    return MarvelAppViews.render(state, handlers);
  }
}

customElements.define('marvel-app', MarvelApp);
