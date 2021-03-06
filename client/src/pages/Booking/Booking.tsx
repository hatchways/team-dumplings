import DateFnsUtils from '@date-io/date-fns';
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import NavBar from '../../components/NavBar/NavBar';
import { useSnackBar } from '../../context/useSnackbarContext';
import { listRequests } from '../../helpers/APICalls/listRequests';
import { Request, SittingRequest } from '../../interface/Request';
import BookingItem from './BookingItem';
import useStyles from './useStyles';

const Booking = (): JSX.Element => {
  // eslint-disable-next-line
  const [requests, setRequests] = useState<Request[] | SittingRequest[]>([]);
  const [nextBooking, setNextBooking] = useState<Request[]>([]);
  const [currentBookings, setCurrentBookings] = useState<Request[]>([]);
  const [pastBookings, setPastBookings] = useState<Request[]>([]);
  const [bookingDays, setBookingDays] = useState<string[]>([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<undefined | boolean>(undefined);
  const [date, setDate] = useState(new Date() as MaterialUiPickersDate);
  const { updateSnackBarMessage } = useSnackBar();
  const location = useLocation();
  const [paymentConfirmation, setPaymentConfirmation] = useState<boolean | undefined>(undefined);

  const getFullName = (firstName: string, lastName: string): string => {
    return firstName.concat(' ').concat(lastName);
  };

  const saveRequests = (requests: Request[] | SittingRequest[]) => {
    setRequests(requests);
  };

  useEffect(() => {
    let ignore = true;
    if (location.state) {
      // eslint-disable-next-line
      const { confirmCardPayment }: any = location.state;
      confirmCardPayment ? setPaymentConfirmation(true) : setPaymentConfirmation(false);
      setOpen(true);
    }
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
          nxtBkn.push(booking as Request);
        } else if (!startDate.diff(selectedDate, 'days')) {
          crntBkns.push(booking as Request);
        } else {
          pstBkns.push(booking as Request);
        }
      });
      setNextBooking(nxtBkn);
      setCurrentBookings(crntBkns);
      setPastBookings(pstBkns);
    };

    function getRequests() {
      setLoading(true);
      listRequests().then((response) => {
        if (response.error) {
          updateSnackBarMessage(response.error.message);
        } else if (response.requests) {
          if (ignore) {
            saveRequests(response.requests);
            initBookingDays(response.requests as Request[]);
          }
        } else {
          updateSnackBarMessage('An unexpected error has occurred. Please try again later.');
        }
      });

      setLoading(false);
    }
    getRequests();
    return () => {
      ignore = false;
    };
  }, [date, updateSnackBarMessage, location.state]);

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
            <Collapse in={open}>
              <Alert
                severity={paymentConfirmation ? 'success' : 'error'}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {paymentConfirmation ? 'Payment has been made successful' : 'Something went wrong with payment'}
              </Alert>
            </Collapse>
          </Box>

          <Box className={classes.bookingsBox}>
            <Card component={Paper}>
              <CardHeader title="next bookings:" />

              <CardContent className={classes.bookingList}>
                {!loading &&
                  nextBooking.map((request) => (
                    <BookingItem
                      _id={request._id}
                      fullName={getFullName(request.sitterId.profile.firstName, request.sitterId.profile.lastName)}
                      start={request.start}
                      end={request.end}
                      status={request.status}
                      username={request.ownerId}
                      sitterId={request.sitterId._id}
                      rate={request.sitterId.profile.rate}
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
                  currentBookings.map((request) => (
                    <BookingItem
                      _id={request._id}
                      fullName={getFullName(request.sitterId.profile.firstName, request.sitterId.profile.lastName)}
                      start={request.start}
                      end={request.end}
                      status={request.status}
                      username={request.ownerId}
                      sitterId={request.sitterId._id}
                      rate={request.sitterId.profile.rate}
                      key={request._id}
                    />
                  ))}
                {!loading && !currentBookings.length && (
                  <Typography variant="body1" color="textSecondary">
                    No <b> Current </b> Bookings in the Selected Date.
                  </Typography>
                )}
              </CardContent>

              <CardHeader title="past bookings:" />
              <CardContent className={classes.bookingList}>
                {!loading &&
                  pastBookings.map((request) => (
                    <BookingItem
                      _id={request._id}
                      fullName={getFullName(request.sitterId.profile.firstName, request.sitterId.profile.lastName)}
                      start={request.start}
                      end={request.end}
                      status={request.status}
                      username={request.ownerId}
                      sitterId={request.sitterId._id}
                      rate={request.sitterId.profile.rate}
                      key={request._id}
                    />
                  ))}
                {!loading && !pastBookings.length && (
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
            justifyItems="center"
            maxWidth="30%"
            minWidth="25%"
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
