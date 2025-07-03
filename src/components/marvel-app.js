import { LitElement, html, css } from 'lit';
import './header.js';
import './character-list.js';
import './character-detail.js';

export class MarvelApp extends LitElement {
  static properties = {
    selectedCharacter: { type: Object },
    view: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .main-content {
      padding: 3rem;
    }
  `;

  constructor() {
    super();
    this.selectedCharacter = null;
    this.view = 'list'; // 'list' o 'detail'
  }

  _handleCharacterSelect(e) {
    this.selectedCharacter = e.detail;
    this.view = 'detail';
  }

  _handleBackToList() {
    this.view = 'list';
    this.selectedCharacter = null;
  }

  render() {
    return html`
      <marvel-header
        @back-to-list=${this._handleBackToList}
        .view=${this.view}
      ></marvel-header>

      <main class="main-content">
        ${this.view === 'list'
          ? html`<character-list
              @character-selected=${this._handleCharacterSelect}
            ></character-list>`
          : html`<character-detail
              .character=${this.selectedCharacter}
              @back-to-list=${this._handleBackToList}
            ></character-detail>`}
      </main>
    `;
  }
}

customElements.define('marvel-app', MarvelApp);
