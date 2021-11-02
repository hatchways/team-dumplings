import { Avatar, Badge, Box, Button, Divider, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import useStyles from './useStyles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ChatBox = (): JSX.Element => {
  const {
    badgeStyle,
    chatBoxAvatar,
    chatBoxfullName,
    chatBoxTypographyStyle,
    chatBoxRecipientAvatar,
    chatBox,
    sendButton,
    replyArea,
    dateStyle,
  } = useStyles();
  const userBadgeStyle = true ? clsx(badgeStyle, 'active') : badgeStyle;
  return (
    <>
      <Box width={'100%'} component={Paper} borderRadius={0}>
        <Box display={'flex'} width={'100%'}>
          <Box display="flex" width={'100%'} pt={2} pb={2} pl={4} pr={2} alignItems="center">
            <Box>
              <Badge
                className={userBadgeStyle}
                overlap="circular"
                badgeContent=" "
                variant="dot"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Avatar src={'imageUrl'} className={chatBoxAvatar} />
              </Badge>
            </Box>
            <Box flex={1} display={'flex'} flexDirection="column" ml={3}>
              <Typography variant="h6" className={chatBoxfullName}>
                Marry Wills
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Divider light orientation="horizontal" />
        <Box height="70vh" className={chatBox}>
          <Box borderRadius={10} pl={4} pr={4} pt={2} display="flex">
            <Box height="100%" alignItems="flex-end" display="flex" marginLeft="auto">
              <Box height="100%" p={2} borderRadius={25} marginLeft="auto" boxShadow={1}>
                <Typography variant="body2" className={chatBoxTypographyStyle}>
                  Hey Marry! I'm your dogsitter for next week. I can't wait to meet your compaanion !
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box borderRadius={10} pl={4} pr={4} display="flex">
            <Box mr={2}>
              <Avatar src={'imageUrl'} className={chatBoxRecipientAvatar} />
            </Box>
            <Box height="100%">
              <Box height="100%" p={2} bgcolor="#f9f9f9" borderRadius={25}>
                <Typography variant="body2" className={chatBoxTypographyStyle}>
                  Hi Kenneth! So glad to hear! looking forward to it. When can you come to pick up Spike?
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box borderRadius={10} pl={4} pr={4} display="flex">
            <Box height="100%" alignItems="flex-end" display="flex" marginLeft="auto">
              <Box height="100%" p={2} borderRadius={25} marginLeft="auto" boxShadow={1}>
                <Typography variant="body2" className={chatBoxTypographyStyle}>
                  I'll send you more details !
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box borderRadius={10} pl={4} pr={4} pt={2} display="flex">
            <Box height="100%" alignItems="flex-end" display="flex" marginLeft="auto">
              <Box height="100%" p={2} borderRadius={25} marginLeft="auto" boxShadow={1}>
                <Typography variant="body2" className={chatBoxTypographyStyle}>
                  Hey Marry! I'm your dogsitter for next week. I can't wait to meet your compaanion !
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box borderRadius={10} pl={4} pr={4} display="flex">
            <Box mr={2}>
              <Avatar src={'imageUrl'} className={chatBoxRecipientAvatar} />
            </Box>
            <Box height="100%">
              <Box height="100%" p={2} bgcolor="#f9f9f9" borderRadius={25}>
                <Typography variant="body2" className={chatBoxTypographyStyle}>
                  Hi Kenneth! So glad to hear! looking forward to it. When can you come to pick up Spike?
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box borderRadius={10} pl={4} pr={4} display="flex">
            <Box height="100%" alignItems="flex-end" display="flex" marginLeft="auto">
              <Box height="100%" p={2} borderRadius={25} marginLeft="auto" boxShadow={1}>
                <Typography variant="body2" className={chatBoxTypographyStyle}>
                  I'll send you more details !
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box borderRadius={10} pl={4} pr={4} display="flex">
            <Box mr={2}>
              <Avatar src={'imageUrl'} className={chatBoxRecipientAvatar} />
            </Box>
            <Box height="100%">
              <Box height="100%" p={2} bgcolor="#f9f9f9" borderRadius={25}>
                <Typography variant="body2" className={chatBoxTypographyStyle}>
                  Hi Kenneth! So glad to hear! looking forward to it. When can you come to pick up Spike?
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box borderRadius={10} pl={4} pr={4} pt={2} display="flex">
            <Box height="100%" alignItems="flex-end" display="flex" marginLeft="auto">
              <Box height="100%" p={2} borderRadius={25} marginLeft="auto" boxShadow={1}>
                <Typography variant="body2" className={chatBoxTypographyStyle}>
                  Hey Marry! I'm your dogsitter for next week. I can't wait to meet your compaanion !
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box borderRadius={10} pl={4} pr={4} pt={2} display="flex">
            <Box height="100%" alignItems="flex-end" display="flex" marginLeft="auto" flexDirection="column">
              <Box height="100%" p={2} borderRadius={25} marginLeft="auto" boxShadow={1}>
                <Typography variant="body2" className={chatBoxTypographyStyle}>
                  Hey Marry! I'm your dogsitter for next week. I can't wait to meet your compaanion !
                </Typography>
              </Box>
              <Typography variant="caption" className={dateStyle}>
                {moment('20211030 08:00', 'YYYYMMDD hh:mm').fromNow()}
              </Typography>
            </Box>
          </Box>
          <Box borderRadius={10} pl={4} pr={4} display="flex">
            <Box mr={2}>
              <Avatar src={'imageUrl'} className={chatBoxRecipientAvatar} />
            </Box>
            <Box height="100%" display="flex" flexDirection="column">
              <Box height="100%" p={2} bgcolor="#f9f9f9" borderRadius={25}>
                <Typography variant="body2" className={chatBoxTypographyStyle}>
                  Hi Kenneth! So glad to hear! looking forward to it. When can you come to pick up Spike?
                </Typography>
              </Box>
              <Typography variant="caption" className={dateStyle}>
                {moment('20211031 08:00', 'YYYYMMDD hh:mm').fromNow()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider light orientation="horizontal" />
        <Box height={'10vh'} display="flex" justifyContent="flex-end">
          <Box flex={10} justifyContent="flex-start" alignItems="center" display="flex">
            <TextField
              className={replyArea}
              multiline
              placeholder="Replay to Marry"
              InputProps={{
                classes: { input: replyArea },
                disableUnderline: true,
              }}
            ></TextField>
          </Box>
          <Box flex={2} justifyContent="center" alignItems="center" display="flex">
            <Box>
              <Button type="submit" size="large" variant="contained" color="primary" className={sendButton}>
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatBox;
