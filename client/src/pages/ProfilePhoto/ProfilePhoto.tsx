import { Fragment } from 'react';
import { Paper, Grid, Typography, Avatar, Button } from '@material-ui/core';
import useStyles from './useStyles';
import DeleteIcon from '@material-ui/icons/Delete';

const baseUrl = 'https://team-dumplings.s3.amazonaws.com/';
const imgUrl = baseUrl + 'img.jpeg';

const ProfilePhoto = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
          <Grid item>
            <Typography variant="h2" className={classes.typography}>
              Profile Photo
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar} alt="profile image" src={imgUrl} />
          </Grid>
          <Grid item>
            <Typography variant="body2" className={classes.textTypograpgy}>
              Be sure to use a photo that
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" className={classes.textTypograpgy}>
              clearly shows your face
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" className={classes.button}>
              Upload a file from your device
            </Button>
          </Grid>
          <Grid item>
            <Grid container justify="center">
              <Grid item>
                <DeleteIcon className={classes.icon} />
              </Grid>
              <Grid item>
                <Button>Delete Photo</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default ProfilePhoto;
