import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

const AuthContext = createContext(null);
const USER_STORAGE_KEY = 'urbanpets_user';

const publicUserFields = (usuario) => ({
  id: usuario.id,
  nombre: usuario.nombre,
  correo: usuario.correo,
  telefono: usuario.telefono || '',
  rol: usuario.rol || 'cliente',
  activo: usuario.activo !== false
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = window.localStorage.getItem(USER_STORAGE_KEY);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error leyendo usuario local:', error);
        window.localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const persistUser = (usuario) => {
    const normalized = publicUserFields(usuario);
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(normalized));
    setUser(normalized);
    return normalized;
  };

  const login = async ({ correo, password }) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, nombre, correo, telefono, rol, activo')
      .eq('correo', correo)
      .eq('contrasena', password)
      .maybeSingle();

    if (error) return { data: null, error };
    if (!data) return { data: null, error: new Error('Credenciales invalidas') };
    if (data.activo === false) return { data: null, error: new Error('Usuario desactivado') };

    const loggedUser = persistUser(data);
    return { data: { user: loggedUser }, error: null };
  };

  const register = async ({ nombre, correo, telefono, password }) => {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([
        {
          nombre,
          correo,
          telefono,
          contrasena: password,
          rol: 'cliente',
          activo: true
        }
      ])
      .select('id, nombre, correo, telefono, rol, activo')
      .single();

    if (error) return { data: null, error };
    const registeredUser = persistUser(data);
    return { data: { user: registeredUser }, error: null };
  };

  const logout = () => {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
    return { error: null };
  };

  const value = useMemo(
    () => ({
      loading,
      user,
      profile: user,
      role: user?.rol || null,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout
    }),
    [loading, user]
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
