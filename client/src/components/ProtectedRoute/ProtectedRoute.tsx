import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

export type ProtectedRouteProps = RouteProps;

export default function ProtectedRoute({ ...routeProps }: ProtectedRouteProps) {
  const { loggedInUser } = useAuth();

  if (loggedInUser) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: '/login' }} />;
  }
}
