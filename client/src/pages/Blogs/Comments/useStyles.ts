import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  title: {
    fontSize: 18,
    fontWeight: 800,
  },
  container: {
    alignItems: 'center',
    padding: theme.spacing(7),
    position: 'relative',
  },
  img: {
    height: 300,
    width: '75%',
    marginTop: 40,
    borderRadius: 50,
    marginBottom: 25,
  },
  addIconStyle: {
    height: 25,
    width: 25,
    borderRadius: 50,
    color: theme.palette.primary.main,
  },
  listStyle: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'background.paper',
    position: 'relative',
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
  disabledStyle: {
    height: 25,
    width: 25,
    borderRadius: 50,
    color: '#808080',
  },
  paginationContainer: {
    position: 'relative',
    marginTop: 30,
  },
}));

export default styles;
