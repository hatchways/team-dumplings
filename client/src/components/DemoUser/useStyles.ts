import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  captionDemo: {
    fontWeight: 400,
  },
  linkDemo: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    margin: theme.spacing(1),
  },
}));

export default useStyles;
