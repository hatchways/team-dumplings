import { Box, Fade, Tooltip, Typography } from '@material-ui/core';
import moment from 'moment';
import { useState } from 'react';
import useStyles from './useStyles';
interface Props {
  text: string;
  date: string;
  read: boolean;
}
export const SenderChatText = ({ text, date, read }: Props): JSX.Element => {
  const { chatBoxTypographyStyle, dateStyle } = useStyles();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <Box borderRadius={10} pl={4} pr={4} pt={2} display="flex">
        <Tooltip title={moment(date).fromNow()} placement="left-start">
          <Box height="100%" alignItems="flex-end" display="flex" marginLeft="auto" flexDirection="column">
            <Box height="100%" p={2} borderRadius={25} marginLeft="auto" boxShadow={1} onClick={handleClick}>
              <Typography variant="body2" className={chatBoxTypographyStyle}>
                {text}
              </Typography>
            </Box>
            <Fade in={open}>
              <Typography variant="caption" className={dateStyle}>
                {read ? 'Seen' : 'Delivered'}
              </Typography>
            </Fade>
          </Box>
        </Tooltip>
      </Box>
    </>
  );
};
