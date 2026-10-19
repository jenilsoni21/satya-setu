/**
 * RegistrarLiveLogsScreen — Real-Time Gate Attendance Feed
 *
 * Dedicated gate registrar module:
 * • Live stream of biometric check-ins & RFID scans
 * • Real-time entry / exit direction indicators
 * • Match confidence % and terminal hardware ID
 * • Filter by Entry (IN) / Exit (OUT) / Exceptions (Late)
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
  History,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Search,
  Filter,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';

interface TransitRecord {
  id: string;
  name: string;
  role: string;
  dept: string;
  time: string;
  type: 'IN' | 'OUT';
  mode: string;
  confidence: string;
  terminal: string;
  status: 'normal' | 'late';
}

const SAMPLE_TRANSITS: TransitRecord[] = [
  {
    id: 'tr-1',
    name: 'Rajvi Zinzuvadiya',
    role: 'PGT Senior Physics',
    dept: 'Senior Secondary',
    time: '08:14:22 AM',
    type: 'IN',
    mode: 'Face Biometric',
    confidence: '99.4%',
    terminal: 'Kiosk 01 (Cam A)',
    status: 'normal',
  },
  {
    id: 'tr-2',
    name: 'Dr. Alok Nath Mukherjee',
    role: 'HOD Chemistry',
    dept: 'Science Wing',
    time: '08:19:05 AM',
    type: 'IN',
    mode: 'Face Biometric',
    confidence: '98.9%',
    terminal: 'Kiosk 01 (Cam A)',
    status: 'normal',
  },
  {
    id: 'tr-3',
    name: 'Mr. Rajesh Kumar Verma',
    role: 'PGT Mathematics',
    dept: 'Maths Dept',
    time: '08:34:40 AM',
    type: 'IN',
    mode: 'PIN Override',
    confidence: 'Verified',
    terminal: 'Kiosk 02 (Standby)',
    status: 'late',
  },
  {
    id: 'tr-4',
    name: 'Mrs. Pooja Bhupendra Vyas',
    role: 'Mathematics Faculty',
    dept: 'Middle Wing',
    time: '08:05:12 AM',
    type: 'IN',
    mode: 'Face Biometric',
    confidence: '97.8%',
    terminal: 'Kiosk 01 (Cam A)',
    status: 'normal',
  },
  {
    id: 'tr-5',
    name: 'Balwinder Singh',
    role: 'Senior Lab Attendant',
    dept: 'Support',
    time: '07:15:10 AM',
    type: 'IN',
    mode: 'RFID Card',
    confidence: 'Card #9021',
    terminal: 'Gate 01 Turnstile',
    status: 'normal',
  },
  {
    id: 'tr-6',
    name: 'Ms. Rajeshwari Patel',
    role: 'TGT Mathematics',
    dept: 'Middle Wing',
    time: '08:11:50 AM',
    type: 'IN',
    mode: 'Face Biometric',
    confidence: '99.1%',
    terminal: 'Kiosk 01 (Cam A)',
    status: 'normal',
  },
];

export default function RegistrarLiveLogsScreen() {
  const [filterType, setFilterType] = useState<'ALL' | 'IN' | 'OUT' | 'LATE'>('ALL');

  const filtered = SAMPLE_TRANSITS.filter((t) => {
    if (filterType === 'IN') return t.type === 'IN';
    if (filterType === 'OUT') return t.type === 'OUT';
    if (filterType === 'LATE') return t.status === 'late';
    return true;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* ── Subheader ──────────────────────── */}
      <View style={styles.subHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Live Gate Transit Feed</Text>
          <View style={styles.liveBeacon}>
            <View style={styles.livePulseDot} />
            <Text style={styles.liveBeaconText}>Auto-Refresh (3s)</Text>
          </View>
        </View>
        <Text style={styles.subText}>Chronological optical biometric transits across Gate 01 & Gate 02</Text>
      </View>

      {/* ── Filter Pills ───────────────────── */}
      <View style={styles.filterRow}>
        {(['ALL', 'IN', 'OUT', 'LATE'] as const).map((ft) => (
          <TouchableOpacity
            key={ft}
            style={[styles.filterBtn, filterType === ft && styles.filterBtnActive]}
            onPress={() => setFilterType(ft)}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterBtnText, filterType === ft && styles.filterBtnTextActive]}>
              {ft === 'ALL' ? 'All Transits' : ft === 'IN' ? 'Check-In' : ft === 'OUT' ? 'Check-Out' : 'Late Arrivals'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Transits Ledger ────────────────── */}
      <View style={styles.transitsList}>
        {filtered.map((t) => (
          <View key={t.id} style={styles.transitCard}>
            <View style={styles.cardLeft}>
              <View style={[styles.directionBadge, t.type === 'IN' ? styles.badgeIn : styles.badgeOut]}>
                <Text style={[styles.directionText, t.type === 'IN' ? { color: '#64FFDA' } : { color: '#60A5FA' }]}>
                  {t.type}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.facultyName}>{t.name}</Text>
                  {t.status === 'late' && (
                    <View style={styles.latePill}>
                      <Text style={styles.latePillText}>Late</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.facultySub}>{t.role} • {t.dept}</Text>
                <View style={styles.metaRow}>
                  <ShieldCheck size={12} color="#8892B0" />
                  <Text style={styles.metaText}>{t.mode} ({t.confidence})</Text>
                  <Text style={styles.terminalText}>• {t.terminal}</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardRight}>
              <Text style={styles.timeText}>{t.time}</Text>
            </View>
          </View>
        ))}
      </View>
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
  liveBeacon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(100, 255, 218, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: DT.radius.full,
  },
  livePulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: DT.color.accent },
  liveBeaconText: { ...DT.font.labelSm, color: DT.color.accent, fontSize: 10, fontWeight: '700' },
  subText: { ...DT.font.bodySm, color: '#8892B0', marginTop: 2 },

  filterRow: { flexDirection: 'row', gap: 6, marginBottom: DT.spacing.md },
  filterBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: DT.radius.full, backgroundColor: 'rgba(255, 255, 255, 0.06)' },
  filterBtnActive: { backgroundColor: DT.color.accent },
  filterBtnText: { ...DT.font.labelSm, color: '#8892B0', fontSize: 11 },
  filterBtnTextActive: { color: '#0B132B', fontWeight: '800' },

  transitsList: { gap: DT.spacing.sm },
  transitCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#112240',
    padding: DT.spacing.md,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, paddingRight: DT.spacing.sm },
  directionBadge: { width: 34, height: 34, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  badgeIn: { backgroundColor: 'rgba(100, 255, 218, 0.15)' },
  badgeOut: { backgroundColor: 'rgba(96, 165, 250, 0.15)' },
  directionText: { fontSize: 11, fontWeight: '800' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  facultyName: { ...DT.font.labelMd, color: '#FFFFFF', fontWeight: '700' },
  latePill: { backgroundColor: 'rgba(217, 119, 6, 0.25)', paddingHorizontal: 5, paddingVertical: 1, borderRadius: DT.radius.xs },
  latePillText: { ...DT.font.labelSm, color: DT.color.warning, fontSize: 9, fontWeight: '800' },
  facultySub: { ...DT.font.bodySm, color: '#8892B0', fontSize: 11, marginTop: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  metaText: { ...DT.font.labelSm, color: '#8892B0', fontSize: 10 },
  terminalText: { ...DT.font.labelSm, color: '#8892B0', fontSize: 10 },

  cardRight: { alignItems: 'flex-end' },
  timeText: { fontFamily: DT.typography.mono, color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
});
