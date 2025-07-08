import { css } from 'lit';

export const marvelSpinnerStyle = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
  }

  .spinner {
    border: 4px solid #444;
    border-top: 4px solid var(--marvel-red);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  /* Size variants */
  .spinner.small {
    width: 20px;
    height: 20px;
    border-width: 2px;
  }

  .spinner.medium {
    width: 40px;
    height: 40px;
    border-width: 4px;
  }

  .spinner.large {
    width: 60px;
    height: 60px;
    border-width: 6px;
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
