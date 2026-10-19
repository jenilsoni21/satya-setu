/**
 * AdminPerformanceReports — Performance Reports & Appraisal Hub
 *
 * Provides:
 * • Top-level category tabs: Weekly Reviews, Yearly Appraisal, Random Check, Analytics
 * • Individual Teacher Review Cards under Weekly Reviews
 * • Detailed Criteria Checklist View upon clicking a teacher's card/name:
 *   - Good behavior with parents
 *   - Doing work properly & submitting lesson planners
 *   - Attending class promptly after lecture starts
 *   - Classroom discipline & student engagement
 *   - Notebook checking & CBSE syllabus alignment
 *   - Professional cooperation & morning assembly duty
 * • Separate report & status for each staff member
 * • Interactive checklist toggles, score calculations & Countersignature workflow
 * • Zero overlapping and full responsive typography
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
  Award,
  CheckCircle2,
  Circle,
  AlertTriangle,
  FileSpreadsheet,
  FileText,
  Download,
  Share2,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  Star,
  Clock,
  Sparkles,
  Users,
  Check,
  Calendar,
  MessageSquare,
  BookOpen,
  UserCheck,
  Search,
  Filter,
} from 'lucide-react-native';
import { DesignTokens as DT } from '@/constants/design-tokens';

export type ReviewCategory = 'All' | 'Punctuality' | 'Work Quality' | 'Parent Relations' | 'Discipline';

export interface ReviewCriterion {
  id: string;
  category: 'Punctuality' | 'Work Quality' | 'Parent Relations' | 'Discipline';
  title: string;
  description: string;
  checked: boolean;
  score: number;
  maxScore: number;
  rating: 'Exemplary' | 'Satisfactory' | 'Needs Attention';
  observation?: string;
}

export interface TeacherWeeklyReport {
  id: string;
  teacherName: string;
  empCode: string;
  subject: string;
  wing: 'Senior Secondary' | 'Middle Wing' | 'Primary Wing';
  avatarInitials: string;
  avatarBg: string;
  overallScore: number;
  status: 'pending_signature' | 'approved' | 'action_needed';
  weekPeriod: string;
  session: string;
  lastUpdated: string;
  evaluator: string;
  evaluatorRole: string;
  summaryNotes: string;
  quickMetrics: { label: string; score: string }[];
  criteria: ReviewCriterion[];
}

const INITIAL_TEACHER_REPORTS: TeacherWeeklyReport[] = [
  {
    id: 'rep-rajvi-zinzuvadiya',
    teacherName: 'Rajvi Zinzuvadiya',
    empCode: 'SSP-2018-042',
    subject: 'PGT Physics',
    wing: 'Senior Secondary',
    avatarInitials: 'RZ',
    avatarBg: '#0284C7',
    overallScore: 4.8,
    status: 'approved',
    weekPeriod: 'Week 42 (10 Oct - 16 Oct 2026)',
    session: '2024-25',
    lastUpdated: 'Today at 09:30 AM',
    evaluator: 'Divyansh Kugasiya',
    evaluatorRole: 'Principal & Academic Director',
    summaryNotes:
      'Exemplary pedagogical delivery for Class 11-A physics syllabus. Punctual at all lectures, highly courteous parent communication during PTM, and pristine lab safety protocols.',
    quickMetrics: [
      { label: 'Punctuality', score: '9.8/10' },
      { label: 'Pedagogy', score: '9.4/10' },
      { label: 'CBSE Coverage', score: '100%' },
    ],
    criteria: [
      {
        id: 'c1',
        category: 'Punctuality',
        title: 'Attending class promptly after lecture starts',
        description:
          'Reaches classroom/lab within 2 minutes of the bell. Zero corridor delay or loitering.',
        checked: true,
        score: 9.8,
        maxScore: 10,
        rating: 'Exemplary',
        observation: 'Always at the door of Room 204 as the lecture chime rings.',
      },
      {
        id: 'c2',
        category: 'Parent Relations',
        title: 'Good behavior & respectful communication with parents',
        description:
          'Courteous, calm, and empathetic tone during parent interactions and telephonic consultations.',
        checked: true,
        score: 9.9,
        maxScore: 10,
        rating: 'Exemplary',
        observation: 'Class 11 parents commended her detailed guidance on NEET entrance preparation.',
      },
      {
        id: 'c3',
        category: 'Work Quality',
        title: 'Doing work properly & submitting lesson planners on time',
        description:
          'Comprehensive lesson plans submitted before Monday 11:30 AM deadline with CBSE learning milestones.',
        checked: true,
        score: 9.6,
        maxScore: 10,
        rating: 'Exemplary',
        observation: 'Term 2 physics syllabus completed 1 week ahead of schedule.',
      },
      {
        id: 'c4',
        category: 'Punctuality',
        title: 'Student attendance marking & portal sync',
        description:
          'Takes roll call within first 5 minutes of each period and syncs to biometric system.',
        checked: true,
        score: 10,
        maxScore: 10,
        rating: 'Exemplary',
        observation: '100% portal synchronisation record across 24 days.',
      },
      {
        id: 'c5',
        category: 'Work Quality',
        title: 'Regular student notebook checking & practical journal evaluation',
        description:
          'Practical record books corrected weekly with constructive feedback and signature.',
        checked: true,
        score: 9.5,
        maxScore: 10,
        rating: 'Satisfactory',
        observation: 'All 48 senior batch journals verified and stamped.',
      },
      {
        id: 'c6',
        category: 'Discipline',
        title: 'Morning assembly presence & prayer coordination duty',
        description:
          'Punctual on school ground; ensures silence and alignment in student rows.',
        checked: true,
        score: 9.8,
        maxScore: 10,
        rating: 'Exemplary',
        observation: 'Supervised senior quadrangle assembly seamlessly on Tuesday.',
      },
      {
        id: 'c7',
        category: 'Parent Relations',
        title: 'Prompt feedback on parent queries via school portal',
        description:
          'Addresses parent concerns and messages within 24 hours of receipt.',
        checked: true,
        score: 9.4,
        maxScore: 10,
        rating: 'Satisfactory',
        observation: 'Average portal reply latency: 4 hours 15 minutes.',
      },
      {
        id: 'c8',
        category: 'Discipline',
        title: 'Professional cooperation with colleagues & administration',
        description:
          'Supports substitute duty gladly and shares digital teaching aids with faculty.',
        checked: true,
        score: 9.7,
        maxScore: 10,
        rating: 'Exemplary',
        observation: 'Conducted shared physics demonstration workshop for Middle Wing teachers.',
      },
    ],
  },
  {
    id: 'rep-janvi-vadoliya',
    teacherName: 'Janvi Vadoliya',
    empCode: 'SSP-2015-018',
    subject: 'TGT English',
    wing: 'Middle Wing',
    avatarInitials: 'JV',
    avatarBg: '#0D9488',
    overallScore: 4.9,
    status: 'approved',
    weekPeriod: 'Week 42 (10 Oct - 16 Oct 2026)',
    session: '2024-25',
    lastUpdated: 'Yesterday at 04:15 PM',
    evaluator: 'Divyansh Kugasiya',
    evaluatorRole: 'Principal & Academic Director',
    summaryNotes:
      'Outstanding English pedagogy and nurturing classroom rapport. Flawless attendance record and exceptional parent communication.',
    quickMetrics: [
      { label: 'Punctuality', score: '10/10' },
      { label: 'Pedagogy', score: '9.8/10' },
      { label: 'CBSE Coverage', score: '100%' },
    ],
    criteria: [
      {
        id: 'c1',
        category: 'Punctuality',
        title: 'Attending class promptly after lecture starts',
        description:
          'Consistently present at classroom door as bell rings. 100% period coverage.',
        checked: true,
        score: 10,
        maxScore: 10,
        rating: 'Exemplary',
        observation: 'Arrives at English Room 3 minutes before the period starts.',
      },
      {
        id: 'c2',
        category: 'Parent Relations',
        title: 'Good behavior & respectful communication with parents',
        description:
          'Patient and objective discussions regarding student academic trajectory.',
        checked: true,
        score: 9.8,
        maxScore: 10,
        rating: 'Exemplary',
        observation: 'Received commendation from parents for dedicated reading support.',
      },
      {
        id: 'c3',
        category: 'Work Quality',
        title: 'Doing work properly & submitting lesson planners on time',
        description:
          'English curriculum map executed with comprehensive presentations.',
        checked: true,
        score: 9.9,
        maxScore: 10,
        rating: 'Exemplary',
        observation: 'Lesson planners consistently submitted on Friday afternoons before deadline.',
      },
      {
        id: 'c4',
        category: 'Discipline',
        title: 'Morning assembly presence & prayer coordination duty',
        description:
          'Active row coordination during school prayers.',
        checked: true,
        score: 9.8,
        maxScore: 10,
        rating: 'Exemplary',
        observation: 'Maintains disciplined Middle Wing rows every morning.',
      },
      {
        id: 'c5',
        category: 'Work Quality',
        title: 'Regular student notebook checking & essay evaluation',
        description:
          'Composition journals thoroughly marked with constructive feedback.',
        checked: true,
        score: 9.7,
        maxScore: 10,
        rating: 'Exemplary',
        observation: 'All 52 students completed mandatory CBSE written assignments.',
      },
    ],
  },
  {
    id: 'rep-pramod-trivedi',
    teacherName: 'Pramod Trivedi',
    empCode: 'SSP-2020-089',
    subject: 'PGT Mathematics',
    wing: 'Senior Secondary',
    avatarInitials: 'PT',
    avatarBg: '#D97706',
    overallScore: 3.9,
    status: 'action_needed',
    weekPeriod: 'Week 42 (10 Oct - 16 Oct 2026)',
    session: '2024-25',
    lastUpdated: '15 Oct at 11:20 AM',
    evaluator: 'Divyansh Kugasiya',
    evaluatorRole: 'Principal & Academic Director',
    summaryNotes:
      'Subject knowledge is strong, but lecture punctuality and lesson plan submission require urgent administrative correction. Depart staff room promptly on the bell.',
    quickMetrics: [
      { label: 'Punctuality', score: '7.2/10' },
      { label: 'Lesson Planner', score: 'Late' },
      { label: 'Student Results', score: '91%' },
    ],
    criteria: [
      {
        id: 'c1',
        category: 'Punctuality',
        title: 'Attending class promptly after lecture starts',
        description:
          'Reaches classroom within 2 minutes of the bell. Zero corridor delay or loitering.',
        checked: false,
        score: 6.5,
        maxScore: 10,
        rating: 'Needs Attention',
        observation:
          'Arrived 7 minutes late to Class 10-B on Tuesday and 5 minutes late on Thursday.',
      },
      {
        id: 'c2',
        category: 'Work Quality',
        title: 'Doing work properly & submitting lesson planners on time',
        description:
          'Comprehensive lesson plans submitted before Monday 11:30 AM deadline.',
        checked: false,
        score: 7.0,
        maxScore: 10,
        rating: 'Needs Attention',
        observation:
          'Week 42 calculus lesson plan submitted 2 days overdue after reminder.',
      },
      {
        id: 'c3',
        category: 'Parent Relations',
        title: 'Good behavior & respectful communication with parents',
        description:
          'Courteous, constructive, and empathetic tone during parent consultations.',
        checked: true,
        score: 9.1,
        maxScore: 10,
        rating: 'Satisfactory',
        observation:
          'Parents reported teacher is supportive during remedial math clinics.',
      },
      {
        id: 'c4',
        category: 'Work Quality',
        title: 'Regular student notebook checking & homework evaluation',
        description:
          'Corrections done with constructive teacher feedback and student follow-up.',
        checked: true,
        score: 8.2,
        maxScore: 10,
        rating: 'Satisfactory',
        observation: 'Notebook checking caught up to Chapter 5; Chapter 6 pending.',
      },
      {
        id: 'c5',
        category: 'Discipline',
        title: 'Morning assembly presence & prayer coordination duty',
        description:
          'Punctual on school ground; maintains discipline in student rows.',
        checked: true,
        score: 8.5,
        maxScore: 10,
        rating: 'Satisfactory',
        observation: 'Present on assembly ground; encouraged to monitor middle rows closer.',
      },
    ],
  },
  {
    id: 'rep-prinsi-moliya',
    teacherName: 'Prinsi Moliya',
    empCode: 'SSP-2022-114',
    subject: 'PRT Hindi',
    wing: 'Primary Wing',
    avatarInitials: 'PM',
    avatarBg: '#7C3AED',
    overallScore: 4.6,
    status: 'pending_signature',
    weekPeriod: 'Week 42 (10 Oct - 16 Oct 2026)',
    session: '2024-25',
    lastUpdated: 'Today at 08:45 AM',
    evaluator: 'Divyansh Kugasiya',
    evaluatorRole: 'Principal & Academic Director',
    summaryNotes:
      'Warm and nurturing rapport with young learners and their parents. Creative teaching aids used during poetry recitation. Probation review ready for signature.',
    quickMetrics: [
      { label: 'Punctuality', score: '9.2/10' },
      { label: 'Parent Rapport', score: '9.8/10' },
      { label: 'Activity Co-ord', score: '9.6/10' },
    ],
    criteria: [
      {
        id: 'c1',
        category: 'Parent Relations',
        title: 'Good behavior & respectful communication with parents',
        description:
          'Courteous, calm, and reassuring tone with primary parents regarding child adaptation.',
        checked: true,
        score: 9.9,
        maxScore: 10,
        rating: 'Exemplary',
        observation:
          'Highly appreciated by Grade 3 parents for prompt WhatsApp broadcast updates on handwriting progress.',
      },
      {
        id: 'c2',
        category: 'Punctuality',
        title: 'Attending class promptly after lecture starts',
        description:
          'Arrives promptly at primary wing classrooms; escorts students safely.',
        checked: true,
        score: 9.5,
        maxScore: 10,
        rating: 'Satisfactory',
        observation: 'Always at classroom door to receive young students after recess.',
      },
      {
        id: 'c3',
        category: 'Work Quality',
        title: 'Doing work properly & submitting lesson planners on time',
        description:
          'Lesson plans submitted on time with phonetics, poems, and moral story activities.',
        checked: true,
        score: 9.4,
        maxScore: 10,
        rating: 'Satisfactory',
        observation: 'Integrated visual flashcards and puppet storytelling successfully.',
      },
      {
        id: 'c4',
        category: 'Work Quality',
        title: 'Regular student notebook checking & handwriting corrections',
        description:
          'Handwriting journals stamped with encouraging stickers and constructive corrections.',
        checked: true,
        score: 9.6,
        maxScore: 10,
        rating: 'Exemplary',
        observation: 'Very neat and caring corrections on all 38 student copies.',
      },
      {
        id: 'c5',
        category: 'Discipline',
        title: 'Campus duty & primary dismissal corridor supervision',
        description:
          'Oversees smooth dispersal of primary buses at Gate 02.',
        checked: true,
        score: 9.8,
        maxScore: 10,
        rating: 'Exemplary',
        observation: 'Exemplary bus queue management during Friday rain.',
      },
    ],
  },
];
export default function AdminPerformanceReports() {
  const [activeCategory, setActiveCategory] = useState<'weekly' | 'yearly' | 'random' | 'analytics'>('weekly');
  const [reportsData, setReportsData] = useState<TeacherWeeklyReport[]>(INITIAL_TEACHER_REPORTS);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [selectedWing, setSelectedWing] = useState<'All' | 'Senior Secondary' | 'Middle Wing' | 'Primary Wing'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [criteriaFilter, setCriteriaFilter] = useState<ReviewCategory>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger quick toast notice
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle single criterion in the active report
  const handleToggleCriterion = (reportId: string, criterionId: string) => {
    setReportsData((prev) =>
      prev.map((rep) => {
        if (rep.id !== reportId) return rep;
        const updatedCriteria = rep.criteria.map((c) =>
          c.id === criterionId ? { ...c, checked: !c.checked } : c
        );
        // Recalculate score based on checked criteria
        const checkedCount = updatedCriteria.filter((c) => c.checked).length;
        const total = updatedCriteria.length;
        const calculatedScore = Number(((checkedCount / total) * 5.0).toFixed(1));
        return {
          ...rep,
          criteria: updatedCriteria,
          overallScore: calculatedScore > 0 ? calculatedScore : 2.5,
        };
      })
    );
  };

  // Countersign a report
  const handleCountersign = (reportId: string) => {
    setReportsData((prev) =>
      prev.map((rep) => (rep.id === reportId ? { ...rep, status: 'approved' } : rep))
    );
    showToast('✓ Report Countersigned and Archived successfully!');
  };

  // Filter reports for the weekly list
  const filteredReports = reportsData.filter((r) => {
    const matchesWing = selectedWing === 'All' || r.wing === selectedWing;
    const matchesSearch =
      r.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.empCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWing && matchesSearch;
  });

  const activeTeacherReport = reportsData.find((r) => r.id === selectedReportId);

  // ═══════════════════════════════════════════════════════════════
  // VIEW: INDIVIDUAL TEACHER DETAILED CRITERIA REPORT
  // ═══════════════════════════════════════════════════════════════
  if (selectedReportId && activeTeacherReport) {
    const r = activeTeacherReport;
    const visibleCriteria =
      criteriaFilter === 'All'
        ? r.criteria
        : r.criteria.filter((c) => c.category === criteriaFilter);

    const checkedTotal = r.criteria.filter((c) => c.checked).length;
    const isApproved = r.status === 'approved';

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.detailContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Toast Feedback */}
        {toastMessage && (
          <View style={styles.toastBanner}>
            <CheckCircle2 size={16} color="#FFFFFF" strokeWidth={2.4} />
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        )}

        {/* Back Bar & Quick Staff Selector */}
        <View style={styles.backRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedReportId(null)}
            activeOpacity={0.7}
          >
            <ArrowLeft size={16} color={DT.color.primary} strokeWidth={2.4} />
            <Text style={styles.backButtonText}>Back to Weekly Reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Staff Switcher Carousel */}
        <View style={styles.staffCarouselCard}>
          <Text style={styles.staffCarouselLabel}>SWITCH FACULTY DOSSIER:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.staffCarouselScroll}
          >
            {reportsData.map((staff) => {
              const isSelected = staff.id === r.id;
              return (
                <TouchableOpacity
                  key={staff.id}
                  style={[
                    styles.staffPill,
                    isSelected && styles.staffPillActive,
                  ]}
                  onPress={() => setSelectedReportId(staff.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.staffPillAvatar,
                      { backgroundColor: staff.avatarBg },
                    ]}
                  >
                    <Text style={styles.staffPillAvatarText}>
                      {staff.avatarInitials}
                    </Text>
                  </View>
                  <View style={{ minWidth: 0, flexShrink: 1 }}>
                    <Text
                      style={[
                        styles.staffPillName,
                        isSelected && styles.staffPillNameActive,
                      ]}
                      numberOfLines={1}
                    >
                      {staff.teacherName}
                    </Text>
                    <Text style={styles.staffPillSub} numberOfLines={1}>
                      {staff.subject}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Teacher Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={[styles.heroAvatar, { backgroundColor: r.avatarBg }]}>
              <Text style={styles.heroAvatarText}>{r.avatarInitials}</Text>
            </View>

            <View style={styles.heroInfoCol}>
              <View style={styles.heroNameRow}>
                <Text style={styles.heroName} numberOfLines={1} ellipsizeMode="tail">
                  {r.teacherName}
                </Text>
                <View
                  style={[
                    styles.heroStatusPill,
                    isApproved
                      ? styles.heroStatusApproved
                      : styles.heroStatusPending,
                  ]}
                >
                  {isApproved ? (
                    <CheckCircle2 size={12} color={DT.color.success} strokeWidth={2.4} />
                  ) : (
                    <Clock size={12} color={DT.color.warning} strokeWidth={2.4} />
                  )}
                  <Text
                    style={[
                      styles.heroStatusText,
                      isApproved ? { color: DT.color.success } : { color: DT.color.warning },
                    ]}
                  >
                    {isApproved ? 'Countersigned' : 'Pending Signature'}
                  </Text>
                </View>
              </View>

              <Text style={styles.heroSubText}>
                {r.subject} • {r.wing} • {r.empCode}
              </Text>

              <View style={styles.sessionRow}>
                <Calendar size={12} color={DT.color.textMuted} />
                <Text style={styles.sessionText}>
                  {r.weekPeriod} (Session {r.session})
                </Text>
              </View>
            </View>
          </View>

          {/* Score & Progress Summary */}
          <View style={styles.heroScoreCard}>
            <View style={styles.scoreRow}>
              <View>
                <Text style={styles.scoreMetaLabel}>OVERALL COMPOSITE RATING</Text>
                <View style={styles.scoreNumberRow}>
                  <Star size={20} color={DT.color.accent} fill={DT.color.accent} />
                  <Text style={styles.scoreValue}>{r.overallScore}</Text>
                  <Text style={styles.scoreTotal}>/ 5.0</Text>
                  <View style={styles.gradeBadge}>
                    <Text style={styles.gradeBadgeText}>
                      {r.overallScore >= 4.5
                        ? 'EXEMPLARY'
                        : r.overallScore >= 4.0
                        ? 'COMMENDABLE'
                        : 'NEEDS ACTION'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.compliancePill}>
                <ShieldCheck size={14} color={DT.color.primary} strokeWidth={2} />
                <Text style={styles.complianceText}>
                  {checkedTotal}/{r.criteria.length} Criteria Passed
                </Text>
              </View>
            </View>

            {/* Visual Progress bar */}
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${Math.round((checkedTotal / r.criteria.length) * 100)}%`,
                    backgroundColor:
                      r.overallScore >= 4.5
                        ? DT.color.success
                        : r.overallScore >= 4.0
                        ? DT.color.primary
                        : DT.color.warning,
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* ── Criteria Category Filter Pills ── */}
        <View style={styles.criteriaHeaderRow}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={styles.criteriaSectionTitle}>Weekly Evaluation Criteria</Text>
            <Text style={styles.criteriaSectionSub}>
              Tap any item to verify check-list compliance or record observations
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterPillScroll}
        >
          {(['All', 'Punctuality', 'Work Quality', 'Parent Relations', 'Discipline'] as ReviewCategory[]).map(
            (cat) => {
              const isActive = criteriaFilter === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.filterPill, isActive && styles.filterPillActive]}
                  onPress={() => setCriteriaFilter(cat)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      isActive && styles.filterPillTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            }
          )}
        </ScrollView>

        {/* ── Criteria Checklist Items ───────── */}
        <View style={styles.criteriaList}>
          {visibleCriteria.map((item, idx) => {
            const isChecked = item.checked;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.criterionCard,
                  isChecked ? styles.criterionCardChecked : styles.criterionCardUnchecked,
                ]}
                onPress={() => handleToggleCriterion(r.id, item.id)}
                activeOpacity={0.75}
              >
                <View style={styles.criterionTopRow}>
                  {/* Interactive Checkbox */}
                  <View style={styles.checkboxContainer}>
                    {isChecked ? (
                      <CheckCircle2 size={24} color={DT.color.success} fill="rgba(22, 163, 74, 0.15)" strokeWidth={2.4} />
                    ) : (
                      <Circle size={24} color={DT.color.danger} strokeWidth={2} />
                    )}
                  </View>

                  {/* Title & Tag */}
                  <View style={styles.criterionInfo}>
                    <View style={styles.criterionBadgeRow}>
                      <View style={styles.catBadge}>
                        <Text style={styles.catBadgeText}>{item.category.toUpperCase()}</Text>
                      </View>
                      <View
                        style={[
                          styles.ratingBadge,
                          item.rating === 'Exemplary'
                            ? styles.ratingExemplary
                            : item.rating === 'Satisfactory'
                            ? styles.ratingSatisfactory
                            : styles.ratingAction,
                        ]}
                      >
                        <Text
                          style={[
                            styles.ratingBadgeText,
                            item.rating === 'Exemplary'
                              ? { color: DT.color.success }
                              : item.rating === 'Satisfactory'
                              ? { color: DT.color.primary }
                              : { color: DT.color.danger },
                          ]}
                        >
                          {item.rating}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.criterionTitle}>{item.title}</Text>
                    <Text style={styles.criterionDescription}>{item.description}</Text>
                  </View>

                  {/* Score pill */}
                  <View style={styles.criterionScorePill}>
                    <Text style={styles.criterionScoreText}>
                      {item.score}/{item.maxScore}
                    </Text>
                  </View>
                </View>

                {/* Observation / Note from admin */}
                {item.observation && (
                  <View style={styles.observationBox}>
                    <MessageSquare size={13} color={DT.color.primary} />
                    <Text style={styles.observationText}>
                      <Text style={{ fontWeight: '700' }}>Reviewer Note: </Text>
                      {item.observation}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Reviewer Summary & Countersignature ─ */}
        <View style={styles.evaluationSummaryCard}>
          <View style={styles.summaryHeader}>
            <UserCheck size={18} color={DT.color.primary} strokeWidth={2.2} />
            <Text style={styles.summaryTitle}>Principal & Evaluator Sign-off</Text>
          </View>

          <Text style={styles.summaryNotesText}>"{r.summaryNotes}"</Text>

          <View style={styles.signatureRow}>
            <View>
              <Text style={styles.evaluatorName}>{r.evaluator}</Text>
              <Text style={styles.evaluatorRole}>{r.evaluatorRole}</Text>
              <Text style={styles.evaluatorDate}>Verified on: {r.lastUpdated}</Text>
            </View>

            <View style={styles.sealBadge}>
              <ShieldCheck size={20} color={DT.color.primary} strokeWidth={2.2} />
              <Text style={styles.sealText}>CBSE REG 2024</Text>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          {/* Action Buttons */}
          <View style={styles.actionButtonGroup}>
            {!isApproved ? (
              <TouchableOpacity
                style={styles.countersignPrimaryBtn}
                onPress={() => handleCountersign(r.id)}
                activeOpacity={0.7}
              >
                <ShieldCheck size={16} color="#FFFFFF" strokeWidth={2.4} />
                <Text style={styles.countersignBtnText}>Countersign & Approve Report</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.alreadyCountersignedBanner}>
                <CheckCircle2 size={16} color={DT.color.success} strokeWidth={2.4} />
                <Text style={styles.alreadyCountersignedText}>
                  Approved & Countersigned by Principal
                </Text>
              </View>
            )}

            <View style={styles.secondaryActionsRow}>
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => showToast('Exporting official PDF report dossier...')}
                activeOpacity={0.7}
              >
                <Download size={14} color={DT.color.textPrimary} strokeWidth={2} />
                <Text style={styles.secondaryBtnText}>Download PDF</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => showToast('Shared evaluation with teacher portal!')}
                activeOpacity={0.7}
              >
                <Share2 size={14} color={DT.color.textPrimary} strokeWidth={2} />
                <Text style={styles.secondaryBtnText}>Share with Staff</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // VIEW: MAIN PERFORMANCE & APPRAISAL HUB (WEEKLY REVIEWS LIST)
  // ═══════════════════════════════════════════════════════════════
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <View style={styles.toastBanner}>
          <CheckCircle2 size={16} color="#FFFFFF" strokeWidth={2.4} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* ── Subheader ──────────────────────── */}
      <View style={styles.subHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Performance & Appraisal Hub</Text>
          <View style={styles.auditBadge}>
            <ShieldCheck size={12} color={DT.color.primary} strokeWidth={2} />
            <Text style={styles.auditBadgeText}>CBSE Audit Ready</Text>
          </View>
        </View>
        <Text style={styles.subText}>
          Faculty lesson planners, weekly reviews & Principal countersignatures
        </Text>
      </View>

      {/* ── Metric Highlights ──────────────── */}
      <View style={styles.metricGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Audit Compliance</Text>
          <Text style={[styles.metricBig, { color: DT.color.success }]}>94.2%</Text>
          <Text style={styles.metricSub}>All 3 wings audited</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Pending Reviews</Text>
          <Text style={[styles.metricBig, { color: DT.color.warning }]}>
            {reportsData.filter((r) => r.status === 'pending_signature').length}
          </Text>
          <Text style={styles.metricSub}>Appraisals due today</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Exemplary Grade</Text>
          <Text style={[styles.metricBig, { color: DT.color.primary }]}>
            {reportsData.filter((r) => r.overallScore >= 4.5).length}
          </Text>
          <Text style={styles.metricSub}>Score &gt; 4.5 / 5.0</Text>
        </View>
      </View>

      {/* ── Main Category Filter Buttons ─────── */}
      <View style={styles.categoryRow}>
        {[
          { key: 'weekly', label: 'Weekly Reviews' },
          { key: 'yearly', label: 'Yearly Appraisal' },
          { key: 'random', label: 'Random Check' },
          { key: 'analytics', label: 'Analytics' },
        ].map((tab) => {
          const isActive = activeCategory === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.categoryBtn, isActive && styles.categoryBtnActive]}
              onPress={() => setActiveCategory(tab.key as any)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryBtnText,
                  isActive && styles.categoryBtnTextActive,
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── If "Weekly Reviews" Tab ───────────── */}
      {activeCategory === 'weekly' && (
        <View style={styles.weeklySection}>
          {/* Wing Filter & Search */}
          <View style={styles.searchFilterRow}>
            <View style={styles.searchBar}>
              <Search size={16} color={DT.color.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search faculty by name, subject, or code..."
                placeholderTextColor={DT.color.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.wingScroll}
            >
              {(['All', 'Senior Secondary', 'Middle Wing', 'Primary Wing'] as const).map(
                (wing) => {
                  const isSelected = selectedWing === wing;
                  return (
                    <TouchableOpacity
                      key={wing}
                      style={[
                        styles.wingPill,
                        isSelected && styles.wingPillActive,
                      ]}
                      onPress={() => setSelectedWing(wing)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.wingPillText,
                          isSelected && styles.wingPillTextActive,
                        ]}
                      >
                        {wing}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              )}
            </ScrollView>
          </View>

          {/* Section Prompt */}
          <View style={styles.listHeaderPrompt}>
            <Text style={styles.listHeaderTitle}>FACULTY WEEKLY EVALUATIONS</Text>
            <Text style={styles.listHeaderNotice}>
              Click any teacher card to inspect criteria & checklist
            </Text>
          </View>

          {/* Teacher Dossier Cards */}
          <View style={styles.reportsList}>
            {filteredReports.map((rep) => {
              const isPending = rep.status === 'pending_signature';
              const isAction = rep.status === 'action_needed';
              const checkedCount = rep.criteria.filter((c) => c.checked).length;

              return (
                <TouchableOpacity
                  key={rep.id}
                  style={styles.reportCard}
                  onPress={() => setSelectedReportId(rep.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.reportCardTop}>
                    <View style={styles.teacherIdentityRow}>
                      <View
                        style={[
                          styles.cardAvatar,
                          { backgroundColor: rep.avatarBg },
                        ]}
                      >
                        <Text style={styles.cardAvatarText}>{rep.avatarInitials}</Text>
                      </View>

                      <View style={{ flex: 1, minWidth: 0 }}>
                        <Text
                          style={styles.teacherName}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {rep.teacherName}
                        </Text>
                        <Text
                          style={styles.teacherSub}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {rep.subject} • {rep.wing}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.scoreContainer}>
                      <Star size={13} color={DT.color.accent} fill={DT.color.accent} />
                      <Text style={styles.scoreNumber}>{rep.overallScore}</Text>
                      <Text style={styles.scoreScale}>/ 5.0</Text>
                    </View>
                  </View>

                  {/* Criteria Preview Bar */}
                  <View style={styles.criteriaPreviewRow}>
                    <View style={styles.criteriaCheckBadge}>
                      <Check size={12} color={DT.color.success} strokeWidth={2.4} />
                      <Text style={styles.criteriaCheckText}>
                        {checkedCount}/{rep.criteria.length} Criteria Passed
                      </Text>
                    </View>
                    <Text style={styles.clickToOpenHint}>
                      Tap to open checklist →
                    </Text>
                  </View>

                  {/* Rubric metrics grid */}
                  <View style={styles.rubricGrid}>
                    {rep.quickMetrics.map((m, idx) => (
                      <View key={idx} style={styles.rubricCell}>
                        <Text style={styles.rubricLabel} numberOfLines={1}>
                          {m.label}
                        </Text>
                        <Text style={styles.rubricScore} numberOfLines={1}>
                          {m.score}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.reportCardDivider} />

                  <View style={styles.reportCardBottom}>
                    <Text style={styles.reportDate}>{rep.weekPeriod}</Text>

                    {isPending ? (
                      <View style={styles.pendingBadge}>
                        <Clock size={12} color={DT.color.warning} strokeWidth={2} />
                        <Text style={styles.pendingBadgeText}>Pending Signature</Text>
                      </View>
                    ) : isAction ? (
                      <View style={styles.actionBadge}>
                        <AlertTriangle size={12} color={DT.color.danger} strokeWidth={2} />
                        <Text style={styles.actionBadgeText}>Action Needed</Text>
                      </View>
                    ) : (
                      <View style={styles.approvedPill}>
                        <CheckCircle2 size={13} color={DT.color.success} strokeWidth={2.4} />
                        <Text style={styles.approvedPillText}>Countersigned</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* ── Yearly Appraisal Tab ─────────────── */}
      {activeCategory === 'yearly' && (
        <View style={styles.tabPlaceholderCard}>
          <Award size={36} color={DT.color.primary} strokeWidth={1.8} />
          <Text style={styles.placeholderTitle}>Annual Performance Dossier (2024-25)</Text>
          <Text style={styles.placeholderSub}>
            Cumulative CBSE teacher appraisal records, peer feedback, and board invigilation credits.
          </Text>
          <View style={styles.yearlyStatsRow}>
            <View style={styles.yearlyStatBox}>
              <Text style={styles.yearlyStatNum}>98</Text>
              <Text style={styles.yearlyStatLabel}>Permanent Faculty</Text>
            </View>
            <View style={styles.yearlyStatBox}>
              <Text style={[styles.yearlyStatNum, { color: DT.color.success }]}>96.4%</Text>
              <Text style={styles.yearlyStatLabel}>Board Pass Ratio</Text>
            </View>
            <View style={styles.yearlyStatBox}>
              <Text style={[styles.yearlyStatNum, { color: DT.color.accent }]}>4.75</Text>
              <Text style={styles.yearlyStatLabel}>Mean Rating</Text>
            </View>
          </View>
        </View>
      )}

      {/* ── Random Check Tab ─────────────────── */}
      {activeCategory === 'random' && (
        <View style={styles.tabPlaceholderCard}>
          <Clock size={36} color={DT.color.primary} strokeWidth={1.8} />
          <Text style={styles.placeholderTitle}>Random Class & Gate Audits</Text>
          <Text style={styles.placeholderSub}>
            Surprise spot evaluations of classroom punctuality, gate arrival verification, and laboratory safety logs.
          </Text>
          <View style={styles.auditLogList}>
            {[
              {
                time: 'Today 10:15 AM',
                class: 'Room 204 (Class 11-A Physics)',
                staff: 'Rajvi Zinzuvadiya',
                status: 'Passed (100% Punctual)',
              },
              {
                time: 'Yesterday 02:00 PM',
                class: 'Middle Wing Assembly Hall',
                staff: 'Janvi Vadoliya',
                status: 'Passed (Discipline Verified)',
              },
              {
                time: '14 Oct 08:35 AM',
                class: 'Room 108 (Class 10 Math)',
                staff: 'Pramod Trivedi',
                status: 'Notice: 4m Delay Observed',
              },
            ].map((audit, i) => (
              <View key={i} style={styles.auditLogRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.auditStaffName}>{audit.staff}</Text>
                  <Text style={styles.auditClass}>{audit.class} • {audit.time}</Text>
                </View>
                <View
                  style={[
                    styles.auditPill,
                    audit.status.includes('Passed')
                      ? { backgroundColor: 'rgba(22, 163, 74, 0.1)' }
                      : { backgroundColor: 'rgba(220, 38, 38, 0.1)' },
                  ]}
                >
                  <Text
                    style={[
                      styles.auditPillText,
                      audit.status.includes('Passed')
                        ? { color: DT.color.success }
                        : { color: DT.color.danger },
                    ]}
                  >
                    {audit.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* ── Analytics Tab ────────────────────── */}
      {activeCategory === 'analytics' && (
        <View style={styles.tabPlaceholderCard}>
          <Sparkles size={36} color={DT.color.primary} strokeWidth={1.8} />
          <Text style={styles.placeholderTitle}>Institutional Performance Analytics</Text>
          <Text style={styles.placeholderSub}>
            Departmental benchmarks, punctuality indices, and CBSE compliance scorecards.
          </Text>
          <View style={styles.analyticsMeterGroup}>
            {[
              { wing: 'Senior Secondary Science', score: 98, color: DT.color.success },
              { wing: 'Senior Secondary Commerce', score: 94, color: DT.color.primary },
              { wing: 'Middle Wing (Classes 6-8)', score: 91, color: DT.color.accent },
              { wing: 'Primary Wing (Classes 1-5)', score: 96, color: DT.color.success },
            ].map((m, i) => (
              <View key={i} style={styles.analyticsMeterItem}>
                <View style={styles.analyticsMeterHeader}>
                  <Text style={styles.analyticsWingName}>{m.wing}</Text>
                  <Text style={[styles.analyticsWingScore, { color: m.color }]}>
                    {m.score}%
                  </Text>
                </View>
                <View style={styles.analyticsMeterTrack}>
                  <View
                    style={[
                      styles.analyticsMeterFill,
                      { width: `${m.score}%`, backgroundColor: m.color },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DT.color.background,
  },
  content: {
    padding: DT.spacing.md,
    paddingBottom: 120, // generous bottom space to avoid bottom bar overlap
  },
  detailContent: {
    padding: DT.spacing.md,
    paddingBottom: 130,
  },

  // Toast
  toastBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0F172A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: DT.radius.md,
    marginBottom: DT.spacing.md,
    ...DT.shadow.md,
  },
  toastText: {
    ...DT.font.labelSm,
    color: '#FFFFFF',
    fontWeight: '600',
    flex: 1,
  },

  // Subheader
  subHeader: {
    marginBottom: DT.spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  sectionTitle: {
    ...DT.font.h2,
    color: DT.color.textPrimary,
    flexShrink: 1,
  },
  auditBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DT.color.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: DT.radius.full,
    flexShrink: 0,
  },
  auditBadgeText: {
    ...DT.font.labelSm,
    color: DT.color.primary,
    fontWeight: '700',
    fontSize: 10,
  },
  subText: {
    ...DT.font.bodySm,
    color: DT.color.textSecondary,
    marginTop: 3,
  },

  // Metric grid
  metricGrid: {
    flexDirection: 'row',
    gap: DT.spacing.xs,
    marginBottom: DT.spacing.md,
  },
  metricCard: {
    flex: 1,
    backgroundColor: DT.color.surface,
    padding: DT.spacing.sm,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  metricLabel: {
    ...DT.font.labelSm,
    color: DT.color.textMuted,
    fontSize: 10,
  },
  metricBig: {
    ...DT.font.h2,
    marginVertical: 2,
  },
  metricSub: {
    ...DT.font.bodySm,
    color: DT.color.textSecondary,
    fontSize: 10,
  },

  // Categories
  categoryRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: DT.spacing.md,
    flexWrap: 'wrap',
  },
  categoryBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: DT.radius.full,
    backgroundColor: DT.color.surfaceDim,
  },
  categoryBtnActive: {
    backgroundColor: DT.color.primary,
  },
  categoryBtnText: {
    ...DT.font.labelSm,
    color: DT.color.textSecondary,
  },
  categoryBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Weekly Section search & filters
  weeklySection: {
    gap: DT.spacing.md,
  },
  searchFilterRow: {
    gap: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: DT.color.surface,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    borderRadius: DT.radius.lg,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    ...DT.font.bodySm,
    color: DT.color.textPrimary,
    padding: 0,
  },
  wingScroll: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 2,
  },
  wingPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: DT.radius.full,
    backgroundColor: DT.color.surfaceDim,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  wingPillActive: {
    backgroundColor: DT.color.surface,
    borderColor: DT.color.primary,
  },
  wingPillText: {
    ...DT.font.labelSm,
    fontSize: 11,
    color: DT.color.textSecondary,
  },
  wingPillTextActive: {
    color: DT.color.primary,
    fontWeight: '700',
  },

  // List Header Prompt
  listHeaderPrompt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  listHeaderTitle: {
    ...DT.font.labelSm,
    color: DT.color.textMuted,
    letterSpacing: 0.8,
    fontSize: 11,
  },
  listHeaderNotice: {
    ...DT.font.bodySm,
    color: DT.color.primary,
    fontSize: 11,
    fontWeight: '600',
  },

  // Reports list
  reportsList: {
    gap: DT.spacing.sm,
  },
  reportCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  reportCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teacherIdentityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  cardAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  cardAvatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  teacherName: {
    ...DT.font.labelLg,
    color: DT.color.textPrimary,
    fontWeight: '700',
  },
  teacherSub: {
    ...DT.font.bodySm,
    color: DT.color.textSecondary,
    fontSize: 11,
    marginTop: 1,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DT.color.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: DT.radius.full,
    flexShrink: 0,
  },
  scoreNumber: {
    ...DT.font.labelMd,
    color: DT.color.onAccent,
    fontWeight: '800',
  },
  scoreScale: {
    ...DT.font.bodySm,
    color: DT.color.textSecondary,
    fontSize: 10,
  },

  criteriaPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: DT.color.borderLight,
    flexWrap: 'wrap',
    gap: 6,
  },
  criteriaCheckBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(22, 163, 74, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: DT.radius.full,
  },
  criteriaCheckText: {
    ...DT.font.labelSm,
    color: DT.color.success,
    fontSize: 10,
    fontWeight: '700',
  },
  clickToOpenHint: {
    ...DT.font.labelSm,
    color: DT.color.primary,
    fontSize: 11,
    fontWeight: '600',
  },

  rubricGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: DT.spacing.sm,
  },
  rubricCell: {
    flex: 1,
    backgroundColor: DT.color.surfaceDim,
    padding: 6,
    borderRadius: DT.radius.sm,
    alignItems: 'center',
    minWidth: 0,
  },
  rubricLabel: {
    ...DT.font.labelSm,
    color: DT.color.textMuted,
    fontSize: 9,
  },
  rubricScore: {
    ...DT.font.labelMd,
    color: DT.color.textPrimary,
    fontWeight: '700',
    marginTop: 2,
  },

  reportCardDivider: {
    height: 1,
    backgroundColor: DT.color.borderLight,
    marginVertical: DT.spacing.sm,
  },
  reportCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  reportDate: {
    ...DT.font.labelSm,
    color: DT.color.textMuted,
    fontSize: 11,
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DT.color.warningBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: DT.radius.sm,
  },
  pendingBadgeText: {
    ...DT.font.labelSm,
    color: DT.color.warning,
    fontWeight: '700',
    fontSize: 10,
  },
  actionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DT.color.dangerBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: DT.radius.sm,
  },
  actionBadgeText: {
    ...DT.font.labelSm,
    color: DT.color.danger,
    fontWeight: '700',
    fontSize: 10,
  },
  approvedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  approvedPillText: {
    ...DT.font.labelSm,
    color: DT.color.success,
    fontWeight: '700',
    fontSize: 11,
  },

  // ═══════════════════════════════════════════════════════════════
  // DETAIL VIEW STYLES
  // ═══════════════════════════════════════════════════════════════
  backRow: {
    marginBottom: DT.spacing.sm,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: DT.color.surface,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: DT.radius.full,
  },
  backButtonText: {
    ...DT.font.labelSm,
    color: DT.color.primary,
    fontWeight: '700',
    fontSize: 12,
  },

  staffCarouselCard: {
    backgroundColor: DT.color.surface,
    padding: DT.spacing.sm,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    marginBottom: DT.spacing.md,
  },
  staffCarouselLabel: {
    ...DT.font.labelSm,
    fontSize: 9,
    color: DT.color.textMuted,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  staffCarouselScroll: {
    flexDirection: 'row',
    gap: 6,
  },
  staffPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: DT.color.surfaceDim,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: DT.radius.md,
    borderWidth: 1,
    borderColor: 'transparent',
    maxWidth: 180,
  },
  staffPillActive: {
    backgroundColor: DT.color.primaryLight,
    borderColor: DT.color.primary,
  },
  staffPillAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  staffPillAvatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 9,
  },
  staffPillName: {
    ...DT.font.labelSm,
    fontSize: 11,
    color: DT.color.textPrimary,
    fontWeight: '600',
  },
  staffPillNameActive: {
    color: DT.color.primary,
    fontWeight: '700',
  },
  staffPillSub: {
    ...DT.font.bodySm,
    fontSize: 9,
    color: DT.color.textMuted,
  },

  // Hero Card
  heroCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    marginBottom: DT.spacing.md,
    ...DT.shadow.sm,
  },
  heroTopRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  heroAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  heroAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  heroInfoCol: {
    flex: 1,
    minWidth: 0,
  },
  heroNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
  },
  heroName: {
    ...DT.font.h3,
    color: DT.color.textPrimary,
    flexShrink: 1,
  },
  heroStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: DT.radius.full,
    flexShrink: 0,
  },
  heroStatusApproved: {
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
  },
  heroStatusPending: {
    backgroundColor: 'rgba(217, 119, 6, 0.1)',
  },
  heroStatusText: {
    ...DT.font.labelSm,
    fontSize: 10,
    fontWeight: '700',
  },
  heroSubText: {
    ...DT.font.bodySm,
    color: DT.color.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  sessionText: {
    ...DT.font.labelSm,
    fontSize: 11,
    color: DT.color.textMuted,
  },

  heroScoreCard: {
    marginTop: DT.spacing.md,
    paddingTop: DT.spacing.md,
    borderTopWidth: 1,
    borderTopColor: DT.color.borderLight,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  scoreMetaLabel: {
    ...DT.font.labelSm,
    fontSize: 10,
    color: DT.color.textMuted,
    letterSpacing: 0.8,
  },
  scoreNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '800',
    color: DT.color.textPrimary,
  },
  scoreTotal: {
    fontSize: 13,
    color: DT.color.textMuted,
    fontWeight: '600',
  },
  gradeBadge: {
    backgroundColor: DT.color.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: DT.radius.xs,
    marginLeft: 6,
  },
  gradeBadgeText: {
    ...DT.font.labelSm,
    color: DT.color.onAccent,
    fontSize: 10,
    fontWeight: '800',
  },
  compliancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: DT.color.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: DT.radius.full,
  },
  complianceText: {
    ...DT.font.labelSm,
    color: DT.color.primary,
    fontSize: 11,
    fontWeight: '700',
  },

  progressBarTrack: {
    height: 6,
    backgroundColor: DT.color.surfaceDim,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Criteria Section header
  criteriaHeaderRow: {
    marginBottom: 8,
  },
  criteriaSectionTitle: {
    ...DT.font.h4,
    color: DT.color.textPrimary,
  },
  criteriaSectionSub: {
    ...DT.font.bodySm,
    color: DT.color.textSecondary,
    fontSize: 11,
    marginTop: 1,
  },
  filterPillScroll: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: DT.spacing.md,
    paddingVertical: 2,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: DT.radius.full,
    backgroundColor: DT.color.surface,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
  },
  filterPillActive: {
    backgroundColor: DT.color.primary,
    borderColor: DT.color.primary,
  },
  filterPillText: {
    ...DT.font.labelSm,
    fontSize: 11,
    color: DT.color.textSecondary,
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Criteria cards
  criteriaList: {
    gap: DT.spacing.sm,
    marginBottom: DT.spacing.lg,
  },
  criterionCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.lg,
    padding: DT.spacing.md,
    borderWidth: 1,
    ...DT.shadow.sm,
  },
  criterionCardChecked: {
    borderColor: DT.color.borderLight,
  },
  criterionCardUnchecked: {
    borderColor: 'rgba(220, 38, 38, 0.4)',
    backgroundColor: 'rgba(254, 242, 242, 0.4)',
  },
  criterionTopRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    paddingTop: 2,
    flexShrink: 0,
  },
  criterionInfo: {
    flex: 1,
    minWidth: 0,
  },
  criterionBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  catBadge: {
    backgroundColor: DT.color.surfaceDim,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: DT.radius.xs,
  },
  catBadgeText: {
    ...DT.font.labelSm,
    fontSize: 8,
    fontWeight: '800',
    color: DT.color.textMuted,
    letterSpacing: 0.5,
  },
  ratingBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: DT.radius.xs,
  },
  ratingExemplary: {
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
  },
  ratingSatisfactory: {
    backgroundColor: DT.color.primaryLight,
  },
  ratingAction: {
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
  },
  ratingBadgeText: {
    ...DT.font.labelSm,
    fontSize: 9,
    fontWeight: '700',
  },
  criterionTitle: {
    ...DT.font.labelMd,
    color: DT.color.textPrimary,
    fontWeight: '700',
    lineHeight: 18,
  },
  criterionDescription: {
    ...DT.font.bodySm,
    color: DT.color.textSecondary,
    fontSize: 11,
    marginTop: 2,
    lineHeight: 16,
  },
  criterionScorePill: {
    backgroundColor: DT.color.surfaceDim,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: DT.radius.md,
    alignSelf: 'flex-start',
    flexShrink: 0,
  },
  criterionScoreText: {
    ...DT.font.labelSm,
    color: DT.color.textPrimary,
    fontWeight: '700',
    fontSize: 11,
  },

  observationBox: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    backgroundColor: DT.color.surfaceDim,
    padding: 10,
    borderRadius: DT.radius.md,
    marginTop: 10,
  },
  observationText: {
    ...DT.font.bodySm,
    color: DT.color.textSecondary,
    fontSize: 11,
    flex: 1,
    lineHeight: 16,
  },

  // Evaluation Summary Card
  evaluationSummaryCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    ...DT.shadow.sm,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  summaryTitle: {
    ...DT.font.h4,
    color: DT.color.textPrimary,
  },
  summaryNotesText: {
    ...DT.font.bodySm,
    color: DT.color.textSecondary,
    fontStyle: 'italic',
    lineHeight: 18,
    backgroundColor: DT.color.surfaceDim,
    padding: 10,
    borderRadius: DT.radius.md,
    marginBottom: DT.spacing.md,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  evaluatorName: {
    ...DT.font.labelMd,
    color: DT.color.textPrimary,
    fontWeight: '700',
  },
  evaluatorRole: {
    ...DT.font.bodySm,
    color: DT.color.textMuted,
    fontSize: 11,
  },
  evaluatorDate: {
    ...DT.font.bodySm,
    color: DT.color.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  sealBadge: {
    alignItems: 'center',
    padding: 8,
    borderRadius: DT.radius.md,
    backgroundColor: DT.color.primaryLight,
  },
  sealText: {
    ...DT.font.labelSm,
    color: DT.color.primary,
    fontSize: 8,
    fontWeight: '800',
    marginTop: 2,
  },

  summaryDivider: {
    height: 1,
    backgroundColor: DT.color.borderLight,
    marginVertical: DT.spacing.md,
  },

  actionButtonGroup: {
    gap: 8,
  },
  countersignPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: DT.color.primary,
    paddingVertical: 12,
    borderRadius: DT.radius.lg,
  },
  countersignBtnText: {
    ...DT.font.labelMd,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  alreadyCountersignedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    paddingVertical: 10,
    borderRadius: DT.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(22, 163, 74, 0.25)',
  },
  alreadyCountersignedText: {
    ...DT.font.labelSm,
    color: DT.color.success,
    fontWeight: '700',
  },
  secondaryActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: DT.color.surfaceDim,
    paddingVertical: 10,
    borderRadius: DT.radius.md,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
  },
  secondaryBtnText: {
    ...DT.font.labelSm,
    color: DT.color.textPrimary,
    fontWeight: '600',
    fontSize: 11,
  },

  // ═══════════════════════════════════════════════════════════════
  // PLACEHOLDER TAB STYLES (Yearly, Random, Analytics)
  // ═══════════════════════════════════════════════════════════════
  tabPlaceholderCard: {
    backgroundColor: DT.color.surface,
    borderRadius: DT.radius.xl,
    padding: DT.spacing.lg,
    borderWidth: 1,
    borderColor: DT.color.borderLight,
    alignItems: 'center',
    ...DT.shadow.sm,
  },
  placeholderTitle: {
    ...DT.font.h3,
    color: DT.color.textPrimary,
    marginTop: 12,
    textAlign: 'center',
  },
  placeholderSub: {
    ...DT.font.bodySm,
    color: DT.color.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: DT.spacing.md,
    maxWidth: 340,
  },

  yearlyStatsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 8,
  },
  yearlyStatBox: {
    flex: 1,
    backgroundColor: DT.color.surfaceDim,
    padding: 12,
    borderRadius: DT.radius.lg,
    alignItems: 'center',
  },
  yearlyStatNum: {
    fontSize: 20,
    fontWeight: '800',
    color: DT.color.primary,
  },
  yearlyStatLabel: {
    ...DT.font.bodySm,
    fontSize: 10,
    color: DT.color.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },

  auditLogList: {
    width: '100%',
    gap: 8,
    marginTop: 8,
  },
  auditLogRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: DT.color.surfaceDim,
    padding: 10,
    borderRadius: DT.radius.md,
    flexWrap: 'wrap',
    gap: 6,
  },
  auditStaffName: {
    ...DT.font.labelMd,
    color: DT.color.textPrimary,
    fontWeight: '700',
  },
  auditClass: {
    ...DT.font.bodySm,
    color: DT.color.textMuted,
    fontSize: 10,
  },
  auditPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: DT.radius.xs,
  },
  auditPillText: {
    ...DT.font.labelSm,
    fontSize: 10,
    fontWeight: '700',
  },

  analyticsMeterGroup: {
    width: '100%',
    gap: 12,
    marginTop: 8,
  },
  analyticsMeterItem: {
    gap: 4,
  },
  analyticsMeterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analyticsWingName: {
    ...DT.font.bodySm,
    color: DT.color.textPrimary,
    fontWeight: '600',
    fontSize: 11,
  },
  analyticsWingScore: {
    ...DT.font.labelSm,
    fontWeight: '700',
    fontSize: 11,
  },
  analyticsMeterTrack: {
    height: 6,
    backgroundColor: DT.color.surfaceDim,
    borderRadius: 3,
    overflow: 'hidden',
  },
  analyticsMeterFill: {
    height: '100%',
    borderRadius: 3,
  },
});
