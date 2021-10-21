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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default useStyles;
