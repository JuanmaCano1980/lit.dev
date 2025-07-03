import { LitElement, html } from 'lit';
import { characterDetailStyle } from './character-detail-style';

export class CharacterDetail extends LitElement {
  static properties = {
    character: { type: Object },
  };

  static get styles() {
    return [characterDetailStyle];
  }

  _handleBackClick() {
    this.dispatchEvent(new CustomEvent('back-to-list'));
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

    return html`
      <div class="detail-container">
        <div class="hero-section">
          <div class="hero-content">
            <h1 class="hero-name">${this.character.name}</h1>
            <p class="hero-subtitle">Superhéroe del Universo Marvel</p>
          </div>
        </div>

        <div class="content-section">
          <div class="character-layout">
            <div class="image-section">
              <img
                class="character-image"
                src="${imageUrl}"
                alt="${this.character.name}"
              />
            </div>

            <div class="info-section">
              <div>
                <h2
                  style="font-size: 1.5rem; color: #1f2937; margin-bottom: 1rem; font-weight: 700;"
                >
                  Biografía
                </h2>
                <p class="description">
                  ${this.character.description ||
                  'Este personaje no tiene descripción disponible en este momento.'}
                </p>
              </div>

              <div class="stats-section">
                <h3 class="stats-title">Estadísticas</h3>
                <div class="stats-grid">
                  <div class="stat-card">
                    <span class="stat-number"
                      >${this.character.comics?.available || 0}</span
                    >
                    <span class="stat-label">Comics</span>
                  </div>
                  <div class="stat-card">
                    <span class="stat-number"
                      >${this.character.series?.available || 0}</span
                    >
                    <span class="stat-label">Series</span>
                  </div>
                  <div class="stat-card">
                    <span class="stat-number"
                      >${this.character.stories?.available || 0}</span
                    >
                    <span class="stat-label">Historias</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="actions-section">
            <button class="back-button" @click=${this._handleBackClick}>
              ← Volver a la Lista
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('character-detail', CharacterDetail);
