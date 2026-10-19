/**
 * Root layout — Wraps the entire app in AuthProvider
 * and renders either LoginScreen or the role-based navigator.
 */

import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { AuthProvider, useAuth } from '@/lib/AuthProvider';
import { DesignTokens as DT } from '@/constants/design-tokens';
import {
  LoginScreen,
  AdminPanelNavigator,
  StaffPanelNavigator,
  RegistrarPanelNavigator,
} from '@/screens';

function RootNavigator() {
  const { user, role, loading } = useAuth();

  // Splash / Loading
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={DT.color.primary} />
      </View>
    );
  }

  // Not authenticated → Login
  if (!user) {
    return <LoginScreen />;
  }

  // Authenticated → Role-based panel navigator with responsive TopBar and persistent BottomBar
  switch (role) {
    case 'admin':
      return <AdminPanelNavigator />;
    case 'registrar':
      return <RegistrarPanelNavigator />;
    case 'staff':
    default:
      return <StaffPanelNavigator />;
  }
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DT.color.background,
  },
});
