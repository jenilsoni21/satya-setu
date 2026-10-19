-- =============================================================
-- Satya Setu — User Management & Core Tables
-- Run this in Supabase SQL Editor (or via supabase migration)
-- =============================================================

-- ─── 1. profiles ─────────────────────────────────────────────
-- Extends auth.users with role + school metadata.
-- Populated by an Admin — there is NO public registration.
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT        NOT NULL,
  email         TEXT        NOT NULL UNIQUE,
  role          TEXT        NOT NULL CHECK (role IN ('admin', 'registrar', 'staff')),
  employee_code TEXT        NOT NULL UNIQUE,      -- e.g. SSP-2024-042
  department    TEXT,                              -- e.g. "Senior Secondary Science"
  designation   TEXT,                              -- e.g. "PGT Physics", "HOD", "Lab Technician"
  phone         TEXT,
  avatar_url    TEXT,
  is_active     BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_profiles_role        ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_employee    ON public.profiles(employee_code);
CREATE INDEX IF NOT EXISTS idx_profiles_department  ON public.profiles(department);

-- ─── 2. attendance ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.attendance (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id        UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date            DATE        NOT NULL DEFAULT CURRENT_DATE,
  check_in_time   TIMESTAMPTZ,
  check_out_time  TIMESTAMPTZ,
  status          TEXT        NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('present','absent','half_day','leave','on_duty','holiday')),
  terminal_id     TEXT,                  -- which gate kiosk
  verification    TEXT        DEFAULT 'manual'
                    CHECK (verification IN ('biometric','manual','rfid')),
  confidence      NUMERIC(5,2),          -- face-match confidence %
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(staff_id, date)
);

CREATE INDEX IF NOT EXISTS idx_attendance_date    ON public.attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_staff   ON public.attendance(staff_id);

-- ─── 3. performance_reports ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.performance_reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id        UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  evaluator_id    UUID        NOT NULL REFERENCES public.profiles(id),
  report_type     TEXT        NOT NULL CHECK (report_type IN ('weekly','yearly','random_check')),
  criteria_scores JSONB       NOT NULL DEFAULT '{}',   -- { "punctuality": 8, "pedagogy": 9, … }
  overall_score   NUMERIC(5,2),
  comments        TEXT,
  academic_year   TEXT,          -- e.g. "2024-25"
  status          TEXT        NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft','submitted','approved','archived')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── 4. daily_planners ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.daily_planners (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id        UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date            DATE        NOT NULL DEFAULT CURRENT_DATE,
  content         JSONB       NOT NULL DEFAULT '[]',   -- array of class plan objects
  checklist       JSONB       NOT NULL DEFAULT '[]',   -- [{task, done}]
  submitted_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(staff_id, date)
);

-- ─── 5. leave_requests ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leave_requests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id        UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  leave_type      TEXT        NOT NULL CHECK (leave_type IN ('casual','medical','duty','other')),
  start_date      DATE        NOT NULL,
  end_date        DATE        NOT NULL,
  reason          TEXT,
  status          TEXT        NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','approved','rejected')),
  approved_by     UUID        REFERENCES public.profiles(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════
-- ROW-LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_planners     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests     ENABLE ROW LEVEL SECURITY;

-- ── profiles ─────────────────────────────────────────────────
-- Everyone can read their own profile
CREATE POLICY "Users read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admins read all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can insert / update any profile (no public sign-up)
CREATE POLICY "Admins manage profiles"
  ON public.profiles FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ── attendance ───────────────────────────────────────────────
-- Staff see their own attendance
CREATE POLICY "Staff read own attendance"
  ON public.attendance FOR SELECT
  USING (auth.uid() = staff_id);

-- Admin & Registrar see all attendance
CREATE POLICY "Admin/Registrar read all attendance"
  ON public.attendance FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'registrar')
    )
  );

-- Registrar & Admin can insert attendance (kiosk punch)
CREATE POLICY "Registrar/Admin insert attendance"
  ON public.attendance FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'registrar')
    )
  );

-- Admin can update attendance
CREATE POLICY "Admin update attendance"
  ON public.attendance FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ── performance_reports ──────────────────────────────────────
CREATE POLICY "Staff read own reports"
  ON public.performance_reports FOR SELECT
  USING (auth.uid() = staff_id);

CREATE POLICY "Admin manage reports"
  ON public.performance_reports FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ── daily_planners ───────────────────────────────────────────
CREATE POLICY "Staff manage own planners"
  ON public.daily_planners FOR ALL
  USING (auth.uid() = staff_id);

CREATE POLICY "Admin read all planners"
  ON public.daily_planners FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ── leave_requests ───────────────────────────────────────────
CREATE POLICY "Staff manage own leave"
  ON public.leave_requests FOR ALL
  USING (auth.uid() = staff_id);

CREATE POLICY "Admin manage all leave"
  ON public.leave_requests FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ═══════════════════════════════════════════════════════════════
-- HELPER: auto-update updated_at
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_reports_updated_at
  BEFORE UPDATE ON public.performance_reports
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_planners_updated_at
  BEFORE UPDATE ON public.daily_planners
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
