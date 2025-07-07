import { LitElement, html } from 'lit';
import { marvelSpinnerStyle } from './marvel-spinner-style.js';

export class MarvelSpinner extends LitElement {
  static get styles() {
    return [marvelSpinnerStyle];
  }

  render() {
    return html`<div class="spinner"></div>`;
  }
}

customElements.define('marvel-spinner', MarvelSpinner);
