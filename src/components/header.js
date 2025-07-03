import { LitElement, html, css } from 'lit';

export class MarvelHeader extends LitElement {
  static properties = {
    view: { type: String },
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
    }
    .logo {
      display: flex;
      align-items: center;
      width: 130px;
      height: auto;
      flex-shrink: 0;
    }
    .logo-img {
      height: auto;
      width: 100%;
      display: block;
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

  render() {
    return html`
      <header class="header-container">
        <div class="logo">
          <img src="/marvel.svg" alt="Marvel Logo" class="logo-img" />
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
