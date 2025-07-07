import { css } from 'lit';

// Breakpoints as fixed values to use in Shadow DOM
export const breakpoints = {
  tablet: 834,
  desktop: 1024,
  wide: 1200,
};

// Helper function to create media queries
export const mq = (breakpoint) => (styles) => css`
  @media (min-width: ${breakpoints[breakpoint]}px) {
    ${styles}
  }
`;

// Predefined media queries
export const mediaQueries = {
  tablet: mq('tablet'),
  desktop: mq('desktop'),
  wide: mq('wide'),
};
