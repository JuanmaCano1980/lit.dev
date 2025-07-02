import { LitElement, html, css } from 'lit';

export class CharacterCard extends LitElement {
  static properties = {
    character: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      cursor: pointer;
    }

    .card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .image-container {
      position: relative;
      height: 300px;
      overflow: hidden;
    }

    .character-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .card:hover .character-image {
      transform: scale(1.05);
    }

    .content {
      padding: 1.5rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .character-name {
      font-size: 1.25rem;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 0.5rem;
      line-height: 1.2;
    }

    .character-description {
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.5;
      margin-bottom: 1rem;
      flex-grow: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .stats {
      display: flex;
      gap: 1rem;
      margin-top: auto;
    }

    .stat {
      text-align: center;
      flex: 1;
    }

    .stat-number {
      font-size: 1.125rem;
      font-weight: bold;
      color: #ed1d24;
      display: block;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `;

  _handleClick() {
    this.dispatchEvent(
      new CustomEvent('character-click', {
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
        : 'https://via.placeholder.com/300x450/ed1d24/ffffff?text=No+Image';

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

        <div class="content">
          <h3 class="character-name">${this.character.name}</h3>

          <p class="character-description">
            ${this.character.description || 'Sin descripción disponible.'}
          </p>

          <div class="stats">
            <div class="stat">
              <span class="stat-number"
                >${this.character.comics?.available || 0}</span
              >
              <span class="stat-label">Comics</span>
            </div>
            <div class="stat">
              <span class="stat-number"
                >${this.character.series?.available || 0}</span
              >
              <span class="stat-label">Series</span>
            </div>
            <div class="stat">
              <span class="stat-number"
                >${this.character.stories?.available || 0}</span
              >
              <span class="stat-label">Historias</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('character-card', CharacterCard);
