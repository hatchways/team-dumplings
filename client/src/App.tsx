import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/useAuthContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProfileDetails from './pages/ProfileDetails/ProfileDetails';

import './App.css';
import { SocketProvider } from './context/useSocketContext';
import Booking from './pages/Booking/Booking';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Signup from './pages/SignUp/SignUp';
import theme from './themes/theme';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <Switch>
                <Route exact path="/signin" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/" component={Home} />
                <Route path="/booking" component={Booking} />
                <Route path="/dashboard" component={Dashboard} />
                <Route exact path="/profile-details" component={ProfileDetails} />
                <Route exact path={'*'} component={NotFound} />
              </Switch>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
