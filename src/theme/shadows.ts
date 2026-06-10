/* FIRST — shadows. Quiet, large-radius, warm-tinted. RN can't stack shadow
 * layers, so each is the dominant layer of its CSS counterpart, plus an
 * Android elevation. Editorial UI prefers hairlines over heavy lifts. */
import type { ViewStyle } from 'react-native';

const warm = '#16130F'; // ink-900

/** A photographic print lifted off the paper. */
export const shadowPrint: ViewStyle = {
  shadowColor: warm,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.14,
  shadowRadius: 10,
  elevation: 4,
};

/** Resting card. */
export const shadowCard: ViewStyle = {
  shadowColor: warm,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.1,
  shadowRadius: 24,
  elevation: 3,
};

/** Bottom sheet / large floating surface. */
export const shadowSheet: ViewStyle = {
  shadowColor: warm,
  shadowOffset: { width: 0, height: 24 },
  shadowOpacity: 0.18,
  shadowRadius: 40,
  elevation: 12,
};

/** Floating layer (device drop shadow, etc.). */
export const shadowFloat: ViewStyle = {
  shadowColor: warm,
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.22,
  shadowRadius: 40,
  elevation: 10,
};
