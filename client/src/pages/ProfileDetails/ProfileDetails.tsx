import { Fragment, useState, useEffect } from 'react';
import useStyles from './useStyles';
import NavBar from '../../components/NavBar/NavBar';
import { Paper, Grid, Typography, Avatar, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { getProfile } from '../../helpers/APICalls/profile';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Profile } from '../../interface/Profile';
import { createRequest } from '../../helpers/APICalls/createRequests';

const baseUrl = 'https://team-dumplings.s3.amazonaws.com/';

interface Params {
  linkToProfile: string;
}

const ProfileDetails = (): JSX.Element => {
  const classes = useStyles();

  const { updateSnackBarMessage } = useSnackBar();
  const { linkToProfile }: Params = useParams();

  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(new Date());
  const [sitter, setSitter] = useState<Profile>();
  const [sitterId, setSitterId] = useState<string>(linkToProfile);

  const history = useHistory();
  const onSendRequest = () => {
    createRequest({ sitterId, start, end }).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      }
      if (data.requests) {
        updateSnackBarMessage('Your request has been sent successfully');
      } else {
        updateSnackBarMessage('An unexpected error occurred. Please try again later');
      }
    });
  };

  useEffect(() => {
    getProfile(sitterId).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      }
      if (data.success) {
        setSitter(data.success.profile);
      } else {
        updateSnackBarMessage('An unexpected error occurred. Please try again later');
      }
    });
  }, [history, sitterId, updateSnackBarMessage]);

  return (
    <Fragment>
      <NavBar />
      {sitter ? (
        <Grid container className={classes.rootContainer} justify="space-evenly">
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <Paper elevation={15}>
              <Grid container direction="column">
                <Grid item container className={classes.gridContainer}>
                  <img
                    src={baseUrl + sitter.backgroundPhotoName}
                    alt="profile background"
                    className={classes.backgroundImage}
                  />
                </Grid>
                <Grid item className={classes.gridItem}>
                  <Grid item container direction="column" alignItems="center">
                    <Grid item>
                      <Avatar className={classes.avatar} alt="profile image" src={baseUrl + sitter.profilePhotoName} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h4" className={classes.profileTypography}>
                        {sitter.firstName + ' ' + sitter.lastName}
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
                      {sitter.gallery
                        ? sitter.gallery.map((image) => (
                            <img key={image} src={baseUrl + image} alt={image} className={classes.image} />
                          ))
                        : null}
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
                      value={start}
                      onChange={(date) => {
                        setStart(date);
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <Typography variant="h4" className={classes.requestTypography}>
                    Drop off
                  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      label="Drop off Date & Time"
                      value={end}
                      onChange={(date) => {
                        setEnd(date);
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item container justify="center">
                  <Button variant="outlined" size="large" className={classes.requestButton} onClick={onSendRequest}>
                    send request
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : null}
    </Fragment>
  );
};

export default ProfileDetails;
