import { expect, fixture, html } from '@open-wc/testing';
import { test, describe, beforeEach } from 'vitest';
import '../../src/components/home/marvel-app.js';

describe('MarvelApp', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<marvel-app></marvel-app>`);
  });

  test('should render correctly', () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
  });

  test('should render marvel header', () => {
    const header = element.shadowRoot.querySelector('marvel-header');
    expect(header).to.exist;
  });

  test('should render character list', () => {
    const characterList = element.shadowRoot.querySelector('character-list');
    expect(characterList).to.exist;
  });

  test('should have initial state', () => {
    expect(element.selectedCharacter).to.be.null;
    expect(element.view).to.equal('list');
    expect(element.favoritesCount).to.equal(0);
    expect(element.favorites).to.deep.equal([]);
    expect(element.resetSearchFlag).to.be.false;
    expect(element.searchTerm).to.equal('');
    expect(element.isLoading).to.be.false;
  });

  test('should handle search change', async () => {
    let searchTerm = '';
    element.addEventListener('search-change', (e) => {
      searchTerm = e.detail;
    });

    const header = element.shadowRoot.querySelector('marvel-header');
    header.dispatchEvent(
      new CustomEvent('search-change', {
        detail: 'Iron Man',
        bubbles: true,
        composed: true,
      })
    );

    expect(searchTerm).to.equal('Iron Man');
  });

  test('should handle character click', async () => {
    let clickedCharacter = null;
    element.addEventListener('character-selected', (e) => {
      clickedCharacter = e.detail;
    });

    const characterList = element.shadowRoot.querySelector('character-list');
    const mockCharacter = { id: 1, name: 'Spider-Man' };
    characterList.dispatchEvent(
      new CustomEvent('character-selected', {
        detail: mockCharacter,
        bubbles: true,
        composed: true,
      })
    );

    expect(clickedCharacter).to.deep.equal(mockCharacter);
  });
});
