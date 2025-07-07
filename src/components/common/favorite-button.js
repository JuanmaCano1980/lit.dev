import { LitElement, html } from 'lit';
import { favoriteButtonStyle } from './favorite-button-style.js';
import { STORAGE_KEYS } from '../../constants/app-constants.js';

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
    // Solo actualizar desde localStorage si no se pasa isFavorite como prop
    if (this.characterId !== null && this.isFavorite === undefined) {
      const favs = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]'
      );
      this.isFavorite = favs.some((c) => c.id === this.characterId);
    }
  }

  updated(changedProps) {
    if (changedProps.has('characterId')) {
      this._updateFavoriteState();
    }
    // Si se pasa isFavorite como prop, usarlo directamente
    if (changedProps.has('isFavorite') && this.isFavorite !== undefined) {
      // El estado ya está actualizado por la prop
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

    // Actualizar el estado local inmediatamente
    this.isFavorite = !this.isFavorite;

    // Emitir evento
    this.dispatchEvent(
      new CustomEvent('favorite-toggled', {
        detail: {
          characterId: this.characterId,
          isFavorite: this.isFavorite,
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
          ? 'Remove from favorites'
          : 'Add to favorites'}"
        aria-label="${this.isFavorite
          ? 'Remove from favorites'
          : 'Add to favorites'}"
        @click=${this._toggleFavorite}
      >
        <img class="favorite-icon" src="${imageSrc}" alt="favorite" />
      </button>
    `;
  }
}

customElements.define('favorite-button', FavoriteButton);
