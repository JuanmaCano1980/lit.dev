import { LitElement, html } from 'lit';
import { characterGridStyle } from './character-grid-style.js';
import './character-card.js';

export class CharacterGrid extends LitElement {
  static properties = {
    characters: { type: Array },
  };

  static get styles() {
    return [characterGridStyle];
  }

  constructor() {
    super();
    this.characters = [];
  }

  _handleCharacterClick(character) {
    this.dispatchEvent(
      new CustomEvent('character-click', {
        detail: character,
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleToggleFavorite(e) {
    this.dispatchEvent(
      new CustomEvent('toggle-favorite', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="characters-grid">
        ${this.characters.map(
          (character) => html`
            <character-card
              .character=${character}
              @character-click=${() => this._handleCharacterClick(character)}
              @toggle-favorite=${this._handleToggleFavorite}
            ></character-card>
          `
        )}
      </div>
    `;
  }
}

customElements.define('character-grid', CharacterGrid);
