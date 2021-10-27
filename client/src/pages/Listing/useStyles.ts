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
  itemContainer: {
    display: 'flex',
    marginTop: 15,
  },
  avatarButton: {
    margin: 0,
    padding: 0,
  },
  largeAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  fullNameStyle: {
    fontWeight: 500,
    marginTop: theme.spacing(2),
  },
  descriptionStyle: {
    fontSize: 15,
    fontWeight: 500,
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 8, 0, 8),
  },
  locationStyle: {
    marginLeft: theme.spacing(1),
    fontWeight: 500,
    color: theme.palette.grey[600],
  },
  iconStyle: {
    color: theme.palette.primary.main,
  },
  priceStyle: {
    fontWeight: 600,
  },
  title: {
    color: theme.palette.common.black,
    fontWeight: 600,
    textAlign: 'center',
  },
  search: {
    borderRadius: 4,
    position: 'relative',
    borderRight: 'none',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: theme.spacing(2),
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },

  dateInOff: {
    padding: theme.spacing(2),
    borderRadius: 4,
    border: '1px solid #ced4da',
    position: 'relative',
    backgroundColor: theme.palette.common.white,
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
}));
export default useStyles;
