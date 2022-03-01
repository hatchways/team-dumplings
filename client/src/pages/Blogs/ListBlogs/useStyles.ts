import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  title: {
    fontSize: 18,
    fontWeight: 800,
  },
  root: {
    alignItems: 'center',
    padding: theme.spacing(5),
  },
  img: {
    height: 300,
    width: '75%',
    marginTop: 40,
    borderRadius: 50,
    marginBottom: 25,
  },
  addIcon: {
    height: 50,
    width: 50,
    borderRadius: 50,
    color: theme.palette.primary.main,
  },
}));

export default styles;
