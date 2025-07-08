import { expect } from '@open-wc/testing';
import { test, describe, beforeEach, vi } from 'vitest';
import { characters } from '../../src/services/characters.js';

// Mock the api module
vi.mock('../../src/services/api.js', () => ({
  api: {
    getCharacters: vi.fn(),
    searchCharacters: vi.fn(),
  },
}));

// Import the mocked api
import { api } from '../../src/services/api.js';

describe('Characters Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear the service cache before each test
    characters.clearCache();
  });

  test('should get characters successfully', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            id: 1,
            name: 'Spider-Man',
            description: 'Friendly neighborhood Spider-Man',
            thumbnail: {
              path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087',
              extension: 'jpg',
            },
          },
        ],
        total: 1,
      },
    };

    vi.mocked(api.getCharacters).mockResolvedValueOnce(mockResponse);

    const result = await characters.getCharacters();

    expect(result.characters).to.deep.equal(mockResponse.data.results);
    expect(vi.mocked(api.getCharacters).mock.calls.length).to.be.greaterThan(0);
  });

  test('should search characters successfully', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            id: 1,
            name: 'Spider-Man',
            description: 'Friendly neighborhood Spider-Man',
            thumbnail: {
              path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087',
              extension: 'jpg',
            },
          },
        ],
      },
    };

    vi.mocked(api.searchCharacters).mockResolvedValueOnce(mockResponse);

    const result = await characters.search('Spider');

    expect(result).to.deep.equal(mockResponse.data.results);
    expect(vi.mocked(api.searchCharacters).mock.calls.length).to.be.greaterThan(
      0
    );
  });

  test('should handle API error', async () => {
    vi.mocked(api.getCharacters).mockRejectedValueOnce(new Error('API Error'));

    try {
      await characters.getCharacters();
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include('API Error');
    }
  });

  test('should clear cache', () => {
    characters.clearCache();
    const cacheInfo = characters.getCacheInfo();
    expect(cacheInfo.hasCache).to.be.false;
  });

  test('should get cache info', () => {
    const cacheInfo = characters.getCacheInfo();
    expect(cacheInfo).to.have.property('hasCache');
    // When there's no cache, isValid is not included
    if (cacheInfo.hasCache) {
      expect(cacheInfo).to.have.property('isValid');
    }
  });
});
