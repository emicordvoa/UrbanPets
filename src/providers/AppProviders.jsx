import React from 'react';
import { UrbanPetsProvider } from './UrbanPetsProvider.jsx';

const AppProviders = ({ children }) => <UrbanPetsProvider>{children}</UrbanPetsProvider>;

export default AppProviders;
