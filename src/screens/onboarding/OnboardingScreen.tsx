import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { palette, radius, spacing, typography } from '../../theme';
import { Button } from '../../components/Button';
import { Icon, IconName } from '../../components/Icon';

interface Slide {
  icon: IconName;
  title: string;
  body: string;
}

const SLIDES: Slide[] = [
  {
    icon: 'vault',
    title: 'Your documents, truly yours',
    body: 'Aadhaar, PAN, licences and marks cards live in an encrypted vault. Every file is sealed with AES-256 using a key that never leaves your phone\u2019s secure chip.',
  },
  {
    icon: 'chat',
    title: 'A form assistant in every language',
    body: 'Tell the assistant what you want to fill. It opens the official form, guides you field by field, and talks back in your language \u2014 powered by Bhashini.',
  },
  {
    icon: 'shieldCheck',
    title: 'Fill with confidence',
    body: 'Before you type, StrongHold checks a form for red flags and marks fields you should not fill. If a form looks malicious, you will know instantly.',
  },
];

const { width } = Dimensions.get('window');

export function OnboardingScreen() {
  const { completeOnboarding } = useAuth();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const isLast = index === SLIDES.length - 1;

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(Math.max(0, Math.min(SLIDES.length - 1, page)));
  };

  const goNext = () => {
    if (isLast) {
      completeOnboarding();
      return;
    }
    scrollRef.current?.scrollTo({ x: (index + 1) * width, animated: true });
  };

  const skip = () => {
    scrollRef.current?.scrollTo({ x: (SLIDES.length - 1) * width, animated: true });
  };

  const slide = SLIDES[index];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topRow}>
        <View style={styles.brandMark}>
          <Icon name="vault" size={18} color="#FFFFFF" stroke={2.2} />
        </View>
        <Text style={styles.brandText}>StrongHold</Text>
        <Text style={styles.counter}>
          {index + 1} / {SLIDES.length}
        </Text>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEnd}
      >
        {SLIDES.map((s) => (
          <View key={s.title} style={[styles.page, { width }]}>
            <View style={styles.graphicWrap}>
              <View style={styles.graphicRing}>
                <Icon name={s.icon} size={72} color={palette.brand} stroke={1.8} />
              </View>
            </View>
            <View style={styles.copyBlock}>
              <Text style={styles.title}>{s.title}</Text>
              <Text style={styles.body}>{s.body}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === index ? styles.dotActive : null]} />
        ))}
      </View>

      <View style={styles.footer}>
        <Button label={isLast ? 'Open my vault' : 'Continue'} onPress={goNext} />
        {!isLast ? (
          <Button label="Skip" variant="ghost" size="md" onPress={skip} />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.canvas,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  brandMark: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: palette.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    ...typography.label,
    fontSize: 16,
    flex: 1,
  },
  counter: {
    ...typography.micro,
    color: palette.inkMuted,
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  graphicWrap: {
    marginBottom: spacing.xxxl,
  },
  graphicRing: {
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: palette.brandSoft,
    borderWidth: 1,
    borderColor: '#DDE2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyBlock: {
    alignItems: 'center',
  },
  title: {
    ...typography.display,
    fontSize: 26,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  body: {
    ...typography.body,
    textAlign: 'center',
    fontSize: 15,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xxxl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: palette.brand,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.sm,
  },
});
