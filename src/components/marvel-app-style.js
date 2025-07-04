import { css } from 'lit';

export const marvelAppStyle = css`
  :host {
    display: block;
    min-height: 100vh;
    background-color: #f5f5f5;
  }

  .main-content {
    padding: 0;
  }

  .main-content.home {
    padding: 3rem;
  }
`;
