/**
 * RegistrarDashboard — Gate Kiosk / Attendance Terminal
 *
 * Professional attendance terminal interface:
 * • Live IST master clock & online status beacon
 * • Faculty & staff today progress counter with Lucide vector icons
 * • Real-time gate transits log (Entry / Exit timestamps)
 * • Quick Kiosk Actions: Start Face Scan, Enroll Face, Registrar Console
 * • Terminal Hardware Health monitor
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
  MapPin,
  Clock,
  Users,
  Camera,
  UserPlus,
  SlidersHorizontal,
  LogOut,
  ChevronRight,
  Radio,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';
import { useAuth } from '@/lib/AuthProvider';

export default function RegistrarDashboard() {
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

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={DT.color.accent} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ──────────────────── */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.headerLogo}
                resizeMode="contain"
              />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={styles.schoolName} numberOfLines={1}>SHREE SATYAPRAKASH SCHOOL</Text>
                <Text style={styles.suiteName} numberOfLines={1}>SATYA SETU REGISTRAR SUITE</Text>
              </View>
            </View>
          </View>

          <View style={styles.gateBadge}>
            <MapPin size={12} color={DT.color.accent} strokeWidth={2.2} />
            <Text style={styles.gateText}>GATE 01 KIOSK TERMINAL</Text>
          </View>
        </View>

        {/* ── Master IST Clock ─────────── */}
        <View style={styles.clockCard}>
          <View style={styles.clockHeaderRow}>
            <View style={styles.livePulseDot} />
            <Text style={styles.clockLabel}>INDIAN STANDARD TIME (IST)</Text>
          </View>
          <Text style={styles.clockTime}>{timeStr}</Text>
          <Text style={styles.clockDate}>{dateStr}</Text>
        </View>

        {/* ── Staff Count Progress ────── */}
        <View style={styles.sectionCard}>
          <View style={styles.progressHeader}>
            <View style={styles.progressIcon}>
              <Users size={20} color={DT.color.accent} strokeWidth={2} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.progressLabel}>FACULTY & STAFF TODAY</Text>
              <Text style={styles.progressValue}>
                <Text style={styles.progressBig}>118</Text> / 150
              </Text>
            </View>
            <Text style={styles.progressPercent}>78%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '78%' }]} />
          </View>
          <View style={styles.progressLegend}>
            <LegendDot color={DT.color.success} label="118 Present On-time" />
            <LegendDot color={DT.color.warning} label="6 Exceptions" />
            <LegendDot color={DT.color.danger} label="26 Pending" />
          </View>
        </View>

        {/* ── Recent Gate Transits ────── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>RECENT GATE TRANSITS</Text>
            <TouchableOpacity activeOpacity={0.7} style={styles.viewAllRow}>
              <Text style={styles.viewAllLink}>View Live Feed</Text>
              <ChevronRight size={14} color={DT.color.accent} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {[
            { initials: 'AM', name: 'Dr. Alok Nath Mukherjee', role: 'Senior Physics Faculty', time: '08:14 AM', type: 'IN' },
            { initials: 'PB', name: 'Mrs. Pooja Bhupendra Vyas', role: 'Mathematics HOD', time: '08:12 AM', type: 'IN' },
            { initials: 'RK', name: 'Sh. Ramesh Kumar', role: 'Lab Attendant', time: '08:08 AM', type: 'IN' },
          ].map((transit) => (
            <View key={transit.initials} style={styles.transitRow}>
              <View style={styles.transitAvatar}>
                <Text style={styles.transitInitials}>{transit.initials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.transitName}>{transit.name}</Text>
                <Text style={styles.transitRole}>{transit.role}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <View style={styles.transitBadge}>
                  <Text style={styles.transitBadgeText}>
                    {transit.time} • {transit.type}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* ── Kiosk Quick Actions ──────── */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtnPrimary} activeOpacity={0.7}>
            <Camera size={18} color="#0B132B" strokeWidth={2.2} />
            <Text style={styles.actionBtnPrimaryText}>Start Face Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnSecondary} activeOpacity={0.7}>
            <UserPlus size={18} color={DT.color.accent} strokeWidth={2} />
            <Text style={styles.actionBtnSecondaryText}>Enroll Face</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.consoleBtn} activeOpacity={0.7}>
          <SlidersHorizontal size={18} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.consoleBtnText}>Registrar Console</Text>
        </TouchableOpacity>

        {/* ── Terminal Health ──────────── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TERMINAL HARDWARE HEALTH</Text>
            <View style={styles.healthBadge}>
              <Text style={styles.healthBadgeText}>3 / 3 Active</Text>
            </View>
          </View>

          {[
            { name: 'Terminal A (Gate 1 Primary)', spec: 'Facial Scan • 60 FPS • Latency 42ms', status: 'Online' },
            { name: 'Terminal B (Gate 2 Staff)', spec: 'Dual Optical • 58 FPS • Latency 48ms', status: 'Online' },
            { name: 'Secondary Registrar Stand', spec: 'Manual Fallback Terminal', status: 'Standby' },
          ].map((term) => (
            <View key={term.name} style={styles.terminalRow}>
              <View style={[styles.termDot, {
                backgroundColor: term.status === 'Online' ? DT.color.success : DT.color.warning,
              }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.termName}>{term.name}</Text>
                <Text style={styles.termSpec}>{term.spec}</Text>
              </View>
              <View style={[styles.termBadge, {
                backgroundColor: term.status === 'Online' ? 'rgba(46,125,50,0.15)' : 'rgba(237,108,2,0.15)',
              }]}>
                <Text style={[styles.termBadgeText, {
                  color: term.status === 'Online' ? DT.color.success : DT.color.warning,
                }]}>
                  {term.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── Sign Out ────────────────── */}
        <TouchableOpacity style={styles.signOutBtn} onPress={signOut} activeOpacity={0.7}>
          <LogOut size={16} color={DT.color.danger} strokeWidth={2} />
          <Text style={styles.signOutText}>Sign Out Terminal</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B132B' }, // Dark kiosk theme
  scroll: { flex: 1 },
  scrollContent: { padding: DT.spacing.md },

  // Header
  header: { marginBottom: DT.spacing.md },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLogo: {
    width: 44,
    height: 44,
  },
  schoolName: { ...DT.font.labelSm, color: '#8892B0', letterSpacing: 1.5, fontSize: 10 },
  suiteName: { ...DT.font.h3, color: '#FFFFFF', marginTop: 2 },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(46,125,50,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: DT.radius.full,
    borderWidth: 1,
    borderColor: 'rgba(46,125,50,0.4)',
  },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: DT.color.success },
  onlineText: { ...DT.font.labelSm, color: DT.color.success, fontSize: 10, fontWeight: '700' },
  gateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(23,42,69,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: DT.radius.sm,
    marginTop: DT.spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(100,255,218,0.2)',
  },
  gateText: { ...DT.font.labelSm, color: DT.color.accent, fontSize: 11, letterSpacing: 0.8 },

  // Clock
  clockCard: {
    backgroundColor: '#112240',
    borderRadius: DT.radius.xl,
    padding: DT.spacing.lg,
    alignItems: 'center',
    marginBottom: DT.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(100,255,218,0.15)',
    ...DT.shadow.md,
  },
  clockHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: DT.color.accent,
  },
  clockLabel: { ...DT.font.labelSm, color: DT.color.accent, fontSize: 11, letterSpacing: 1 },
  clockTime: {
    fontFamily: DT.typography.mono,
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginVertical: 4,
  },
  clockDate: { ...DT.font.bodySm, color: '#8892B0' },

  // Section Cards
  sectionCard: {
    backgroundColor: '#112240',
    borderRadius: DT.radius.xl,
    padding: DT.spacing.lg,
    marginBottom: DT.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: DT.spacing.md,
  },
  progressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(100,255,218,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressLabel: { ...DT.font.labelSm, color: '#8892B0', fontSize: 10, letterSpacing: 0.8 },
  progressValue: { ...DT.font.bodySm, color: '#8892B0', marginTop: 2 },
  progressBig: { ...DT.font.h1, color: '#FFFFFF' },
  progressPercent: { ...DT.font.h2, color: DT.color.accent },
  progressBar: {
    height: 8,
    backgroundColor: '#1D3557',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: DT.spacing.md,
  },
  progressFill: { height: '100%', backgroundColor: DT.color.accent, borderRadius: 4 },
  progressLegend: { flexDirection: 'row', justifyContent: 'space-between' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { ...DT.font.labelSm, color: '#8892B0', fontSize: 11 },

  // Recent transits
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DT.spacing.md,
  },
  sectionTitle: { ...DT.font.labelMd, color: '#FFFFFF', letterSpacing: 0.8, fontWeight: '700' },
  viewAllRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  viewAllLink: { ...DT.font.labelSm, color: DT.color.accent, fontSize: 11 },
  transitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DT.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  transitAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1D3557',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transitInitials: { ...DT.font.labelSm, color: DT.color.accent, fontWeight: '700' },
  transitName: { ...DT.font.labelMd, color: '#FFFFFF' },
  transitRole: { ...DT.font.bodySm, color: '#8892B0', fontSize: 11 },
  transitBadge: {
    backgroundColor: 'rgba(100,255,218,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: DT.radius.xs,
  },
  transitBadgeText: { ...DT.font.labelSm, color: DT.color.accent, fontSize: 10 },

  // Actions
  actionsRow: { flexDirection: 'row', gap: DT.spacing.sm, marginBottom: DT.spacing.sm },
  actionBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: DT.color.accent,
    paddingVertical: 14,
    borderRadius: DT.radius.lg,
  },
  actionBtnPrimaryText: { ...DT.font.labelMd, color: '#0B132B', fontWeight: '800' },
  actionBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#112240',
    paddingVertical: 14,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: DT.color.accent,
  },
  actionBtnSecondaryText: { ...DT.font.labelMd, color: DT.color.accent, fontWeight: '700' },
  consoleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1D3557',
    paddingVertical: 12,
    borderRadius: DT.radius.lg,
    marginBottom: DT.spacing.md,
  },
  consoleBtnText: { ...DT.font.labelMd, color: '#FFFFFF', fontWeight: '600' },

  // Terminal Health
  healthBadge: {
    backgroundColor: 'rgba(46,125,50,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: DT.radius.full,
  },
  healthBadgeText: { ...DT.font.labelSm, color: DT.color.success, fontSize: 10, fontWeight: '700' },
  terminalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DT.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  termDot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  termName: { ...DT.font.labelMd, color: '#FFFFFF', fontSize: 13 },
  termSpec: { ...DT.font.bodySm, color: '#8892B0', fontSize: 11, marginTop: 1 },
  termBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: DT.radius.xs },
  termBadgeText: { ...DT.font.labelSm, fontSize: 10, fontWeight: '700' },

  // Sign out
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#112240',
    paddingVertical: DT.spacing.md,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(211,47,47,0.3)',
    marginTop: DT.spacing.sm,
    marginBottom: DT.spacing.xl,
  },
  signOutText: { ...DT.font.labelMd, color: DT.color.danger, fontWeight: '700' },
});
