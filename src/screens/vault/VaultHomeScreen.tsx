import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MainTabParamList, VaultStackParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { SearchBar } from '../../components/SearchBar';
import { Chip } from '../../components/Chip';
import { SectionHeader } from '../../components/SectionHeader';
import { VaultItemCard } from '../../components/VaultItemCard';
import { Badge } from '../../components/Badge';
import { Icon } from '../../components/Icon';
import { EmptyState } from '../../components/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { useVault } from '../../context/VaultContext';
import { CATEGORY_LABELS } from '../../data/documentTypes';
import { greetingForTime } from '../../utils/format';
import { palette, radius, spacing, typography } from '../../theme';

type Props = BottomTabScreenProps<MainTabParamList, 'VaultHome'>;

const CATEGORY_FILTERS: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  ...Object.entries(CATEGORY_LABELS).map(([key, label]) => ({ key, label })),
];

export function VaultHomeScreen(_props: Props) {
  const { documents } = useVault();
  const { lock } = useAuth();
  const stackNav = useNavigation<NativeStackNavigationProp<VaultStackParamList>>();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      const matchesCategory = filter === 'all' || doc.category === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        doc.title.toLowerCase().includes(q) ||
        doc.reference.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [documents, filter, query]);

  return (
    <Screen edges={['top']} style={styles.flex}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemWrap}>
            <VaultItemCard
              document={item}
              onPress={() => stackNav.navigate('DocumentDetail', { document: item })}
            />
          </View>
        )}
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.greeting}>{greetingForTime()}</Text>
                <Text style={styles.welcome}>Welcome to StrongHold</Text>
              </View>
              <Pressable onPress={lock} style={styles.lockButton} hitSlop={8}>
                <Icon name="lock" size={18} color={palette.brand} />
              </Pressable>
            </View>

            <View style={styles.hero}>
              <View style={styles.heroTop}>
                <View style={styles.heroIconWrap}>
                  <Icon name="shieldCheck" size={28} color={palette.brand} />
                </View>
                <View style={styles.heroText}>
                  <Text style={styles.heroTitle}>Vault secured</Text>
                  <Text style={styles.heroSubtitle}>AES-256-GCM · key in Android Keystore</Text>
                </View>
              </View>
              <View style={styles.heroStats}>
                <Badge tone="success" dot label={`${documents.length} documents`} />
                <Badge label="Hardware-backed key" />
              </View>
            </View>

            <SearchBar
              value={query}
              onChangeText={setQuery}
              placeholder="Search Aadhaar, PAN, license…"
              style={styles.search}
            />

            <View style={styles.chips}>
              {CATEGORY_FILTERS.map((c) => (
                <Chip
                  key={c.key}
                  label={c.label}
                  active={filter === c.key}
                  onPress={() => setFilter(c.key)}
                />
              ))}
            </View>

            <View style={styles.sectionHeaderWrap}>
              <SectionHeader
                title="Your documents"
                subtitle={filter === 'all' ? `${filtered.length} encrypted files` : undefined}
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon={<Icon name="vault" size={34} color={palette.brand} />}
            title="No documents found"
            subtitle={
              query.trim().length > 0 || filter !== 'all'
                ? 'Try a different search or category.'
                : 'Your vault is empty. Add your first document to get started.'
            }
            actionLabel="Add document"
            onAction={() => stackNav.navigate('AddDocument')}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Pressable
        style={({ pressed }) => [styles.fab, pressed ? styles.fabPressed : null]}
        onPress={() => stackNav.navigate('AddDocument')}
      >
        <Icon name="plus" size={24} color="#FFFFFF" />
      </Pressable>
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
  greeting: {
    ...typography.label,
    fontSize: 14,
    color: palette.inkMuted,
  },
  welcome: {
    ...typography.title,
    fontSize: 22,
  },
  lockButton: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    backgroundColor: palette.brandSoft,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: '#DDE2FF',
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  heroIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    flex: 1,
  },
  heroTitle: {
    ...typography.heading,
    fontSize: 17,
  },
  heroSubtitle: {
    ...typography.caption,
    fontSize: 12,
    marginTop: 2,
  },
  heroStats: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
    flexWrap: 'wrap',
  },
  search: {
    marginBottom: spacing.lg,
  },
  chips: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
    marginBottom: spacing.xxl,
  },
  sectionHeaderWrap: {
    marginTop: 0,
  },
  itemWrap: {
    marginBottom: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: 120,
  },
  fab: {
    position: 'absolute',
    right: spacing.xl,
    bottom: spacing.xxl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.brand,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: palette.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  fabPressed: {
    backgroundColor: palette.brandDeep,
  },
});
