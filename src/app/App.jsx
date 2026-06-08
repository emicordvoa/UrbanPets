import React from 'react';
import { CssBaseline } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout.jsx';
import AppRouter from './router.jsx';

const App = () => (
  <>
    <CssBaseline />
    <HashRouter>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </HashRouter>
  </>
);

export default App;
