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
  const [selectedUser, setSelectedUser] = useState<UserFromSearch | null | string>(null);
  const { updateConversationContext, loading } = useConversation();
  const { updateSnackBarMessage } = useSnackBar();

  const getSelectedUser = (event: any, value: string | UserFromSearch | null) => {
    setSelectedUser(value);
  };

  const getRecipient = (members: Profile[]): Profile => {
    return members.filter((member) => member._id != profileId)[0];
  };

  const getFullName = (profile: Profile): string => {
    return profile.firstName.concat(' ').concat(profile.lastName);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    // console.log(`val: ${newInputValue}`);

    if (newChatUser) {
      setNewChatUser(null);
    }
  };

  useEffect(() => {
    let active = true;
    if (selected && options.length && selectedUser && typeof selectedUser !== 'string') {
      //const recipientId = options[0].profile._id;
      const recipientId = selectedUser?.profile?._id;
      //console.log(`recipientId ! `, selectedUser?.profile?._id);
      const newConversation = async () => {
        // console.log(`creating new convs ! ${[profileId, recipientId!]}`);

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
  }, [options, selected, profileId, updateConversationContext, updateSnackBarMessage, selectedUser]);
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
              getSelectedUser={getSelectedUser}
            />
          </Box>
        </Box>
        <Divider light orientation="horizontal" />
        <Box className={chatSideBar}>
          {/* {console.log(`conversation: ${conversations}  loading: ${loading}`)} */}
          {/* {console.log(conversations)} */}
          {conversations && !loading ? (
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
          ) : !conversations ? (
            <CircularProgress />
          ) : (
            <Typography>Nothing !</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};
