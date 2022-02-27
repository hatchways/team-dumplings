import { useEffect, useState } from 'react';
import useStyles from './useStyles';
import AddComment from './AddComment';
import {
  Avatar,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
  ListItemText,
} from '@material-ui/core';
import { listComments } from '../../../helpers/APICalls/comment';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useParams } from 'react-router-dom';
import { Comment } from '../../../interface/Comment';
import AppPagination from '../../../components/Pagination/AppPagination';

const ListComments = (): JSX.Element => {
  const { listStyle, container, paginationContainer } = useStyles();
  const [comments, setComments] = useState<Comment[]>();
  const [page, setPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [useEffectTrigger, setUseEffectTrigger] = useState<boolean>(false);

  const { updateSnackBarMessage } = useSnackBar();
  const { blogId } = Object(useParams());

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const launchUseEffect = () => {
    setUseEffectTrigger(!useEffectTrigger);
    setPage(1);
  };

  useEffect(() => {
    listComments(blogId, page).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setComments(data.success.comments);
        setNumberOfPages(data.success.numberOfPages);
      } else updateSnackBarMessage('An expected error. please try again later!');
    });
  }, [blogId, page, updateSnackBarMessage, useEffectTrigger]);

  return (
    <>
      <Box className={container} component={Paper}>
        <AddComment launchUseEffect={launchUseEffect} />
        <List className={listStyle}>
          {comments?.map(({ title, text }, idx) => (
            <>
              <ListItem key={idx} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src="https://airportshuttle0.s3.amazonaws.com/defaultAvatar.png" />
                </ListItemAvatar>
                <ListItemText
                  primary={`${title}`}
                  secondary={
                    <>
                      <Typography style={{ display: 'inline' }} component="span" variant="body2">
                        {text}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
        <Box className={paginationContainer}>
          <AppPagination count={numberOfPages} handlePageChange={handlePageChange} style="comment" />
        </Box>
      </Box>
    </>
  );
};

export default ListComments;
