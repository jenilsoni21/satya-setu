/**
 * TopBar — Responsive Institutional Header for Mobile & Tablet
 *
 * Automatically adapts:
 * • Mobile (< 768px): Compact header with School Crest logo, School name,
 *   Role badge, notification indicator, and sign-out/profile action.
 * • Tablet (>= 768px): Wide institutional banner with School Crest,
 *   Full school address, active suite label, inline status telemetry,
 *   and quick administrative controls.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import {
  Bell,
  LogOut,
  Shield,
  Radio,
  Lock,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';
import { useAuth, UserRole } from '@/lib/AuthProvider';

interface TopBarProps {
  title?: string;
  roleBadge?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  tabletTabs?: { key: string; label: string }[];
  isDarkTheme?: boolean;
}

export default function TopBar({
  title,
  roleBadge,
  activeTab,
  onTabChange,
  tabletTabs,
  isDarkTheme = false,
}: TopBarProps) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const { profile, role, signOut } = useAuth();

  const getRoleLabel = () => {
    if (roleBadge) return roleBadge;
    switch (role) {
      case 'admin':
        return 'EXECUTIVE ADMIN';
      case 'registrar':
        return 'GATE 01 KIOSK';
      case 'staff':
      default:
        return 'FACULTY PORTAL';
    }
  };

  const themeStyles = isDarkTheme ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, themeStyles.container]}>
      {/* ── Left: School Brand & Crest ──────────────── */}
      <View style={styles.brandContainer}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={isTablet ? styles.logoTablet : styles.logoMobile}
          resizeMode="contain"
        />
        <View style={styles.brandTextGroup}>
          <Text style={[styles.schoolTitle, themeStyles.schoolTitle]} numberOfLines={1} ellipsizeMode="tail">
            {isTablet ? 'SHREE SATYAPRAKASH SCHOOL, RAJKOT' : 'SHREE SATYA PRAKASH'}
          </Text>
          <View style={styles.subRow}>
            <Text style={[styles.suiteSubtitle, themeStyles.suiteSubtitle]} numberOfLines={1} ellipsizeMode="tail">
              {title ?? (isTablet ? 'SATYA SETU ACADEMIC GOVERNANCE' : 'SATYA SETU')}
            </Text>
            <View style={[styles.roleBadge, themeStyles.roleBadge]}>
              <Text style={[styles.roleBadgeText, themeStyles.roleBadgeText]} numberOfLines={1}>
                {getRoleLabel()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* ── Center: Tablet Inline Navigation Tabs (if on Tablet) ── */}
      {isTablet && tabletTabs && onTabChange && (
        <View style={[styles.tabletNavPills, themeStyles.tabletNavPills]}>
          {tabletTabs.map((t) => {
            const isActive = activeTab === t.key;
            return (
              <TouchableOpacity
                key={t.key}
                style={[styles.tabletNavPill, isActive && themeStyles.tabletNavPillActive]}
                onPress={() => onTabChange(t.key)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabletNavPillText,
                    isActive ? themeStyles.tabletNavPillTextActive : themeStyles.tabletNavPillTextInactive,
                  ]}
                  numberOfLines={1}
                >
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* ── Right: Telemetry & Actions ─────────────── */}
      <View style={styles.rightActions}>
        {/* Notifications Button */}
        <TouchableOpacity
          style={[styles.iconButton, themeStyles.iconButton]}
          activeOpacity={0.7}
        >
          <Bell
            size={18}
            color={isDarkTheme ? '#CBD5E1' : DT.color.textSecondary}
            strokeWidth={2}
          />
          <View style={styles.unreadDot} />
        </TouchableOpacity>

        {/* Sign Out / User Menu Button */}
        <TouchableOpacity
          style={[styles.signOutButton, themeStyles.signOutButton]}
          onPress={signOut}
          activeOpacity={0.7}
        >
          <LogOut size={16} color={DT.color.danger} strokeWidth={2} />
          {isTablet && (
            <Text style={[styles.signOutLabel, themeStyles.signOutLabel]} numberOfLines={1}>
              Sign Out ({profile?.full_name?.split(' ')[0] ?? 'User'})
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DT.spacing.md,
    paddingVertical: 8,
    borderBottomWidth: 1,
    zIndex: 50,
    marginBottom: 0,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
  },
  logoMobile: {
    width: 38,
    height: 38,
    flexShrink: 0,
  },
  logoTablet: {
    width: 48,
    height: 48,
    flexShrink: 0,
  },
  brandTextGroup: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
  },
  schoolTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
    flexWrap: 'nowrap',
    minWidth: 0,
  },
  suiteSubtitle: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.4,
    flexShrink: 1,
  },
  roleBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: DT.radius.xs,
    flexShrink: 0,
  },
  roleBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Tablet navigation pills
  tabletNavPills: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: DT.radius.md,
    padding: 3,
    marginHorizontal: DT.spacing.md,
  },
  tabletNavPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: DT.radius.sm,
  },
  tabletNavPillText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Right actions
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 6,
    right: 7,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: DT.color.danger,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: DT.radius.md,
  },
  signOutLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: DT.color.danger,
  },
});

// Light Theme Styles (Admin & Staff)
const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: DT.color.surface,
    borderBottomColor: DT.color.borderLight,
  },
  schoolTitle: {
    color: DT.color.textPrimary,
  },
  suiteSubtitle: {
    color: DT.color.textSecondary,
  },
  roleBadge: {
    backgroundColor: DT.color.primaryLight,
  },
  roleBadgeText: {
    color: DT.color.primary,
  },
  tabletNavPills: {
    backgroundColor: DT.color.surfaceDim,
  },
  tabletNavPillActive: {
    backgroundColor: DT.color.primary,
  },
  tabletNavPillTextActive: {
    color: '#FFFFFF',
  },
  tabletNavPillTextInactive: {
    color: DT.color.textSecondary,
  },
  iconButton: {
    backgroundColor: DT.color.surfaceDim,
  },
  signOutButton: {
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
  },
  signOutLabel: {
    color: DT.color.danger,
  },
});

// Dark Theme Styles (Registrar Gate Kiosk)
const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  schoolTitle: {
    color: '#FFFFFF',
  },
  suiteSubtitle: {
    color: '#94A3B8',
  },
  roleBadge: {
    backgroundColor: 'rgba(100, 255, 218, 0.15)',
  },
  roleBadgeText: {
    color: DT.color.accent,
  },
  tabletNavPills: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  tabletNavPillActive: {
    backgroundColor: DT.color.accent,
  },
  tabletNavPillTextActive: {
    color: '#0B132B',
  },
  tabletNavPillTextInactive: {
    color: '#94A3B8',
  },
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  signOutButton: {
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
  },
  signOutLabel: {
    color: '#F87171',
  },
});
