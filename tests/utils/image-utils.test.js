import { test, describe, expect } from 'vitest';
import {
  getMarvelImageUrl,
  handleImageError,
  isValidMarvelImage,
} from '../../src/utils/image-utils.js';

describe('Image Utils', () => {
  describe('isValidMarvelImage', () => {
    test('should return true for valid image paths', () => {
      expect(
        isValidMarvelImage(
          'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087'
        )
      ).to.be.true;
    });

    test('should return false for invalid image patterns', () => {
      expect(
        isValidMarvelImage(
          'http://i.annihil.us/u/prod/marvel/i/mg/b/image_not_available'
        )
      ).to.be.false;
      expect(
        isValidMarvelImage(
          'http://i.annihil.us/u/prod/marvel/i/mg/4c002e0300000'
        )
      ).to.be.false;
      expect(isValidMarvelImage('http://i.annihil.us/u/prod/marvel/i/mg/f002'))
        .to.be.false;
    });

    test('should return false for null or undefined', () => {
      expect(isValidMarvelImage(null)).to.be.false;
      expect(isValidMarvelImage(undefined)).to.be.false;
      expect(isValidMarvelImage('')).to.be.false;
    });
  });

  describe('getMarvelImageUrl', () => {
    test('should return correct URL with default size', () => {
      const thumbnail = {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087',
        extension: 'jpg',
      };
      const url = getMarvelImageUrl(thumbnail);

      expect(url).to.equal(
        'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087/standard_large.jpg'
      );
    });

    test('should return correct URL with custom size', () => {
      const thumbnail = {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087',
        extension: 'jpg',
      };
      const url = getMarvelImageUrl(thumbnail, 'portrait_uncanny');

      expect(url).to.equal(
        'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087/portrait_uncanny.jpg'
      );
    });

    test('should handle different image extensions', () => {
      const thumbnail = {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087',
        extension: 'png',
      };
      const url = getMarvelImageUrl(thumbnail);

      expect(url).to.equal(
        'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087/standard_large.png'
      );
    });

    test('should handle missing thumbnail gracefully', () => {
      const url = getMarvelImageUrl(null);
      expect(url).to.equal('/placeholder.svg');
    });

    test('should handle thumbnail with missing path', () => {
      const thumbnail = { extension: 'jpg' };
      const url = getMarvelImageUrl(thumbnail);
      expect(url).to.equal('/placeholder.svg');
    });

    test('should handle thumbnail with missing extension', () => {
      const thumbnail = {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087',
      };
      const url = getMarvelImageUrl(thumbnail);
      expect(url).to.equal('/placeholder.svg');
    });

    test('should return placeholder for invalid image paths', () => {
      const thumbnail = {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/image_not_available',
        extension: 'jpg',
      };
      const url = getMarvelImageUrl(thumbnail);
      expect(url).to.equal('/placeholder.svg');
    });
  });

  describe('handleImageError', () => {
    test('should set placeholder image on error', () => {
      const event = {
        target: {
          src: 'invalid-image.jpg',
        },
      };

      handleImageError(event);
      expect(event.target.src).to.equal('/placeholder.svg');
    });

    test('should handle event without target', () => {
      const event = {};

      // Should throw error when target is undefined
      expect(() => handleImageError(event)).to.throw(
        'Cannot set properties of undefined'
      );
    });
  });
});
