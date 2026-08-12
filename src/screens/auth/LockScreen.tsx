import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { palette, radius, spacing, typography } from '../../theme';
import { PinPad } from '../../components/PinPad';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

export function LockScreen() {
  const { passcode, savePasscode, unlock } = useAuth();
  const [entered, setEntered] = useState('');
  const [error, setError] = useState('');
  const shake = useRef(new Animated.Value(0)).current;

  const firstRun = passcode.length === 0;

  const animateError = () => {
    Animated.sequence([
      Animated.timing(shake, { toValue: 1, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -1, duration: 80, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleChange = (next: string) => {
    setError('');
    setEntered(next);

    if (next.length !== 6) {
      return;
    }

    if (firstRun) {
      savePasscode(next);
      unlock();
      return;
    }

    if (next === passcode) {
      unlock();
      return;
    }

    animateError();
    setError('Incorrect PIN. Please try again.');
    setTimeout(() => {
      setEntered('');
      setError('');
    }, 1400);
  };

  const translateX = shake.interpolate({ inputRange: [-1, 1], outputRange: [-10, 10] });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.brandMark}>
          <Icon name="vault" size={22} color="#FFFFFF" stroke={2.2} />
        </View>
        <Text style={styles.brand}>StrongHold</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{firstRun ? 'Create a 6-digit PIN' : 'Enter your PIN'}</Text>
        <Text style={styles.subtitle}>
          {firstRun
            ? 'This PIN locks your vault on this device.'
            : 'Unlock your encrypted vault to continue.'}
        </Text>

        <Animated.View style={[styles.pinArea, { transform: [{ translateX }] }]}>
          <PinPad value={entered} onChange={handleChange} maxLength={6} />
        </Animated.View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <View style={styles.footer}>
        <Button label={firstRun ? 'Use biometric instead' : 'Forgot PIN?'} variant="ghost" size="md" />
        <View style={styles.securityNote}>
          <Icon name="shieldCheck" size={14} color={palette.success} />
          <Text style={styles.securityText}>AES-256 · Key kept on your device\u2019s secure chip</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.canvas,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.huge,
    gap: spacing.md,
  },
  brandMark: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: palette.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    ...typography.label,
    fontSize: 16,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  title: {
    ...typography.heading,
    fontSize: 20,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    fontSize: 13,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xxxl,
  },
  pinArea: {
    marginBottom: spacing.lg,
  },
  error: {
    color: palette.danger,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.lg,
  },
  securityText: {
    ...typography.caption,
    fontSize: 11,
  },
});
