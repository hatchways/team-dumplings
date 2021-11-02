import { Grid } from '@material-ui/core';
import NavBar from '../../components/NavBar/NavBar';
import Search from '../../components/Search/Search';
import ChatBox from './ChatBox';
import { ChatSideBar } from './ChatSideBar';
import useStyles from './useStyles';

const Messages = (): JSX.Element => {
  const { root } = useStyles();
  return (
    <>
      <NavBar />
      <Grid container className={root} direction="row">
        <Grid container item md={3}>
          <ChatSideBar />
        </Grid>
        <Grid container item md={9}>
          <ChatBox />
        </Grid>
      </Grid>
    </>
  );
};

export default Messages;
