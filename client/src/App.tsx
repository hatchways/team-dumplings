import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/useAuthContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProfileDetails from './pages/ProfileDetails/ProfileDetails';
import MyProfile from './pages/MyProfile/MyProfile';
import './App.css';
import { SocketProvider } from './context/useSocketContext';
import Booking from './pages/Booking/Booking';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Listing from './pages/Listing/Listing';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Signup from './pages/SignUp/SignUp';
import Sitting from './pages/Sitting/Sitting';
import theme from './themes/theme';
import Messages from './pages/Messages/Messages';
import { ConversationProvider } from './context/useConversationContext';
import Payment from './pages/Payment/Payment';
import Checkout from './pages/Checkout/Checkout';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <Switch>
<<<<<<< HEAD
                <Route exact path="/signin" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route path="/booking" component={Booking} />
                <Route path="/dashboard" component={Dashboard} />
                <Route exact path="/profile-details" component={ProfileDetails} />
                <Route exact path="/myprofile" component={MyProfile} />
                <Route exact path="/listing" component={Listing} />
                <Route exact path="/sitting" component={Sitting} />
=======
                <Route exact path={'/signin'} component={Login} />
                <Route exact path={'/signup'} component={Signup} />
                <Route exact path={'/listing'} component={Listing} />
                <Route exact path={'/booking'} component={Booking} />
                <Route exact path={'/sitting'} component={Sitting} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path={'/'} component={Home} />
                <Route exact path={'/payment'} component={Payment} />
                <Route exact path={'/checkout'} component={Checkout} />
                <Route exact path={'/myprofile'} component={MyProfile} />
                <Route exact path="/profileDetails" component={ProfileDetails} />
                <Route exact path="/listing" component={Listing} />
                <Route exact path="/sitting" component={Sitting} />
                <ConversationProvider>
                  <Route exact path="/messages" component={Messages} />
                </ConversationProvider>
>>>>>>> e2d140c66ac855d486a3036a7ead634184528868
                <Route exact path="/" component={Home} />
                <Route path="*" component={NotFound} />
              </Switch>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
