import React, { useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { SearchBar } from '../../components/SearchBar';
import { Chip } from '../../components/Chip';
import { SectionHeader } from '../../components/SectionHeader';
import { FormCard } from '../../components/FormCard';
import { AssistantBubble } from '../../components/AssistantBubble';
import { Badge } from '../../components/Badge';
import { Icon } from '../../components/Icon';
import { MOCK_FORMS, LANGUAGES, CHAT_PREVIEW } from '../../data/mockForms';
import { palette, radius, spacing, typography } from '../../theme';

type Props = BottomTabScreenProps<MainTabParamList, 'Assistant'>;

export function FormAssistantScreen(_props: Props) {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState(LANGUAGES[0]);

  const forms = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length === 0) {
      return MOCK_FORMS;
    }
    return MOCK_FORMS.filter((f) => f.name.toLowerCase().includes(q) || f.issuer.toLowerCase().includes(q));
  }, [query]);

  const onFormPress = (form: (typeof MOCK_FORMS)[number]) => {
    if (form.verdict === 'malicious') {
      Alert.alert(
        'Form blocked',
        `${form.name}\n\nThis form asks for sensitive data like your PAN number and bank OTP. StrongHold has blocked it to protect you.`,
        [{ text: 'Understood' }],
      );
      return;
    }
    Alert.alert(
      'Guided form filling',
      `${form.name}\n\n${form.issuer}\n\nThis opens the official form in a guided WebView overlay with field-by-field help. This feature activates when the AI layer is connected.`,
      [{ text: 'OK' }],
    );
  };

  return (
    <Screen edges={['top']} style={styles.flex}>
      <FlatList
        data={forms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.formWrap}>
            <FormCard form={item} onPress={() => onFormPress(item)} />
          </View>
        )}
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <View style={styles.headerText}>
                <Text style={styles.title}>Form Assistant</Text>
                <Text style={styles.subtitle}>Guided filling, in your language</Text>
              </View>
              <Badge tone="success" dot label="Online" />
            </View>

            <View style={styles.languageCard}>
              <View style={styles.languageHeader}>
                <Icon name="globe" size={16} color={palette.brand} />
                <Text style={styles.languageTitle}>Bhashini languages</Text>
                <Badge tone="brand" label="Bhashini" />
              </View>
              <View style={styles.languageChips}>
                {LANGUAGES.map((lang) => (
                  <Chip
                    key={lang}
                    label={lang}
                    active={language === lang}
                    onPress={() => setLanguage(lang)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.previewCard}>
              <View style={styles.previewHeader}>
                <View style={styles.previewTitleRow}>
                  <Icon name="spark" size={16} color={palette.brand} />
                  <Text style={styles.previewTitle}>Assistant preview</Text>
                </View>
                <Text style={styles.previewNote}>AI wiring comes next</Text>
              </View>
              <View style={styles.previewBody}>
                {CHAT_PREVIEW.map((m) => (
                  <AssistantBubble key={`${m.role}-${m.text.slice(0, 12)}`} role={m.role} text={m.text} />
                ))}
              </View>
            </View>

            <View style={styles.safetyCard}>
              <View style={styles.safetyIcon}>
                <Icon name="shieldCheck" size={20} color={palette.success} />
              </View>
              <View style={styles.safetyText}>
                <Text style={styles.safetyTitle}>Safety first</Text>
                <Text style={styles.safetyBody}>
                  Every form is checked before you type. Verified government forms are marked safe;
                  suspicious or malicious forms are blocked automatically.
                </Text>
              </View>
            </View>

            <View style={styles.searchWrap}>
              <SearchBar
                value={query}
                onChangeText={setQuery}
                placeholder="Search forms… e.g. licence, GST"
              />
            </View>

            <View style={styles.sectionHeaderWrap}>
              <SectionHeader
                title={query.trim().length > 0 ? 'Search results' : 'Suggested forms'}
                subtitle={query.trim().length > 0 ? undefined : 'Verified by StrongHold safety engine'}
              />
            </View>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  headerText: {
    gap: 2,
  },
  title: {
    ...typography.title,
    fontSize: 22,
  },
  subtitle: {
    ...typography.caption,
  },
  languageCard: {
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  languageTitle: {
    ...typography.bodyStrong,
    fontSize: 14,
    flex: 1,
  },
  languageChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  previewCard: {
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  previewTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  previewTitle: {
    ...typography.bodyStrong,
    fontSize: 14,
  },
  previewNote: {
    ...typography.caption,
    fontSize: 11,
    color: palette.warning,
  },
  previewBody: {
    marginTop: spacing.xs,
  },
  safetyCard: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: palette.successSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#C8ECE0',
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  safetyIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyText: {
    flex: 1,
    gap: 3,
  },
  safetyTitle: {
    ...typography.bodyStrong,
    fontSize: 14,
  },
  safetyBody: {
    ...typography.caption,
    fontSize: 12,
    lineHeight: 18,
    color: palette.inkSoft,
  },
  searchWrap: {
    marginBottom: spacing.lg,
  },
  sectionHeaderWrap: {
    marginTop: spacing.xs,
  },
  formWrap: {
    marginBottom: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.huge,
  },
});
