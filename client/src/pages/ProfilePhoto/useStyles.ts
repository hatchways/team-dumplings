import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '50%',
    position: 'relative',
    left: '50%',
    top: '50%',
    transform: 'Translate(-50%, -50%)',
    marginTop: '10em',
    [theme.breakpoints.down('md')]: {
      margin: 'auto',
    },
  },
  typography: {
    fontWeight: 700,
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    marginTop: '3em',
    marginBottom: '1.5em',
  },
  button: {
    height: 60,
    width: '100%',
    color: theme.palette.primary.dark,
    borderColor: theme.palette.primary.dark,
    fontSize: '0.75em',
    margin: '1em 0 1em 0',
    opacity: 0.9,
  },
  textTypograpgy: {
    opacity: 0.7,
  },
  container: {
    position: 'absolute',
  },
  icon: {
    marginTop: '0.25em',
  },
}));

export default useStyles;
