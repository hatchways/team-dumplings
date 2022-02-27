import { useState } from 'react';
import useStyles from './useStyles';
import AddIcon from '@material-ui/icons/Add';
import { Box, TextField, IconButton } from '@material-ui/core';

const AddComment = () => {
  const { input, addIcon, addCommentContainer, iconButtonStyle } = useStyles();
  const [value, setValue] = useState<string>('');

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <Box className={addCommentContainer}>
      <TextField
        id="comment"
        name="comment"
        value={value}
        onChange={() => handleChange(event)}
        placeholder="Add comment"
        InputProps={{
          classes: { input: input },
          disableUnderline: true,
        }}
      />
      <IconButton className={iconButtonStyle}>
        <AddIcon className={addIcon} />
      </IconButton>
    </Box>
  );
};

export default AddComment;
