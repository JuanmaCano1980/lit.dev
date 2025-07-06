/* global console */
import { api } from './api.js';

class CharactersService {
  async initialize() {
    console.log('🌐 Cargando personajes desde API...');

    // Obtener personajes con offset aleatorio
    const offset = Math.floor(Math.random() * 1000);
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

    console.log(
      `✅ Cargados ${data.characters.length} personajes (offset: ${offset})`
    );
    return data;
  }

  async getCharacters() {
    return this.initialize();
  }

  async search(query, limit = 20) {
    console.log(`🔍 Buscando: "${query}"`);
    const response = await api.searchCharacters(query, { limit });
    return response.data.results;
  }
}

export const characters = new CharactersService();
