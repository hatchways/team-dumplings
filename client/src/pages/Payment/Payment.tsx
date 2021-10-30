import { Box, CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomButton } from '../../components/Button/CustomButton';
import NavBar from '../../components/NavBar/NavBar';
import CreditCard from './CreditCard';
import NewPaymentProfile from './NewPaymentProfile';
import useStyles from './useStyles';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentProfile } from '../../interface/Payment';
import { useSnackBar } from '../../context/useSnackbarContext';
import { listPaymentMethods } from '../../helpers/APICalls/payment';
import { useAuth } from '../../context/useAuthContext';
import { getProfile } from '../../helpers/APICalls/profile';
import _ from 'lodash';
import { Alert } from '@material-ui/lab';

const Payment = () => {
  const publicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY || '';
  const { root, sideBarMenuItem, title, subTitle } = useStyles();
  const [fullWidth, setFullWidth] = useState(true);
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState<string>();
  const [paymentProfiles, setPaymentProfiles] = useState<PaymentProfile[] | undefined>(undefined);
  const { updateSnackBarMessage } = useSnackBar();
  const [loading, setLoading] = useState<boolean>(false);
  const { loggedInUser } = useAuth();

  const stripePromise = loadStripe(publicKey);

  const savePaymentProfiles = (paymentProfiles: PaymentProfile[]) => {
    setPaymentProfiles(paymentProfiles);
  };

  const saveCustomerId = (customerId: string): void => {
    setCustomerId(customerId);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                savePaymentProfiles(response.paymentProfiles);
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
      ignore = false;
    };
  }, [getPaymentMethods]);

  return (
    <>
      <NavBar />
      <Grid container className={root} justifyContent={'center'}>
        <Grid container item md={2}>
          <Box width={'100%'} height="100%" pt={5} pb={10} pl={5}>
            <Link to={'#'} component={Box} className={clsx(sideBarMenuItem, '')}>
              Edit Profile
            </Link>
            <Link to={'#'} component={Box} className={clsx(sideBarMenuItem, '')}>
              Profile Photo
            </Link>
            <Link to={'#'} component={Box} className={clsx(sideBarMenuItem, '')}>
              Availability
            </Link>
            <Link to={'#'} component={Box} className={clsx(sideBarMenuItem, 'active')}>
              Payment
            </Link>
            <Link to={'#'} component={Box} className={clsx(sideBarMenuItem, '')}>
              Security
            </Link>
            <Link to={'#'} component={Box} className={clsx(sideBarMenuItem, '')}>
              Settings
            </Link>
          </Box>
        </Grid>
        <Grid container item md={6}>
          <Box width={'100%'} height="100%" component={Paper} pt={10} display="flex" flexDirection={'column'}>
            <Box width={'100%'} pb={10}>
              <Typography variant="h3" className={title}>
                Payment Methods
              </Typography>
            </Box>
            <Box width={'100%'} pl={5}>
              <Box pb={5}>
                <Typography variant="h6" className={subTitle}>
                  Saved Payment Profiles:
                </Typography>
              </Box>
              <Box display={'flex'}>
                {!loading && paymentProfiles == undefined ? (
                  <CircularProgress />
                ) : !_.isEmpty(paymentProfiles) ? (
                  paymentProfiles?.map((paymentProfile) => (
                    <CreditCard
                      key={paymentProfile.id}
                      active={paymentProfile.default}
                      type={paymentProfile.brand}
                      lastFourDigits={paymentProfile.last4}
                      expDate={`${paymentProfile.expMonth}/${paymentProfile.expYear}`}
                      fullname={paymentProfile.name}
                      cardId={paymentProfile.id}
                      customerId={customerId as string}
                      defaultProfileAction={getPaymentMethods}
                    />
                  ))
                ) : (
                  <>
                    <Alert variant="outlined" severity="warning">
                      This is a warning alert — Please set one payment method at least!
                    </Alert>
                  </>
                )}
              </Box>
              <Box pt={10}>
                {!loading && paymentProfiles && paymentProfiles?.length <= 1 && (
                  <CustomButton
                    linkTo={'#'}
                    btnText={'Add new payment profile'}
                    style={'payment'}
                    onClickFunction={handleClickOpen}
                  />
                )}
              </Box>
              <Elements stripe={stripePromise}>
                <NewPaymentProfile
                  fullWidth={fullWidth}
                  open={open}
                  handleClose={handleClose}
                  callBackAction={getPaymentMethods}
                />
              </Elements>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Payment;
