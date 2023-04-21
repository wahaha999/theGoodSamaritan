import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
          main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    },
    },
    typography: {
        h5: {
            fontWeight:700
        },
        h6: {
            fontWeight:700
        }
    }
});