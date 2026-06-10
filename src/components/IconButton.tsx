/* FIRST — IconButton.
 * A round, icon-only control. Variants: ghost, outline, solid (ink),
 * on-image (frosted). Ported from components/core/IconButton.jsx.
 */
import React from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { ink, radius, onImage as onImageTokens, useTheme } from '../theme';
import { Frost } from './Frost';
import { usePressScale } from './usePressScale';
import { tintIcon } from './icon-util';

export type IconButtonVariant = 'ghost' | 'outline' | 'solid' | 'on-image';
export type IconButtonSize = 'sm' | 'md' | 'lg';

const DIM: Record<IconButtonSize, number> = { sm: 34, md: 44, lg: 56 };
const ICON: Record<IconButtonSize, number> = { sm: 15, md: 19, lg: 23 };

export function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  label,
  disabled = false,
  onPress,
  style,
}: {
  children?: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  label?: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  const { scaleStyle, onPressIn, onPressOut } = usePressScale(0.93);
  const dim = DIM[size];
  const onImage = variant === 'on-image';

  const bg = variant === 'solid' ? ink[900] : 'transparent';
  const borderColor =
    variant === 'outline'
      ? colors.line.strong
      : onImage
        ? onImageTokens.hairline
        : 'transparent';
  const iconColor =
    variant === 'solid' ? colors.text.inverse : onImage ? '#fff' : colors.text.primary;

  return (
    <Animated.View style={[scaleStyle, style]}>
      <Pressable
        accessibilityLabel={label}
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          styles.base,
          {
            width: dim,
            height: dim,
            borderRadius: radius.pill,
            backgroundColor: bg,
            borderColor,
            opacity: disabled ? 0.4 : 1,
          },
          onImage && { overflow: 'hidden' },
        ]}
      >
        {onImage && <Frost radius={radius.pill} intensity={20} style={StyleSheet.absoluteFill} border={false} />}
        <View>{tintIcon(children, iconColor, ICON[size])}</View>
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
});
