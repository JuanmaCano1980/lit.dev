import { css } from 'lit';

export const characterCardStyle = css`
  :host {
    display: block;
    cursor: pointer;
    user-select: none;
    flex-shrink: 0;
  }
  .card {
    width: 100%;
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
    height: 188px; /* Altura fija para consistencia */
    background: #222;
    overflow: hidden;
    border-bottom: 5px solid var(--marvel-red);
    position: relative;
  }
  .character-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top; /* Enfocar en la parte superior */
    display: block;
    transition: transform 0.35s cubic-bezier(0.4, 0.2, 0.2, 1);
    background: #222; /* Color de fondo mientras carga */
    opacity: 0;
    transition:
      opacity 0.3s ease,
      transform 0.35s cubic-bezier(0.4, 0.2, 0.2, 1);
  }

  .character-image[data-loaded='true'] {
    opacity: 1;
  }

  .image-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #222;
    z-index: 1;
  }

  .card:hover .character-image {
    transform: scale(1.08);
  }
  .card-footer {
    background: black;
    color: white;
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
    background: var(--marvel-red);
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

  /* Asegurar que el botón de favoritos esté siempre visible */
  favorite-button {
    position: relative;
    z-index: 10;
  }
`;
