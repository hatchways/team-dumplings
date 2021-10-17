import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import { Typography, Grid, TextField, MenuItem, Select, Box, FormControl, Paper, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function EditProfile(): JSX.Element {
  const classes = useStyles();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [birthDate, setBirthDate] = useState<Date | null>(new Date('1988-05-15'));
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  return (
    <React.Fragment>
      <CssBaseline />
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
                    <Typography className={classes.typography}>FIRST NAME</Typography>
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
                    <Typography className={classes.typography}>LAST NAME</Typography>
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
                    <Typography className={classes.typography}>GENDER</Typography>
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
                    <Typography className={classes.typography}>BIRTH DATE</Typography>
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
                <Grid item container spacing={2}>
                  <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                    <Typography className={classes.typography}>EMAIL ADDRESS</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <TextField
                      id="email"
                      variant="outlined"
                      placeholder="john.doe@gmail.com"
                      fullWidth
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container justify="space-between">
                  <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                    <Typography className={classes.typography}>PHONE NUMBER</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <TextField
                      id="phoneNumber"
                      variant="outlined"
                      placeholder="123456789"
                      fullWidth
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item className={classes.gridItem} xs={4} sm={4} md={4} lg={4}>
                    <Typography className={classes.typography} style={{ marginRight: '0.25em' }}>
                      WHERE YOU LIVE
                    </Typography>
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
                    <Typography className={classes.typography}>DESCRIBE YOURSELF</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <TextField
                      id="desc"
                      variant="outlined"
                      multiline
                      rows={10}
                      placeholder="About you"
                      fullWidth
                      value={desc}
                      onChange={(event) => {
                        setDesc(event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container justify="flex-end">
                  <Button
                    variant="contained"
                    size="large"
                    style={{
                      width: '50%',
                      height: 60,
                      backgroundColor: '#b22222',
                      color: '#ffffff',
                      marginTop: '1em',
                      borderRadius: 5,
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
