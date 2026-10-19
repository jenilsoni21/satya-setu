/**
 * LoginScreen — Satya Setu Staff Portal
 *
 * Institutional grade professional login interface:
 * • School crest / academic emblem with shield & graduation cap
 * • Role tabs: Staff | Admin | Gate Kiosk with Lucide vector icons
 * • Verified credentials input with key & lock icons
 * • Remember device toggle with custom check vector
 * • Primary CTA button with directional arrow
 * • Official compliance & security badges (CBSE, SSL 256-bit)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GraduationCap,
  Shield,
  ShieldCheck,
  User,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Fingerprint,
  Smartphone,
  Camera,
  ArrowRight,
  Headphones,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';
import { useAuth } from '@/lib/AuthProvider';

export default function LoginScreen() {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your credentials');
      return;
    }
    setError(null);
    const { error: authError } = await signIn(email.trim(), password);
    if (authError) {
      setError('Invalid credentials. Please verify your ID and password.');
    }
  };



  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header / Emblem ──────────────────── */}
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <View style={styles.logoBadge}>
                <Check size={12} color="#FFFFFF" strokeWidth={3} />
              </View>
            </View>

            <View style={styles.brandTagPill}>
              <Shield size={12} color={DT.color.primary} strokeWidth={2.2} />
              <Text style={styles.brandTag}>ACADEMIC GOVERNANCE PORTAL</Text>
            </View>
            <Text style={styles.brandTitle}>SATYA SETU</Text>
            <Text style={styles.brandSubtitle}>
              Shree Satya Prakash School • Faculty Portal
            </Text>
          </View>



          {/* ── Login Card ─────────────────────── */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={{ flex: 1, paddingRight: DT.spacing.sm }}>
                <Text style={styles.cardTitle}>Staff & Admin Sign In</Text>
                <Text style={styles.cardSubtitle}>Enter your staff ID or email to access the portal</Text>
              </View>
              <View style={styles.cardIcon}>
                <User size={20} color={DT.color.primary} strokeWidth={2} />
              </View>
            </View>

            {/* Staff ID / Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                Staff ID or Email <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconContainer}>
                  <KeyRound size={18} color={DT.color.textMuted} strokeWidth={1.8} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. SSPS-4089 or faculty email"
                  placeholderTextColor={DT.color.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                Security PIN / Password <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconContainer}>
                  <Lock size={18} color={DT.color.textMuted} strokeWidth={1.8} />
                </View>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Enter school portal password"
                  placeholderTextColor={DT.color.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  {showPassword ? (
                    <EyeOff size={18} color={DT.color.textMuted} strokeWidth={1.8} />
                  ) : (
                    <Eye size={18} color={DT.color.textMuted} strokeWidth={1.8} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember + Forgot PIN */}
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setRememberDevice(!rememberDevice)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberDevice && styles.checkboxChecked,
                  ]}
                >
                  {rememberDevice && (
                    <Check size={11} color="#FFFFFF" strokeWidth={3} />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>Remember this device</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.forgotText}>Forgot PIN?</Text>
              </TouchableOpacity>
            </View>

            {/* Error Message */}
            {error && (
              <View style={styles.errorBox}>
                <AlertCircle size={16} color={DT.color.danger} strokeWidth={2} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Sign In Button */}
            <TouchableOpacity
              style={[styles.signInBtn, loading && { opacity: 0.7 }]}
              onPress={handleSignIn}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <View style={styles.btnContentRow}>
                  <Text style={styles.signInBtnText}>Sign In to Portal</Text>
                  <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.2} />
                </View>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR SIGN IN WITH</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Alternative auth buttons */}
            <View style={styles.altAuthRow}>
              <TouchableOpacity style={styles.altAuthBtn} activeOpacity={0.7}>
                <Fingerprint size={16} color={DT.color.primary} strokeWidth={2} />
                <Text style={styles.altAuthBtnText}>Biometric / Face</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.altAuthBtn} activeOpacity={0.7}>
                <Smartphone size={16} color={DT.color.primary} strokeWidth={2} />
                <Text style={styles.altAuthBtnText}>Mobile OTP</Text>
              </TouchableOpacity>
            </View>
          </View>



          {/* ── Footer Badges ──────────────────── */}
          <View style={styles.footerBadges}>
            <View style={styles.badge}>
              <ShieldCheck size={14} color={DT.color.textSecondary} strokeWidth={1.8} />
              <Text style={styles.badgeText}>CBSE Affiliation #1030421</Text>
            </View>
            <View style={styles.badge}>
              <Lock size={14} color={DT.color.textSecondary} strokeWidth={1.8} />
              <Text style={styles.badgeText}>SSL 256-Bit Encrypted</Text>
            </View>
          </View>

          <View style={styles.footerHelpdesk}>
            <Headphones size={14} color={DT.color.primary} strokeWidth={1.8} />
            <Text style={styles.footerLink}>IT Helpdesk & Registrar Office Desk</Text>
          </View>

          <Text style={styles.footerVersion}>
            Satya Setu System v2.4.0 • Shree Satya Prakash School
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: DT.color.background,
  },
  scrollContent: {
    paddingHorizontal: DT.spacing.lg,
    paddingTop: DT.spacing.xl,
    paddingBottom: DT.spacing.xxl,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },

  // Header / Emblem
  headerSection: {
    alignItems: 'center',
    marginBottom: DT.spacing.xl,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: DT.spacing.md,
  },
  logoImage: {
    width: 96,
    height: 96,
  },
  logoBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: DT.color.success,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: DT.color.surface,
  },
  brandTagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: DT.radius.full,
    backgroundColor: DT.color.primaryLight,
    marginBottom: 6,
  },
  brandTag: {
    ...DT.font.labelSm,
    color: DT.color.primary,
    letterSpacing: 1.2,
  },
  brandTitle: {
    ...DT.font.h1,
    color: DT.color.textPrimary,
    letterSpacing: 2,
  },
  brandSubtitle: {
    ...DT.font.bodySm,
    color: DT.color.textSecondary,
    marginTop: 2,
  },



  // Card
  card: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.lg,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DT.spacing.lg,
    paddingBottom: DT.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: DT.color.borderLight,
  },
  cardTitle: {
    ...DT.font.h3,
    color: DT.color.textPrimary,
  },
  cardSubtitle: {
    ...DT.font.bodySm,
    color: DT.color.textSecondary,
    marginTop: 2,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DT.color.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Field
  fieldGroup: {
    marginBottom: DT.spacing.md,
  },
  fieldLabel: {
    ...DT.font.labelSm,
    color: DT.color.textPrimary,
    marginBottom: 6,
  },
  required: {
    color: DT.color.danger,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DT.color.surfaceDim,
    borderWidth: 1,
    borderColor: DT.color.border,
    borderRadius: DT.radius.md,
    paddingHorizontal: DT.spacing.md,
    height: 48,
  },
  inputIconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    ...DT.font.bodyMd,
    color: DT.color.textPrimary,
    paddingVertical: 0,
  },
  eyeBtn: {
    padding: 6,
  },

  // Checkbox row
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DT.spacing.lg,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: DT.color.border,
    backgroundColor: DT.color.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: DT.color.primary,
    borderColor: DT.color.primary,
  },
  checkboxLabel: {
    ...DT.font.bodySm,
    color: DT.color.textSecondary,
  },
  forgotText: {
    ...DT.font.labelSm,
    color: DT.color.primary,
  },

  // Error Box
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: DT.color.dangerBg,
    paddingHorizontal: DT.spacing.md,
    paddingVertical: 10,
    borderRadius: DT.radius.md,
    marginBottom: DT.spacing.md,
  },
  errorText: {
    ...DT.font.bodySm,
    color: DT.color.danger,
    flex: 1,
  },

  // CTA Button
  signInBtn: {
    backgroundColor: DT.color.primary,
    height: 50,
    borderRadius: DT.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...DT.shadow.sm,
  },
  btnContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signInBtnText: {
    ...DT.font.labelLg,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: DT.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: DT.color.borderLight,
  },
  dividerText: {
    ...DT.font.labelSm,
    color: DT.color.textMuted,
    paddingHorizontal: DT.spacing.sm,
    letterSpacing: 0.8,
  },

  // Alt auth
  altAuthRow: {
    flexDirection: 'row',
    gap: DT.spacing.sm,
  },
  altAuthBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 44,
    borderRadius: DT.radius.md,
    borderWidth: 1,
    borderColor: DT.color.border,
    backgroundColor: DT.color.surface,
  },
  altAuthBtnText: {
    ...DT.font.labelSm,
    color: DT.color.textPrimary,
  },



  // Footer Badges
  footerBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: DT.spacing.md,
    marginTop: DT.spacing.xl,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: DT.radius.sm,
    backgroundColor: DT.color.surfaceDim,
  },
  badgeText: {
    ...DT.font.labelSm,
    color: DT.color.textSecondary,
    fontSize: 11,
  },
  footerHelpdesk: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: DT.spacing.md,
  },
  footerLink: {
    ...DT.font.bodySm,
    color: DT.color.primary,
    fontWeight: '600',
  },
  footerVersion: {
    ...DT.font.bodySm,
    color: DT.color.textMuted,
    textAlign: 'center',
    marginTop: DT.spacing.xs,
    fontSize: 11,
  },
});
