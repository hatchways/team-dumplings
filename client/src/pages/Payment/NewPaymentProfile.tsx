import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputLabel,
  TextField,
} from '@material-ui/core';
import clsx from 'clsx';
import { Formik, FormikHelpers } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import CreditCardInput from 'react-credit-card-input';
import * as Yup from 'yup';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { createCustomer, createPaymentMethod } from '../../helpers/APICalls/payment';
import { editProfile, getProfile } from '../../helpers/APICalls/profile';
import { Profile, ProfileApiDataSuccess } from '../../interface/Profile';
import useStyles from './useStyles';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

interface Props {
  fullWidth: boolean;
  open: boolean;
  handleClose: any;
  callBackAction: any;
}

const NewPaymentProfile = ({ fullWidth, open, handleClose, callBackAction }: Props): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();

  const { inputs, creditCardInputStyle, label, CreditCardInputClass } = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [customerId, setCustomerId] = useState('');

  const saveCustomerId = (customerId: string) => {
    setCustomerId(customerId);
  };

  const saveProfile = (data: ProfileApiDataSuccess, email: string): void => {
    const { firstName, lastName, phoneNumber } = data.profile;
    setFullName(firstName.concat(' ').concat(lastName));
    setPhoneNumber(phoneNumber);
    setEmail(email);
  };

  useEffect(() => {
    let ignore = true;
    const createNewCustomer = (data: ProfileApiDataSuccess, email: string) => {
      const profile = data.profile;
      const { firstName, lastName, phoneNumber } = profile;

      createCustomer(firstName.concat(' ').concat(lastName), email, phoneNumber).then((response) => {
        if (response.customerId && profile && profile._id) {
          editProfile(
            {
              firstName: profile.firstName,
              lastName: profile.lastName,
              gender: profile.gender,
              birthDate: profile.birthDate,
              phoneNumber: profile.phoneNumber,
              address: profile.address,
              description: profile.description,
              customerId: response.customerId,
            },
            profile._id,
          ).then((response) => {
            if (response.error) {
              updateSnackBarMessage(`An unexpected error has occurred !`);
            }
          });
        } else {
          updateSnackBarMessage('An unexpected error has occurred. Please try again later.');
        }
      });
    };

    function loadProfile() {
      setLoading(true);
      loggedInUser &&
        getProfile(loggedInUser.profile).then((response) => {
          if (response.error) {
            updateSnackBarMessage(response.error);
          } else if (response.success) {
            if (ignore) {
              saveProfile(response.success, loggedInUser.email);
              if (response.success.profile.customerId) {
                saveCustomerId(response.success.profile.customerId);
              } else {
                createNewCustomer(response.success, loggedInUser.email);
              }
            }
          } else {
            updateSnackBarMessage('An unexpected error has occurred. Please try again later.');
          }
        });

      setLoading(false);
    }
    loadProfile();

    return () => {
      ignore = false;
    };
  }, [loggedInUser, updateSnackBarMessage]);

  const handleSubmit = (
    {
      fullName,
      email,
      phoneNumber,
      creditCardNumber,
      cvcField,
      expDate,
    }: {
      fullName: string;
      email: string;
      phoneNumber: string;
      creditCardNumber: string;
      cvcField: string;
      expDate: string;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      fullName: string;
      email: string;
      phoneNumber: string;
      creditCardNumber: string;
      cvcField: string;
      expDate: string;
    }>,
  ) => {
    createPaymentMethod(creditCardNumber, cvcField, expDate, fullName, customerId).then((response) => {
      if (response.stripeResponse) {
        callBackAction();
      } else if (response.error) {
        updateSnackBarMessage(`Something went wrong ! ${response.error}`);
      }
    });

    handleClose();
    /*stripe &&
      stripe
        .confirmCardPayment('pi_3JqJ5aG4Np2TPeFN0Ha60YaZ_secret_j0BCGPUXTkdpC4Zh2w580VoXB', {
          payment_method: 'card_1JqI39G4Np2TPeFNf17UkxVy',
        })
        .then((result: any) => {
          // Handle result.error or result.paymentIntent
          if (result.paymentIntent) {
            console.log(`result.paymentIntent:  ${JSON.stringify(result.paymentIntent)}`);
          } else {
            console.log(`result.error:  ${JSON.stringify(result.error)}`);
          }
        }); */
    // create a token and use this token to create source for the current customer :)
  };

  return (
    <>
      <Dialog fullWidth={fullWidth} maxWidth={'sm'} open={open} onClose={handleClose}>
        <DialogTitle id="newPaymentProfile">New payment profile</DialogTitle>
        <DialogContent>
          <DialogContentText>You can set up to two profiles.</DialogContentText>
          <Formik
            initialValues={{
              fullName: fullName,
              email: email,
              phoneNumber: phoneNumber,
              creditCardNumber: '',
              cvcField: '',
              expDate: '',
            }}
            validationSchema={Yup.object().shape({
              fullName: Yup.string().required('Full Name is required').max(50, 'Full Name is too long'),
              email: Yup.string().required('Email is required').email('Email is not valid'),
              phoneNumber: Yup.string()
                .required('Phone Number is required')
                .max(13, 'Phone Number is too long')
                .min(9, 'Phone Number too short'),
              creditCardNumber: Yup.string()
                .required('CreditCardNumber are required')
                .max(20, 'CreditCardNumber is invalid')
                .min(19, 'CreditCardNumber is invalid'),
              cvcField: Yup.string().required('CVC is required').max(4, 'CVC is invalid').min(3, 'CVC is invalid'),
              expDate: Yup.string()
                .required('Expiry date is required')
                .max(7, 'Invalid Expiry date')
                .min(7, 'Invalid Expiry date'),
            })}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, setFieldValue, values, touched, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="fullName" className={label}>
                      Full name
                    </InputLabel>
                    <TextField
                      id="fullName"
                      fullWidth
                      margin="normal"
                      InputProps={{
                        classes: { input: inputs },
                        disableUnderline: true,
                      }}
                      name="fullName"
                      autoComplete="fullName"
                      placeholder="Full name"
                      autoFocus
                      helperText={touched.fullName ? errors.fullName : ''}
                      error={touched.fullName && Boolean(errors.fullName)}
                      value={values.fullName}
                      onChange={handleChange}
                    />
                    <InputLabel htmlFor="email" className={label}>
                      Email
                    </InputLabel>

                    <TextField
                      id="email"
                      fullWidth
                      margin="normal"
                      InputProps={{
                        classes: { input: inputs },
                        disableUnderline: true,
                      }}
                      name="email"
                      autoComplete="email"
                      placeholder="email@domain.com"
                      helperText={touched.email ? errors.email : ''}
                      error={touched.email && Boolean(errors.email)}
                      value={values.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="phoneNumber" className={label}>
                      Phone number
                    </InputLabel>
                    <TextField
                      id="phoneNumber"
                      fullWidth
                      margin="normal"
                      InputProps={{
                        classes: { input: inputs },
                        disableUnderline: true,
                      }}
                      autoComplete="phone"
                      placeholder="+123 546 5654"
                      helperText={touched.phoneNumber ? errors.phoneNumber : ''}
                      error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                      value={values.phoneNumber}
                      onChange={handleChange}
                    />

                    <InputLabel htmlFor="cardNumber" className={label}>
                      Card number
                    </InputLabel>
                    <CreditCardInput
                      cardNumberInputProps={{
                        name: 'creditCardNumber',
                        id: 'creditCardNumber',
                        value: values.creditCardNumber,
                        onChange: handleChange,
                        error: touched.creditCardNumber && Boolean(errors.creditCardNumber),
                        helperText: touched.creditCardNumber ? errors.creditCardNumber : '',
                        autoFocus: true,
                      }}
                      cardExpiryInputProps={{
                        name: 'expDate',
                        id: 'expDate',
                        value: values.expDate,
                        onChange: handleChange,
                        error: touched.expDate && Boolean(errors.expDate),
                        helperText: touched.expDate ? errors.expDate : '',
                      }}
                      cardCVCInputProps={{
                        name: 'cvcField',
                        id: 'cvcField',
                        value: values.cvcField,
                        onChange: handleChange,
                        error: touched.cvcField && Boolean(errors.cvcField),
                        helperText: touched.cvcField ? errors.cvcField : '',
                      }}
                      fieldClassName={clsx(inputs, creditCardInputStyle)}
                      dangerTextClassName={CreditCardInputClass}
                    />
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>

                  <Button type="submit" color="primary">
                    Save
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewPaymentProfile;
