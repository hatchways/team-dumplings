import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 800,
    fontSize: 24,
    color: 'primary',
    marginBottom: '2em',
    textAlign: 'center',
    paddingTop: theme.spacing(3),
  },
}));

export default useStyles;
