import { LitElement, html, css } from 'lit';

export class CharacterCard extends LitElement {
  static properties = {
    character: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      cursor: pointer;
      user-select: none;
    }
    .card {
      background: transparent;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.2s;
      clip-path: polygon(
        0 0,
        100% 0,
        100% calc(100% - 12px),
        calc(100% - 12px) 100%,
        0 100%
      );
    }
    .card:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
    }
    .image-container {
      width: 100%;
      aspect-ratio: 1/1;
      background: #222;
      overflow: hidden;
    }
    .character-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.35s cubic-bezier(0.4, 0.2, 0.2, 1);
    }
    .card:hover .character-image {
      transform: scale(1.08);
    }
    .card-footer {
      background: #111;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.7em 1em 0.7em 1em;
      position: relative;
      min-height: 48px;
      transition: color 0.25s;
      overflow: hidden;
      z-index: 1;
    }
    .card-footer::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 0%;
      background: #e62429;
      z-index: 0;
      transition: height 0.35s cubic-bezier(0.4, 0.2, 0.2, 1);
    }
    .card:hover .card-footer::before {
      height: 100%;
    }
    .character-name {
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #fff;
      flex: 1;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      z-index: 1;
    }
    .favorite-btn {
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      margin-left: 0.5em;
      z-index: 2;
      display: flex;
      align-items: center;
      padding: 0;
      transition: transform 0.15s;
    }
    .favorite-btn:active {
      transform: scale(0.92);
    }
    .favorite-icon {
      width: 22px;
      height: 22px;
      display: block;
      fill: #fff;
      stroke: #fff;
      stroke-width: 1.5px;
      transition:
        fill 0.2s,
        stroke 0.2s;
    }
    .favorite-btn.filled .favorite-icon {
      fill: #ed1d24;
      stroke: #ed1d24;
    }
    .card:hover .favorite-btn.filled .favorite-icon {
      fill: #fff;
      stroke: #fff;
      stroke-width: 1.5px;
    }
    .favorite-icon.pop {
      animation: pop-fav 0.45s cubic-bezier(0.4, 1.4, 0.6, 1) both;
    }
    @keyframes pop-fav {
      0% {
        transform: scale(1);
        filter: drop-shadow(0 0 0 #fff) drop-shadow(0 0 0 #ed1d24);
      }
      30% {
        transform: scale(1.6);
        filter: drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #ed1d24);
      }
      60% {
        transform: scale(1.1);
        filter: drop-shadow(0 0 8px #fff) drop-shadow(0 0 4px #ed1d24);
      }
      100% {
        transform: scale(1);
        filter: drop-shadow(0 0 0 #fff) drop-shadow(0 0 0 #ed1d24);
      }
    }
    @media (max-width: 600px) {
      .card {
        width: 100%;
      }
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
