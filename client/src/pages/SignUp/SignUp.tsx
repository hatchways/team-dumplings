import { CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FormikHelpers } from 'formik';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';
import useStyles from './useStyles';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext, loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const history = useHistory();
  /*
  if (loggedInUser) {
    history.push('/booking');
    return <CircularProgress />;
  }
*/
  const handleSubmit = (
    {
      username,
      email,
      password,
      role,
    }: { email: string; password: string; username: string; confirmPassword: string; role: string },
    {
      setSubmitting,
    }: FormikHelpers<{ email: string; password: string; username: string; confirmPassword: string; role: string }>,
  ) => {
    register(username, email, password, role).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
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
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            flexDirection="column"
            minHeight="100vh"
            paddingTop={3}
          >
            <Box width="100%" maxWidth={450} p={3} alignSelf="center">
              <Box textAlign="center">
                <Typography variant="h2" className={classes.welcome}>
                  Sign up
                </Typography>
              </Box>
              <SignUpForm handleSubmit={handleSubmit} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
