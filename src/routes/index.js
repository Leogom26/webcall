import { createBrowserRouter } from "react-router-dom";
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';   
import NotFound from '../pages/NotFound';
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

import RootLayout from "../layouts/RootLayout";

import Private from "./private"

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <SignIn />
      },
      {
        path: '/register',
        element: <SignUp />
      },
      {
        path: '/dashboard',
        element: <Private><Dashboard /></Private>
      },
      {
        path: '/profile',
        element: <Private><Profile /></Private>
      },
    ]
  },
  // Rota de fallback global (NotFound)
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;
