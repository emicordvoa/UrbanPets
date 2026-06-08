import { createTheme } from '@mui/material/styles';

const basePalette = {
  primary: {
    main: '#4DB6AC'
  },
  secondary: {
    main: '#FF7A70'
  },
  error: {
    main: '#E94F37'
  },
  warning: {
    main: '#FFAB76'
  },
  success: {
    main: '#B0C49C'
  }
};

const createThemeConfig = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      ...basePalette,
      background: {
        default: mode === 'dark' ? '#1F2933' : '#F6F1E8',
        paper: mode === 'dark' ? '#243447' : '#FFFFFF'
      },
      text: {
        primary: mode === 'dark' ? '#F8FAFC' : '#1F2933'
      }
    },
    typography: {
      fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
      h1: {
        fontWeight: 700
      },
      h2: {
        fontWeight: 700
      },
      h3: {
        fontWeight: 700
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 24
          }
        }
      }
    }
  });

export default createThemeConfig;
