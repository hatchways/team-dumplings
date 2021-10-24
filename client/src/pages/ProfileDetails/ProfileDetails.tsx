import { Fragment, useState } from 'react';
import useStyles from './useStyles';
import { Paper, Grid, Typography, Avatar, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const baseUrl = 'https://team-dumplings.s3.amazonaws.com/';

const sitter = {
  name: 'Norma Beyrs',
  description: 'Loving pet sitter',
  aboutMe: 'animals are my passion! i will look after your pets with loving care.',
  imgUrl: baseUrl + 'dogSitter.jpg',
  backgroundImage: baseUrl + 'dogSitterBackground.jpg',
  rate: 4,
  price: 14,
  location: 'Toronto Canada',
  aboutMeImgs: ['dog01.jpeg', 'dog02.jpeg', 'dog03.jpeg', 'dog04.jpeg'],
};

const ProfileDetails = (): JSX.Element => {
  const classes = useStyles();
  const [dropInDate, setDropInDate] = useState<Date | null>(new Date());
  const [dropOffDate, setDropOffDate] = useState<Date | null>(new Date());

  return (
    <Fragment>
      <Grid container justify="space-evenly">
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <Paper elevation={15}>
            <Grid container direction="column">
              <Grid item container className={classes.gridContainer}>
                <img src={sitter.backgroundImage} alt="profile background" className={classes.backgroundImage} />
              </Grid>
              <Grid item className={classes.gridItem}>
                <Grid item container direction="column" alignItems="center">
                  <Grid item>
                    <Avatar className={classes.avatar} alt="profile image" src={sitter.imgUrl} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" className={classes.profileTypography}>
                      {sitter.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{sitter.description}</Typography>
                  </Grid>
                  <Grid item container justify="center" className={classes.gridItemLocation}>
                    <LocationOnIcon />
                    <Typography>{sitter.location}</Typography>
                  </Grid>
                </Grid>
                <Grid item container direction="column" className={classes.aboutMeContainer}>
                  <Grid item>
                    <Typography variant="h4" className={classes.profileTypography}>
                      About me
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{sitter.aboutMe}</Typography>
                  </Grid>
                  <Grid item>
                    {sitter.aboutMeImgs.map((image) => (
                      <img key={image} src={baseUrl + image} alt={image} className={classes.image} />
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Paper elevation={15} className={classes.requestPaper}>
            <Grid container direction="column">
              <Grid item container direction="column" alignItems="center">
                <Typography variant="h3" align="center">
                  ${sitter.price}/hr
                </Typography>
                <Rating name="read-only" value={sitter.rate} readOnly />
              </Grid>
              <Grid item className={classes.requestGridItem}>
                <Typography variant="h4" className={classes.requestTypography}>
                  Drop in
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    label="Drop in Date & Time"
                    value={dropInDate}
                    onChange={(date) => {
                      setDropInDate(date);
                    }}
                  />
                </MuiPickersUtilsProvider>
                <Typography variant="h4" className={classes.requestTypography}>
                  Drop off
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    label="Drop off Date & Time"
                    value={dropOffDate}
                    onChange={(date) => {
                      setDropOffDate(date);
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item container justify="center">
                <Button variant="outlined" size="large" className={classes.requestButton}>
                  SEND REQUEST
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ProfileDetails;
