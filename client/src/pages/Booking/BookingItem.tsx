import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { useState } from 'react';
import useStyles from './useStyles';

const BookingItem = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card component={Paper} className={classes.currentBookingItem} elevation={0}>
      <CardHeader
        className={classes.currentBookingCardHeader}
        action={
          <>
            <IconButton aria-label="settings" aria-controls="simple-menu2" aria-haspopup="true" onClick={handleClick}>
              <SettingsIcon />
            </IconButton>
            <Menu
              id="simple-menu2"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              elevation={0}
            >
              <MenuItem onClick={handleClose}>View</MenuItem>
              <MenuItem onClick={handleClose}>Accept</MenuItem>
              <MenuItem onClick={handleClose}>Decline</MenuItem>
            </Menu>
          </>
        }
        title="5 April 2020, 10-12 AM"
      />
      <CardContent className={classes.currentBookingCardContent}>
        <Box className={classes.avatarContainer}>
          <Typography
            variant="h6"
            color="textSecondary"
            component="span"
            className={classes.avatarFullName}
          ></Typography>
          <Avatar aria-label="next booking" alt="Hatch ways.." src="https://i.pravatar.cc/300" />
          <Typography variant="h6" color="textSecondary" component="span" className={classes.avatarFullName}>
            Kayden Boyle
          </Typography>
        </Box>
        <Typography variant="h6" color="textSecondary" component="span" className={classes.bookingStatus}>
          ACCEPTED
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
