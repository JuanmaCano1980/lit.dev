import { html } from 'lit';
import { VIEWS } from '../../constants/app-constants.js';

export class MarvelAppViews {
  static renderCharacterList(state, handlers) {
    return html`
      <character-list
        .customTitle=${state.customTitle || ''}
        .characters=${state.characters || null}
        .initialSearchTerm=${state.searchTerm}
        @character-selected=${handlers.characterSelect}
        @favorites-changed=${handlers.favoritesChanged}
        @favorite-toggled=${handlers.favoriteToggled}
        @search-change=${handlers.searchChange}
        .resetSearchFlag=${state.resetSearchFlag}
      ></character-list>
    `;
  }

  static renderCharacterDetail(state, handlers) {
    return html`
      <character-detail
        .character=${state.selectedCharacter}
        @back-to-list=${handlers.backToList}
        @favorites-changed=${handlers.detailFavoritesChanged}
        @favorite-toggled=${handlers.favoriteToggled}
      ></character-detail>
    `;
  }

  static renderMainContent(state, handlers) {
    if (state.isLoading) {
      return html`<marvel-spinner></marvel-spinner>`;
    }

    switch (state.view) {
      case VIEWS.LIST:
        return this.renderCharacterList(state, handlers);
      case VIEWS.FAVORITES:
        return this.renderCharacterList(
          { ...state, customTitle: 'Favorites', characters: state.favorites },
          handlers
        );
      case VIEWS.DETAIL:
        return this.renderCharacterDetail(state, handlers);
      default:
        return this.renderCharacterList(state, handlers);
    }
  }

  static renderHeader(state, handlers) {
    return html`
      <marvel-header
        @back-to-list=${handlers.backToList}
        @go-home=${handlers.goHome}
        @show-favorites=${handlers.showFavorites}
        .favoritesCount=${state.favoritesCount}
        .view=${state.view}
      ></marvel-header>
    `;
  }

  static render(state, handlers) {
    return html`
      ${this.renderHeader(state, handlers)}

      <main class="main-content${state.view !== VIEWS.DETAIL ? ' home' : ''}">
        ${this.renderMainContent(state, handlers)}
      </main>
    `;
  }
}
