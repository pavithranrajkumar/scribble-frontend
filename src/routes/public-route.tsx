import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/auth.context';

export function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}
