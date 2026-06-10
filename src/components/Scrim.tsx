/* FIRST — protection scrims.
 * Gradient washes that keep text legible over photography. The only gradients
 * the brand allows. Ports --scrim-top / --scrim-bottom from the color tokens.
 */
import React from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { scrim } from '../theme';

type Variant = 'top' | 'bottom';

export function Scrim({
  variant,
  style,
}: {
  variant: Variant;
  style?: StyleProp<ViewStyle>;
}) {
  const stops = scrim[variant];
  const colors = stops.map((s) => s[0] as string) as [string, string, ...string[]];
  const locations = stops.map((s) => s[1] as number) as [number, number, ...number[]];

  // bottom scrim is anchored at the bottom edge (CSS 0deg); top at the top.
  const start = variant === 'bottom' ? { x: 0, y: 1 } : { x: 0, y: 0 };
  const end = variant === 'bottom' ? { x: 0, y: 0 } : { x: 0, y: 1 };

  return (
    <LinearGradient
      pointerEvents="none"
      colors={colors}
      locations={locations}
      start={start}
      end={end}
      style={[StyleSheet.absoluteFill, style]}
    />
  );
}
