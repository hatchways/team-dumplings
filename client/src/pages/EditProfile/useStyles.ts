import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '70%',
    position: 'relative',
    left: '50%',
    top: '50%',
    transform: 'Translate(-50%, -50%)',
  },
  title: {
    fontWeight: 700,
    marginLeft: '3em',
    marginBottom: '1em',
    marginTop: '3em',
  },
  gridItem: {
    marginTop: '1.5em',
  },
  typography: {
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
      fontSize: 10,
    },
  },
}));

export default useStyles;
