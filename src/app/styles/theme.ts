import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
          main: '#6927B7 ',
    },
    secondary: {
      main: '#F9BF3B',
    },
    },
    typography: {
        h5: {
            fontWeight:700
        },
        h6: {
            fontWeight:700
        }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'capitalize',
          fontWeight:600
          }
        }
      }
    }
    
});