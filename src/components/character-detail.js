import { LitElement, html } from 'lit';
import { characterDetailStyle } from './character-detail-style';
import './favorite-button.js';

export class CharacterDetail extends LitElement {
  static properties = {
    character: { type: Object },
  };

  static get styles() {
    return [characterDetailStyle];
  }

  _handleFavoriteToggled(e) {
    // Emitir evento para que marvel-app actualice el contador
    this.dispatchEvent(
      new CustomEvent('favorites-changed', { bubbles: true, composed: true })
    );
  }

  render() {
    if (!this.character) {
      return html`<div class="no-character">
        <h2>No se ha seleccionado ningún personaje</h2>
        <p>Selecciona un personaje de la lista para ver sus detalles</p>
      </div>`;
    }

    const imageUrl =
      this.character.thumbnail?.path && this.character.thumbnail?.extension
        ? `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`
        : 'https://via.placeholder.com/300x450/ed1d24/ffffff?text=No+Image';

    const comics = this.character.comics?.items || [];

    return html`
      <div class="character-detail-root">
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
        <section class="comics-section">
          <h2 class="comics-title">COMICS</h2>
          <div class="comics-list">
            ${comics.map(
              (comic, idx) => html`
                <div class="comic-card">
                  <img
                    class="comic-cover"
                    src="${comic.thumbnail}"
                    alt="Comic cover"
                  />
                  <div class="comic-info">
                    <div class="comic-title">
                      ${comic.name || 'Comic #' + (idx + 1)}
                    </div>
                    <div class="comic-year">${comic.year || ''}</div>
                  </div>
                </div>
              `
            )}
          </div>
        </section>
      </div>
    `;
  }
}

customElements.define('character-detail', CharacterDetail);
