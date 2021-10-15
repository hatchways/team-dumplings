import { AppBar, Avatar, Badge, Box, Button, Paper, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

interface IProps {
  isActive: boolean;
}

const NavBar: React.FC<IProps> = ({ isActive }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Paper variant="outlined" className={classes.leftLogoContainer}>
            <img src="/assets/logo.png" className={classes.leftLogoImg} />
            <Typography variant="h4" className={classes.leftLogoText}>
              LovingSitter.
            </Typography>
          </Paper>

          {!isActive && (
            <Box className={classes.buttonContainer}>
              <Link to={'/'} className={classes.link}>
                <Button variant={'contained'} disableElevation className={classes.button + ' sitter'} disableRipple>
                  BECOME A SIITTER
                </Button>
              </Link>
              <Link to={'/'} className={classes.link}>
                <Button variant={'contained'} disableElevation className={classes.button + ' login'} disableRipple>
                  LOGIN
                </Button>
              </Link>
              <Link to={'/'} className={classes.link}>
                <Button variant={'contained'} disableElevation className={classes.button + ' signup'} disableRipple>
                  SIGNUP
                </Button>
              </Link>
            </Box>
          )}
          {isActive && (
            <Box className={classes.buttonContainer}>
              <Link to={'/sitters'} className={classes.link}>
                <Button variant={'contained'} disableElevation className={classes.button + ' mySitters'} disableRipple>
                  My Sitters
                </Button>
              </Link>
              <Link to={'/messages'} className={classes.link}>
                <Button variant={'contained'} disableElevation className={classes.button + ' messages'} disableRipple>
                  <Badge classes={{ badge: classes.badge + ' active' }} variant="dot">
                    Messages
                  </Badge>
                </Button>
              </Link>
              <Box className={classes.link}>
                <Avatar alt="Hatch ways.." src="https://i.pravatar.cc/300" />
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
