import { LitElement, html } from 'lit';
import { characterDetailStyle } from './character-detail-style.js';
import './header-character-detail.js';
import './comics-section.js';
import { api } from '../../services/api.js';

export class CharacterDetail extends LitElement {
  static properties = {
    character: { type: Object },
    comics: { type: Array },
    loadingComics: { type: Boolean },
  };

  static get styles() {
    return [characterDetailStyle];
  }

  constructor() {
    super();
    this.comics = [];
    this.loadingComics = false;
  }

  render() {
    if (!this.character) {
      return html`<div class="no-character">
        <h2>No character selected</h2>
        <p>Select a character from the list to see their details</p>
      </div>`;
    }

    return html`
      <div class="character-detail-root">
        <header-character-detail
          .character=${this.character}
          @favorites-changed=${() =>
            this.dispatchEvent(
              new CustomEvent('favorites-changed', {
                bubbles: true,
                composed: true,
              })
            )}
        ></header-character-detail>
        <comics-section
          .comics=${this.comics}
          .loading=${this.loadingComics}
        ></comics-section>
      </div>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('character') && this.character) {
      // Only reload comics if the character ID actually changed
      const oldCharacter = changedProperties.get('character');
      if (!oldCharacter || oldCharacter.id !== this.character.id) {
        this._loadComicsFromAPI();
      }
    }
  }

  async _loadComicsFromAPI() {
    if (!this.character?.id) return;

    try {
      this.loadingComics = true;

      const response = await api.getCharacterComics(this.character.id, {
        limit: 20,
        orderBy: '-focDate', // Ordenar por fecha de enfoque (más recientes primero)
      });

      this.comics = response.data.results || [];
    } catch (error) {
      console.error('Error loading comics from API:', error);
      this.comics = [];
    } finally {
      this.loadingComics = false;
    }
  }
}

customElements.define('character-detail', CharacterDetail);
