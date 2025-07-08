import { css } from 'lit';
import { mediaQueries } from '../../utils/css-utils.js';

export const comicsSectionStyle = css`
  .comics-section {
    background: white;
    padding: 1.2rem 0 1.2rem 0;
    margin-top: 0;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .comics-content {
    width: 100vw;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 0.5rem;
  }

  .comics-title {
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--marvel-black, #000000);
    margin-bottom: 1.2rem;
    letter-spacing: 0.01em;
  }

  .comics-list {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scrollbar-width: thin;
    scrollbar-color: var(--marvel-red, #e62429) #f0f0f0;
  }

  .comics-list::-webkit-scrollbar {
    height: 8px;
  }

  .comics-list::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 4px;
  }

  .comics-list::-webkit-scrollbar-thumb {
    background: var(--marvel-red, #e62429);
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  .comics-list::-webkit-scrollbar-thumb:hover {
    background: #c41e23;
  }

  .comic-card {
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 120px;
    max-width: 120px;
    cursor: pointer;
  }

  .comic-cover {
    width: 120px;
    height: 170px;
    object-fit: cover;
    margin-bottom: 0.7rem;
    background: #eee;
  }

  .comic-info {
    text-align: left;
    width: 100%;
    padding: 0 0.2rem;
  }

  .comic-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--marvel-black, #000000);
    margin-bottom: 0.2rem;
    line-height: 1.2;
  }

  .comic-year {
    font-size: 0.85rem;
    color: #888;
    font-weight: 500;
    padding-top: 0.2rem;
  }

  ${mediaQueries.tablet(css`
    .comics-section {
      padding: 1.5rem 0 1.5rem 0;
    }

    .comics-content {
      padding: 0 1rem;
    }

    .comics-title {
      font-size: 1.3rem;
      margin-bottom: 1.4rem;
    }

    .comics-list {
      gap: 1.5rem;
    }

    .comic-card {
      min-width: 150px;
      max-width: 150px;
    }

    .comic-cover {
      width: 150px;
      height: 210px;
    }

    .comic-title {
      font-size: 0.95rem;
    }

    .comic-year {
      font-size: 0.9rem;
    }
  `)}

  ${mediaQueries.desktop(css`
    .comics-section {
      padding: 2.5rem 0 2.5rem 0;
    }

    .comics-content {
      padding: 0 2rem;
    }

    .comics-title {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
    }

    .comics-list {
      gap: 2.2rem;
    }

    .comic-card {
      min-width: 180px;
      max-width: 180px;
    }

    .comic-cover {
      width: 180px;
      height: 260px;
    }

    .comic-title {
      font-size: 1rem;
    }

    .comic-year {
      font-size: 0.95rem;
    }
  `)}

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
