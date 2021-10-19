import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  badge: {
    marginTop: theme.spacing(1),
    right: -theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    display: 'none',

    '&.active': {
      backgroundColor: theme.palette.success.main,
      display: 'block',
    },
  },
  button: {
    textDecoration: 'none',
    margin: 5,

    fontSize: 12,
    fontWeight: 600,
    color: theme.palette.common.white,
    backgroundColor: '#f04040',
    border: '1px solid #f04040',
    padding: theme.spacing(2, 4, 2, 4),
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#f04040',
    },
    '&.findMyDog': {
      textTransform: 'uppercase',
      width: '38%',
      [theme.breakpoints.down('sm')]: {
        width: '50%',
      },
    },
    '&.mySitters': {
      padding: theme.spacing(1, 4, 1, 4),
      backgroundColor: 'transparent',
      border: 'none',
      color: '#f04040',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
      },
    },

    '&.messages': {
      padding: theme.spacing(1, 4, 1, 4),
      backgroundColor: 'transparent',
      border: 'none',
      color: theme.palette.common.black,
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
      },
    },

    '&.sitter': {
      textTransform: 'uppercase',
      padding: theme.spacing(1, 4, 1, 4),
      backgroundColor: 'transparent',
      border: 'none',
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: theme.palette.common.black,
      color: theme.palette.common.black,
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
      },
    },
    '&.login, &.home': {
      textTransform: 'uppercase',
      padding: theme.spacing(1, 4, 1, 4),
      color: '#f04040',
      fontSize: 12,
      fontWeight: 600,
      backgroundColor: 'transparent',
      border: '1px solid #f04040',
      '&:hover': {
        backgroundColor: '#f04040',
        color: theme.palette.common.white,
      },
      [theme.breakpoints.down('sm')]: {
        color: '#f04040 !important',
      },
    },
    '&.signup, &.report': {
      textTransform: 'uppercase',
      padding: theme.spacing(1, 4, 1, 4),
    },
    '&.checkout': {
      textTransform: 'uppercase',
      padding: theme.spacing(0.1, 0.5, 0.1, 0.5),
      border: '1px solid #f04040',
    },
  },
}));

export default useStyles;
