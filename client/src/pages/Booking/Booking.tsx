import DateFnsUtils from '@date-io/date-fns';
import { Badge, Box, Card, CardContent, CardHeader, Grid, Paper, Typography } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment from 'moment';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { listRequests } from '../../helpers/APICalls/listRequests';
import { Request } from '../../interface/Request';
import BookingItem from './BookingItem';
import useStyles from './useStyles';

const Booking = (): JSX.Element => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [nextBooking, setNextBooking] = useState<Request[]>([]);
  const [currentBookings, setCurrentBookings] = useState<Request[]>([]);
  const [pastBookings, setPastBookings] = useState<Request[]>([]);
  const [bookingDays, setBookingDays] = useState<string[]>([]);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState<undefined | boolean>(undefined);
  const [date, setDate] = useState(new Date() as MaterialUiPickersDate);

  const saveRequests = (requests: Request[]) => {
    setRequests(requests);
  };

  useEffect(() => {
    let ignore = true;

    const initBookingDays = (requests: Request[]) => {
      const dates = requests.map((request) => {
        return moment(request.start).format('MM/DD/YYYY');
      });
      setBookingDays(dates);
      const nxtBkn: Request[] = [];
      const crntBkns: Request[] = [];
      const pstBkns: Request[] = [];
      const selectedDate = moment(date).startOf('day');

      requests.forEach((booking) => {
        const startDate = moment(booking.start).startOf('day');
        if (startDate.diff(selectedDate, 'days') > 0) {
          nxtBkn.push(booking);
        } else if (startDate.diff(selectedDate, 'days') === 0) {
          crntBkns.push(booking);
        } else {
          pstBkns.push(booking);
        }
      });
      setNextBooking(nxtBkn);
      setCurrentBookings(crntBkns);
      setPastBookings(pstBkns);
    };

    async function getRequests() {
      setLoading(true);
      const response = await listRequests();

      if (ignore && response && response.requests) {
        saveRequests(response.requests);
        initBookingDays(response.requests);
      }
      setLoading(false);
    }
    getRequests();
    return () => {
      ignore = false;
    };
  }, [date]);

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDateChange = (date: MaterialUiPickersDate): MaterialUiPickersDate => {
    setDate(date);
    return date;
  };

  return (
    <>
      <NavBar />

      <Grid container className={classes.root}>
        <Grid item md={6} className={classes.leftContainer}>
          <Box className={classes.bookingsBox}>
            <Card component={Paper}>
              <CardHeader title="next bookings:" />

              <CardContent className={classes.bookingList}>
                {!loading &&
                  nextBooking.map((request, index) => (
                    <BookingItem
                      _id={request._id}
                      fullName={request.sitterId.username}
                      start={request.start}
                      end={request.end}
                      status={request.status}
                      username={request.ownerId}
                      sitterId={request.sitterId._id}
                      key={request._id}
                    />
                  ))}
                {!loading && !nextBooking.length && (
                  <Typography variant="body1" color="textSecondary">
                    No <b> Next </b> Bookings in the Selected Date.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>

          <Box className={classes.bookingsBox}>
            <Card component={Paper}>
              <CardHeader title="current bookings:" />

              <CardContent className={classes.bookingList}>
                {!loading &&
                  currentBookings.map((request, index) => (
                    <BookingItem
                      _id={request._id}
                      fullName={request.sitterId.username}
                      start={request.start}
                      end={request.end}
                      status={request.status}
                      username={request.ownerId}
                      sitterId={request.sitterId._id}
                      key={request._id}
                    />
                  ))}
                {!loading && currentBookings.length === 0 && (
                  <Typography variant="body1" color="textSecondary">
                    No <b> Current </b> Bookings in the Selected Date.
                  </Typography>
                )}
              </CardContent>

              <CardHeader title="past bookings:" />
              <CardContent className={classes.bookingList}>
                {!loading &&
                  pastBookings.map((request, index) => (
                    <BookingItem
                      _id={request._id}
                      fullName={request.sitterId.username}
                      start={request.start}
                      end={request.end}
                      status={request.status}
                      username={request.ownerId}
                      sitterId={request.sitterId._id}
                      key={request._id}
                    />
                  ))}
                {!loading && pastBookings.length === 0 && (
                  <Typography variant="body1" color="textSecondary">
                    No <b> past </b> Bookings
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Grid>

        <Grid item md={6} className={classes.rightContainer}>
          <Box
            className={classes.datePicker}
            component={Paper}
            borderRadius={5}
            display="flex"
            alignItems="center"
            justifyContent="start"
            maxWidth="55%"
            position="fixed"
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk={true}
                disableToolbar
                variant="static"
                label="Only calendar"
                helperText="No year selection"
                value={date}
                onChange={onDateChange}
                renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
                  const calendarDay = moment(day).format('MM/DD/YYYY');
                  const isSelected = bookingDays.includes(calendarDay);
                  const badgeStyle = isSelected ? 'day ' + classes.selectedDay : 'day';
                  return <Badge className={badgeStyle}>{dayComponent}</Badge>;
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
