import { LitElement, html } from 'lit';
import { characterCardStyle } from './character-card-style';
import '../common/favorite-button.js';

export class CharacterCard extends LitElement {
    static properties = {
        character: { type: Object },
    };

    static get styles() {
        return [characterCardStyle];
    }

    _handleClick() {
        this.dispatchEvent(
            new CustomEvent('character-click', {
                detail: this.character,
                bubbles: true,
                composed: true,
            })
        );
    }

    _handleFavoriteToggled() {
        // Emitir el evento para que character-list lo maneje
        this.dispatchEvent(
            new CustomEvent('toggle-favorite', {
                detail: this.character,
                bubbles: true,
                composed: true,
            })
        );
    }

    render() {
        if (!this.character) return html``;
        const imageUrl =
            this.character.thumbnail?.path &&
            this.character.thumbnail?.extension
                ? `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`
                : 'https://via.placeholder.com/300x300/ed1d24/ffffff?text=No+Image';
        return html`
            <div class="card" @click=${this._handleClick}>
                <div class="image-container">
                    <img
                        class="character-image"
                        src="${imageUrl}"
                        alt="${this.character.name}"
                        loading="lazy"
                    />
                </div>
                <div class="card-footer">
                    <span class="character-name"
                        >${this.character.name.toUpperCase()}</span
                    >
                    <favorite-button
                        .characterId=${this.character.id}
                        size="medium"
                        @favorite-toggled=${this._handleFavoriteToggled}
                    ></favorite-button>
                </div>
            </div>
        `;
    }
}

customElements.define('character-card', CharacterCard);
