import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(10),
  },
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: theme.palette.common.black,
    fontWeight: 700,
    textAlign: 'center',
    width: '95%',
  },
}));

export default useStyles;
