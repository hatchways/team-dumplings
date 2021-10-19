import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  spacing: 8,
  typography: {
    fontFamily: '"Open Sans", "sans-serif", "Roboto"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#f04040' },
    success: { main: '#32CD32' },
  },
  shape: {
    borderRadius: 5,
  },
});
