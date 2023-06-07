import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6927B7 ',
      dark: '#1E1E2D',
    },
    secondary: {
      main: '#F9BF3B',
    },
    action: {
      disabled: "#64748B",
      
    }
    
  },
  
  typography: {
      fontFamily:'Inter',
        h5: {
            fontWeight:700
        },
        h6: {
            fontWeight:700
    },
        body1:{fontSize:14,fontWeight:600}
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
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1040,
      lg: 1200,
      xl: 1536,
    }
  }
  
    
});