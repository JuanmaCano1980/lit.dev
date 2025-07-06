/* global URLSearchParams, fetch */
import CryptoJS from 'crypto-js';

class MarvelAPI {
  constructor() {
    this.baseUrl =
      import.meta.env.VITE_MARVEL_BASE_URL ||
      'https://gateway.marvel.com/v1/public';
    this.publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
    this.privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
  }

  _generateAuth() {
    if (!this.publicKey || !this.privateKey) {
      throw new Error('API keys no configuradas');
    }

    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(
      timestamp + this.privateKey + this.publicKey
    ).toString();

    return { ts: timestamp, apikey: this.publicKey, hash };
  }

  async _request(endpoint, params = {}) {
    const auth = this._generateAuth();
    const url = `${this.baseUrl}${endpoint}?${new URLSearchParams({ ...auth, ...params })}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  async getCharacters(options = {}) {
    return this._request('/characters', options);
  }

  async searchCharacters(name, options = {}) {
    return this._request('/characters', { name, ...options });
  }

  async getCharacter(id) {
    return this._request(`/characters/${id}`);
  }
}

export const api = new MarvelAPI();
