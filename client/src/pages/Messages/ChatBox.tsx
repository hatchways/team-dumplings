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
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { useConversation } from '../../context/useConversationContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useSocket } from '../../context/useSocketContext';
import { getOneConversation } from '../../helpers/APICalls/conversations';
import { sendMessage } from '../../helpers/APICalls/messages';
import { Message } from '../../interface/Conversation';
import { Profile } from '../../interface/Profile';
import { RecipientChatText } from './RecipientChatText';
import { SenderChatText } from './SenderChatText';
import useStyles from './useStyles';

interface Props {
  profileId: string;
}

const ChatBox = ({ profileId }: Props): JSX.Element => {
  const { badgeStyle, chatBoxAvatar, chatBoxfullName, chatBox, sendButton, replyArea, backdrop } = useStyles();
  const userBadgeStyle = true ? clsx(badgeStyle, 'active') : badgeStyle;
  const { currentConversation, conversations, updateCurrentConversation } = useConversation();
  const [currentRecipient, setCurrentRecipient] = useState<Profile | undefined>();
  const [messageText, setMessageText] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>();
  const replyAreaRef = useRef<HTMLInputElement>(null);

  const { updateSnackBarMessage } = useSnackBar();
  const { socket } = useSocket();

  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.shiftKey) {
      return;
    } else if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    const asyncSendMessage = async () => {
      if (currentConversation?.conversationId && currentRecipient?._id && socket) {
        const conversationId = currentConversation.conversationId;
        const recipientId = currentRecipient._id;

        const response = await sendMessage(conversationId, messageText, recipientId);
        if (response.error) {
          updateSnackBarMessage(response.error);
        } else if (response.message) {
          const emitMessage = {
            recipientId,
            ...response.message,
          };
          socket.emit('sendMessage', emitMessage);
          setMessageText('');

          if (replyAreaRef.current) {
            replyAreaRef.current.value = '';
          }

          {
            const response = await getOneConversation(conversationId);

            if (response.error) {
              updateSnackBarMessage(response.error);
            } else if (response.conversationContent) {
              updateCurrentConversation(response.conversationContent);
            }
          }
        }
      }
    };

    asyncSendMessage();
  };

  const handleSendTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const messageTxt = e.target.value;
    setMessageText(messageTxt);
  };

  useEffect(() => {
    if (socket) {
      socket.on('getMessage', (message) => {
        setArrivalMessage(message);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) setMessages((prev) => [...prev!, arrivalMessage]);
  }, [arrivalMessage]);

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
    currentConversation && currentConversation.messages && setMessages(currentConversation?.messages);
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
                    <Avatar src={'https://i.pravatar.cc/300'} className={chatBoxAvatar} />
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
              <ScrollableFeed>
                {messages &&
                  messages?.map((message) =>
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
                        imageUrl={'https://i.pravatar.cc/300'}
                        read={message.read}
                      />
                    ),
                  )}
              </ScrollableFeed>
            </Box>
            <Divider light orientation="horizontal" />
            <Box height={'10vh'} display="flex" justifyContent="flex-end">
              <Box flex={10} justifyContent="flex-start" alignItems="center" display="flex">
                <TextField
                  className={replyArea}
                  multiline
                  onKeyPress={handleOnKeyPress}
                  inputRef={replyAreaRef}
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
