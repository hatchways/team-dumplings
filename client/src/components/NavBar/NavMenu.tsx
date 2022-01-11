import { Avatar, Box, Button, Menu, MenuItem, Paper } from '@material-ui/core';
import { useState } from 'react';
//import logout from '../../helpers/APICalls/logout';
import { CustomButton } from '../Button/CustomButton';
import useStyles from './useStyles';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
const NavMenu = (): JSX.Element => {
  const { avatar, menu } = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuth();
  const history = useHistory();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    handleClose();
    /*
    logout()
      .then(() => {
        history.push('/signin');
      })
      .catch((error) => console.error(error)); */
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <CustomButton linkTo={'/sitting'} btnText={'My Sitters'} style={'mySitters'} />
      <CustomButton linkTo={'/messages'} btnText={'Messages'} style={'messages'} status={'active'} />

      <Avatar
        alt="Marketplace for Dog Sitters, Dog Owners"
        src="https://i.pravatar.cc/300"
        onClick={handleClick}
        className={avatar}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={menu}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default NavMenu;
