import { LitElement, html, css } from 'lit';

export class CharacterDetail extends LitElement {
  static properties = {
    character: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
    }

    .detail-container {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      margin: 2rem 0;
    }

    .hero-section {
      position: relative;
      height: 300px;
      background: linear-gradient(135deg, #ed1d24 0%, #b91c1c 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      overflow: hidden;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.3;
    }

    .hero-content {
      text-align: center;
      z-index: 2;
      position: relative;
    }

    .hero-name {
      font-size: 3.5rem;
      font-weight: 900;
      margin-bottom: 0.5rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      letter-spacing: -0.02em;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      opacity: 0.9;
      font-weight: 300;
    }

    .content-section {
      padding: 3rem;
    }

    .character-layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 3rem;
      align-items: start;
      margin-bottom: 3rem;
    }

    .image-section {
      text-align: center;
    }

    .character-image {
      width: 100%;
      max-width: 300px;
      height: 450px;
      object-fit: cover;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease;
    }

    .character-image:hover {
      transform: scale(1.02);
    }

    .info-section {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .description {
      font-size: 1.2rem;
      line-height: 1.8;
      color: #374151;
      margin: 0;
      font-weight: 400;
    }

    .stats-section {
      margin-top: 1rem;
    }

    .stats-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    .stat-card {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      padding: 2rem 1.5rem;
      border-radius: 16px;
      text-align: center;
      border: 2px solid #e2e8f0;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #ed1d24, #b91c1c);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      border-color: #ed1d24;
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(237, 29, 36, 0.15);
    }

    .stat-card:hover::before {
      transform: scaleX(1);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 900;
      color: #ed1d24;
      display: block;
      margin-bottom: 0.5rem;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 600;
    }

    .actions-section {
      text-align: center;
      padding-top: 2rem;
      border-top: 2px solid #f1f5f9;
    }

    .back-button {
      background: linear-gradient(135deg, #ed1d24 0%, #b91c1c 100%);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(237, 29, 36, 0.3);
    }

    .back-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(237, 29, 36, 0.4);
    }

    .back-button:active {
      transform: translateY(0);
    }

    .no-character {
      text-align: center;
      padding: 4rem 2rem;
      color: #64748b;
      font-size: 1.2rem;
      background: #f8fafc;
      border-radius: 16px;
      margin: 2rem 0;
    }

    @media (max-width: 1024px) {
      .character-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .image-section {
        order: -1;
      }

      .character-image {
        max-width: 250px;
        height: 375px;
      }
    }

    @media (max-width: 768px) {
      .hero-name {
        font-size: 2.5rem;
      }

      .content-section {
        padding: 2rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .stat-card {
        padding: 1.5rem;
      }

      .stat-number {
        font-size: 2rem;
      }

      .description {
        font-size: 1.1rem;
      }
    }

    @media (max-width: 480px) {
      .hero-section {
        height: 200px;
      }

      .hero-name {
        font-size: 2rem;
      }

      .content-section {
        padding: 1.5rem;
      }

      .character-image {
        max-width: 200px;
        height: 300px;
      }
    }
  `;

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
