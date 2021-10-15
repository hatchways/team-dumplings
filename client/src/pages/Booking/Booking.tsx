import DateFnsUtils from '@date-io/date-fns';
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  CssBaseline,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import BookingItem from './BookingItem';
import useStyles from './useStyles';

const Booking = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const items = [...Array(10).keys()];

  return (
    <>
      <NavBar isActive={true} />

      <Grid container className={classes.root}>
        <CssBaseline />
        <Grid item md={6} className={classes.leftContainer}>
          <Box className={classes.nextBooking}>
            <Card component={Paper}>
              <CardHeader
                action={
                  <>
                    <IconButton
                      aria-label="settings"
                      aria-controls="simple-menu1"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <SettingsIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu1"
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
                title=" YOUR NEXT BOOKING"
                subheader="5 April 2020, 10-12 AM "
              />
              <CardContent className={classes.nextBookingCardContent}>
                <Avatar aria-label="next booking" alt="Hatch ways.." src="https://i.pravatar.cc/300" />
                <Typography variant="h6" color="textSecondary" component="span" className={classes.avatarFullName}>
                  Nama Byers
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box className={classes.currentBooking}>
            <Card component={Paper}>
              <CardHeader title="CURRENT BOOKINGS" />
              <CardContent className={classes.currentBookingList}>
                {items.map((item, index) => (
                  <BookingItem key={index} />
                ))}
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item md={6} className={classes.rightContainer}>
          <Box className={classes.datePicker}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk={true}
                disableToolbar
                variant="static"
                label="Only calendar"
                helperText="No year selection"
                value={new Date(2020, 3, 5)}
                onChange={() => onchange}
                renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
                  const date = day?.getDate();
                  const isSelected = date === 5 || date === 8;

                  return <Badge className={isSelected ? 'day ' + classes.selectedDay : 'day'}>{dayComponent}</Badge>;
                }}
              />
            </MuiPickersUtilsProvider>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Booking;
