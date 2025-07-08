import { expect, fixture, html } from '@open-wc/testing';
import { test, describe, beforeEach } from 'vitest';
import '../../src/components/home/marvel-header.js';

describe('MarvelHeader', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<marvel-header></marvel-header>`);
  });

  test('should render correctly', () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
  });

  test('should have default properties', () => {
    expect(element.view).to.be.undefined;
    expect(element.favoritesCount).to.be.undefined;
  });

  test('should display favorites count', async () => {
    element.favoritesCount = 5;
    await element.updateComplete;

    const favoritesCount = element.shadowRoot.querySelector('.favorites-count');
    expect(favoritesCount.textContent.trim()).to.equal('5');
  });

  test('should display zero when no favorites', async () => {
    element.favoritesCount = 0;
    await element.updateComplete;

    const favoritesCount = element.shadowRoot.querySelector('.favorites-count');
    expect(favoritesCount.textContent.trim()).to.equal('0');
  });

  test('should have logo image', () => {
    const logoImg = element.shadowRoot.querySelector('.logo-img');
    expect(logoImg).to.exist;
    expect(logoImg.src).to.include('/marvel.svg');
    expect(logoImg.alt).to.equal('Marvel Logo');
  });

  test('should have favorites heart icon', () => {
    const favoritesHeart = element.shadowRoot.querySelector('.favorites-heart');
    expect(favoritesHeart).to.exist;
    expect(favoritesHeart.src).to.include('/heart_on.svg');
    expect(favoritesHeart.alt).to.equal('favorites');
  });

  test('should emit go-home event when logo is clicked', async () => {
    const logo = element.shadowRoot.querySelector('.logo');
    let eventEmitted = false;

    element.addEventListener('go-home', () => {
      eventEmitted = true;
    });

    logo.click();
    expect(eventEmitted).to.be.true;
  });

  test('should emit show-favorites event when favorites info is clicked', async () => {
    const favoritesInfo = element.shadowRoot.querySelector('.favorites-info');
    let eventEmitted = false;

    element.addEventListener('show-favorites', () => {
      eventEmitted = true;
    });

    favoritesInfo.click();
    expect(eventEmitted).to.be.true;
  });
});
