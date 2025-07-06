import { LitElement, html } from 'lit';
import { characterDetailStyle } from './character-detail-style.js';
import './header-character-detail.js';
import './comics-section.js';

export class CharacterDetail extends LitElement {
  static properties = {
    character: { type: Object },
  };

  static get styles() {
    return [characterDetailStyle];
  }

  render() {
    if (!this.character) {
      return html`<div class="no-character">
        <h2>No se ha seleccionado ningún personaje</h2>
        <p>Selecciona un personaje de la lista para ver sus detalles</p>
      </div>`;
    }

    const comics = this.character.comics?.items || [];

    return html`
      <div class="character-detail-root">
        <header-character-detail
          .character=${this.character}
          @favorites-changed=${() =>
            this.dispatchEvent(
              new CustomEvent('favorites-changed', {
                bubbles: true,
                composed: true,
              })
            )}
        ></header-character-detail>
        <comics-section .comics=${comics}></comics-section>
      </div>
    `;
  }
}

customElements.define('character-detail', CharacterDetail);
