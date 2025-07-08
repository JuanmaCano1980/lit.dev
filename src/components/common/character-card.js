import { LitElement, html } from 'lit';
import { characterCardStyle } from './character-card-style.js';
import './favorite-button.js';
import {
  getMarvelImageUrl,
  handleImageError,
} from '../../utils/image-utils.js';

export class CharacterCard extends LitElement {
  static properties = {
    character: { type: Object },
    imageLoaded: { type: Boolean },
    imageError: { type: Boolean },
  };

  static get styles() {
    return [characterCardStyle];
  }

  constructor() {
    super();
    this.imageLoaded = false;
    this.imageError = false;
  }

  _handleClick() {
    this.dispatchEvent(
      new CustomEvent('character-click', {
        detail: this.character,
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleFavoriteToggled(e) {
    // Emit event to character-list to handle it
    this.dispatchEvent(
      new CustomEvent('toggle-favorite', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleImageError(e) {
    // Fallback to local placeholder if image fails
    this.imageError = true;
    this.imageLoaded = true; // To show the placeholder
    handleImageError(e);
  }

  _handleImageLoad() {
    this.imageLoaded = true;
  }

  render() {
    if (!this.character) return html``;

    // Build image URL using utility function
    const imageUrl = getMarvelImageUrl(this.character.thumbnail);

    return html`
      <div class="card" @click=${this._handleClick}>
        <div class="image-container">
          ${!this.imageLoaded
            ? html`
                <div class="image-loading">
                  <div class="loading-spinner"></div>
                </div>
              `
            : ''}
          <img
            class="character-image"
            src="${imageUrl}"
            alt="${this.character.name}"
            loading="lazy"
            data-loaded="${this.imageLoaded}"
            @error=${this._handleImageError}
            @load=${this._handleImageLoad}
          />
        </div>
        <div class="card-footer">
          <span class="character-name"
            >${this.character.name.toUpperCase()}</span
          >
          <favorite-button
            .characterId=${this.character.id}
            .character=${this.character}
            .isFavorite=${this.character.favorite || false}
            size="medium"
            @favorite-toggled=${this._handleFavoriteToggled}
          ></favorite-button>
        </div>
      </div>
    `;
  }
}

customElements.define('character-card', CharacterCard);
