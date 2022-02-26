import { Grid, Card, CardMedia, CardContent, CardActions, Button, Typography, IconButton } from '@material-ui/core';
import { useState, useEffect } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import useStyles from './useStyles';
import AddIcon from '@material-ui/icons/Add';
import { listBlogs } from '../../../helpers/APICalls/blogs';
import { Blog } from '../../../interface/Blogs';
import { useSnackBar } from '../../../context/useSnackbarContext';
import AppPagination from '../../../components/Pagination/AppPagination';

const ListBlogs = (): JSX.Element => {
  const { title, root, img, addIcon } = useStyles();
  const [blogs, setBlogs] = useState<Blog[]>();
  const [page, setPage] = useState<number>(1);

  const { updateSnackBarMessage } = useSnackBar();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    listBlogs(page).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setBlogs(data.success.blogs);
      } else updateSnackBarMessage('An expected error. please try again later!');
    });
  }, [updateSnackBarMessage, page]);

  return (
    <>
      <NavBar />
      <Grid container direction="column" className={root}>
        <Grid item container justifyContent="space-evenly">
          <img src="https://team-dumplings.s3.amazonaws.com/blogs02.jpg" className={img} />
          <IconButton>
            <AddIcon className={addIcon} />
          </IconButton>
        </Grid>
        <Grid item container spacing={3}>
          {blogs?.map((blog: Blog, idx: number) => (
            <Grid item key={idx} xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardMedia component="img" height="140" image={blog.image} alt="green iguana" />
                <CardContent>
                  <Typography className={title}>{blog.title}</Typography>
                  <Typography variant="body2">{blog.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <AppPagination handlePageChange={handlePageChange} />
      </Grid>
    </>
  );
};

export default ListBlogs;
