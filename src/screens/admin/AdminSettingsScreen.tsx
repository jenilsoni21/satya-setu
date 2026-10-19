/**
 * AdminSettingsScreen — Administrative Configuration & System Governance
 *
 * Provides executive controls:
 * • Campus Biometric Terminal Gate Health & IP Pairing
 * • Academic Session Management (2024-25 • Term 2)
 * • Supabase Database Synchronization status & RLS enforcement
 * • Administrator Security Credentials & Session Log Out
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {
  Settings,
  ShieldCheck,
  Server,
  KeyRound,
  Database,
  Radio,
  LogOut,
  ChevronRight,
  Sliders,
  CheckCircle2,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';
import { useAuth } from '@/lib/AuthProvider';

export default function AdminSettingsScreen() {
  const { profile, signOut } = useAuth();
  const [autoReconcile, setAutoReconcile] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);

  const adminDisplayName =
    profile?.full_name && !profile.full_name.includes('Rameshwar') && profile.full_name !== 'Admin'
      ? profile.full_name
      : 'Divyansh Kugasiya';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* ── Subheader ──────────────────────── */}
      <View style={styles.subHeader}>
        <Text style={styles.sectionTitle}>System Governance & Settings</Text>
        <Text style={styles.subText}>Institutional control desk, terminal pairing & audit security</Text>
      </View>

      {/* ── Admin Info Card ────────────────── */}
      <View style={styles.adminCard}>
        <View style={styles.adminCardTop}>
          <View style={styles.adminAvatar}>
            <Text style={styles.adminAvatarText}>DK</Text>
          </View>
          <View style={{ flex: 1, paddingLeft: DT.spacing.sm }}>
            <Text style={styles.adminName}>{adminDisplayName}</Text>
            <Text style={styles.adminRole}>Principal & Academic Director</Text>
            <Text style={styles.adminCode}>SSP-ADM-001 • Executive Clearance</Text>
          </View>
        </View>
      </View>

      {/* ── Terminal Gate Status ───────────── */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Server size={18} color={DT.color.primary} strokeWidth={2} />
          <Text style={styles.cardTitle}>Gate Biometric Terminals</Text>
        </View>

        {[
          { name: 'Terminal Gate 01 (Main Kiosk)', ip: '192.168.1.104 • Port 8081', status: 'Online (60 FPS)' },
          { name: 'Terminal Gate 02 (Staff Vestibule)', ip: '192.168.1.108 • Port 8081', status: 'Online (58 FPS)' },
          { name: 'Standby Registrar Desk Terminal', ip: '192.168.1.112 • Fallback Standby', status: 'Standby' },
        ].map((t, idx) => (
          <View key={idx} style={styles.terminalRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.termTitle}>{t.name}</Text>
              <Text style={styles.termIp}>{t.ip}</Text>
            </View>
            <View style={styles.termOnlineBadge}>
              <View style={styles.termDot} />
              <Text style={styles.termOnlineText}>{t.status}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* ── Audit & Automation Controls ────── */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Sliders size={18} color={DT.color.primary} strokeWidth={2} />
          <Text style={styles.cardTitle}>Automation & Policies</Text>
        </View>

        <View style={styles.toggleRow}>
          <View style={{ flex: 1, paddingRight: DT.spacing.sm }}>
            <Text style={styles.toggleTitle}>Auto-Reconcile Grace Period</Text>
            <Text style={styles.toggleSub}>Allow 15-minute grace check-in before flagging late</Text>
          </View>
          <Switch
            value={autoReconcile}
            onValueChange={setAutoReconcile}
            trackColor={{ true: DT.color.primary, false: DT.color.border }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.toggleRow}>
          <View style={{ flex: 1, paddingRight: DT.spacing.sm }}>
            <Text style={styles.toggleTitle}>Instant Chaser Broadcasts</Text>
            <Text style={styles.toggleSub}>Send push notification to middle wing for pending planners</Text>
          </View>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            trackColor={{ true: DT.color.primary, false: DT.color.border }}
          />
        </View>
      </View>

      {/* ── Database & Backend ─────────────── */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Database size={18} color={DT.color.primary} strokeWidth={2} />
          <Text style={styles.cardTitle}>Backend & RLS Security</Text>
        </View>

        <View style={styles.securityRow}>
          <View style={styles.checkCircle}>
            <CheckCircle2 size={16} color={DT.color.success} strokeWidth={2.2} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.securityTitle}>Supabase Cloud Active</Text>
            <Text style={styles.securitySub}>Row Level Security policies active on 5 tables</Text>
          </View>
        </View>
      </View>

      {/* ── Sign Out Button ────────────────── */}
      <TouchableOpacity style={styles.signOutBtn} onPress={signOut} activeOpacity={0.7}>
        <LogOut size={16} color={DT.color.danger} strokeWidth={2} />
        <Text style={styles.signOutText}>Sign Out Executive Control Desk</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DT.color.background },
  content: { padding: DT.spacing.md, paddingBottom: 32 },

  subHeader: { marginBottom: DT.spacing.md },
  sectionTitle: { ...DT.font.h1, color: DT.color.textPrimary },
  subText: { ...DT.font.bodySm, color: DT.color.textSecondary, marginTop: 2 },

  adminCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    marginBottom: DT.spacing.md,
    ...DT.shadow.sm,
  },
  adminCardTop: { flexDirection: 'row', alignItems: 'center' },
  adminAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: DT.color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminAvatarText: { ...DT.font.h2, color: '#FFFFFF', fontWeight: '700' },
  adminName: { ...DT.font.h3, color: DT.color.textPrimary },
  adminRole: { ...DT.font.labelSm, color: DT.color.primary, marginTop: 1 },
  adminCode: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 11, marginTop: 1 },

  sectionCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    marginBottom: DT.spacing.md,
    ...DT.shadow.sm,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: DT.spacing.md },
  cardTitle: { ...DT.font.h4, color: DT.color.textPrimary },
  terminalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: DT.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: DT.color.borderLight,
  },
  termTitle: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '600' },
  termIp: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 11 },
  termOnlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: DT.radius.full,
  },
  termDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: DT.color.success },
  termOnlineText: { ...DT.font.labelSm, color: DT.color.success, fontSize: 10, fontWeight: '700' },

  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: DT.spacing.xs },
  toggleTitle: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '600' },
  toggleSub: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 11, marginTop: 2 },
  divider: { height: 1, backgroundColor: DT.color.borderLight, marginVertical: DT.spacing.sm },

  securityRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: DT.color.successBg, justifyContent: 'center', alignItems: 'center' },
  securityTitle: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700' },
  securitySub: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 11 },

  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: DT.color.surface,
    paddingVertical: 14,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.25)',
    marginTop: DT.spacing.xs,
    marginBottom: DT.spacing.xl,
  },
  signOutText: { ...DT.font.labelMd, color: DT.color.danger, fontWeight: '700' },
});
