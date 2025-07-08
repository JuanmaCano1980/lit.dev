import { VIEWS, URL_PARAMS } from '../../constants/app-constants.js';
import { storageManager } from '../../utils/storage-utils.js';

export class MarvelAppController {
  constructor() {
    this.state = {
      selectedCharacter: null,
      view: VIEWS.LIST,
      favoritesCount: 0,
      favorites: [],
      resetSearchFlag: false,
      searchTerm: '',
      isLoading: true,
    };

    this._loadFavorites();
    this._updateFavoritesCount();
  }

  getState() {
    return { ...this.state };
  }

  updateState(newState) {
    this.state = { ...this.state, ...newState };
    return this.state;
  }

  _loadFavorites() {
    const favorites = storageManager.getFavorites();
    this.state.favorites = favorites.map((character) => ({
      ...character,
      favorite: true,
    }));
  }

  _updateFavoritesCount() {
    this.state.favoritesCount = storageManager.getFavoritesCount();
  }

  handleFavoriteToggled(character, isFavorite) {
    if (isFavorite) {
      storageManager.addFavorite(character);
    } else {
      storageManager.removeFavorite(character.id);
    }

    this._loadFavorites();
    this._updateFavoritesCount();

    // Update selectedCharacter if we're in detail view
    if (
      this.state.selectedCharacter &&
      this.state.selectedCharacter.id === character.id
    ) {
      this.state.selectedCharacter = {
        ...this.state.selectedCharacter,
        favorite: isFavorite,
      };
    }

    return this.state;
  }

  handleCharacterSelect(character) {
    this.state.selectedCharacter = {
      ...character,
      favorite: storageManager.isFavorite(character.id),
    };
    this.state.view = VIEWS.DETAIL;
    return this.state;
  }

  handleBackToList() {
    this.state.view = VIEWS.LIST;
    this.state.selectedCharacter = null;
    return this.state;
  }

  handleGoHome() {
    this.state.view = VIEWS.LIST;
    this.state.selectedCharacter = null;
    this.state.searchTerm = '';
    this.state.resetSearchFlag = !this.state.resetSearchFlag;
    return this.state;
  }

  handleShowFavorites() {
    const favorites = storageManager.getFavorites();
    this.state.favorites = favorites.map((character) => ({
      ...character,
      favorite: true,
    }));
    this.state.view = VIEWS.FAVORITES;
    return this.state;
  }

  handleSearchChange(searchTerm) {
    this.state.searchTerm = searchTerm;
    return this.state;
  }

  async handleQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get(URL_PARAMS.SEARCH);
    const favorites = urlParams.get(URL_PARAMS.FAVORITES);
    const characterId = urlParams.get(URL_PARAMS.CHARACTER_ID);

    if (favorites === 'true') {
      this.handleShowFavorites();
    }

    if (search) {
      this.state.searchTerm = search;
    }

    if (characterId) {
      await this._handleDirectCharacterDetail(characterId);
    }

    this.state.isLoading = false;
    return this.state;
  }

  async _handleDirectCharacterDetail(characterId) {
    try {
      const favorites = storageManager.getFavorites();
      const favoriteCharacter = favorites.find(
        (c) => c.id.toString() === characterId
      );

      if (favoriteCharacter) {
        this.state.selectedCharacter = {
          ...favoriteCharacter,
          favorite: true,
        };
        this.state.view = VIEWS.DETAIL;
        return;
      }

      const { api } = await import('../../services/api.js');
      const response = await api.getCharacter(characterId);

      if (response.data.results && response.data.results.length > 0) {
        const character = response.data.results[0];
        const isFavorite = storageManager.isFavorite(character.id);

        this.state.selectedCharacter = {
          ...character,
          favorite: isFavorite,
        };
        this.state.view = VIEWS.DETAIL;
      } else {
        this.state.view = VIEWS.LIST;
      }
    } catch (error) {
      console.error('Error loading character from URL params:', error);
      this.state.view = VIEWS.LIST;
    }
  }

  updateURL() {
    const url = new URL(window.location);
    const params = new URLSearchParams();

    if (this.state.view === VIEWS.FAVORITES) {
      params.set(URL_PARAMS.FAVORITES, 'true');
    }

    if (this.state.searchTerm) {
      params.set(URL_PARAMS.SEARCH, this.state.searchTerm);
    }

    if (this.state.view === VIEWS.DETAIL && this.state.selectedCharacter) {
      params.set(
        URL_PARAMS.CHARACTER_ID,
        this.state.selectedCharacter.id.toString()
      );
    }

    url.search = params.toString();
    window.history.pushState({}, '', url);
  }

  clearURL() {
    window.history.pushState({}, '', window.location.pathname);
  }
}
