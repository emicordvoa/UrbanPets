import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

const AuthContext = createContext(null);

const normalizeRole = (rol) => rol || 'cliente';

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (authUser) => {
    if (!authUser) {
      setProfile(null);
      return null;
    }

    const { data, error } = await supabase
      .from('perfiles')
      .select('*')
      .eq('auth_user_id', authUser.id)
      .maybeSingle();

    if (error) {
      console.error('Error cargando perfil:', error);
      setProfile(null);
      return null;
    }

    const normalized = data ? { ...data, rol: normalizeRole(data.rol) } : null;
    setProfile(normalized);
    return normalized;
  };

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user || null);
      await loadProfile(data.session?.user);
      if (mounted) setLoading(false);
    };

    bootstrap();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user || null);
      await loadProfile(nextSession?.user);
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async ({ correo, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password
    });
    if (error) return { data: null, error };
    const loadedProfile = await loadProfile(data.user);
    return { data: { ...data, profile: loadedProfile }, error: null };
  };

  const signUp = async ({ nombre, correo, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password,
      options: { data: { nombre, rol: 'cliente' } }
    });
    if (error) return { data: null, error };

    if (data.user) {
      const { error: profileError } = await supabase.from('perfiles').insert([
        {
          auth_user_id: data.user.id,
          nombre,
          correo,
          rol: 'cliente',
          activo: true
        }
      ]);
      if (profileError) return { data: null, error: profileError };
      await loadProfile(data.user);
    }

    return { data, error: null };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setSession(null);
      setUser(null);
      setProfile(null);
    }
    return { error };
  };

  const value = useMemo(
    () => ({
      loading,
      session,
      user,
      profile,
      role: profile?.rol || null,
      isAuthenticated: Boolean(session),
      signIn,
      signUp,
      signOut,
      refreshProfile: () => loadProfile(user)
    }),
    [loading, session, user, profile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
