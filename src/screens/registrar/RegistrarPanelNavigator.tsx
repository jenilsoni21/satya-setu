/**
 * RegistrarPanelNavigator — Persistent Navigation Shell for Registrar / Kiosk Gate Portal
 *
 * Provides:
 * • TopBar for Mobile & Tablet (Responsive, Dark Theme #0b1c30 matching Kiosk)
 * • Persistent BottomBar with 4 core kiosk tabs:
 *   [ Terminal | Live Logs | Staff Roster | Console ]
 * • Seamless tab switching while retaining gate telemetry and state
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Camera,
  History,
  Users,
  ShieldCheck,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';
import TopBar from '@/components/navigation/TopBar';
import BottomBar, { TabItem } from '@/components/navigation/BottomBar';

// Screens
import RegistrarTerminalScreen from './RegistrarTerminalScreen';
import RegistrarLiveLogsScreen from './RegistrarLiveLogsScreen';
import RegistrarStaffRosterScreen from './RegistrarStaffRosterScreen';
import RegistrarConsoleScreen from './RegistrarConsoleScreen';

type RegistrarTab = 'terminal' | 'logs' | 'roster' | 'console';

export default function RegistrarPanelNavigator() {
  const [activeTab, setActiveTab] = useState<RegistrarTab>('terminal');

  const tabs: TabItem[] = [
    { key: 'terminal', label: 'Terminal', Icon: Camera },
    { key: 'logs', label: 'Live Logs', Icon: History, badge: 'LIVE' },
    { key: 'roster', label: 'Staff Roster', Icon: Users },
    { key: 'console', label: 'Console', Icon: ShieldCheck },
  ];

  const tabletTabs = [
    { key: 'terminal', label: 'Biometric Scanner' },
    { key: 'logs', label: 'Transit Stream' },
    { key: 'roster', label: 'Campus Headcount' },
    { key: 'console', label: 'Kiosk Diagnostics' },
  ];

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'terminal':
        return <RegistrarTerminalScreen />;
      case 'logs':
        return <RegistrarLiveLogsScreen />;
      case 'roster':
        return <RegistrarStaffRosterScreen />;
      case 'console':
        return <RegistrarConsoleScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* ── Persistent Dark TopBar (Mobile & Tablet) ──── */}
      <TopBar
        title="MAIN GATE 01 BIOMETRIC TERMINAL"
        roleBadge="KIOSK"
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as RegistrarTab)}
        tabletTabs={tabletTabs}
        isDarkTheme={true}
      />

      {/* ── Active Screen Content ────────────────────── */}
      <View style={styles.screenContainer}>{renderActiveScreen()}</View>

      {/* ── Persistent Dark BottomBar ────────────────── */}
      <BottomBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={(t) => setActiveTab(t as RegistrarTab)}
        isDarkTheme={true}
      />
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#07101d',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#0b1c30',
  },
});
