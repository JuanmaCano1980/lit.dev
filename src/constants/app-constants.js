export const VIEWS = {
  LIST: 'list',
  DETAIL: 'detail',
  FAVORITES: 'favorites',
};

export const STORAGE_KEYS = {
  FAVORITES: 'marvel-favorites',
};

export const URL_PARAMS = {
  SEARCH: 'search',
  FAVORITES: 'favorites',
  CHARACTER_ID: 'id',
};

export const API_CONFIG = {
  DEFAULT_LIMIT: 50,
  SEARCH_LIMIT: 20,
};

export const SEARCH_CONFIG = {
  MIN_LENGTH: 3,
  DEBOUNCE_MS: 400,
};

export const CACHE_CONFIG = {
  CHARACTERS_EXPIRY_MS: 5 * 60 * 1000, // 5 minutos
};
