import { css } from 'lit';

export const characterDetailStyle = css`
  :host {
    display: block;
    background: var(--marvel-light-gray, #f8f9fa);
    min-height: 100vh;
  }

  .character-detail-root {
    overflow: hidden;
    margin: 0 auto;
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
