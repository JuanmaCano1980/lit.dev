import { css } from 'lit';
import { mediaQueries } from '../../utils/css-utils.js';

export const headerCharacterDetailStyle = css`
  .detail-full {
    width: 100vw;
    background: var(--marvel-black, #000000);
    padding: 0;
    display: flex;
    align-items: stretch;
    overflow: hidden;
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 20px),
      calc(100% - 20px) 100%,
      0 100%
    );
  }

  .detail-content {
    display: flex;
    flex-direction: column;
    color: white;
    width: 100vw;
    height: 100%;
    margin: 0 auto;
    position: relative;
    padding: 0;
    gap: 0;
  }

  .img-col {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    overflow: hidden;
  }

  .character-image-large {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 0;
    box-shadow: none;
    background: none;
    border: none;
    display: block;
  }

  .info-col {
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    padding: 1rem;
    height: 100%;
  }

  .character-name-row {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    gap: 0.5rem;
  }

  .character-name {
    font-size: 1.2rem;
    font-weight: 800;
    margin: 0 0 0.3rem 0;
    letter-spacing: -0.01em;
    color: white;
    text-transform: uppercase;
    flex: 1;
  }

  .character-description {
    font-size: 0.9rem;
    color: #e5e7eb;
    margin: 0;
    line-height: 1.5;
    font-weight: 400;
  }

  .favorite-section {
    position: static;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-left: 0.5rem;
  }

  ${mediaQueries.tablet(css`
    .detail-full {
      height: 100%;
    }

    .detail-content {
      flex-direction: row;
      flex-direction: row;
      align-items: center;
    }

    .img-col {
      width: 278px;
      height: 278px;
    }

    .character-image-large {
      width: 278px;
      height: 278px;
    }

    .info-col {
      padding: 2rem;
      gap: 1.2rem;
    }

    .character-name-row {
      gap: 0.8rem;
    }

    .character-name {
      font-size: 1.8rem;
      margin: 0 0 0.4rem 0;
    }

    .character-description {
      font-size: 1rem;
      line-height: 1.6;
    }

    .favorite-section {
      gap: 0.4rem;
      margin-left: 0.8rem;
    }
  `)}

  ${mediaQueries.desktop(css`
    .detail-full {
      clip-path: polygon(
        0 0,
        100% 0,
        100% calc(100% - 30px),
        calc(100% - 30px) 100%,
        0 100%
      );
    }

    .detail-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .img-col {
      flex: 0 0 340px;
    }

    .character-image-large {
      width: 340px;
    }

    .info-col {
      padding: 0 2.5rem;
      gap: 1.5rem;
    }

    .character-name-row {
      gap: 1rem;
    }

    .character-name {
      font-size: 2.5rem;
      margin: 0 0 0.5rem 0;
    }

    .character-description {
      font-size: 1.1rem;
      line-height: 1.7;
    }

    .favorite-section {
      gap: 0.5rem;
      margin-left: 1rem;
    }
  `)}
`;
