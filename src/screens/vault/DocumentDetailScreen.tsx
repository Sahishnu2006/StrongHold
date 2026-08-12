import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { VaultStackParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Glyph } from '../../components/Glyph';
import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { Icon } from '../../components/Icon';
import { useVault } from '../../context/VaultContext';
import { DOCUMENT_TYPES, CATEGORY_LABELS } from '../../data/documentTypes';
import { palette, radius, spacing, typography } from '../../theme';

type Props = NativeStackScreenProps<VaultStackParamList, 'DocumentDetail'>;

export function DocumentDetailScreen({ navigation, route }: Props) {
  const { document } = route.params;
  const { removeDocument } = useVault();
  const [revealed, setRevealed] = useState(false);

  const meta = DOCUMENT_TYPES[document.type];

  const confirmDelete = () => {
    Alert.alert(
      'Delete document?',
      `"${document.title}" will be permanently removed from the encrypted vault.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeDocument(document.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  const notify = (feature: string) => {
    Alert.alert('Coming soon', `${feature} will be available once native modules are connected.`);
  };

  return (
    <Screen scroll style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8} style={styles.backButton}>
          <Icon name="back" size={16} color={palette.inkSoft} />
        </Pressable>
        <Text style={styles.headerTitle}>Document</Text>
        <Pressable onPress={confirmDelete} hitSlop={8}>
          <Icon name="trash" size={18} color={palette.danger} />
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Glyph mono={meta.mono} tint={meta.tint} soft={meta.soft} size={72} />
        <Text style={styles.title}>{document.title}</Text>
        <Text style={styles.reference}>{document.reference}</Text>
        <View style={styles.badges}>
          <Badge label={CATEGORY_LABELS[document.category]} />
          <Badge tone="success" dot label="Encrypted" />
        </View>
      </View>

      <Card style={styles.encryptedCard}>
        <View style={styles.encryptedIcon}>
          <Icon name="lock" size={22} color={palette.success} />
        </View>
        <View style={styles.encryptedText}>
          <Text style={styles.encryptedTitle}>AES-256-GCM encrypted</Text>
          <Text style={styles.encryptedSubtitle}>
            Decryption key stored in Android Keystore (hardware-backed TEE). Size {document.size} ·
            added {document.addedAt}
          </Text>
        </View>
      </Card>

      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>Stored details</Text>
        {document.fields.some((f) => f.masked) ? (
          <Pressable onPress={() => setRevealed((v) => !v)} hitSlop={8} style={styles.revealButton}>
            <Icon name={revealed ? 'eyeOff' : 'eye'} size={16} color={palette.brand} />
            <Text style={styles.revealText}>{revealed ? 'Hide' : 'Reveal'}</Text>
          </Pressable>
        ) : null}
      </View>

      <Card padding={4}>
        {document.fields.map((field, i) => (
          <View
            key={field.label}
            style={[styles.fieldRow, i > 0 ? styles.fieldRowBorder : null]}
          >
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <Text style={[styles.fieldValue, field.masked && !revealed ? styles.fieldMasked : null]}>
              {field.masked && !revealed ? `\u2022\u2022\u2022\u2022\u2022\u2022` : field.value}
            </Text>
          </View>
        ))}
      </Card>

      <View style={styles.actions}>
        <Button label="View decrypted" onPress={() => notify('Viewing the decrypted file')} />
        <View style={styles.actionRow}>
          <Button
            label="Download"
            variant="secondary"
            onPress={() => notify('Downloading a decrypted copy')}
            leading={<Icon name="download" size={18} color={palette.ink} />}
            style={styles.actionHalf}
          />
          <Button
            label="Share"
            variant="secondary"
            onPress={() => notify('Sharing a decrypted copy')}
            leading={<Icon name="share" size={18} color={palette.ink} />}
            style={styles.actionHalf}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.heading,
  },
  hero: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.title,
    fontSize: 20,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  reference: {
    ...typography.body,
    fontSize: 13,
    marginTop: spacing.xs,
    fontVariant: ['tabular-nums'],
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  encryptedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  encryptedIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: palette.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  encryptedText: {
    flex: 1,
    gap: 2,
  },
  encryptedTitle: {
    ...typography.bodyStrong,
    fontSize: 14,
  },
  encryptedSubtitle: {
    ...typography.caption,
    fontSize: 12,
    lineHeight: 17,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.heading,
    fontSize: 16,
  },
  revealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  revealText: {
    color: palette.brand,
    fontSize: 13,
    fontWeight: '700',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  fieldRowBorder: {
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  fieldLabel: {
    ...typography.caption,
    fontSize: 12,
  },
  fieldValue: {
    ...typography.bodyStrong,
    fontSize: 14,
    flexShrink: 1,
    textAlign: 'right',
  },
  fieldMasked: {
    letterSpacing: 3,
    color: palette.inkMuted,
  },
  actions: {
    marginTop: spacing.xxl,
    gap: spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionHalf: {
    flex: 1,
  },
});
