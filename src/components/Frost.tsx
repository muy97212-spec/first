/* FIRST — frosted on-image surface.
 * The brand's only use of blur: controls sitting on a photograph. A backdrop
 * blur, a faint white fill, and a hairline white border — the recipe shared by
 * on-image buttons, chips, and capture-screen chrome.
 */
import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { onImage } from '../theme';

export function Frost({
  radius = 999,
  intensity = 22,
  fill = onImage.fill,
  border = true,
  style,
  children,
}: {
  radius?: number;
  intensity?: number;
  fill?: string;
  border?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}) {
  return (
    <View
      style={[
        {
          borderRadius: radius,
          overflow: 'hidden',
          borderWidth: border ? 1 : 0,
          borderColor: onImage.hairline,
        },
        style,
      ]}
    >
      <BlurView intensity={intensity} tint="light" style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: fill }]} />
      {children}
    </View>
  );
}
