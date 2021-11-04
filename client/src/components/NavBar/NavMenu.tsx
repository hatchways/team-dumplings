import { useState } from 'react';
import { Avatar, Box, Grid } from '@material-ui/core';
import { CustomButton } from '../Button/CustomButton';
import Notifications from './Notifications/Notifications';

const NavMenu = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [newNotification, setNewNotification] = useState(false);

  const onCustomButtonClick = (e: any) => {
    setOpen(true);
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <CustomButton
        linkTo="/dashboard"
        btnText={'Notifications'}
        style={'messages'}
        status={newNotification ? 'active' : ''}
        onClick={onCustomButtonClick}
      />

      <Notifications open={open} setOpen={setOpen} anchorEl={anchorEl} setNewNotification={setNewNotification} />
      <CustomButton linkTo={'/sitters'} btnText={'My Sitters'} style={'mySitters'} />
      <CustomButton linkTo={'/messages'} btnText={'Messages'} style={'messages'} status={'active'} />
      <Avatar alt="Marketplace for Dog Sitters, Dog Owners" src="https://i.pravatar.cc/300" />
    </Box>
  );
};

export default NavMenu;
