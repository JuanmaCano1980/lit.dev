import { LitElement, html } from 'lit';
import { characterCardStyle } from './character-card-style';

export class CharacterCard extends LitElement {
  static properties = {
    character: { type: Object },
  };

  static get styles() {
    return [characterCardStyle];
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

  _handleFavoriteClick(e) {
    e.stopPropagation();
    const icon = e.currentTarget.querySelector('.favorite-icon');
    if (icon) {
      icon.classList.remove('pop');
      void icon.offsetWidth;
      icon.classList.add('pop');
      icon.addEventListener(
        'animationend',
        () => {
          icon.classList.remove('pop');
        },
        { once: true }
      );
    }
    this.dispatchEvent(
      new CustomEvent('toggle-favorite', {
        detail: this.character,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this.character) return html``;
    const imageUrl =
      this.character.thumbnail?.path && this.character.thumbnail?.extension
        ? `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`
        : 'https://via.placeholder.com/300x300/ed1d24/ffffff?text=No+Image';
    return html`
      <div class="card" @click=${this._handleClick}>
        <div class="image-container">
          <img
            class="character-image"
            src="${imageUrl}"
            alt="${this.character.name}"
            loading="lazy"
          />
        </div>
        <div class="card-footer">
          <div class="divider"></div>
          <span class="character-name"
            >${this.character.name.toUpperCase()}</span
          >
          <button
            class="favorite-btn${this.character.favorite ? ' filled' : ''}"
            title="Favorito"
            @click=${this._handleFavoriteClick}
          >
            ${this.character.favorite
              ? html`<svg class="favorite-icon" viewBox="0 0 24 24">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>`
              : html`<svg class="favorite-icon" viewBox="0 0 24 24">
                  <path
                    d="M16.5 3c-1.74 0-3.41 0.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04 1.04 3.57 2.36h1.87C13.46 6.04 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                  />
                </svg>`}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('character-card', CharacterCard);
