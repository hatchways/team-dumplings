import { Avatar, Box, Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import moment from 'moment';

interface Props {
  rating: number;
  comment: string;
  createdAt: string;
  firstName: string;
  lastName: string;
}

const Comment = ({ rating, comment, createdAt, firstName, lastName }: Props): JSX.Element => {
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
              <>
                <IconButton aria-label="likes">
                  <ThumbUpIcon />
                </IconButton>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </>
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
