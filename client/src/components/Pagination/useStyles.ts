import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.common.white,
  },
  root: {
    position: 'absolute',
    botom: 0,
    zIndex: 200,
    padding: 10,
    backgroundColor: 'green',
  },
  pagination: {},
}));

export default useStyles;
