import { Avatar, Box } from '@material-ui/core';
import { CustomButton } from '../Button/CustomButton';

const NavMenu = (): JSX.Element => {
  return (
    <Box display="flex" justifyContent="flex-end">
      <CustomButton linkTo={'/blogs'} btnText={'Blogs'} style={'blogs'} />
      <CustomButton linkTo={'/sitters'} btnText={'My Sitters'} style={'mySitters'} />
      <CustomButton linkTo={'/messages'} btnText={'Messages'} style={'messages'} status={'active'} />
      <Avatar alt="Marketplace for Dog Sitters, Dog Owners" src="https://i.pravatar.cc/300" />
    </Box>
  );
};

export default NavMenu;
