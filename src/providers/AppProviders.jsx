import React from 'react';
import { UrbanPetsProvider } from './UrbanPetsProvider.jsx';
import { AuthProvider } from './AuthProvider.jsx';

const AppProviders = ({ children }) => (
  <UrbanPetsProvider>
    <AuthProvider>{children}</AuthProvider>
  </UrbanPetsProvider>
);

export default AppProviders;
