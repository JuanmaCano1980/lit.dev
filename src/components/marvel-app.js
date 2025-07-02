import { LitElement, html, css } from 'lit';

export class MarvelApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      text-align: center;
      font-family: sans-serif;
    }
  `;

  render() {
    return html`
      <h1>¡Bienvenido a Marvel App!</h1>
      <p>El proyecto está funcionando correctamente.</p>
    `;
  }
}

customElements.define('marvel-app', MarvelApp);
