import { useEffect, useState } from 'react';
import useStyles from './useStyles';
import { Typography, IconButton, Box, Dialog, DialogContent } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useParams } from 'react-router-dom';
import CommentIcon from '@material-ui/icons/Comment';
import { fetchBlog, postLike } from '../../../helpers/APICalls/blogs';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { Blog } from '../../../interface/Blogs';
import { useAuth } from '../../../context/useAuthContext';
import ListComments from '../Comments/ListComments';

const FetchBlog = (): JSX.Element => {
  const { root, img, title, body, liked, dialogStyle } = useStyles();

  const [isLiked, setIsLiked] = useState(false);
  const [blog, setBlog] = useState<Blog>();
  const [open, setOpen] = useState<boolean>(false);

  const { updateSnackBarMessage } = useSnackBar();
  const params = useParams();
  const { loggedInUser } = useAuth();

  const { blogId } = Object(params);

  const handleLikeClick = () => {
    const userId = loggedInUser?.id;

    postLike(userId, blogId).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setIsLiked(true);
      } else {
        updateSnackBarMessage('An expected error. please try again later!');
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    fetchBlog(blogId).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setBlog(data.success.blog);
        setIsLiked(data.success.isLiked);
      } else updateSnackBarMessage('An expected error. please try again later!');
    });
  }, [blogId, updateSnackBarMessage]);

  return (
    <>
      <Box className={root}>
        <Typography className={title}>{blog?.title}</Typography>
        <img src={blog?.image} className={img} />
        <Typography className={body}>{blog?.description}</Typography>
        <Box>
          <IconButton disabled={isLiked} onClick={() => handleLikeClick()}>
            <ThumbUpAltIcon className={isLiked ? liked : ''} />
          </IconButton>
          <IconButton onClick={handleCommentClick}>
            <CommentIcon />
          </IconButton>
        </Box>
        <Dialog open={open} onClose={handleClose} className={dialogStyle} style={{ overflow: 'hidden' }}>
          <ListComments />
        </Dialog>
      </Box>
    </>
  );
};

export default FetchBlog;
