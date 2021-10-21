import { Box } from '@material-ui/core';
import { CustomButton } from '../Button/CustomButton';

const AuthMenu = (): JSX.Element => {
  return (
    <Box display="flex" justifyContent="flex-end">
      <CustomButton linkTo={'/'} btnText={'Become a sitter'} style={'sitter'} />
      <CustomButton linkTo={'/signin'} btnText={'Login'} style={'login'} />
      <CustomButton linkTo={'/signup'} btnText={'Signup'} style={'signup'} />
    </Box>
  );
};

export default AuthMenu;
