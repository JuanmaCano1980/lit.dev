import { css } from 'lit';

export const marvelSpinnerStyle = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 220px;
  }
  .spinner {
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
