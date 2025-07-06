import { css } from 'lit';

export const comicsSectionStyle = css`
  .comics-section {
    background: var(--marvel-white, #ffffff);
    padding: 2.5rem 2rem 2.5rem 2rem;
    border-radius: 0 0 10px 10px;
    margin-top: 0;
  }

  .comics-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--marvel-black, #000000);
    margin-bottom: 1.5rem;
    letter-spacing: 0.01em;
  }

  .comics-list {
    display: flex;
    flex-direction: row;
    gap: 2.2rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;

    /* Estilos personalizados para el scrollbar */
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
    background: var(--marvel-white, #ffffff);
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 180px;
    max-width: 180px;
    transition:
      box-shadow 0.2s,
      border-bottom 0.2s;
    border-bottom: 3px solid transparent;
    cursor: pointer;
  }
  .comic-card:hover {
    box-shadow: 0 8px 24px rgba(230, 36, 41, 0.13);
    border-bottom: 3px solid var(--marvel-red, #e62429);
  }

  .comic-cover {
    width: 180px;
    height: 260px;
    object-fit: cover;
    border-radius: 7px;
    margin-bottom: 0.7rem;
    background: #eee;
  }

  .comic-info {
    text-align: left;
    width: 100%;
    padding: 0 0.2rem;
  }

  .comic-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--marvel-black, #000000);
    margin-bottom: 0.2rem;
    line-height: 1.2;
  }

  .comic-year {
    font-size: 0.95rem;
    color: #888;
    font-weight: 500;
    border-top: 1px solid #eee;
    padding-top: 0.2rem;
  }

  @media (max-width: 900px) {
    .comics-section {
      padding: 1.5rem 1rem 1.5rem 1rem;
    }
  }
  @media (max-width: 600px) {
    .comics-section {
      padding: 1.2rem 0.3rem 1.2rem 0.3rem;
    }
    .comics-list {
      gap: 1rem;
    }
    .comic-card {
      min-width: 120px;
      max-width: 120px;
    }
    .comic-cover {
      width: 120px;
      height: 170px;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
