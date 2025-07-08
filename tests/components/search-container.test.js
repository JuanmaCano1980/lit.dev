import { expect, fixture, html } from '@open-wc/testing';
import { test, describe, beforeEach } from 'vitest';
import '../../src/components/common/search-container.js';

const { Event, KeyboardEvent, setTimeout } = globalThis;

describe('SearchContainer', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<search-container></search-container>`);
  });

  test('should render correctly', () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
  });

  test('should render a search input', () => {
    const input = element.shadowRoot.querySelector('.search-input');
    expect(input).to.exist;
    expect(input.type).to.equal('text');
  });

  test('should update value when typing', async () => {
    const input = element.shadowRoot.querySelector('.search-input');
    input.value = 'Hulk';
    input.dispatchEvent(new Event('input'));
    await element.updateComplete;
    expect(input.value).to.equal('Hulk');
  });

  test('should emit search-change event when typing', async () => {
    const input = element.shadowRoot.querySelector('.search-input');
    let eventEmitted = false;
    element.addEventListener('search-change', () => {
      eventEmitted = true;
    });
    input.value = 'Iron Man';
    input.dispatchEvent(new Event('input'));
    expect(eventEmitted).to.be.true;
  });

  test('should emit search-perform event after debounce', async () => {
    const input = element.shadowRoot.querySelector('.search-input');
    let eventEmitted = false;
    element.addEventListener('search-perform', () => {
      eventEmitted = true;
    });

    // Simulate typing with a term that meets minimum length
    input.value = 'Thor';
    input.dispatchEvent(new Event('input'));

    // Wait for debounce timer
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(eventEmitted).to.be.true;
  });

  test('should render search icon', () => {
    const icon = element.shadowRoot.querySelector('.search-icon');
    expect(icon).to.exist;
    expect(icon.querySelector('svg')).to.exist;
  });
});
