import { LitElement, html } from 'lit';
import { marvelHeaderStyle } from './marvel-header-style';
import './favorite-button.js';

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
            <img src="/heart_on.svg" alt="favorites" class="favorites-heart" />
            <span class="favorites-count">${this.favoritesCount || 0}</span>
          </span>
        </div>
      </header>
    `;
  }
}

customElements.define('marvel-header', MarvelHeader);
