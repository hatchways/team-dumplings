import { Fragment } from 'react';
import useStyles from './useStyles';
import { Typography, Grid, TextField, MenuItem, Select, FormControl, Paper, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { editProfile, createProfile } from '../../helpers/APICalls/profile';

import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';
import { Profile } from '../../interface/Profile';

export default function MyProfile(): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();

  const onSave = async (inputs: Profile) => {
    if (loggedInUser && loggedInUser.profile) {
      const id = loggedInUser.profile;
      editProfile(inputs, id).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error);
        } else if (data.success) {
          updateSnackBarMessage('Your profile has been updated successfully');
        } else {
          updateSnackBarMessage('An unexpected error occurred. Please try again later');
        }
      });
    } else if (loggedInUser) {
      createProfile(inputs).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error);
        } else if (data.success) {
          loggedInUser.profile = data.success.profile._id ? data.success.profile._id : '';
          updateSnackBarMessage('Your profile has been created successfully');
        } else {
          updateSnackBarMessage('An unexpected error occurred. Please try again later');
        }
      });
    } else {
      updateSnackBarMessage('Please authenticate');
    }
  };
  const INITIAL_FORM_STATE = {
    firstName: '',
    lastName: '',
    gender: 'male',
    birthDate: new Date('1988-05-15'),
    phoneNumber: '',
    address: '',
    description: '',
  };

  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    lastName: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    gender: Yup.string().required('Required'),
    phoneNumber: Yup.number().typeError('Please enter a valid phone number').required('Required'),
    address: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
  });

  return (
    <Fragment>
      <Paper elevation={24} variant="outlined" className={classes.paper}>
        <Grid container direction="column" justify="center" alignItems="center" style={{ position: 'absolute' }}>
          <Grid item>
            <Typography variant="h4" className={classes.title}>
              My Profile
            </Typography>
          </Grid>
          <Grid item>
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                onSave(values);
              }}
            >
              {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <Grid item container direction="column" alignItems="center" justify="center" spacing={1}>
                    <Grid item container spacing={2}>
                      <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                        <Typography className={classes.typography}>first name</Typography>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8}>
                        <TextField
                          name="firstName"
                          variant="outlined"
                          placeholder="John"
                          fullWidth
                          error={errors.firstName ? true : false}
                          helperText={errors.firstName}
                          value={values.firstName}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                        <Typography className={classes.typography}>last name</Typography>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8}>
                        <TextField
                          name="lastName"
                          variant="outlined"
                          placeholder="Doe"
                          fullWidth
                          error={errors.lastName ? true : false}
                          helperText={errors.lastName}
                          value={values.lastName}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                        <Typography className={classes.typography}>gender</Typography>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4}>
                        <FormControl fullWidth>
                          <InputLabel id="gender"></InputLabel>
                          <Select
                            name="gender"
                            labelId="gender"
                            variant="outlined"
                            value={values.gender}
                            onChange={handleChange}
                          >
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                            <MenuItem value={'other'}>Other</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                        <Typography className={classes.typography}>birth date</Typography>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            name="birthDate"
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            value={values.birthDate}
                            InputAdornmentProps={{ position: 'start' }}
                            onChange={(newDate) => {
                              setFieldValue('birthDate', newDate);
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                    <Grid item container justify="space-between">
                      <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                        <Typography className={classes.typography}>phone number</Typography>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8}>
                        <TextField
                          name="phoneNumber"
                          variant="outlined"
                          placeholder="123456789"
                          fullWidth
                          error={errors.phoneNumber ? true : false}
                          helperText={errors.phoneNumber}
                          value={values.phoneNumber}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                        <Typography className={classes.address}>where you live</Typography>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8}>
                        <TextField
                          name="address"
                          variant="outlined"
                          placeholder="Address"
                          fullWidth
                          error={errors.address ? true : false}
                          helperText={errors.address}
                          value={values.address}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                        <Typography className={classes.typography}>describe yourself</Typography>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8}>
                        <TextField
                          name="description"
                          variant="outlined"
                          multiline
                          rows={10}
                          placeholder="About you"
                          fullWidth
                          error={errors.description ? true : false}
                          helperText={errors.description}
                          value={values.description}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container justify="flex-end">
                      <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        className={classes.button}
                        disabled={
                          !!errors.firstName ||
                          !!errors.lastName ||
                          !!errors.gender ||
                          !!errors.phoneNumber ||
                          !!errors.address ||
                          !!errors.description
                        }
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
}
