import { LitElement, html } from 'lit';
import './marvel-header.js';
import './character-list.js';
import '../character-detail/character-detail.js';
import { marvelAppStyle } from './marvel-app-style';

export class MarvelApp extends LitElement {
    static properties = {
        selectedCharacter: { type: Object },
        view: { type: String },
        favoritesCount: { type: Number },
    };

    static get styles() {
        return [marvelAppStyle];
    }

    constructor() {
        super();
        this.selectedCharacter = null;
        this.view = 'list'; // 'list' o 'detail'
        this.favoritesCount = 0;
        this._updateFavoritesCount();
    }

    _updateFavoritesCount() {
        const favs = JSON.parse(
            localStorage.getItem('marvel-favorites') || '[]'
        );
        this.favoritesCount = favs.length;
    }

    _handleCharacterSelect(e) {
        this.selectedCharacter = e.detail;
        this.view = 'detail';
    }

    _handleBackToList() {
        this.view = 'list';
        this.selectedCharacter = null;
    }

    _handleGoHome() {
        this.view = 'list';
        this.selectedCharacter = null;
    }

    // Escuchar cambios en favoritos
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener(
            'storage',
            this._updateFavoritesCount.bind(this)
        );
        // Escuchar eventos de favorite-toggled desde cualquier lugar
        this.addEventListener(
            'favorite-toggled',
            this._updateFavoritesCount.bind(this)
        );
    }
    disconnectedCallback() {
        window.removeEventListener(
            'storage',
            this._updateFavoritesCount.bind(this)
        );
        this.removeEventListener(
            'favorite-toggled',
            this._updateFavoritesCount.bind(this)
        );
        super.disconnectedCallback();
    }

    // Recibir evento de favoritos desde character-list
    _handleFavoritesChanged() {
        this._updateFavoritesCount();
    }

    // Recibir evento de favoritos desde character-detail
    _handleDetailFavoritesChanged() {
        this._updateFavoritesCount();
    }

    render() {
        return html`
            <marvel-header
                @back-to-list=${this._handleBackToList}
                @go-home=${this._handleGoHome}
                .view=${this.view}
                .favoritesCount=${this.favoritesCount}
            ></marvel-header>

            <main class="main-content${this.view === 'list' ? ' home' : ''}">
                ${this.view === 'list'
                    ? html`<character-list
                          @character-selected=${this._handleCharacterSelect}
                          @favorites-changed=${this._handleFavoritesChanged}
                      ></character-list>`
                    : html`<character-detail
                          .character=${this.selectedCharacter}
                          @back-to-list=${this._handleBackToList}
                          @favorites-changed=${this
                              ._handleDetailFavoritesChanged}
                      ></character-detail>`}
            </main>
        `;
    }
}

customElements.define('marvel-app', MarvelApp);
