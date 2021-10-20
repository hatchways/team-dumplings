import { useState, Fragment } from 'react';
import useStyles from './useStyles';
import { Typography, Grid, TextField, MenuItem, Select, Box, FormControl, Paper, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { editProfile } from '../../helpers/APICalls/profile';

import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';

export default function EditProfile(): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [birthDate, setBirthDate] = useState<Date | null>(new Date('1988-05-15'));
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const auth = useAuth();

  const onSave = async () => {
    const inputs = { firstName, lastName, gender, birthDate, phoneNumber, address, description };
    const id = auth.loggedInUser ? auth.loggedInUser.profile : '';
    editProfile(inputs, id).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        updateSnackBarMessage('Your profile has been updated successfully');
      } else {
        updateSnackBarMessage('An unexpected error occurred. Please try again later');
      }
    });
  };

  return (
    <Fragment>
      <Paper elevation={24} variant="outlined" className={classes.paper}>
        <Grid container direction="column" justify="center" alignItems="center" style={{ position: 'absolute' }}>
          <Grid item>
            <Typography variant="h4" className={classes.title}>
              Edit Profile
            </Typography>
          </Grid>
          <Grid item>
            <Box component="form">
              <Grid item container direction="column" alignItems="center" justify="center" spacing={1}>
                <Grid item container spacing={2}>
                  <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                    <Typography className={classes.typography}>first name</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <TextField
                      id="firstName"
                      variant="outlined"
                      placeholder="John"
                      fullWidth
                      value={firstName}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                    <Typography className={classes.typography}>last name</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <TextField
                      id="lastName"
                      variant="outlined"
                      placeholder="Doe"
                      fullWidth
                      value={lastName}
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
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
                        id="gender"
                        labelId="gender"
                        variant="outlined"
                        value={gender}
                        onChange={(event) => {
                          setGender(event.target.value as string);
                        }}
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
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        format="MM/dd/yyyy"
                        value={birthDate}
                        InputAdornmentProps={{ position: 'start' }}
                        onChange={(newDate) => {
                          setBirthDate(newDate);
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
                      id="phoneNumber"
                      variant="outlined"
                      placeholder="123456789"
                      fullWidth
                      value={phoneNumber}
                      onChange={(event) => {
                        setPhoneNumber(event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                    <Typography className={classes.address}>where you live</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <TextField
                      id="address"
                      variant="outlined"
                      placeholder="Address"
                      fullWidth
                      value={address}
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                    <Typography className={classes.typography}>describe yourself</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <TextField
                      id="desc"
                      variant="outlined"
                      multiline
                      rows={10}
                      placeholder="About you"
                      fullWidth
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container justify="flex-end">
                  <Button variant="contained" size="large" onClick={onSave} className={classes.button}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
}
