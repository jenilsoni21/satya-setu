/**
 * StaffPanelNavigator — Persistent Navigation Shell for Staff/Teacher Panel
 *
 * Provides:
 * • TopBar for Mobile & Tablet (Responsive)
 * • Persistent BottomBar with 5 core tabs:
 *   [ Dashboard | Planner | Attendance | Reports | Profile ]
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  LayoutDashboard,
  CalendarCheck,
  Clock,
  Award,
  User,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';
import TopBar from '@/components/navigation/TopBar';
import BottomBar, { TabItem } from '@/components/navigation/BottomBar';

// Screens
import StaffDashboard from './StaffDashboard';
import StaffDailyPlanner from './StaffDailyPlanner';
import StaffMyAttendance from './StaffMyAttendance';
import StaffMyReports from './StaffMyReports';
import StaffProfileScreen from './StaffProfileScreen';

type StaffTab = 'dashboard' | 'planner' | 'attendance' | 'reports' | 'profile';

export default function StaffPanelNavigator() {
  const [activeTab, setActiveTab] = useState<StaffTab>('dashboard');

  const tabs: TabItem[] = [
    { key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { key: 'planner', label: 'Planner', Icon: CalendarCheck, badge: 1 },
    { key: 'attendance', label: 'Attendance', Icon: Clock },
    { key: 'reports', label: 'Reports', Icon: Award },
    { key: 'profile', label: 'Profile', Icon: User },
  ];

  const tabletTabs = [
    { key: 'dashboard', label: 'Faculty Overview' },
    { key: 'planner', label: 'Daily Planner' },
    { key: 'attendance', label: 'Attendance Ledger' },
    { key: 'reports', label: 'Appraisal Dossier' },
    { key: 'profile', label: 'Faculty ID' },
  ];

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <StaffDashboard onNavigateTab={(t) => setActiveTab(t as StaffTab)} />;
      case 'planner':
        return <StaffDailyPlanner />;
      case 'attendance':
        return <StaffMyAttendance />;
      case 'reports':
        return <StaffMyReports />;
      case 'profile':
        return <StaffProfileScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* ── Persistent TopBar (Mobile & Tablet) ──── */}
      <TopBar
        title="FACULTY ACADEMIC DESK"
        roleBadge="STAFF"
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as StaffTab)}
        tabletTabs={tabletTabs}
      />

      {/* ── Active Screen Content ──────────────── */}
      <View style={styles.screenContainer}>{renderActiveScreen()}</View>

      {/* ── Persistent BottomBar ────────────────── */}
      <BottomBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={(t) => setActiveTab(t as StaffTab)}
      />
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: DT.color.background,
  },
  screenContainer: {
    flex: 1,
  },
});
