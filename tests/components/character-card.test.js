import { expect, fixture, html } from '@open-wc/testing';
import { test, describe, beforeEach } from 'vitest';
import '../../src/components/common/character-card.js';

describe('CharacterCard', () => {
  let element;
  const mockCharacter = {
    id: 1,
    name: 'Spider-Man',
    description: 'Friendly neighborhood Spider-Man',
    thumbnail: {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087',
      extension: 'jpg',
    },
    favorite: false,
  };

  beforeEach(async () => {
    element = await fixture(
      html`<character-card .character=${mockCharacter}></character-card>`
    );
  });

  test('should render correctly', () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
  });

  test('should display character name', () => {
    const nameElement = element.shadowRoot.querySelector('.character-name');
    expect(nameElement).to.exist;
    expect(nameElement.textContent.trim()).to.equal('SPIDER-MAN');
  });

  test('should display character image', () => {
    const img = element.shadowRoot.querySelector('.character-image');
    expect(img).to.exist;
    expect(img.alt).to.include('Spider-Man');
    expect(img.src).to.include(
      'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087'
    );
  });

  test('should render favorite button component', () => {
    const favoriteButton = element.shadowRoot.querySelector('favorite-button');
    expect(favoriteButton).to.exist;
  });

  test('should emit character-click event when card is clicked', async () => {
    let eventEmitted = false;
    element.addEventListener('character-click', () => {
      eventEmitted = true;
    });

    const card = element.shadowRoot.querySelector('.card');
    card.click();
    expect(eventEmitted).to.be.true;
  });

  test('should emit toggle-favorite event when favorite button is toggled', async () => {
    let eventEmitted = false;
    element.addEventListener('toggle-favorite', () => {
      eventEmitted = true;
    });

    const favoriteButton = element.shadowRoot.querySelector('favorite-button');
    favoriteButton.dispatchEvent(
      new CustomEvent('favorite-toggled', {
        detail: { characterId: 1, isFavorite: true },
        bubbles: true,
        composed: true,
      })
    );
    expect(eventEmitted).to.be.true;
  });

  test('should show loading spinner initially', () => {
    const spinner = element.shadowRoot.querySelector('marvel-spinner');
    expect(spinner).to.exist;
  });
});
