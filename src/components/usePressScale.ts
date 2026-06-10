/* FIRST — press feedback. The brand presses scale down a touch, quick-eased,
 * never bouncy. Returns an animated transform plus Pressable handlers. */
import { useRef } from 'react';
import { Animated } from 'react-native';
import { easing, duration } from '../theme';

export function usePressScale(to = 0.97) {
  const scale = useRef(new Animated.Value(1)).current;
  const animate = (v: number) =>
    Animated.timing(scale, {
      toValue: v,
      duration: duration.quick,
      easing: easing.out,
      useNativeDriver: true,
    }).start();
  return {
    scaleStyle: { transform: [{ scale }] },
    onPressIn: () => animate(to),
    onPressOut: () => animate(1),
  };
}
