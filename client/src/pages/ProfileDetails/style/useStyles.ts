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
    paddingTop: 25,
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
  comment: {
    width: '50%',
  },
  commentBtn: {
    width: '50%',
  },
  reviewsTitle: {
    textTransform: 'uppercase',
    fontSize: 25,
    fontWeight: 200,
  },
  reviewLink: {
    textAlign: 'center',
    textDecoration: 'none',
    color: 'grey',
    fontSize: 13,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  reviewIcon: {
    color: 'grey',
    margin: 5,
  },
  reviewBtn: {
    padding: '10px 15px 10px 20px',
  },
  globalRatingValue: {
    fontSize: 50,
    fontWeight: 100,
    textAlign: 'center',
  },
  progress5: {
    height: 25,
    backgroundColor: 'transparent',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#57bb8a',
    },
  },
  progress4: {
    height: 25,
    backgroundColor: 'transparent',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#9ace6a',
    },
  },
  progress3: {
    height: 25,
    backgroundColor: 'transparent',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#ffcf02',
    },
  },
  progress2: {
    height: 25,
    backgroundColor: 'transparent',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#ff9f02',
    },
  },
  progress1: {
    height: 25,
    backgroundColor: 'transparent',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#ff6f31 ',
    },
  },
  userIcon: {
    fontSize: 16,
    marginRight: 10,
    color: 'grey',
  },
  commentArea: {
    color: theme.palette.grey[500],
    marginLeft: theme.spacing(1),
    fontWeight: 400,
    width: '90%',
    overflowY: 'scroll',
    height: '100px',
  },
}));

export default useStyles;
