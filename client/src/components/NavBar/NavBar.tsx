import { AppBar, CircularProgress, Paper, Toolbar, Typography } from '@material-ui/core';
import { useAuth } from '../../context/useAuthContext';
import AuthMenu from './AuthMenu';
import NavMenu from './NavMenu';
import useStyles from './useStyles';

export default function NavBar(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { toolbar, leftLogoContainer, leftLogoText } = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar className={toolbar}>
        <Paper variant="outlined" className={leftLogoContainer}>
          <img src="/assets/logo.png" alt="Marketplace for Dog Sitters, Dog Owners" />
          <Typography variant="h4" className={leftLogoText}>
            LovingSitter.
          </Typography>
        </Paper>
        {loggedInUser ? <NavMenu /> : loggedInUser === undefined ? <CircularProgress /> : <AuthMenu />}
      </Toolbar>
    </AppBar>
  );
}
