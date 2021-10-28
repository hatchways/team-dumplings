import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: '#fafafa',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    paddingTop: theme.spacing(12),
  },

  title: {
    color: theme.palette.common.black,
    fontWeight: 400,
    textAlign: 'center',
  },
  sideBarMenuItem: {
    padding: theme.spacing(1),
    fontWeight: 300,
    cursor: 'pointer',
    color: theme.palette.grey[600],
    transition: '100ms',
    transitionTimingFunction: 'ease',
    textDecoration: 'underline',
    textDecorationColor: 'transparent',
    '&.active': {
      color: 'black',
      fontWeight: 400,
    },
    '&:hover': {
      color: theme.palette.grey[700],
      fontWeight: 400,
    },
  },
}));

export default useStyles;
