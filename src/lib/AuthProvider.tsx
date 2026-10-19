import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'registrar' | 'staff';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  employee_code: string;
  department: string | null;
  designation: string | null;
  avatar_url: string | null;
  phone?: string | null;
  is_active: boolean;
}

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, sess) => {
        setSession(sess);
        setUser(sess?.user ?? null);
      }
    );

    // Check initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch profile & role whenever user changes
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setRole(null);
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        let profileData = { ...data } as UserProfile;
        let needsDbSync = false;

        // Ensure Admin name is Divyansh Kugasiya
        if (
          profileData.role === 'admin' &&
          (!profileData.full_name ||
            profileData.full_name.includes('Rameshwar') ||
            profileData.full_name === 'Admin' ||
            profileData.full_name === 'Principal')
        ) {
          profileData.full_name = 'Divyansh Kugasiya';
          needsDbSync = true;
        }

        // Ensure Staff name is Rajvi Zinzuvadiya
        if (
          profileData.role === 'staff' &&
          (!profileData.full_name ||
            profileData.full_name.includes('Sunita') ||
            profileData.full_name === 'Teacher' ||
            profileData.full_name === 'Faculty')
        ) {
          profileData.full_name = 'Rajvi Zinzuvadiya';
          needsDbSync = true;
        }

        if (needsDbSync) {
          supabase
            .from('profiles')
            .update({ full_name: profileData.full_name })
            .eq('id', user.id)
            .then(() => {});
        }

        setProfile(profileData);
        setRole(profileData.role as UserRole);
      } else {
        setProfile(null);
        setRole(null);
      }
    };

    fetchProfile();
  }, [user]);

  const signIn = async (identifier: string, password: string) => {
    setLoading(true);
    let emailToUse = identifier.trim();

    // If staff/admin typed their Employee ID (e.g. SSPS-4089), resolve to registered email
    if (!emailToUse.includes('@')) {
      const { data: resolvedEmail } = await supabase.rpc('get_email_by_employee_code', {
        p_code: emailToUse,
      });
      if (resolvedEmail) {
        emailToUse = resolvedEmail;
      }
    }

    const { error } = await supabase.auth.signInWithPassword({ email: emailToUse, password });
    setLoading(false);
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, role, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
