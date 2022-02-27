import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './useStyles';
import AddIcon from '@material-ui/icons/Add';
import { Box, TextField, IconButton } from '@material-ui/core';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { postComment } from '../../../helpers/APICalls/comment';

const AddComment = () => {
  const { input, disabledStyle, addIconStyle, addCommentContainer, iconButtonStyle } = useStyles();
  const [text, setText] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const { blogId } = Object(useParams());
  const { updateSnackBarMessage } = useSnackBar();

  const handleChange = (event: any, type: string) => {
    switch (type) {
      case 'title':
        setTitle(event.target.value);
        break;
      case 'text':
        setText(event.target.value);
        break;
    }
  };

  const onAddCommentClick = () => {
    postComment(blogId, title, text).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateSnackBarMessage('Comment has been added successfully!');
      } else updateSnackBarMessage('An expected error. please try again later!');
    });
  };

  return (
    <Box className={addCommentContainer}>
      <TextField
        id="title"
        name="title"
        value={title}
        onChange={() => handleChange(event, 'title')}
        placeholder="Title"
        error={title.length === 0 ? true : false}
        InputProps={{
          classes: { input: input },
          disableUnderline: true,
        }}
      />
      <TextField
        id="text"
        name="text"
        value={text}
        onChange={() => handleChange(event, 'text')}
        placeholder="Add comment"
        error={text.length === 0 ? true : false}
        InputProps={{
          classes: { input: input },
          disableUnderline: true,
        }}
      />
      <IconButton
        className={iconButtonStyle}
        onClick={onAddCommentClick}
        disabled={title.length === 0 || text.length === 0}
      >
        <AddIcon className={title.length === 0 || text.length === 0 ? disabledStyle : addIconStyle} />
      </IconButton>
    </Box>
  );
};

export default AddComment;
