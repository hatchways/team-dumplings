import { CircularProgress, useMediaQuery } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FormikHelpers } from 'formik';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import login from '../../helpers/APICalls/login';
import LoginForm from './LoginForm/LoginForm';
import useStyles from './useStyles';
import { useTheme } from '@material-ui/core/styles';

export default function Login(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext, loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });
  const history = useHistory();

  if (loggedInUser) {
    history.push('/booking');
    return <CircularProgress />;
  }

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again !');
      }
    });
  };

  return (
    <>
      <NavBar />
      <Grid container component="main" className={classes.root}>
        <Grid item xs={6} sm={8} md={4} elevation={0} component={Paper} square>
          <Box
            display={'flex'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            flexDirection={'column'}
            minHeight={'100vh'}
            paddingTop={3}
            width={isMobile ? '100%' : '80%'}
          >
            <Box width={'100%'} maxWidth={450} p={3} alignSelf={'center'}>
              <Box textAlign="center">
                <Typography variant="h2" className={classes.welcome}>
                  Sign in
                </Typography>
              </Box>
              <LoginForm handleSubmit={handleSubmit} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
