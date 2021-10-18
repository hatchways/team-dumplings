import { Avatar, Box } from '@material-ui/core';
import { CustomButton } from '../Button/CustomButton';
import useStyles from './useStyles';

const NavMenu = (): JSX.Element => {
  const { buttonContainer } = useStyles();
  return (
    <Box className={buttonContainer}>
      <CustomButton linkTo={'/sitters'} btnText={'My Sitters'} style={'mySitters'} />
      <CustomButton linkTo={'/messages'} btnText={'Messages'} style={'messages'} status={'active'} />
      <Avatar alt="Hatch ways.." src="https://i.pravatar.cc/300" />
    </Box>
  );
};

export default NavMenu;
