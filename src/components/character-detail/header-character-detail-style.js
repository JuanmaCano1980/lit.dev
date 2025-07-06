import { css } from 'lit';

export const headerCharacterDetailStyle = css`
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

    .favorite-section {
        position: absolute;
        top: 2.5rem;
        right: 2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
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
        .main-detail-content {
            padding: 1rem 0.3rem 1rem 0.3rem;
        }
    }
`;
