import { Grid, Card, CardMedia, CardContent, CardActions, Button, Typography, IconButton } from '@material-ui/core';
import { useState, useEffect } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import useStyles from './useStyles';
import AddIcon from '@material-ui/icons/Add';

interface Blog {
  title: string;
  image: string;
  description: string;
  createdAt: string;
}

const blogs: any = [
  {
    title: 'Blog Title',
    image: 'https://team-dumplings.s3.amazonaws.com/dogSitter.jpg',
    description: 'this blog is wonderful',
    createdAt: '2022-01-01',
  },
  {
    title: 'Blog Title02',
    image: 'https://team-dumplings.s3.amazonaws.com/dogSitter.jpg',
    description: 'this blog is wonderful',
    createdAt: '2022-01-01',
  },
  {
    title: 'Blog Title03',
    image: 'https://team-dumplings.s3.amazonaws.com/dogSitter.jpg',
    description: 'this blog is wonderful',
    createdAt: '2022-01-01',
  },
  {
    title: 'Blog Title04',
    image: 'https://team-dumplings.s3.amazonaws.com/dogSitter.jpg',
    description: 'this blog is wonderful',
    createdAt: '2022-01-01',
  },
  {
    title: 'Blog Title05',
    image: 'https://team-dumplings.s3.amazonaws.com/dogSitter.jpg',
    description: 'this blog is wonderful',
    createdAt: '2022-01-01',
  },
];

const ListBlogs = (): JSX.Element => {
  const { title, root, img, addIcon } = useStyles();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    listBlogs().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else if (data.success) {
        setBlogs(data.success);
      } else console.log('An expected error. please try again later!');
    });
  });

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
          {blogs.map((blog: Blog, idx: Key | null | undefined) => (
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
      </Grid>
    </>
  );
};

export default ListBlogs;
