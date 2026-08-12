import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { VaultHomeScreen } from '../screens/vault/VaultHomeScreen';
import { FormAssistantScreen } from '../screens/assistant/FormAssistantScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { Icon, IconName } from '../components/Icon';
import { palette } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TABS: { name: keyof MainTabParamList; label: string; icon: IconName }[] = [
  { name: 'VaultHome', label: 'Vault', icon: 'vault' },
  { name: 'Assistant', label: 'Assistant', icon: 'chat' },
  { name: 'Settings', label: 'Settings', icon: 'sliders' },
];

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const meta = TABS.find((t) => t.name === route.name)!;
        return {
          headerShown: false,
          tabBarActiveTintColor: palette.brand,
          tabBarInactiveTintColor: palette.inkMuted,
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={meta.icon}
              size={22}
              color={color}
              stroke={focused ? 2.4 : 2}
            />
          ),
          tabBarLabel: meta.label,
          tabBarLabelStyle: styles.label,
          tabBarStyle: styles.bar,
          tabBarItemStyle: styles.item,
          tabBarHideOnKeyboard: true,
        };
      }}
    >
      <Tab.Screen name="VaultHome" component={VaultHomeScreen} />
      <Tab.Screen name="Assistant" component={FormAssistantScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: palette.surface,
    borderTopWidth: 1,
    borderTopColor: palette.border,
    paddingTop: 6,
  },
  item: {
    paddingBottom: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});
