import { LitElement, html, css } from 'lit';

export class MarvelHeader extends LitElement {
  static properties = {
    view: { type: String },
    favoritesCount: { type: Number },
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      background: #000;
      color: #fff;
      /* position: sticky; top: 0; z-index: 20; */
    }
    .header-container {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 3rem;
      min-height: 84px;
      box-sizing: border-box;
      background: #000;
      position: relative;
      justify-content: space-between;
    }
    .logo {
      display: flex;
      align-items: center;
      width: 130px;
      height: auto;
      flex-shrink: 0;
      cursor: pointer;
    }
    .logo-img {
      height: auto;
      width: 100%;
      display: block;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 0.3em;
    }
    .favorites-info {
      display: flex;
      align-items: center;
      gap: 0.3em;
      font-family: 'Roboto Condensed', Arial, sans-serif;
      font-size: 1.2rem;
      color: #fff;
      font-weight: 400;
      letter-spacing: 0.04em;
      margin-top: 0.2em;
    }
    .favorites-heart {
      width: 24px;
      height: 24px;
      display: block;
      margin-right: 0.1em;
    }
    .favorites-count {
      min-width: 1.2em;
      text-align: left;
      font-size: 1.1rem;
      color: #fff;
    }
    .back-btn {
      background: none;
      border: none;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin-right: 8px;
      cursor: pointer;
      height: 32px;
      width: 32px;
      border-radius: 50%;
      transition: background 0.2s;
    }
    .back-btn:hover {
      background: rgba(255, 255, 255, 0.08);
    }
    .arrow {
      font-size: 1.6rem;
      line-height: 1;
      display: block;
      margin: 0 auto;
    }
    .title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #fff;
      opacity: 0.85;
      letter-spacing: 0.04em;
      margin-left: 0;
      /* Siempre alineado a la izquierda */
    }
    @media (max-width: 600px) {
      .header-container {
        padding: 0 12px;
        min-height: 48px;
        gap: 12px;
      }
      .logo {
        height: 24px;
        margin-right: 8px;
      }
      .logo-img {
        height: 24px;
      }
      .favorites-info {
        font-size: 1rem;
      }
      .favorites-heart {
        width: 20px;
        height: 20px;
      }
      .back-btn {
        height: 28px;
        width: 28px;
      }
      .title {
        font-size: 0.98rem;
      }
    }
  `;

  _handleBackClick() {
    this.dispatchEvent(new CustomEvent('back-to-list'));
  }

  _handleLogoClick() {
    this.dispatchEvent(
      new CustomEvent('go-home', { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <header class="header-container">
        <div class="logo" @click=${() => this._handleLogoClick()}>
          <img src="/marvel.svg" alt="Marvel Logo" class="logo-img" />
        </div>
        <div class="header-right">
          <span class="favorites-info">
            <svg
              class="favorites-heart"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#e62429"
              stroke="none"
            >
              <path
                d="M16.5 3c-1.74 0-3.41 0.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"
              />
            </svg>
            <span class="favorites-count">${this.favoritesCount || 0}</span>
          </span>
        </div>
        ${this.view === 'detail'
          ? html`
              <button
                class="back-btn"
                @click=${this._handleBackClick}
                title="Volver"
              >
                <span class="arrow">&#8592;</span>
              </button>
              <span class="title">Detalle del Personaje</span>
            `
          : html``}
      </header>
    `;
  }
}

customElements.define('marvel-header', MarvelHeader);
