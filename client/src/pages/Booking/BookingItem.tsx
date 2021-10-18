import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import moment from 'moment';
import { useState } from 'react';
import { CustomButton } from '../../components/Button/CustomButton';
import useStyles from './useStyles';
import { useTheme } from '@material-ui/core/styles';

interface Props {
  _id: string;
  fullName: string;
  start: Date;
  end: Date;
  status: string;
  username?: string;
  sitterId?: string;
}

const BookingItem = ({ fullName, start, end, status, _id }: Props): JSX.Element => {
  const theme = useTheme();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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
            </Menu>
          </>
        }
        title={`${moment(start).format('DD MMMM  YYYY, h:mm a')} | | ${moment(end).format('DD-MM-YY, h:mm a')}`}
      />
      <CardContent className={classes.currentBookingCardContent}>
        <Box display="flex" alignItems="center" marginRight={`${theme.spacing(25)}px`}>
          <Typography
            variant="h6"
            color="textSecondary"
            component="span"
            className={classes.avatarFullName}
          ></Typography>
          <Avatar aria-label="booking" alt="Marketplace for Dog Sitters, Dog Owners" src="https://i.pravatar.cc/300" />
          <Typography variant="h6" color="textSecondary" component="span" className={classes.avatarFullName}>
            {fullName}
          </Typography>
        </Box>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Typography
            variant="button"
            color="textPrimary"
            component="h6"
            className={classes.bookingStatus}
            align={'center'}
          >
            {status}
          </Typography>
          <CustomButton linkTo={'/'} btnText={'checkout'} style={'checkout'} disable={status !== 'accepted' && true} />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
