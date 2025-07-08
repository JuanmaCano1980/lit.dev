import { css } from 'lit';
import { mediaQueries } from '../../utils/css-utils.js';

export const characterGridStyle = css`
  .characters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
    width: 100%;
    gap: 0.5rem;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  ${mediaQueries.tablet(css`
    .characters-grid {
      gap: 1rem;
    }
  `)}
`;
