/**
 * AdminPanelNavigator — Persistent Navigation Shell for Admin Panel
 *
 * Provides:
 * • TopBar for Mobile & Tablet (Responsive)
 * • Persistent BottomBar with 5 core tabs:
 *   [ Dashboard | Staff | Attendance | Reports | Settings ]
 * • Seamless drill-down from Staff Directory to Staff Profile & Heatmap
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  FileSpreadsheet,
  Settings,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';
import TopBar from '@/components/navigation/TopBar';
import BottomBar, { TabItem } from '@/components/navigation/BottomBar';

// Screens
import AdminDashboard from './AdminDashboard';
import AdminStaffDirectory, { StaffCardData } from './AdminStaffDirectory';
import AdminPunchLogs from './AdminPunchLogs';
import AdminPerformanceReports from './AdminPerformanceReports';
import AdminStaffProfileHeatmap from './AdminStaffProfileHeatmap';
import AdminSettingsScreen from './AdminSettingsScreen';

type AdminTab = 'dashboard' | 'staff' | 'attendance' | 'reports' | 'settings';

export default function AdminPanelNavigator() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [selectedStaff, setSelectedStaff] = useState<StaffCardData | null>(null);

  const tabs: TabItem[] = [
    { key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { key: 'staff', label: 'Staff', Icon: Users },
    { key: 'attendance', label: 'Attendance', Icon: ClipboardCheck },
    { key: 'reports', label: 'Reports', Icon: FileSpreadsheet, badge: 3 },
    { key: 'settings', label: 'Settings', Icon: Settings },
  ];

  const tabletTabs = [
    { key: 'dashboard', label: 'Control Desk' },
    { key: 'staff', label: 'Staff Directory' },
    { key: 'attendance', label: 'Duty Logs' },
    { key: 'reports', label: 'Appraisal Hub' },
    { key: 'settings', label: 'Governance' },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key as AdminTab);
    setSelectedStaff(null); // Reset detail view on tab switch
  };

  const renderActiveScreen = () => {
    // If on staff tab and a teacher is selected, show detailed profile & heatmap
    if (activeTab === 'staff' && selectedStaff) {
      return (
        <AdminStaffProfileHeatmap
          staffName={selectedStaff.name}
          role={selectedStaff.role}
          code={selectedStaff.code}
          dept={selectedStaff.dept}
          onBack={() => setSelectedStaff(null)}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'staff':
        return <AdminStaffDirectory onSelectStaff={(s) => setSelectedStaff(s)} />;
      case 'attendance':
        return <AdminPunchLogs />;
      case 'reports':
        return <AdminPerformanceReports />;
      case 'settings':
        return <AdminSettingsScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* ── Persistent TopBar (Mobile & Tablet) ──── */}
      <TopBar
        title="EXECUTIVE CONTROL DESK"
        roleBadge="ADMIN"
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabletTabs={tabletTabs}
      />

      {/* ── Active Screen Content ──────────────── */}
      <View style={styles.screenContainer}>{renderActiveScreen()}</View>

      {/* ── Persistent BottomBar ────────────────── */}
      <BottomBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={handleTabChange}
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
