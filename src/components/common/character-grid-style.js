import { css } from 'lit';

export const characterGridStyle = css`
  .characters-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2.2rem;
    justify-content: flex-start;
  }
  @media (max-width: 900px) {
    .characters-grid {
      gap: 1.2rem;
    }
  }
  @media (max-width: 600px) {
    .characters-grid {
      gap: 0.7rem;
    }
  }
`;
