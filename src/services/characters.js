/* global console */
import { cache } from './cache.js';

class CharactersService {
  async initialize() {
    const stats = cache.getStats();

    if (stats.hasData && !stats.isExpired) {
      console.log(`✅ Caché disponible: ${stats.count} personajes`);
      return cache.get();
    }

    console.log('🌐 Cargando personajes desde API...');
    return cache.get({ limit: 50 }, true);
  }

  async getCharacters() {
    return cache.get();
  }

  async search(query, limit = 10) {
    return cache.search(query, limit);
  }
}

export const characters = new CharactersService();
