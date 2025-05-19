import { createBrowserRouter } from "react-router-dom";
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';   
import NotFound from '../pages/NotFound';
import Dashboard from "../pages/Dashboard";
import RootLayout from "../layouts/RootLayout";

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
        element: <Dashboard />
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
