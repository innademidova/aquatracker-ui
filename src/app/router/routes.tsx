import HomePage from "@/pages/HomePage/HomePage.tsx";
import SignInPage from "@/pages/SignInPage/SignInPage.tsx";
import SignUpPage from "@/pages/SignUpPage/SignUpPage.tsx";
import TrackerPage from "@/pages/TrackerPage/TrackerPage.tsx";
import { ROUTES } from "@/shared/constants/routes.ts";
import PrivateRoute from "components/PrivateRoute/PrivateRoute.tsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.SIGNIN,
    element: <SignInPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignUpPage />,
  },
  {
    path: ROUTES.TRACKER,
    element: <PrivateRoute element={TrackerPage} />,
  },
]);
