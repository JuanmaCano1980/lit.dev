import { expect, fixture, html } from '@open-wc/testing';
import { test, describe, beforeEach } from 'vitest';
import '../../src/components/home/character-list.js';

describe('CharacterList', () => {
  let element;
  const mockCharacters = [
    {
      id: 1,
      name: 'Spider-Man',
      description: 'Friendly neighborhood Spider-Man',
      thumbnail: {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087',
        extension: 'jpg',
      },
      favorite: false,
    },
    {
      id: 2,
      name: 'Iron Man',
      description: 'Genius billionaire playboy philanthropist',
      thumbnail: {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55',
        extension: 'jpg',
      },
      favorite: true,
    },
  ];

  beforeEach(async () => {
    element = await fixture(
      html`<character-list .characters=${mockCharacters}></character-list>`
    );
  });

  test('should render correctly', () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
  });

  test('should render character grid', () => {
    const grid = element.shadowRoot.querySelector('character-grid');
    expect(grid).to.exist;
  });

  test('should pass characters to grid', () => {
    const grid = element.shadowRoot.querySelector('character-grid');
    expect(grid.characters).to.deep.equal(mockCharacters);
  });

  test('should handle character click', async () => {
    let clickedCharacter = null;
    element.addEventListener('character-selected', (e) => {
      clickedCharacter = e.detail;
    });

    const grid = element.shadowRoot.querySelector('character-grid');
    const mockCharacter = { id: 1, name: 'Spider-Man' };
    grid.dispatchEvent(
      new CustomEvent('character-click', {
        detail: mockCharacter,
        bubbles: true,
        composed: true,
      })
    );

    expect(clickedCharacter).to.deep.equal(mockCharacter);
  });

  test('should handle toggle favorite', async () => {
    let toggleData = null;
    element.addEventListener('favorite-toggled', (e) => {
      toggleData = e.detail;
    });

    const grid = element.shadowRoot.querySelector('character-grid');
    const mockToggle = { characterId: 1, isFavorite: true };
    grid.dispatchEvent(
      new CustomEvent('toggle-favorite', {
        detail: mockToggle,
        bubbles: true,
        composed: true,
      })
    );

    expect(toggleData).to.deep.equal(mockToggle);
  });

  test('should show error state', async () => {
    element.error = 'Failed to load characters';
    await element.updateComplete;

    const errorElement = element.shadowRoot.querySelector('.error-message');
    expect(errorElement).to.exist;
    expect(errorElement.textContent).to.include('Failed to load characters');
  });

  test('should have initial properties', () => {
    expect(element.characters).to.be.an('array');
    expect(element.loading).to.be.a('boolean');
    expect(element.searchTerm).to.be.a('string');
    expect(element.error).to.be.a('string');
  });
});
