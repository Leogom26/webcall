import { createBrowserRouter } from "react-router-dom";
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp';   
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn/>
  },
  {
    path: "/register",
    element: <SignUp/>
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router;
