import { api } from './api.js';
import { API_CONFIG } from '../constants/app-constants.js';

class CharactersService {
  async initialize() {
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

    return data;
  }

  async getCharacters() {
    return this.initialize();
  }

  async search(query, limit = API_CONFIG.SEARCH_LIMIT) {
    const response = await api.searchCharacters(query, { limit });
    return response.data.results;
  }
}

export const characters = new CharactersService();
