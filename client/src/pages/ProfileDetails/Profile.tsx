/* eslint-disable @typescript-eslint/no-explicit-any */
import DateFnsUtils from '@date-io/date-fns';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ErrorIcon from '@material-ui/icons/Error';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import { Alert, Rating } from '@material-ui/lab';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { getProfile } from '../../helpers/APICalls/profile';
import { createComment, listComments } from '../../helpers/APICalls/rating';
import { Profile } from '../../interface/Profile';
import { Comment } from '../../interface/Rating';
import CommentUI from './CommentUI';
import ProgressBar from './ProgressBarUI';
import useStyles from './style/useStyles';

const baseUrl = 'https://team-dumplings.s3.amazonaws.com/';

const sitter = {
  aboutMe: 'animals are my passion! i will look after your pets with loving care.',
  imgUrl: baseUrl + 'dogSitter.jpg',
  backgroundImage: baseUrl + 'dogSitterBackground.jpg',
  aboutMeImgs: ['dog01.jpeg', 'dog02.jpeg', 'dog03.jpeg', 'dog04.jpeg'],
};

const ProfileDetails = (): JSX.Element => {
  const classes = useStyles();
  const [dropInDate, setDropInDate] = useState<Date | null>(new Date());
  const [dropOffDate, setDropOffDate] = useState<Date | null>(new Date());
  const location = useLocation();
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();

  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[] | undefined>([]);
  const { loggedInUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<Profile | undefined>();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const [canComment, setCanComment] = useState(false);

  const [skip, setSkip] = useState(0);
  const [canLoadMore, setLoadMore] = useState(false);

  const saveProfile = (profile: Profile) => {
    setProfile(profile);
  };

  const saveComments = (comments: Comment[]) => {
    setComments((prevComments) => prevComments?.concat(comments));
    setLoadMore(!Boolean(comments.length));
  };

  const saveCanComment = (profileId: string, userId: string, role: string) => {
    if (profileId === userId || role === 'sitter') {
      setCanComment(true);
    }
  };
  const handleSendComment = async () => {
    if (profile?._id) {
      const response = await createComment({ text: comment, rating, profile: profile._id });
      if (response.rating) {
        setComments(undefined);
        setLoading(true);
        setOpen(false);
        updateSnackBarMessage('Comment sent succufully !');
      } else if (response.error) {
        updateSnackBarMessage(response.error);
      }
    }
  };
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

  const handleRatingChange = (e: any) => {
    setRating(parseInt(e.target.value));
  };
  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  const handleLoadMoreReviews = () => {
    setSkip((prevSkip) => prevSkip + 2);
  };

  const [ratingMenu, setRatingMenu] = useState<any>({ newset: false, rating: false, relevent: true });
  const [starMenu, setStarMenu] = useState<any>({
    '1star': false,
    '2star': false,
    '3star': false,
    '4star': false,
    '5star': false,
    allStars: true,
  });
  const [ratingMenuText, setRatingMenuText] = useState('Most relevent');
  const [starMenuText, setStarMenuText] = useState('All ratings');
  const [starsFilter, setStarsFilter] = useState<number | undefined>(undefined);
  const [sortFilter, setSortFilter] = useState<string>('-likes');
  const [anchorElR, setAnchorElR] = useState<null | HTMLElement>(null);
  const [anchorElR1, setAnchorElR1] = useState<null | HTMLElement>(null);

  // stars menu: R1
  const handleClickR1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElR1(event.currentTarget);
  };

  const getStarsFilter = (key: string): number | undefined => {
    if (parseInt(key.slice(0, 1))) {
      return parseInt(key.slice(0, 1));
    }
    return undefined;
  };

  const getSortFilter = (key: string): string => {
    switch (key) {
      case 'newset':
        return '-createdAt';
      case 'rating':
        return '-rating';
      case 'relevent':
        return '-likes';

      default:
        return '-likes';
    }
  };

  const handleCloseMenuR1 = (event: any) => {
    if (event.target.ariaValueText) {
      setStarMenuText(event.target.ariaValueText);
      setStarMenu((prevSate: any) => {
        for (const key in prevSate) prevSate[key] = event.target.id == key;
        setStarsFilter(getStarsFilter(event.target.id));
        setComments(undefined);
        setSkip(0);
        setLoadMore(false);
        setLoading(true);
        return prevSate;
      });
    }
    setAnchorElR1(null);
  };

  // rating menu : R1
  const handleClickR = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElR(event.currentTarget);
  };

  const handleCloseMenuR = (event: any) => {
    if (event.target.ariaValueText) {
      setRatingMenuText(event.target.ariaValueText);
      setRatingMenu((prevSate: any) => {
        for (const key in prevSate) prevSate[key] = event.target.id == key;
        setSortFilter(getSortFilter(event.target.id));
        setComments(undefined);
        setSkip(0);
        setLoadMore(false);
        setLoading(true);
        return prevSate;
      });
    }
    setAnchorElR(null);
  };

  useEffect(() => {
    let effect = true;

    if (location.search && skip > 0) {
      const profileId = location.search.split('?')[1];

      listComments(profileId, 2, skip, starsFilter, sortFilter)
        .then((res) => {
          if (res?.ratings) {
            saveComments(res.ratings);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    }
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      effect = false;
    };
  }, [location, skip, starsFilter, sortFilter]);

  useEffect(() => {
    let effect = true;
    if (location.search && loggedInUser && loading) {
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

      listComments(profileId, 2, 0, starsFilter, sortFilter)
        .then((res) => {
          if (res?.ratings) {
            setComments(res.ratings);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
      setLoading(false);
    }
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      effect = false;
    };
  }, [location, history, loggedInUser, loading, starsFilter, sortFilter]);

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
                    <Typography variant="body2">{profile?.description}</Typography>
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
                    <Box>
                      <Typography className={classes.reviewsTitle}>reviews</Typography>
                      <Box display={'flex'}>
                        <Box>
                          <Button
                            aria-controls="r-menu"
                            aria-haspopup="true"
                            onClick={handleClickR}
                            endIcon={<ExpandMoreIcon />}
                          >
                            {ratingMenuText}
                          </Button>
                          <Menu
                            elevation={1}
                            id="r-menu"
                            anchorEl={anchorElR}
                            keepMounted
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                            transformOrigin={{
                              vertical: -40,
                              horizontal: 'center',
                            }}
                            open={Boolean(anchorElR)}
                            onClose={handleCloseMenuR}
                          >
                            <MenuItem
                              id="newset"
                              aria-valuetext="Newest"
                              onClick={handleCloseMenuR}
                              selected={ratingMenu.newset}
                            >
                              Newest
                            </MenuItem>
                            <MenuItem
                              id="rating"
                              aria-valuetext="Rating"
                              onClick={handleCloseMenuR}
                              selected={ratingMenu.rating}
                            >
                              Rating
                            </MenuItem>
                            <MenuItem
                              id="relevent"
                              aria-valuetext="Most relevent"
                              onClick={handleCloseMenuR}
                              selected={ratingMenu.relevent}
                            >
                              Most relevent
                            </MenuItem>
                          </Menu>
                        </Box>

                        <Box>
                          <Button
                            aria-controls="r1-menu"
                            aria-haspopup="true"
                            onClick={handleClickR1}
                            endIcon={<ExpandMoreIcon />}
                          >
                            {starMenuText}
                          </Button>
                          <Menu
                            elevation={1}
                            id="r1-menu"
                            anchorEl={anchorElR1}
                            keepMounted
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                            transformOrigin={{
                              vertical: -40,
                              horizontal: 'center',
                            }}
                            open={Boolean(anchorElR1)}
                            onClose={handleCloseMenuR1}
                          >
                            <MenuItem
                              id="allStars"
                              aria-valuetext="All Ratings"
                              selected={starMenu.allStars}
                              onClick={handleCloseMenuR1}
                            >
                              All Ratings
                            </MenuItem>
                            <MenuItem
                              id="1star"
                              aria-valuetext="1 Star"
                              selected={starMenu['1star']}
                              onClick={handleCloseMenuR1}
                            >
                              <Rating name="1star" value={1} readOnly />
                            </MenuItem>
                            <MenuItem
                              id="2star"
                              aria-valuetext="2 Star's"
                              selected={starMenu['2star']}
                              onClick={handleCloseMenuR1}
                            >
                              <Rating name="2star" value={2} readOnly />
                            </MenuItem>
                            <MenuItem
                              id="3star"
                              aria-valuetext="3 Star's"
                              selected={starMenu['3star']}
                              onClick={handleCloseMenuR1}
                            >
                              <Rating name="3star" value={3} readOnly />
                            </MenuItem>
                            <MenuItem
                              id="4star"
                              aria-valuetext="4 Star's"
                              selected={starMenu['4star']}
                              onClick={handleCloseMenuR1}
                            >
                              <Rating name="4star" value={4} readOnly />
                            </MenuItem>
                            <MenuItem
                              id="5star"
                              aria-valuetext="5 Star's"
                              selected={starMenu['5star']}
                              onClick={handleCloseMenuR1}
                            >
                              <Rating name="5star" value={5} readOnly />
                            </MenuItem>
                          </Menu>
                        </Box>
                      </Box>
                    </Box>
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
                      <Typography className={classes.globalRatingValue}>{profile?.sumRating}</Typography>
                      <Rating name="Globalrating" value={Math.round(profile?.sumRating as number)} readOnly />
                      <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <PersonIcon className={classes.userIcon} /> <Typography>{profile?.total} Total</Typography>
                      </Box>
                    </Box>
                    {profile && profile.ratingsByValue && profile.total && (
                      <Box width={'60%'} pr={10} pt={1}>
                        <ProgressBar
                          progress={(profile?.ratingsByValue[5] * 100) / profile.total}
                          value={5}
                          style={classes.progress5}
                        />
                        <ProgressBar
                          progress={(profile?.ratingsByValue[4] * 100) / profile.total}
                          value={4}
                          style={classes.progress4}
                        />
                        <ProgressBar
                          progress={(profile?.ratingsByValue[3] * 100) / profile.total}
                          value={3}
                          style={classes.progress3}
                        />
                        <ProgressBar
                          progress={(profile?.ratingsByValue[2] * 100) / profile.total}
                          value={2}
                          style={classes.progress2}
                        />
                        <ProgressBar
                          progress={(profile?.ratingsByValue[1] * 100) / profile.total}
                          value={1}
                          style={classes.progress1}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box display={'flex'} flexDirection={'column'} pl={10} pt={5} pb={10}>
                  {comments && comments?.length > 0 ? (
                    <>
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
                            likes={comment?.likes as number}
                            id={comment._id as string}
                          />
                        </>
                      ))}
                      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mr={10}>
                        <Button
                          onClick={handleLoadMoreReviews}
                          disabled={canLoadMore}
                          className={classes.reviewBtn}
                          variant="outlined"
                        >
                          Read more Reviews
                        </Button>
                      </Box>
                    </>
                  ) : comments ? (
                    <>
                      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mr={10}>
                        <Alert severity={'error'}>{`No ${
                          starsFilter ? `${starsFilter} stars` : ''
                        } reviews yet, write one now? `}</Alert>
                      </Box>
                    </>
                  ) : (
                    <>
                      Loading <CircularProgress />
                    </>
                  )}
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
                  ${profile?.rate}/hr
                </Typography>
                <Rating name="globalRating" value={Math.round(profile?.sumRating as number)} readOnly />
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
