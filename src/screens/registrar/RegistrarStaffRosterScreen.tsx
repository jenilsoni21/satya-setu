/**
 * RegistrarStaffRosterScreen — Real-Time Faculty Campus Roster
 *
 * Dedicated gate registrar module:
 * • Campus head count progress (118 Checked-In / 150 Total Cadre)
 * • Instant search bar (Staff name, Employee code)
 * • Filter tabs: Checked-In (118) | Pending (26) | Exceptions (6)
 * • Manual gate override check-in action
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  Check,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';

interface RosterMember {
  id: string;
  name: string;
  role: string;
  code: string;
  dept: string;
  status: 'checked_in' | 'pending' | 'exception';
  checkInTime?: string;
}

const SAMPLE_ROSTER: RosterMember[] = [
  { id: 'r1', name: 'Rajvi Zinzuvadiya', role: 'PGT Senior Physics', code: 'SSP-2018-042', dept: 'Senior Science', status: 'checked_in', checkInTime: '08:14 AM' },
  { id: 'r2', name: 'Janvi Vadoliya', role: 'TGT English', code: 'SSP-2015-018', dept: 'Middle Wing', status: 'checked_in', checkInTime: '07:38 AM' },
  { id: 'r3', name: 'Pramod Trivedi', role: 'PGT Mathematics', code: 'SSP-2020-089', dept: 'Mathematics', status: 'exception', checkInTime: '08:34 AM (Late)' },
  { id: 'r4', name: 'Prinsi Moliya', role: 'PRT Hindi', code: 'SSP-2022-114', dept: 'Primary Wing', status: 'checked_in', checkInTime: '08:05 AM' },
];

export default function RegistrarStaffRosterScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'checked_in' | 'pending' | 'exception'>('all');
  const [overriddenList, setOverriddenList] = useState<string[]>([]);

  const handleManualCheckIn = (id: string) => {
    setOverriddenList((prev) => [...prev, id]);
  };

  const filtered = SAMPLE_ROSTER.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.code.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;

    if (filter === 'all') return true;
    if (overriddenList.includes(m.id)) {
      return filter === 'checked_in';
    }
    return m.status === filter;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* ── Subheader ──────────────────────── */}
      <View style={styles.subHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Daily Faculty Roster</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>118 / 150 On Campus</Text>
          </View>
        </View>
        <Text style={styles.subText}>Real-time campus head count, pending faculty & manual transit overrides</Text>
      </View>

      {/* ── Headcount Progress Bar ──────────── */}
      <View style={styles.progressCard}>
        <View style={styles.progressTop}>
          <Text style={styles.progressLabel}>CAMPUS CAPACITY PROGRESS</Text>
          <Text style={styles.progressPercent}>78.6%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '78.6%' }]} />
        </View>
        <View style={styles.legendRow}>
          <Text style={styles.legendText}>• 118 Present</Text>
          <Text style={[styles.legendText, { color: DT.color.warning }]}>• 6 Exceptions</Text>
          <Text style={[styles.legendText, { color: '#F87171' }]}>• 26 Pending Arrivals</Text>
        </View>
      </View>

      {/* ── Search Input ────────────────────── */}
      <View style={styles.searchWrapper}>
        <Search size={16} color="#8892B0" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search roster by faculty name or employee code..."
          placeholderTextColor="#64748B"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ── Filter Tabs ─────────────────────── */}
      <View style={styles.filterTabsRow}>
        {[
          { key: 'all', label: 'All Roster' },
          { key: 'checked_in', label: 'Checked-In (118)' },
          { key: 'pending', label: 'Pending (26)' },
          { key: 'exception', label: 'Exceptions (6)' },
        ].map((ft) => (
          <TouchableOpacity
            key={ft.key}
            style={[styles.filterTab, filter === ft.key && styles.filterTabActive]}
            onPress={() => setFilter(ft.key as any)}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterTabText, filter === ft.key && styles.filterTabTextActive]}>
              {ft.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Roster List ─────────────────────── */}
      <View style={styles.rosterList}>
        {filtered.map((m) => {
          const isOverridden = overriddenList.includes(m.id);
          const isCheckedIn = isOverridden || m.status === 'checked_in';
          const isException = !isOverridden && m.status === 'exception';

          return (
            <View key={m.id} style={styles.rosterCard}>
              <View style={{ flex: 1, paddingRight: DT.spacing.sm }}>
                <View style={styles.nameRow}>
                  <Text style={styles.rosterName}>{m.name}</Text>
                  <View style={styles.codePill}>
                    <Text style={styles.codeText}>{m.code}</Text>
                  </View>
                </View>
                <Text style={styles.rosterSub}>{m.role} • {m.dept}</Text>
                {isCheckedIn ? (
                  <Text style={styles.checkInTimeText}>
                    Check-in: {isOverridden ? 'Manual Override (Just now)' : m.checkInTime}
                  </Text>
                ) : (
                  <Text style={styles.pendingText}>Pending arrival at gate</Text>
                )}
              </View>

              <View style={styles.actionColumn}>
                {isCheckedIn ? (
                  <View style={styles.verifiedBadge}>
                    <CheckCircle2 size={13} color="#64FFDA" />
                    <Text style={styles.verifiedText}>Checked-In</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.manualPunchBtn}
                    onPress={() => handleManualCheckIn(m.id)}
                    activeOpacity={0.7}
                  >
                    <Check size={12} color="#0B132B" strokeWidth={2.5} />
                    <Text style={styles.manualPunchText}>Manual Punch</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B132B' },
  content: { padding: DT.spacing.md, paddingBottom: 32 },

  subHeader: { marginBottom: DT.spacing.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 },
  sectionTitle: { ...DT.font.h1, color: '#FFFFFF' },
  countBadge: { backgroundColor: 'rgba(100, 255, 218, 0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: DT.radius.full },
  countBadgeText: { ...DT.font.labelSm, color: DT.color.accent, fontSize: 10, fontWeight: '700' },
  subText: { ...DT.font.bodySm, color: '#8892B0', marginTop: 2 },

  progressCard: { backgroundColor: '#112240', borderRadius: DT.radius.xl, padding: DT.spacing.md, marginBottom: DT.spacing.md },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel: { ...DT.font.labelSm, color: '#8892B0', fontSize: 10, letterSpacing: 0.8 },
  progressPercent: { ...DT.font.labelMd, color: DT.color.accent, fontWeight: '800' },
  progressBar: { height: 6, backgroundColor: '#1D3557', borderRadius: 3, overflow: 'hidden', marginVertical: 8 },
  progressFill: { height: '100%', backgroundColor: DT.color.accent, borderRadius: 3 },
  legendRow: { flexDirection: 'row', gap: 12 },
  legendText: { ...DT.font.labelSm, color: '#64FFDA', fontSize: 10 },

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#112240',
    paddingHorizontal: DT.spacing.md,
    borderRadius: DT.radius.lg,
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: DT.spacing.sm,
  },
  searchInput: { flex: 1, ...DT.font.bodySm, color: '#FFFFFF' },

  filterTabsRow: { flexDirection: 'row', gap: 6, marginBottom: DT.spacing.md, flexWrap: 'wrap' },
  filterTab: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: DT.radius.full, backgroundColor: 'rgba(255, 255, 255, 0.06)' },
  filterTabActive: { backgroundColor: DT.color.accent },
  filterTabText: { ...DT.font.labelSm, color: '#8892B0', fontSize: 10 },
  filterTabTextActive: { color: '#0B132B', fontWeight: '800' },

  rosterList: { gap: DT.spacing.sm },
  rosterCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#112240',
    padding: DT.spacing.md,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rosterName: { ...DT.font.labelMd, color: '#FFFFFF', fontWeight: '700' },
  codePill: { backgroundColor: '#1D3557', paddingHorizontal: 5, paddingVertical: 1, borderRadius: DT.radius.xs },
  codeText: { ...DT.font.labelSm, color: '#8892B0', fontSize: 9 },
  rosterSub: { ...DT.font.bodySm, color: '#8892B0', fontSize: 11, marginTop: 1 },
  checkInTimeText: { ...DT.font.labelSm, color: '#64FFDA', fontSize: 10, marginTop: 3 },
  pendingText: { ...DT.font.labelSm, color: '#64748B', fontSize: 10, marginTop: 3 },

  actionColumn: { alignItems: 'flex-end' },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(100, 255, 218, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: DT.radius.xs },
  verifiedText: { ...DT.font.labelSm, color: '#64FFDA', fontSize: 10, fontWeight: '700' },
  manualPunchBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: DT.color.accent, paddingHorizontal: 8, paddingVertical: 5, borderRadius: DT.radius.xs },
  manualPunchText: { ...DT.font.labelSm, color: '#0B132B', fontSize: 10, fontWeight: '800' },
});
