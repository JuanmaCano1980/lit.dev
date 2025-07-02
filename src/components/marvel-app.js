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

    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .main-content {
      padding: 2rem 0;
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
      <div class="app-container">
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
      </div>
    `;
  }
}

customElements.define('marvel-app', MarvelApp);
