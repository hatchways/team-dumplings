import {
  Avatar,
  Backdrop,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import { ChangeEvent, useEffect, useState } from 'react';
import { useConversation } from '../../context/useConversationContext';
import { getOneConversation } from '../../helpers/APICalls/conversations';
import { sendMessage } from '../../helpers/APICalls/messages';
import { Profile } from '../../interface/Profile';
import { RecipientChatText } from './RecipientChatText';
import { SenderChatText } from './SenderChatText';
import useStyles from './useStyles';
import { useSnackBar } from '../../context/useSnackbarContext';

interface Props {
  profileId: string;
}

const ChatBox = ({ profileId }: Props): JSX.Element => {
  const { badgeStyle, chatBoxAvatar, chatBoxfullName, chatBox, sendButton, replyArea, backdrop } = useStyles();
  const userBadgeStyle = true ? clsx(badgeStyle, 'active') : badgeStyle;
  const { currentConversation, conversations, updateCurrentConversation } = useConversation();
  const [currentRecipient, setCurrentRecipient] = useState<Profile | undefined>();
  const [messageText, setMessageText] = useState('');
  const { updateSnackBarMessage } = useSnackBar();

  const handleSendMessage = () => {
    const AsyncSendMessage = async () => {
      if (currentConversation && currentRecipient && currentConversation.conversationId && currentRecipient._id) {
        const conversationId = currentConversation.conversationId;
        const recipientId = currentRecipient._id;

        const response = await sendMessage(conversationId, messageText, recipientId);
        if (response.error) {
          updateSnackBarMessage(response.error);
        } else if (response.message) {
          const setCurrentConversation = async () => {
            const response = await getOneConversation(conversationId);

            if (response.error) {
              updateSnackBarMessage(response.error);
            } else if (response.conversationContent) {
              updateCurrentConversation(response.conversationContent);
            }
          };

          setCurrentConversation();
        }
      }
    };

    AsyncSendMessage();
  };
  const handleSendTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const messageTxt = e.target.value;
    setMessageText(messageTxt);
  };
  useEffect(() => {
    let active = true;
    const getRecipient = (): Profile | undefined => {
      const currentConversationId = currentConversation?.conversationId;
      const currentConversationWithMembers = conversations?.filter(
        (conversation) => conversation._id === currentConversationId,
      );
      const conversationMembers =
        currentConversationWithMembers &&
        currentConversationWithMembers[0] &&
        currentConversationWithMembers[0].members;
      const recipient = conversationMembers?.filter((memebr) => memebr._id != profileId)[0];
      return recipient;
    };
    currentConversation && setCurrentRecipient(getRecipient());
    return () => {
      active = false;
    };
  }, [conversations, currentConversation, currentConversation?.conversationId, profileId]);
  return (
    <>
      <Box width={'100%'} component={Paper} borderRadius={0}>
        {!currentConversation ? (
          <Backdrop open={true} className={backdrop}>
            <Box textAlign="center">
              <LinearProgress />
              <Typography> Select a conversation </Typography>
              <LinearProgress color="secondary" />
            </Box>
          </Backdrop>
        ) : (
          <>
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
                    {currentRecipient?.firstName} {currentRecipient?.lastName}
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
              {currentConversation &&
                currentConversation.messages?.map((message) =>
                  message.sender._id == profileId ? (
                    <SenderChatText
                      key={message._id}
                      text={message.text}
                      date={message.createdAt}
                      read={message.read}
                    />
                  ) : (
                    <RecipientChatText
                      key={message._id}
                      text={message.text}
                      date={message.createdAt}
                      imageUrl={message._id}
                      read={message.read}
                    />
                  ),
                )}
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
                  onChange={handleSendTextChange}
                ></TextField>
              </Box>
              <Box flex={2} justifyContent="center" alignItems="center" display="flex">
                <Box>
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    className={sendButton}
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default ChatBox;
