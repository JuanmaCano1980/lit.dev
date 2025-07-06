import { css } from 'lit';

export const characterListStyle = css`
  :host {
    display: block;
  }
  .search-container {
    margin-bottom: 2rem;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    padding-bottom: 0.25rem;
  }
  .search-bar {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    border: none;
    background: transparent;
    z-index: 1;
  }
  .search-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1.5rem;
    font-family: 'Roboto Condensed', Arial, sans-serif;
    color: #222;
    padding: 0.5rem 0 0.5rem 2.2rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    z-index: 2;
  }
  .search-input::placeholder {
    color: #bdbdbd;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 1.2rem;
    font-family: 'Roboto Condensed', Arial, sans-serif;
    opacity: 1;
  }
  .search-icon {
    position: absolute;
    left: 0.2rem;
    top: 50%;
    transform: translateY(-50%);
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #222;
    opacity: 0.7;
    z-index: 3;
    background: transparent;
    pointer-events: none;
  }
  .search-container::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2.5px;
    background: #111;
    z-index: 1;
  }
  .search-input:focus ~ .search-container::after {
    background: #111;
    height: 3px;
  }
  @media (max-width: 600px) {
    .search-container {
      max-width: 100%;
      padding: 0 0.5rem 0.25rem 0.5rem;
    }
    .search-input {
      font-size: 1.1rem;
      padding-left: 1.7rem;
    }
    .search-icon {
      width: 22px;
      height: 22px;
    }
  }
  .characters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 188px);
    gap: 1rem;
    justify-items: center;
    justify-content: center;
    width: 100%;
    overflow-x: auto;
  }
  @media (max-width: 600px) {
    .characters-grid {
      grid-template-columns: repeat(auto-fill, 160px);
    }
  }
  .loading,
  .no-results {
    text-align: center;
    padding: 2rem;
    font-size: 1.1rem;
    color: #6b7280;
  }

  .error-container {
    text-align: center;
    padding: 2rem;
  }

  .error-message {
    font-size: 1.1rem;
    color: #dc2626;
    margin-bottom: 1rem;
  }

  .retry-button {
    background: #111;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .retry-button:hover {
    background: #333;
  }
  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .results-count {
    font-size: 1.1rem;
    color: #111;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .refresh-button {
    background: #ed1d24;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s;
    font-weight: 500;
  }

  .refresh-button:hover {
    background: #c41e23;
  }
`;
