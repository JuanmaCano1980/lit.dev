import { css } from 'lit';
import { mediaQueries } from '../../utils/css-utils.js';

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
    padding: 1rem;
  }

  /* Tablet and up */
  ${mediaQueries.tablet(css`
    .main-content.home {
      padding: 2rem;
    }
  `)}

  /* Desktop and up */
  ${mediaQueries.desktop(css`
    .main-content.home {
      padding: 3rem;
    }
  `)}
`;
