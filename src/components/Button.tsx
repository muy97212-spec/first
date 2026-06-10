/* FIRST — Button.
 * The interface's primary control. Variants: primary (ink), secondary
 * (outline), ghost, accent (amber), on-image (frosted, for photos/cinema).
 * Ported from components/core/Button.jsx.
 */
import React from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { ink, radius, space, onImage as onImageTokens, useTheme, sans } from '../theme';
import { Frost } from './Frost';
import { usePressScale } from './usePressScale';
import { tintIcon } from './icon-util';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'on-image';
export type ButtonSize = 'sm' | 'md' | 'lg';

const SIZES: Record<ButtonSize, { padV: number; padH: number; font: number }> = {
  sm: { padV: 8, padH: 14, font: 13 },
  md: { padV: 11, padH: 20, font: 15 },
  lg: { padV: 15, padH: 28, font: 16 },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'default',
  block = false,
  icon = null,
  iconRight = null,
  disabled = false,
  onPress,
  style,
}: {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: 'default' | 'pill';
  block?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  const { scaleStyle, onPressIn, onPressOut } = usePressScale(0.97);
  const s = SIZES[size];
  const br = shape === 'pill' ? radius.pill : radius.md;
  const onImage = variant === 'on-image';

  const fill =
    variant === 'primary'
      ? ink[900]
      : variant === 'accent'
        ? colors.accent.base
        : 'transparent';
  const textColor =
    variant === 'primary'
      ? colors.text.inverse
      : variant === 'accent'
        ? '#fff'
        : onImage
          ? '#fff'
          : variant === 'ghost'
            ? colors.text.secondary
            : colors.text.primary;
  const borderColor =
    variant === 'secondary'
      ? colors.line.strong
      : onImage
        ? onImageTokens.hairline
        : 'transparent';

  return (
    <Animated.View style={[block && styles.block, scaleStyle, style]}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          styles.base,
          {
            paddingVertical: s.padV,
            paddingHorizontal: s.padH,
            borderRadius: br,
            backgroundColor: fill,
            borderColor,
            opacity: disabled ? 0.4 : 1,
          },
          block && styles.block,
          onImage && { overflow: 'hidden' },
        ]}
      >
        {onImage && <Frost radius={br} intensity={20} style={StyleSheet.absoluteFill} border={false} />}
        <View style={styles.row}>
          {tintIcon(icon, textColor, s.font + 2)}
          {children != null && (
            <Text style={[sans(s.font, { weight: 500 }), { color: textColor }]} numberOfLines={1}>
              {children}
            </Text>
          )}
          {tintIcon(iconRight, textColor, s.font + 2)}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: space[2] },
  block: { width: '100%' },
});
