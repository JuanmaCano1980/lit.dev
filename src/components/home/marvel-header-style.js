import { css } from 'lit';
import { mediaQueries } from '../../utils/css-utils.js';

export const marvelHeaderStyle = css`
  :host {
    display: block;
    width: 100%;
    background: #000;
    color: #fff;
  }

  .header-container {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 12px;
    min-height: 48px;
    gap: 12px;
    box-sizing: border-box;
    background: #000;
    position: relative;
    justify-content: space-between;
  }

  .logo {
    display: flex;
    align-items: center;
    height: 24px;
    margin-right: 8px;
    flex-shrink: 0;
    cursor: pointer;
  }

  .logo-img {
    height: 24px;
    width: auto;
    display: block;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 0.3em;
  }

  .favorites-info {
    display: flex;
    align-items: center;
    gap: 0.3em;
    font-family: 'Roboto Condensed', Arial, sans-serif;
    font-size: 1rem;
    color: #fff;
    font-weight: 400;
    letter-spacing: 0.04em;
    margin-top: 0.2em;
    cursor: pointer;
  }

  .favorites-heart {
    width: 20px;
    height: 20px;
    display: block;
    margin-right: 0.1em;
  }

  .favorites-count {
    min-width: 1.2em;
    text-align: left;
    font-size: 1rem;
    color: #fff;
  }

  .back-btn {
    background: none;
    border: none;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-right: 8px;
    cursor: pointer;
    height: 28px;
    width: 28px;
    border-radius: 50%;
    transition: background 0.2s;
  }

  .back-btn:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .arrow {
    font-size: 1.4rem;
    line-height: 1;
    display: block;
    margin: 0 auto;
  }

  .title {
    font-size: 0.98rem;
    font-weight: 600;
    color: #fff;
    opacity: 0.85;
    letter-spacing: 0.04em;
    margin-left: 0;
  }

  ${mediaQueries.tablet(css`
    .header-container {
      padding: 0 3rem;
      min-height: 84px;
      gap: 0;
    }

    .logo {
      width: 130px;
      height: auto;
      margin-right: 0;
    }

    .logo-img {
      height: auto;
      width: 100%;
    }

    .favorites-info {
      font-size: 1.2rem;
    }

    .favorites-heart {
      width: 24px;
      height: 24px;
    }

    .favorites-count {
      font-size: 1.1rem;
    }

    .back-btn {
      height: 32px;
      width: 32px;
    }

    .arrow {
      font-size: 1.6rem;
    }

    .title {
      font-size: 1.1rem;
    }
  `)}
`;
