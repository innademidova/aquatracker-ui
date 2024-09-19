import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import TrackerPage from "./pages/TrackerPage/TrackerPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "signin",
        element: <SignInPage />
    },
    {
        path: "signup",
        element: <SignUpPage />,
    },
    {
        path: "tracker",
        element: <TrackerPage />,
    }
]);