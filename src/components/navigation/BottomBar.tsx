/**
 * BottomBar — Institutional Bottom Navigation Bar
 *
 * Displays a persistent, tactile navigation bar across all panels:
 * • Vector icons with active status pill/dot
 * • Safe area bottom insets
 * • Support for notification badges
 * • Support for light (Admin/Staff) and dark (Registrar Kiosk) themes
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DesignTokens as DT } from '@/constants/design-tokens';

export interface TabItem {
  key: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  badge?: string | number;
}

interface BottomBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  isDarkTheme?: boolean;
}

export default function BottomBar({
  tabs,
  activeTab,
  onTabPress,
  isDarkTheme = false,
}: BottomBarProps) {
  const insets = useSafeAreaInsets();
  const themeStyles = isDarkTheme ? darkStyles : lightStyles;

  return (
    <View
      style={[
        styles.container,
        themeStyles.container,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      <View style={styles.tabsRow}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const TabIcon = tab.Icon;
          const iconColor = isActive
            ? isDarkTheme
              ? DT.color.accent
              : DT.color.primary
            : isDarkTheme
            ? '#64748B'
            : DT.color.textMuted;

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabButton}
              onPress={() => onTabPress(tab.key)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconWrapper,
                  isActive && (isDarkTheme ? darkStyles.iconWrapperActive : lightStyles.iconWrapperActive),
                ]}
              >
                <TabIcon size={20} color={iconColor} strokeWidth={isActive ? 2.4 : 1.8} />
                {tab.badge !== undefined && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{tab.badge}</Text>
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isActive
                    ? isDarkTheme
                      ? darkStyles.tabLabelActive
                      : lightStyles.tabLabelActive
                    : isDarkTheme
                    ? darkStyles.tabLabelInactive
                    : lightStyles.tabLabelInactive,
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    paddingTop: 6,
    ...DT.shadow.modal,
    zIndex: 50,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconWrapper: {
    width: 36,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 2,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: 2,
    backgroundColor: DT.color.danger,
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  tabLabel: {
    fontSize: 10,
    letterSpacing: 0.2,
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: DT.color.surface,
    borderTopColor: DT.color.borderLight,
  },
  iconWrapperActive: {
    backgroundColor: DT.color.primaryLight,
  },
  tabLabelActive: {
    color: DT.color.primary,
    fontWeight: '700',
  },
  tabLabelInactive: {
    color: DT.color.textSecondary,
    fontWeight: '500',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  iconWrapperActive: {
    backgroundColor: 'rgba(100, 255, 218, 0.15)',
  },
  tabLabelActive: {
    color: DT.color.accent,
    fontWeight: '700',
  },
  tabLabelInactive: {
    color: '#64748B',
    fontWeight: '500',
  },
});
