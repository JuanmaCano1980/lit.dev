import { expect, fixture, html } from '@open-wc/testing';
import { test, describe, beforeEach } from 'vitest';
import '../../src/components/common/favorite-button.js';

describe('FavoriteButton', () => {
  let element;
  const mockCharacter = {
    id: 1,
    name: 'Spider-Man',
    thumbnail: { path: 'test', extension: 'jpg' },
  };

  beforeEach(async () => {
    element = await fixture(html`<favorite-button></favorite-button>`);
  });

  test('should render correctly', () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
  });

  test('should have default properties', () => {
    expect(element.character).to.be.undefined;
    expect(element.characterId).to.be.null;
    expect(element.isFavorite).to.be.false;
    expect(element.size).to.equal('medium');
    expect(element.isCardHovered).to.be.false;
  });

  test('should not render button when characterId is null', () => {
    const button = element.shadowRoot.querySelector('.favorite-btn');
    expect(button).to.be.null;
  });

  test('should render when characterId is provided', async () => {
    element.characterId = 1;
    element.character = mockCharacter;
    await element.updateComplete;

    const button = element.shadowRoot.querySelector('.favorite-btn');
    expect(button).to.exist;
  });

  test('should display favorite state correctly', async () => {
    element.characterId = 1;
    element.character = mockCharacter;
    element.isFavorite = true;
    await element.updateComplete;

    const heartIcon = element.shadowRoot.querySelector('.favorite-icon');
    expect(heartIcon.src).to.include('/heart_on.svg');
  });

  test('should display non-favorite state correctly', async () => {
    element.characterId = 1;
    element.character = mockCharacter;
    element.isFavorite = false;
    await element.updateComplete;

    const heartIcon = element.shadowRoot.querySelector('.favorite-icon');
    expect(heartIcon.src).to.include('/heart_off.svg');
  });

  test('should emit favorite-toggled event when clicked', async () => {
    element.characterId = 1;
    element.character = mockCharacter;
    element.isFavorite = false;
    await element.updateComplete;

    let eventEmitted = false;
    let eventDetail = null;

    element.addEventListener('favorite-toggled', (e) => {
      eventEmitted = true;
      eventDetail = e.detail;
    });

    const button = element.shadowRoot.querySelector('.favorite-btn');
    button.click();

    expect(eventEmitted).to.be.true;
    expect(eventDetail).to.deep.equal({
      characterId: 1,
      isFavorite: true,
      character: mockCharacter,
    });
  });

  test('should toggle favorite state when clicked', async () => {
    element.characterId = 1;
    element.character = mockCharacter;
    element.isFavorite = false;
    await element.updateComplete;

    const button = element.shadowRoot.querySelector('.favorite-btn');
    button.click();

    expect(element.isFavorite).to.be.true;
  });

  test('should apply size classes correctly', async () => {
    element.characterId = 1;
    element.character = mockCharacter;
    element.size = 'large';
    await element.updateComplete;

    const button = element.shadowRoot.querySelector('.favorite-btn');
    expect(button.classList.contains('large')).to.be.true;
  });

  test('should have proper accessibility attributes', async () => {
    element.characterId = 1;
    element.character = mockCharacter;
    await element.updateComplete;

    const button = element.shadowRoot.querySelector('.favorite-btn');
    expect(button).to.exist;
    expect(button.tagName).to.equal('BUTTON');
    expect(button.hasAttribute('aria-label')).to.be.true;
    expect(button.hasAttribute('title')).to.be.true;
  });

  test('should not toggle when characterId is null', async () => {
    element.characterId = null;
    element.isFavorite = false;
    await element.updateComplete;

    // Should not render button
    const button = element.shadowRoot.querySelector('.favorite-btn');
    expect(button).to.be.null;
  });
});
