import { Box, CircularProgress, Divider, Paper, Typography } from '@material-ui/core';
import { ChangeEvent, useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import { createConversation, getAllConversations } from '../../helpers/APICalls/conversations';
import { Conversation } from '../../interface/Conversation';
import { Profile } from '../../interface/Profile';
import { User, UserFromSearch } from '../../interface/User';
import ConversationBox from './UserConversationBox';
import useStyles from './useStyles';
import { useConversation } from '../../context/useConversationContext';
import { useSnackBar } from '../../context/useSnackbarContext';

interface Props {
  conversations: Conversation[];
  profileId: string;
}

export const ChatSideBar = ({ conversations, profileId }: Props): JSX.Element => {
  const [search, setSearch] = useState<string>('test');
  const [newChatUser, setNewChatUser] = useState<User | null>(null);
  const [options, setOptions] = useState<UserFromSearch[]>([]);
  const [selected, setSelected] = useState<boolean>(false);
  const { updateConversationContext } = useConversation();
  const { updateSnackBarMessage } = useSnackBar();

  const getRecipient = (members: Profile[]): Profile => {
    return members.filter((member) => member._id != profileId)[0];
  };

  const getFullName = (profile: Profile): string => {
    return profile.firstName.concat(' ').concat(profile.lastName);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    if (newChatUser) {
      setNewChatUser(null);
    }
  };

  useEffect(() => {
    let active = true;
    if (selected && options.length) {
      const recipientId = options[0].profile._id;

      const newConversation = async () => {
        let response = await createConversation([profileId, recipientId!]);
        if (response.error) {
          updateSnackBarMessage(response.error);
        } else if (response.conversation) {
          response = await getAllConversations();
          if (response.error) {
            updateSnackBarMessage(response.error);
          } else if (response.conversations) {
            updateConversationContext(response.conversations);
          }
        }
      };
      newConversation();
    }
    return () => {
      active = false;
    };
  }, [options, selected, profileId, updateConversationContext, updateSnackBarMessage]);
  const { chatSideBar } = useStyles();
  return (
    <>
      <Box width={'100%'} component={Paper} borderRadius={0}>
        <Box display={'flex'} width={'100%'}>
          <Box display="flex" width={'100%'} pt={2} pb={3} pl={2} height="6vh" alignItems="center">
            <Typography variant="h6">Inbox Messages</Typography>
          </Box>
        </Box>
        <Box display={'flex'} width={'100%'}>
          <Box display="flex" width={'100%'} pt={2} pb={3} pl={2} height="6vh" alignItems="center">
            <Search
              options={options}
              setOptions={setOptions}
              search={search}
              handleChange={handleChange}
              setSelected={setSelected}
            />
          </Box>
        </Box>
        <Divider light orientation="horizontal" />
        <Box className={chatSideBar}>
          {conversations ? (
            conversations.map((conversation) => (
              <ConversationBox
                key={conversation._id}
                imageUrl={'https://i.pravatar.cc/300'}
                name={getFullName(getRecipient(conversation.members))}
                latestMessage={conversation?.latestMessage?.text}
                sentTime={new Date(conversation.updatedAt)}
                selected={false}
                activeUser={false}
                conversationId={conversation._id}
              />
            ))
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
    </>
  );
};
