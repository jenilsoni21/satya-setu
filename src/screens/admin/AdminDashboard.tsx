/**
 * AdminDashboard — Executive Control Desk
 *
 * Matches the institutional admin dashboard design:
 * • Welcome header with live IST time and status indicator
 * • Stat tiles: Total Cadre, Present Today, Absent, Leave, Late (with Lucide icons)
 * • Reports Due widget with urgency badges
 * • Quick Administrative Actions (Push Notice, Roll, Gate Live, Authorize)
 * • Live Biometric Entry Feed with auto-refresh indicator
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
import {
  Users,
  CheckCircle2,
  XCircle,
  CalendarDays,
  Clock,
  ClipboardList,
  Bell,
  Printer,
  Camera,
  UserCheck,
  TrendingUp,
  LogOut,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';
import { useAuth } from '@/lib/AuthProvider';

export default function AdminDashboard() {
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
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const adminDisplayName =
    profile?.full_name && !profile.full_name.includes('Rameshwar') && profile.full_name !== 'Admin'
      ? profile.full_name
      : 'Divyansh Kugasiya';

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
        {/* ── Header ──────────────────── */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={styles.liveBadge}>
              <Text style={styles.liveTag}>EXECUTIVE CONTROL DESK</Text>
              <View style={styles.liveDot} />
              <Text style={styles.liveTime}>IST {timeStr} Live</Text>
            </View>
            <Text style={styles.greeting}>
              Welcome back, {adminDisplayName}
            </Text>
            <Text style={styles.sessionInfo}>
              Academic Session 2024-25 • Shree Satya Prakash School
            </Text>
          </View>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>

        {/* ── Time Filter Row ──────────── */}
        <View style={styles.filterRow}>
          {['Today', 'This Week', 'This Month'].map((label, i) => (
            <TouchableOpacity
              key={label}
              style={[styles.filterBtn, i === 0 && styles.filterBtnActive]}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, i === 0 && styles.filterTextActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Stat Tiles ──────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsRow}
        >
          <StatTile
            Icon={Users}
            label="Total Cadre"
            value="150"
            sub="Active Roll"
            extra="T: 98 • Adm: 24"
            color={DT.color.primary}
          />
          <StatTile
            Icon={CheckCircle2}
            label="Present Today"
            value="138"
            sub="92.0%"
            trend="+1.8% vs last week"
            color={DT.color.success}
          />
          <StatTile
            Icon={XCircle}
            label="Absent Cadre"
            value="6"
            sub="4 Unexcused"
            color={DT.color.danger}
          />
          <StatTile
            Icon={CalendarDays}
            label="Sanctioned Leave"
            value="4"
            sub="Approved"
            color={DT.color.info}
          />
          <StatTile
            Icon={Clock}
            label="Late Arrivals"
            value="2"
            sub="Within 15m"
            color={DT.color.warning}
          />
        </ScrollView>

        {/* ── Reports Due ─────────────── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <ClipboardList size={18} color={DT.color.primary} strokeWidth={2} />
              <Text style={styles.sectionTitle}>Reports Due This Week</Text>
            </View>
            <View style={styles.dueBadge}>
              <Text style={styles.dueBadgeText}>3 Due Today</Text>
            </View>
          </View>

          <ReportItem
            title="Weekly Teacher Lesson Planners"
            urgency="Urgent"
            description="4 pending submissions from Middle Wing (Classes 6 to 8)"
            deadline="Deadline: 11:30 AM Today"
            action="Send Chaser"
          />
          <View style={styles.divider} />
          <ReportItem
            title="Q3 Performance Evaluations"
            urgency="Action Needed"
            description="6 probationary appraisals require Principal countersignature"
            deadline="CBSE Audit Metric"
            action="Review (6)"
          />
        </View>

        {/* ── Quick Administrative Actions ───── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>EMERGENCY & DAILY ADMINISTRATIVE ACTIONS</Text>
          <View style={styles.actionsGrid}>
            {[
              { Icon: Bell, label: 'Push Notice', sub: 'Staff broadcast' },
              { Icon: Printer, label: 'Morning Roll', sub: 'Print physical' },
              { Icon: Camera, label: 'Gate Live', sub: 'Kiosk visualiser' },
              { Icon: UserCheck, label: 'Authorize…', sub: '4 unexcused…' },
            ].map((item) => {
              const ActionIcon = item.Icon;
              return (
                <TouchableOpacity key={item.label} style={styles.actionBtn} activeOpacity={0.7}>
                  <View style={styles.actionIconContainer}>
                    <ActionIcon size={20} color={DT.color.primary} strokeWidth={2} />
                  </View>
                  <Text style={styles.actionLabel}>{item.label}</Text>
                  <Text style={styles.actionSub}>{item.sub}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Live Biometric Entry Feed ─────── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={[styles.liveDot, { backgroundColor: DT.color.success }]} />
              <Text style={styles.sectionTitle}>Live Biometric Entry Feed</Text>
            </View>
            <Text style={styles.autoRefresh}>Auto-refreshes (5s)</Text>
          </View>

          {/* Table header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>STAFF MEMBER</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>CHECK-IN</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>STATUS</Text>
          </View>

          {/* Sample rows */}
          {[
            { name: 'Rajvi Zinzuvadiya', role: 'PGT Senior Physics', time: '08:14 AM', status: 'Biometric', confidence: '99.4%' },
            { name: 'Janvi Vadoliya', role: 'TGT English', time: '08:19 AM', status: 'Biometric', confidence: '98.9%' },
            { name: 'Pramod Trivedi', role: 'PGT Mathematics', time: '08:34 AM', status: 'Late (Grace)', confidence: '' },
            { name: 'Prinsi Moliya', role: 'PRT Hindi', time: '08:05 AM', status: 'Biometric', confidence: '99.1%' },
          ].map((row) => (
            <View key={row.name} style={styles.tableRow}>
              <View style={{ flex: 2 }}>
                <Text style={styles.staffName}>{row.name}</Text>
                <Text style={styles.staffRole}>{row.role}</Text>
              </View>
              <Text style={[styles.tableCell, { flex: 1 }]}>{row.time}</Text>
              <View style={{ flex: 1 }}>
                <View
                  style={[
                    styles.statusChip,
                    {
                      backgroundColor: row.status.includes('Late')
                        ? DT.color.warningBg
                        : DT.color.successBg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusChipText,
                      {
                        color: row.status.includes('Late')
                          ? DT.color.warning
                          : DT.color.success,
                      },
                    ]}
                  >
                    {row.status}
                  </Text>
                </View>
                {row.confidence ? (
                  <Text style={styles.confidenceText}>{row.confidence}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        {/* ── Sign Out ────────────────── */}
        <TouchableOpacity style={styles.signOutBtn} onPress={signOut} activeOpacity={0.7}>
          <LogOut size={16} color={DT.color.danger} strokeWidth={2} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ── Sub-components ──────────────────────────────────────────
function StatTile({
  Icon,
  label,
  value,
  sub,
  extra,
  trend,
  color,
}: {
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  sub: string;
  extra?: string;
  trend?: string;
  color: string;
}) {
  return (
    <View style={styles.statTile}>
      <View style={styles.statTileHeader}>
        <Text style={styles.statLabel}>{label}</Text>
        <View style={styles.statIconBadge}>
          <Icon size={16} color={color} strokeWidth={2} />
        </View>
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statSub}>{sub}</Text>
      {trend && (
        <View style={styles.trendRow}>
          <TrendingUp size={12} color={DT.color.success} strokeWidth={2.2} />
          <Text style={styles.trendText}>{trend}</Text>
        </View>
      )}
      {extra && <Text style={styles.statExtra}>{extra}</Text>}
    </View>
  );
}

function ReportItem({
  title,
  urgency,
  description,
  deadline,
  action,
}: {
  title: string;
  urgency: string;
  description: string;
  deadline: string;
  action: string;
}) {
  const isUrgent = urgency === 'Urgent';
  return (
    <View style={styles.reportItem}>
      <View style={styles.reportHeader}>
        <Text style={styles.reportTitle}>{title}</Text>
        <View
          style={[
            styles.urgencyBadge,
            { backgroundColor: isUrgent ? DT.color.dangerBg : DT.color.warningBg },
          ]}
        >
          <Text
            style={[
              styles.urgencyText,
              { color: isUrgent ? DT.color.danger : DT.color.warning },
            ]}
          >
            {urgency}
          </Text>
        </View>
      </View>
      <Text style={styles.reportDesc}>{description}</Text>
      <View style={styles.reportFooter}>
        <Text style={styles.reportDeadline}>{deadline}</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.reportActionRow}>
          <Text style={styles.reportAction}>{action}</Text>
          <ChevronRight size={13} color={DT.color.primary} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: DT.color.background },
  scroll: { flex: 1 },
  scrollContent: { padding: DT.spacing.md },

  // Header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DT.spacing.md,
  },
  headerLeft: {
    flex: 1,
    paddingRight: DT.spacing.sm,
  },
  headerLogo: {
    width: 52,
    height: 52,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: DT.spacing.sm,
  },
  liveTag: {
    ...DT.font.labelSm,
    color: DT.color.accent,
    backgroundColor: DT.color.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: DT.radius.xs,
    overflow: 'hidden',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: DT.color.accent,
  },
  liveTime: { ...DT.font.labelSm, color: DT.color.textSecondary },
  greeting: { ...DT.font.h1, color: DT.color.textPrimary },
  sessionInfo: { ...DT.font.bodySm, color: DT.color.textMuted, marginTop: 2 },

  // Filter
  filterRow: {
    flexDirection: 'row',
    gap: DT.spacing.sm,
    marginBottom: DT.spacing.lg,
  },
  filterBtn: {
    paddingHorizontal: DT.spacing.md,
    paddingVertical: 6,
    borderRadius: DT.radius.full,
    backgroundColor: DT.color.surfaceDim,
  },
  filterBtnActive: { backgroundColor: DT.color.primary },
  filterText: { ...DT.font.labelSm, color: DT.color.textSecondary },
  filterTextActive: { color: '#FFF', fontWeight: '700' },

  // Stat tiles
  statsRow: { gap: DT.spacing.sm, paddingBottom: DT.spacing.md },
  statTile: {
    width: 140,
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.lg,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  statTileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DT.spacing.xs,
  },
  statIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: DT.color.surfaceDim,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: { ...DT.font.labelSm, color: DT.color.textMuted },
  statValue: { ...DT.font.h1, marginVertical: DT.spacing.xs },
  statSub: { ...DT.font.bodySm, color: DT.color.textSecondary },
  statExtra: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10, marginTop: 2 },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  trendText: {
    ...DT.font.labelSm,
    color: DT.color.success,
    fontSize: 10,
    fontWeight: '600',
  },

  // Sections
  sectionCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.lg,
    marginBottom: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DT.spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: { ...DT.font.h3, color: DT.color.textPrimary },
  sectionLabel: {
    ...DT.font.labelSm,
    color: DT.color.textMuted,
    letterSpacing: 0.8,
    marginBottom: DT.spacing.md,
  },
  dueBadge: {
    backgroundColor: DT.color.dangerBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: DT.radius.full,
  },
  dueBadgeText: { ...DT.font.labelSm, color: DT.color.danger, fontWeight: '700' },
  divider: { height: 1, backgroundColor: DT.color.borderLight, marginVertical: DT.spacing.md },

  // Report items
  reportItem: {},
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reportTitle: { ...DT.font.h4, color: DT.color.textPrimary, flex: 1 },
  urgencyBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: DT.radius.xs },
  urgencyText: { ...DT.font.labelSm, fontSize: 10, fontWeight: '700' },
  reportDesc: { ...DT.font.bodySm, color: DT.color.textSecondary, marginBottom: DT.spacing.xs },
  reportFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reportDeadline: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 11 },
  reportActionRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  reportAction: { ...DT.font.labelSm, color: DT.color.primary, fontWeight: '700' },

  // Actions grid
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: DT.spacing.sm },
  actionBtn: {
    width: '48%',
    backgroundColor: DT.color.surfaceDim,
    borderRadius: DT.radius.lg,
    padding: DT.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DT.color.borderLight,
  },
  actionIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: DT.color.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DT.spacing.xs,
  },
  actionLabel: { ...DT.font.labelMd, color: DT.color.textPrimary },
  actionSub: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 11 },

  // Biometric feed
  autoRefresh: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 11 },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: DT.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: DT.color.borderLight,
    marginBottom: DT.spacing.xs,
  },
  tableHeaderText: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10, letterSpacing: 0.5 },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DT.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: DT.color.borderLight,
  },
  staffName: { ...DT.font.labelMd, color: DT.color.textPrimary },
  staffRole: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 11 },
  tableCell: { ...DT.font.bodySm, color: DT.color.textSecondary },
  statusChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: DT.radius.xs,
    alignSelf: 'flex-start',
  },
  statusChipText: { ...DT.font.labelSm, fontSize: 10, fontWeight: '700' },
  confidenceText: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 9, marginTop: 1 },

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
