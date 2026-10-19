-- =============================================================
-- Migration 004: Update Admin & Staff profile names
-- Run this in Supabase SQL Editor to update existing rows
-- =============================================================

UPDATE public.profiles
SET full_name = 'Divyansh Kugasiya'
WHERE role = 'admin' 
   OR email = 'admin@satyaprakash.edu.in'
   OR full_name ILIKE '%Rameshwar%'
   OR full_name = 'Admin'
   OR full_name = 'Principal';

UPDATE public.profiles
SET full_name = 'Rajvi Zinzuvadiya'
WHERE role = 'staff' 
   OR email = 'sunita.s@satyaprakash.edu.in'
   OR full_name ILIKE '%Sunita%';
