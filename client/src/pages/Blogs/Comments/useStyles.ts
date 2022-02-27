import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  title: {
    fontSize: 18,
    fontWeight: 800,
  },
  container: {
    alignItems: 'center',
    padding: theme.spacing(7),
  },
  img: {
    height: 300,
    width: '75%',
    marginTop: 40,
    borderRadius: 50,
    marginBottom: 25,
  },
  addIcon: {
    height: 25,
    width: 25,
    borderRadius: 50,
    color: theme.palette.primary.main,
  },
  listStyle: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'background.paper',
  },
  input: {
    width: 200,
    verticalAlign: 'bottom',
  },
  addCommentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'bottom',
  },
  iconButtonStyle: {
    marginBottom: 1,
  },
}));

export default styles;
