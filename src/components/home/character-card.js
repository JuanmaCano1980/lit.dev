import { LitElement, html } from 'lit';
import { characterCardStyle } from './character-card-style';
import '../common/favorite-button.js';

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

  _handleFavoriteToggled() {
    // Emitir el evento para que character-list lo maneje
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

    // Construir URL de imagen con fallback local
    let imageUrl = '/placeholder.svg';

    if (this.character.thumbnail?.path && this.character.thumbnail?.extension) {
      const basePath = this.character.thumbnail.path;
      const extension = this.character.thumbnail.extension;

      // Verificar si es una imagen válida de Marvel
      if (
        basePath.includes('image_not_available') ||
        basePath.includes('4c002e0300000') ||
        basePath.includes('f002')
      ) {
        imageUrl = '/placeholder.svg';
      } else {
        // Usar imagen de Marvel con tamaño estándar
        imageUrl = `${basePath}/standard_large.${extension}`;
      }
    }

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
            size="medium"
            @favorite-toggled=${this._handleFavoriteToggled}
          ></favorite-button>
        </div>
      </div>
    `;
  }

  _handleImageError(e) {
    // Fallback a placeholder local si la imagen falla
    this.imageError = true;
    this.imageLoaded = true; // Para que se muestre el placeholder
    e.target.src = '/placeholder.svg';
  }

  _handleImageLoad() {
    this.imageLoaded = true;
  }
}

customElements.define('character-card', CharacterCard);
