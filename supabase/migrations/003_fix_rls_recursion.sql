-- =============================================================
-- FIX: Avoid RLS Infinite Recursion on public.profiles
-- Using SECURITY DEFINER helper functions
-- =============================================================

-- 1. Helper functions to check role without triggering RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_registrar_or_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'registrar')
  );
$$;

-- 2. Drop existing recursive policies
DROP POLICY IF EXISTS "Admins read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins manage profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admin/Registrar read all attendance" ON public.attendance;
DROP POLICY IF EXISTS "Registrar/Admin insert attendance" ON public.attendance;
DROP POLICY IF EXISTS "Admin update attendance" ON public.attendance;
DROP POLICY IF EXISTS "Admin manage reports" ON public.performance_reports;
DROP POLICY IF EXISTS "Admin review leave" ON public.leave_requests;

-- 3. Recreate with SECURITY DEFINER functions
CREATE POLICY "Admins read all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins manage profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin());

CREATE POLICY "Admin/Registrar read all attendance"
  ON public.attendance FOR SELECT
  USING (public.is_registrar_or_admin());

CREATE POLICY "Registrar/Admin insert attendance"
  ON public.attendance FOR INSERT
  WITH CHECK (public.is_registrar_or_admin());

CREATE POLICY "Admin update attendance"
  ON public.attendance FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admin manage reports"
  ON public.performance_reports FOR ALL
  USING (public.is_admin());

CREATE POLICY "Admin review leave"
  ON public.leave_requests FOR ALL
  USING (public.is_admin());
