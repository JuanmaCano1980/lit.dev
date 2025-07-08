import { LitElement, html } from 'lit';
import { headerCharacterDetailStyle } from './header-character-detail-style.js';
import '../common/favorite-button.js';
import { getMarvelImageUrl } from '../../utils/image-utils.js';

export class HeaderCharacterDetail extends LitElement {
  static properties = {
    character: { type: Object },
  };

  static get styles() {
    return [headerCharacterDetailStyle];
  }

  _handleFavoriteToggled() {
    // Emit event to handle in character-detail
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

    const imageUrl = getMarvelImageUrl(
      this.character.thumbnail,
      'portrait_uncanny'
    );

    return html`
      <section class="detail-full">
        <div class="detail-content">
          <div class="img-col">
            <img
              class="character-image-large"
              src="${imageUrl}"
              alt="${this.character.name}"
            />
          </div>
          <div class="info-col">
            <div class="character-name-row">
              <h1 class="character-name">${this.character.name}</h1>
              <div class="favorite-section">
                <favorite-button
                  .characterId=${this.character.id}
                  .character=${this.character}
                  .isFavorite=${this.character.favorite || false}
                  size="large"
                  @favorite-toggled=${this._handleFavoriteToggled}
                ></favorite-button>
              </div>
            </div>
            <p class="character-description">
              ${this.character.description ||
              'This character has no description available at the moment.'}
            </p>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('header-character-detail', HeaderCharacterDetail);
