import { Grid, Card, CardMedia, CardContent, CardActions, Button, Typography, IconButton } from '@material-ui/core';
import { useState, useEffect } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import useStyles from './useStyles';
import AddIcon from '@material-ui/icons/Add';
import { listBlogs } from '../../../helpers/APICalls/blogs';
import { Blog } from '../../../interface/Blogs';
import { useSnackBar } from '../../../context/useSnackbarContext';
import AppPagination from '../../../components/Pagination/AppPagination';
import { CustomButton } from '../../../components/Button/CustomButton';
import CustomDialog from '../../../components/CustomDialog/CustomDialog';
import AddBlog from '../AddBlog/AddBlog';

const ListBlogs = (): JSX.Element => {
  const { title, root, img, addIcon } = useStyles();
  const [blogs, setBlogs] = useState<Blog[]>();
  const [page, setPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);

  const { updateSnackBarMessage } = useSnackBar();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onAddBlogClick = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(!open);
  };

  const useEffectTrigger = () => {
    setTrigger(!trigger);
  };

  useEffect(() => {
    setOpen(false);
    listBlogs(page).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setBlogs(data.success.blogs);
        setNumberOfPages(data.success.numberOfPages);
      } else updateSnackBarMessage('An expected error. please try again later!');
    });
  }, [updateSnackBarMessage, page, trigger]);

  return (
    <>
      <NavBar />
      <Grid container direction="column" className={root}>
        <Grid item container justifyContent="space-evenly">
          <img src="https://team-dumplings.s3.amazonaws.com/blogs02.jpg" className={img} />
          <IconButton onClick={onAddBlogClick}>
            <AddIcon className={addIcon} />
          </IconButton>
        </Grid>
        <Grid item container spacing={3}>
          {blogs?.map((blog: Blog, idx: number) => (
            <Grid item key={idx} xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardMedia component="img" height="140" image={blog.image} alt="" />
                <CardContent>
                  <Typography className={title}>{blog.title}</Typography>
                  <Typography variant="body2">{blog.description}</Typography>
                </CardContent>
                <CardActions>
                  <CustomButton linkTo={`/blog/${blog._id}`} btnText={'Read More'} style="readMore" />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <CustomDialog open={open} onClose={onClose}>
          <AddBlog useEffectTrigger={useEffectTrigger} />
        </CustomDialog>
        <AppPagination count={numberOfPages} handlePageChange={handlePageChange} />
      </Grid>
    </>
  );
};

export default ListBlogs;
