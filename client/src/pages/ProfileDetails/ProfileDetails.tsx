/* eslint-disable @typescript-eslint/no-explicit-any */
import DateFnsUtils from '@date-io/date-fns';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ErrorIcon from '@material-ui/icons/Error';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import { Rating } from '@material-ui/lab';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { getProfile } from '../../helpers/APICalls/profile';
import { createComment, listComments } from '../../helpers/APICalls/reviews';
import { Profile } from '../../interface/Profile';
import { Comment } from '../../interface/Review';
import CommentUI from './Comment';
import ProgressBar from './ProgressBar';
import useStyles from './useStyles';

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
  const location = useLocation();
  const history = useHistory();
  const [profile, setProfile] = useState<Profile | undefined>();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [gRating, setGRating] = useState('0');
  const [canComment, setCanComment] = useState(false);

  const [ratingsByValue, setRatingsByValue] = useState({
    sum1Ratings: 0,
    sum2Ratings: 0,
    sum3Ratings: 0,
    sum4Ratings: 0,
    sum5Ratings: 0,
  });
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const { loggedInUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const { updateSnackBarMessage } = useSnackBar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getRatingMessage = (): string => {
    switch (rating) {
      case 0:
        return 'Rating required';
      case 1:
        return 'Hated it';
      case 2:
        return "Didn't like it";
      case 3:
        return 'Just OK';
      case 4:
        return 'Liked it';
      case 5:
        return 'Loved it';
      default:
        return 'Rating required';
    }
  };
  const handleClose = () => {
    setOpen(false);
    setRating(0);
    setComment('');
  };

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (e: any) => {
    setRating(parseInt(e.target.value));
  };
  const saveProfile = (profile: Profile) => {
    setProfile(profile);
  };
  const saveComments = (comments: Comment[]) => {
    setComments(comments);
  };
  const setGlobalRating = (comments: Comment[]) => {
    const sumRating = comments.reduce((a, { rating }) => a + rating, 0);
    const sum1Ratings = (comments.filter((comment) => comment.rating == 1).length * 100) / comments.length;
    const sum2Ratings = (comments.filter((comment) => comment.rating == 2).length * 100) / comments.length;
    const sum3Ratings = (comments.filter((comment) => comment.rating == 3).length * 100) / comments.length;
    const sum4Ratings = (comments.filter((comment) => comment.rating == 4).length * 100) / comments.length;
    const sum5Ratings = (comments.filter((comment) => comment.rating == 5).length * 100) / comments.length;
    setRatingsByValue({ sum1Ratings, sum2Ratings, sum3Ratings, sum4Ratings, sum5Ratings });
    if (!comments.length) {
      setGRating('0 reviews');
    } else setGRating((sumRating / comments.length).toFixed(1));
  };
  const handleSendComment = async () => {
    if (profile?._id) {
      const response = await createComment({ text: comment, rating, profile: profile._id });
      if (response.rating) {
        setLoading(true);
        setOpen(false);
        updateSnackBarMessage('Comment sent succufully !');
      } else if (response.error) {
        updateSnackBarMessage(response.error);
      }
    }
  };
  const saveCanComment = (profileId: string, userId: string, role: string) => {
    if (profileId === userId || role === 'sitter') {
      setCanComment(true);
    }
  };
  useEffect(() => {
    let effect = true;
    if (location.search) {
      setLoading(true);
      const profileId = location.search.split('?')[1];
      saveCanComment(profileId, loggedInUser?.profile as string, loggedInUser?.role as string);
      getProfile(profileId)
        .then((res) => {
          if (res.success && res.success.profile) saveProfile(res.success?.profile);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });

      listComments(profileId)
        .then((res) => {
          if (res?.ratings) {
            saveComments(res.ratings);
            setGlobalRating(res.ratings);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
      setLoading(false);
    }
    return () => {
      effect = false;
    };
  }, [location, history, loading, loggedInUser]);
  return (
    <Fragment>
      <NavBar />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Review by {loggedInUser?.username}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Reviews are public and editable. Everyone can see your Google Account name and photo. Developers can also
            see your country and device information (such as language, model, and OS version) and may use this
            information to respond to you.
          </DialogContentText>
          <TextField
            className={classes.commentArea}
            multiline
            placeholder="Tell others what you think about this sitter. Would you recommend it, and why?"
            InputProps={{
              classes: { input: classes.commentArea },
              disableUnderline: true,
            }}
            onChange={handleCommentChange}
          ></TextField>
          <Typography variant="body2">Most helpful reviews have 100 words or more</Typography>
          <br />
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gridGap={10}>
            <Rating size="large" onChange={handleRatingChange}></Rating>
            <Typography>{getRatingMessage()}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={!Boolean(rating)} onClick={handleSendComment} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container className={classes.rootContainer} justify="space-evenly">
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
                      {profile?.firstName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{sitter.description}</Typography>
                  </Grid>
                  <Grid item container justify="center" className={classes.gridItemLocation}>
                    <LocationOnIcon />
                    <Typography>{profile?.address}</Typography>
                  </Grid>
                </Grid>
                <Grid item container direction="column" className={classes.aboutMeContainer}>
                  <Box
                    pt={5}
                    display="flex"
                    flexDirection={'column'}
                    alignItems="center"
                    alignContent="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Typography variant="h4" className={classes.profileTypography}>
                        {profile?.description}
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
                  </Box>
                </Grid>
                <Box display={'flex'} flexDirection={'column'} pl={10} pt={5}>
                  <Box display={'flex'}>
                    <Typography className={classes.reviewsTitle}>reviews</Typography>
                    <Box
                      display={'flex'}
                      flexDirection={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      ml={'auto'}
                      pr={10}
                    >
                      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mb={2}>
                        <ErrorIcon className={classes.reviewIcon} />
                        <Link to={'/reviewPolicy'} className={classes.reviewLink}>
                          Review policy and info
                        </Link>
                      </Box>
                      <Button
                        onClick={handleClickOpen}
                        disabled={canComment}
                        className={classes.reviewBtn}
                        variant="outlined"
                        startIcon={<CreateIcon />}
                      >
                        Write a Review
                      </Button>
                    </Box>
                  </Box>
                  <Box display={'flex'} flexDirection={'row'} pt={2}>
                    <Box mr={'auto'}>
                      <Typography className={classes.globalRatingValue}>{gRating}</Typography>
                      <Rating name="Globalrating" value={parseInt(gRating)} readOnly />
                      <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <PersonIcon className={classes.userIcon} /> <Typography>{comments.length} Total</Typography>
                      </Box>
                    </Box>
                    <Box width={'60%'} pr={10} pt={1}>
                      <ProgressBar progress={ratingsByValue.sum5Ratings} value={5} style={classes.progress5} />
                      <ProgressBar progress={ratingsByValue.sum4Ratings} value={4} style={classes.progress4} />
                      <ProgressBar progress={ratingsByValue.sum3Ratings} value={3} style={classes.progress3} />
                      <ProgressBar progress={ratingsByValue.sum2Ratings} value={2} style={classes.progress2} />
                      <ProgressBar progress={ratingsByValue.sum1Ratings} value={1} style={classes.progress1} />
                    </Box>
                  </Box>
                </Box>
                <Box display={'flex'} flexDirection={'column'} pl={10} pt={5} pb={10}>
                  {comments.map((comment) => (
                    <>
                      <CommentUI
                        key={comment._id}
                        rating={comment.rating}
                        comment={comment.text}
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        createdAt={comment.createdAt!}
                        firstName={comment?.reviewer?.firstName as string}
                        lastName={comment?.reviewer?.lastName as string}
                      />
                    </>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Paper elevation={15} className={classes.requestPaper}>
            <Grid container direction="column">
              <Grid item container direction="column" alignItems="center">
                <Typography variant="h3" align="center">
                  ${profile?.rate}/hrS
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
                  send request
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
