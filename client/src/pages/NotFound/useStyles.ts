import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'radial-gradient(circle, rgba(251,2,2,0.17440479609812676) 1%, rgba(255,255,255,1) 65%)',
    minHeight: '100vh',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'relative',
    '& .MuiTypography-root': {
      width: '100%',
      textAlign: 'center',
    },
  },
  wrapper: {
    padding: 45,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    borderBottom: '0.8px solid #f04040',
    borderTop: '6px solid #f04040',
    zIndex: 3,
  },
  title: {
    fontWeight: 900,
    letterSpacing: 6,
    background: 'linear-gradient(180deg, rgba(189,45,10,1) 0%, rgba(251,2,2,1) 7%, rgba(255,255,255,1) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subTitle: {
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  media: {
    border: 'none',
    height: 36,
  },
}));

export default useStyles;
