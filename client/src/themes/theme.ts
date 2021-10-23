import { createTheme } from '@material-ui/core';

const theme = createTheme({
  spacing: 8,
  typography: {
    fontFamily: '"Roboto"',
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

theme.overrides = {
  MuiTypography: {
    // home page logo text
    h4: {
      fontSize: 26,
    },
    // navbar left logo text && login/signup welcome title
    h2: {
      fontSize: 26,
    },
    // home page slogan
    h1: {
      fontSize: 50,
    },
    // 404 title
    h5: {
      fontSize: 100,
    },
    // listing item full name
    h3: {
      fontSize: 24,
    },
    // listing item subtitle
    subtitle1: {
      fontFamily: '"Roboto"',
      fontSize: 12,
      fontWeight: 600,
      color: theme.palette.grey[600],
    },
  },
};
export default theme;
