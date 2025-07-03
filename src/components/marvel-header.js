import { LitElement, html } from 'lit';
import { marvelHeaderStyle } from './marvel-header-style';

export class MarvelHeader extends LitElement {
  static properties = {
    view: { type: String },
    favoritesCount: { type: Number },
  };

  static get styles() {
    return [marvelHeaderStyle];
  }

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
