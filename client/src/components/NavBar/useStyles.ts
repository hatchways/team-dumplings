import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.common.white,
  },
  leftLogoContainer: {
    border: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  leftLogoText: {
    marginLeft: theme.spacing(1),
    fontWeight: 700,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    margin: 5,
  },
  badge: {
    marginTop: theme.spacing(1),
    right: -theme.spacing(1),
    backgroundColor: theme.palette.error.main,

    '&.active': {
      backgroundColor: theme.palette.success.main,
    },
  },
  button: {
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
    '&.login': {
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
        color: '#f04040',
      },
    },
    '&.signup': {
      padding: theme.spacing(1, 4, 1, 4),
    },
  },

  avatar: {
    cursor: 'pointer',
  },
  menu: {
    marginTop: 30,
  },
}));

export default useStyles;
