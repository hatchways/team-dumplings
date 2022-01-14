import { Avatar, Box, Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import moment from 'moment';
import useStyles from './style/useStyles';
import { isLikedComment, likeComment } from '../../helpers/APICalls/rating';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useEffect, useState } from 'react';

interface Props {
  rating: number;
  comment: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  likes: number;
  id: string;
}

const Comment = ({ rating, comment, createdAt, firstName, lastName, likes, id }: Props): JSX.Element => {
  const classes = useStyles();
  const [likesCount, setLikesCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, isLoading] = useState(true);
  const { updateSnackBarMessage } = useSnackBar();

  const saveIsLikedComment = (like: boolean) => {
    setIsLiked(like);
  };

  const handleLikeComment = () => {
    likeComment(id, isLiked ? -1 : +1)
      .then((res) => {
        if (res.rating) {
          isLoading(true);
          updateSnackBarMessage('Like ❤️');
        }
      })
      .catch((error) => {
        updateSnackBarMessage(error);
      });
  };
  useEffect(() => {
    let effect = true;
    if (loading) {
      isLikedComment(id).then((res) => {
        saveIsLikedComment(res.commentAndReaction?.like || false);
        setLikesCount(res?.commentAndReaction?.rating?.likes || 0);
      });
      isLoading(false);
    }
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      effect = false;
    };
  }, [loading, id]);
  return (
    <>
      <Box>
        <Card
          elevation={0}
          style={{
            maxWidth: '80%',
            margin: 5,
            border: '1px solid rgba(100, 100, 100, 0.1) ',
          }}
        >
          <CardHeader
            avatar={<Avatar aria-label="avatar">{`${firstName.slice(0, 1)}${lastName.slice(0, 1)}`}</Avatar>}
            action={
              <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                {Boolean(likesCount) && <Typography className={classes.likes}>{likesCount}</Typography>}
                <IconButton aria-label="likes" onClick={handleLikeComment}>
                  <ThumbUpIcon className={isLiked ? classes.redlikeIcon : ''} />
                </IconButton>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            }
            title={`${firstName}  ${lastName}`}
            subheader={
              <>
                <Typography>{moment(new Date(createdAt)).fromNow()}</Typography>
                <Rating name="rating" value={rating} readOnly size="small" />
              </>
            }
          ></CardHeader>

          <CardContent>
            <Typography variant="body1">{comment}</Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Comment;
