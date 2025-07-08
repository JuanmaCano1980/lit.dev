import { STORAGE_KEYS } from '../constants/app-constants.js';

/**
 * StorageManager - Centralizes all localStorage operations
 * Eliminates duplication and provides a consistent API
 */
class StorageManager {
  constructor() {
    this._favoritesCache = null;
    this._cacheTimestamp = null;
    this._cacheExpiryMs = 1000; // 1 second cache
  }

  /**
   * Gets favorites from localStorage with cache
   * @returns {Array} Array of favorite characters
   */
  getFavorites() {
    // Check cache
    if (this._isCacheValid()) {
      return this._favoritesCache;
    }

    try {
      const favorites = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]'
      );

      // Update cache
      this._favoritesCache = favorites;
      this._cacheTimestamp = Date.now();

      return favorites;
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return [];
    }
  }

  /**
   * Saves favorites to localStorage
   * @param {Array} favorites - Array of favorite characters
   */
  setFavorites(favorites) {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));

      // Update cache
      this._favoritesCache = favorites;
      this._cacheTimestamp = Date.now();
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }

  /**
   * Checks if a character is favorite
   * @param {number} characterId - Character ID
   * @returns {boolean} True if favorite
   */
  isFavorite(characterId) {
    const favorites = this.getFavorites();
    return favorites.some((character) => character.id === characterId);
  }

  /**
   * Adds a character to favorites
   * @param {Object} character - Character to add
   * @returns {boolean} True if added, false if already existed
   */
  addFavorite(character) {
    const favorites = this.getFavorites();

    // Check if already exists
    if (favorites.some((c) => c.id === character.id)) {
      return false;
    }

    // Add character
    favorites.push(character);
    this.setFavorites(favorites);
    return true;
  }

  /**
   * Removes a character from favorites
   * @param {number} characterId - Character ID
   * @returns {boolean} True if removed, false if not found
   */
  removeFavorite(characterId) {
    const favorites = this.getFavorites();
    const initialLength = favorites.length;

    const filteredFavorites = favorites.filter((c) => c.id !== characterId);

    if (filteredFavorites.length === initialLength) {
      return false; // Character not found
    }

    this.setFavorites(filteredFavorites);
    return true;
  }

  /**
   * Toggles favorite state of a character
   * @param {Object} character - Character to toggle
   * @returns {boolean} New favorite state
   */
  toggleFavorite(character) {
    const isCurrentlyFavorite = this.isFavorite(character.id);

    if (isCurrentlyFavorite) {
      this.removeFavorite(character.id);
      return false;
    } else {
      this.addFavorite(character);
      return true;
    }
  }

  /**
   * Adds favorite state to an array of characters
   * @param {Array} characters - Array of characters
   * @returns {Array} Array of characters with favorite state
   */
  addFavoriteStateToCharacters(characters) {
    const favorites = this.getFavorites();

    return characters.map((character) => ({
      ...character,
      favorite: favorites.some((fav) => fav.id === character.id),
    }));
  }

  /**
   * Gets favorites count
   * @returns {number} Number of favorites
   */
  getFavoritesCount() {
    return this.getFavorites().length;
  }

  /**
   * Clears internal cache
   */
  clearCache() {
    this._favoritesCache = null;
    this._cacheTimestamp = null;
  }

  /**
   * Checks if cache is valid
   * @returns {boolean} True if cache is valid
   */
  _isCacheValid() {
    if (!this._favoritesCache || !this._cacheTimestamp) {
      return false;
    }

    const now = Date.now();
    const cacheAge = now - this._cacheTimestamp;
    return cacheAge < this._cacheExpiryMs;
  }
}

// Export singleton instance
export const storageManager = new StorageManager();
