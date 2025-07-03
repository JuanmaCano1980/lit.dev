import { css } from 'lit';

export const characterCardStyle = css`
  :host {
    display: block;
    cursor: pointer;
    user-select: none;
  }
  .card {
    background: transparent;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s;
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 12px),
      calc(100% - 12px) 100%,
      0 100%
    );
  }
  .card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  }
  .image-container {
    width: 100%;
    aspect-ratio: 1/1;
    background: #222;
    overflow: hidden;
  }
  .character-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s cubic-bezier(0.4, 0.2, 0.2, 1);
  }
  .card:hover .character-image {
    transform: scale(1.08);
  }
  .card-footer {
    background: #111;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.7em 1em 0.7em 1em;
    position: relative;
    min-height: 48px;
    transition: color 0.25s;
    overflow: hidden;
    z-index: 1;
  }
  .card-footer::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 0%;
    background: #e62429;
    z-index: 0;
    transition: height 0.35s cubic-bezier(0.4, 0.2, 0.2, 1);
  }
  .card:hover .card-footer::before {
    height: 100%;
  }
  .character-name {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #fff;
    flex: 1;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 1;
  }
  .favorite-btn {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    margin-left: 0.5em;
    z-index: 2;
    display: flex;
    align-items: center;
    padding: 0;
    transition: transform 0.15s;
  }
  .favorite-btn:active {
    transform: scale(0.92);
  }
  .favorite-icon {
    width: 22px;
    height: 22px;
    display: block;
    fill: #fff;
    stroke: #fff;
    stroke-width: 1.5px;
    transition:
      fill 0.2s,
      stroke 0.2s;
  }
  .favorite-btn.filled .favorite-icon {
    fill: #ed1d24;
    stroke: #ed1d24;
  }
  .card:hover .favorite-btn.filled .favorite-icon {
    fill: #fff;
    stroke: #fff;
    stroke-width: 1.5px;
  }
  .favorite-icon.pop {
    animation: pop-fav 0.45s cubic-bezier(0.4, 1.4, 0.6, 1) both;
  }
  @keyframes pop-fav {
    0% {
      transform: scale(1);
      filter: drop-shadow(0 0 0 #fff) drop-shadow(0 0 0 #ed1d24);
    }
    30% {
      transform: scale(1.6);
      filter: drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #ed1d24);
    }
    60% {
      transform: scale(1.1);
      filter: drop-shadow(0 0 8px #fff) drop-shadow(0 0 4px #ed1d24);
    }
    100% {
      transform: scale(1);
      filter: drop-shadow(0 0 0 #fff) drop-shadow(0 0 0 #ed1d24);
    }
  }
  @media (max-width: 600px) {
    .card {
      width: 100%;
    }
  }
`;
