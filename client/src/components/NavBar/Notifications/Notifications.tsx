import { Fragment, useEffect, useState } from 'react';
import { MenuItem, Menu, Typography, Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Link } from 'react-router-dom';
import { Notification } from '../../../interface/Notification';
import { updateNotifications, getAllNotifications } from '../../../helpers/APICalls/notification';

interface Props {
  open: boolean;
  anchorEl: any;
  setOpen: (open: boolean) => void;
  setNewNotification: (newNotification: boolean) => void;
}

export default function Notifications({ open, setOpen, anchorEl, setNewNotification }: Props): JSX.Element {
  const classes = useStyles();
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    getAllNotifications().then((data) => {
      setAllNotifications(data.success.notifications);
      if (data.success.notifications.length > 0) setNewNotification(true);
    });
  }, [setNewNotification]);

  const handleClose = (_id: any) => {
    setOpen(false);
    const id = _id.toString();
    const inputs = { read: true };
    updateNotifications(inputs, id).then((data) => {
      console.log(data);
    });
  };

  return (
    <Fragment>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={0}
        className={classes.menu}
      >
        {allNotifications.map((notification) => (
          <MenuItem
            component={Link}
            to={notification.details.linkTo}
            key={notification.details.name}
            classes={{ root: classes.menuItem }}
            onClick={() => handleClose(notification._id)}
          >
            <img
              src={`https://team-dumplings.s3.amazonaws.com/${notification.details.profilePhoto}`}
              className={classes.image}
            />
            <Box className={classes.box}>
              <Typography variant="body1" className={classes.typography}>
                {notification.details.text}
              </Typography>
              <Typography variant="body2">{notification.details.description}</Typography>
              <Typography variant="body2" className={classes.typography}>
                {notification.createdAt.toString().slice(0, 10)}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}
