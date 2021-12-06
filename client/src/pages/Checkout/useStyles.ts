import { makeStyles } from '@material-ui/core/styles';

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
  largeAvatar: {
    width: '100px',
    height: '100px',
    marginBottom: theme.spacing(2),
  },
  totalPrice: {
    fontWeight: 'bold',
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
}));

export default useStyles;
