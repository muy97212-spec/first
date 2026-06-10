/* FIRST — motion. Calm and cinematic; nothing bounces.
 * The CSS easings as RN Easing functions. */
import { Easing } from 'react-native';
import { easeOut, easeCinematic, easeInOut } from './tokens';

export const easing = {
  out: Easing.bezier(...easeOut),
  cinematic: Easing.bezier(...easeCinematic), // the "develop" reveal
  inOut: Easing.bezier(...easeInOut),
};

export { duration } from './tokens';
