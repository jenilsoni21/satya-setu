/**
 * AdminStaffProfileHeatmap — Detailed Staff Dossier & Attendance Heatmap
 *
 * Matches staff_profile_heatmap_mobile_admin:
 * • Teacher Dossier Header: Name, Designation, Department, Employee Code
 * • Quick dossier actions: Edit, Download PDF Dossier
 * • Punctuality Index & Metrics (96.4% on-time, 178 hours, 2/12 leaves)
 * • 30-Day Attendance Heatmap Calendar Grid with color legend
 * • CBSE Lesson Planners submission checklist
 * • Principal Appraisals & Countersignature History
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  ArrowLeft,
  FileDown,
  Edit3,
  Calendar,
  CheckCircle2,
  Clock,
  CalendarDays,
  XCircle,
  ShieldCheck,
  Star,
  Check,
  Award,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';

interface AdminStaffProfileHeatmapProps {
  onBack?: () => void;
  staffName?: string;
  role?: string;
  code?: string;
  dept?: string;
}

export default function AdminStaffProfileHeatmap({
  onBack,
  staffName = 'Dr. Alok Nath Mukherjee',
  role = 'PGT Senior Chemistry & HOD Science',
  code = 'SSP-2018-042',
  dept = 'Dept. Science • Senior Secondary',
}: AdminStaffProfileHeatmapProps) {
  const [activeTab, setActiveTab] = useState<'attendance' | 'appraisals' | 'planners'>('attendance');

  // 30 days matrix for September / October
  // 1: present, 2: late, 3: leave, 4: holiday/weekend, 5: absent
  const heatmapDays = [
    { day: 1, type: 'holiday' },
    { day: 2, type: 'present', in: '07:42 AM' },
    { day: 3, type: 'present', in: '07:45 AM' },
    { day: 4, type: 'present', in: '07:40 AM' },
    { day: 5, type: 'present', in: '07:38 AM' },
    { day: 6, type: 'present', in: '07:41 AM' },
    { day: 7, type: 'present', in: '07:44 AM' },
    { day: 8, type: 'holiday' },
    { day: 9, type: 'present', in: '07:40 AM' },
    { day: 10, type: 'present', in: '07:39 AM' },
    { day: 11, type: 'late', in: '08:12 AM' },
    { day: 12, type: 'present', in: '07:42 AM' },
    { day: 13, type: 'present', in: '07:40 AM' },
    { day: 14, type: 'present', in: '07:43 AM' },
    { day: 15, type: 'holiday' },
    { day: 16, type: 'leave', note: 'Medical' },
    { day: 17, type: 'present', in: '07:45 AM' },
    { day: 18, type: 'present', in: '07:39 AM' },
    { day: 19, type: 'present', in: '07:40 AM' },
    { day: 20, type: 'present', in: '07:41 AM' },
    { day: 21, type: 'present', in: '07:42 AM' },
    { day: 22, type: 'holiday' },
    { day: 23, type: 'present', in: '07:38 AM' },
    { day: 24, type: 'present', in: '07:40 AM' },
    { day: 25, type: 'present', in: '07:44 AM' },
    { day: 26, type: 'present', in: '07:39 AM' },
    { day: 27, type: 'present', in: '07:40 AM' },
    { day: 28, type: 'present', in: '07:42 AM' },
    { day: 29, type: 'holiday' },
    { day: 30, type: 'present', in: '07:40 AM' },
  ];

  const getDayBg = (type: string) => {
    switch (type) {
      case 'present': return DT.color.success;
      case 'late': return DT.color.warning;
      case 'leave': return DT.color.info;
      case 'absent': return DT.color.danger;
      case 'holiday':
      default: return DT.color.surfaceDim;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* ── Top Back Row ────────────────────── */}
      <View style={styles.topBackRow}>
        {onBack && (
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeft size={16} color={DT.color.primary} strokeWidth={2.2} />
            <Text style={styles.backBtnText}>Back to Directory</Text>
          </TouchableOpacity>
        )}
        <View style={styles.actionsGroup}>
          <TouchableOpacity style={styles.iconAction} activeOpacity={0.7}>
            <FileDown size={16} color={DT.color.primary} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconAction} activeOpacity={0.7}>
            <Edit3 size={16} color={DT.color.primary} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Teacher Profile Hero Card ───────── */}
      <View style={styles.heroCard}>
        <View style={styles.heroTop}>
          <View style={styles.heroAvatar}>
            <Text style={styles.heroAvatarInitials}>
              {staffName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </Text>
          </View>
          <View style={{ flex: 1, paddingLeft: DT.spacing.sm }}>
            <Text style={styles.heroName}>{staffName}</Text>
            <Text style={styles.heroRole}>{role}</Text>
            <Text style={styles.heroDept}>{dept}</Text>
          </View>
        </View>

        <View style={styles.heroMetaRow}>
          <View style={styles.metaPill}>
            <Text style={styles.metaPillText}>{code}</Text>
          </View>
          <View style={[styles.metaPill, { backgroundColor: DT.color.successBg }]}>
            <ShieldCheck size={12} color={DT.color.success} strokeWidth={2} />
            <Text style={[styles.metaPillText, { color: DT.color.success }]}>Biometric Verified</Text>
          </View>
          <View style={[styles.metaPill, { backgroundColor: DT.color.accentLight }]}>
            <Star size={12} color={DT.color.onAccent} fill={DT.color.accent} />
            <Text style={[styles.metaPillText, { color: DT.color.onAccent }]}>Exemplary (4.9)</Text>
          </View>
        </View>
      </View>

      {/* ── Metrics Grid ────────────────────── */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Punctuality Index</Text>
          <Text style={[styles.metricBig, { color: DT.color.success }]}>96.4%</Text>
          <Text style={styles.metricSub}>Top 5% in Cadre</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Hours Logged</Text>
          <Text style={[styles.metricBig, { color: DT.color.primary }]}>178h</Text>
          <Text style={styles.metricSub}>This Academic Month</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Leave Balance</Text>
          <Text style={[styles.metricBig, { color: DT.color.info }]}>10 / 12</Text>
          <Text style={styles.metricSub}>2 Used (Casual)</Text>
        </View>
      </View>

      {/* ── Sub Navigation Tabs ─────────────── */}
      <View style={styles.tabBar}>
        {[
          { key: 'attendance', label: 'Attendance & Heatmap' },
          { key: 'planners', label: 'Lesson Planners' },
          { key: 'appraisals', label: 'Appraisal History' },
        ].map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tabItem, activeTab === t.key && styles.tabItemActive]}
            onPress={() => setActiveTab(t.key as any)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === t.key && styles.tabTextActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── 30-Day Attendance Heatmap Matrix ─── */}
      {activeTab === 'attendance' && (
        <View style={styles.heatmapCard}>
          <View style={styles.heatmapHeader}>
            <View>
              <Text style={styles.heatmapTitle}>Monthly Attendance Matrix</Text>
              <Text style={styles.heatmapSub}>30-Day biometric transit frequency</Text>
            </View>
            <View style={styles.monthBadge}>
              <Calendar size={13} color={DT.color.primary} strokeWidth={2} />
              <Text style={styles.monthBadgeText}>October 2026</Text>
            </View>
          </View>

          {/* Grid of 30 days */}
          <View style={styles.daysGrid}>
            {heatmapDays.map((d) => (
              <View key={d.day} style={styles.dayCellContainer}>
                <View style={[styles.dayCell, { backgroundColor: getDayBg(d.type) }]}>
                  <Text style={[styles.dayCellNum, d.type !== 'holiday' && { color: '#FFFFFF' }]}>
                    {d.day}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Heatmap Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: DT.color.success }]} />
              <Text style={styles.legendText}>Present</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: DT.color.warning }]} />
              <Text style={styles.legendText}>Late Arrival</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: DT.color.info }]} />
              <Text style={styles.legendText}>Leave</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: DT.color.surfaceDim }]} />
              <Text style={styles.legendText}>Weekend/Holiday</Text>
            </View>
          </View>
        </View>
      )}

      {/* ── Planners Tab ───────────────────── */}
      {activeTab === 'planners' && (
        <View style={styles.subContentCard}>
          <Text style={styles.subContentTitle}>Weekly Lesson Planners</Text>
          <Text style={styles.subContentDesc}>CBSE curriculum alignment & weekly laboratory coverage</Text>

          {[
            { week: 'Week 42: Oct 12 - Oct 17', status: 'Submitted', date: 'Submitted 12 Oct • Verified by Principal' },
            { week: 'Week 41: Oct 05 - Oct 10', status: 'Approved', date: 'Audited • Grade 100%' },
            { week: 'Week 40: Sep 28 - Oct 03', status: 'Approved', date: 'Audited • Grade 100%' },
          ].map((item, i) => (
            <View key={i} style={styles.plannerRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.plannerWeek}>{item.week}</Text>
                <Text style={styles.plannerDate}>{item.date}</Text>
              </View>
              <View style={styles.approvedTag}>
                <Check size={12} color={DT.color.success} strokeWidth={2.5} />
                <Text style={styles.approvedTagText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* ── Appraisals Tab ─────────────────── */}
      {activeTab === 'appraisals' && (
        <View style={styles.subContentCard}>
          <Text style={styles.subContentTitle}>Principal Countersignature Log</Text>
          <Text style={styles.subContentDesc}>Official academic appraisals & compliance evaluations</Text>

          <View style={styles.appraisalBox}>
            <View style={styles.appraisalHeader}>
              <Award size={18} color={DT.color.accent} strokeWidth={2} />
              <Text style={styles.appraisalTitle}>Academic Session 2024-25 • Term 1 Appraisal</Text>
            </View>
            <Text style={styles.appraisalScore}>Overall Composite Score: 4.9 / 5.0 (Exemplary)</Text>
            <Text style={styles.appraisalComment}>
              "Exemplary pedagogy and mentorship in Chemistry laboratory safety. All lesson planners submitted well within CBSE deadlines."
            </Text>
            <Text style={styles.appraisalSigner}>— Divyansh Kugasiya, Principal</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DT.color.background },
  content: { padding: DT.spacing.md, paddingBottom: 32 },

  topBackRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: DT.spacing.sm },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 4 },
  backBtnText: { ...DT.font.labelSm, color: DT.color.primary, fontWeight: '700' },
  actionsGroup: { flexDirection: 'row', gap: 8 },
  iconAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: DT.color.surfaceDim,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Hero Card
  heroCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    marginBottom: DT.spacing.md,
    ...DT.shadow.sm,
  },
  heroTop: { flexDirection: 'row', alignItems: 'center' },
  heroAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: DT.color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroAvatarInitials: { ...DT.font.h3, color: '#FFFFFF', fontWeight: '700' },
  heroName: { ...DT.font.h2, color: DT.color.textPrimary },
  heroRole: { ...DT.font.labelMd, color: DT.color.primary, marginTop: 1 },
  heroDept: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 11, marginTop: 1 },
  heroMetaRow: { flexDirection: 'row', gap: 6, marginTop: DT.spacing.sm, flexWrap: 'wrap' },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DT.color.surfaceDim,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: DT.radius.full,
  },
  metaPillText: { ...DT.font.labelSm, color: DT.color.textSecondary, fontSize: 10, fontWeight: '700' },

  // Metrics
  metricsGrid: { flexDirection: 'row', gap: DT.spacing.xs, marginBottom: DT.spacing.md },
  metricCard: {
    flex: 1,
    backgroundColor: DT.color.surface,
    padding: DT.spacing.sm,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  metricLabel: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10 },
  metricBig: { ...DT.font.h2, marginVertical: 2 },
  metricSub: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 10 },

  // Tabs
  tabBar: {
    flexDirection: 'row',
    backgroundColor: DT.color.surfaceDim,
    borderRadius: DT.radius.lg,
    padding: 3,
    marginBottom: DT.spacing.md,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: DT.radius.md,
  },
  tabItemActive: {
    backgroundColor: DT.color.surface,
    ...DT.shadow.sm,
  },
  tabText: { ...DT.font.labelSm, color: DT.color.textSecondary, fontSize: 11 },
  tabTextActive: { color: DT.color.primary, fontWeight: '700' },

  // Heatmap
  heatmapCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  heatmapHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: DT.spacing.md },
  heatmapTitle: { ...DT.font.h4, color: DT.color.textPrimary },
  heatmapSub: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 11, marginTop: 1 },
  monthBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: DT.color.primaryLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: DT.radius.full },
  monthBadgeText: { ...DT.font.labelSm, color: DT.color.primary, fontWeight: '700', fontSize: 10 },

  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'space-between',
    marginBottom: DT.spacing.md,
  },
  dayCellContainer: {
    width: '12%',
    aspectRatio: 1,
  },
  dayCell: {
    flex: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCellNum: { fontSize: 10, fontWeight: '700', color: DT.color.textSecondary },

  legendRow: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, paddingTop: DT.spacing.xs, borderTopWidth: 1, borderTopColor: DT.color.borderLight },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendBox: { width: 10, height: 10, borderRadius: 2 },
  legendText: { ...DT.font.labelSm, color: DT.color.textSecondary, fontSize: 10 },

  // Subcontent
  subContentCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  subContentTitle: { ...DT.font.h4, color: DT.color.textPrimary },
  subContentDesc: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 11, marginBottom: DT.spacing.md, marginTop: 1 },
  plannerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: DT.spacing.sm, borderBottomWidth: 1, borderBottomColor: DT.color.borderLight },
  plannerWeek: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700' },
  plannerDate: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 11 },
  approvedTag: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: DT.color.successBg, paddingHorizontal: 6, paddingVertical: 2, borderRadius: DT.radius.xs },
  approvedTagText: { ...DT.font.labelSm, color: DT.color.success, fontWeight: '700', fontSize: 10 },

  appraisalBox: { backgroundColor: DT.color.surfaceDim, padding: DT.spacing.md, borderRadius: DT.radius.lg },
  appraisalHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  appraisalTitle: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700' },
  appraisalScore: { ...DT.font.labelSm, color: DT.color.primary, fontWeight: '700', marginVertical: 4 },
  appraisalComment: { ...DT.font.bodySm, color: DT.color.textSecondary, fontStyle: 'italic', fontSize: 12 },
  appraisalSigner: { ...DT.font.labelSm, color: DT.color.textMuted, marginTop: 6, textAlign: 'right' },
});
