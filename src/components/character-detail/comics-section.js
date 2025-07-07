/* global console */
import { LitElement, html } from 'lit';
import { comicsSectionStyle } from './comics-section-style.js';
import '../common/marvel-spinner.js';

export class ComicsSection extends LitElement {
  static properties = {
    comics: { type: Array },
    loading: { type: Boolean },
  };

  static get styles() {
    return [comicsSectionStyle];
  }

  constructor() {
    super();
    this.comics = [];
    this.loading = false;
  }

  render() {
    if (this.loading) {
      return html`
        <section class="comics-section">
          <h2 class="comics-title">COMICS</h2>
          <marvel-spinner></marvel-spinner>
        </section>
      `;
    }

    if (!this.comics || this.comics.length === 0) {
      return html`
        <section class="comics-section">
          <h2 class="comics-title">COMICS</h2>
          <p style="color: #888; text-align: center; padding: 2rem;">
            No hay cómics disponibles para este personaje.
          </p>
        </section>
      `;
    }

    return html`
      <section class="comics-section">
        <h2 class="comics-title">COMICS</h2>
        <div class="comics-list">
          ${this.comics.map((comic, idx) => {
            console.log('Renderizando cómic:', comic);
            return html`
              <div class="comic-card">
                <img
                  class="comic-cover"
                  src="${comic.thumbnail?.path && comic.thumbnail?.extension
                    ? `${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`
                    : '/placeholder.svg'}"
                  alt="${comic.title || comic.name || 'Comic cover'}"
                  @error=${(e) => {
                    console.log('Error cargando imagen:', e.target.src);
                    e.target.src = '/placeholder.svg';
                  }}
                  @load=${() =>
                    console.log('Imagen cargada:', comic.title || comic.name)}
                />
                <div class="comic-info">
                  <div class="comic-title">
                    ${comic.title || comic.name || 'Comic #' + (idx + 1)}
                  </div>
                  <div class="comic-year">
                    ${comic.dates?.find((d) => d.type === 'onsaleDate')?.date
                      ? new Date(
                          comic.dates.find((d) => d.type === 'onsaleDate').date
                        ).getFullYear()
                      : ''}
                  </div>
                </div>
              </div>
            `;
          })}
        </div>
      </section>
    `;
  }
}

customElements.define('comics-section', ComicsSection);
