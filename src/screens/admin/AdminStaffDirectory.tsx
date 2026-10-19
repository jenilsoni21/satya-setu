/**
 * AdminStaffDirectory — Staff Directory & Cadre Management
 *
 * Matches the mobile admin design:
 * • Cadre summary stat tiles: Biometrics Enrolled (144/150 - 96%), Present on Campus (138)
 * • Quick action buttons: Add Staff, Bulk Import
 * • Search bar (name, employee code SSP-...) + Filter modal
 * • Wing filter chips: All (150), Teaching (98), Admin (24), Support (28), Biometric Pending (6)
 * • Staff Cards with photo/initials, department, designation, employee code,
 *   attendance status, and drill-down to Staff Profile & Heatmap
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
  Search,
  SlidersHorizontal,
  UserPlus,
  Upload,
  Fingerprint,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Building2,
  CheckCircle2,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';

export interface StaffCardData {
  id: string;
  name: string;
  role: string;
  code: string;
  dept: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  checkInTime?: string;
  biometricEnrolled: boolean;
  avatarColor: string;
}

const SAMPLE_STAFF: StaffCardData[] = [
  {
    id: '1',
    name: 'Rajvi Zinzuvadiya',
    role: 'PGT Senior Physics & Class Teacher 11-A',
    code: 'SSP-2018-042',
    dept: 'Senior Secondary Science',
    status: 'present',
    checkInTime: '07:42 AM',
    biometricEnrolled: true,
    avatarColor: '#1E3A8A',
  },
  {
    id: '2',
    name: 'Janvi Vadoliya',
    role: 'TGT English & Headmistress Middle Wing',
    code: 'SSP-2015-018',
    dept: 'Middle Wing',
    status: 'present',
    checkInTime: '07:38 AM',
    biometricEnrolled: true,
    avatarColor: '#0284C7',
  },
  {
    id: '3',
    name: 'Pramod Trivedi',
    role: 'PGT Mathematics & Exam Controller',
    code: 'SSP-2020-089',
    dept: 'Dept. Mathematics',
    status: 'late',
    checkInTime: '08:14 AM (Late)',
    biometricEnrolled: true,
    avatarColor: '#D97706',
  },
  {
    id: '4',
    name: 'Prinsi Moliya',
    role: 'PRT Hindi & Cultural Coordinator',
    code: 'SSP-2022-114',
    dept: 'Primary Wing',
    status: 'present',
    checkInTime: '08:05 AM',
    biometricEnrolled: true,
    avatarColor: '#7C3AED',
  },
];

interface AdminStaffDirectoryProps {
  onSelectStaff?: (staff: StaffCardData) => void;
}

export default function AdminStaffDirectory({ onSelectStaff }: AdminStaffDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterChips = [
    { label: 'All', count: 150 },
    { label: 'Teaching', count: 98 },
    { label: 'Admin', count: 24 },
    { label: 'Support', count: 28 },
    { label: 'Biometric Pending', count: 6 },
  ];

  const filteredStaff = SAMPLE_STAFF.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.dept.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'Teaching') return staff.role.includes('PGT') || staff.role.includes('TGT') || staff.role.includes('PRT');
    if (selectedFilter === 'Support') return staff.dept.includes('Support');
    if (selectedFilter === 'Biometric Pending') return !staff.biometricEnrolled;
    return true;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* ── Subheader ──────────────────────── */}
      <View style={styles.subHeader}>
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.sectionTitle}>Staff Directory</Text>
            <View style={styles.totalBadge}>
              <Text style={styles.totalBadgeText}>150 Total Cadre</Text>
            </View>
          </View>
          <Text style={styles.subText}>Faculty credentials, biometric logs & gate permissions</Text>
        </View>
      </View>

      {/* ── Metric Summary Tiles ───────────── */}
      <View style={styles.metricGrid}>
        <View style={styles.metricCard}>
          <View style={styles.metricCardTop}>
            <View style={styles.metricIconCircle}>
              <Fingerprint size={18} color={DT.color.primary} strokeWidth={2} />
            </View>
            <View style={styles.percentPill}>
              <Text style={styles.percentPillText}>96%</Text>
            </View>
          </View>
          <View style={styles.metricCardBottom}>
            <Text style={styles.metricBig}>
              144<Text style={styles.metricSub}> / 150</Text>
            </Text>
            <Text style={styles.metricLabel}>Biometrics Enrolled</Text>
          </View>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricCardTop}>
            <View style={[styles.metricIconCircle, { backgroundColor: DT.color.accentLight }]}>
              <Building2 size={18} color={DT.color.accentDark} strokeWidth={2} />
            </View>
            <View style={styles.trendPill}>
              <TrendingUp size={12} color={DT.color.success} strokeWidth={2.2} />
              <Text style={styles.trendText}>+1.8%</Text>
            </View>
          </View>
          <View style={styles.metricCardBottom}>
            <Text style={styles.metricBig}>138</Text>
            <Text style={styles.metricLabel}>Present on Campus</Text>
          </View>
        </View>
      </View>

      {/* ── Actions Row ────────────────────── */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.addStaffBtn} activeOpacity={0.7}>
          <UserPlus size={16} color="#FFFFFF" strokeWidth={2.2} />
          <Text style={styles.addStaffBtnText}>Add Staff Member</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bulkImportBtn} activeOpacity={0.7}>
          <Upload size={16} color={DT.color.primary} strokeWidth={2} />
          <Text style={styles.bulkImportBtnText}>Bulk Import</Text>
        </TouchableOpacity>
      </View>

      {/* ── Search & Filter ────────────────── */}
      <View style={styles.searchRow}>
        <View style={styles.searchInputWrapper}>
          <Search size={18} color={DT.color.textMuted} strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search faculty name, code (SSP-...)"
            placeholderTextColor={DT.color.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
          <SlidersHorizontal size={18} color={DT.color.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* ── Filter Chips ───────────────────── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChipsRow}>
        {filterChips.map((chip) => {
          const isActive = selectedFilter === chip.label;
          const isPending = chip.label === 'Biometric Pending';
          return (
            <TouchableOpacity
              key={chip.label}
              style={[
                styles.chip,
                isActive && styles.chipActive,
                isPending && styles.chipPending,
              ]}
              onPress={() => setSelectedFilter(chip.label)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.chipText,
                  isActive && styles.chipTextActive,
                  isPending && styles.chipPendingText,
                ]}
              >
                {chip.label} ({chip.count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Staff List ─────────────────────── */}
      <View style={styles.staffList}>
        {filteredStaff.map((staff) => (
          <TouchableOpacity
            key={staff.id}
            style={styles.staffCard}
            onPress={() => onSelectStaff?.(staff)}
            activeOpacity={0.7}
          >
            <View style={styles.staffCardTop}>
              <View style={[styles.avatarCircle, { backgroundColor: staff.avatarColor }]}>
                <Text style={styles.avatarInitials}>
                  {staff.name
                    .replace('Dr. ', '')
                    .replace('Mrs. ', '')
                    .replace('Mr. ', '')
                    .replace('Ms. ', '')
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </Text>
              </View>

              <View style={{ flex: 1, paddingRight: DT.spacing.sm }}>
                <Text style={styles.staffName}>{staff.name}</Text>
                <Text style={styles.staffRole}>{staff.role}</Text>

                <View style={styles.metaRow}>
                  <View style={styles.codePill}>
                    <Text style={styles.codeText}>{staff.code}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusPill,
                      staff.status === 'present'
                        ? { backgroundColor: DT.color.successBg }
                        : staff.status === 'late'
                        ? { backgroundColor: DT.color.warningBg }
                        : { backgroundColor: DT.color.infoBg },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusPillText,
                        staff.status === 'present'
                          ? { color: DT.color.success }
                          : staff.status === 'late'
                          ? { color: DT.color.warning }
                          : { color: DT.color.info },
                      ]}
                    >
                      {staff.checkInTime}
                    </Text>
                  </View>
                </View>
              </View>

              <ChevronRight size={18} color={DT.color.textMuted} strokeWidth={2} />
            </View>

            <View style={styles.staffCardDivider} />

            <View style={styles.staffCardBottom}>
              <View style={styles.biometricBadge}>
                {staff.biometricEnrolled ? (
                  <>
                    <ShieldCheck size={14} color={DT.color.success} strokeWidth={2} />
                    <Text style={styles.biometricEnrolledText}>Enrolled (Kiosk 01)</Text>
                  </>
                ) : (
                  <>
                    <AlertCircle size={14} color={DT.color.danger} strokeWidth={2} />
                    <Text style={styles.biometricPendingText}>Enrollment Pending</Text>
                  </>
                )}
              </View>
              <Text style={styles.deptText}>{staff.dept}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DT.color.background },
  content: { padding: DT.spacing.md, paddingBottom: 120 },

  subHeader: { marginBottom: DT.spacing.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  sectionTitle: { ...DT.font.h1, color: DT.color.textPrimary },
  totalBadge: {
    backgroundColor: DT.color.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: DT.radius.full,
  },
  totalBadgeText: { ...DT.font.labelSm, color: DT.color.primary, fontWeight: '700' },
  subText: { ...DT.font.bodySm, color: DT.color.textSecondary, marginTop: 2 },

  // Metrics
  metricGrid: { flexDirection: 'row', gap: DT.spacing.sm, marginBottom: DT.spacing.md },
  metricCard: {
    flex: 1,
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  metricCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metricIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: DT.color.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentPill: {
    backgroundColor: DT.color.successBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: DT.radius.full,
  },
  percentPillText: { ...DT.font.labelSm, color: DT.color.success, fontWeight: '700' },
  trendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: DT.color.successBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: DT.radius.full,
  },
  trendText: { ...DT.font.labelSm, color: DT.color.success, fontWeight: '700' },
  metricCardBottom: { marginTop: DT.spacing.sm },
  metricBig: { ...DT.font.h2, color: DT.color.textPrimary },
  metricSub: { ...DT.font.bodySm, color: DT.color.textMuted },
  metricLabel: { ...DT.font.labelSm, color: DT.color.textSecondary, marginTop: 2 },

  // Actions
  actionsRow: { flexDirection: 'row', gap: DT.spacing.sm, marginBottom: DT.spacing.md },
  addStaffBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: DT.color.primary,
    height: 44,
    borderRadius: DT.radius.md,
  },
  addStaffBtnText: { ...DT.font.labelMd, color: '#FFFFFF', fontWeight: '700' },
  bulkImportBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: DT.color.surface,
    borderWidth: 1,
    borderColor: DT.color.border,
    height: 44,
    borderRadius: DT.radius.md,
  },
  bulkImportBtnText: { ...DT.font.labelMd, color: DT.color.primary, fontWeight: '600' },

  // Search
  searchRow: { flexDirection: 'row', gap: DT.spacing.sm, marginBottom: DT.spacing.sm },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: DT.color.surface,
    borderWidth: 1,
    borderColor: DT.color.border,
    borderRadius: DT.radius.lg,
    paddingHorizontal: DT.spacing.md,
    height: 46,
  },
  searchInput: { flex: 1, ...DT.font.bodyMd, color: DT.color.textPrimary },
  filterBtn: {
    width: 46,
    height: 46,
    backgroundColor: DT.color.surface,
    borderWidth: 1,
    borderColor: DT.color.border,
    borderRadius: DT.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Chips
  filterChipsRow: { gap: DT.spacing.xs, paddingBottom: DT.spacing.md },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: DT.radius.full,
    backgroundColor: DT.color.surface,
    borderWidth: 1,
    borderColor: DT.color.border,
  },
  chipActive: {
    backgroundColor: DT.color.primary,
    borderColor: DT.color.primary,
  },
  chipText: { ...DT.font.labelSm, color: DT.color.textSecondary },
  chipTextActive: { color: '#FFFFFF', fontWeight: '700' },
  chipPending: { borderColor: DT.color.dangerBg, backgroundColor: DT.color.dangerBg },
  chipPendingText: { color: DT.color.danger, fontWeight: '700' },

  // Staff Cards
  staffList: { gap: DT.spacing.sm },
  staffCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  staffCardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: { ...DT.font.labelMd, color: '#FFFFFF', fontWeight: '700' },
  staffName: { ...DT.font.labelLg, color: DT.color.textPrimary, fontWeight: '700' },
  staffRole: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 11, marginTop: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' },
  codePill: {
    backgroundColor: DT.color.surfaceDim,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: DT.radius.xs,
  },
  codeText: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10 },
  statusPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: DT.radius.xs,
  },
  statusPillText: { ...DT.font.labelSm, fontSize: 10, fontWeight: '700' },
  staffCardDivider: { height: 1, backgroundColor: DT.color.borderLight, marginVertical: DT.spacing.sm },
  staffCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  biometricBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  biometricEnrolledText: { ...DT.font.labelSm, color: DT.color.success, fontSize: 10, fontWeight: '600' },
  biometricPendingText: { ...DT.font.labelSm, color: DT.color.danger, fontSize: 10, fontWeight: '600' },
  deptText: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10 },
});
