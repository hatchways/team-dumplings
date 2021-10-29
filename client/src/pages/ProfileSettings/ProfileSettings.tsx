import { Fragment, useState } from 'react';
import { Drawer, Box, List, ListItem, ListItemText, Divider } from '@material-ui/core/';
import MyProfile from '../MyProfile/MyProfile';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import NavBar from '../../components/NavBar/NavBar';
import useStyles from './useStyles';

const ProfileSettings = (): JSX.Element => {
  const classes = useStyles();
  const [component, setComponent] = useState<string>('Edit Profile');
  const [value, setValue] = useState<number>(0);

  const items = ['Edit Profile', 'Profile Photo', 'Payment', 'Security', 'Settings'];

  // ToDo import {Payment', 'Security', 'Settings'} components once created.
  // add them in their place below to be rendered.
  const relevantComponent = () => {
    switch (component) {
      case 'Edit Profile':
        return <MyProfile />;
      case 'Profile Photo':
        return <ProfilePhoto />;
      case 'Payment':
        return null;
      case 'Security':
        return null;
      case 'Settings':
        return null;
    }
  };

  return (
    <Fragment>
      <NavBar />
      <Box>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {items.map((item, index) => (
                <ListItem
                  button
                  selected={index === value}
                  onClick={() => {
                    setComponent(item);
                    setValue(index);
                  }}
                  key={item}
                >
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
        <Box className={classes.box}>{relevantComponent}</Box>
      </Box>
    </Fragment>
  );
};

export default ProfileSettings;
