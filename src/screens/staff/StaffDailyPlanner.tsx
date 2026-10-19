/**
 * StaffDailyPlanner — Daily Lesson Planner & Academic Checklist
 *
 * Dedicated teacher module:
 * • Date switcher: Today's schedule & periods
 * • Teaching timetable periods with syllabus chapter & classroom details
 * • Interactive checklist: Period lesson plan, lab apparatus setup, CBSE homework upload
 * • Quick Add Task & "Submit to Principal" countersignature trigger
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  BookOpen,
  Plus,
  Send,
  Calendar,
  AlertCircle,
  FileCheck,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';

interface PeriodPlan {
  period: string;
  time: string;
  classGroup: string;
  subject: string;
  topic: string;
  room: string;
  status: 'completed' | 'current' | 'upcoming';
}

const SAMPLE_PERIODS: PeriodPlan[] = [
  {
    period: 'Period 1',
    time: '08:30 - 09:15 AM',
    classGroup: 'Class 11-A',
    subject: 'Physics (Theory)',
    topic: 'Chapter 3: Electrostatics & Coulomb’s Law derivations',
    room: 'Room 204 (Senior Wing)',
    status: 'completed',
  },
  {
    period: 'Period 3',
    time: '10:15 - 11:00 AM',
    classGroup: 'Class 12-B',
    subject: 'Physics Laboratory',
    topic: 'Experiment 4: Optical Bench - Focal length of convex lens',
    room: 'Central Physics Lab 02',
    status: 'current',
  },
  {
    period: 'Period 5',
    time: '12:00 - 12:45 PM',
    classGroup: 'Class 9-C',
    subject: 'General Science',
    topic: 'Forces and Laws of Motion - Numerical problem sets',
    room: 'Room 108 (Middle Wing)',
    status: 'upcoming',
  },
];

export default function StaffDailyPlanner() {
  const [tasks, setTasks] = useState([
    { id: 't1', text: 'Prepare projectile motion apparatus for Period 3', done: true },
    { id: 't2', text: 'Collect Class 11-A Chapter 2 test notebook submissions', done: true },
    { id: 't3', text: 'Upload weekly question bank for CBSE Board remediation', done: false },
    { id: 't4', text: 'Submit Week 42 Lesson Planner for Principal review', done: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTask = () => {
    if (!newTaskText.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: newTaskText.trim(), done: false },
    ]);
    setNewTaskText('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* ── Subheader ──────────────────────── */}
      <View style={styles.subHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Daily Lesson Planner</Text>
          <View style={styles.dateBadge}>
            <Calendar size={13} color={DT.color.primary} strokeWidth={2} />
            <Text style={styles.dateBadgeText}>Today's Schedule</Text>
          </View>
        </View>
        <Text style={styles.subText}>Period periods, classroom objectives & CBSE compliance</Text>
      </View>

      {/* ── Submission Alert Banner ────────── */}
      <View style={styles.auditCard}>
        <View style={styles.auditIcon}>
          <FileCheck size={20} color={DT.color.primary} strokeWidth={2} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.auditTitle}>CBSE Weekly Lesson Audit</Text>
          <Text style={styles.auditDesc}>
            {submitted
              ? 'Plan submitted to Principal Divyansh Kugasiya'
              : 'Submit before 11:30 AM for Principal countersignature'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.submitPlanBtn, submitted && { backgroundColor: DT.color.successBg }]}
          onPress={() => setSubmitted(true)}
          disabled={submitted}
          activeOpacity={0.7}
        >
          {submitted ? (
            <Text style={[styles.submitPlanText, { color: DT.color.success }]}>Submitted</Text>
          ) : (
            <>
              <Send size={13} color="#FFFFFF" strokeWidth={2.2} />
              <Text style={styles.submitPlanText}>Submit</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* ── Today's Periods Schedule ───────── */}
      <View style={styles.sectionHeader}>
        <BookOpen size={16} color={DT.color.primary} strokeWidth={2} />
        <Text style={styles.sectionHeaderText}>Assigned Class Periods Today</Text>
      </View>

      <View style={styles.periodsList}>
        {SAMPLE_PERIODS.map((p, idx) => {
          const isCurrent = p.status === 'current';
          const isDone = p.status === 'completed';
          return (
            <View key={idx} style={[styles.periodCard, isCurrent && styles.periodCardCurrent]}>
              <View style={styles.periodCardLeft}>
                <View
                  style={[
                    styles.periodStatusDot,
                    isDone
                      ? { backgroundColor: DT.color.success }
                      : isCurrent
                      ? { backgroundColor: DT.color.accent }
                      : { backgroundColor: DT.color.textMuted },
                  ]}
                />
                <View style={{ flex: 1 }}>
                  <View style={styles.periodHeaderRow}>
                    <Text style={styles.periodNumber}>{p.period}</Text>
                    <Text style={styles.periodTime}>{p.time}</Text>
                    <View style={styles.classPill}>
                      <Text style={styles.classPillText}>{p.classGroup}</Text>
                    </View>
                  </View>
                  <Text style={styles.subjectText}>{p.subject}</Text>
                  <Text style={styles.topicText}>{p.topic}</Text>
                  <Text style={styles.roomText}>{p.room}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* ── Teacher Action Checklist ────────── */}
      <View style={[styles.sectionHeader, { marginTop: DT.spacing.md }]}>
        <CalendarCheck size={16} color={DT.color.primary} strokeWidth={2} />
        <Text style={styles.sectionHeaderText}>Daily Academic Checklist</Text>
      </View>

      <View style={styles.checklistCard}>
        {tasks.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={styles.taskRow}
            onPress={() => toggleTask(t.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.taskCheckbox, t.done && styles.taskCheckboxDone]}>
              {t.done && <CheckCircle2 size={16} color={DT.color.success} strokeWidth={2.4} />}
            </View>
            <Text style={[styles.taskText, t.done && styles.taskTextDone]}>{t.text}</Text>
          </TouchableOpacity>
        ))}

        {/* Add Task Input */}
        <View style={styles.addTaskRow}>
          <TextInput
            style={styles.addTaskInput}
            placeholder="Add personal preparation task..."
            placeholderTextColor={DT.color.textMuted}
            value={newTaskText}
            onChangeText={setNewTaskText}
          />
          <TouchableOpacity style={styles.addTaskBtn} onPress={addTask} activeOpacity={0.7}>
            <Plus size={16} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
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
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DT.color.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: DT.radius.full,
  },
  dateBadgeText: { ...DT.font.labelSm, color: DT.color.primary, fontWeight: '700', fontSize: 10 },
  subText: { ...DT.font.bodySm, color: DT.color.textSecondary, marginTop: 2 },

  // Audit Banner
  auditCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: DT.color.surface,
    padding: DT.spacing.md,
    borderRadius: DT.radius.xl,
    borderWidth: 1,
    borderColor: DT.color.primaryBorder,
    marginBottom: DT.spacing.md,
    ...DT.shadow.sm,
  },
  auditIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DT.color.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  auditTitle: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700' },
  auditDesc: { ...DT.font.bodySm, color: DT.color.textSecondary, fontSize: 11, marginTop: 1 },
  submitPlanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DT.color.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: DT.radius.md,
  },
  submitPlanText: { ...DT.font.labelSm, color: '#FFFFFF', fontWeight: '700' },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: DT.spacing.sm },
  sectionHeaderText: { ...DT.font.labelMd, color: DT.color.textPrimary, fontWeight: '700', letterSpacing: 0.5 },

  // Periods
  periodsList: { gap: DT.spacing.sm, marginBottom: DT.spacing.md },
  periodCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.lg,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  periodCardCurrent: {
    borderColor: DT.color.accent,
    borderWidth: 1.5,
  },
  periodCardLeft: { flexDirection: 'row', gap: 10 },
  periodStatusDot: { width: 8, height: 8, borderRadius: 4, marginTop: 4 },
  periodHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  periodNumber: { ...DT.font.labelMd, color: DT.color.primary, fontWeight: '700' },
  periodTime: { ...DT.font.bodySm, color: DT.color.textMuted, fontSize: 11 },
  classPill: { backgroundColor: DT.color.surfaceDim, paddingHorizontal: 6, paddingVertical: 1, borderRadius: DT.radius.xs },
  classPillText: { ...DT.font.labelSm, color: DT.color.textSecondary, fontSize: 10, fontWeight: '700' },
  subjectText: { ...DT.font.h4, color: DT.color.textPrimary, marginTop: 2 },
  topicText: { ...DT.font.bodySm, color: DT.color.textSecondary, marginTop: 2 },
  roomText: { ...DT.font.labelSm, color: DT.color.textMuted, fontSize: 10, marginTop: 4 },

  // Checklist
  checklistCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: DT.color.borderLight,
  },
  taskCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: DT.color.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCheckboxDone: { borderColor: DT.color.success },
  taskText: { ...DT.font.bodyMd, color: DT.color.textPrimary, flex: 1 },
  taskTextDone: { color: DT.color.textMuted, textDecorationLine: 'line-through' },
  addTaskRow: { flexDirection: 'row', gap: 8, marginTop: DT.spacing.md },
  addTaskInput: {
    flex: 1,
    backgroundColor: DT.color.surfaceDim,
    borderRadius: DT.radius.md,
    paddingHorizontal: DT.spacing.md,
    height: 42,
    ...DT.font.bodySm,
    color: DT.color.textPrimary,
  },
  addTaskBtn: {
    width: 42,
    height: 42,
    borderRadius: DT.radius.md,
    backgroundColor: DT.color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
