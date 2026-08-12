import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { VaultProvider } from './src/context/VaultContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { palette } from './src/theme';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: palette.canvas,
    card: palette.surface,
    text: palette.ink,
    border: palette.border,
    primary: palette.brand,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <VaultProvider>
          <NavigationContainer theme={navTheme}>
            <StatusBar barStyle="dark-content" backgroundColor={palette.canvas} />
            <RootNavigator />
          </NavigationContainer>
        </VaultProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
