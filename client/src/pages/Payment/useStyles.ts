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
    fontWeight: 500,
    textAlign: 'center',
  },
  subTitle: {
    color: theme.palette.grey[600],
    fontWeight: 300,
    textAlign: 'left',
  },
  cardBrandLogo: {
    width: '85px',
    height: '42px',
    objectFit: 'contain',
  },
  creditCardNumber: {
    fontSize: 14,
    fontWeight: 600,
    wordSpacing: 4,
    color: theme.palette.common.black,
  },
  creditCardExpDate: {
    fontWeight: 500,
    paddingBottom: theme.spacing(2),
  },
  creditCardHolder: {
    fontSize: 16,
    fontWeight: 600,
    color: theme.palette.common.black,
    textTransform: 'uppercase',
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
  inputs: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 14,
    width: '80%',
    height: '100%',
    padding: theme.spacing(2),
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  creditCardInputStyle: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: '85%',
    height: '28px',
    fontSize: 12,
    '& .credit-card-input': {},
  },
  label: {
    fontWeight: 800,
    fontSize: 12,
    color: theme.palette.common.black,
    textTransform: 'uppercase',
    marginTop: theme.spacing(1),
  },
  CreditCardInputClass: {
    color: 'red !important',
    fontSize: '10px   !important',
    //display: 'none',
  },
}));

export default useStyles;
