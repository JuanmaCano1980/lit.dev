import { api } from './api.js';

class CharacterCache {
  constructor() {
    this.key = 'characters';
    this.expiryKey = 'characters_expiry';
    this.duration = 24 * 60 * 60 * 1000; // 24h
  }

  _isExpired() {
    const expiry = localStorage.getItem(this.expiryKey);
    return !expiry || Date.now() > parseInt(expiry);
  }

  _save(data) {
    const expiry = Date.now() + this.duration;
    localStorage.setItem(this.key, JSON.stringify(data));
    localStorage.setItem(this.expiryKey, expiry.toString());
  }

  _load() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }

  _clear() {
    localStorage.removeItem(this.key);
    localStorage.removeItem(this.expiryKey);
  }

  async get(options = {}, force = false) {
    // Usar caché si está disponible y no expirado
    if (!force) {
      const cached = this._load();
      if (cached && !this._isExpired()) {
        return cached;
      }
    }

    // Obtener desde API
    const result = await api.getCharacters(options);
    const data = {
      characters: result.data.results,
      metadata: {
        total: result.data.total,
        fetched: new Date().toISOString(),
      },
    };

    this._save(data);
    return data;
  }

  async search(name, limit = 50) {
    // Buscar en caché primero
    const cached = this._load();
    if (cached && !this._isExpired()) {
      const filtered = cached.characters
        .filter((char) => char.name.toLowerCase().includes(name.toLowerCase()))
        .slice(0, limit);

      if (filtered.length > 0) {
        return filtered;
      }
    }

    // Buscar en API
    const result = await api.searchCharacters(name, { limit });
    return result.data.results;
  }

  clear() {
    this._clear();
  }

  getStats() {
    const cached = this._load();
    return {
      hasData: !!cached,
      isExpired: this._isExpired(),
      count: cached?.characters?.length || 0,
      size: localStorage.getItem(this.key)?.length || 0,
    };
  }
}

export const cache = new CharacterCache();
