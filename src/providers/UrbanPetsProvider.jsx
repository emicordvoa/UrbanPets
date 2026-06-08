import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { supabase } from '../lib/supabaseClient.js';
import { fallbackCategories, fallbackServices } from '../data/fallbackData.js';
import { normalizeCartItem } from '../utils/cart.js';
import createThemeConfig from '../theme/theme.js';

const LocalStorageKeys = {
  cart: 'urbanpets_cart',
  theme: 'urbanpets_theme'
};

const initialState = {
  categorias: [],
  servicios: [],
  cart: [],
  lastOrder: null,
  loading: true,
  error: null,
  themeMode: 'light',
  supabaseAvailable: false
};

const actionTypes = {
  setCategorias: 'setCategorias',
  setServicios: 'setServicios',
  setLoading: 'setLoading',
  setError: 'setError',
  addToCart: 'addToCart',
  updateCartItemQuantity: 'updateCartItemQuantity',
  removeFromCart: 'removeFromCart',
  clearCart: 'clearCart',
  updateThemeMode: 'updateThemeMode',
  restoreCart: 'restoreCart',
  setLastOrder: 'setLastOrder',
  setSupabaseAvailable: 'setSupabaseAvailable'
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.setCategorias:
      return { ...state, categorias: action.payload };
    case actionTypes.setServicios:
      return { ...state, servicios: action.payload };
    case actionTypes.setLoading:
      return { ...state, loading: action.payload };
    case actionTypes.setError:
      return { ...state, error: action.payload };
    case actionTypes.addToCart: {
      const item = normalizeCartItem(action.payload);
      const exists = state.cart.find((entry) => entry.id === item.id);
      const cart = exists
        ? state.cart.map((entry) =>
            entry.id === item.id
              ? { ...entry, quantity: entry.quantity + 1 }
              : entry
          )
        : [...state.cart, { ...item, quantity: 1 }];
      return { ...state, cart };
    }
    case actionTypes.updateCartItemQuantity: {
      const { id, quantity } = action.payload;
      const cart = state.cart
        .map((entry) => (entry.id === id ? { ...entry, quantity } : entry))
        .filter((entry) => entry.quantity > 0);
      return { ...state, cart };
    }
    case actionTypes.removeFromCart:
      return {
        ...state,
        cart: state.cart.filter((entry) => entry.id !== action.payload)
      };
    case actionTypes.clearCart:
      return { ...state, cart: [] };
    case actionTypes.updateThemeMode:
      return { ...state, themeMode: action.payload };
    case actionTypes.restoreCart:
      return { ...state, cart: action.payload };
    case actionTypes.setLastOrder:
      return { ...state, lastOrder: action.payload };
    case actionTypes.setSupabaseAvailable:
      return { ...state, supabaseAvailable: action.payload };
    default:
      return state;
  }
};

const UrbanPetsContext = createContext(null);

export const UrbanPetsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedCart = window.localStorage.getItem(LocalStorageKeys.cart);
    const savedTheme = window.localStorage.getItem(LocalStorageKeys.theme);
    if (savedCart) {
      try {
        dispatch({ type: actionTypes.restoreCart, payload: JSON.parse(savedCart) });
      } catch (error) {
        console.error('Error parseando carrito guardado:', error);
      }
    }
    if (savedTheme) {
      dispatch({ type: actionTypes.updateThemeMode, payload: savedTheme });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LocalStorageKeys.cart, JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    window.localStorage.setItem(LocalStorageKeys.theme, state.themeMode);
  }, [state.themeMode]);

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: actionTypes.setLoading, payload: true });
      try {
        const [{ data: categorias, error: catError }, { data: servicios, error: servError }] =
          await Promise.all([
            supabase.from('categorias').select('*').order('nombre'),
            supabase.from('servicios').select('*').order('titulo')
          ]);

        if (catError || servError) {
          throw catError || servError;
        }

        dispatch({ type: actionTypes.setSupabaseAvailable, payload: true });
        dispatch({ type: actionTypes.setCategorias, payload: categorias ?? fallbackCategories });
        dispatch({ type: actionTypes.setServicios, payload: servicios ?? fallbackServices });
      } catch (error) {
        console.error('Error cargando datos de Supabase:', error);
        dispatch({ type: actionTypes.setError, payload: 'No se pudieron cargar los servicios. Usando datos de respaldo.' });
        dispatch({ type: actionTypes.setSupabaseAvailable, payload: false });
        dispatch({ type: actionTypes.setCategorias, payload: fallbackCategories });
        dispatch({ type: actionTypes.setServicios, payload: fallbackServices });
      } finally {
        dispatch({ type: actionTypes.setLoading, payload: false });
      }
    };

    loadData();
  }, []);

  const value = useMemo(
    () => ({ state, dispatch, actionTypes }),
    [state, dispatch]
  );

  const theme = createThemeConfig(state.themeMode);

  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <UrbanPetsContext.Provider value={value}>{children}</UrbanPetsContext.Provider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export const useUrbanPets = () => {
  const context = useContext(UrbanPetsContext);
  if (!context) {
    throw new Error('useUrbanPets debe usarse dentro de UrbanPetsProvider');
  }
  return context;
};
