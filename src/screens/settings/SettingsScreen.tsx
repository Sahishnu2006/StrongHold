import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ToggleRow } from '../../components/ToggleRow';
import { SectionHeader } from '../../components/SectionHeader';
import { Icon } from '../../components/Icon';
import { useAuth } from '../../context/AuthContext';
import { palette, radius, spacing, typography } from '../../theme';

type Props = BottomTabScreenProps<MainTabParamList, 'Settings'>;

interface LinkRowProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  destructive?: boolean;
}

function LinkRow({ icon, title, subtitle, onPress, destructive = false }: LinkRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.linkRow, pressed ? styles.linkRowPressed : null]}
    >
      <View style={[styles.linkIcon, destructive ? styles.linkIconDanger : null]}>{icon}</View>
      <View style={styles.linkText}>
        <Text style={[styles.linkTitle, destructive ? styles.linkTitleDanger : null]}>{title}</Text>
        {subtitle ? <Text style={styles.linkSubtitle}>{subtitle}</Text> : null}
      </View>
      <Icon name="chevronRight" size={16} color={palette.inkMuted} />
    </Pressable>
  );
}

export function SettingsScreen(_props: Props) {
  const { lock } = useAuth();
  const [biometric, setBiometric] = useState(true);
  const [autoLock, setAutoLock] = useState(true);
  const [hardwareKey, setHardwareKey] = useState(true);

  const confirmClear = () => {
    Alert.alert(
      'Clear encrypted vault?',
      'All stored documents will be permanently deleted from this device. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear vault', style: 'destructive', onPress: () => {} },
      ],
    );
  };

  const notify = (feature: string) => {
    Alert.alert('Coming soon', `${feature} will be available once native modules are connected.`);
  };

  return (
    <Screen scroll style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Security & preferences</Text>
      </View>

      <View style={styles.securityHero}>
        <View style={styles.securityHeroIcon}>
          <Icon name="shieldCheck" size={26} color="#FFFFFF" />
        </View>
        <View style={styles.securityHeroText}>
          <Text style={styles.securityHeroTitle}>Hardware-backed encryption active</Text>
          <Text style={styles.securityHeroSubtitle}>
            AES-256-GCM · key generated on your device\u2019s secure chip
          </Text>
        </View>
      </View>

      <SectionHeader title="Security" />
      <Card padding={16}>
        <ToggleRow
          icon={<Icon name="scan" size={18} color={palette.brand} />}
          title="Biometric unlock"
          subtitle="Unlock with fingerprint or face"
          value={biometric}
          onValueChange={setBiometric}
        />
        <View style={styles.divider} />
        <ToggleRow
          icon={<Icon name="clock" size={18} color={palette.brand} />}
          title="Auto-lock"
          subtitle="Lock the vault after 1 minute"
          value={autoLock}
          onValueChange={setAutoLock}
        />
        <View style={styles.divider} />
        <ToggleRow
          icon={<Icon name="lock" size={18} color={palette.brand} />}
          title="Hardware key protection"
          subtitle="Key never leaves the Android Keystore"
          value={hardwareKey}
          onValueChange={setHardwareKey}
        />
      </Card>

      <View style={styles.sectionGap}>
        <SectionHeader title="Data" />
        <Card padding={4}>
          <LinkRow
            icon={<Icon name="download" size={18} color={palette.brand} />}
            title="Export encrypted vault"
            subtitle="Backup file, still encrypted"
            onPress={() => notify('Exporting your encrypted vault')}
          />
          <View style={styles.dividerInset} />
          <LinkRow
            icon={<Icon name="trash" size={18} color={palette.danger} />}
            title="Clear vault"
            subtitle="Delete all stored documents"
            onPress={confirmClear}
            destructive
          />
        </Card>
      </View>

      <View style={styles.sectionGap}>
        <SectionHeader title="Language" />
        <Card padding={4}>
          <LinkRow
            icon={<Icon name="globe" size={18} color={palette.brand} />}
            title="App & assistant language"
            subtitle="English (Bhashini enabled)"
            onPress={() => notify('Choosing a language')}
          />
        </Card>
      </View>

      <View style={styles.sectionGap}>
        <SectionHeader title="About" />
        <Card padding={16}>
          <View style={styles.aboutRow}>
            <View style={styles.aboutBrand}>
              <Icon name="vault" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.aboutText}>
              <Text style={styles.aboutName}>StrongHold</Text>
              <Text style={styles.aboutVersion}>Version 1.0.0 (build 1)</Text>
            </View>
          </View>
          <View style={styles.aboutBody}>
            <Text style={styles.aboutBodyText}>
              StrongHold keeps your identity documents encrypted on your device and helps you fill
              government forms safely. Built with React Native.
            </Text>
          </View>
        </Card>
      </View>

      <Button
        label="Lock vault now"
        variant="secondary"
        onPress={lock}
        leading={<Icon name="lock" size={18} color={palette.ink} />}
        style={styles.lockButton}
      />

      <Text style={styles.footer}>StrongHold · v1.0.0 · React Native</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.title,
    fontSize: 22,
  },
  subtitle: {
    ...typography.caption,
    marginTop: 2,
  },
  securityHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: palette.brand,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xxxl,
  },
  securityHeroIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityHeroText: {
    flex: 1,
    gap: 2,
  },
  securityHeroTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  securityHeroSubtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    lineHeight: 17,
  },
  divider: {
    height: 1,
    backgroundColor: palette.border,
    marginLeft: 54,
  },
  dividerInset: {
    height: 1,
    backgroundColor: palette.border,
    marginLeft: 20,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  linkRowPressed: {
    backgroundColor: palette.canvas,
  },
  linkIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    backgroundColor: palette.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkIconDanger: {
    backgroundColor: palette.dangerSoft,
  },
  linkText: {
    flex: 1,
    gap: 2,
  },
  linkTitle: {
    ...typography.bodyStrong,
    fontSize: 14,
  },
  linkTitleDanger: {
    color: palette.danger,
  },
  linkSubtitle: {
    ...typography.caption,
    fontSize: 12,
  },
  sectionGap: {
    marginTop: spacing.xxl,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  aboutBrand: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: palette.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutText: {
    flex: 1,
  },
  aboutName: {
    ...typography.bodyStrong,
    fontSize: 15,
  },
  aboutVersion: {
    ...typography.caption,
    fontSize: 12,
  },
  aboutBody: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  aboutBodyText: {
    ...typography.body,
    fontSize: 13,
    lineHeight: 20,
  },
  lockButton: {
    marginTop: spacing.xxl,
  },
  footer: {
    ...typography.caption,
    fontSize: 11,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
});
