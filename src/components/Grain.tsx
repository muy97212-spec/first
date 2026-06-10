/* FIRST — film grain.
 * The brand's quiet signature, overlaid on photographs and cinema surfaces.
 * Same technique as the web (fractal-noise turbulence), here via react-native-
 * svg. Absolutely fills its positioned parent; never intercepts touches.
 */
import React from 'react';
import { StyleSheet, type StyleProp, type ViewStyle, View } from 'react-native';
import Svg, { Defs, Filter, FeTurbulence, Rect } from 'react-native-svg';

export function Grain({
  opacity = 0.06,
  style,
}: {
  opacity?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity }, style]}>
      <Svg width="100%" height="100%">
        <Defs>
          <Filter id="grain" x="0" y="0" width="100%" height="100%">
            <FeTurbulence
              type="fractalNoise"
              baseFrequency={0.9}
              numOctaves={2}
              stitchTiles="stitch"
            />
          </Filter>
        </Defs>
        <Rect width="100%" height="100%" filter="url(#grain)" />
      </Svg>
    </View>
  );
}
