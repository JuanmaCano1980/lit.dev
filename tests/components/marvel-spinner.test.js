import { expect, fixture, html } from '@open-wc/testing';
import { test, describe, beforeEach } from 'vitest';
import '../../src/components/common/marvel-spinner.js';

describe('MarvelSpinner', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<marvel-spinner></marvel-spinner>`);
  });

  test('should render correctly', () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
  });

  test('should have default size "medium"', () => {
    expect(element.size).to.equal('medium');
  });

  test('should change size when property is set', async () => {
    element.size = 'large';
    await element.updateComplete;

    const spinnerDiv = element.shadowRoot.querySelector('.spinner');
    expect(spinnerDiv.classList.contains('large')).to.be.true;
  });

  test('should render spinner element with correct class', () => {
    const spinnerDiv = element.shadowRoot.querySelector('.spinner');
    expect(spinnerDiv).to.exist;
    expect(spinnerDiv.classList.contains('spinner')).to.be.true;
    expect(spinnerDiv.classList.contains('medium')).to.be.true;
  });

  test('should accept different sizes', async () => {
    const sizes = ['small', 'medium', 'large'];

    for (const size of sizes) {
      element.size = size;
      await element.updateComplete;

      const spinnerDiv = element.shadowRoot.querySelector('.spinner');
      expect(spinnerDiv.classList.contains(size)).to.be.true;
    }
  });

  // Tests for dynamic rendering
  test('should update DOM when size property changes', async () => {
    const spinnerDiv = element.shadowRoot.querySelector('.spinner');
    expect(spinnerDiv.classList.contains('medium')).to.be.true;

    element.size = 'small';
    await element.updateComplete;
    expect(spinnerDiv.classList.contains('small')).to.be.true;
    expect(spinnerDiv.classList.contains('medium')).to.be.false;

    element.size = 'large';
    await element.updateComplete;
    expect(spinnerDiv.classList.contains('large')).to.be.true;
    expect(spinnerDiv.classList.contains('small')).to.be.false;
  });

  test('should not duplicate elements on re-render', async () => {
    const initialSpinners = element.shadowRoot.querySelectorAll('.spinner');
    expect(initialSpinners).to.have.length(1);

    element.size = 'large';
    await element.updateComplete;

    const updatedSpinners = element.shadowRoot.querySelectorAll('.spinner');
    expect(updatedSpinners).to.have.length(1);
  });

  // Tests for accessibility
  test('should have proper ARIA attributes for accessibility', () => {
    const spinnerDiv = element.shadowRoot.querySelector('.spinner');
    expect(spinnerDiv).to.exist;
    expect(spinnerDiv.getAttribute('role')).to.equal('status');
    expect(spinnerDiv.getAttribute('aria-label')).to.equal('Loading...');
  });

  test('should be accessible to screen readers', () => {
    const spinnerDiv = element.shadowRoot.querySelector('.spinner');
    expect(spinnerDiv).to.exist;

    // Verify element is not hidden from screen readers
    const computedStyle = window.getComputedStyle(spinnerDiv);
    expect(computedStyle.display).to.not.equal('none');
    expect(computedStyle.visibility).to.not.equal('hidden');
  });

  // Tests for styles
  test('should have spinner class applied', () => {
    const spinnerDiv = element.shadowRoot.querySelector('.spinner');
    expect(spinnerDiv.classList.contains('spinner')).to.be.true;
  });

  test('should have size-specific class applied', () => {
    const spinnerDiv = element.shadowRoot.querySelector('.spinner');
    expect(spinnerDiv.classList.contains('medium')).to.be.true;
  });

  test('should have proper CSS structure', () => {
    const spinnerDiv = element.shadowRoot.querySelector('.spinner');
    expect(spinnerDiv.tagName).to.equal('DIV');
    expect(spinnerDiv.className).to.include('spinner');
  });

  // Tests for component lifecycle
  test('should initialize with correct properties', () => {
    expect(element.size).to.equal('medium');
    expect(element.shadowRoot).to.exist;
  });

  test('should maintain state after property updates', async () => {
    element.size = 'large';
    await element.updateComplete;

    expect(element.size).to.equal('large');

    element.size = 'small';
    await element.updateComplete;

    expect(element.size).to.equal('small');
  });
});
