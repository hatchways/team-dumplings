import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  right: {
    position: 'relative',
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    objectFit: 'cover',
    zIndex: -1,
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
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
    fontSize: 26,
    fontWeight: 900,
  },
  dateInOff: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    width: '40%',
    height: '100%',
    padding: theme.spacing(1),
    paddingBottom: '14px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    '&.left': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    '&.right': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
  leftBodyContainer: {
    padding: theme.spacing(3, 8, 2, 8),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 2, 1, 2),
    },
  },
  slogan: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    fontSize: 50,
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: 35,
    },
  },
  label: {
    fontWeight: 800,
    color: theme.palette.common.black,
    textTransform: 'uppercase',
  },
}));

export default useStyles;
