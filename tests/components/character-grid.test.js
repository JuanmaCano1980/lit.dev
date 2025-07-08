import { expect, fixture, html } from '@open-wc/testing';
import { test, describe, beforeEach } from 'vitest';
import '../../src/components/common/character-grid.js';
import '../../src/components/common/character-card.js';

describe('CharacterGrid', () => {
  let element;
  const mockCharacters = [
    {
      id: 1,
      name: 'Spider-Man',
      thumbnail: { path: 'test', extension: 'jpg' },
      favorite: false,
    },
    {
      id: 2,
      name: 'Iron Man',
      thumbnail: { path: 'test2', extension: 'jpg' },
      favorite: true,
    },
  ];

  beforeEach(async () => {
    element = await fixture(html`<character-grid></character-grid>`);
  });

  test('should render correctly', () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
  });

  test('should have empty characters array by default', () => {
    expect(element.characters).to.deep.equal([]);
  });

  test('should render character cards for each character', async () => {
    element.characters = mockCharacters;
    await element.updateComplete;

    const characterCards =
      element.shadowRoot.querySelectorAll('character-card');
    expect(characterCards).to.have.length(2);
  });

  test('should not render cards when characters array is empty', async () => {
    element.characters = [];
    await element.updateComplete;

    const characterCards =
      element.shadowRoot.querySelectorAll('character-card');
    expect(characterCards).to.have.length(0);
  });

  test('should emit character-click event when character card is clicked', async () => {
    element.characters = mockCharacters;
    await element.updateComplete;

    let clickedCharacter = null;
    element.addEventListener('character-click', (e) => {
      clickedCharacter = e.detail;
    });

    const firstCard = element.shadowRoot.querySelector('character-card');
    firstCard.dispatchEvent(
      new CustomEvent('character-click', {
        detail: mockCharacters[0],
        bubbles: true,
        composed: true,
      })
    );

    expect(clickedCharacter).to.deep.equal(mockCharacters[0]);
  });

  test('should emit toggle-favorite event when favorite is toggled', async () => {
    element.characters = mockCharacters;
    await element.updateComplete;

    let toggleEvent = null;
    element.addEventListener('toggle-favorite', (e) => {
      toggleEvent = e.detail;
    });

    const firstCard = element.shadowRoot.querySelector('character-card');
    firstCard.dispatchEvent(
      new CustomEvent('toggle-favorite', {
        detail: { characterId: 1, isFavorite: true },
        bubbles: true,
        composed: true,
      })
    );

    expect(toggleEvent).to.deep.equal({ characterId: 1, isFavorite: true });
  });

  test('should pass character data to character cards', async () => {
    element.characters = mockCharacters;
    await element.updateComplete;

    const characterCards =
      element.shadowRoot.querySelectorAll('character-card');
    expect(characterCards[0].character).to.deep.equal(mockCharacters[0]);
    expect(characterCards[1].character).to.deep.equal(mockCharacters[1]);
  });

  test('should have proper CSS class for grid layout', () => {
    const gridContainer = element.shadowRoot.querySelector('.characters-grid');
    expect(gridContainer).to.exist;
    expect(gridContainer.classList.contains('characters-grid')).to.be.true;
  });
});
