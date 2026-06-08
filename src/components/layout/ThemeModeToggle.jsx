import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useUrbanPets } from '../../providers/UrbanPetsProvider.jsx';

const ThemeModeToggle = () => {
  const { state, dispatch, actionTypes } = useUrbanPets();
  const toggleMode = () => {
    const nextMode = state.themeMode === 'dark' ? 'light' : 'dark';
    dispatch({ type: actionTypes.updateThemeMode, payload: nextMode });
  };

  return (
    <Tooltip title="Cambiar modo claro/oscuro">
      <IconButton onClick={toggleMode} color="inherit">
        {state.themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeModeToggle;
