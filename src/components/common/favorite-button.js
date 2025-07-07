import { LitElement, html } from 'lit';
import { favoriteButtonStyle } from './favorite-button-style.js';

export class FavoriteButton extends LitElement {
  static properties = {
    character: { type: Object },
    characterId: { type: Number },
    isFavorite: { type: Boolean },
    size: { type: String }, // 'small', 'medium', 'large'
    isCardHovered: { type: Boolean },
  };

  static get styles() {
    return [favoriteButtonStyle];
  }

  constructor() {
    super();
    this.characterId = null;
    this.isFavorite = false;
    this.size = 'medium';
    this.isCardHovered = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateFavoriteState();
    this._setupCardHoverDetection();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeCardHoverDetection();
  }

  updated(changedProps) {
    if (changedProps.has('characterId')) {
      this._updateFavoriteState();
    }
  }

  _setupCardHoverDetection() {
    // Buscar la tarjeta padre
    const card = this.closest('.card');
    if (card) {
      card.addEventListener('mouseenter', this._onCardHover.bind(this));
      card.addEventListener('mouseleave', this._onCardLeave.bind(this));
    }
  }

  _removeCardHoverDetection() {
    const card = this.closest('.card');
    if (card) {
      card.removeEventListener('mouseenter', this._onCardHover.bind(this));
      card.removeEventListener('mouseleave', this._onCardLeave.bind(this));
    }
  }

  _onCardHover() {
    this.isCardHovered = true;
  }

  _onCardLeave() {
    this.isCardHovered = false;
  }

  _updateFavoriteState() {
    if (this.characterId !== null) {
      const favs = JSON.parse(localStorage.getItem('marvel-favorites') || '[]');
      this.isFavorite = favs.some((c) => c.id === this.characterId);
    }
  }

  _toggleFavorite(e) {
    e.stopPropagation();
    if (this.characterId === null || !this.character) return;

    // Animación de pop
    const icon = e.currentTarget.querySelector('.favorite-icon');
    if (icon) {
      icon.classList.remove('pop');
      void icon.offsetWidth; // Force reflow
      icon.classList.add('pop');
      icon.addEventListener(
        'animationend',
        () => {
          icon.classList.remove('pop');
        },
        { once: true }
      );
    }

    // Solo emitir evento, no modificar localStorage
    this.dispatchEvent(
      new CustomEvent('favorite-toggled', {
        detail: {
          characterId: this.characterId,
          isFavorite: !this.isFavorite,
          character: this.character,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (this.characterId === null) return html``;

    // Determinar qué imagen mostrar
    let imageSrc;
    if (this.isFavorite && this.isCardHovered) {
      imageSrc = '/heart_white.svg';
    } else if (this.isFavorite) {
      imageSrc = '/heart_on.svg';
    } else {
      imageSrc = '/heart_off.svg';
    }

    return html`
      <button
        class="favorite-btn${this.isFavorite ? ' filled' : ''} ${this.size}"
        title="${this.isFavorite
          ? 'Quitar de favoritos'
          : 'Agregar a favoritos'}"
        aria-label="${this.isFavorite
          ? 'Quitar de favoritos'
          : 'Agregar a favoritos'}"
        @click=${this._toggleFavorite}
      >
        <img class="favorite-icon" src="${imageSrc}" alt="favorite" />
      </button>
    `;
  }
}

customElements.define('favorite-button', FavoriteButton);
