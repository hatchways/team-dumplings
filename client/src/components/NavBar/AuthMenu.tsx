import { Box } from '@material-ui/core';
import { CustomButton } from '../Button/CustomButton';
import useStyles from './useStyles';

const AuthMenu = (): JSX.Element => {
  const { buttonContainer } = useStyles();
  return (
    <Box className={buttonContainer}>
      <CustomButton linkTo={'/'} btnText={'Become a sitter'} style={'sitter'} />
      <CustomButton linkTo={'/signin'} btnText={'Login'} style={'login'} />
      <CustomButton linkTo={'/signup'} btnText={'Signup'} style={'signup'} />
    </Box>
  );
};

export default AuthMenu;
