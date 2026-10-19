/**
 * StaffProfileScreen — Faculty Digital ID Card & Academic Credentials
 *
 * Dedicated teacher module:
 * • Official Digital Faculty ID Card with school crest & barcode/QR mock
 * • Teacher credentials: CBSE Teacher ID, Blood Group, Emergency Contact, Date of Joining
 * • Gate Biometric Enrollment Status
 * • Account Security & Sign Out
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  User,
  ShieldCheck,
  Fingerprint,
  Mail,
  Phone,
  Building2,
  Calendar,
  LogOut,
  QrCode,
  Lock,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';
import { useAuth } from '@/lib/AuthProvider';

export default function StaffProfileScreen() {
  const { profile, signOut } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* ── Subheader ──────────────────────── */}
      <View style={styles.subHeader}>
        <Text style={styles.sectionTitle}>Faculty Profile & ID Card</Text>
        <Text style={styles.subText}>Institutional credentials, CBSE registration & security</Text>
      </View>

      {/* ── Digital ID Card ────────────────── */}
      <View style={styles.idCard}>
        {/* ID Card Top Header */}
        <View style={styles.idCardHeader}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.idLogo}
            resizeMode="contain"
          />
          <View style={{ flex: 1, paddingLeft: DT.spacing.sm }}>
            <Text style={styles.idSchoolName}>SHREE SATYA PRAKASH SCHOOL</Text>
            <Text style={styles.idSuiteName}>FACULTY IDENTITY CARD • 2024-25</Text>
          </View>
          <View style={styles.activePill}>
            <Text style={styles.activePillText}>ACTIVE</Text>
          </View>
        </View>

        {/* ID Card Body */}
        <View style={styles.idCardBody}>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarBoxText}>
              {profile?.full_name?.charAt(0)?.toUpperCase() ?? 'R'}
            </Text>
          </View>

          <View style={{ flex: 1, paddingLeft: DT.spacing.md }}>
            <Text style={styles.idTeacherName}>{profile?.full_name ?? 'Rajvi Zinzuvadiya'}</Text>
            <Text style={styles.idDesignation}>{profile?.designation ?? 'PGT Senior Physics'}</Text>
            <Text style={styles.idDepartment}>{profile?.department ?? 'Senior Secondary Science'}</Text>

            <View style={styles.empCodeBadge}>
              <Text style={styles.empCodeLabel}>EMP CODE: </Text>
              <Text style={styles.empCodeVal}>{profile?.employee_code ?? 'SSP-2018-042'}</Text>
            </View>
          </View>
        </View>

        {/* ID Card Footer */}
        <View style={styles.idCardFooter}>
          <View style={styles.idFooterCell}>
            <Text style={styles.footerCellLabel}>CBSE ID</Text>
            <Text style={styles.footerCellVal}>#CBSE-40892</Text>
          </View>
          <View style={styles.idFooterCell}>
            <Text style={styles.footerCellLabel}>BLOOD GROUP</Text>
            <Text style={styles.footerCellVal}>O+ Positive</Text>
          </View>
          <View style={styles.idFooterCell}>
            <Text style={styles.footerCellLabel}>JOINED</Text>
            <Text style={styles.footerCellVal}>Jul 2019</Text>
          </View>
        </View>
      </View>

      {/* ── Biometric & Gate Status ────────── */}
      <View style={styles.infoCard}>
        <View style={styles.infoCardHeader}>
          <Fingerprint size={18} color={DT.color.primary} strokeWidth={2} />
          <Text style={styles.infoCardTitle}>Gate Terminal Verification</Text>
        </View>

        <View style={styles.biometricRow}>
          <View style={styles.checkCircle}>
            <ShieldCheck size={16} color={DT.color.success} strokeWidth={2.2} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.biometricTitle}>Biometric Face Profile Active</Text>
            <Text style={styles.biometricSub}>Enrolled on Gate 01 Kiosk • Match Confidence 99.4%</Text>
          </View>
        </View>
      </View>

      {/* ── Contact Details ────────────────── */}
      <View style={styles.infoCard}>
        <View style={styles.infoCardHeader}>
          <User size={18} color={DT.color.primary} strokeWidth={2} />
          <Text style={styles.infoCardTitle}>Contact & Institutional Registry</Text>
        </View>

        <View style={styles.contactItem}>
          <Mail size={16} color={DT.color.textMuted} />
          <Text style={styles.contactText}>{profile?.email ?? 'staff@satyasetu.edu'}</Text>
        </View>
        <View style={styles.contactItem}>
          <Phone size={16} color={DT.color.textMuted} />
          <Text style={styles.contactText}>{profile?.phone ?? '+91 98765 43212'}</Text>
        </View>
        <View style={styles.contactItem}>
          <Building2 size={16} color={DT.color.textMuted} />
          <Text style={styles.contactText}>Senior Secondary Science Wing • Staff Room 202</Text>
        </View>
      </View>

      {/* ── Sign Out ────────────────────────── */}
      <TouchableOpacity style={styles.signOutBtn} onPress={signOut} activeOpacity={0.7}>
        <LogOut size={16} color={DT.color.danger} strokeWidth={2} />
        <Text style={styles.signOutText}>Sign Out Faculty Portal</Text>
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

  // ID Card
  idCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 2,
    borderColor: DT.color.primaryBorder,
    marginBottom: DT.spacing.md,
    ...DT.shadow.raised,
  },
  idCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: DT.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: DT.color.borderLight,
  },
  idLogo: { width: 36, height: 36 },
  idSchoolName: { ...DT.font.labelSm, color: DT.color.primary, fontWeight: '800', letterSpacing: 0.5 },
  idSuiteName: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 9 },
  activePill: { backgroundColor: DT.color.successBg, paddingHorizontal: 6, paddingVertical: 2, borderRadius: DT.radius.xs },
  activePillText: { ...DT.font.labelSm, color: DT.color.success, fontWeight: '700', fontSize: 9 },

  idCardBody: { flexDirection: 'row', alignItems: 'center', paddingVertical: DT.spacing.md },
  avatarBox: {
    width: 68,
    height: 80,
    borderRadius: DT.radius.md,
    backgroundColor: DT.color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBoxText: { ...DT.font.h1, color: '#FFFFFF', fontWeight: '800' },
  idTeacherName: { ...DT.font.h3, color: DT.color.textPrimary },
  idDesignation: { ...DT.font.labelSm, color: DT.color.primary, fontWeight: '700', marginTop: 2 },
  idDepartment: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 11, marginTop: 1 },
  empCodeBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: DT.color.surfaceDim, paddingHorizontal: 6, paddingVertical: 2, borderRadius: DT.radius.xs, alignSelf: 'flex-start', marginTop: 6 },
  empCodeLabel: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10 },
  empCodeVal: { ...DT.font.labelSm, color: DT.color.textPrimary, fontWeight: '800', fontSize: 10 },

  idCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: DT.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: DT.color.borderLight,
  },
  idFooterCell: {},
  footerCellLabel: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 9 },
  footerCellVal: { ...DT.font.labelSm, color: DT.color.textPrimary, fontWeight: '700', fontSize: 11, marginTop: 1 },

  // Info Cards
  infoCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    marginBottom: DT.spacing.md,
    ...DT.shadow.sm,
  },
  infoCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: DT.spacing.sm },
  infoCardTitle: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700' },
  biometricRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkCircle: { width: 30, height: 30, borderRadius: 15, backgroundColor: DT.color.successBg, justifyContent: 'center', alignItems: 'center' },
  biometricTitle: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700' },
  biometricSub: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 11 },

  contactItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  contactText: { ...DT.font.bodyMd, color: DT.color.textPrimary },

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
