import { LitElement, html } from 'lit';
import { comicsSectionStyle } from './comics-section-style.js';
import {
  getMarvelImageUrl,
  handleImageError,
} from '../../utils/image-utils.js';
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
            No comics available for this character.
          </p>
        </section>
      `;
    }

    return html`
      <section class="comics-section">
        <h2 class="comics-title">COMICS</h2>
        <div class="comics-list">
          ${this.comics.map((comic, idx) => {
            return html`
              <div class="comic-card">
                <img
                  class="comic-cover"
                  src="${getMarvelImageUrl(comic.thumbnail, 'portrait_medium')}"
                  alt="${comic.title || comic.name || 'Comic cover'}"
                  @error=${handleImageError}
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
