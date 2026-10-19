/**
 * StaffDashboard — Teacher & Staff view
 *
 * Professional academic faculty portal:
 * • Welcome header with faculty designation and IST live time
 * • Today's attendance status card with check-in timestamp
 * • Monthly summary metrics (Present, Absent, Leave, Late)
 * • Quick Actions: Daily Planner, Performance Reports, Apply Leave, Attendance Log
 * • Notices & Reminders bulletin with urgency tags
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Clock,
  CheckCircle2,
  BarChart3,
  Zap,
  CalendarCheck,
  Award,
  CalendarPlus,
  History,
  Bell,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Check,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';
import { useAuth } from '@/lib/AuthProvider';

interface StaffDashboardProps {
  onNavigateTab?: (tab: string) => void;
}

export default function StaffDashboard({ onNavigateTab }: StaffDashboardProps = {}) {
  const { profile, signOut } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });

  const dateStr = currentTime.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const facultyFirstName = profile?.full_name?.split(' ')[0] ?? 'Rajvi';

  return (
    <View style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={DT.color.primary} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header Card ─────────────────── */}
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={{ flex: 1, paddingRight: DT.spacing.sm }}>
              <View style={styles.greetingRow}>
                <Text style={styles.greeting}>Good Morning, {facultyFirstName}</Text>
              </View>
              <Text style={styles.designation}>
                {profile?.designation ?? 'PGT Senior Physics'} • {profile?.department ?? 'Senior Secondary Science'}
              </Text>
            </View>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {profile?.full_name?.charAt(0)?.toUpperCase() ?? 'R'}
              </Text>
            </View>
          </View>

          <View style={styles.timeRow}>
            <View style={styles.timeBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.timeText}>{timeStr} IST</Text>
            </View>
            <Text style={styles.dateText}>{dateStr}</Text>
          </View>
        </View>

        {/* ── My Attendance Today ─────────── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Clock size={18} color={DT.color.primary} strokeWidth={2} />
            <Text style={styles.sectionTitle}>My Attendance Today</Text>
          </View>

          <View style={styles.attendanceGrid}>
            <View style={[styles.attendanceTile, { backgroundColor: DT.color.successBg }]}>
              <View style={styles.statusIconCircle}>
                <Check size={16} color={DT.color.success} strokeWidth={3} />
              </View>
              <Text style={styles.attendanceLabel}>Status</Text>
              <Text style={[styles.attendanceStatus, { color: DT.color.success }]}>Present</Text>
            </View>

            <View style={[styles.attendanceTile, { backgroundColor: DT.color.primaryLight }]}>
              <Text style={[styles.attendanceValue, { color: DT.color.primary }]}>08:14</Text>
              <Text style={styles.attendanceLabel}>Check-In</Text>
              <Text style={styles.attendanceSub}>On Time</Text>
            </View>

            <View style={[styles.attendanceTile, { backgroundColor: DT.color.surfaceDim }]}>
              <Text style={[styles.attendanceValue, { color: DT.color.textSecondary }]}>—</Text>
              <Text style={styles.attendanceLabel}>Check-Out</Text>
              <Text style={styles.attendanceSub}>Pending</Text>
            </View>

            <View style={[styles.attendanceTile, { backgroundColor: DT.color.accentLight }]}>
              <Text style={[styles.attendanceValue, { color: DT.color.accent }]}>0h</Text>
              <Text style={styles.attendanceLabel}>Hours Today</Text>
              <Text style={styles.attendanceSub}>In progress</Text>
            </View>
          </View>
        </View>

        {/* ── Monthly Summary ─────────────── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <BarChart3 size={18} color={DT.color.primary} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Monthly Attendance Summary</Text>
          </View>

          <View style={styles.monthGrid}>
            <MiniStat label="Present" value="22" color={DT.color.success} bg={DT.color.successBg} />
            <MiniStat label="Absent" value="1" color={DT.color.danger} bg={DT.color.dangerBg} />
            <MiniStat label="Leave" value="2" color={DT.color.info} bg={DT.color.infoBg} />
            <MiniStat label="Late" value="3" color={DT.color.warning} bg={DT.color.warningBg} />
          </View>
          <View style={styles.percentBar}>
            <View style={[styles.percentFill, { width: '88%' }]} />
          </View>
          <Text style={styles.percentText}>Attendance Rate: 88% (Target: 95%)</Text>
        </View>

        {/* ── Quick Actions ───────────────── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Zap size={18} color={DT.color.primary} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>

          <View style={styles.quickGrid}>
            {[
              { Icon: CalendarCheck, label: 'Daily Planner', sub: 'Plan & checklist', tab: 'planner' },
              { Icon: Award, label: 'My Reports', sub: 'Performance', tab: 'reports' },
              { Icon: CalendarPlus, label: 'Apply Leave', sub: 'Casual / Medical', tab: 'attendance' },
              { Icon: History, label: 'Attendance Log', sub: 'Full history', tab: 'attendance' },
            ].map((item) => {
              const ActionIcon = item.Icon;
              return (
                <TouchableOpacity
                  key={item.label}
                  style={styles.quickBtn}
                  activeOpacity={0.7}
                  onPress={() => item.tab && onNavigateTab?.(item.tab)}
                >
                  <View style={styles.quickIconCircle}>
                    <ActionIcon size={20} color={DT.color.primary} strokeWidth={2} />
                  </View>
                  <Text style={styles.quickLabel}>{item.label}</Text>
                  <Text style={styles.quickSub}>{item.sub}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Notices & Reminders ─────────── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Bell size={18} color={DT.color.primary} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Notices & Reminders</Text>
          </View>

          <View style={styles.noticeItem}>
            <View style={[styles.noticeDot, { backgroundColor: DT.color.danger }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.noticeTitle}>Weekly Lesson Planner Due</Text>
              <Text style={styles.noticeSub}>Submit before 11:30 AM today</Text>
            </View>
            <View style={styles.urgencyBadge}>
              <Text style={styles.urgencyText}>Urgent</Text>
            </View>
          </View>

          <View style={styles.noticeItem}>
            <View style={[styles.noticeDot, { backgroundColor: DT.color.info }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.noticeTitle}>Staff Meeting Scheduled</Text>
              <Text style={styles.noticeSub}>Conference Hall, 4:00 PM tomorrow</Text>
            </View>
          </View>
        </View>

        {/* ── Sign Out ────────────────────── */}
        <TouchableOpacity style={styles.signOutBtn} onPress={signOut} activeOpacity={0.7}>
          <LogOut size={16} color={DT.color.danger} strokeWidth={2} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function MiniStat({
  label,
  value,
  color,
  bg,
}: {
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <View style={[styles.miniStat, { backgroundColor: bg }]}>
      <Text style={[styles.miniStatValue, { color }]}>{value}</Text>
      <Text style={styles.miniStatLabel}>{label}</Text>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: DT.color.background },
  scroll: { flex: 1 },
  scrollContent: { padding: DT.spacing.md, paddingBottom: 120 },

  // Header Card
  headerCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.lg,
    marginBottom: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DT.spacing.md,
  },
  headerLogo: {
    width: 48,
    height: 48,
    marginRight: DT.spacing.sm,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  greeting: { ...DT.font.h2, color: DT.color.textPrimary },
  designation: { ...DT.font.bodySm, color: DT.color.textSecondary, marginTop: 2 },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: DT.color.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: DT.color.primaryBorder,
  },
  avatarText: { ...DT.font.h3, color: DT.color.primary, fontWeight: '700' },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: DT.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: DT.color.borderLight,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: DT.color.surfaceDim,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: DT.radius.full,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: DT.color.success,
  },
  timeText: { ...DT.font.labelSm, color: DT.color.textSecondary },
  dateText: { ...DT.font.bodySm, color: DT.color.textMuted },

  // Section Cards
  sectionCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.lg,
    marginBottom: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: DT.spacing.md,
  },
  sectionTitle: { ...DT.font.h3, color: DT.color.textPrimary },

  // Attendance Grid
  attendanceGrid: {
    flexDirection: 'row',
    gap: DT.spacing.xs,
  },
  attendanceTile: {
    flex: 1,
    borderRadius: DT.radius.md,
    padding: DT.spacing.sm,
    alignItems: 'center',
  },
  statusIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  attendanceValue: { ...DT.font.h2, marginBottom: 2 },
  attendanceLabel: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10 },
  attendanceStatus: { ...DT.font.labelSm, fontWeight: '700', fontSize: 11 },
  attendanceSub: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 10 },

  // Monthly Summary
  monthGrid: {
    flexDirection: 'row',
    gap: DT.spacing.sm,
    marginBottom: DT.spacing.md,
  },
  miniStat: {
    flex: 1,
    borderRadius: DT.radius.md,
    padding: DT.spacing.sm,
    alignItems: 'center',
  },
  miniStatValue: { ...DT.font.h2, marginBottom: 2 },
  miniStatLabel: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10 },
  percentBar: {
    height: 6,
    backgroundColor: DT.color.surfaceDim,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: DT.spacing.xs,
  },
  percentFill: {
    height: '100%',
    backgroundColor: DT.color.primary,
    borderRadius: 3,
  },
  percentText: { ...DT.font.labelSm, color: DT.color.textSecondary, textAlign: 'center' },

  // Quick Actions
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DT.spacing.sm,
  },
  quickBtn: {
    width: '48%',
    backgroundColor: DT.color.surfaceDim,
    borderRadius: DT.radius.lg,
    padding: DT.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DT.color.borderLight,
  },
  quickIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: DT.color.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DT.spacing.xs,
  },
  quickLabel: { ...DT.font.labelMd, color: DT.color.textPrimary },
  quickSub: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 11 },

  // Notices
  noticeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DT.spacing.sm,
    paddingVertical: DT.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: DT.color.borderLight,
  },
  noticeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  noticeTitle: { ...DT.font.labelMd, color: DT.color.textPrimary },
  noticeSub: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 11 },
  urgencyBadge: {
    backgroundColor: DT.color.dangerBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: DT.radius.xs,
  },
  urgencyText: { ...DT.font.labelSm, color: DT.color.danger, fontSize: 10, fontWeight: '700' },

  // Sign out
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: DT.color.surface,
    paddingVertical: DT.spacing.md,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: DT.color.dangerBg,
    marginTop: DT.spacing.md,
    marginBottom: DT.spacing.xl,
  },
  signOutText: { ...DT.font.labelMd, color: DT.color.danger, fontWeight: '700' },
});
