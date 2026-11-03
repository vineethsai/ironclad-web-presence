/**
 * Set by main.tsx while the app takes over a prerendered page. Components mounted during that
 * first render show their final state instead of playing entrance animations, so content that
 * is already on screen doesn't fade out and back in.
 */
export const boot = { prerendered: false };
