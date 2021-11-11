import { Avatar, Box, Fade, Tooltip, Typography } from '@material-ui/core';
import moment from 'moment';
import { useState } from 'react';
import useStyles from './useStyles';
interface Props {
  text: string;
  date: string;
  imageUrl: string;
  read: boolean;
}

export const RecipientChatText = ({ text, date, imageUrl, read }: Props): JSX.Element => {
  const { chatBoxTypographyStyle, chatBoxRecipientAvatar, dateStyle } = useStyles();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Box borderRadius={10} pl={4} pr={4} display="flex">
        <Box mr={2}>
          <Avatar src={imageUrl} className={chatBoxRecipientAvatar} />
        </Box>
        <Tooltip title={moment(date).fromNow()} placement="right-start">
          <Box height="100%" display="flex" flexDirection="column" onClick={handleClick}>
            <Box height="100%" p={2} bgcolor="#f9f9f9" borderRadius={25}>
              <Typography variant="body2" className={chatBoxTypographyStyle}>
                {text}
              </Typography>
            </Box>
            <Fade in={open}>
              <Typography variant="caption" className={dateStyle}>
                {read && 'Seen'}
              </Typography>
            </Fade>
          </Box>
        </Tooltip>
      </Box>
    </>
  );
};
