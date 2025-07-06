import { css } from 'lit';

export const favoriteButtonStyle = css`
  :host {
    display: inline-block;
    position: relative;
    z-index: 10;
  }

  .favorite-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    position: relative;
    z-index: 10;
  }

  .favorite-btn:active {
    transform: scale(0.95);
  }

  .favorite-btn:hover .favorite-icon {
    transform: scale(1.1);
  }

  .favorite-icon {
    transition: all 0.2s ease;
    display: block;
    position: relative;
    z-index: 10;
  }

  .favorite-icon.pop {
    animation: pop-fav 0.45s cubic-bezier(0.4, 1.4, 0.6, 1) both;
  }

  @keyframes pop-fav {
    0% {
      transform: scale(1);
      filter: drop-shadow(0 0 0 #fff)
        drop-shadow(0 0 0 var(--marvel-red, #e62429));
    }
    30% {
      transform: scale(1.6);
      filter: drop-shadow(0 0 16px #fff)
        drop-shadow(0 0 8px var(--marvel-red, #e62429));
    }
    60% {
      transform: scale(1.1);
      filter: drop-shadow(0 0 8px #fff)
        drop-shadow(0 0 4px var(--marvel-red, #e62429));
    }
    100% {
      transform: scale(1);
      filter: drop-shadow(0 0 0 #fff)
        drop-shadow(0 0 0 var(--marvel-red, #e62429));
    }
  }

  /* Tamaños */
  .favorite-btn.small .favorite-icon {
    width: 15px;
    height: 14px;
  }

  .favorite-btn.medium .favorite-icon {
    width: 18px;
    height: 17px;
  }

  .favorite-btn.large .favorite-icon {
    width: 22px;
    height: 21px;
  }
`;
