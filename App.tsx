/* FIRST — entry. Loads the three brand font families, holds the splash until
 * they're ready, then mounts the app inside a safe-area provider.
 */
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppShell } from './src/AppShell';
import { fontFaces, paperTheme } from './src/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [loaded, error] = useFonts(fontFaces);

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync().catch(() => {});
  }, [loaded, error]);

  const onLayout = useCallback(() => {
    if (loaded || error) SplashScreen.hideAsync().catch(() => {});
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: paperTheme.surface.page }} onLayout={onLayout}>
        <AppShell />
      </View>
    </SafeAreaProvider>
  );
}
