import React from 'react';
import { CssBaseline } from '@mui/material';
import AppLayout from '../components/layout/AppLayout.jsx';
import AppRouter from './router.jsx';

const App = () => (
  <>
    <CssBaseline />
    <AppLayout>
      <AppRouter />
    </AppLayout>
  </>
);

export default App;
