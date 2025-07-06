import { LitElement, html } from 'lit';
import { headerCharacterDetailStyle } from './header-character-detail-style.js';
import '../common/favorite-button.js';

export class HeaderCharacterDetail extends LitElement {
  static properties = {
    character: { type: Object },
  };

  static get styles() {
    return [headerCharacterDetailStyle];
  }

  _handleFavoriteToggled() {
    // Emitir evento para que character-detail lo maneje
    this.dispatchEvent(
      new CustomEvent('favorites-changed', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this.character) {
      return html``;
    }

    const imageUrl =
      this.character.thumbnail?.path && this.character.thumbnail?.extension
        ? `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`
        : 'https://via.placeholder.com/300x450/ed1d24/ffffff?text=No+Image';

    return html`
      <section class="main-detail-full">
        <div class="main-detail-content">
          <div class="img-col">
            <img
              class="character-image-large"
              src="${imageUrl}"
              alt="${this.character.name}"
            />
          </div>
          <div class="info-col">
            <h1 class="character-name">${this.character.name}</h1>
            <p class="character-description">
              ${this.character.description ||
              'Este personaje no tiene descripción disponible en este momento.'}
            </p>
          </div>
          <div class="favorite-section">
            <favorite-button
              .characterId=${this.character.id}
              size="large"
              @favorite-toggled=${this._handleFavoriteToggled}
            ></favorite-button>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('header-character-detail', HeaderCharacterDetail);
