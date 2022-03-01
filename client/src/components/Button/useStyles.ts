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
    backgroundColor: theme.palette.primary.main,
    border: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    padding: theme.spacing(2, 4, 2, 4),
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
    },
    '&.showmore': {
      textTransform: 'uppercase',
      backgroundColor: 'transparent',
      border: 1,
      borderStyle: 'solid',
      borderColor: theme.palette.grey[500],
      color: theme.palette.common.black,
      [theme.breakpoints.down('sm')]: {
        width: '50%',
      },
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
      color: theme.palette.primary.main,
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
      padding: theme.spacing(1, 4, 1, 4),
      textTransform: 'uppercase',
      backgroundColor: 'transparent',
      border: 'none',
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: theme.palette.common.black,
      color: theme.palette.common.black,
      '&.home': { textDecorationColor: theme.palette.common.white, color: theme.palette.common.white },
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
      },
    },
    '&.login, &.notFoundHome, &.payment': {
      padding: theme.spacing(1, 4, 1, 4),
      textTransform: 'uppercase',
      color: theme.palette.primary.main,
      fontSize: 12,
      fontWeight: 600,
      backgroundColor: 'transparent',
      border: 1,
      borderStyle: 'solid',
      borderColor: theme.palette.primary.main,
      '&.home': { color: 'white', border: '1px solid #dfaf7a' },
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      [theme.breakpoints.down('sm')]: {
        color: `${theme.palette.primary.main}!important`,
      },
    },
    '&.signup, &.report': {
      padding: theme.spacing(1, 4, 1, 4),
      textTransform: 'uppercase',
    },
    '&.checkout': {
      padding: theme.spacing(0.1, 0.5, 0.1, 0.5),
      textTransform: 'uppercase',
      border: 1,
      borderStyle: 'solid',
      borderColor: theme.palette.primary.main,
    },
    '&.blogs': {
      padding: theme.spacing(1, 4, 1, 4),
      backgroundColor: 'transparent',
      color: '#0000FF',
      border: 'none',
    },
    '&.readMore': {
      size: 'small',
      backgroundColor: 'transparent',
      border: 'none',
      color: theme.palette.common.black,
    },
  },
}));

export default useStyles;
