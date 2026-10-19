/**
 * Satya Setu Design System — "Institutional Harmony"
 *
 * Based on the DESIGN.md UI kit. This file centralises every colour, spacing,
 * typography preset, and shadow token so that all screens stay consistent.
 */

export const DesignTokens = {
  // ── Palette ─────────────────────────────────────────────
  color: {
    // Primary
    primary:            '#1E3A8A',   // Deep Navy Blue
    primaryDark:        '#172554',   // Hover / pressed
    primaryLight:       '#DBEAFE',   // Tinted backgrounds
    primaryBorder:      '#BFDBFE',
    primaryContainer:   '#1E3A8A',
    onPrimary:          '#FFFFFF',

    // Accent / Secondary (Saffron)
    accent:             '#F59E0B',
    accentDark:         '#D97706',
    accentLight:        '#FEF3C7',
    onAccent:           '#0F172A',

    // Semantic
    success:            '#16A34A',
    successBg:          '#DCFCE7',
    warning:            '#D97706',
    warningBg:          '#FEF3C7',
    danger:             '#DC2626',
    dangerBg:           '#FEE2E2',
    info:               '#0284C7',
    infoBg:             '#E0F2FE',

    // Surfaces
    background:         '#F8FAFC',
    surface:            '#FFFFFF',
    surfaceDim:         '#F1F5F9',
    border:             '#E2E8F0',
    borderLight:        '#F1F5F9',
    borderFocus:        '#1E3A8A',

    // Text
    textPrimary:        '#0F172A',
    textSecondary:      '#64748B',
    textMuted:          '#94A3B8',
    textOnDark:         '#FFFFFF',

    // Status Chip text
    presentText:        '#16A34A',
    absentText:         '#DC2626',
    halfDayText:        '#D97706',
    leaveText:          '#0284C7',
    holidayText:        '#475569',

    // Sidebar / Dark navbar
    navBackground:      '#0F172A',
    navText:            '#CBD5E1',
    navActiveText:      '#FFFFFF',
    navActiveBg:        '#1E3A8A',
  },

  // ── Typography ──────────────────────────────────────────
  typography: {
    mono: 'monospace',
  },

  font: {
    family: 'Inter',
    headlineXl:  { fontSize: 36, fontWeight: '700' as const, lineHeight: 44, letterSpacing: -0.72 },
    headlineLg:  { fontSize: 28, fontWeight: '600' as const, lineHeight: 36, letterSpacing: -0.28 },
    headlineMd:  { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
    headlineSm:  { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
    h1:          { fontSize: 28, fontWeight: '700' as const, lineHeight: 36, letterSpacing: -0.28 },
    h2:          { fontSize: 22, fontWeight: '700' as const, lineHeight: 28 },
    h3:          { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
    h4:          { fontSize: 15, fontWeight: '600' as const, lineHeight: 20 },
    bodyLg:      { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
    bodyMd:      { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
    bodySm:      { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
    labelLg:     { fontSize: 14, fontWeight: '600' as const, lineHeight: 20, letterSpacing: 0.14 },
    labelMd:     { fontSize: 12, fontWeight: '500' as const, lineHeight: 16, letterSpacing: 0.24 },
    labelSm:     { fontSize: 10, fontWeight: '600' as const, lineHeight: 14, letterSpacing: 0.4 },
  },

  // ── Spacing (8-pt grid) ─────────────────────────────────
  spacing: {
    xs:  4,
    sm:  8,
    md:  16,
    lg:  24,
    xl:  32,
    xxl: 48,
  },

  // ── Radius ──────────────────────────────────────────────
  radius: {
    xs:   2,
    sm:   4,
    md:   8,
    lg:  12,
    xl:  16,
    xxl: 20,
    full: 9999,
  },

  // ── Shadows (for StyleSheet) ────────────────────────────
  shadow: {
    sm: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    md: {
      shadowColor: '#1E3A8A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.12,
      shadowRadius: 25,
      elevation: 8,
    },
    card: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    raised: {
      shadowColor: '#1E3A8A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 4,
    },
    modal: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.12,
      shadowRadius: 25,
      elevation: 8,
    },
  },
} as const;
