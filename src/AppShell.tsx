/* FIRST — app shell. Routes between the five screens and flips the Paper /
 * Cinema world per view. Mirrors the prototype's App.jsx state machine:
 * camera → result → archive → detail → you.
 */
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import {
  CameraScreen,
  CaptureResultScreen,
  ArchiveScreen,
  MemoryDetailScreen,
  YearRecapScreen,
} from './screens';
import type { ViewName } from './screens/types';
import type { Memory } from './data';
import { ThemeProvider, themes } from './theme';

export function AppShell() {
  const [view, setView] = useState<ViewName>('camera');
  const [mem, setMem] = useState<Memory | undefined>(undefined);

  const go = useCallback((next: ViewName, payload?: Memory) => {
    if (payload !== undefined) setMem(payload);
    setView(next);
  }, []);

  const tab = view === 'you' ? 'you' : view === 'archive' || view === 'detail' ? 'archive' : 'capture';
  const setTab = useCallback(
    (id: string) => go(id === 'capture' ? 'camera' : id === 'you' ? 'you' : 'archive'),
    [go],
  );

  const dark = view === 'camera' || view === 'result' || view === 'detail';
  const mode = dark ? 'cinema' : 'paper';

  const screen = useMemo(() => {
    switch (view) {
      case 'camera':
        return <CameraScreen go={go} />;
      case 'result':
        return <CaptureResultScreen go={go} memory={mem} />;
      case 'archive':
        return <ArchiveScreen go={go} tab={tab} setTab={setTab} />;
      case 'detail':
        return <MemoryDetailScreen go={go} memory={mem} />;
      case 'you':
        return <YearRecapScreen go={go} tab={tab} setTab={setTab} />;
    }
  }, [view, mem, go, tab, setTab]);

  return (
    <ThemeProvider mode={mode}>
      <View style={[styles.root, { backgroundColor: themes[mode].surface.page }]}>
        <StatusBar style={dark ? 'light' : 'dark'} />
        {screen}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
