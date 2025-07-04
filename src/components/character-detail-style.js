import { css } from 'lit';

export const characterDetailStyle = css`
  :host {
    display: block;
    background: var(--marvel-light-gray, #f8f9fa);
    min-height: 100vh;
  }

  .character-detail-root {
    background: red;
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    margin: 0 auto;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
  }

  .header-marvel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--marvel-black, #000000);
    height: var(--header-height);
    padding: 0 2rem;
    border-radius: 10px 10px 0 0;
    position: relative;
  }
  .logo-section {
    display: flex;
    align-items: center;
  }
  .logo-marvel {
    height: 40px;
    width: auto;
    display: block;
  }
  .favorite-section {
    position: absolute;
    top: 2.5rem;
    right: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .favorite-count {
    color: var(--marvel-white, #fff);
    font-size: 1rem;
    font-weight: 600;
    margin-right: 0.25rem;
  }
  .favorite-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
  }
  .favorite-btn:active {
    transform: scale(0.95);
  }
  .icon-heart {
    width: 28px;
    height: 28px;
    color: var(--marvel-white, #fff);
    fill: none;
    stroke: var(--marvel-white, #fff);
    transition: stroke 0.2s;
  }
  .favorite-btn:hover .icon-heart {
    stroke: var(--marvel-red, #e62429);
    fill: var(--marvel-red, #e62429);
  }

  .main-detail-full {
    width: 100vw;
    margin-left: 50%;
    transform: translateX(-50%);
    background: var(--marvel-black, #000000);
    border-bottom: 6px solid var(--marvel-red, #e62429);
    padding: 0;
  }
  .main-detail-content {
    display: flex;
    flex-direction: row;
    color: var(--marvel-white, #fff);
    padding: 2.5rem 2rem 2rem 2rem;
    gap: 2.5rem;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }
  .img-col {
    flex: 0 0 260px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .character-image-large {
    width: 240px;
    height: 320px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    background: var(--marvel-light-gray, #f8f9fa);
    border: 3px solid var(--marvel-red, #e62429);
  }
  .info-col {
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1.5rem;
  }
  .character-name {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.01em;
    color: var(--marvel-white, #fff);
  }
  .character-description {
    font-size: 1.1rem;
    color: #e5e7eb;
    margin: 0;
    line-height: 1.7;
    font-weight: 400;
  }

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

  /* Estilos para Webkit (Chrome, Safari, Edge) */
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
    .main-detail-content {
      flex-direction: column;
      align-items: stretch;
      padding: 1.5rem 1rem 1.5rem 1rem;
      gap: 1.5rem;
    }
    .img-col {
      justify-content: flex-start;
      margin-bottom: 1rem;
    }
    .character-image-large {
      width: 180px;
      height: 240px;
    }
    .favorite-section {
      top: 1.5rem;
      right: 1rem;
    }
  }
  @media (max-width: 600px) {
    .header-marvel {
      padding: 0 0.7rem;
      height: 60px;
    }
    .main-detail-content {
      padding: 1rem 0.3rem 1rem 0.3rem;
    }
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
