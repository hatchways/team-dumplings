import { useEffect, useState } from 'react';
import useStyles from './useStyles';
import { Typography, IconButton, Box } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useParams } from 'react-router-dom';
import CommentIcon from '@material-ui/icons/Comment';
import { fetchBlog } from '../../../helpers/APICalls/blogs';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { Blog } from '../../../interface/Blogs';

const FetchBlog = (): JSX.Element => {
  const { root, img, title, body } = useStyles();
  const [blog, setBlog] = useState<Blog>();
  const { updateSnackBarMessage } = useSnackBar();
  const params = useParams();
  const { id } = Object(params);

  useEffect(() => {
    fetchBlog(id).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setBlog(data.success.blog);
      } else updateSnackBarMessage('An expected error. please try again later!');
    });
  }, [id, updateSnackBarMessage]);

  return (
    <>
      <Box className={root}>
        <Typography className={title}>{blog?.title}</Typography>
        <img src={blog?.image} className={img} />
        <Typography className={body}>{blog?.description}</Typography>
        <Box>
          <IconButton>
            <ThumbUpAltIcon />
          </IconButton>
          <IconButton>
            <CommentIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default FetchBlog;
