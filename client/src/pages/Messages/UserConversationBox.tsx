import { Avatar, Badge, Box, Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import useStyles from './useStyles';
import { useConversation } from '../../context/useConversationContext';
import { getOneConversation } from '../../helpers/APICalls/conversations';
import { useSnackBar } from '../../context/useSnackbarContext';

interface Props {
  name: string;
  imageUrl: string;
  latestMessage?: string;
  sentTime: Date;
  selected: boolean;
  activeUser: boolean;
  conversationId: string;
}

const UserConversationBox = ({
  imageUrl,
  name,
  latestMessage = '',
  sentTime,
  selected,
  activeUser,
  conversationId,
}: Props): JSX.Element => {
  const { fullName, lastMessage, time, badgeStyle, activeConversation, ConversationBoxStyle } = useStyles();
  const rootStyle = selected ? clsx(ConversationBoxStyle, activeConversation) : ConversationBoxStyle;
  const userBadgeStyle = activeUser ? clsx(badgeStyle, 'active') : badgeStyle;
  const { updateCurrentConversation } = useConversation();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSetCurrentConversation = () => {
    const setCurrentConversation = async () => {
      const response = await getOneConversation(conversationId);
      if (response.error) {
        updateSnackBarMessage(response.error);
      } else if (response.conversationContent) {
        updateCurrentConversation(response.conversationContent);
      }
    };
    setCurrentConversation();
  };
  return (
    <>
      <Box display={'flex'} width={'100%'} className={rootStyle} onClick={handleSetCurrentConversation}>
        <Box display="flex" width={'100%'} pt={2} pb={2} pl={2} pr={2}>
          <Box flex={2}>
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
              <Avatar src={imageUrl} />
            </Badge>
          </Box>
          <Box flex={7} display={'flex'} flexDirection="column">
            <Typography className={fullName}> {name} </Typography>
            <Typography className={lastMessage} variant="caption">
              {latestMessage}
            </Typography>
          </Box>
          <Box flex={3}>
            <Typography className={time} variant="caption">
              {moment(sentTime).fromNow(true)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider light orientation="horizontal" />
    </>
  );
};

export default UserConversationBox;
