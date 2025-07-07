import { css } from 'lit';

export const characterListStyle = css`
  :host {
    display: block;
  }

  .custom-title {
    margin: 0 0 2rem 0;
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
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

  .loading-spinner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 220px;
    width: 100%;
  }
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #444;
    border-top: 4px solid #ed1d24;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
