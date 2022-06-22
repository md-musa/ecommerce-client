import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import SignIn from '../pages/SignIn';

function PrivateRoutes() {
  const { user } = useAuth();
  const location = useLocation();
  console.log('User=> ', user);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signIn" replace state={{ from: location }} />
  );
}

export default PrivateRoutes;
