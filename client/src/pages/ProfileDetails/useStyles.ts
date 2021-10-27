import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    marginTop: '7em',
  },
  gridContainer: {
    position: 'relative',
    width: '100%',
  },
  gridItem: {
    marginTop: '-3em',
  },
  gridItemLocation: {
    marginTop: '1em',
  },
  backgroundImage: {
    width: '100%',
    height: '25vw',
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  profileTypography: {
    fontWeight: 700,
  },
  image: {
    width: '20%',
    margin: '6px',
    height: '10vw',
  },
  aboutMeContainer: {
    paddingLeft: '1em',
  },
  requestPaper: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      marginTop: '3em',
    },
  },
  requestTypography: {
    marginTop: '1em',
    fontWeight: 700,
  },
  requestButton: {
    backgroundColor: '#b22222',
    color: '#ffffff',
    height: 50,
    marginBottom: '2em',
    marginTop: '4em',
    textTransform: 'uppercase',
  },
  requestGridItem: {
    margin: 'auto',
  },
}));

export default useStyles;
