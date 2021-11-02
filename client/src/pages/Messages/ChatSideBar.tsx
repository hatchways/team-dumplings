import { Avatar, Badge, Box, Divider, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import useStyles from './useStyles';
import ConversationBox from './UserConversationBox';
import Search from '../../components/Search/Search';
import { ChangeEvent, useEffect, useState } from 'react';
import { User } from '../../interface/User';

export const ChatSideBar = (): JSX.Element => {
  const [search, setSearch] = useState<string>('test');
  const [newChatUser, setNewChatUser] = useState<User | null>(null);
  const [options, setOptions] = useState<User[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    if (newChatUser) {
      setNewChatUser(null);
    }
  };
  useEffect(() => {
    // TODO set user from search to conversation
    console.log(`Changed ${JSON.stringify(options)}`);
  }, [options]);
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
            <Search options={options} setOptions={setOptions} search={search} handleChange={handleChange} />
          </Box>
        </Box>
        <Divider light orientation="horizontal" />
        <Box className={chatSideBar}>
          <ConversationBox
            imageUrl={'https://i.pravatar.cc/300'}
            name={'Marry Wills'}
            latestMessage={"I'll send you details"}
            sentTime={new Date()}
            selected={true}
            activeUser={true}
          />
          <ConversationBox
            imageUrl={'https://i.pravatar.cc/300'}
            name={'William Pory'}
            latestMessage={"okey i'll Text you ..."}
            sentTime={new Date('09/02/2021 11:55:30')}
            selected={false}
            activeUser={false}
          />
        </Box>
      </Box>
    </>
  );
};
