import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from '../features/auth/components/Login';
import { Dashboard } from '../features/dashboard/components/Dashboard';
import { auth } from '../utils/firebase';

// Auth protection helper
const requireAuth = () => {
  const user = auth.currentUser;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return null;
};

const redirectIfAuthenticated = () => {
  const user = auth.currentUser;
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: redirectIfAuthenticated,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: requireAuth,
  },
]); 