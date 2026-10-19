/**
 * AdminPunchLogs — Attendance & Duty Logs
 *
 * Matches attendance_punch_logs_mobile_admin:
 * • Date navigation bar (Previous, Next, Today picker)
 * • Cadre summary chips: Present (138), Late (6), Leave (4), Absent (2)
 * • Pending Leave Requests Approval banner
 * • Real-time gate punch timeline with face confidence & terminal ID
 * • Manual punch reconciliation trigger
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
  ChevronLeft,
  ChevronRight,
  Calendar,
  CheckCircle2,
  Clock,
  CalendarDays,
  XCircle,
  ShieldCheck,
  Check,
  X,
  FileSpreadsheet,
  ScanFace,
  RotateCw,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';

interface PunchRecord {
  id: string;
  name: string;
  role: string;
  time: string;
  direction: 'IN' | 'OUT';
  mode: 'Face Biometric' | 'RFID Card' | 'PIN Override';
  confidence: string;
  terminal: string;
  status: 'on-time' | 'late' | 'early-exit';
}

const SAMPLE_PUNCHES: PunchRecord[] = [
  {
    id: 'p1',
    name: 'Rajvi Zinzuvadiya',
    role: 'PGT Physics',
    time: '08:14:22 AM',
    direction: 'IN',
    mode: 'Face Biometric',
    confidence: '99.4%',
    terminal: 'Gate 01 (Main)',
    status: 'on-time',
  },
  {
    id: 'p2',
    name: 'Janvi Vadoliya',
    role: 'TGT English',
    time: '08:19:05 AM',
    direction: 'IN',
    mode: 'Face Biometric',
    confidence: '98.9%',
    terminal: 'Gate 01 (Main)',
    status: 'on-time',
  },
  {
    id: 'p3',
    name: 'Pramod Trivedi',
    role: 'PGT Mathematics',
    time: '08:34:40 AM',
    direction: 'IN',
    mode: 'PIN Override',
    confidence: 'Admin Verified',
    terminal: 'Gate 02 (Staff)',
    status: 'late',
  },
  {
    id: 'p4',
    name: 'Prinsi Moliya',
    role: 'PRT Hindi',
    time: '08:05:12 AM',
    direction: 'IN',
    mode: 'Face Biometric',
    confidence: '97.8%',
    terminal: 'Gate 01 (Main)',
    status: 'on-time',
  },
];

export default function AdminPunchLogs() {
  const [selectedRange, setSelectedRange] = useState('Today');
  const [leaveStatus, setLeaveStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* ── Subheader ──────────────────────── */}
      <View style={styles.subHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Attendance & Duty Logs</Text>
          <View style={styles.liveTag}>
            <View style={styles.liveDot} />
            <Text style={styles.liveTagText}>Gate Stream Active</Text>
          </View>
        </View>
        <Text style={styles.subText}>Biometric transit logs, gate audits & unexcused reconciliations</Text>
      </View>

      {/* ── Date Navigator Bar ─────────────── */}
      <View style={styles.dateNavCard}>
        <TouchableOpacity style={styles.dateArrowBtn} activeOpacity={0.7}>
          <ChevronLeft size={18} color={DT.color.textSecondary} strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.dateDisplay}>
          <Calendar size={16} color={DT.color.primary} strokeWidth={2} />
          <Text style={styles.dateDisplayText}>Today, 15 Oct 2026</Text>
        </View>

        <TouchableOpacity style={styles.dateArrowBtn} activeOpacity={0.7}>
          <ChevronRight size={18} color={DT.color.textSecondary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* ── Cadre Status Tiles ──────────────── */}
      <View style={styles.overviewGrid}>
        <View style={[styles.overviewTile, { backgroundColor: DT.color.successBg }]}>
          <View style={styles.tileHeader}>
            <Text style={styles.tileLabel}>Present</Text>
            <CheckCircle2 size={14} color={DT.color.success} strokeWidth={2} />
          </View>
          <Text style={[styles.tileBig, { color: DT.color.success }]}>138</Text>
          <Text style={styles.tileSub}>92% of Cadre</Text>
        </View>

        <View style={[styles.overviewTile, { backgroundColor: DT.color.warningBg }]}>
          <View style={styles.tileHeader}>
            <Text style={styles.tileLabel}>Late</Text>
            <Clock size={14} color={DT.color.warning} strokeWidth={2} />
          </View>
          <Text style={[styles.tileBig, { color: DT.color.warning }]}>6</Text>
          <Text style={styles.tileSub}>Within 15 min</Text>
        </View>

        <View style={[styles.overviewTile, { backgroundColor: DT.color.infoBg }]}>
          <View style={styles.tileHeader}>
            <Text style={styles.tileLabel}>Leave</Text>
            <CalendarDays size={14} color={DT.color.info} strokeWidth={2} />
          </View>
          <Text style={[styles.tileBig, { color: DT.color.info }]}>4</Text>
          <Text style={styles.tileSub}>Sanctioned</Text>
        </View>

        <View style={[styles.overviewTile, { backgroundColor: DT.color.dangerBg }]}>
          <View style={styles.tileHeader}>
            <Text style={styles.tileLabel}>Absent</Text>
            <XCircle size={14} color={DT.color.danger} strokeWidth={2} />
          </View>
          <Text style={[styles.tileBig, { color: DT.color.danger }]}>2</Text>
          <Text style={styles.tileSub}>Unexcused</Text>
        </View>
      </View>

      {/* ── Pending Leave Review Card ──────── */}
      {leaveStatus === 'pending' && (
        <View style={styles.leaveReviewCard}>
          <View style={styles.leaveCardHeader}>
            <View style={{ flex: 1 }}>
              <View style={styles.urgentRow}>
                <Text style={styles.leaveReviewTitle}>Pending Leave Request</Text>
                <View style={styles.reviewBadge}>
                  <Text style={styles.reviewBadgeText}>Needs Approval</Text>
                </View>
              </View>
              <Text style={styles.leaveApplicant}>Ms. Anjali Deshmukh • PRT Hindi</Text>
              <Text style={styles.leaveReason}>Casual Leave: 15 Oct - 17 Oct (Family function)</Text>
            </View>
          </View>

          <View style={styles.leaveActionsRow}>
            <TouchableOpacity
              style={styles.approveBtn}
              onPress={() => setLeaveStatus('approved')}
              activeOpacity={0.7}
            >
              <Check size={15} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={styles.approveBtnText}>Sanction Leave</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rejectBtn}
              onPress={() => setLeaveStatus('rejected')}
              activeOpacity={0.7}
            >
              <X size={15} color={DT.color.danger} strokeWidth={2.2} />
              <Text style={styles.rejectBtnText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ── Real-Time Punch Timeline ───────── */}
      <View style={styles.timelineHeader}>
        <Text style={styles.timelineTitle}>Real-Time Gate Logs</Text>
        <TouchableOpacity style={styles.reconcileBtn} activeOpacity={0.7}>
          <RotateCw size={13} color={DT.color.primary} strokeWidth={2} />
          <Text style={styles.reconcileBtnText}>Reconcile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.punchesList}>
        {SAMPLE_PUNCHES.map((punch) => {
          const isLate = punch.status === 'late';
          return (
            <View key={punch.id} style={styles.punchCard}>
              <View style={styles.punchCardLeft}>
                <View
                  style={[
                    styles.directionBadge,
                    punch.direction === 'IN'
                      ? { backgroundColor: DT.color.successBg }
                      : { backgroundColor: DT.color.primaryLight },
                  ]}
                >
                  <Text
                    style={[
                      styles.directionText,
                      punch.direction === 'IN'
                        ? { color: DT.color.success }
                        : { color: DT.color.primary },
                    ]}
                  >
                    {punch.direction}
                  </Text>
                </View>
                <View style={styles.punchTimelineInfo}>
                  <Text style={styles.punchName}>{punch.name}</Text>
                  <Text style={styles.punchRole}>{punch.role}</Text>
                  <View style={styles.punchMetaRow}>
                    <ShieldCheck size={12} color={DT.color.textMuted} strokeWidth={1.8} />
                    <Text style={styles.punchModeText}>{punch.mode} ({punch.confidence})</Text>
                    <Text style={styles.punchTerminalText}>• {punch.terminal}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.punchCardRight}>
                <Text style={styles.punchTimeText}>{punch.time}</Text>
                {isLate && (
                  <View style={styles.lateBadge}>
                    <Text style={styles.lateBadgeText}>Late Arrival</Text>
                  </View>
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
  container: { flex: 1, backgroundColor: DT.color.background },
  content: { padding: DT.spacing.md, paddingBottom: 120 },

  subHeader: { marginBottom: DT.spacing.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 },
  sectionTitle: { ...DT.font.h1, color: DT.color.textPrimary },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: DT.radius.full,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: DT.color.success },
  liveTagText: { ...DT.font.labelSm, color: DT.color.success, fontWeight: '700', fontSize: 10 },
  subText: { ...DT.font.bodySm, color: DT.color.textSecondary, marginTop: 2 },

  // Date Nav
  dateNavCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: DT.color.surface,
    padding: DT.spacing.sm,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    marginBottom: DT.spacing.md,
    ...DT.shadow.sm,
  },
  dateArrowBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: DT.color.surfaceDim,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateDisplay: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dateDisplayText: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700' },

  // Overview Tiles
  overviewGrid: { flexDirection: 'row', gap: DT.spacing.xs, marginBottom: DT.spacing.md },
  overviewTile: {
    flex: 1,
    padding: DT.spacing.sm,
    borderRadius: DT.radius.lg,
  },
  tileHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tileLabel: { ...DT.font.labelSm, color: DT.color.textSecondary, fontSize: 11 },
  tileBig: { ...DT.font.h2, marginVertical: 2 },
  tileSub: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 10 },

  // Leave Review
  leaveReviewCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.warning,
    marginBottom: DT.spacing.md,
    ...DT.shadow.sm,
  },
  leaveCardHeader: { marginBottom: DT.spacing.sm },
  urgentRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  leaveReviewTitle: { ...DT.font.h4, color: DT.color.textPrimary },
  reviewBadge: { backgroundColor: DT.color.warningBg, paddingHorizontal: 6, paddingVertical: 2, borderRadius: DT.radius.xs },
  reviewBadgeText: { ...DT.font.labelSm, color: DT.color.warning, fontSize: 10, fontWeight: '700' },
  leaveApplicant: { ...DT.font.labelMd, color: DT.color.primary, marginTop: 4 },
  leaveReason: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 11, marginTop: 2 },
  leaveActionsRow: { flexDirection: 'row', gap: DT.spacing.sm, marginTop: DT.spacing.xs },
  approveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: DT.color.success,
    height: 38,
    borderRadius: DT.radius.md,
  },
  approveBtnText: { ...DT.font.labelSm, color: '#FFFFFF', fontWeight: '700' },
  rejectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: DT.color.dangerBg,
    paddingHorizontal: DT.spacing.md,
    height: 38,
    borderRadius: DT.radius.md,
  },
  rejectBtnText: { ...DT.font.labelSm, color: DT.color.danger, fontWeight: '700' },

  // Timeline
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DT.spacing.sm,
  },
  timelineTitle: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700', letterSpacing: 0.5 },
  reconcileBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: DT.color.surfaceDim, paddingHorizontal: 8, paddingVertical: 4, borderRadius: DT.radius.sm },
  reconcileBtnText: { ...DT.font.labelSm, color: DT.color.primary, fontSize: 11, fontWeight: '600' },

  // Punch list
  punchesList: { gap: DT.spacing.sm },
  punchCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: DT.color.surface,
    padding: DT.spacing.md,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  punchCardLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, paddingRight: DT.spacing.sm },
  directionBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionText: { fontSize: 11, fontWeight: '800' },
  punchTimelineInfo: { flex: 1 },
  punchName: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700' },
  punchRole: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 11 },
  punchMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  punchModeText: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10 },
  punchTerminalText: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10 },
  punchCardRight: { alignItems: 'flex-end' },
  punchTimeText: { ...DT.font.labelSm, color: DT.color.textPrimary, fontWeight: '700', fontSize: 12 },
  lateBadge: { backgroundColor: DT.color.warningBg, paddingHorizontal: 6, paddingVertical: 2, borderRadius: DT.radius.xs, marginTop: 4 },
  lateBadgeText: { ...DT.font.labelSm, color: DT.color.warning, fontSize: 9, fontWeight: '700' },
});
