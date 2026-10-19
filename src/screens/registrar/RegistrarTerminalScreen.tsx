/**
 * RegistrarTerminalScreen — Interactive Biometric Gate Kiosk Terminal
 *
 * Matches phone_portrait_kiosk_satya_setu_registrar and tablet_landscape_kiosk_satya_setu_registrar:
 * • Live IST Master Clock with pulsating LED seconds display
 * • Optical Camera Scanner Viewport with 4 corner brackets, scanning laser line, and silhouette guide
 * • 1-Metre Distance Guide & Hardware Telemetry (FHD 60 FPS • Lux: 420 • Dist: ~0.9m)
 * • 10-State Interactive Kiosk Prototype Switcher:
 *   [1. Ready | 2. Success | 3. Reject | 4. Blink | 5. Duplicate | 6. Light | 7. PIN | 8. Enroll | 9. Staff | 10. Feed]
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  Camera,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  KeyRound,
  UserPlus,
  Users,
  History,
  ShieldCheck,
  Sun,
  Radio,
  Lock,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';

type KioskState =
  | 'ready'
  | 'success'
  | 'reject'
  | 'blink'
  | 'duplicate'
  | 'light'
  | 'pin'
  | 'enroll'
  | 'staff'
  | 'feed';

export default function RegistrarTerminalScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [kioskState, setKioskState] = useState<KioskState>('ready');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pinDigits, setPinDigits] = useState<string[]>([]);

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

  const handlePinPress = (digit: string) => {
    if (pinDigits.length < 4) {
      const next = [...pinDigits, digit];
      setPinDigits(next);
      if (next.length === 4) {
        setTimeout(() => {
          setKioskState('success');
          setPinDigits([]);
        }, 300);
      }
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* ── Master IST Clock Banner ─────────── */}
      <View style={styles.clockCard}>
        <View style={styles.clockHeaderRow}>
          <View style={styles.livePulseDot} />
          <Text style={styles.clockLabel}>GATE 01 • INDIAN STANDARD TIME (IST)</Text>
        </View>
        <Text style={styles.clockTime}>{timeStr}</Text>
        <Text style={styles.clockDate}>{dateStr}</Text>
      </View>

      {/* ── Optical Camera Viewport ─────────── */}
      <View style={[styles.scannerViewport, isTablet && styles.scannerViewportTablet]}>
        {/* Telemetry Pills */}
        <View style={styles.telemetryRow}>
          <View style={styles.telemetryPill}>
            <View style={styles.liveSensorDot} />
            <Text style={styles.telemetryPillText}>FHD • 60 FPS</Text>
          </View>
          <View style={styles.telemetryPill}>
            <Sun size={12} color={DT.color.accent} />
            <Text style={styles.telemetryPillText}>Lux: 420 (Good)</Text>
          </View>
          <View style={styles.telemetryPill}>
            <Radio size={12} color="#60A5FA" />
            <Text style={styles.telemetryPillText}>Dist: ~0.9m</Text>
          </View>
        </View>

        {/* Optical Target Frame */}
        <View style={styles.opticalFrame}>
          {/* 4 Corner Brackets */}
          <View style={[styles.bracket, styles.bracketTL]} />
          <View style={[styles.bracket, styles.bracketTR]} />
          <View style={[styles.bracket, styles.bracketBL]} />
          <View style={[styles.bracket, styles.bracketBR]} />

          {/* Oval Target with simulated scanning laser line */}
          <View style={styles.biometricOval}>
            <View style={styles.laserLine} />
            <View style={styles.centerSilhouette}>
              <Camera size={44} color="rgba(100, 255, 218, 0.4)" strokeWidth={1.5} />
            </View>
          </View>

          {/* Overlay Result States */}
          {kioskState === 'success' && (
            <View style={styles.resultOverlay}>
              <View style={[styles.resultCircle, { backgroundColor: DT.color.success }]}>
                <CheckCircle2 size={32} color="#FFFFFF" strokeWidth={2.4} />
              </View>
              <Text style={styles.resultTitle}>VERIFIED CHECK-IN</Text>
              <Text style={styles.resultName}>Rajvi Zinzuvadiya</Text>
              <Text style={styles.resultSub}>PGT Senior Physics • Gate 01 (08:14 AM)</Text>
              <Text style={styles.resultConfidence}>Match Confidence: 99.4%</Text>
            </View>
          )}

          {kioskState === 'reject' && (
            <View style={styles.resultOverlay}>
              <View style={[styles.resultCircle, { backgroundColor: DT.color.danger }]}>
                <XCircle size={32} color="#FFFFFF" strokeWidth={2.4} />
              </View>
              <Text style={[styles.resultTitle, { color: '#F87171' }]}>FACE NOT RECOGNIZED</Text>
              <Text style={styles.resultSub}>Please hold steady or use Staff PIN override</Text>
            </View>
          )}

          {kioskState === 'duplicate' && (
            <View style={styles.resultOverlay}>
              <View style={[styles.resultCircle, { backgroundColor: DT.color.warning }]}>
                <AlertTriangle size={32} color="#FFFFFF" strokeWidth={2.4} />
              </View>
              <Text style={[styles.resultTitle, { color: DT.color.warning }]}>DUPLICATE SCAN DETECTED</Text>
              <Text style={styles.resultSub}>Already registered check-in at 08:14 AM</Text>
            </View>
          )}

          {kioskState === 'blink' && (
            <View style={styles.resultOverlay}>
              <View style={[styles.resultCircle, { backgroundColor: DT.color.info }]}>
                <Eye size={32} color="#FFFFFF" strokeWidth={2.4} />
              </View>
              <Text style={[styles.resultTitle, { color: '#60A5FA' }]}>LIVENESS CHECK</Text>
              <Text style={styles.resultSub}>Please blink naturally into the lens</Text>
            </View>
          )}

          {kioskState === 'light' && (
            <View style={styles.resultOverlay}>
              <View style={[styles.resultCircle, { backgroundColor: DT.color.warning }]}>
                <Sun size={32} color="#FFFFFF" strokeWidth={2.4} />
              </View>
              <Text style={[styles.resultTitle, { color: DT.color.warning }]}>POOR LIGHTING WARNING</Text>
              <Text style={styles.resultSub}>Lux: 180 (Sub-optimal). Step closer to illuminator.</Text>
            </View>
          )}

          {kioskState === 'pin' && (
            <View style={styles.pinOverlay}>
              <Text style={styles.pinTitle}>Staff PIN Override</Text>
              <View style={styles.pinDotsRow}>
                {[0, 1, 2, 3].map((i) => (
                  <View
                    key={i}
                    style={[styles.pinDot, pinDigits.length > i && styles.pinDotFilled]}
                  />
                ))}
              </View>
              <View style={styles.pinKeypad}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '✓'].map((key) => (
                  <TouchableOpacity
                    key={key}
                    style={styles.pinKey}
                    onPress={() => {
                      if (key === 'C') setPinDigits([]);
                      else if (key === '✓') {
                        if (pinDigits.length >= 2) setKioskState('success');
                      } else handlePinPress(key);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.pinKeyText}>{key}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* 1-Metre Guidance Badge */}
        <View style={styles.distanceBadge}>
          <ShieldCheck size={14} color={DT.color.accent} />
          <Text style={styles.distanceText}>1-Metre Optimal Facial Distance</Text>
        </View>
      </View>

      {/* ── State Switcher Prototype Protocol ── */}
      <View style={styles.stateSwitcherCard}>
        <View style={styles.stateSwitcherHeader}>
          <Text style={styles.stateSwitcherTitle}>KIOSK PROTOCOL STATE SWITCHER (10 STATES)</Text>
          <Text style={styles.stateSwitcherSub}>Tap to simulate hardware response</Text>
        </View>

        <View style={styles.stateGrid}>
          {[
            { id: 'ready', label: '1. Ready' },
            { id: 'success', label: '2. Success' },
            { id: 'reject', label: '3. Reject' },
            { id: 'blink', label: '4. Blink' },
            { id: 'duplicate', label: '5. Duplicate' },
            { id: 'light', label: '6. Light' },
            { id: 'pin', label: '7. PIN' },
            { id: 'enroll', label: '8. Enroll' },
            { id: 'staff', label: '9. Staff' },
            { id: 'feed', label: '10. Feed' },
          ].map((st) => {
            const isActive = kioskState === st.id;
            return (
              <TouchableOpacity
                key={st.id}
                style={[styles.stateBtn, isActive && styles.stateBtnActive]}
                onPress={() => setKioskState(st.id as KioskState)}
                activeOpacity={0.7}
              >
                <Text style={[styles.stateBtnText, isActive && styles.stateBtnTextActive]}>
                  {st.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B132B' },
  content: { padding: DT.spacing.md, paddingBottom: 32 },

  clockCard: {
    backgroundColor: '#112240',
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    alignItems: 'center',
    marginBottom: DT.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(100,255,218,0.15)',
  },
  clockHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  livePulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: DT.color.accent },
  clockLabel: { ...DT.font.labelSm, color: DT.color.accent, fontSize: 10, letterSpacing: 1 },
  clockTime: {
    fontFamily: DT.typography.mono,
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginVertical: 2,
  },
  clockDate: { ...DT.font.bodySm, color: '#8892B0', fontSize: 11 },

  // Scanner Viewport
  scannerViewport: {
    backgroundColor: '#112240',
    borderRadius: DT.radius.xxl,
    padding: DT.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: DT.spacing.md,
    minHeight: 380,
    justifyContent: 'space-between',
  },
  scannerViewportTablet: {
    minHeight: 460,
  },
  telemetryRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', width: '100%' },
  telemetryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(23,42,69,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: DT.radius.full,
  },
  liveSensorDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: DT.color.accent },
  telemetryPillText: { ...DT.font.labelSm, color: '#CBD5E1', fontSize: 10 },

  // Optical Frame
  opticalFrame: {
    width: 240,
    height: 270,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: DT.spacing.sm,
  },
  bracket: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: DT.color.accent,
  },
  bracketTL: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 6 },
  bracketTR: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 6 },
  bracketBL: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 6 },
  bracketBR: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 6 },

  biometricOval: {
    width: 190,
    height: 230,
    borderRadius: 95,
    borderWidth: 2,
    borderColor: 'rgba(100,255,218,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  laserLine: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: DT.color.accent,
  },
  centerSilhouette: { opacity: 0.5 },

  // Overlays
  resultOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(17,34,64,0.96)',
    borderRadius: DT.radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    padding: DT.spacing.md,
  },
  resultCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DT.spacing.sm,
  },
  resultTitle: { ...DT.font.labelMd, color: '#64FFDA', fontWeight: '800', letterSpacing: 0.8 },
  resultName: { ...DT.font.h3, color: '#FFFFFF', marginTop: 4, textAlign: 'center' },
  resultSub: { ...DT.font.bodySm, color: '#8892B0', textAlign: 'center', marginTop: 2, fontSize: 11 },
  resultConfidence: { ...DT.font.labelSm, color: DT.color.accent, marginTop: 4, fontWeight: '700' },

  // PIN Overlay
  pinOverlay: {
    position: 'absolute',
    inset: -10,
    backgroundColor: '#112240',
    borderRadius: DT.radius.xl,
    padding: DT.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinTitle: { ...DT.font.labelMd, color: '#FFFFFF', fontWeight: '700', marginBottom: 4 },
  pinDotsRow: { flexDirection: 'row', gap: 8, marginVertical: 6 },
  pinDot: { width: 10, height: 10, borderRadius: 5, borderWidth: 1, borderColor: DT.color.accent },
  pinDotFilled: { backgroundColor: DT.color.accent },
  pinKeypad: { flexDirection: 'row', flexWrap: 'wrap', width: 180, justifyContent: 'center', gap: 6 },
  pinKey: {
    width: 46,
    height: 38,
    borderRadius: DT.radius.md,
    backgroundColor: '#1D3557',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinKeyText: { ...DT.font.labelMd, color: '#FFFFFF', fontWeight: '700' },

  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(100,255,218,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: DT.radius.full,
    borderWidth: 1,
    borderColor: 'rgba(100,255,218,0.25)',
  },
  distanceText: { ...DT.font.labelSm, color: DT.color.accent, fontSize: 11, fontWeight: '600' },

  // State Switcher
  stateSwitcherCard: {
    backgroundColor: '#112240',
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  stateSwitcherHeader: { marginBottom: DT.spacing.sm },
  stateSwitcherTitle: { ...DT.font.labelSm, color: DT.color.accent, fontWeight: '800', letterSpacing: 0.8 },
  stateSwitcherSub: { ...DT.font.bodySm, color: '#8892B0', fontSize: 10 },
  stateGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  stateBtn: {
    width: '18%',
    paddingVertical: 8,
    borderRadius: DT.radius.sm,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateBtnActive: { backgroundColor: DT.color.accent },
  stateBtnText: { ...DT.font.labelSm, color: '#8892B0', fontSize: 10, fontWeight: '600' },
  stateBtnTextActive: { color: '#0B132B', fontWeight: '800' },
});
