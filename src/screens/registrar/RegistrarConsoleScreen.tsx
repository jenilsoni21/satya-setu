/**
 * RegistrarConsoleScreen — Terminal Hardware Diagnostics & Kiosk System Controls
 *
 * Dedicated gate registrar module:
 * • Hardware Telemetry Diagnostics (Terminal A, B, C, Latency, FPS, Lux)
 * • Edge Offline Cache Sync status (Safe local caching for Wi-Fi drops)
 * • Optical Sensor Sensitivity & Liveness Anti-Spoofing settings
 * • Terminal Lock & Session Sign Out
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {
  SlidersHorizontal,
  Cpu,
  Camera,
  Radio,
  CloudOff,
  Cloud,
  CheckCircle2,
  Lock,
  LogOut,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';
import { useAuth } from '@/lib/AuthProvider';

export default function RegistrarConsoleScreen() {
  const { signOut } = useAuth();
  const [livenessCheck, setLivenessCheck] = useState(true);
  const [autoIlluminator, setAutoIlluminator] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* ── Subheader ──────────────────────── */}
      <View style={styles.subHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Registrar Hardware Console</Text>
          <View style={styles.healthBadge}>
            <CheckCircle2 size={12} color="#64FFDA" />
            <Text style={styles.healthBadgeText}>3 / 3 Terminals Active</Text>
          </View>
        </View>
        <Text style={styles.subText}>Optical sensor calibrations, edge cache sync & hardware diagnostics</Text>
      </View>

      {/* ── Active Hardware Terminals ───────── */}
      <View style={styles.sectionCard}>
        <View style={styles.cardHeader}>
          <Cpu size={16} color={DT.color.accent} />
          <Text style={styles.cardTitle}>Terminal Sensor Array Status</Text>
        </View>

        {[
          { name: 'Terminal A (Gate 01 Primary)', spec: 'FHD Optical • 60 FPS • Latency 42ms', lux: '420 Lux (Optimal)', status: 'Online' },
          { name: 'Terminal B (Gate 02 Staff Vestibule)', spec: 'Dual Optical • 58 FPS • Latency 46ms', lux: '390 Lux (Good)', status: 'Online' },
          { name: 'Terminal C (Registrar Standby)', spec: 'USB Optical Fallback Standby', lux: 'Ambient Indoor', status: 'Standby' },
        ].map((t, idx) => (
          <View key={idx} style={styles.terminalRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.termName}>{t.name}</Text>
              <Text style={styles.termSpec}>{t.spec}</Text>
              <Text style={styles.termLux}>{t.lux}</Text>
            </View>
            <View style={[styles.statusPill, t.status === 'Online' ? styles.statusOnline : styles.statusStandby]}>
              <View style={[styles.statusDot, t.status === 'Online' ? { backgroundColor: '#64FFDA' } : { backgroundColor: DT.color.warning }]} />
              <Text style={[styles.statusText, t.status === 'Online' ? { color: '#64FFDA' } : { color: DT.color.warning }]}>
                {t.status}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* ── Edge Cache & Cloud Sync ─────────── */}
      <View style={styles.sectionCard}>
        <View style={styles.cardHeader}>
          <Cloud size={16} color="#60A5FA" />
          <Text style={styles.cardTitle}>Edge Offline Cache & Supabase Sync</Text>
        </View>

        <View style={styles.cacheRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cacheTitle}>Cloud Connection Live</Text>
            <Text style={styles.cacheSub}>0 pending offline transit records in edge queue</Text>
          </View>
          <TouchableOpacity style={styles.syncBtn} activeOpacity={0.7}>
            <RefreshCw size={13} color="#0B132B" strokeWidth={2.2} />
            <Text style={styles.syncBtnText}>Force Sync</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Optical Calibration Toggles ─────── */}
      <View style={styles.sectionCard}>
        <View style={styles.cardHeader}>
          <Camera size={16} color={DT.color.accent} />
          <Text style={styles.cardTitle}>Optical Sensor Sensitivity Calibration</Text>
        </View>

        <View style={styles.toggleRow}>
          <View style={{ flex: 1, paddingRight: DT.spacing.sm }}>
            <Text style={styles.toggleTitle}>Anti-Spoofing Liveness Detection</Text>
            <Text style={styles.toggleSub}>Prevents photo/screen spoofing via dynamic 3D blink checks</Text>
          </View>
          <Switch
            value={livenessCheck}
            onValueChange={setLivenessCheck}
            trackColor={{ true: DT.color.accent, false: '#1D3557' }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.toggleRow}>
          <View style={{ flex: 1, paddingRight: DT.spacing.sm }}>
            <Text style={styles.toggleTitle}>Auto-Illuminator Floodlight</Text>
            <Text style={styles.toggleSub}>Automatically activate LED halo when ambient lux drops below 300</Text>
          </View>
          <Switch
            value={autoIlluminator}
            onValueChange={setAutoIlluminator}
            trackColor={{ true: DT.color.accent, false: '#1D3557' }}
          />
        </View>
      </View>

      {/* ── Terminal Sign Out ────────────────── */}
      <TouchableOpacity style={styles.signOutBtn} onPress={signOut} activeOpacity={0.7}>
        <LogOut size={16} color="#F87171" strokeWidth={2} />
        <Text style={styles.signOutText}>Sign Out Gate Terminal Desk</Text>
      </TouchableOpacity>
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
  healthBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(100, 255, 218, 0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: DT.radius.full },
  healthBadgeText: { ...DT.font.labelSm, color: DT.color.accent, fontSize: 10, fontWeight: '700' },
  subText: { ...DT.font.bodySm, color: '#8892B0', marginTop: 2 },

  sectionCard: {
    backgroundColor: '#112240',
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: DT.spacing.md,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: DT.spacing.md },
  cardTitle: { ...DT.font.labelMd, color: '#FFFFFF', fontWeight: '700' },

  terminalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: DT.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  termName: { ...DT.font.labelMd, color: '#FFFFFF', fontWeight: '700' },
  termSpec: { ...DT.font.bodySm, color: '#8892B0', fontSize: 11, marginTop: 1 },
  termLux: { ...DT.font.labelSm, color: DT.color.accent, fontSize: 10, marginTop: 2 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: DT.radius.xs },
  statusOnline: { backgroundColor: 'rgba(100, 255, 218, 0.15)' },
  statusStandby: { backgroundColor: 'rgba(217, 119, 6, 0.15)' },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { ...DT.font.labelSm, fontSize: 10, fontWeight: '800' },

  cacheRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cacheTitle: { ...DT.font.labelMd, color: '#FFFFFF', fontWeight: '700' },
  cacheSub: { ...DT.font.bodySm, color: '#8892B0', fontSize: 11, marginTop: 2 },
  syncBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: DT.color.accent, paddingHorizontal: 10, paddingVertical: 6, borderRadius: DT.radius.md },
  syncBtnText: { ...DT.font.labelSm, color: '#0B132B', fontWeight: '800' },

  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: DT.spacing.xs },
  toggleTitle: { ...DT.font.labelMd, color: '#FFFFFF', fontWeight: '600' },
  toggleSub: { ...DT.font.bodySm, color: '#8892B0', fontSize: 11, marginTop: 2 },
  divider: { height: 1, backgroundColor: 'rgba(255, 255, 255, 0.06)', marginVertical: DT.spacing.sm },

  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#112240',
    paddingVertical: 14,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.25)',
    marginTop: DT.spacing.xs,
    marginBottom: DT.spacing.xl,
  },
  signOutText: { ...DT.font.labelMd, color: '#F87171', fontWeight: '700' },
});
