import { LitElement, html } from 'lit';
import { comicsSectionStyle } from './comics-section-style.js';

export class ComicsSection extends LitElement {
    static properties = {
        comics: { type: Array },
    };

    static get styles() {
        return [comicsSectionStyle];
    }

    constructor() {
        super();
        this.comics = [];
    }

    render() {
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
                    ${this.comics.map(
                        (comic, idx) => html`
                            <div class="comic-card">
                                <img
                                    class="comic-cover"
                                    src="${comic.thumbnail}"
                                    alt="Comic cover"
                                />
                                <div class="comic-info">
                                    <div class="comic-title">
                                        ${comic.name || 'Comic #' + (idx + 1)}
                                    </div>
                                    <div class="comic-year">
                                        ${comic.year || ''}
                                    </div>
                                </div>
                            </div>
                        `
                    )}
                </div>
            </section>
        `;
    }
}

customElements.define('comics-section', ComicsSection);
