import { api } from './api.js';

class CharactersService {
  async initialize() {
    const offset = 0;
    const response = await api.getCharacters({
      limit: 50,
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

  async search(query, limit = 20) {
    const response = await api.searchCharacters(query, { limit });
    return response.data.results;
  }
}

export const characters = new CharactersService();
