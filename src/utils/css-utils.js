import { css } from 'lit';

// Breakpoints como valores fijos para usar en Shadow DOM
export const breakpoints = {
  tablet: 834,
  desktop: 1024,
  wide: 1200,
};

// Función helper para crear media queries
export const mq = (breakpoint) => (styles) => css`
  @media (min-width: ${breakpoints[breakpoint]}px) {
    ${styles}
  }
`;

// Media queries predefinidas
export const mediaQueries = {
  tablet: mq('tablet'),
  desktop: mq('desktop'),
  wide: mq('wide'),
};
