import { css } from 'lit';

export const characterGridStyle = css`
  .characters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 190px);
    gap: 0.7rem;
    width: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;
