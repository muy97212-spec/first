/* FIRST — ShutterButton. Idle: a white ring around a white core. Busy: the
 * core contracts into an amber chip and the ring spins — "the moment is being
 * developed." Ported from components/capture/ShutterButton.jsx.
 */
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet } from 'react-native';
import { amber } from '../theme';

export function ShutterButton({
  size = 76,
  busy = false,
  label = 'Take photo',
  onPress,
}: {
  size?: number;
  busy?: boolean;
  label?: string;
  onPress?: () => void;
}) {
  const core = Math.round(size * 0.82);
  const coreScale = useRef(new Animated.Value(1)).current;
  const ringScale = useRef(new Animated.Value(1)).current;
  const busyAnim = useRef(new Animated.Value(0)).current; // 0 idle → 1 busy (JS driver)
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(coreScale, {
      toValue: busy ? 0.5 : 1,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    Animated.timing(busyAnim, {
      toValue: busy ? 1 : 0,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    if (busy) {
      spin.setValue(0);
      const loop = Animated.loop(
        Animated.timing(spin, {
          toValue: 1,
          duration: 900,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      loop.start();
      return () => loop.stop();
    }
  }, [busy, coreScale, busyAnim, spin]);

  const press = (to: number, ringTo: number) => {
    if (busy) return;
    Animated.timing(coreScale, { toValue: to, duration: 140, useNativeDriver: true }).start();
    Animated.timing(ringScale, { toValue: ringTo, duration: 140, useNativeDriver: true }).start();
  };

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const coreColor = busyAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', amber[400]],
  });
  const coreRadius = busyAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [core / 2, core * 0.28],
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ busy }}
      onPress={onPress}
      onPressIn={() => press(0.86, 0.96)}
      onPressOut={() => press(1, 1)}
      style={[styles.base, { width: size, height: size }]}
    >
      <Animated.View
        style={[
          styles.ring,
          {
            borderRadius: size / 2,
            borderColor: busy ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.92)',
            borderTopColor: busy ? amber[400] : 'rgba(255,255,255,0.92)',
            transform: [{ scale: ringScale }, { rotate }],
          },
        ]}
      />
      <Animated.View
        style={{
          width: core,
          height: core,
          borderRadius: coreRadius,
          backgroundColor: coreColor,
          transform: [{ scale: coreScale }],
        }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  ring: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 3,
  },
});
