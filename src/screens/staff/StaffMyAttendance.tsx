/**
 * StaffMyAttendance — Personal Attendance Ledger & Leave Application
 *
 * Dedicated teacher module:
 * • Today's Check-in & Gate Transit details with biometric face match confidence
 * • Leave Balances: Casual (8/12), Medical (10/10), Earned/Duty Leave (2)
 * • Apply for Leave action modal (Leave type, date range, substitute teacher)
 * • 30-day chronological personal attendance log with status chips
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {
  Clock,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Plus,
  X,
  Send,
  ShieldCheck,
  Calendar,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';

interface AttendanceLog {
  date: string;
  day: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'late' | 'leave' | 'holiday';
  hours: string;
  terminal: string;
}

const SAMPLE_LOGS: AttendanceLog[] = [
  { date: '15 Oct', day: 'Today', checkIn: '08:14 AM', checkOut: '—', status: 'present', hours: 'In progress', terminal: 'Gate 01' },
  { date: '14 Oct', day: 'Wed', checkIn: '08:10 AM', checkOut: '02:35 PM', status: 'present', hours: '6h 25m', terminal: 'Gate 01' },
  { date: '13 Oct', day: 'Tue', checkIn: '08:08 AM', checkOut: '02:40 PM', status: 'present', hours: '6h 32m', terminal: 'Gate 01' },
  { date: '12 Oct', day: 'Mon', checkIn: '08:24 AM', checkOut: '02:30 PM', status: 'late', hours: '6h 06m', terminal: 'Gate 02' },
  { date: '10 Oct', day: 'Sat', checkIn: '08:12 AM', checkOut: '01:00 PM', status: 'present', hours: '4h 48m', terminal: 'Gate 01' },
  { date: '09 Oct', day: 'Fri', checkIn: 'Sanctioned', checkOut: '—', status: 'leave', hours: '0h', terminal: 'Casual' },
];

export default function StaffMyAttendance() {
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [leaveReason, setLeaveReason] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleApplyLeave = () => {
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowLeaveModal(false);
      setLeaveReason('');
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* ── Subheader ──────────────────────── */}
      <View style={styles.subHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>My Attendance & Leaves</Text>
          <TouchableOpacity
            style={styles.applyLeaveBtn}
            onPress={() => setShowLeaveModal(true)}
            activeOpacity={0.7}
          >
            <Plus size={14} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={styles.applyLeaveBtnText}>Apply Leave</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subText}>Personal gate punches, leave ledger & monthly duty logs</Text>
      </View>

      {/* ── Today's Check-in Hero Card ──────── */}
      <View style={styles.todayCard}>
        <View style={styles.todayCardTop}>
          <View>
            <Text style={styles.todayCardLabel}>TODAY'S ATTENDANCE STATUS</Text>
            <View style={styles.statusPillRow}>
              <View style={styles.statusPill}>
                <CheckCircle2 size={14} color={DT.color.success} strokeWidth={2.4} />
                <Text style={styles.statusPillText}>Verified Present</Text>
              </View>
              <Text style={styles.terminalTag}>Gate 01 Biometric • 99.4% Face Match</Text>
            </View>
          </View>
        </View>

        <View style={styles.punchTimesGrid}>
          <View style={styles.punchTimeCell}>
            <Text style={styles.punchTimeLabel}>Check-In Time</Text>
            <Text style={styles.punchTimeValue}>08:14 AM</Text>
            <Text style={styles.punchTimeSub}>On-Time (Grace 15m)</Text>
          </View>
          <View style={styles.punchTimeCell}>
            <Text style={styles.punchTimeLabel}>Check-Out Time</Text>
            <Text style={styles.punchTimeValue}>—</Text>
            <Text style={styles.punchTimeSub}>Shift ends 02:30 PM</Text>
          </View>
          <View style={styles.punchTimeCell}>
            <Text style={styles.punchTimeLabel}>Shift Duration</Text>
            <Text style={styles.punchTimeValue}>6h 30m</Text>
            <Text style={styles.punchTimeSub}>Standard Shift</Text>
          </View>
        </View>
      </View>

      {/* ── Leave Balances ──────────────────── */}
      <View style={styles.sectionHeader}>
        <CalendarDays size={16} color={DT.color.primary} strokeWidth={2} />
        <Text style={styles.sectionHeaderText}>Annual Sanctioned Leave Balance</Text>
      </View>

      <View style={styles.leaveBalanceGrid}>
        <View style={styles.leaveBalanceCard}>
          <Text style={styles.leaveBalanceLabel}>Casual Leave (CL)</Text>
          <Text style={[styles.leaveBalanceBig, { color: DT.color.primary }]}>8<Text style={styles.leaveBalanceMax}> / 12</Text></Text>
          <Text style={styles.leaveBalanceSub}>4 Days Availed</Text>
        </View>
        <View style={styles.leaveBalanceCard}>
          <Text style={styles.leaveBalanceLabel}>Medical Leave (ML)</Text>
          <Text style={[styles.leaveBalanceBig, { color: DT.color.info }]}>10<Text style={styles.leaveBalanceMax}> / 10</Text></Text>
          <Text style={styles.leaveBalanceSub}>Full Balance</Text>
        </View>
        <View style={styles.leaveBalanceCard}>
          <Text style={styles.leaveBalanceLabel}>Duty / Exam Leave</Text>
          <Text style={[styles.leaveBalanceBig, { color: DT.color.accentDark }]}>2</Text>
          <Text style={styles.leaveBalanceSub}>CBSE Invigilation</Text>
        </View>
      </View>

      {/* ── Attendance Log History ──────────── */}
      <View style={[styles.sectionHeader, { marginTop: DT.spacing.md }]}>
        <Clock size={16} color={DT.color.primary} strokeWidth={2} />
        <Text style={styles.sectionHeaderText}>Recent Gate Transit Ledger</Text>
      </View>

      <View style={styles.logsList}>
        {SAMPLE_LOGS.map((log, idx) => {
          const isPresent = log.status === 'present';
          const isLate = log.status === 'late';
          return (
            <View key={idx} style={styles.logCard}>
              <View style={styles.logDateColumn}>
                <Text style={styles.logDateText}>{log.date}</Text>
                <Text style={styles.logDayText}>{log.day}</Text>
              </View>

              <View style={{ flex: 1, paddingHorizontal: DT.spacing.sm }}>
                <View style={styles.logPunchesRow}>
                  <Text style={styles.logPunchIn}>In: {log.checkIn}</Text>
                  <Text style={styles.logPunchOut}>Out: {log.checkOut}</Text>
                </View>
                <Text style={styles.logTerminalText}>Terminal: {log.terminal} • {log.hours}</Text>
              </View>

              <View
                style={[
                  styles.logStatusBadge,
                  isPresent
                    ? { backgroundColor: DT.color.successBg }
                    : isLate
                    ? { backgroundColor: DT.color.warningBg }
                    : { backgroundColor: DT.color.infoBg },
                ]}
              >
                <Text
                  style={[
                    styles.logStatusText,
                    isPresent
                      ? { color: DT.color.success }
                      : isLate
                      ? { color: DT.color.warning }
                      : { color: DT.color.info },
                  ]}
                >
                  {log.status === 'present' ? 'Present' : log.status === 'late' ? 'Late' : 'Leave'}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* ── Apply Leave Modal ───────────────── */}
      <Modal visible={showLeaveModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Apply for Leave</Text>
              <TouchableOpacity onPress={() => setShowLeaveModal(false)}>
                <X size={20} color={DT.color.textSecondary} />
              </TouchableOpacity>
            </View>

            {submittedMessage ? (
              <View style={styles.submittedBox}>
                <CheckCircle2 size={36} color={DT.color.success} strokeWidth={2} />
                <Text style={styles.submittedTitle}>Leave Application Sent!</Text>
                <Text style={styles.submittedDesc}>Submitted to Principal for digital countersignature</Text>
              </View>
            ) : (
              <>
                <Text style={styles.formLabel}>Leave Category</Text>
                <View style={styles.leaveTypeRow}>
                  {['Casual Leave', 'Medical Leave', 'On-Duty (CBSE)'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[styles.typeBtn, leaveType === type && styles.typeBtnActive]}
                      onPress={() => setLeaveType(type)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.typeBtnText, leaveType === type && styles.typeBtnTextActive]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.formLabel}>Date Range</Text>
                <View style={styles.dateRangeBox}>
                  <Calendar size={16} color={DT.color.primary} />
                  <Text style={styles.dateRangeText}>Next Monday - Tuesday (2 Days)</Text>
                </View>

                <Text style={styles.formLabel}>Reason / Classroom Coverage</Text>
                <TextInput
                  style={styles.reasonInput}
                  placeholder="State reason and replacement faculty for periods..."
                  placeholderTextColor={DT.color.textMuted}
                  multiline
                  numberOfLines={3}
                  value={leaveReason}
                  onChangeText={setLeaveReason}
                />

                <TouchableOpacity style={styles.submitLeaveBtn} onPress={handleApplyLeave} activeOpacity={0.8}>
                  <Send size={15} color="#FFFFFF" strokeWidth={2.2} />
                  <Text style={styles.submitLeaveBtnText}>Submit to Principal</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DT.color.background },
  content: { padding: DT.spacing.md, paddingBottom: 120 },

  subHeader: { marginBottom: DT.spacing.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 },
  sectionTitle: { ...DT.font.h1, color: DT.color.textPrimary, flexShrink: 1 },
  applyLeaveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DT.color.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: DT.radius.md,
  },
  applyLeaveBtnText: { ...DT.font.labelSm, color: '#FFFFFF', fontWeight: '700' },
  subText: { ...DT.font.bodySm, color: DT.color.textSecondary, marginTop: 2 },

  // Today Hero
  todayCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    marginBottom: DT.spacing.md,
    ...DT.shadow.sm,
  },
  todayCardTop: { marginBottom: DT.spacing.md },
  todayCardLabel: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10, letterSpacing: 0.8 },
  statusPillRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DT.color.successBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: DT.radius.full,
  },
  statusPillText: { ...DT.font.labelSm, color: DT.color.success, fontWeight: '700' },
  terminalTag: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 11 },

  punchTimesGrid: { flexDirection: 'row', gap: 8 },
  punchTimeCell: {
    flex: 1,
    backgroundColor: DT.color.surfaceDim,
    padding: DT.spacing.sm,
    borderRadius: DT.radius.md,
  },
  punchTimeLabel: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10 },
  punchTimeValue: { ...DT.font.h3, color: DT.color.textPrimary, marginVertical: 2 },
  punchTimeSub: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 10 },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: DT.spacing.sm },
  sectionHeaderText: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700', letterSpacing: 0.5 },

  // Leave Balances
  leaveBalanceGrid: { flexDirection: 'row', gap: DT.spacing.xs, marginBottom: DT.spacing.md },
  leaveBalanceCard: {
    flex: 1,
    backgroundColor: DT.color.surface,
    padding: DT.spacing.sm,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  leaveBalanceLabel: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10 },
  leaveBalanceBig: { ...DT.font.h2, marginVertical: 2 },
  leaveBalanceMax: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 11 },
  leaveBalanceSub: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 10 },

  // Logs
  logsList: { gap: DT.spacing.sm },
  logCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DT.color.surface,
    padding: DT.spacing.md,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  logDateColumn: { width: 50 },
  logDateText: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700' },
  logDayText: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 11 },
  logPunchesRow: { flexDirection: 'row', gap: 12 },
  logPunchIn: { ...DT.font.labelSm, color: DT.color.textPrimary, fontWeight: '600' },
  logPunchOut: { ...DT.font.labelSm, color: DT.color.textSecondary },
  logTerminalText: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 10, marginTop: 2 },
  logStatusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: DT.radius.xs },
  logStatusText: { ...DT.font.labelSm, fontSize: 10, fontWeight: '700' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: DT.color.surface, borderTopLeftRadius: DT.radius.xxl, borderTopRightRadius: DT.radius.xxl, padding: DT.spacing.lg },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: DT.spacing.md },
  modalTitle: { ...DT.font.h3, color: DT.color.textPrimary },
  formLabel: { ...DT.font.labelSm, color: DT.color.textPrimary, marginTop: DT.spacing.sm, marginBottom: 4 },
  leaveTypeRow: { flexDirection: 'row', gap: 6, marginBottom: DT.spacing.xs },
  typeBtn: { flex: 1, paddingVertical: 8, borderRadius: DT.radius.md, backgroundColor: DT.color.surfaceDim, alignItems: 'center' },
  typeBtnActive: { backgroundColor: DT.color.primary },
  typeBtnText: { ...DT.font.labelSm, color: DT.color.textSecondary, fontSize: 11 },
  typeBtnTextActive: { color: '#FFFFFF', fontWeight: '700' },
  dateRangeBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: DT.color.surfaceDim, padding: DT.spacing.sm, borderRadius: DT.radius.md },
  dateRangeText: { ...DT.font.bodyMd, color: DT.color.textPrimary },
  reasonInput: { backgroundColor: DT.color.surfaceDim, borderRadius: DT.radius.md, padding: DT.spacing.sm, textAlignVertical: 'top', height: 70, ...DT.font.bodySm, color: DT.color.textPrimary },
  submitLeaveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: DT.color.primary, paddingVertical: 12, borderRadius: DT.radius.md, marginTop: DT.spacing.md },
  submitLeaveBtnText: { ...DT.font.labelMd, color: '#FFFFFF', fontWeight: '700' },

  submittedBox: { alignItems: 'center', paddingVertical: DT.spacing.lg },
  submittedTitle: { ...DT.font.h3, color: DT.color.success, marginTop: DT.spacing.sm },
  submittedDesc: { ...DT.font.bodySm, color: DT.color.textSecondary, textAlign: 'center', marginTop: 4 },
});
