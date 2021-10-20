import { Box } from '@material-ui/core';
import { CustomButton } from '../Button/CustomButton';

const AuthMenu = (): JSX.Element => {
  return (
    <Box display="flex" justifyContent="flex-end">
      <CustomButton linkTo={'/login'} btnText={'Login'} style={'login'} />
      <CustomButton linkTo={'/signup'} btnText={'Signup'} style={'signup'} />
    </Box>
  );
};

export default AuthMenu;
