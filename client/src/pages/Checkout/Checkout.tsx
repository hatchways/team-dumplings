import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { CreditCardRounded } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { CustomButton } from '../../components/Button/CustomButton';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { confirmPayment, createPaymentIntent, listPaymentMethods } from '../../helpers/APICalls/payment';
import { getProfile } from '../../helpers/APICalls/profile';
import { PaymentProfile } from '../../interface/Payment';
import useStyles from './useStyles';

const Checkout = (): JSX.Element => {
  const publicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
  const stripePromise = loadStripe(publicKey as string);
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutContainer />
      </Elements>
    </>
  );
};

const CheckoutContainer = (): JSX.Element => {
  const { root, title, subTitle, largeAvatar, totalPrice, link } = useStyles();
  const location = useLocation();
  const { loggedInUser } = useAuth();
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();
  const stripe = useStripe();

  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState<string>();
  const [defaultPaymentProfile, setDefaultPaymentProfile] = useState<PaymentProfile | undefined>(undefined);
  const [isSubmitting, setSubmitting] = useState(false);
  // eslint-disable-next-line
  const { _id, fullName, start, end, rate }: any = location.state;
  const requestId = _id;
  const sittingHours = moment(end).diff(moment(start), 'hours');
  const subtotal = sittingHours * rate;
  const fee = subtotal * 0.03;
  const total = subtotal + fee;

  const saveCustomerId = (customerId: string): void => {
    setCustomerId(customerId);
  };

  const saveDefaultPaymentProfile = (paymentProfiles: PaymentProfile[]) => {
    paymentProfiles.map((paymentProfile) => {
      if (paymentProfile.default) {
        setDefaultPaymentProfile(paymentProfile);
      }
    });
  };

  // eslint-disable-next-line
  const handlePay = (e: any) => {
    setSubmitting(true);
    e.preventDefault();
    customerId &&
      createPaymentIntent(requestId, customerId).then((response) => {
        if (response.error) {
          updateSnackBarMessage(JSON.stringify(response.error));
        } else if (response.clientSecret) {
          const clientSecret = response.clientSecret;
          stripe &&
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: defaultPaymentProfile?.id,
              })
              // eslint-disable-next-line
              .then((result: any) => {
                if (result.paymentIntent) {
                  confirmPayment(requestId).then((response) => {
                    if (response.request) {
                      history.push('/booking', { confirmCardPayment: true });
                    }
                  });
                } else if (result.error) {
                  history.push('/booking', { confirmCardPayment: false });
                }
              });
        } else {
          updateSnackBarMessage('An unexpected error has occurred. Please try again later.');
        }
      });
  };

  const getPaymentMethods = useCallback(() => {
    setLoading(true);
    loggedInUser &&
      getProfile(loggedInUser.profile).then((response) => {
        if (response.error) {
          updateSnackBarMessage(response.error);
        } else if (response.success) {
          if (response.success.profile.customerId) {
            const customerId = response.success.profile.customerId;
            listPaymentMethods(customerId).then((response) => {
              if (response.error) {
                updateSnackBarMessage(JSON.stringify(response.error.message));
              } else if (response.paymentProfiles) {
                saveDefaultPaymentProfile(response.paymentProfiles);
                saveCustomerId(customerId);
              } else {
                updateSnackBarMessage('An unexpected error has occurred. Please try again later.');
              }
            });
          }
        } else {
          updateSnackBarMessage('An unexpected error has occurred. Please try again later.');
        }
      });

    setLoading(false);
  }, [loggedInUser, updateSnackBarMessage]);

  useEffect(() => {
    let ignore = true;
    getPaymentMethods();
    return () => {
      // eslint-disable-next-line
      ignore = false;
    };
  }, [getPaymentMethods]);

  return (
    <>
      <NavBar />

      <Grid container className={root} justifyContent="center">
        <Grid item container sm={8}>
          <Box width={'100%'} p={4}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Box component={Paper} width={'100%'} height={'70%'} display="flex">
                <Box
                  width={'100%'}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-evenly"
                  pt={3}
                >
                  <CreditCardRounded color="primary" fontSize={'large'} />
                  <Typography variant="h3" className={title}>
                    Checkout
                  </Typography>
                  <Typography variant="h6" className={subTitle}>
                    Order details
                  </Typography>
                  <Typography variant="h6" className={subTitle}>
                    Booking
                  </Typography>
                  <Box component={Typography} pb={2} textAlign="center">
                    DROP IN
                    <Typography variant="body1" className={subTitle}>
                      {moment(start).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                    </Typography>
                  </Box>
                  <Box component={Typography} pb={2} textAlign="center">
                    DROP OFF
                    <Typography variant="body1" className={subTitle}>
                      {moment(end).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                    </Typography>
                  </Box>
                </Box>
                <Divider orientation="vertical" />
                <Box
                  width={'100%'}
                  display="flex"
                  flexDirection="column"
                  pt={3}
                  pl={2}
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Avatar className={largeAvatar}></Avatar>
                  <Typography variant="h3" className={title}>
                    {fullName}
                  </Typography>
                  <Typography variant="body1" className={subTitle}>
                    Hourly rate : $ {rate}
                  </Typography>
                  <Rating name="read-only" value={3} readOnly />
                </Box>
                <Divider orientation="vertical" />
                <Box width={'100%'} display="flex" flexDirection="column" justifyContent="space-evenly" pl={2} pt={3}>
                  <Typography variant="h6" className={subTitle}>
                    Payment
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Summary</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Total Hours
                          </TableCell>
                          <TableCell align="right">{sittingHours}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Price
                          </TableCell>
                          <TableCell align="right">${rate}/hr</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Subtotal
                          </TableCell>
                          <TableCell align="right">${subtotal}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Service Fee
                          </TableCell>
                          <TableCell align="right">${fee}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row" className={totalPrice}>
                            Toal
                          </TableCell>
                          <TableCell align="right" className={totalPrice}>
                            ${total}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {isSubmitting ? (
                    <CircularProgress />
                  ) : (
                    <CustomButton
                      linkTo={'#'}
                      btnText={'Confirm and Pay'}
                      style={'payment'}
                      onClickFunction={handlePay}
                      disable={!defaultPaymentProfile}
                    />
                  )}

                  <Box alignSelf="center" pt={1} pb={1}>
                    <Typography variant="body2" className={link}>
                      <Link className={link} to="/payment">
                        Select a payment option
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Checkout;
