import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../context/useAuthContext';
import { useConversation } from '../../context/useConversationContext';
import ChatBox from './ChatBox';
import { ChatSideBar } from './ChatSideBar';
import useStyles from './useStyles';

const Messages = (): JSX.Element => {
  const [profileId, setProfileId] = useState<string | null>(null);

  const { conversations } = useConversation();

  const { root } = useStyles();
  const { loggedInUser } = useAuth();

  const saveProfileId = (id: string) => {
    setProfileId(id);
  };

  useEffect(() => {
    let active = true;
    loggedInUser && loggedInUser.profile && saveProfileId(loggedInUser.profile);
    console.log(`pId: ${loggedInUser?.profile}`);

    return () => {
      active = false;
    };
  }, [loggedInUser]);
  return (
    <>
      <NavBar />
      <Grid container className={root} direction="row">
        <Grid container item md={3}>
          <ChatSideBar conversations={conversations!} profileId={profileId!} />
        </Grid>
        <Grid container item md={9}>
          <ChatBox profileId={profileId!} />
        </Grid>
      </Grid>
    </>
  );
};

export default Messages;
