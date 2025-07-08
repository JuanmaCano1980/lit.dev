import { LitElement, html } from 'lit';
import { marvelSpinnerStyle } from './marvel-spinner-style.js';

export class MarvelSpinner extends LitElement {
  static properties = {
    size: { type: String }, // 'small', 'medium', 'large'
  };

  static get styles() {
    return [marvelSpinnerStyle];
  }

  constructor() {
    super();
    this.size = 'medium';
  }

  render() {
    return html`<div class="spinner ${this.size}"></div>`;
  }
}

customElements.define('marvel-spinner', MarvelSpinner);
