import { Box, Button, Typography } from '@material-ui/core';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import login from '../../helpers/APICalls/login';
import useDemoCredentials from './useDemoCredentials';
import useStyles from './useStyles';

const DemoUser = (): JSX.Element => {
  const { linkDemo, captionDemo } = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const { ownerDemo, sitterDemo } = useDemoCredentials();

  const handleDemoSubmit = ({ email, password }: { email: string; password: string }) => {
    login(email, password).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        updateSnackBarMessage('An unexpected error occurred. Please try again !');
      }
    });
  };

  return (
    <>
      <Box textAlign="center" borderTop={'1px dotted red'} pt={1} mt={2} borderRadius={25}>
        <Typography className={captionDemo}>
          Sign in as a demo user
          <Button className={linkDemo} onClick={() => handleDemoSubmit(ownerDemo)}>
            Owner
          </Button>
          <Button className={linkDemo} onClick={() => handleDemoSubmit(sitterDemo)}>
            Sitter
          </Button>
        </Typography>
      </Box>
    </>
  );
};

export default DemoUser;
