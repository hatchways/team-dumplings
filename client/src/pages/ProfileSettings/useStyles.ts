import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    marginTop: '5em',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '3em',
    },
  },
  box: {
    marginTop: '3em',
  },
}));

export default useStyles;
