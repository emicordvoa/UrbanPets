import { createTheme } from '@mui/material/styles';

const basePalette = {
  primary: {
    main: '#41386B',
    light: '#7A70BA',
    dark: '#231942'
  },
  secondary: {
    main: '#7A70BA',
    light: '#B1B4C8'
  },
  error: {
    main: '#C2415D'
  },
  warning: {
    main: '#C59B5B'
  },
  success: {
    main: '#B0C49C'
  },
  info: {
    main: '#6D72A8'
  }
};

const createThemeConfig = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      ...basePalette,
      background: {
        default: mode === 'dark' ? '#171327' : '#F7F5EE',
        paper: mode === 'dark' ? '#231942' : '#FFFFFF'
      },
      text: {
        primary: mode === 'dark' ? '#F7F7FB' : '#1F1F2E',
        secondary: mode === 'dark' ? '#D7D9E8' : '#676477'
      },
      divider: mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(65,56,107,0.12)'
    },
    shape: {
      borderRadius: 18
    },
    shadows: [
      'none',
      '0 12px 32px rgba(65, 56, 107, 0.08)',
      '0 18px 44px rgba(65, 56, 107, 0.10)',
      '0 22px 60px rgba(65, 56, 107, 0.14)',
      ...Array(21).fill('0 24px 70px rgba(65, 56, 107, 0.16)')
    ],
    custom: {
      colors: {
        delftBlue: '#41386B',
        amethyst: '#7A70BA',
        frenchGray: '#B1B4C8',
        beige: '#EBEED5',
        olivine: '#B0C49C',
        night: '#231942'
      }
    },
    typography: {
      fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
      h1: {
        fontWeight: 800
      },
      h2: {
        fontWeight: 800
      },
      h3: {
        fontWeight: 800
      },
      h4: { fontWeight: 800 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 }
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
            fontWeight: 700
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 22,
            border: mode === 'dark' ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(65,56,107,0.10)'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 700
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined'
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 16
          }
        }
      }
    }
  });

export default createThemeConfig;
