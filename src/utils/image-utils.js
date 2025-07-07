/**
 * Marvel Image Utilities
 * Handles Marvel API image validation and URL generation
 */

// Marvel API image paths that indicate no image is available
const INVALID_IMAGE_PATTERNS = ['image_not_available', '4c002e0300000', 'f002'];

/**
 * Check if a Marvel image path is valid
 * @param {string} basePath - The base path from Marvel API
 * @returns {boolean} - True if the image is valid, false otherwise
 */
export function isValidMarvelImage(basePath) {
  if (!basePath) return false;

  return !INVALID_IMAGE_PATTERNS.some((pattern) => basePath.includes(pattern));
}

/**
 * Generate a Marvel image URL with fallback to placeholder
 * @param {Object} thumbnail - Marvel API thumbnail object
 * @param {string} size - Image size (default: 'standard_large')
 * @returns {string} - Image URL or placeholder path
 */
export function getMarvelImageUrl(thumbnail, size = 'standard_large') {
  if (!thumbnail || !thumbnail.path || !thumbnail.extension) {
    return '/placeholder.svg';
  }

  const { path: basePath, extension } = thumbnail;

  if (!isValidMarvelImage(basePath)) {
    return '/placeholder.svg';
  }

  return `${basePath}/${size}.${extension}`;
}

/**
 * Handle image load error by setting placeholder
 * @param {Event} event - Image error event
 */
export function handleImageError(event) {
  event.target.src = '/placeholder.svg';
}
