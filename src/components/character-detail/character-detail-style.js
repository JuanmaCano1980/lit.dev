import { css } from 'lit';

export const characterDetailStyle = css`
  :host {
    display: block;
    background: var(--marvel-light-gray, #f8f9fa);
    min-height: 100vh;
  }

  .character-detail-root {
    background: red;
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    margin: 0 auto;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
  }

  .no-character {
    text-align: center;
    padding: 4rem 2rem;
    color: #64748b;
    font-size: 1.2rem;
    background: #f8fafc;
    border-radius: 16px;
    margin: 2rem 0;
  }
`;
