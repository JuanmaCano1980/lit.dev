import { css } from 'lit';

export const headerCharacterDetailStyle = css`
  .main-detail-full {
    width: 100vw;
    background: var(--marvel-black, #000000);
    border-bottom: 6px solid var(--marvel-red, #e62429);
    padding: 0;
    height: 340px;
    display: flex;
    align-items: stretch;
    overflow: hidden;
  }

  .main-detail-content {
    display: flex;
    flex-direction: row;
    color: var(--marvel-white, #fff);
    width: 100vw;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    padding: 0;
    gap: 0;
  }

  .img-col {
    flex: 0 0 340px;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    overflow: hidden;
  }

  .character-image-large {
    width: 340px;
    height: 100%;
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
    gap: 1.5rem;
    padding: 0 2.5rem;
    height: 100%;
  }

  .character-name-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
  }

  .character-name {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.01em;
    color: var(--marvel-white, #fff);
    text-transform: uppercase;
    flex: 1;
  }

  .character-description {
    font-size: 1.1rem;
    color: #e5e7eb;
    margin: 0;
    line-height: 1.7;
    font-weight: 400;
  }

  .favorite-section {
    position: static;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: 1rem;
  }

  @media (max-width: 900px) {
    .main-detail-full {
      height: 220px;
    }
    .img-col {
      flex: 0 0 220px;
    }
    .character-image-large {
      width: 220px;
    }
    .info-col {
      padding: 0 1rem;
    }
    .favorite-section {
      top: 1.5rem;
      right: 1rem;
    }
  }

  @media (max-width: 600px) {
    .main-detail-full {
      height: 140px;
    }
    .img-col {
      flex: 0 0 140px;
    }
    .character-image-large {
      width: 140px;
    }
    .info-col {
      padding: 0 0.5rem;
    }
  }
`;
