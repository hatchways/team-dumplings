import useStyles from './useStyles';
import AddBlogForm from './AddBlogForm/AddBlogForm';
import { Grid, Typography, Paper, Box } from '@material-ui/core';

import { useSnackBar } from '../../../context/useSnackbarContext';
import { createBlog } from '../../../helpers/APICalls/blogs';

interface Props {
  useEffectTrigger: () => void;
}

function AddBlog({ useEffectTrigger }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (data: FormData) => {
    createBlog(data).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateSnackBarMessage('Your Blog has been published successfully!');
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffectTrigger();
      } else {
        updateSnackBarMessage('An unexpected error occurred. Please try again !');
      }
    });
  };
  return (
    <>
      <Box>
        <Grid container direction="column" alignItems="center" component={Paper} spacing={2} className={classes.root}>
          <Grid item>
            <Typography variant="h2" className={classes.title}>
              Add Blog
            </Typography>
            <AddBlogForm handleSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AddBlog;
