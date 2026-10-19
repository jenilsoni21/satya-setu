-- =============================================================
-- SEED DATA — Create 3 test users (Admin, Registrar, Staff)
--
-- Run AFTER the schema migration (001_initial_schema.sql).
-- Run this in Supabase SQL Editor.
--
-- IMPORTANT: After running this SQL, go to Supabase Dashboard →
-- Authentication → Users and create these 3 users manually
-- (or use the Supabase Auth API) with the emails below.
-- Then this seed data will link to their auth.users IDs.
-- =============================================================

-- Step 1: Create auth users via Supabase Dashboard or API:
--   1. admin@satyaprakash.edu.in   / password: Admin@Satya2024
--   2. gate01@satyaprakash.edu.in   / password: Gate@Satya2024
--   3. sunita.s@satyaprakash.edu.in / password: Staff@Satya2024
--
-- Step 2: After creating auth users, get their UUIDs and replace below:

-- REPLACE THESE with actual auth.users UUIDs after creating them in Supabase Auth:
-- For now these are placeholder UUIDs — the INSERT will fail until you replace them.

DO $$
DECLARE
  admin_uid      UUID;
  registrar_uid  UUID;
  staff_uid      UUID;
BEGIN
  -- Look up the auth user by email
  SELECT id INTO admin_uid     FROM auth.users WHERE email = 'admin@satyaprakash.edu.in';
  SELECT id INTO registrar_uid FROM auth.users WHERE email = 'gate01@satyaprakash.edu.in';
  SELECT id INTO staff_uid     FROM auth.users WHERE email = 'sunita.s@satyaprakash.edu.in';

  -- Insert profiles only if users exist
  IF admin_uid IS NOT NULL THEN
    INSERT INTO public.profiles (id, full_name, email, role, employee_code, department, designation, phone, is_active)
    VALUES (
      admin_uid,
      'Divyansh Kugasiya',
      'admin@satyaprakash.edu.in',
      'admin',
      'SSP-2010-001',
      'Administration',
      'Principal',
      '9876500001',
      TRUE
    ) ON CONFLICT (id) DO NOTHING;
  END IF;

  IF registrar_uid IS NOT NULL THEN
    INSERT INTO public.profiles (id, full_name, email, role, employee_code, department, designation, phone, is_active)
    VALUES (
      registrar_uid,
      'Mr. Anand Joshi',
      'gate01@satyaprakash.edu.in',
      'registrar',
      'SSP-2015-010',
      'Campus Operations',
      'Gate Registrar',
      '9876500010',
      TRUE
    ) ON CONFLICT (id) DO NOTHING;
  END IF;

  IF staff_uid IS NOT NULL THEN
    INSERT INTO public.profiles (id, full_name, email, role, employee_code, department, designation, phone, is_active)
    VALUES (
      staff_uid,
      'Rajvi Zinzuvadiya',
      'sunita.s@satyaprakash.edu.in',
      'staff',
      'SSP-2018-042',
      'Senior Secondary Science',
      'PGT Physics',
      '9876500042',
      TRUE
    ) ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;
