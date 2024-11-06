import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from '../features/auth/components/Login';
import { Dashboard } from '../features/dashboard/components/Dashboard';
import { Tasks } from '../features/tasks/components/Tasks';
import { ProtectedRoute, PublicRoute } from './RouteComponents';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
    ],
  },
]); 