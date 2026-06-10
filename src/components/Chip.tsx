/* FIRST — Chip.
 * A small tracked-mono capsule. Variants: outline, solid (ink), accent (amber
 * wash), on-image (frosted). Ported from components/core/Chip.jsx.
 */
import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { ink, amber, radius, space, onImage as onImageTokens, useTheme, mono } from '../theme';
import { Frost } from './Frost';

export type ChipVariant = 'outline' | 'solid' | 'accent' | 'on-image';
export type ChipSize = 'sm' | 'md';

const SIZES: Record<ChipSize, { font: number; padV: number; padH: number }> = {
  sm: { font: 10, padV: 6, padH: 11 },
  md: { font: 11.5, padV: 8, padH: 14 },
};

export function Chip({
  children,
  variant = 'outline',
  size = 'md',
  dot = false,
  style,
}: {
  children?: React.ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  const s = SIZES[size];
  const onImage = variant === 'on-image';

  const bg =
    variant === 'solid' ? ink[900] : variant === 'accent' ? colors.accent.soft : 'transparent';
  const color =
    variant === 'solid'
      ? colors.text.inverse
      : variant === 'accent'
        ? amber[600]
        : onImage
          ? '#fff'
          : colors.text.secondary;
  const borderColor =
    variant === 'outline'
      ? colors.line.strong
      : onImage
        ? onImageTokens.hairline
        : 'transparent';

  return (
    <View
      style={[
        styles.base,
        {
          paddingVertical: s.padV,
          paddingHorizontal: s.padH,
          borderRadius: radius.pill,
          backgroundColor: bg,
          borderColor,
        },
        onImage && { overflow: 'hidden' },
        style,
      ]}
    >
      {onImage && <Frost radius={radius.pill} intensity={16} style={StyleSheet.absoluteFill} border={false} />}
      {dot && <View style={[styles.dot, { backgroundColor: color }]} />}
      <Text style={[mono(s.font, { weight: 500 }), { color }]} numberOfLines={1}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: { width: 5, height: 5, borderRadius: 2.5, opacity: 0.85 },
});
