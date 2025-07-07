import { api } from './api.js';
import { API_CONFIG, CACHE_CONFIG } from '../constants/app-constants.js';

class CharactersService {
  constructor() {
    this._charactersCache = null;
    this._cacheTimestamp = null;
    this._cacheExpiryTime = CACHE_CONFIG.CHARACTERS_EXPIRY_MS;
  }

  _isCacheValid() {
    if (!this._charactersCache || !this._cacheTimestamp) {
      return false;
    }

    const now = Date.now();
    const cacheAge = now - this._cacheTimestamp;
    return cacheAge < this._cacheExpiryTime;
  }

  _clearCache() {
    this._charactersCache = null;
    this._cacheTimestamp = null;
  }

  async initialize() {
    // Verify if we have a valid cache
    if (this._isCacheValid()) {
      return this._charactersCache;
    }

    const offset = 0;
    const response = await api.getCharacters({
      limit: API_CONFIG.DEFAULT_LIMIT,
      offset: offset,
    });

    const data = {
      characters: response.data.results,
      metadata: {
        total: response.data.total,
        fetched: new Date().toISOString(),
        offset: offset,
      },
    };

    // Save to cache
    this._charactersCache = data;
    this._cacheTimestamp = Date.now();

    return data;
  }

  async getCharacters() {
    return this.initialize();
  }

  async search(query, limit = API_CONFIG.SEARCH_LIMIT) {
    const response = await api.searchCharacters(query, { limit });
    return response.data.results;
  }

  clearCache() {
    this._clearCache();
  }

  getCacheInfo() {
    if (!this._charactersCache || !this._cacheTimestamp) {
      return { hasCache: false };
    }

    const now = Date.now();
    const cacheAge = now - this._cacheTimestamp;
    const isValid = cacheAge < this._cacheExpiryTime;

    return {
      hasCache: true,
      isValid,
      cacheAge: Math.round(cacheAge / 1000), // en segundos
      expiryTime: Math.round(this._cacheExpiryTime / 1000), // en segundos
      charactersCount: this._charactersCache.characters.length,
    };
  }
}

export const characters = new CharactersService();
