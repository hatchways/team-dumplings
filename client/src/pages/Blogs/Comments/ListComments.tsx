import useStyles from './useStyles';
import AddComment from './AddComment';
import { Avatar, Typography, Box, List, ListItem, ListItemAvatar, Divider, ListItemText } from '@material-ui/core';

const comments = [
  { title: 'title01', text: 'hello my firend, glad to hear from yousadsadsadsadsadsadasdasdasdasdasdadsa', img: '' },
  { title: 'title02', text: 'hello my firend, glad to hear from you', img: '' },
];

const ListComments = (): JSX.Element => {
  const { listStyle, container } = useStyles();

  return (
    <>
      <Box className={container}>
        <AddComment />
        <List className={listStyle}>
          {comments.map(({ title, text, img }, idx) => (
            <>
              <ListItem key={idx} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={`${img}`} src="https://airportshuttle0.s3.amazonaws.com/defaultAvatar.png" />
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
      </Box>
    </>
  );
};

export default ListComments;
