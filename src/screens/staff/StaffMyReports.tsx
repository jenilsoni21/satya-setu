/**
 * StaffMyReports — Personal Performance & CBSE Appraisal Dossier
 *
 * Dedicated teacher module:
 * • Composite Performance Score (4.8 / 5.0 Exemplary)
 * • Detailed Evaluation Rubric breakdown (Punctuality, Pedagogy, CBSE Audit, Student Engagement)
 * • Principal Countersignature timeline & evaluator commentary
 * • Term-wise historical appraisals & downloadable PDF dossier
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
  Award,
  Star,
  CheckCircle2,
  ShieldCheck,
  FileDown,
  TrendingUp,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';

export default function StaffMyReports() {
  const [activeTab, setActiveTab] = useState<'term2' | 'term1' | 'annual'>('term2');

  const rubrics = [
    { label: 'Morning Punctuality & Gate Check', score: '9.8 / 10', grade: 'Top 2%', desc: 'Average gate check-in at 07:42 AM across 24 days' },
    { label: 'Curriculum & Pedagogy Delivery', score: '9.4 / 10', grade: 'Exemplary', desc: 'Class 11-A physics syllabus 100% on schedule' },
    { label: 'CBSE Lesson Planner Audit', score: '10 / 10', grade: 'Perfect', desc: 'All weekly lesson plans submitted before Monday 11:30 AM' },
    { label: 'Laboratory Safety & Student Care', score: '9.6 / 10', grade: 'Distinction', desc: 'Full compliance with central physics laboratory protocols' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* ── Subheader ──────────────────────── */}
      <View style={styles.subHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>My Appraisals & Reports</Text>
          <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.7}>
            <FileDown size={14} color={DT.color.primary} strokeWidth={2} />
            <Text style={styles.downloadBtnText}>Dossier PDF</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subText}>Official quarterly evaluations & Principal countersignatures</Text>
      </View>

      {/* ── Score Hero Card ────────────────── */}
      <View style={styles.scoreHeroCard}>
        <View style={styles.scoreHeroTop}>
          <View>
            <View style={styles.academicPill}>
              <ShieldCheck size={12} color={DT.color.primary} strokeWidth={2} />
              <Text style={styles.academicPillText}>Academic Session 2024-25</Text>
            </View>
            <Text style={styles.overallRatingTitle}>Overall Composite Score</Text>
          </View>
          <View style={styles.gradeBadge}>
            <Text style={styles.gradeBadgeText}>Grade: Exemplary</Text>
          </View>
        </View>

        <View style={styles.scoreNumberRow}>
          <Text style={styles.bigScore}>4.8</Text>
          <Text style={styles.maxScore}>/ 5.0</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={18} color={DT.color.accent} fill={DT.color.accent} />
            ))}
          </View>
        </View>

        <View style={styles.progressMeterBar}>
          <View style={[styles.progressMeterFill, { width: '96%' }]} />
        </View>
        <Text style={styles.progressMeterDesc}>Percentile Rank: Top 4% across Senior Secondary Science Wing</Text>
      </View>

      {/* ── Term Switcher ──────────────────── */}
      <View style={styles.termRow}>
        {[
          { key: 'term2', label: 'Term 2 (Current)' },
          { key: 'term1', label: 'Term 1 Evaluation' },
          { key: 'annual', label: 'Annual 2023-24' },
        ].map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.termBtn, activeTab === t.key && styles.termBtnActive]}
            onPress={() => setActiveTab(t.key as any)}
            activeOpacity={0.7}
          >
            <Text style={[styles.termBtnText, activeTab === t.key && styles.termBtnTextActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Detailed Rubric Breakdown ──────── */}
      <View style={styles.sectionHeader}>
        <Award size={16} color={DT.color.primary} strokeWidth={2} />
        <Text style={styles.sectionHeaderText}>Official Rubric Evaluation Metrics</Text>
      </View>

      <View style={styles.rubricsList}>
        {rubrics.map((r, idx) => (
          <View key={idx} style={styles.rubricCard}>
            <View style={styles.rubricCardTop}>
              <Text style={styles.rubricTitle}>{r.label}</Text>
              <View style={styles.rubricScorePill}>
                <Text style={styles.rubricScoreText}>{r.score}</Text>
              </View>
            </View>
            <Text style={styles.rubricDesc}>{r.desc}</Text>
            <View style={styles.rubricCardBottom}>
              <View style={styles.rubricGradePill}>
                <CheckCircle2 size={12} color={DT.color.success} strokeWidth={2} />
                <Text style={styles.rubricGradeText}>{r.grade}</Text>
              </View>
              <Text style={styles.auditCheckText}>CBSE Compliance Verified</Text>
            </View>
          </View>
        ))}
      </View>

      {/* ── Principal Commentary ───────────── */}
      <View style={styles.commentCard}>
        <View style={styles.commentHeader}>
          <ShieldCheck size={18} color={DT.color.primary} strokeWidth={2} />
          <Text style={styles.commentTitle}>Principal Countersignature & Commentary</Text>
        </View>
        <Text style={styles.commentBody}>
          "Rajvi Zinzuvadiya has displayed outstanding dedication to Physics laboratory apparatus readiness and on-time weekly planner completion. Her students' Term 1 results in Electrostatics were commendable."
        </Text>
        <View style={styles.signerRow}>
          <Text style={styles.signerName}>Divyansh Kugasiya</Text>
          <Text style={styles.signerRole}>Principal & Academic Director • Signed 10 Oct 2026</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DT.color.background },
  content: { padding: DT.spacing.md, paddingBottom: 120 },

  subHeader: { marginBottom: DT.spacing.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 },
  sectionTitle: { ...DT.font.h1, color: DT.color.textPrimary, flexShrink: 1 },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DT.color.surfaceDim,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: DT.radius.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
  },
  downloadBtnText: { ...DT.font.labelSm, color: DT.color.primary, fontWeight: '700' },
  subText: { ...DT.font.bodySm, color: DT.color.textSecondary, marginTop: 2 },

  // Score Hero
  scoreHeroCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.lg,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    marginBottom: DT.spacing.md,
    ...DT.shadow.sm,
  },
  scoreHeroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  academicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DT.color.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: DT.radius.full,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  academicPillText: { ...DT.font.labelSm, color: DT.color.primary, fontSize: 10, fontWeight: '700' },
  overallRatingTitle: { ...DT.font.h3, color: DT.color.textPrimary },
  gradeBadge: {
    backgroundColor: DT.color.accentLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: DT.radius.full,
  },
  gradeBadgeText: { ...DT.font.labelSm, color: DT.color.onAccent, fontWeight: '700' },

  scoreNumberRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginVertical: DT.spacing.sm },
  bigScore: { fontSize: 44, fontWeight: '800', color: DT.color.textPrimary },
  maxScore: { ...DT.font.h3, color: DT.color.textMuted },
  starsRow: { flexDirection: 'row', gap: 3, marginLeft: 'auto', alignSelf: 'center' },

  progressMeterBar: {
    height: 8,
    backgroundColor: DT.color.surfaceDim,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressMeterFill: { height: '100%', backgroundColor: DT.color.primary, borderRadius: 4 },
  progressMeterDesc: { ...DT.font.labelSm, color: DT.color.textSecondary, fontSize: 11 },

  // Terms
  termRow: { flexDirection: 'row', gap: 6, marginBottom: DT.spacing.md },
  termBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: DT.radius.full, backgroundColor: DT.color.surfaceDim },
  termBtnActive: { backgroundColor: DT.color.primary },
  termBtnText: { ...DT.font.labelSm, color: DT.color.textSecondary, fontSize: 11 },
  termBtnTextActive: { color: '#FFFFFF', fontWeight: '700' },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: DT.spacing.sm },
  sectionHeaderText: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700', letterSpacing: 0.5 },

  // Rubrics
  rubricsList: { gap: DT.spacing.sm, marginBottom: DT.spacing.md },
  rubricCard: {
    backgroundColor: DT.color.surface,
    padding: DT.spacing.md,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  rubricCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rubricTitle: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700', flex: 1 },
  rubricScorePill: { backgroundColor: DT.color.primaryLight, paddingHorizontal: 8, paddingVertical: 2, borderRadius: DT.radius.xs },
  rubricScoreText: { ...DT.font.labelSm, color: DT.color.primary, fontWeight: '800' },
  rubricDesc: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 11, marginVertical: 6 },
  rubricCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, borderTopWidth: 1, borderTopColor: DT.color.borderLight },
  rubricGradePill: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rubricGradeText: { ...DT.font.labelSm, color: DT.color.success, fontWeight: '700', fontSize: 10 },
  auditCheckText: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10 },

  // Commentary
  commentCard: {
    backgroundColor: DT.color.surface,
    padding: DT.spacing.md,
    borderRadius: DT.radius.xl,
    borderWidth: 1,
    borderColor: DT.color.primaryBorder,
    marginBottom: DT.spacing.xl,
    ...DT.shadow.sm,
  },
  commentHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: DT.spacing.sm },
  commentTitle: { ...DT.font.labelMd, color: DT.color.primary, fontWeight: '700' },
  commentBody: { ...DT.font.bodySm, color: DT.color.textSecondary, fontStyle: 'italic', lineHeight: 20 },
  signerRow: { marginTop: DT.spacing.md, paddingTop: DT.spacing.xs, borderTopWidth: 1, borderTopColor: DT.color.borderLight },
  signerName: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700' },
  signerRole: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 11 },
});
