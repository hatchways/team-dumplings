import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  title: {
    fontSize: 25,
    fontWeight: 800,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5),
  },
  img: {
    height: 300,
    width: 600,
    marginTop: 40,
    borderRadius: 50,
    marginBottom: 25,
  },
  body: {
    width: 800,
    fontSize: 16,
  },
}));

export default styles;
