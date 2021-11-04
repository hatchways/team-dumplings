import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menu: {
    color: theme.palette.common.white,
    margin: '2em',
  },
  menuItem: {
    opacity: 0.7,
  },
  box: {
    marginLeft: '1em',
  },
  typography: {
    fontWeight: 700,
  },
  image: {
    width: '35px',
    height: '35px',
  },
}));

export default useStyles;
