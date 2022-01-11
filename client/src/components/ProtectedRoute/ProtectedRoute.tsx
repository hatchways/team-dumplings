import { Box, CircularProgress } from '@material-ui/core';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

export type ProtectedRouteProps = RouteProps;

export default function ProtectedRoute({ ...routeProps }: ProtectedRouteProps): JSX.Element {
  const { loggedInUser } = useAuth();
  if (loggedInUser) {
    return <Route {...routeProps} />;
  } else if (loggedInUser === null) {
    return <Redirect to={{ pathname: '/signin' }} />;
  } else {
    return (
      <>
        <Box textAlign={'center'}>
          <CircularProgress />;
        </Box>
      </>
    );
  }
}
