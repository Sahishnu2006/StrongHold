import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { LockScreen } from '../screens/auth/LockScreen';
import { MainTabs } from './MainTabs';
import { AddDocumentScreen } from '../screens/vault/AddDocumentScreen';
import { DocumentDetailScreen } from '../screens/vault/DocumentDetailScreen';
import { VaultStackParamList } from './types';

const Stack = createNativeStackNavigator<VaultStackParamList>();

export function RootNavigator() {
  const { stage } = useAuth();

  if (stage === 'onboarding') {
    return <OnboardingScreen />;
  }

  if (stage === 'locked') {
    return <LockScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="AddDocument"
        component={AddDocumentScreen}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen name="DocumentDetail" component={DocumentDetailScreen} />
    </Stack.Navigator>
  );
}
