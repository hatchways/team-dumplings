import { Fragment, useState, useEffect } from 'react';
import useStyles from './useStyles';
import { Paper, Grid, Typography, Avatar, Button, IconButton } from '@material-ui/core';
import { updateProfilePhotos, deleteProfilePhotos } from '../../helpers/APICalls/uploadPhotos';
import { getProfile } from '../../helpers/APICalls/profile';
import { useHistory } from 'react-router-dom';

import DeleteIcon from '@material-ui/icons/Delete';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';

const baseUrl = 'https://team-dumplings.s3.amazonaws.com/';

const ProfilePhoto = () => {
  const classes = useStyles();

  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();
  const history = useHistory();

  const [images, setImages] = useState<any>([]);
  const [photoName, setPhotoName] = useState<string | undefined>('defaultAvatar.png');

  const onUpdatePhoto = () => {
    const id = loggedInUser ? loggedInUser.profile : '';

    const data = new FormData();
    const profileImage = images[0];
    data.append('profilePhoto', profileImage);

    if (!profileImage) return updateSnackBarMessage('Please choose a photo');

    updateProfilePhotos(data, id).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        setPhotoName(data.success.data);
        updateSnackBarMessage('Your profile photo has been updated successfully');
      } else {
        updateSnackBarMessage('An unexpected error occurred. Please try again later');
      }
    });
  };

  const onDeletePhoto = () => {
    const id = loggedInUser ? loggedInUser.profile : '';
    const inputs = { photoName: photoName ? photoName : '', photoType: 'profilePhoto' };
    deleteProfilePhotos(inputs, id).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        setPhotoName('defaultAvatar.png');
        updateSnackBarMessage('Your profile photo has been deleted successfully');
      } else {
        updateSnackBarMessage('An unexpected error occurred. Please try again later');
      }
    });
  };

  useEffect(() => {
    const id = loggedInUser ? loggedInUser.profile : '';
    getProfile(id).then((data) => {
      if (data.success) {
        if (data.success.profile.profilePhotoName === null) {
          setPhotoName('defaultAvatar.png');
        } else setPhotoName(data.success.profile.profilePhotoName);
      }
    });
  }, [history, loggedInUser]);

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
          <Typography variant="h2" className={classes.typography}>
            Profile Photo
          </Typography>
          <Grid item className={classes.gridItemAvatar}>
            <Avatar className={classes.avatar} alt="profile image" src={baseUrl + photoName} />
            <IconButton component="label" style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <CameraAltIcon className={classes.cameraIcon} />
              <input
                type="file"
                accept="image/*"
                name="profilePhoto"
                hidden
                onChange={(event) => {
                  setImages(event.target.files);
                }}
              />
            </IconButton>
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
            <Button variant="outlined" className={classes.button} onClick={onUpdatePhoto}>
              Update your profile Photo
            </Button>
          </Grid>
          <Grid container justify="center">
            <Button startIcon={<DeleteIcon />} onClick={onDeletePhoto}>
              Delete Photo
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default ProfilePhoto;
